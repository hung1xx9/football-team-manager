# Tasks: Financial Data Synchronization

**Input**: Design documents from `/specs/007-sync-financial-data/`  
**Branch**: `007-sync-financial-data`  
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅ | quickstart.md ✅

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on each other)
- **[Story]**: Which user story this task belongs to (US1–US4)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Fix the pre-existing bug and create the new file scaffolding that all phases depend on.

- [ ] T001 Fix `receivables` and `transactions` not being destructured from `useAppState()` inside `getMemberFinancialStatus()` in `src/composables/useFinancialCalculations.js` (line 5 and line 51 — research.md Finding 4)
- [ ] T002 Add `financialAuditLog` Firestore sub-collection write helper to `src/composables/useFirebase.js` — function `appendAuditLog(memberId, entry)` that does `rootRef.collection('members').doc(memberId).collection('financialAuditLog').add(entry)`
- [ ] T003 Create empty scaffold `src/composables/useFinancialSync.js` exporting the composable shell with reactive state: `isChecking`, `isReconciling`, `lastCheckResults`, `inconsistentCount`
- [ ] T004 [P] Create empty scaffold `src/components/FinancialAuditLog.vue` with basic component structure (template, script setup, props: `memberId`)

**Checkpoint**: Bug fixed, scaffolds exist — all user story phases can now begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core sync logic that all user stories build on — `FinancialAuditLog` entity, atomic helpers in Firebase layer, and the `useFinancialSync` internal utilities.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Implement `appendAuditLog(memberId, entry)` fully in `src/composables/useFirebase.js` — builds the `FinancialAuditLog` entry shape from data-model.md, writes to `members/{memberId}/financialAuditLog`, returns the new doc ID
- [ ] T006 Implement `reconcileMemberAtomic(memberId)` in `src/composables/useFirebase.js` — Firestore transaction that: reads all transactions for member, computes `expectedFundPaid` and `expectedFines`, writes corrected values to `members/{memberId}`, appends audit log entry with `changeType: 'reconciliation'`
- [ ] T007 Implement `postAttendanceFeeAtomic(matchId, memberId, attendanceRecord)` in `src/composables/useFirebase.js` — Firestore transaction that: looks up existing receivable for `matchId + memberId`, voids it if it exists (set `status: 'voided'`), creates new receivable with snapshotted amount if fee > 0, appends audit log entry with `changeType: 'attendance_edit'`
- [ ] T008 Implement `voidMatchFeesAtomic(matchId)` in `src/composables/useFirebase.js` — Firestore transaction that: queries all unpaid receivables for `matchId` (pre-read outside transaction), sets each to `status: 'voided'`, appends audit log entry per affected member with `changeType: 'match_cancelled'`
- [ ] T009 Export all four new functions from `useFirebase()` return object in `src/composables/useFirebase.js`
- [ ] T010 Implement `runConsistencyCheck()` pure function in `src/composables/useFinancialSync.js` — reads from reactive `members` and `transactions` state only (no Firestore call), computes `ConsistencyReport[]` per data-model.md spec, sets `lastCheckResults` and `inconsistentCount`

**Checkpoint**: Core atomic operations and sync engine are ready — user stories can now be wired up

---

## Phase 3: User Story 1 — Fund Approval Sync (Priority: P1) 🎯 MVP

**Goal**: When a fund payment is approved, member balance updates atomically and is immediately visible.

**Independent Test**: Approve a pending fund transaction → verify `member.fundPaid` increases by the correct amount, linked receivable changes to `paid`, and a `fund_approved` audit log entry is created — all in a single operation that either fully succeeds or fully fails.

### Implementation for User Story 1

