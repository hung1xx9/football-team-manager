<template>
    <div class="page-content">
        <div class="stats-grid">
            <div class="stat-card stat-success">
                <div class="stat-content">
                    <div class="stat-label">Tổng Thu</div>
                    <div class="stat-value">{{ formatCurrency(stats.totalIncome) }}</div>
                </div>
            </div>
            <div class="stat-card stat-danger">
                <div class="stat-content">
                    <div class="stat-label">Tổng Chi</div>
                    <div class="stat-value">{{ formatCurrency(stats.totalExpense) }}</div>
                </div>
            </div>
            <div class="stat-card stat-info">
                <div class="stat-content">
                    <div class="stat-label">Số Dư</div>
                    <div class="stat-value">{{ formatCurrency(stats.balance) }}</div>
                </div>
            </div>
        </div>
        <div class="page-actions">
            <button class="btn btn-success" @click="openModal('income')">Thêm Thu</button>
            <button class="btn btn-danger" @click="openModal('expense')">Thêm Chi</button>
        </div>
        <div class="card">
            <div class="card-content">
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Loại</th>
                                <th>Mô Tả</th>
                                <th>Thành Viên</th>
                                <th>Số Tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="t in transactions" :key="t.id">
                                <td>{{ formatDate(t.date) }}</td>
                                <td>
                                    <span class="badge" :class="t.type === 'income' ? 'badge-success' : 'badge-danger'">
                                        {{ t.type === 'income' ? 'Thu' : 'Chi' }}
                                    </span>
                                </td>
                                <td>{{ t.category }} {{ t.description ? '- ' + t.description : '' }}</td>
                                <td>{{ getMemberName(t.memberId) || '-' }}</td>
                                <td :style="{ color: t.type === 'income' ? 'var(--success-500)' : 'var(--danger-500)' }">
                                    {{ t.type === 'income' ? '+' : '-' }}{{ formatCurrency(t.amount) }}
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-danger" @click="handleDelete(t.id)">Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Transaction Modal -->
        <div class="modal" v-if="showModal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ form.type === 'income' ? 'Thêm Thu' : 'Thêm Chi' }}</h2>
                    <button class="modal-close" @click="closeModal">x</button>
                </div>
                <div class="modal-body">
                    <div class="form-group"><label>Ngày</label><input type="date" v-model="form.date"></div>
                    <div class="form-group">
                        <label>Loại</label>
                        <select v-model="form.category">
                            <option v-for="c in availableCategories" :value="c" :key="c">{{ c }}</option>
                        </select>
                    </div>
                    <div class="form-group" v-if="form.type === 'income' || form.category === 'Quỹ tháng' || form.category === 'Tiền phạt'">
                        <label>Thành Viên</label>
                        <select v-model="form.memberId">
                            <option :value="null">Chọn thành viên</option>
                            <option v-for="m in members" :value="m.id" :key="m.id">{{ m.name }}</option>
                        </select>
                    </div>
                    <div class="form-group"><label>Số Tiền</label><input type="number" v-model="form.amount" step="1000"></div>
                    <div class="form-actions"><button class="btn btn-primary" @click="save">Lưu</button></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useAppState } from '../composables/useAppState';

const { transactions, stats, members, getMemberName, addTransaction, deleteTransaction } = useAppState();

const showModal = ref(false);
const form = reactive({ id: null, date: '', type: 'income', category: '', description: '', amount: 0, memberId: null });

const incomeCategories = ['Quỹ tháng', 'Tiền phạt', 'Tài trợ', 'Khác'];
const expenseCategories = ['Thuê sân', 'Nước uống', 'Dụng cụ', 'Liên hoan', 'Khác'];

const availableCategories = computed(() => {
    return form.type === 'income' ? incomeCategories : expenseCategories;
});

const openModal = (type) => {
    form.id = null;
    form.type = type;
    form.date = new Date().toISOString().split('T')[0];
    form.amount = 0;
    form.category = availableCategories.value[0];
    form.memberId = null;
    showModal.value = true;
};

const closeModal = () => showModal.value = false;

const save = () => {
    addTransaction({ ...form });
    closeModal();
};

const handleDelete = (id) => {
    if (confirm('Xóa giao dịch này?')) deleteTransaction(id);
};

// Utils
const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
const formatDate = (str) => { if (!str) return ''; const d = new Date(str); return d.toLocaleDateString('vi-VN'); };
</script>
