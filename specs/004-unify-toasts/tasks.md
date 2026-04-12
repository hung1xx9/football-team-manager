# Tasks: Unify Toast Notifications

**Input**: Design documents from `/specs/004-unify-toasts/`
**Prerequisites**: plan.md (required), spec.md, research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: UI and styles initialization for Toasts

- [x] T001 Create toast styles in src/assets/css/toast.css
- [x] T002 Import `toast.css` globally in src/main.js or src/App.vue if needed (Wait, standard is to import in `App.vue` or direct assets). Let's import it in `src/App.vue` or link it in `<style>`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Implement `useToast` composable with internal reactive array in src/composables/useToast.js
- [x] T004 [P] Create `ToastMessage` UI component in src/components/ToastMessage.vue
- [x] T005 Create `ToastContainer` component that mounts `ToastMessage` instances in src/components/ToastContainer.vue
- [x] T006 Add `ToastContainer` to the root view in src/App.vue

**Checkpoint**: Foundation ready - Toasts can now be rendered and called programmatically.

---

## Phase 3: User Story 1 - Consistent Notification Experience (Priority: P1) 🎯 MVP

**Goal**: Replace all blocking modal alerts and isolated notifications with the new unified toast system.

**Independent Test**: Can be fully tested by triggering a save or error action and verifying that a toast notification appears instead of a blocking modal popup and stacks correctly.

### Implementation for User Story 1

- [x] T007 [US1] Refactor `showAlert` to proxy to `showToast` in src/composables/useAppState.js
- [x] T008 [US1] Remove deprecated `notification` reactive object and its old DOM structure from src/App.vue
- [x] T009 [US1] Update `showNotification` calls to use `showToast` in src/App.vue

**Checkpoint**: User Story 1 should be fully functional and testable independently. Informational popups are completely migrated to toasts.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T010 Code cleanup and checking for any orphaned `showAlert` expectations (e.g., awaiting its promise unnecessarily) across views.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on styling structure (Phase 1) - BLOCKS all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational phase completion.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.

### Within Each User Story

- Foundational composables and UI components before integration.

### Parallel Opportunities

- CSS styling (T001) and composable code (T003) can be worked on in parallel.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
