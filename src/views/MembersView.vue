<template>
    <div class="page-content animate-fade">
        <div class="page-header-fancy">
            <div class="header-action-btns">
                <button v-if="permissions.canAddMember" class="btn btn-lg btn-primary" @click="openAddModal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 20px; height: 20px;">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Thêm Thành Viên</span>
                </button>
                <button v-if="permissions.canAddMember" class="btn btn-lg btn-secondary" @click="showTiersModal = true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 20px; height: 20px;">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
                    </svg>
                    <span>Mức Đóng Quỹ</span>
                </button>
            </div>
            
            <div class="search-input-fancy-wrapper">
                <svg class="search-icon-fancy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                    type="text" 
                    v-model="searchQuery" 
                    placeholder="Tìm kiếm thành viên..." 
                    class="input-fancy"
                >
            </div>
        </div>

        <div class="card">
            <div v-if="!isMobile" class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Họ và Tên</th>
                            <th>Số áo</th>
                            <th>Ngày sinh</th>
                            <th>Số điện thoại</th>
                            <th>Loại Đóng</th>
                            <th>Mức Đóng Quỹ</th>
                            <th>Tham Gia</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(member, index) in filteredMembers" :key="member.id" class="list-item-animate" :style="{ animationDelay: (0.1 + index * 0.03) + 's' }">
                            <td @dblclick="startEditing(member)" :title="'Double click để sửa nhanh'">
                                <div v-if="editingId === member.id" class="inline-edit-group">
                                    <input 
                                        ref="editInput"
                                        v-model="editingName" 
                                        @blur="saveInlineEdit(member)"
                                        @keyup.enter="saveInlineEdit(member)"
                                        @keyup.esc="cancelInlineEdit"
                                        class="form-control"
                                        style="height: 28px;"
                                        autofocus
                                    >
                                </div>
                                <strong v-else>{{ member.name }}</strong>
                            </td>
                            <td>
                                <span v-if="member.shirtNumber" class="badge badge-primary">#{{ member.shirtNumber }}</span>
                                <span v-else class="text-muted">-</span>
                            </td>
                            <td>{{ member.dob ? new Date(member.dob).toLocaleDateString('vi-VN') : '-' }}</td>
                            <td>{{ member.phone || '-' }}</td>
                            <td>
                                <span v-if="member.paymentType === 'per-match'" class="badge badge-warning">⚽ Đá theo trận</span>
                                <span v-else class="badge badge-info">👥 Đá theo đội</span>
                            </td>
                            <td>
                                <span v-if="member.paymentType === 'per-match'" class="badge badge-secondary">
                                    {{ formatCurrency(member.perMatchFee || 50000) }}/trận
                                </span>
                                <span v-else-if="member.contributionTierId" class="tier-badge-pill" :style="getTierBadgeStyle(member.contributionTierId)">
                                    {{ getTierIcon(member.contributionTierId) }} {{ getTierName(member.contributionTierId) }}
                                </span>
                                <span v-else class="badge badge-secondary">Chưa chọn</span>
                            </td>
                            <td>
                                <span class="badge" :class="getAttendanceRateClass(getMemberStats(member.id).attendanceRate)">
                                    {{ getMemberStats(member.id).attendanceRate }}%
                                </span>
                            </td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn btn-icon-only btn-icon-edit" @click="openEditModal(member)" title="Sửa">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>
                                    <button class="btn btn-icon-only btn-icon-danger" @click="handleDeleteMember(member.id)" title="Xóa">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Mobile View: Cards -->
            <div v-else class="mobile-member-list">
                <div v-for="(member, index) in filteredMembers" :key="member.id" class="card list-item-animate" :style="{ animationDelay: (0.1 + index * 0.04) + 's' }" style="margin-bottom: 12px;">
                    <div class="card-header">
                        <span class="member-name">{{ member.name }}</span>
                        <span class="badge" :class="getAttendanceRateClass(getMemberStats(member.id).attendanceRate)">
                            {{ getMemberStats(member.id).attendanceRate }}% Tham gia
                        </span>
                    </div>
                    <div class="card-content">
                        <div class="info-row" style="margin-top: 8px;">
                            <span class="label">Số áo:</span>
                            <span class="value text-primary">#{{ member.shirtNumber || '-' }}</span>
                        </div>
                        <div class="info-row" style="margin-top: 4px;">
                            <span class="label">Ngày sinh:</span>
                            <span class="value">{{ member.dob ? new Date(member.dob).toLocaleDateString('vi-VN') : '-' }}</span>
                        </div>
                        <div class="info-row" style="margin-top: 4px;">
                            <span class="label">SĐT:</span>
                            <span class="value">{{ member.phone || '-' }}</span>
                        </div>
                        <div class="info-row" style="margin-top: 8px;">
                            <span class="label">Hình thức:</span>
                            <span v-if="member.paymentType === 'per-match'" class="value text-warning">⚽ Đá theo trận</span>
                            <span v-else class="value text-info">👥 Đá theo đội</span>
                        </div>
                        <div class="info-row" style="margin-top: 4px;">
                            <span class="label">Mức phí:</span>
                            <span class="value" v-if="member.paymentType === 'per-match'">{{ formatCurrency(member.perMatchFee || 50000) }}/trận</span>
                            <span class="value" v-else-if="member.contributionTierId">
                                {{ getTierIcon(member.contributionTierId) }} {{ getTierName(member.contributionTierId) }}
                            </span>
                            <span v-else class="value text-secondary">Chưa chọn</span>
                        </div>
                    </div>
                    <div class="card-footer" style="padding: 12px; display: flex; gap: 8px; background: var(--bg-tertiary); border-top: 1px solid var(--border-color);">
                        <button class="btn btn-secondary" style="flex: 1" @click="openEditModal(member)">Sửa</button>
                        <button class="btn btn-danger" style="flex: 1" @click="handleDeleteMember(member.id)">Xóa</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Member Edit/Add Modal -->
        <div v-if="showMemberModal" class="modal-overlay" @click="closeMemberModal">
            <div class="modal-card" @click.stop>
                <div class="modal-header">
                    <h2>{{ memberForm.id ? 'Sửa' : 'Thêm' }} Thành Viên</h2>
                    <button class="modal-close-btn" @click="closeMemberModal">×</button>
                </div>
                <div class="modal-body" style="padding: 24px;">
                    <div class="form-group">
                        <label>Tên thành viên</label>
                        <input type="text" v-model="memberForm.name" placeholder="Nhập tên..." class="form-control">
                    </div>
                    
                    <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="form-group">
                            <label>Số áo</label>
                            <input type="number" v-model="memberForm.shirtNumber" placeholder="vd: 10" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" v-model="memberForm.phone" placeholder="09xxx..." class="form-control">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Ngày tháng năm sinh</label>
                        <input type="date" v-model="memberForm.dob" class="form-control">
                    </div>

                    <div class="form-group">
                        <label>Hình thức đóng phí</label>
                        <BaseSelect 
                            v-model="memberForm.paymentType"
                            :options="[
                                { value: 'team-based', label: 'Đóng theo đội (Tháng)' },
                                { value: 'per-match', label: 'Đóng theo trận (Vãng lai)' }
                            ]"
                        />
                    </div>

                    <div v-if="memberForm.paymentType === 'team-based'" class="form-group">
                        <label>Mức Đóng Quỹ Tháng</label>
                        <BaseSelect 
                            v-model="memberForm.contributionTierId"
                            :options="[
                                { value: null, label: '-- Chọn mức --' },
                                ...contributionTiers.map(tier => ({
                                    value: tier.id,
                                    label: `${tier.icon} ${tier.name} (${formatCurrency(tier.monthlyFee)})`
                                }))
                            ]"
                        />
                    </div>

                    <div v-if="memberForm.paymentType === 'per-match'" class="form-group">
                        <label>Mức Phí Theo Trận (₫/trận)</label>
                        <input type="number" v-model="memberForm.perMatchFee" class="form-control">
                    </div>

                    <div class="form-actions">
                        <button class="btn btn-secondary" @click="closeMemberModal">Hủy</button>
                        <button class="btn btn-primary" @click="handleSaveMember">Lưu</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contribution Tiers Modal -->
        <ContributionTiersModal :show="showTiersModal" @close="showTiersModal = false" />
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useBreakpoints } from '../composables/useBreakpoints';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';
import BaseSelect from '../components/BaseSelect.vue';
import ContributionTiersModal from '../components/ContributionTiersModal.vue';

