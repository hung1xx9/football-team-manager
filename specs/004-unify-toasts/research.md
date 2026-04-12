# Phase 0: Outline & Research

## Research Findings

### 1. Replacing `showAlert` in `useAppState`
Decision: `showAlert` will be rewritten to silently proxy to `showToast` (info/error type) instead of triggering a modal dialog (via `AppConfirm`).
Rationale: By proxying the function, we minimize the refactoring scope over the numerous files that call `showAlert()`. However, `showAlert()` currently returns a Promise which resolves when the user clicks 'OK'. Toasts are auto-dismissing. 
Alternatives considered: The alternative is a manual massive find-and-replace of `await showAlert()` to `showToast()`. Proxying minimizes disruption but we must remove the `await` assumption if the promise resolves instantly. Since most awaits are just `await showAlert(); return;`, resolving immediately is practically identical to clicking 'OK' instantly.

### 2. Stacking Mechanism (State Management)
Decision: `useToast` will export a reactive array `toasts` and a `showToast(message, type, duration)` method.
Rationale: Allows for multiple toasts without conflict. Each toast gets a unique ID (`Date.now() + Math.random()`).
Alternatives considered: Managing it directly in `App.vue` like before, but a composable is more scalable and testable.

### 3. Visuals and Positioning
Decision: Toasts will render top-right on Desktop and top-center on Mobile, stacking vertically downwards.
Rationale: Fits the existing mobile-first standard. Reduces thumb-reach issues on mobile if stacked at top.
