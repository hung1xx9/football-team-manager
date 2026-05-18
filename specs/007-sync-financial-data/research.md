# Research: Financial Data Synchronization

**Feature**: `007-sync-financial-data`  
**Phase**: 0 — Outline & Research  
**Date**: 2026-05-18

---

## Finding 1: Current Financial Data Architecture

**Decision**: The system maintains financial state in two overlapping stores that can diverge.

**Current state**:
- `member.fundPaid` / `member.fines` — legacy denormalized balance counters directly on the member document
- `receivables[]` — the **intended source of truth**: one record per obligation (monthly fund, fine, pitch fee), each with `status: 'unpaid' | 'paid'`
- `transactions[]` — confirmed payments, linked to receivables via `transactionId`
- `matches[].attendance[]` — attendance records that imply fines/fees but do NOT automatically generate receivables unless `finalizeMatch()` is called

**Root cause of divergence risk**:
1. `member.fundPaid` is updated via `addTransaction()` but NOT via `approvePendingTransactionAtomic()` in some cases (currently partially handled)
2. Attendance edits after `finalizeMatch()` don't retroactively update receivables
3. No single "recalculate from source" function exists
4. `getMemberFinancialStatus()` in `useFinancialCalculations.js` references an undefined `receivables` variable (bug discovered at line 51 — `receivables` is not in scope, only available via `useAppState`)

**Rationale**: `receivables` collection is the correct source of truth for what is owed. `transactions` is the source of truth for what was paid. The sync layer must bridge attendance → receivables and receivables + transactions → member summary.

**Alternatives considered**:
- Pure derived computation (no receivables): rejected — Firestore can't run complex queries atomically across matches
- Event sourcing pattern: rejected — too complex for team size/scope, receivables ledger achieves the same auditability

---

## Finding 2: Atomic Transaction Pattern (Existing)

**Decision**: Extend the existing `runAtomicTransaction` / `approvePendingTransactionAtomic` pattern for all new financial mutations.

**Current pattern** (from `useFirebase.js` lines 207–327):
```
Pre-read (outside transaction) → runTransaction() { all reads first → all writes after }
```
This correctly satisfies Firestore's requirement that no reads occur after writes in a transaction.

**New operations needed**:

| Operation | Atomic scope |
|---|---|
| Approve fund payment | pendingTransaction + member.fundPaid + receivables (existing, complete) |
| Post attendance fee | match.attendance + receivables (new receivable creation) |
| Edit attendance status | match.attendance + receivables (update existing or create new) |
| Cancel match | match + all linked receivables (bulk status update) |
| Reconcile member balance | member + receivables + transactions (recalculate everything) |

**Rationale**: Firestore transactions guarantee isolation. The existing `runAtomicTransaction` helper correctly handles the read-before-write ordering constraint.

---

## Finding 3: Attendance → Receivable Lifecycle

**Decision**: Attendance-driven fees should create/update receivables at **finalization time**, not at attendance record time. Edits to attendance after finalization must trigger a delta-update on linked receivables.

**Current gap**: `finalizeMatch()` creates receivables once. If attendance is edited afterward, existing receivables are not updated. There is no link between `attendance[].memberId` and `receivables[].matchId + memberId`.

**New lifecycle**:
```
Attendance saved → (immediate) → pending fee calculated (in-memory display only)
Match finalized → (atomic) → receivables created for all members
Attendance edited post-finalization → (atomic) → existing receivable updated or voided + new one created
Match deleted → (atomic) → all linked receivables deleted (matched by matchId)
```

**Key constraint** (from spec assumption): Fee amounts are **snapshotted at the time of receivable creation**. Changing penalty settings in future does not retroactively update existing receivables.

**Rationale**: Matches the standard accounting principle of recording obligations at the point they are incurred.

---

## Finding 4: Bug — `getMemberFinancialStatus` Scope Error

