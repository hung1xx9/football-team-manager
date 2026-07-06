# Tasks: Mobile Pull to Refresh

**Input**: Design documents from `/specs/005-pull-to-refresh/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

*No specific setup tasks required for this feature, as it integrates into the existing Vue 3 project.*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T001 Implement the core pull-to-refresh gesture composable in `src/composables/usePullToRefresh.js`
- [x] T002 [P] Create the wrapper UI component for the loading spinner in `src/components/PullToRefresh.vue`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Pull to Refresh Data (Priority: P1) 🎯 MVP

**Goal**: Allow mobile users to swipe down on the screen to fetch the latest cloud data and update the UI seamlessly.

**Independent Test**: Can be fully tested by opening the app on a mobile device or simulator, swiping down from the top of the main content area, observing a loading indicator, and verifying that the displayed data updates to match the current cloud state.

### Tests for User Story 1 (OPTIONAL) ⚠️

- [x] T003 [P] [US1] Write unit tests for the composable touch event logic in `tests/unit/usePullToRefresh.spec.js`
- [x] T004 [P] [US1] Write component tests to verify spinner rendering and slot integration in `tests/unit/PullToRefresh.spec.js`

### Implementation for User Story 1

- [x] T005 [US1] Integrate `<PullToRefresh>` wrapper into `src/views/MatchesView.vue` and link it to the existing data fetching logic.
- [x] T006 [P] [US1] Handle error scenarios with unified error toasts if the refresh operation fails in `src/views/MatchesView.vue`.
- [x] T007 [P] [US1] Integrate `<PullToRefresh>` wrapper into `src/views/PendingAttendancesView.vue` (and/or other list views) for consistent mobile experience.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T008 [P] Optimize spinner animation performance and review touch resistance for natural feel.
- [x] T009 Run quickstart.md validation to ensure the composable can be easily integrated by other developers.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)**: Can start immediately. BLOCKS User Story 1 integration.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.

### Within Each User Story

- Tests should be written and verify behavior.
- Composable and component structure before view integration.
- Core implementation before error handling polish.

### Parallel Opportunities

- The composable tests and component tests can be written in parallel.
- Integration into different views (MatchesView, PendingAttendancesView) can happen in parallel after the wrapper component is built.

---

## Parallel Example: User Story 1

```bash
# Launch integration across multiple views simultaneously:
Task: "Integrate <PullToRefresh> wrapper into src/views/MatchesView.vue..."
Task: "Integrate <PullToRefresh> wrapper into src/views/PendingAttendancesView.vue..."
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
2. Complete Phase 3: User Story 1
3. **STOP and VALIDATE**: Test User Story 1 independently via mobile simulator.
4. Deploy/demo if ready.
