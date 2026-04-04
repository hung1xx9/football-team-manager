<template>
    <Transition name="premium-modal">
        <div v-if="show" class="modal tiers-modal" @click.self="$emit('close')">
            <div class="modal-content modal-large">
            <div class="modal-header">
                <div class="header-title-group">
                    <div class="header-icon-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                    </div>
                    <h2>Quản Lý Mức Đóng Quỹ</h2>
                </div>
                <button class="modal-close" @click="$emit('close')" title="Đóng">×</button>
            </div>
            
            <div class="modal-body split-layout">
                <!-- Left Pane: List of Tiers -->
                <div class="tiers-list-section">
                    <div class="section-header">
                        <h3>Danh Sách Các Mức</h3>
                        <span class="count-badge">{{ contributionTiers.length }} nhóm</span>
                    </div>

                    <div class="info-banner">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        <p>Dùng để tính phí hàng tháng tự động dựa trên phân loại của thành viên.</p>
                    </div>

                    <div class="tiers-grid">
                        <div v-for="tier in contributionTiers" 
                             :key="tier.id" 
                             class="tier-card" 
                             :class="{ active: editingId === tier.id }"
                             @click="startEdit(tier)">
                            <div class="tier-card-main">
                                <div class="tier-card-identity">
                                    <div class="tier-card-icon" :style="{ backgroundColor: tier.color + '20', color: tier.color }">
                                        {{ tier.icon }}
                                    </div>
                                    <div class="tier-card-info">
                                        <span class="tier-card-name">{{ tier.name }}</span>
                                        <span class="tier-card-fee">{{ formatCurrency(tier.monthlyFee) }}<small>/tháng</small></span>
                                    </div>
                                </div>
                                <div class="tier-card-actions">
                                    <button class="btn-icon btn-delete" 
                                            @click.stop="handleDeleteTier(tier.id)" 
                                            :disabled="tier.isDefault"
                                            title="Xóa mức này">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Pane: Editor (Add/Edit) -->
                <div class="tiers-editor-section">
                    <div class="editor-container">
                        <div class="section-header">
                            <h3>{{ editingId ? 'Chỉnh Sửa Mức' : 'Thêm Mức Mới' }}</h3>
                            <button v-if="editingId" class="btn-text" @click="cancelEdit">Hủy sửa</button>
                        </div>

                        <div class="editor-form">
                            <div class="form-row">
                                <div class="form-group flex-1">
                                    <label>Tên Nhóm</label>
                                    <div class="input-wrapper">
                                        <input type="text" 
                                               v-model="activeForm.name" 
                                               placeholder="Ví dụ: Học sinh..." 
                                               class="form-input">
                                    </div>
                                </div>

                                <div class="form-group flex-1">
                                    <label>Mức Đóng (₫)</label>
                                    <div class="input-wrapper">
                                        <input type="number" 
                                               v-model.number="activeForm.monthlyFee" 
                                               placeholder="0" 
                                               class="form-input text-right">
                                        <span class="input-suffix">₫</span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Biểu Tượng</label>
                                <div class="icon-picker">
                                    <button v-for="icon in iconOptions" 
                                            :key="icon" 
                                            class="picker-option icon-option" 
                                            :class="{ selected: activeForm.icon === icon }" 
                                            @click="activeForm.icon = icon">
                                        {{ icon }}
                                    </button>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Màu Sắc Đại Diện</label>
                                <div class="color-picker">
                                    <button v-for="color in colorOptions" 
                                            :key="color" 
                                            class="picker-option color-option" 
                                            :class="{ selected: activeForm.color === color }" 
                                            :style="{ backgroundColor: color }" 
                                            @click="activeForm.color = color">
                                    </button>
                                </div>
                            </div>

                            <div class="form-actions-footer">
                                <button v-if="editingId" class="btn btn-primary btn-block" @click="handleUpdateTier">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    Lưu Thay Đổi
                                </button>
                                <button v-else class="btn btn-primary btn-block" @click="handleAddTier">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Thêm Mức Mới
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Transition>
</template>