- [ ] T011 [US1] Extend `approvePendingTransactionAtomic` in `src/composables/useFirebase.js` to call `appendAuditLog` inside the same transaction — add audit entry with `changeType: 'fund_approved'`, `before: { fundPaid: member.fundPaid, fines: member.fines }`, `after` values, `sourceId: pendingId`, `sourceType: 'transaction'`
- [ ] T012 [US1] Update local reactive state sync in `src/composables/useAppState.js` — after `approvePendingTransactionAtomic` resolves, update `members.value` array entry to reflect new `fundPaid` value without waiting for the Firestore real-time listener to fire (optimistic update)
- [ ] T013 [US1] Update `PendingTransactionsView.vue` to display a success toast (via `useToast`) with the approved amount and member name after successful approval; display error toast with Vietnamese message on failure
- [ ] T014 [US1] Verify `FinanceView.vue` financial summary correctly reads from `receivables` (not legacy `member.fundPaid`) for the "total outstanding" display — fix if it currently reads from the member field directly

**Checkpoint**: Approving a fund transaction updates balance, marks receivable paid, and creates audit log atomically

---

## Phase 4: User Story 2 — Attendance-Driven Fee Sync (Priority: P1)

**Goal**: When attendance status changes for a finalized match, the member's fine/fee receivable is automatically updated.

**Independent Test**: Change a member's attendance from 'absent' to 'present' in a finalized match → verify the absence-fine receivable is voided and no new receivable is created. Change from 'present' to 'absent' → verify a new fine receivable is created with the correct snapshotted amount.

### Implementation for User Story 2

- [ ] T015 [US2] Add `postAttendanceFee` wrapper to `src/composables/useFinancialSync.js` — calls `postAttendanceFeeAtomic` from `useFirebase`, updates local `receivables.value` state on success, shows success/error toast via `useToast`
- [ ] T016 [US2] Wire `postAttendanceFee` into `saveMatch()` in `src/composables/useAppState.js` — after attendance array is updated for an existing match that has `finalized: true`, call `postAttendanceFee` for each member whose attendance status changed (diff old vs new attendance array)
- [ ] T017 [US2] Add `attendanceStatus` field to newly created receivable records in `finalizeMatch()` in `src/composables/useAppState.js` — snapshot the attendance status that triggered the receivable (needed for audit traceability per data-model.md)
- [ ] T018 [US2] Update `deleteMatch()` in `src/composables/useAppState.js` to call `voidMatchFees` from `useFinancialSync` for finalized matches before deleting — replace the current `receivables.value.filter(r => r.matchId !== id)` local-only removal with the atomic Firestore path, then update local state on success
- [ ] T019 [US2] Add `voidMatchFees` wrapper to `src/composables/useFinancialSync.js` — calls `voidMatchFeesAtomic` from `useFirebase`, updates local `receivables.value` to reflect voided status, shows toast with count of voided receivables

**Checkpoint**: All attendance changes and match deletions automatically keep receivables consistent

---

## Phase 5: User Story 3 — Consistency Check & Reconciliation (Priority: P2)

**Goal**: Admin can detect members with drifted balances and trigger reconciliation with a single action.

**Independent Test**: Manually set `member.fundPaid` to a wrong value in Firestore emulator → run consistency check → verify member appears in inconsistent list with correct `fundDrift` → click "Đồng bộ lại" → verify `member.fundPaid` is corrected and a `reconciliation` audit log entry exists.

### Implementation for User Story 3

- [ ] T020 [US3] Implement `reconcileMember(memberId)` in `src/composables/useFinancialSync.js` — calls `reconcileMemberAtomic` from `useFirebase`, updates local `members.value` entry, removes member from `lastCheckResults` inconsistent list
- [ ] T021 [US3] Implement `reconcileAllMembers()` in `src/composables/useFinancialSync.js` — calls `runConsistencyCheck()` first, then calls `reconcileMember()` for each inconsistent member sequentially, tracks success/fail count, returns summary object per API contract
- [ ] T022 [US3] Add "Kiểm tra tính nhất quán" (Consistency Check) section to `src/views/FinanceView.vue` — button triggers `runConsistencyCheck()`, sets `isChecking` during run, displays results table showing member name, drift amounts, and consistency status when complete
- [ ] T023 [US3] Add "Đồng bộ lại" (Reconcile All) button to the consistency check section in `src/views/FinanceView.vue` — visible only when `inconsistentCount > 0`, triggers `reconcileAllMembers()`, shows progress with `isReconciling` state, displays success/fail summary toast on completion
- [ ] T024 [US3] Style the consistency check results table in `src/views/FinanceView.vue` with mobile-first layout — green row for consistent members, amber/red row for inconsistent members, show drift amounts in Vietnamese format (e.g. "-50.000đ")

