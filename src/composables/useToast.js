import { ref } from 'vue';

const toasts = ref([]);

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - 'success', 'error', 'info', 'warning'
 * @param {number} duration - Auto-dismiss duration in ms (0 to disable)
 * @returns {number} The toast ID
 */
export const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    
    // Fallback if legacy title was passed to showAlert, sometimes we get (message, title), we want to make sure type is mapped well
    // we assume type is valid if it's one of the 4, else we default to info
    const validTypes = ['success', 'error', 'warning', 'info'];
    const resolvedType = validTypes.includes(type) ? type : 'info';

    const toast = {
        id,
        message,
        type: resolvedType,
        timer: null
    };

    if (duration > 0) {
        toast.timer = setTimeout(() => {
            removeToast(id);
        }, duration);
    }

    toasts.value.push(toast);
    return id;
};

/**
 * Remove a toast manually by ID
 * @param {number} id 
 */
export const removeToast = (id) => {
    const idx = toasts.value.findIndex(t => t.id === id);
    if (idx !== -1) {
        if (toasts.value[idx].timer) {
            clearTimeout(toasts.value[idx].timer);
        }
        toasts.value.splice(idx, 1);
    }
};

/**
 * Global composable to manage toasts
 */
export const useToast = () => {
    return {
        toasts,
        showToast,
        removeToast
    };
};
