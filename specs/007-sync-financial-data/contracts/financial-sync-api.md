# API Contract: useFinancialSync Composable

**Feature**: `007-sync-financial-data`  
**Type**: Vue 3 Composable (internal application API)  
**Location**: `src/composables/useFinancialSync.js`

---

## Overview

`useFinancialSync` is the single entry point for all financial mutation and consistency operations. It wraps the underlying Firestore atomic transaction primitives and exposes a clean, intent-based API to views and other composables.

---

## Exported Functions

### `postAttendanceFee(matchId, memberId, attendanceRecord)`

Creates or updates a receivable when a member's attendance status generates a fee obligation.

**Parameters**:
| Param | Type | Description |
|---|---|---|
| `matchId` | `number` | ID of the match |
| `memberId` | `number` | ID of the member |
| `attendanceRecord` | `object` | `{ status, isLate, lateMinutes }` — current attendance data |

**Returns**: `Promise<{ receivableId: string, amount: number }>`

**Behavior**:
- If a receivable already exists for this `matchId + memberId`, it is updated (amount recalculated from current settings)
- If no receivable exists and fee amount > 0, a new receivable is created
- If attendance is 'present' with no late penalty: any existing fine receivable for this match+member is voided
- Operation is atomic: receivable + audit log entry are written in a single transaction

**Errors**: Throws if match or member does not exist, or if transaction fails.

---

### `voidMatchFees(matchId)`

Removes all unpaid fee receivables associated with a deleted or cancelled match.

**Parameters**:
| Param | Type | Description |
|---|---|---|
| `matchId` | `number` | ID of the match being deleted |

**Returns**: `Promise<{ voidedCount: number, affectedMemberIds: number[] }>`

**Behavior**:
- Only deletes receivables with `status: 'unpaid'`
- Already-paid receivables are left untouched (money was already processed)
- Creates an audit log entry for each affected member
- Operation is atomic across all affected members

---

### `runConsistencyCheck()`

Computes the expected financial state for every member from the transactions ledger and compares against denormalized member fields.

**Parameters**: none

**Returns**: `Promise<ConsistencyReport[]>`

Where `ConsistencyReport`:
```typescript
{
  memberId: number,
  memberName: string,
  expectedFundPaid: number,
  actualFundPaid: number,
  expectedFines: number,
  actualFines: number,
  fundDrift: number,        // positive = member.fundPaid is too high
  finesDrift: number,
  isConsistent: boolean
}
```

**Behavior**:
- Reads all transactions and all members from current reactive state (no Firestore call needed)
- Pure computation, no writes
- Returns empty array if all members are consistent

---

### `reconcileMember(memberId)`

Corrects the denormalized balance fields for a single member by recalculating from the transactions ledger.

**Parameters**:
| Param | Type | Description |
|---|---|---|
| `memberId` | `number` | ID of the member to reconcile |

**Returns**: `Promise<{ before: object, after: object, delta: number }>`

**Behavior**:
- Recalculates `fundPaid` and `fines` from sum of approved transactions
- Writes corrected values to Firestore and local state atomically
- Creates an audit log entry with `changeType: 'reconciliation'`
- Idempotent: calling multiple times produces the same result

---

### `reconcileAllMembers()`

Runs `reconcileMember` for every member flagged as inconsistent by `runConsistencyCheck`.

**Parameters**: none

**Returns**: `Promise<{ reconciled: number, skipped: number, errors: string[] }>`

**Behavior**:
- Calls `runConsistencyCheck()` first
- Processes only members with `isConsistent === false`
- Reports per-member success/failure
- Does NOT abort all on single failure (best-effort, reports errors)

---

### `getMemberAuditLog(memberId, options?)`

Retrieves the financial audit log for a specific member.

**Parameters**:
| Param | Type | Description |
|---|---|---|
| `memberId` | `number` | Member to fetch log for |
| `options` | `object` | Optional: `{ startDate?, endDate?, limit? }` |

**Returns**: `Promise<FinancialAuditLogEntry[]>` sorted by timestamp descending

**Behavior**:
- Fetches from Firestore sub-collection `members/{memberId}/financialAuditLog`
- Applies date filters if provided
- Default limit: 50 entries
- Entries are returned newest-first

---

## Reactive State (returned from composable)

| Property | Type | Description |
|---|---|---|
| `isChecking` | `Ref<boolean>` | True while consistency check is running |
| `isReconciling` | `Ref<boolean>` | True while reconciliation is in progress |
| `lastCheckResults` | `Ref<ConsistencyReport[]>` | Results of the most recent consistency check |
| `inconsistentCount` | `ComputedRef<number>` | Number of members with drift > 0 |

---

## Error Handling

All functions follow this pattern:
- On network failure: throw with a Vietnamese-language user-facing message
- On Firestore transaction conflict: automatically retry up to 3 times (Firestore SDK handles this)
- On data-not-found: throw with specific error identifying the missing entity
- Callers are responsible for catching and displaying errors via `useToast`

---

## Integration Points

| Caller | Function called | When |
|---|---|---|
| `PendingTransactionsView.vue` | (existing `approvePendingTransactionAtomic`) | On approve button click |
| `MatchesView.vue` | `postAttendanceFee()` | When attendance status changes post-finalization |
| `MatchesView.vue` (delete) | `voidMatchFees()` | Before deleting a finalized match |
| `FinanceView.vue` | `runConsistencyCheck()` | On "Kiểm tra" button click |
| `FinanceView.vue` | `reconcileAllMembers()` | On "Đồng bộ lại" button click |
| `FinancialAuditLog.vue` | `getMemberAuditLog()` | On member audit log panel open |