**Checkpoint**: Admin can detect and fix all financial drift within 2 minutes via the Finance view

---

## Phase 6: User Story 4 — Financial Audit Log View (Priority: P3)

**Goal**: Members and admins can view a full, chronological history of balance changes for any member.

**Independent Test**: After performing fund approval + attendance edit, open audit log for that member → verify both entries appear in newest-first order with correct `changeType`, `before/after` values, and `sourceType`.

### Implementation for User Story 4

- [ ] T025 [US4] Implement `getMemberAuditLog(memberId, options)` in `src/composables/useFinancialSync.js` — fetches from Firestore `members/{memberId}/financialAuditLog`, applies optional `startDate`/`endDate` filters, sorts by `timestamp` descending, defaults to 50 entries limit per API contract
- [ ] T026 [US4] Add `getMemberAuditLog` to the `useFirebase.js` download infrastructure — add `financialAuditLog` sub-collection to the collections fetched (or keep as lazy-fetch, only called on demand)
- [ ] T027 [P] [US4] Implement `FinancialAuditLog.vue` component in `src/components/FinancialAuditLog.vue` — receives `memberId` prop, calls `getMemberAuditLog` on mount, displays entries in a scrollable list with: date/time, change type label (Vietnamese), delta amount (green=positive, red=negative), balance before/after, source description
- [ ] T028 [P] [US4] Add month filter controls to `FinancialAuditLog.vue` — two date inputs (start/end), re-fetches on change, shows "Không có giao dịch" empty state
- [ ] T029 [US4] Integrate `FinancialAuditLog.vue` into `src/views/FinanceView.vue` — add "Lịch sử tài chính" tab or expandable panel per member, lazy-load the component only when opened (conditional render, not eager import)
- [ ] T030 [US4] Add admin access to view any member's audit log in `src/views/FinanceView.vue` — member selector dropdown (admin only), passes selected `memberId` to `FinancialAuditLog` component; members see only their own log (read from `useAuth` current user)

**Checkpoint**: Full audit trail is accessible per-member with date filtering

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Hardening, edge cases, and E2E validation across all user stories.

