# Implementation Plan: Unify Toast Notifications

**Branch**: `004-unify-toasts` | **Date**: 2026-04-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-unify-toasts/spec.md`

## Summary

The goal is to replace blocking modal alerts (`showAlert`) across the application with non-blocking toast notifications that stack vertically. This improves the UX and ensures consistency. We will implement this by creating a global `useToast` composable with a stateful array and a new `ToastContainer` component that mounts in `App.vue`.

## Technical Context

**Language/Version**: Vue 3 (Composition API), JavaScript
**Primary Dependencies**: Vite
**Storage**: N/A (State is ephemeral/in-memory)
**Testing**: Vitest (Unit/Component tests for composable)
**Target Platform**: Web and Mobile PWA
**Project Type**: Web Application
**Performance Goals**: Minimal rendering overhead when stacking multiple toasts.
**Constraints**: Toasts must auto-dismiss smoothly without blocking user interactions.
**Scale/Scope**: Replace existing `showNotification` implementation in `App.vue` and `showAlert` usages throughout views.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Comprehensive Testing**: Validated. We will add unit tests for `useToast` to ensure the array logic works correctly (add/remove stack).
- **User Feedback & Graceful Failure**: Validated. Toast notifications inherently provide clear user feedback without interrupting workflow.
- **Mobile-First**: Validated. The toast container must be styled nicely for mobile screens (likely stacked at top or bottom-center).

## Project Structure

### Documentation (this feature)

```text
specs/004-unify-toasts/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A)
└── tasks.md             # Phase 2 output
```

### Source Code

```text
src/
├── composables/
│   ├── useToast.js       # New composable to manage global toast state
│   └── useAppState.js    # Refactor out showAlert logic bridging to toast
├── components/
│   ├── ToastContainer.vue# New component managing stacked toasts
│   └── ToastMessage.vue  # New component for individual toast item
│   ├── ToastContainer.vue
│   └── ToastMessage.vue
├── assets/
│   └── css/
│       └── toast.css
└── App.vue
```

**Structure Decision**: A new composable `useToast.js` specifically manages the ephemeral list of notifications. This keeps `useAppState` focused on core logic. The UI will be encapsulated in `ToastContainer.vue`.
