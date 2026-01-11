<template>
    <div class="modal" v-if="show" style="display: flex;">
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2>⚙️ Quản Lý Mức Đóng Quỹ</h2>
                <button class="modal-close" @click="$emit('close')">×</button>
            </div>
            <div class="modal-body">
                <!-- Contribution Tiers List -->
                <div class="tiers-list">
                    <div 
                        v-for="tier in tiers" 
                        :key="tier.id"
                        class="tier-item"
                        :class="{ editing: editingId === tier.id }">
                        <div class="tier-info">
                            <div class="tier-header">
                                <span class="tier-badge" :style="{ backgroundColor: tier.color }">
                                    {{ tier.icon }}
                                </span>
                                <div class="tier-details">
                                    <template v-if="editingId === tier.id">
                                        <input 
                                            type="text" 
                                            v-model="editForm.name" 
                                            placeholder="Tên nhóm"
                                            class="tier-name-input">
                                    </template>
                                    <template v-else>
                                        <strong>{{ tier.name }}</strong>
                                    </template>
                                </div>
                            </div>
                            <div class="tier-amount">
                                <template v-if="editingId === tier.id">
                                    <input 
                                        type="number" 
                                        v-model.number="editForm.monthlyFee" 
                                        placeholder="Số tiền"
                                        class="tier-amount-input">
                                    <span>₫/tháng</span>
                                </template>
                                <template v-else>
                                    <span class="amount">{{ formatCurrency(tier.monthlyFee) }}</span>
                                    <span class="period">/tháng</span>
                                </template>
                            </div>
                        </div>
                        <div class="tier-actions">
                            <template v-if="editingId === tier.id">
                                <button class="btn btn-sm btn-success" @click="saveEdit(tier.id)">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                </button>
                                <button class="btn btn-sm btn-secondary" @click="cancelEdit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"/>
                                        <line x1="6" y1="6" x2="18" y2="18"/>
                                    </svg>
                                </button>
                            </template>
                            <template v-else>
                                <button class="btn btn-sm btn-secondary" @click="startEdit(tier)">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                </button>
                                <button 
                                    class="btn btn-sm btn-danger" 
                                    @click="deleteTier(tier.id)"
                                    :disabled="tier.isDefault">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="3 6 5 6 21 6"/>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    </svg>
                                </button>
                            </template>
                        </div>
                    </div>
                </div>

                <!-- Add New Tier -->
                <div class="add-tier-section">
                    <h3>➕ Thêm Mức Mới</h3>
                    <div class="form-group">
                        <label>Tên Nhóm</label>
                        <input 
                            type="text" 
                            v-model="newTier.name" 
                            placeholder="Ví dụ: Học sinh, Sinh viên, Đi làm">
                    </div>
                    <div class="form-group">
                        <label>Mức Đóng Quỹ (₫/tháng)</label>
                        <input 
                            type="number" 
                            v-model.number="newTier.monthlyFee" 
                            placeholder="Ví dụ: 50000">
                    </div>
                    <div class="form-group">
                        <label>Icon</label>
                        <div class="icon-picker">
                            <button 
                                v-for="icon in availableIcons" 
                                :key="icon"
                                class="icon-option"
                                :class="{ selected: newTier.icon === icon }"
                                @click="newTier.icon = icon">
                                {{ icon }}
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Màu</label>
                        <div class="color-picker">
                            <button 
                                v-for="color in availableColors" 
                                :key="color"
                                class="color-option"
                                :class="{ selected: newTier.color === color }"
                                :style="{ backgroundColor: color }"
                                @click="newTier.color = color">
                            </button>
                        </div>
                    </div>
                    <button class="btn btn-primary" @click="addTier">
                        Thêm Mức Đóng Quỹ
                    </button>
                </div>

                <!-- Info -->
                <div class="info-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    <p>Các mức đóng quỹ này sẽ được sử dụng để tính phí hàng tháng cho từng thành viên dựa trên tag của họ.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAppState } from '../composables/useAppState';

const props = defineProps({
    show: Boolean
});

