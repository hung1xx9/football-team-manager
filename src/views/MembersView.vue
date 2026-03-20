<template>
    <div class="page-content">
        <div class="page-actions">
            <button class="btn btn-primary" @click="openAddModal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Thêm Thành Viên
            </button>
            <button class="btn btn-secondary" @click="showTiersModal = true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
                </svg>
                Quản Lý Mức Đóng Quỹ
            </button>
        </div>

        <div class="card">
            <div class="card-content">
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Loại Đóng</th>
                                <th>Mức Đóng Quỹ</th>
                                <th>Tham Gia</th>
                                <th>Dư Nợ Quỹ</th>
                                <th>Tiền Phạt Treo</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="member in members" :key="member.id">
                                <td><strong>{{ member.name }}</strong></td>
                                <td>
                                    <span v-if="member.paymentType === 'per-match'" class="badge badge-warning" style="display: inline-flex; align-items: center; gap: 0.25rem;">
                                        ⚽ Đá theo trận
                                    </span>
                                    <span v-else class="badge badge-info" style="display: inline-flex; align-items: center; gap: 0.25rem;">
                                        👥 Đá theo đội
                                    </span>
                                </td>
                                <td>
                                    <span v-if="member.paymentType === 'per-match'" class="badge badge-secondary">
                                        {{ formatCurrency(member.perMatchFee || 50000) }}/trận
                                    </span>
                                    <span v-else-if="member.contributionTierId" class="tier-badge" :style="getTierBadgeStyle(member.contributionTierId)">
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
                                    <span :class="{'text-danger': getMemberDebt(member.id, 'monthly_fund') > 0, 'text-success': getMemberDebt(member.id, 'monthly_fund') === 0}">
                                        {{ formatCurrency(getMemberDebt(member.id, 'monthly_fund')) }}
                                    </span>
                                </td>
                                <td>
                                    <span :class="{'text-danger': getMemberDebt(member.id, 'fine') > 0, 'text-success': getMemberDebt(member.id, 'fine') === 0}">
                                        {{ formatCurrency(getMemberDebt(member.id, 'fine')) }}
                                    </span>
                                </td>
                                <td>
                                    <div class="table-actions">
                                        <button class="btn-icon-edit" @click="openEditModal(member)" title="Sửa">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>
                                        <button class="btn-icon-danger" @click="handleDeleteMember(member.id)" title="Xóa">
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
            </div>
        </div>

        <!-- Member Edit/Add Modal -->
        <div v-if="showMemberModal" class="modal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ memberForm.id ? 'Sửa' : 'Thêm' }} Thành Viên</h2>
                    <button class="modal-close" @click="closeMemberModal">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Tên thành viên</label>
                        <input type="text" v-model="memberForm.name" placeholder="Nhập tên..." class="form-control">
                    </div>
                    
                    <div class="form-group">
                        <label>Hình thức đóng phí</label>
                        <select v-model="memberForm.paymentType" class="form-control">
                            <option value="team-based">Đóng theo đội (Tháng)</option>
                            <option value="per-match">Đóng theo trận (Vãng lai)</option>
                        </select>
                    </div>

                    <div v-if="memberForm.paymentType === 'team-based'" class="form-group">
                        <label>Mức Đóng Quỹ Tháng</label>
                        <select v-model="memberForm.contributionTierId" class="form-control">
                            <option :value="null">-- Chọn mức --</option>
                            <option v-for="tier in contributionTiers" :key="tier.id" :value="tier.id">
                                {{ tier.icon }} {{ tier.name }} ({{ formatCurrency(tier.monthlyFee) }})
                            </option>
                        </select>
                    </div>

                    <div v-if="memberForm.paymentType === 'per-match'" class="form-group">
                        <label>Mức Phí Theo Trận (₫/trận)</label>
                        <input type="number" v-model="memberForm.perMatchFee" class="form-control">
                    </div>

                    <div class="form-actions">
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
import { ref, reactive } from 'vue';
import { useAppState } from '../composables/useAppState';
import ContributionTiersModal from '../components/ContributionTiersModal.vue';

const { 
    members, contributionTiers, receivables, getMemberStats, 
    addMember, updateMember, deleteMember, getContributionTier 
} = useAppState();

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
    contributionTierId: null,
    paymentType: 'team-based',
    perMatchFee: 50000
});

const openAddModal = () => {
    memberForm.id = null;
    memberForm.name = '';
    memberForm.contributionTierId = null;
    memberForm.paymentType = 'team-based';
    memberForm.perMatchFee = 50000;
    showMemberModal.value = true;
};

const openEditModal = (member) => {
    memberForm.id = member.id;
    memberForm.name = member.name;
    memberForm.contributionTierId = member.contributionTierId || null;
    memberForm.paymentType = member.paymentType || 'team-based';
    memberForm.perMatchFee = member.perMatchFee || 50000;
    showMemberModal.value = true;
};

const closeMemberModal = () => {
    showMemberModal.value = false;
};

const handleSaveMember = () => {
    if (!memberForm.name) {
        alert('Vui lòng nhập tên!');
        return;
    }

    if (memberForm.id) {
        updateMember(memberForm.id, {
            name: memberForm.name,
            contributionTierId: memberForm.contributionTierId,
            paymentType: memberForm.paymentType,
            perMatchFee: memberForm.paymentType === 'per-match' ? memberForm.perMatchFee : undefined
        });
    } else {
        addMember({
            name: memberForm.name,
            contributionTierId: memberForm.contributionTierId,
            paymentType: memberForm.paymentType,
            perMatchFee: memberForm.paymentType === 'per-match' ? memberForm.perMatchFee : undefined
        });
    }
    closeMemberModal();
};

const handleDeleteMember = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa thành viên này?')) {
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
        backgroundColor: tier.color + '20',
        color: tier.color,
        border: `1px solid ${tier.color}`,
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '500'
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
.page-content { padding: var(--spacing-xl); }
.page-actions { display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-xl); }
.table-actions { display: flex; gap: 0.5rem; justify-content: center; }
.tier-badge { display: inline-flex; align-items: center; gap: 0.5rem; }
</style>
