# Football Team Manager Constitution

## Core Principles

### I. Comprehensive Testing (High Priority)
Every feature must have automated tests. Unit testing for composables and component testing for critical Vue views are required. E2E testing for user paths like attendance and finance must be prioritized.

### II. Firebase & Resilience
The application uses Firebase Firestore and Cloud Functions. All data-altering operations must be idempotent, secure, and resilient to transient network issues.

### III. Financial Transparency & Auditability
Financial calculations and transactions (especially via MoMo) must be accurate, logged, and transparently displayed to team members.

### IV. Mobile-First & Responsive UX
The application must be fully optimized for mobile devices, ensuring accessibility for players on the field.

### V. User Feedback & Graceful Failure
All interactions must provide clear feedback, especially during long-running async operations or failures.

## Technology Stack

- **Frontend**: Vue 3 (Composition API), Vite.
- **Backend**: Node.js (Firebase Cloud Functions).
- **Database**: Firestore.
- **Testing Tools**: Vitest (Unit/Component), Playwright (E2E), Firebase Emulator.

## Governance
This constitution guides all development iterations. All plans must reference these principles.

**Version**: 1.0.0 | **Ratified**: 2026-04-07 | **Last Amended**: 2026-04-07
