# Phase 1: Data Model

This feature relies on an ephemeral, in-memory state. There are no persistent database changes.

## Toast Object Structure

The internal array of toasts in `useToast` will hold objects with the following schema:

```javascript
{
  id: "string",        // Unique identifier (Date.now() + Math.random())
  message: "string",   // The text to display
  type: "string",      // 'success', 'error', 'info', 'warning'
  duration: "number",  // Duration in milliseconds before auto-dismiss (e.g. 3000)
  timer: "number"      // Reference to the setTimeout to allow cancellation
}
```

## State Transitions

- **Creation**: When `showToast` is called, a new toast object is pushed to the `toasts` array. A `setTimeout` is started.
- **Auto-Dismiss**: When the timer fires, the toast is filtered out of the `toasts` array by its `id`.
- **Manual-Dismiss**: When the user clicks the close `(x)` on the toast, the timer is cleared and the toast is removed from the array immediately.