const { isMobile } = useBreakpoints();

const { 
    members, contributionTiers, receivables, getMemberStats, 
    addMember, updateMember, deleteMember, getContributionTier 
} = useAppState();

const { permissions } = useAuth();

const searchQuery = ref('');
const editingId = ref(null);
const editingName = ref('');
const editInput = ref(null);

const filteredMembers = computed(() => {
    if (!searchQuery.value) return members.value;
    const query = searchQuery.value.toLowerCase();
    return members.value.filter(m => 
        m.name.toLowerCase().includes(query)
    );
});

const startEditing = (member) => {
    editingId.value = member.id;
    editingName.value = member.name;
};

const saveInlineEdit = async (member) => {
    if (!editingId.value) return;
    if (editingName.value && editingName.value !== member.name) {
        await updateMember(member.id, { name: editingName.value });
    }
    editingId.value = null;
    editingName.value = '';
};

const cancelInlineEdit = () => {
    editingId.value = null;
    editingName.value = '';
};

const getMemberDebt = (memberId, type) => {
    return receivables.value
        .filter(r => r.memberId === memberId && r.status === 'unpaid' && (type === 'all' || r.type === type || (type === 'fine' && r.type === 'pitch_fee')))
        .reduce((sum, r) => sum + r.amount, 0);
};

