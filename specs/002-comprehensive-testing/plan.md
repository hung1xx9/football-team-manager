# Implementation Plan: Comprehensive Testing Suite

**Branch**: `002-comprehensive-testing` | **Date**: 2026-04-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-comprehensive-testing/spec.md`

## Summary

Xây dựng bộ test tự động bao phủ toàn bộ ứng dụng Football Team Manager. Sử dụng Vitest cho unit/component test và mock Firebase services. Bộ test sẽ cover 10 composables, 6 components, và 13 views.

## Technical Context

**Language/Version**: JavaScript (ES Modules), Vue 3.3+
**Primary Dependencies**: Vitest, @vue/test-utils, @vitejs/plugin-vue
**Storage**: Firebase Firestore (mocked trong test)
**Testing**: Vitest + @vue/test-utils + happy-dom
**Target Platform**: Web (PWA), chạy test trên Node.js
**Project Type**: Web application (SPA - Vue 3 + Vite)
**Performance Goals**: Bộ test chạy < 60 giây
**Constraints**: Không kết nối Firebase thật khi test, mock toàn bộ
**Scale/Scope**: 10 composables, 6 components, 13 views

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Comprehensive Testing | ✅ PASS | Đây chính là mục tiêu của feature |
| II. Firebase & Resilience | ✅ PASS | Test sẽ mock Firebase, đảm bảo resilience |
| III. Financial Transparency | ✅ PASS | Test financial calculations rigorously |
| IV. Mobile-First | ✅ PASS | Component tests sẽ verify responsive behavior |
| V. User Feedback | ✅ PASS | Test error states và loading states |

## Project Structure

### Documentation (this feature)

```text
specs/002-comprehensive-testing/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── composables/        # 10 files - target cho unit tests
├── components/         # 6 files - target cho component tests
└── views/              # 13 files - target cho component tests

tests/
├── setup.js            # Global test setup, Firebase mocks
├── mocks/
│   └── firebase.js     # Firebase mock utilities
├── unit/
│   ├── useAuth.test.js
│   ├── useAppState.test.js
│   ├── useFirebase.test.js
│   ├── useFinancialCalculations.test.js
│   ├── useLeaveRequests.test.js
│   ├── useMoMo.test.js
│   ├── usePenalties.test.js
│   ├── useQRAttendance.test.js
│   ├── useBreakpoints.test.js
│   └── useEscapeClose.test.js
└── components/
    ├── AppConfirm.test.js
    ├── BaseSelect.test.js
    ├── BottomNav.test.js
    ├── Sidebar.test.js
    └── MemberSelector.test.js
```

**Structure Decision**: Thư mục `tests/` ở root, chia thành `unit/` cho composables và `components/` cho Vue components. Mọi Firebase calls được mock qua `tests/mocks/firebase.js`.