const emit = defineEmits(['close', 'updated']);

const { contributionTiers, addContributionTier, updateContributionTier, deleteContributionTier } = useAppState();

const tiers = contributionTiers;
const editingId = ref(null);
const editForm = reactive({
    name: '',
    monthlyFee: 0
});

const newTier = reactive({
    name: '',
    monthlyFee: 0,
    icon: '🎓',
    color: '#3b82f6'
});

const availableIcons = ['🎓', '📚', '💼', '⚽', '🏃', '👨‍💼', '👩‍💼', '🎯', '💪', '🌟'];
const availableColors = [
    '#3b82f6', // Blue
    '#10b981', // Green
    '#f59e0b', // Orange
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#14b8a6', // Teal
    '#f97316'  // Orange-red
];

const startEdit = (tier) => {
    editingId.value = tier.id;
    editForm.name = tier.name;
    editForm.monthlyFee = tier.monthlyFee;
};

const cancelEdit = () => {
    editingId.value = null;
    editForm.name = '';
    editForm.monthlyFee = 0;
};

const saveEdit = (id) => {
    if (!editForm.name || editForm.monthlyFee < 0) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    
    updateContributionTier(id, {
        name: editForm.name,
        monthlyFee: editForm.monthlyFee
    });
    
    cancelEdit();
    emit('updated');
};

const addTier = () => {
    if (!newTier.name || newTier.monthlyFee < 0) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    
    addContributionTier({
        name: newTier.name,
        monthlyFee: newTier.monthlyFee,
        icon: newTier.icon,
        color: newTier.color
    });
    
    // Reset form
    newTier.name = '';
    newTier.monthlyFee = 0;
    newTier.icon = '🎓';
    newTier.color = '#3b82f6';
    
    emit('updated');
};

const deleteTier = (id) => {
    const tier = tiers.value.find(t => t.id === id);
    if (tier.isDefault) {
        alert('Không thể xóa mức đóng quỹ mặc định!');
        return;
    }
    
    if (confirm(`Xóa mức "${tier.name}"?`)) {
        deleteContributionTier(id);
        emit('updated');
    }
};

const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
</script>

<style scoped>
.tiers-list {
    margin-bottom: var(--spacing-xl);
}

.tier-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-lg);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-md);
    transition: all var(--transition-normal);
}

.tier-item:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
}

.tier-item.editing {
    background: rgba(59, 130, 246, 0.1);
    border-color: var(--primary-500);
}

.tier-info {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-lg);
}

.tier-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.tier-badge {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
}

.tier-details strong {
    color: var(--text-primary);
    font-size: 1rem;
}

.tier-name-input {
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-weight: 600;
}

.tier-amount {
    display: flex;
    align-items: baseline;
    gap: var(--spacing-sm);
}

.tier-amount .amount {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--success-500);
}

.tier-amount .period {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.tier-amount-input {
    width: 150px;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-weight: 600;
    text-align: right;
}

.tier-actions {
    display: flex;
    gap: var(--spacing-sm);
}

.add-tier-section {
    padding: var(--spacing-xl);
    background: rgba(59, 130, 246, 0.05);
    border: 2px dashed rgba(59, 130, 246, 0.3);
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-xl);
}

.add-tier-section h3 {
    margin-bottom: var(--spacing-lg);
    color: var(--primary-500);
}

.icon-picker,
.color-picker {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
}

.icon-option {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.05);
    font-size: 1.25rem;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.icon-option:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
}

.icon-option.selected {
    border-color: var(--primary-500);
    background: rgba(59, 130, 246, 0.2);
}

.color-option {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.color-option:hover {
    transform: scale(1.1);
}

.color-option.selected {
    border-color: #fff;
    box-shadow: 0 0 0 2px var(--primary-500);
}

.info-box {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    background: rgba(59, 130, 246, 0.1);
    border-left: 4px solid var(--primary-500);
    border-radius: var(--radius-md);
}

.info-box svg {
    width: 20px;
    height: 20px;
    color: var(--primary-500);
    flex-shrink: 0;
}

.info-box p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
}
</style>
