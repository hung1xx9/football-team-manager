<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h1>🏆 Bảng Vinh Danh</h1>
                <div class="card-actions">
                    <button v-if="isAdmin" class="btn btn-primary" @click="showModal = true">
                        ➕ Thêm Vinh Danh
                    </button>
                </div>
            </div>
            <div class="card-content">
                <!-- Search -->
                <div class="picker-group">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Tìm kiếm thành viên..."
                        class="form-control"
                    />
                </div>

                <!-- Empty State -->
                <div v-if="!filteredAwards.length" class="empty-state">
                    <div class="empty-icon">🏅</div>
                    <p>Chưa có vinh danh nào. Hãy thêm thành tích cho các thành viên!</p>
                </div>

                <!-- Awards Grid -->
                <div v-else class="awards-grid">
                    <div
                        v-for="award in filteredAwards"
                        :key="award.id"
                        class="award-card"
                    >
                        <div class="award-icon">⭐</div>
                        <div class="award-info">
                            <div class="award-member">{{ getMemberName(award.memberId) }}</div>
                            <div class="award-title">{{ award.title }}</div>
                            <div class="award-description" v-if="award.description">{{ award.description }}</div>
                            <div class="award-date">{{ formatDate(award.date) }}</div>
                        </div>
                        <div v-if="isAdmin" class="award-actions">
                            <button class="btn btn-sm btn-danger" @click="deleteAward(award.id)">🗑</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Award Modal -->
        <div class="modal" v-if="showModal" style="display: flex;">
            <div class="modal-content" style="max-width: 450px;">
                <div class="modal-header">
                    <h2>⭐ Thêm Vinh Danh</h2>
                    <button class="modal-close" @click="closeModal">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Thành Viên</label>
                        <select v-model="form.memberId" class="form-control">
                            <option value="">Chọn thành viên</option>
                            <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Tiêu đề vinh danh</label>
                        <input type="text" v-model="form.title" class="form-control" placeholder="VD: Cầu thủ xuất sắc tháng..." />
                    </div>
                    <div class="form-group">
                        <label>Mô tả (tùy chọn)</label>
                        <input type="text" v-model="form.description" class="form-control" placeholder="Thành tích..." />
                    </div>
                    <div class="form-group">
                        <label>Ngày</label>
                        <input type="date" v-model="form.date" class="form-control" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="closeModal">Hủy</button>
                    <button class="btn btn-primary" @click="saveAward">💾 Lưu</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useAppState } from '../composables/useAppState';

const { members, settings, hallOfFame, addHallOfFame, deleteHallOfFame } = useAppState();

const isAdmin = computed(() => {
    const role = settings.value?.currentRole;
    return role === 'admin' || role === 'treasurer';
});

const searchQuery = ref('');
const showModal = ref(false);
const form = reactive({ memberId: '', title: '', description: '', date: '' });

const getMemberName = (id) => {
    return members.value?.find(m => m.id === id)?.name || 'Không rõ';
};

const filteredAwards = computed(() => {
    const q = searchQuery.value.toLowerCase();
    const awards = hallOfFame?.value || [];
    if (!q) return [...awards].sort((a, b) => new Date(b.date) - new Date(a.date));
    return awards.filter(a =>
        getMemberName(a.memberId).toLowerCase().includes(q) ||
        (a.title || '').toLowerCase().includes(q)
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
});

const closeModal = () => {
    showModal.value = false;
    Object.assign(form, { memberId: '', title: '', description: '', date: '' });
};

const saveAward = () => {
    if (!form.memberId || !form.title) return alert('Vui lòng điền đầy đủ thông tin!');
    addHallOfFame?.({ ...form, date: form.date || new Date().toISOString().split('T')[0] });
    closeModal();
};

const deleteAward = (id) => {
    if (confirm('Xóa vinh danh này?')) deleteHallOfFame?.(id);
};

const formatDate = (str) => {
    if (!str) return '';
    return new Date(str).toLocaleDateString('vi-VN');
};
</script>

<style scoped>
.awards-grid {
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
}

.award-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    transition: all 0.2s;
}

.award-card:hover {
    background: rgba(255, 255, 255, 0.07);
    transform: translateY(-2px);
}

.award-icon {
    font-size: 2.5rem;
    min-width: 3rem;
    text-align: center;
}

.award-info {
    flex: 1;
}

.award-member {
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-primary);
}

.award-title {
    font-weight: 600;
    color: #fbbf24;
    font-size: 0.95rem;
    margin-top: 0.2rem;
}

.award-description {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-top: 0.2rem;
}

.award-date {
    color: var(--text-muted);
    font-size: 0.8rem;
    margin-top: 0.25rem;
}

.award-actions {
    display: flex;
    gap: 0.5rem;
}

.empty-state {
    text-align: center;
    padding: 3rem;
    color: var(--text-muted);
}

.empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.picker-group {
    margin-bottom: 1rem;
}
</style>
