# Quickstart: Financial Data Synchronization

**Feature**: `007-sync-financial-data`  
**Audience**: Developer implementing this feature  
**Date**: 2026-05-18

---

## Context: What Problem Are We Solving?

The app currently has **two financial state stores that can drift apart**:

1. **`member.fundPaid` / `member.fines`** — denormalized counters written in multiple places (some paths miss updating them)
2. **`receivables[]`** — the intended ledger of what is owed, created by `finalizeMatch()` and `checkAndCreateMonthlyDebts()`

Additionally, attendance edits **after finalization don't update receivables**, meaning a member's fine could remain in the system even if the admin later excuses their absence.

We are building a sync layer that makes `receivables` + `transactions` the single source of truth, with `member.fundPaid/fines` becoming a **derived cache** that can always be recomputed.

---

## Files To Create

```
src/composables/useFinancialSync.js     ← Core new file
src/components/FinancialAuditLog.vue    ← New UI component
```

## Files To Modify

```
src/composables/useFinancialCalculations.js   ← Fix bug (line 51), add receivables import
src/composables/useFirebase.js               ← Add approveAttendanceFeeAtomic, reconcileMemberAtomic
src/composables/useAppState.js               ← Wire postAttendanceFee into saveMatch, deleteMatch
src/views/FinanceView.vue                    ← Add consistency check UI section
src/views/PendingTransactionsView.vue        ← Verify approval path uses atomic path
```

---

## Key Design Decisions To Follow

### 1. Receivables are immutable for amount

Once created, a receivable's `amount` field must NOT be changed. If attendance is edited:
- **Old receivable**: set `status = 'voided'` (new status, not deleted)
- **New receivable**: create with new calculated amount

This preserves a complete audit trail.

### 2. All writes use `runAtomicTransaction`

Every function in `useFinancialSync.js` that writes to Firestore must use the existing `runAtomicTransaction()` helper from `useFirebase.js`.

Pattern to follow (from existing `approvePendingTransactionAtomic`):
```javascript
// 1. Pre-read needed IDs OUTSIDE transaction (queries not allowed inside)
const idsToProcess = await rootRef.collection('...').where(...).get();

// 2. Run transaction with ALL reads first, then ALL writes
return db.runTransaction(async (tx) => {
  // ALL READS
  const snap1 = await tx.get(ref1);
  const snap2 = await tx.get(ref2);
  
  // ALL WRITES (after all reads)
  tx.update(ref1, { ... });
  tx.set(ref2, { ... });
});
```

### 3. Audit log is append-only

Never update or delete entries in `financialAuditLog`. Always `.add()` new documents.

### 4. Consistency check is pure computation

`runConsistencyCheck()` reads only from Vue reactive state (already loaded in memory). It does NOT make Firestore calls. This keeps it fast enough to run on demand without a loading spinner.

---

## Bug To Fix First (prerequisite)

**File**: `src/composables/useFinancialCalculations.js`  
**Line**: 51  
**Bug**: `receivables.value` referenced but `receivables` not in scope

```javascript
// BEFORE (broken):
const { members, matches, contributionTiers } = useAppState();

// AFTER (fixed):
const { members, matches, contributionTiers, receivables, transactions } = useAppState();
```

---

## Consistency Check Logic (reference implementation)

```javascript
const runConsistencyCheck = () => {
  const { members, transactions } = useAppState();
  
  return members.value.map(member => {
    const memberTxs = transactions.value.filter(
      t => t.memberId === member.id && t.type === 'income'
    );
    
    const expectedFundPaid = memberTxs
      .filter(t => ['fund', 'monthly_fund'].includes(t.category))
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expectedFines = memberTxs
      .filter(t => ['fine', 'pitch_fee'].includes(t.category))
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      memberId: member.id,
      memberName: member.name,
      expectedFundPaid,
      actualFundPaid: member.fundPaid || 0,
      expectedFines,
      actualFines: member.fines || 0,
      fundDrift: (member.fundPaid || 0) - expectedFundPaid,
      finesDrift: (member.fines || 0) - expectedFines,
      isConsistent: (member.fundPaid || 0) === expectedFundPaid && 
                    (member.fines || 0) === expectedFines
    };
  });
};
```

---

## Testing Checklist

Before marking any task complete, verify:

- [ ] Approving a fund payment updates `member.fundPaid` and marks receivable as paid in one atomic operation
- [ ] Changing attendance from 'absent' to 'present' for a finalized match voids the absence fine receivable
- [ ] Deleting a finalized match removes all linked unpaid receivables
- [ ] `runConsistencyCheck()` correctly identifies a member with drifted `fundPaid`
- [ ] `reconcileMember()` corrects the drift and creates an audit log entry
- [ ] `getMemberAuditLog()` returns entries in newest-first order
- [ ] All operations roll back completely on Firestore failure (test with emulator)
- [ ] UI shows toast notification for both success and failure of each operation
