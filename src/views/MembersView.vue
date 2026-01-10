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
        </div>
        <div class="card">
            <div class="card-content">
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Tên</th>
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
                    <button class="modal-close" @click="closeModal">x</button>
                </div>
                <div class="modal-body">
                    <div class="form-group"><label>Tên</label><input type="text" v-model="form.name"></div>
                    <div class="form-actions"><button class="btn btn-primary" @click="save">Lưu</button></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAppState } from '../composables/useAppState';

const { members, getMemberStats, addMember, updateMember, deleteMember } = useAppState();

const showModal = ref(false);
const form = reactive({ id: null, name: '' });

const openMemberModal = (member = null) => {
    if (member) {
        form.id = member.id;
        form.name = member.name;
    } else {
        form.id = null;
        form.name = '';
    }
    showModal.value = true;
};

const closeModal = () => showModal.value = false;

const save = () => {
    if (form.id) {
        updateMember(form.id, form.name);
    } else {
        addMember(form.name);
    }
    closeModal();
};

const handleDelete = (id) => {
    if(confirm('Xóa?')) deleteMember(id);
};

// Utils
const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
const getRateColor = (rate) => {
    if (rate >= 75) return 'badge-success';
    if (rate >= 50) return 'badge-warning';
    return 'badge-danger';
};
</script>