<script setup>
import { ref, reactive, computed, toRef } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useEscapeClose } from '../composables/useEscapeClose';

const { contributionTiers, addContributionTier, updateContributionTier, deleteContributionTier, showAlert, showConfirm, dialog } = useAppState();

const props = defineProps({ show: Boolean });
const emit = defineEmits(['close', 'updated']);

useEscapeClose(() => emit('close'), toRef(props, 'show'));

const editingId = ref(null);

// Combined form for both adding and editing
const activeForm = reactive({
    name: '',
    monthlyFee: 0,
    icon: '🎓',
    color: '#3b82f6'
});

const iconOptions = ['🎓', '📚', '💼', '⚽', '🏃', '👨‍💼', '👩‍💼', '🎯', '💪', '🌟', '🏠', '💻', '⚡', '🔥'];
const colorOptions = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#64748b'];

const startEdit = (tier) => {
    editingId.value = tier.id;
    activeForm.name = tier.name;
    activeForm.monthlyFee = tier.monthlyFee;
    activeForm.icon = tier.icon;
    activeForm.color = tier.color;
};

const cancelEdit = () => {
    editingId.value = null;
    resetForm();
};

const resetForm = () => {
    activeForm.name = '';
    activeForm.monthlyFee = 0;
    activeForm.icon = '🎓';
    activeForm.color = '#3b82f6';
};

const handleUpdateTier = async () => {
    if (!activeForm.name || activeForm.monthlyFee < 0) {
        await showAlert('Vui lòng nhập đầy đủ thông tin!', 'Cảnh báo');
        return;
    }
    updateContributionTier(editingId.value, { 
        name: activeForm.name, 
        monthlyFee: activeForm.monthlyFee,
        icon: activeForm.icon,
        color: activeForm.color
    });
    editingId.value = null;
    resetForm();
    emit('updated');
};

const handleAddTier = async () => {
    if (!activeForm.name || activeForm.monthlyFee < 0) {
        await showAlert('Vui lòng nhập đầy đủ thông tin!', 'Cảnh báo');
        return;
    }
    addContributionTier({
        name: activeForm.name,
        monthlyFee: activeForm.monthlyFee,
        icon: activeForm.icon,
        color: activeForm.color
    });
    resetForm();
    emit('updated');
};

const handleDeleteTier = async (id) => {
    const tier = contributionTiers.value.find(t => t.id === id);
    if (tier.isDefault) {
        await showAlert('Không thể xóa mức đóng quỹ mặc định!', 'Lỗi');
        return;
    }
    if (await showConfirm(`Xóa mức "${tier.name}"?`, 'Xác nhận xóa')) {
        if (editingId.value === id) cancelEdit();
        deleteContributionTier(id);
        emit('updated');
    }
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};
</script>

<style scoped>
.tiers-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100;
}

.premium-modal-enter-active, 
.premium-modal-leave-active {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.premium-modal-enter-from, 
.premium-modal-leave-to {
    opacity: 0;
    backdrop-filter: blur(0px);
}

.premium-modal-enter-from .modal-content {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
}

.premium-modal-enter-active .modal-content {
    animation: modal-content-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
    will-change: transform, opacity;
}

@keyframes modal-content-in {
    0% { transform: scale(0.95) translateY(10px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}

.modal-large {
    max-width: 900px;
    height: 600px;
    overflow: hidden !important; /* Ensure children don't bleed over rounded corners */
}

:deep(.modal-header) {
    padding: var(--spacing-lg) var(--spacing-lg) !important; /* Unified padding */
    border-bottom: 1px solid var(--border-color);
}

.header-title-group {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.header-icon-wrapper {
    width: 40px;
    height: 40px;
    background: var(--bg-tertiary);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-500);
}

.header-icon-wrapper svg {
    width: 20px;
    height: 20px;
}

.split-layout {
    display: flex;
    padding: 0 !important;
    overflow: hidden !important;
}

/* PANES */
.tiers-list-section {
    flex: 1.2;
    padding: var(--spacing-md);
    overflow-y: auto;
    border-right: 1px solid var(--border-color);
    background: var(--bg-primary);
    max-height: 100%;
}

.tiers-editor-section {
    flex: 1;
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    display: flex;
    flex-direction: column;
    overflow-y: visible;
    max-height: 100%;
}

/* Disable global modal animations to prevent double-animation jerkiness */
:deep(.modal-content) {
    animation: none !important;
}

.premium-modal-enter-active .modal-content {
    animation: modal-content-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both !important;
}

.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-sm);
}

.section-header h3 {
    font-size: 0.95rem;
    font-weight: 700;
}

.count-badge {
    padding: 2px 10px;
    background: var(--bg-tertiary);
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 600;
}

.info-banner {
    display: flex;
    gap: var(--spacing-sm);
    padding: 6px var(--spacing-sm);
    background: rgba(59, 130, 246, 0.08);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-md);
    border: 1px solid rgba(59, 130, 246, 0.15);
}