- [x] T031 [P] Add unit tests for `runConsistencyCheck()` pure function in `tests/unit/useFinancialSync.test.js` — test with: all consistent members, one drifted member, member with zero transactions, member with mixed fund+fines payments
- [x] T032 [P] Add unit tests for `useFinancialCalculations.js` fixed functions in `tests/unit/useFinancialCalculations.test.js` — test `getMemberFinancialStatus` with real receivables data, test `calculateRequiredFines` across multiple matches
- [x] T033 Add E2E test for fund approval flow in `tests/e2e/financial-sync.spec.js` — using Firebase Emulator: seed pending transaction → approve → assert member balance and receivable status correct
- [x] T034 Add E2E test for attendance edit flow in `tests/e2e/financial-sync.spec.js` — using Firebase Emulator: seed finalized match with fine → edit attendance to present → assert receivable is voided
- [x] T035 Add E2E test for consistency check + reconcile in `tests/e2e/financial-sync.spec.js` — using Firebase Emulator: seed drifted member → run check → reconcile → assert balance corrected and audit log entry exists
- [x] T036 [P] Handle overpayment scenario in `postAttendanceFeeAtomic` — if member has paid more than total owed, ensure credit balance is correctly reflected (do not create negative receivables)
- [x] T037 [P] Add loading skeleton state to consistency check results table in `src/views/FinanceView.vue` while `isChecking === true`
- [x] T038 Validate all Vietnamese toast messages across new flows in `src/composables/useFinancialSync.js` — ensure each error message is clear and actionable for non-technical admins
- [x] T039 Run all quickstart.md validation checklist items manually and confirm 100% pass before merging

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)        → No dependencies — start immediately
Phase 2 (Foundational) → Requires Phase 1 complete — BLOCKS Phases 3–7
Phase 3 (US1)          → Requires Phase 2 complete — can run in parallel with Phases 4–6
Phase 4 (US2)          → Requires Phase 2 complete — can run in parallel with Phases 3, 5–6
Phase 5 (US3)          → Requires Phase 2 complete + Phase 3 recommended (uses same reconcile path)
Phase 6 (US4)          → Requires Phase 2 complete — independent of Phases 3–5
Phase 7 (Polish)       → Requires all desired user story phases complete
```

### User Story Dependencies

- **US1 (P1)**: No story-to-story dependencies. Only needs Phase 2 complete.
- **US2 (P1)**: No story-to-story dependencies. Only needs Phase 2 complete.
- **US3 (P2)**: Logically depends on US1 existing data to test properly, but technically independent.
- **US4 (P3)**: Fully independent — audit log populated by US1 + US2 operations naturally.

### Within Each Phase

- T001 (bug fix) → must be done before any financial calculation functions are called
- T005–T009 (Firebase atomic helpers) → must be done before T011, T015, T018, T020
- T010 (`runConsistencyCheck`) → must be done before T022 (UI wires to it)
- T015 → T016 (wrapper before wire-up)
- T021 → T022, T023 (reconcileAll before UI)

---

## Parallel Execution Examples

### Phase 2 parallel batch

```
Start simultaneously:
  T005 - appendAuditLog helper
  T006 - reconcileMemberAtomic (depends on T005 for audit)
  T007 - postAttendanceFeeAtomic
  T008 - voidMatchFeesAtomic
  T010 - runConsistencyCheck (pure function, no Firebase dependency)
```

### Phase 3 + Phase 4 parallel batch (after Phase 2 complete)

```
Start simultaneously:
  T011 - Extend approvePendingTransactionAtomic (US1)
  T015 - postAttendanceFee wrapper (US2)
  T025 - getMemberAuditLog (US4)
  T027 - FinancialAuditLog.vue component (US4)
```

### Phase 7 parallel batch

```
Start simultaneously:
  T031 - Unit tests: useFinancialSync
  T032 - Unit tests: useFinancialCalculations
  T036 - Overpayment edge case
  T037 - Loading skeleton UI
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 — Core Financial Safety)

1. Complete Phase 1: Setup (T001–T004) — fix the existing bug
2. Complete Phase 2: Foundational (T005–T010) — build atomic operations
3. Complete Phase 3: User Story 1 (T011–T014) — fund approval sync
4. Complete Phase 4: User Story 2 (T015–T019) — attendance fee sync
5. **STOP and VALIDATE**: Test both stories using Firebase Emulator
6. Deploy — team finances are now consistent by design

### Incremental Delivery

1. Setup + Foundational → bug fixed, engine ready
2. US1 + US2 → core financial safety guaranteed (MVP)
3. US3 → admin can detect and fix any historical drift
4. US4 → full transparency via audit log
5. Polish → tests, edge cases, hardening

---

## Notes

- [P] tasks = different files, no dependencies between them — safe to parallelize
- All Firestore writes must follow the read-before-write pattern from `useFirebase.js` (see quickstart.md)
- `receivable.amount` is immutable after creation — never update, always void + recreate
- All user-facing messages must be in Vietnamese
- Test against Firebase Emulator (not production) for all atomic transaction tests
- Stop at each phase checkpoint to validate independently before proceeding
