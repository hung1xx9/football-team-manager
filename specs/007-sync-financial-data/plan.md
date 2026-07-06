# Implementation Plan: Financial Data Synchronization

**Branch**: `007-sync-financial-data` | **Date**: 2026-05-18 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/007-sync-financial-data/spec.md`

---

## Summary

Implement a robust financial consistency layer that ensures a member's financial summary (fund paid, fines, match fees) always reflects the ground truth derived from three source-of-truth collections: `receivables`, `matches.attendance`, and `transactions`. The solution introduces a dedicated `useFinancialSync` composable that provides atomic operations for fund approval, attendance-driven fee posting, consistency checking, and reconciliation — all built on the existing Firestore atomic transaction infrastructure.

---

## Technical Context

**Language/Version**: JavaScript (ES2022), Vue 3 Composition API  
**Primary Dependencies**: Vue 3, Firebase Compat SDK v9 (Firestore, Cloud Functions), Vitest, Playwright  
**Storage**: Firestore (primary cloud), localStorage (offline cache)  
**Testing**: Vitest (unit/composable), Playwright (E2E), Firebase Emulator Suite  
**Target Platform**: Progressive Web App (mobile-first, Chrome/Safari)  
**Project Type**: Web application (Vue 3 + Firebase SPA/PWA)  
**Performance Goals**: Financial updates visible to users within 3 seconds of approval  
**Constraints**: All financial mutations must be atomic (all-or-nothing); no partial states  
**Scale/Scope**: Up to 30 members, ~100 matches/year, ~500 receivables/year

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| **I. Comprehensive Testing** | ✅ PASS | Plan includes Vitest unit tests for all composable logic and Playwright E2E for approval flows |
| **II. Firebase & Resilience** | ✅ PASS | All mutations use `runAtomicTransaction` (existing pattern). Writes are idempotent by design |
| **III. Financial Transparency & Auditability** | ✅ PASS | `FinancialAuditLog` entity added. All balance changes logged with before/after values |
| **IV. Mobile-First & Responsive UX** | ✅ PASS | Reconciliation UI uses existing mobile-first component patterns. No new layout framework needed |
| **V. User Feedback & Graceful Failure** | ✅ PASS | All async operations integrate with existing `useToast` system. Atomic failures roll back completely |

**Result: All gates PASS. No complexity justification required.**

---

## Project Structure

### Documentation (this feature)

```text
specs/007-sync-financial-data/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   └── financial-sync-api.md   ← composable public API contract
└── tasks.md             ← Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── composables/
│   ├── useFinancialSync.js         ← NEW: core sync + consistency engine
│   ├── useFinancialCalculations.js ← MODIFIED: derives totals from receivables (source of truth)
│   ├── useFirebase.js              ← MODIFIED: add approveAttendanceFeeAtomic, reconcileMemberBalance
│   └── useAppState.js              ← MODIFIED: wire new sync hooks into approvals + attendance edits
├── views/
│   ├── FinanceView.vue             ← MODIFIED: add consistency check UI + reconcile button
│   └── PendingTransactionsView.vue ← MODIFIED: approval calls new atomic path
└── components/
    └── FinancialAuditLog.vue       ← NEW: per-member audit log display component

functions/
└── index.js                        ← MODIFIED: add reconcileAllMembers callable function

tests/
├── unit/
│   ├── useFinancialSync.test.js    ← NEW
│   └── useFinancialCalculations.test.js ← NEW / extended
└── e2e/
    └── financial-sync.spec.js      ← NEW
```

**Structure Decision**: Single-project Vue 3 SPA (Option 1). All new code is composable-first, following the existing `useAppState` + `useFirebase` layered architecture. No new top-level packages needed.

---

## Complexity Tracking

> No Constitution violations detected. Section not required.
