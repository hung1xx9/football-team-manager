# Phase 1: Data Model & State

## Entities
No new database entities are introduced. The feature interacts with existing data models by re-triggering their fetch operations.

## State Management
We introduce a local UI state to manage the pull-to-refresh interaction, encapsulated within the `usePullToRefresh` composable:

- `isPulling` (boolean): True when the user is actively dragging down.
- `pullDistance` (number): The current distance (in pixels) the user has dragged down.
- `isRefreshing` (boolean): True when the threshold is met and data is being fetched.
- `refreshThreshold` (number, e.g., 60): The distance required to trigger a refresh.

These states will be exposed by the composable and consumed by the UI components (like a `PullToRefresh.vue` wrapper) to render the loading indicator dynamically based on the pull distance.