.info-banner svg {
    width: 14px;
    height: 14px;
    color: var(--primary-500);
    flex-shrink: 0;
}

.info-banner p {
    font-size: 0.75rem;
    color: var(--text-secondary);
    line-height: 1.3;
    margin: 0;
}

/* TIER CARDS */
.tiers-grid {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.tier-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 8px 12px;
    cursor: pointer;
    transition: all var(--transition-normal);
}

.tier-card-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tier-card-identity {
    display: flex;
    align-items: center;
    gap: 12px;
}

.tier-card-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
}

.tier-card-name {
    font-weight: 700;
    color: var(--text-primary);
    font-size: 0.85rem;
}

.tier-card-fee {
    font-size: 0.75rem;
    color: var(--success);
    font-weight: 600;
}

.btn-icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: none;
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.btn-icon svg { width: 16px; height: 16px; }

.btn-delete:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger);
}

.btn-delete:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

/* EDITOR FORM */
.editor-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.editor-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    flex: 1;
}

.form-row {
    display: flex;
    gap: var(--spacing-md);
}

.flex-1 { flex: 1; }

.form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.form-group label {
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.form-input {
    width: 100%;
    height: 36px;
    padding: 0 var(--spacing-md);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.85rem;
}

.input-suffix {
    position: absolute;
    right: 10px;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--text-muted);
}

.text-right { text-align: right; padding-right: 25px !important; }

.icon-picker {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
    gap: 6px;
}

.color-picker {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(28px, 1fr));
    gap: 8px;
}

.picker-option {
    width: 28px;
    height: 28px;
    border-radius: var(--radius-md);
    border: 1.5px solid transparent;
    cursor: pointer;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.color-option { border-radius: var(--radius-full); width: 24px; height: 24px; }
.icon-option { background: var(--bg-primary); border: 1px solid var(--border-color); }

.picker-option.selected {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.form-actions-footer {
    margin-top: auto;
    padding-top: var(--spacing-sm);
}

.btn-block {
    width: 100%;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-weight: 700;
    font-size: 0.9rem;
}

.btn-text {
    background: none;
    border: none;
    color: var(--primary-500);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
}

.btn-text:hover { text-decoration: underline; }

/* MOBILE RESPONSIVE */
@media (max-width: 768px) {
    .modal-large { 
        width: 95%; /* Better width for mobile cards */
        height: auto; 
        max-height: 85vh; 
        border-radius: var(--radius-lg); 
    }
    
    .split-layout { 
        flex-direction: column; 
        overflow-y: auto !important; 
    }
    
    .tiers-list-section { 
        border-right: none; 
        border-bottom: 1px solid var(--border-color); 
        padding: var(--spacing-md);
        max-height: 250px; /* Limit list height on mobile */
    }
    
    .tiers-editor-section { 
        background: var(--bg-primary); 
        padding: var(--spacing-md); 
        overflow-y: visible; 
    }

    .form-row {
        flex-direction: column; /* Stack on mobile */
        gap: var(--spacing-md);
    }
    
    .icon-picker {
        grid-template-columns: repeat(auto-fill, minmax(36px, 1fr)); /* Larger touch targets */
    }
    
    .picker-option {
        width: 32px;
        height: 32px;
    }
}
</style>

