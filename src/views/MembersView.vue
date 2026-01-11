<template>
    <div class="page-content">
        <div class="page-actions">
            <!-- Check if admin logic needs to be passed in or handled globally -->
            <button class="btn btn-primary" @click="openMemberModal()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Thêm Thành Viên
            </button>
            <button class="btn btn-secondary" @click="showTiersModal = true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
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
                                <th>Mức Đóng Quỹ</th>
                                <th>Tham Gia</th>
                                <th>Quỹ</th>
                                <th>Tiền Phạt</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="member in members" :key="member.id">
                                <td><strong>{{ member.name }}</strong></td>
                                <td>
                                    <span v-if="member.contributionTierId" class="tier-badge" :style="getTierStyle(member.contributionTierId)">
                                        {{ getTierIcon(member.contributionTierId) }}
                                        {{ getTierName(member.contributionTierId) }}
                                    </span>
                                    <span v-else class="badge badge-secondary">Chưa chọn</span>
                                </td>
                                <td>
                                    <span class="badge" :class="getRateColor(getMemberStats(member.id).attendanceRate)">
                                        {{ getMemberStats(member.id).attendanceRate }}%
                                    </span>
                                </td>
                                <td>{{ formatCurrency(member.fundPaid) }}</td>
                                <td>{{ formatCurrency(member.fines) }}</td>
                                <td>
                                    <div>
                                        <!-- Assuming simplified view for now, role check can be added later -->
                                        <button class="btn btn-sm btn-secondary" @click="openMemberModal(member)">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path
                                                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path
                                                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </button>
                                        <button class="btn btn-sm btn-danger" @click="handleDelete(member.id)">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path
                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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

        <!-- Member Modal could be moved to a separate component -->
        <div class="modal" v-if="showModal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ form.id ? 'Sửa' : 'Thêm' }} Thành Viên</h2>
                    <button class="modal-close" @click="closeModal">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Tên</label>
                        <input type="text" v-model="form.name">
                    </div>
                    <div class="form-group">
                        <label>Mức Đóng Quỹ</label>
                        <select v-model="form.contributionTierId">
                            <option :value="null">-- Chưa chọn --</option>
                            <option v-for="tier in contributionTiers" :key="tier.id" :value="tier.id">
                                {{ tier.icon }} {{ tier.name }} ({{ formatCurrency(tier.monthlyFee) }}/tháng)
                            </option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-primary" @click="save">Lưu</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contribution Tiers Modal -->
        <ContributionTiersModal 
            :show="showTiersModal" 
            @close="showTiersModal = false"
            @updated="onTiersUpdated" />
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAppState } from '../composables/useAppState';
import ContributionTiersModal from '../components/ContributionTiersModal.vue';

const { members, contributionTiers, getMemberStats, addMember, updateMember, deleteMember, getContributionTier } = useAppState();

const showModal = ref(false);
const showTiersModal = ref(false);
const form = reactive({ id: null, name: '', contributionTierId: null });

const openMemberModal = (member = null) => {
    if (member) {
        form.id = member.id;
        form.name = member.name;
        form.contributionTierId = member.contributionTierId || null;
    } else {
        form.id = null;
        form.name = '';
        form.contributionTierId = null;
    }
    showModal.value = true;
};

const closeModal = () => showModal.value = false;

const save = () => {
    if (form.id) {
        const member = members.value.find(m => m.id === form.id);
        if (member) {
            member.name = form.name;
            member.contributionTierId = form.contributionTierId;
            updateMember(form.id, form.name);
        }
    } else {
        const newMember = {
            id: Date.now(),
            name: form.name,
            fundPaid: 0,
            fines: 0,
            contributionTierId: form.contributionTierId
        };
        members.value.push(newMember);
    }
    closeModal();
};

const handleDelete = (id) => {
    if(confirm('Xóa?')) deleteMember(id);
};

const onTiersUpdated = () => {
    // Refresh or show notification
    console.log('Contribution tiers updated');
};

// Tier helpers
const getTierName = (tierId) => {
    const tier = getContributionTier(tierId);
    return tier ? tier.name : '';
};

const getTierIcon = (tierId) => {
    const tier = getContributionTier(tierId);
    return tier ? tier.icon : '';
};

const getTierFee = (tierId) => {
    const tier = getContributionTier(tierId);
    return tier ? tier.monthlyFee : 0;
};

const getTierStyle = (tierId) => {
    const tier = getContributionTier(tierId);
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

// Utils
const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
const getRateColor = (rate) => {
    if (rate >= 75) return 'badge-success';
    if (rate >= 50) return 'badge-warning';
    return 'badge-danger';
};
</script>

<style scoped>
.tier-badge small {
    opacity: 0.8;
    font-size: 0.75rem;
}
</style>