**Decision**: Fix the existing bug in `useFinancialCalculations.js` line 51 as part of this feature.

**Bug**: `receivables.value` is referenced inside `getMemberFinancialStatus()` but `receivables` is never imported/destructured from `useAppState()`. The function only destructures `{ members, matches, contributionTiers }`. This means `getMemberFinancialStatus()` would always throw a ReferenceError if called.

**Fix**: Add `receivables` to the `useAppState()` destructure in `useFinancialCalculations.js`.

**Rationale**: This function is the intended source of per-member financial status. Fixing it is a prerequisite for the consistency checker.

---

## Finding 5: Consistency Check Algorithm

**Decision**: Implement a client-side consistency checker that computes expected balances from receivables + transactions and compares against the denormalized `member.fundPaid` / `member.fines` counters.

**Algorithm**:
```
For each member:
  expected_fundPaid = sum(transactions where memberId=M and category IN ['fund','monthly_fund'] and type='income')
  expected_fines    = sum(transactions where memberId=M and category IN ['fine','pitch_fee'] and type='income')
  actual_fundPaid   = member.fundPaid
  actual_fines      = member.fines
  
  if |actual - expected| > 0: flag as INCONSISTENT
```

**Reconciliation**:
```
For each flagged member:
  transaction.update(memberRef, { fundPaid: expected_fundPaid, fines: expected_fines })
```

**Rationale**: Transactions are immutable records (never edited after creation), making them the most reliable baseline for recalculation. This matches standard accounting reconciliation.

---

## Finding 6: Audit Log Strategy

**Decision**: Store audit log entries as a `financialAuditLog` sub-collection under each member document in Firestore, with a local in-memory cache for UI display.

**Entry structure**:
```json
{
  "id": "timestamp-based",
  "memberId": "...",
  "changeType": "fund_approved | fine_posted | attendance_edit | reconciliation | match_cancelled",
  "before": { "fundPaid": 0, "fines": 0 },
  "after": { "fundPaid": 50000, "fines": 0 },
  "delta": 50000,
  "sourceId": "transactionId | matchId | receivableId",
  "sourceType": "transaction | match | receivable",
  "performedBy": "admin | system",
  "timestamp": "ISO-8601"
}
```

**Rationale**: Sub-collection avoids bloating the member document. Client-side reads only when user views audit log (lazy loaded). Consistent with Firestore best practices for append-only audit trails.

---

## Finding 7: Testing Strategy

**Decision**: Three-tier testing approach using existing toolchain.

**Unit tests (Vitest)**:
- `useFinancialSync.js`: test each function with mocked Firestore and state
- `useFinancialCalculations.js`: pure calculation functions (no mocking needed)
- Cover all 6 edge cases from spec

**Component tests (Vitest + Vue Test Utils)**:
- `FinancialAuditLog.vue`: renders entries, filters by date
- `FinanceView.vue`: reconcile button triggers correct flow

**E2E tests (Playwright + Firebase Emulator)**:
- Full approval flow: pending transaction → approve → verify member balance
- Attendance edit flow: change status → verify receivable updated
- Consistency check + reconcile flow

**Rationale**: Constitution I requires automated tests. Firebase Emulator (already in project) makes E2E testing safe without touching production data.

---

## Summary of Decisions

| # | Topic | Decision |
|---|---|---|
| 1 | Source of truth | `receivables` for obligations, `transactions` for payments |
| 2 | Mutation pattern | Extend existing `runAtomicTransaction` helper |
| 3 | Attendance fee lifecycle | Create at finalization; delta-update on edit |
| 4 | Bug fix | Fix `getMemberFinancialStatus` scope error |
| 5 | Consistency check | Compare `member.fundPaid/fines` against `transactions` sum |
| 6 | Audit log | Firestore sub-collection `financialAuditLog` per member |
| 7 | Testing | Unit (Vitest) + E2E (Playwright + Emulator) |
