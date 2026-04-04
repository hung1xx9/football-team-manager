import { onMounted, onBeforeUnmount } from 'vue';
import { useAppState } from './useAppState';

/**
 * Composable to handle Escape key press for closing modals/popups.
 * @param {Function} onClose - The function to call when Escape is pressed.
 * @param {Ref<boolean>} isActive - (Optional) Ref or computed to check if the modal is currently showing.
 * @param {Object} options - (Optional) Additional options
 * @param {boolean} options.ignoreIfDialog - (Default: true) If true, won't trigger if global dialog is showing.
 */
export function useEscapeClose(onClose, isActive = null, options = { ignoreIfDialog: true }) {
    const { dialog } = useAppState();

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            // Check if dialog is showing
            if (options.ignoreIfDialog && dialog.value.show) return;
            
            // Check if this modal is active
            if (isActive !== null && !isActive.value) return;
            
            // Trigger close
            if (onClose) onClose();
        }
    };

    onMounted(() => {
        window.addEventListener('keydown', handleKeyDown);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeyDown);
    });
}
