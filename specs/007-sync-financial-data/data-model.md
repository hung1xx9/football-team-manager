# Data Model: Financial Data Synchronization

**Feature**: `007-sync-financial-data`  
**Phase**: 1 — Design  
**Date**: 2026-05-18

---

## Overview: Source of Truth Hierarchy

```
matches[].attendance[]          → source of WHAT happened (who played, who was absent)
         ↓ finalizeMatch()
receivables[]                   → source of WHAT IS OWED (obligations, one record per debt)
         ↓ approvePendingTransaction()
transactions[]                  → source of WHAT WAS PAID (immutable payment records)
         ↓ reconcile / denormalize
member.fundPaid / member.fines  → derived summary (must always equal sum of transactions)
```

---

## Existing Entities (Modified)

### Member

**Location**: `members` Firestore collection  
**Key fields** (relevant to sync):

| Field | Type | Description | Change |
|---|---|---|---|
| `id` | number | Unique member ID | unchanged |
| `fundPaid` | number | Total fund payments approved (denormalized sum) | must stay in sync with `transactions` |
| `fines` | number | Total fine/pitch payments approved (denormalized sum) | must stay in sync with `transactions` |
| `paymentType` | `'per-match' \| 'monthly'` | Determines if member owes monthly fund | unchanged |
| `contributionTierId` | number | Links to contribution tier for monthly fee calculation | unchanged |

**Validation rules**:
- `fundPaid >= 0` always
- `fines >= 0` always
- These fields are **derived** — they MUST equal `sum(transactions WHERE memberId=M AND category='fund' AND type='income')`

---

### Receivable

**Location**: `receivables` Firestore collection  
**Role**: Master ledger of all obligations. One document per obligation instance.

| Field | Type | Description | Change |
|---|---|---|---|
| `id` | string/number | Unique ID | unchanged |
| `memberId` | number | Member this obligation belongs to | unchanged |
| `type` | `'monthly_fund' \| 'fine' \| 'pitch_fee' \| 'legacy_debt'` | Obligation category | unchanged |
| `amount` | number | Vietnamese Dong amount **snapshotted at creation time** | unchanged |
| `description` | string | Human-readable description | unchanged |
| `date` | ISO-8601 date | Date obligation was incurred | unchanged |
| `monthKey` | string | `YYYY-MM` (for monthly_fund type only) | unchanged |
| `matchId` | number \| null | Source match (for fine/pitch_fee type) | unchanged |
| `attendanceStatus` | string \| null | Attendance status that triggered this obligation | **NEW** |
| `status` | `'unpaid' \| 'paid'` | Payment status | unchanged |
| `paidAt` | ISO-8601 \| null | When marked as paid | unchanged |
| `transactionId` | number \| null | Linked payment transaction ID | unchanged |
| `createdAt` | ISO-8601 | Creation timestamp | unchanged |

**New validation rules**:
- A receivable with `matchId` set must only be modified through the `approveAttendanceFeeAtomic` or `deleteMatchAtomic` operations
- Receivables are **immutable for amount** after creation (change in penalty settings doesn't affect existing records)

**State transitions**:
```
unpaid → paid        (via approvePendingTransactionAtomic or addTransaction)
paid   → (none)      (paid receivables cannot be reverted in normal flow)
unpaid → (deleted)   (only via deleteMatch or reconcile)
```

---

### Transaction

**Location**: `transactions` Firestore collection  
**Role**: Immutable payment log. Once created, never edited.

| Field | Type | Description | Change |
|---|---|---|---|
| `id` | number | Timestamp-based unique ID | unchanged |
| `type` | `'income' \| 'expense'` | Transaction direction | unchanged |
| `category` | `'fund' \| 'fine' \| 'pitch_fee' \| 'monthly_fund' \| ...` | Payment category | unchanged |
| `amount` | number | Vietnamese Dong | unchanged |
| `memberId` | number \| null | Paying member | unchanged |
| `date` | ISO-8601 | When payment occurred | unchanged |
| `description` | string | Human-readable label | unchanged |
| `_approvedFrom` | string \| null | pendingTransaction ID that originated this | unchanged |

---

### Match (attendance sub-field)

**Location**: `matches` Firestore collection, `attendance` field  
**No schema changes needed.** Existing attendance record structure:

| Field | Type | Description |
|---|---|---|
| `memberId` | number | Member reference |
| `status` | `'present' \| 'absent'` | Attendance status |
| `isLate` | boolean | Whether member arrived late |
| `lateMinutes` | number | Minutes late (if isLate) |
| `timestamp` | ISO-8601 | When attendance was recorded |
| `method` | string | How it was recorded |

---

## New Entities

### FinancialAuditLog

**Location**: Firestore sub-collection `members/{memberId}/financialAuditLog`  
**Role**: Immutable append-only audit trail of every balance change for a member.

| Field | Type | Description |
|---|---|---|
| `id` | string | Auto-generated (timestamp + random) |
| `memberId` | number | Member this log belongs to |
| `changeType` | enum | See values below |
| `before` | object | `{ fundPaid, fines }` values before change |
| `after` | object | `{ fundPaid, fines }` values after change |
| `delta` | number | Net change in total balance (after.total - before.total) |
| `sourceId` | string \| number | ID of the triggering entity |
| `sourceType` | `'transaction' \| 'match' \| 'receivable' \| 'reconciliation'` | Type of trigger |
| `description` | string | Human-readable explanation |
| `performedBy` | `'admin' \| 'system'` | Who triggered the change |
| `timestamp` | ISO-8601 | When the change occurred |

**changeType values**:
- `fund_approved` — fund payment transaction approved
- `fine_posted` — fine/pitch fee receivable created from match
- `attendance_edit` — attendance status changed, receivable updated
- `match_cancelled` — match deleted, receivables reversed
- `reconciliation` — balance forcibly corrected by consistency checker

**Validation rules**:
- All entries are append-only (never updated or deleted)
- `before + delta === after` must always hold
- Created atomically alongside the operation that changes the balance

---

### ConsistencyReport (in-memory only, not persisted)

**Role**: Temporary result of running the consistency checker. Displayed in UI, not stored.

| Field | Type | Description |
|---|---|---|
| `memberId` | number | Member checked |
| `memberName` | string | For display |
| `expectedFundPaid` | number | Computed from transactions |
| `actualFundPaid` | number | Current member.fundPaid |
| `expectedFines` | number | Computed from transactions |
| `actualFines` | number | Current member.fines |
| `fundDrift` | number | expectedFundPaid - actualFundPaid |
| `finesDrift` | number | expectedFines - actualFines |
| `isConsistent` | boolean | true if both drifts are 0 |

---

## Key Relationships

```
Member (1) ←──────────────── Receivable (many)
                              │
                              ↓ (paidAt, transactionId)
                           Transaction (many)
                              
Match (1) ←──────── Receivable (many)   [via matchId]
Match (1) ←──────── FinancialAuditLog   [via sourceId, sourceType='match']
Member (1) ←──────── FinancialAuditLog  [via memberId + sub-collection]
```

---

## Computed Derivations

All financial displays in the UI should derive from `receivables` + `transactions`, NOT from `member.fundPaid / member.fines` (which are denormalized caches for legacy compatibility only).

```javascript
// For a given member M:
totalOwed    = receivables.filter(r => r.memberId === M.id).sum('amount')
totalPaid    = transactions.filter(t => t.memberId === M.id && t.type === 'income').sum('amount')
outstanding  = receivables.filter(r => r.memberId === M.id && r.status === 'unpaid').sum('amount')
credit       = max(0, totalPaid - totalOwed)  // overpayment credit
```
