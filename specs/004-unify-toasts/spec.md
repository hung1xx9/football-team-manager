# Feature Specification: Unify Toast Notifications

**Feature Branch**: `004-unify-toasts`  
**Created**: 2026-04-12  
**Status**: Draft  
**Input**: User description: "Anh muốn đồng nhất thông báo trên phần mềm thành toast chứ không chỗ hiện popup chỗ hiện toast nữa"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consistent Notification Experience (Priority: P1)

As a user, I want all system alerts and notifications to appear in a consistent, non-intrusive format (toast) so that my workflow is not interrupted by blocking modal popups.

**Why this priority**: Resolving UX inconsistency is the core request, providing a much smoother and modern interaction model.

**Independent Test**: Can be fully tested by triggering various system actions (save, error, form validation) and verifying that a toast notification appears instead of a blocking modal popup.

**Acceptance Scenarios**:

1. **Given** the user triggers an action that results in a success message, **When** the system responds, **Then** a success toast is displayed instead of an alert modal.
2. **Given** the user encounters a validation error (e.g., missing form fields), **When** they submit the form, **Then** an error toast is displayed and no modal popup is shown.
3. **Given** a toast notification is displayed, **When** the auto-dismiss timer expires, **Then** the notification disappears from the screen automatically.

---

### Edge Cases

- What happens when multiple notifications are triggered simultaneously?
- How does the system handle notifications with exceptionally long text? (e.g., detailed error logs)
- What happens if the user navigates to a new page while a toast is still visible?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST replace all read-only, informational popup alerts (previously shown as modals) with toast notifications.
- **FR-002**: System MUST support distinct visual types of toast notifications (success, error, warning, info).
- **FR-003**: System MUST handle multiple simultaneous toast notifications by stacking them vertically so that users can review all messages without missing any, taking care to position them such that they don't block critical UI elements permanently.
- **FR-004**: Toast notifications MUST automatically dismiss after a set duration.
- **FR-005**: Users MUST be able to manually dismiss a toast notification before its auto-dismiss timer expires.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of read-only informational alerts use the toast system instead of modal popups.
- **SC-002**: User workflow completion time slightly decreases due to 0 required clicks to dismiss informational alerts.

## Assumptions

- Interactive prompts (like confirmations requiring user input or "Yes/No" answers, such as `showConfirm`) will remain as modals, as they inherently require blocking interaction. Only "read-only" status alerts will migrate to toasts.
- The existing global notification component or pattern will be leveled up to serve as the single source for the new toast mechanism.
