# Phase 1: Quickstart (Usage)

## Integration Example

Any component can use the new global toast composable:

```javascript
import { useToast } from '../composables/useToast';

const { showToast } = useToast();

const saveForm = async () => {
    try {
        await saveData();
        showToast('Successfully saved!', 'success');
    } catch (e) {
        showToast('Failed to save data: ' + e.message, 'error');
    }
}
```

`showAlert()` inside `useAppState` will be gracefully patched to route directly to `showToast` to minimize global refactoring.
