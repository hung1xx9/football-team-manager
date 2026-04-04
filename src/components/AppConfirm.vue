<template>
    <Transition name="dialog">
        <div v-if="dialog.show" class="modal-overlay" @click.self="cancel">
            <div class="modal-card dialog-card" :class="dialog.type">
                <!-- Status Border/Bar -->
                <div class="status-bar" :class="dialog.type"></div>
                
                <div class="modal-header dialog-header">
                    <div class="header-left">
                        <div class="status-icon-wrapper" :class="dialog.type">
                            <svg v-if="dialog.type === 'alert'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            <svg v-else-if="dialog.type === 'confirm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </div>
                        <h2 class="dialog-title-h2">{{ dialog.title }}</h2>
                    </div>
                    <button class="modal-close-btn-fancy" @click="cancel" title="Đóng">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div class="modal-body dialog-body-premium">
                    <div class="dialog-message-container">
                        <p class="dialog-message-main">{{ dialog.message }}</p>
                        
                        <div v-if="dialog.type === 'prompt'" class="prompt-field">
                            <div class="prompt-input-outer">
                                <input 
                                    type="text" 
                                    v-model="dialog.inputValue" 
                                    class="input-premium" 
                                    placeholder="Nhập nội dung..."
                                    @keyup.enter="confirm"
                                    ref="promptInput"
                                    autofocus
                                >
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer dialog-footer-premium">
                    <button v-if="dialog.type !== 'alert'" class="btn-cancel-premium" @click="cancel">
                        Hủy bỏ
                    </button>
                    <button class="btn-confirm-premium" @click="confirm" :class="dialog.type">
                        <span v-if="dialog.type === 'confirm'" class="btn-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </span>
                        <span class="btn-text">
                            {{ dialog.type === 'confirm' ? 'Đồng ý' : (dialog.type === 'prompt' ? 'Xác nhận' : 'Đã hiểu') }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { watch, nextTick, ref } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useEscapeClose } from '../composables/useEscapeClose';

const { dialog } = useAppState();
const promptInput = ref(null);

watch(() => dialog.value.show, (val) => {
    if (val && dialog.value.type === 'prompt') {
        nextTick(() => {
            if (promptInput.value) promptInput.value.focus();
        });
    }
});

const confirm = () => {
    const value = dialog.value.type === 'prompt' ? dialog.value.inputValue : true;
    const resolve = dialog.value.resolve;
    dialog.value.show = false;
    if (resolve) resolve(value);
};

const cancel = () => {
    const value = dialog.value.type === 'confirm' ? false : null;
    const resolve = dialog.value.resolve;
    dialog.value.show = false;
    if (resolve) resolve(value);
};

// Register Escape key to cancel
useEscapeClose(() => cancel(), null, { ignoreIfDialog: false });
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: var(--spacing-xl);
}

.dialog-card {
    background: var(--bg-elevated);
    width: 100%;
    max-width: 420px;
    border-radius: var(--radius-xl);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    border: 1px solid var(--border-color);
    position: relative;
}

.status-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
}

.status-bar.alert { background: var(--primary-500); }
.status-bar.confirm { background: var(--warning); }
.status-bar.prompt { background: var(--secondary-500); }

.dialog-header {
    padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-md) !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: none !important;
    background: transparent !important;
}

.header-left {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.status-icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.status-icon-wrapper svg { width: 24px; height: 24px; }

.status-icon-wrapper.alert { background: rgba(59, 130, 246, 0.15); color: var(--primary-500); }
.status-icon-wrapper.confirm { background: rgba(245, 158, 11, 0.15); color: var(--warning); }
.status-icon-wrapper.prompt { background: rgba(139, 92, 246, 0.15); color: var(--secondary-500); }

.dialog-header h2.dialog-title-h2 {
    font-size: 1.25rem;
    font-weight: 800;
    margin: 0;
    color: var(--text-primary);
    letter-spacing: -0.025em;
}

.modal-close-btn-fancy {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    border: none;
    background: var(--bg-tertiary);
    color: var(--text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
}

.modal-close-btn-fancy:hover {
    background: var(--bg-primary);
    color: var(--text-primary);
}

.modal-close-btn-fancy svg { width: 16px; height: 16px; }

.dialog-body-premium {
    padding: 0 var(--spacing-lg) var(--spacing-lg) !important;
}

.dialog-message-main {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 500;
    margin: 0;
}

.prompt-field {
    margin-top: var(--spacing-md);
}

.prompt-input-outer {
    background: var(--bg-tertiary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    padding: 4px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.prompt-input-outer:focus-within {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    transform: translateY(-1px);
}

.input-premium {
    width: 100%;
    height: 44px;
    background: transparent;
    border: none;
    padding: 0 var(--spacing-md);
    color: var(--text-primary);
    font-size: 1rem;
    font-weight: 600;
    outline: none;
}

.dialog-footer-premium {
    padding: var(--spacing-md) var(--spacing-lg) !important;
    background: var(--bg-secondary);
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    border-top: 1px solid var(--border-color);
}


.btn-confirm-premium {
    height: 48px;
    padding: 0 1.5rem;
    border-radius: 12px;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
}

.btn-confirm-premium.alert { background: var(--primary-500); color: white; }
.btn-confirm-premium.confirm { background: var(--warning); color: white; }
.btn-confirm-premium.prompt { background: var(--secondary-500); color: white; }

.btn-confirm-premium:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.btn-confirm-premium:active {
    transform: translateY(0);
}

.btn-confirm-premium .btn-icon svg {
    width: 18px;
    height: 18px;
}

.btn-cancel-premium {
    height: 48px;
    padding: 0 1.5rem;
    border-radius: 12px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-cancel-premium:hover {
    background: var(--bg-primary);
    color: var(--text-primary);
    border-color: var(--text-muted);
}

/* Transitions */
.dialog-enter-active,
.dialog-leave-active {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
}

.dialog-enter-from .dialog-card {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
}

.dialog-leave-to .dialog-card {
    opacity: 0;
    transform: scale(0.98);
}

.dialog-enter-active .dialog-card {
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