const showMemberModal = ref(false);
const showTiersModal = ref(false);
const memberForm = reactive({
    id: null,
    name: '',
    shirtNumber: '',
    dob: '',
    phone: '',
    contributionTierId: null,
    paymentType: 'team-based',
    perMatchFee: 50000
});

const openAddModal = () => {
    memberForm.id = null;
    memberForm.name = '';
    memberForm.shirtNumber = '';
    memberForm.dob = '';
    memberForm.phone = '';
    memberForm.contributionTierId = null;
    memberForm.paymentType = 'team-based';
    memberForm.perMatchFee = 50000;
    showMemberModal.value = true;
};

const openEditModal = (member) => {
    memberForm.id = member.id;
    memberForm.name = member.name;
    memberForm.shirtNumber = member.shirtNumber || '';
    memberForm.dob = member.dob || '';
    memberForm.phone = member.phone || '';
    memberForm.contributionTierId = member.contributionTierId || null;
    memberForm.paymentType = member.paymentType || 'team-based';
    memberForm.perMatchFee = member.perMatchFee || 50000;
    showMemberModal.value = true;
};

const closeMemberModal = () => {
    showMemberModal.value = false;
};

const handleSaveMember = () => {
    if (!memberForm.name) return;

    const payload = {
        name: memberForm.name,
        shirtNumber: memberForm.shirtNumber,
        dob: memberForm.dob,
        phone: memberForm.phone,
        contributionTierId: memberForm.contributionTierId,
        paymentType: memberForm.paymentType,
        perMatchFee: memberForm.paymentType === 'per-match' ? memberForm.perMatchFee : undefined
    };

    if (memberForm.id) {
        updateMember(memberForm.id, payload);
    } else {
        addMember(payload);
    }
    closeMemberModal();
};

const handleDeleteMember = (id) => {
    if (confirm('Xóa thành viên này?')) {
        deleteMember(id);
    }
};

const getTierName = (id) => {
    const tier = getContributionTier(id);
    return tier ? tier.name : '';
};

const getTierIcon = (id) => {
    const tier = getContributionTier(id);
    return tier ? tier.icon : '';
};

const getTierBadgeStyle = (id) => {
    const tier = getContributionTier(id);
    if (!tier) return {};
    return {
        backgroundColor: tier.color + '15',
        color: tier.color,
        border: `1px solid ${tier.color}30`,
    };
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
};

const getAttendanceRateClass = (rate) => {
    if (rate >= 75) return 'badge-success';
    if (rate >= 50) return 'badge-warning';
    return 'badge-danger';
};
</script>

<style scoped>
.table-actions { display: flex; gap: 8px; justify-content: center; }
.tier-badge-pill { 
    display: inline-flex; 
    align-items: center; 
    gap: 6px; 
    padding: 2px 10px; 
    border-radius: var(--radius-full); 
    font-size: 12px; 
    font-weight: 500;
}

.mobile-member-list { 
    padding: 8px 4px; 
    max-height: calc(100vh - 220px); 
    overflow-y: auto; 
}
.info-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
.info-row .label { color: var(--text-secondary); }
.info-row .value { font-weight: 700; color: var(--text-primary); }

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-card {
    background: var(--bg-elevated);
    width: 100%;
    max-width: 450px;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
}

.modal-header {
    padding: 16px 24px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-tertiary);
}

.modal-header h2 { font-size: 16px; margin: 0; }
.modal-close-btn { 
    background: none; 
    border: none; 
    font-size: 24px; 
    color: var(--text-muted); 
    cursor: pointer; 
}
</style>
