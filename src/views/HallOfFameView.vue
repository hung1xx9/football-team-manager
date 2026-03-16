<template>
    <div class="page-content">
        <div class="hall-of-fame-header">
            <h1>🏆 Bảng Vàng</h1>
            <p class="subtitle">Vinh danh các thành viên có đóng góp xuất sắc cho đội</p>
            <button v-if="permissions.canManageMembers" class="btn btn-primary" @click="openModal" style="margin-top: 1rem;">
                ✏️ Cập Nhật Bảng Vàng
            </button>
        </div>

        <div class="awards-section">
            <h2>🎖️ Các Danh Hiệu</h2>
            <div class="awards-grid">
                <!-- Chuyên Cần Nhất -->
                <div class="award-card">
                    <div class="award-icon">⭐</div>
                    <h3>Chuyên Cần Nhất</h3>
                    <p class="award-description">Tham gia trận đấu nhiều nhất</p>
                    <div v-if="currentAwards.awards.bestAttendance" class="winner">
                        <div class="winner-avatar">{{ getInitials(currentAwards.awards.bestAttendance.name) }}</div>
                        <div class="winner-info">
                            <div class="winner-name">{{ currentAwards.awards.bestAttendance.name }}</div>
                            <div class="winner-stat">{{ currentAwards.awards.bestAttendance.achievement }}</div>
                        </div>
                    </div>
                </div>

                <!-- Đóng Góp Xuất Sắc -->
                <div class="award-card">
                    <div class="award-icon">💰</div>
                    <h3>Đóng Góp Xuất Sắc</h3>
                    <p class="award-description">Đóng quỹ đầy đủ nhất</p>
                    <div v-if="currentAwards.awards.bestContributor" class="winner">
                        <div class="winner-avatar">{{ getInitials(currentAwards.awards.bestContributor.name) }}</div>
                        <div class="winner-info">
                            <div class="winner-name">{{ currentAwards.awards.bestContributor.name }}</div>
                            <div class="winner-stat">{{ currentAwards.awards.bestContributor.achievement }}</div>
                        </div>
                    </div>
                </div>

                <!-- Mạnh Thường Quân -->
                <div class="award-card">
                    <div class="award-icon">💎</div>
                    <h3>Mạnh Thường Quân</h3>
                    <p class="award-description">Ủng hộ ngân sách nhiều nhất</p>
                    <div v-if="currentAwards.awards.topSponsor" class="winner">
                        <div class="winner-avatar">{{ getInitials(currentAwards.awards.topSponsor.name) }}</div>
                        <div class="winner-info">
                            <div class="winner-name">{{ currentAwards.awards.topSponsor.name }}</div>
                            <div class="winner-stat">{{ currentAwards.awards.topSponsor.achievement }}</div>
                        </div>
                    </div>
                </div>

                <!-- Kỷ Luật Cao -->
                <div class="award-card">
                    <div class="award-icon">🛡️</div>
                    <h3>Kỷ Luật Cao</h3>
                    <p class="award-description">Không bị phạt</p>
                    <div v-if="currentAwards.awards.noPenalty" class="winner">
                        <div class="winner-avatar">{{ getInitials(currentAwards.awards.noPenalty.name) }}</div>
                        <div class="winner-info">
                            <div class="winner-name">{{ currentAwards.awards.noPenalty.name }}</div>
                            <div class="winner-stat">{{ currentAwards.awards.noPenalty.achievement }}</div>
                        </div>
                    </div>
                </div>

                <!-- Tiến Bộ Nhất -->
                <div class="award-card">
                    <div class="award-icon">📈</div>
                    <h3>Tiến Bộ Nhất</h3>
                    <p class="award-description">Cải thiện tham gia tốt nhất</p>
                    <div v-if="currentAwards.awards.mostImproved" class="winner">
                        <div class="winner-avatar">{{ getInitials(currentAwards.awards.mostImproved.name) }}</div>
                        <div class="winner-info">
                            <div class="winner-name">{{ currentAwards.awards.mostImproved.name }}</div>
                            <div class="winner-stat">{{ currentAwards.awards.mostImproved.achievement }}</div>
                        </div>
                    </div>
                </div>

                <!-- MVP -->
                <div class="award-card">
                    <div class="award-icon">🌟</div>
                    <h3>Cầu Thủ Xuất Sắc</h3>
                    <p class="award-description">MVP của đội</p>
                    <div v-if="currentAwards.awards.mvp" class="winner">
                        <div class="winner-avatar">{{ getInitials(currentAwards.awards.mvp.name) }}</div>
                        <div class="winner-info">
                            <div class="winner-name">{{ currentAwards.awards.mvp.name }}</div>
                            <div class="winner-stat">{{ currentAwards.awards.mvp.achievement }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Update Modal -->
        <div v-if="showModal" class="modal" style="display: flex;">
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2>✏️ Cập Nhật Bảng Vàng</h2>
                    <button class="modal-close" @click="closeModal">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-section">
                        <h3>🎖️ Các Danh Hiệu</h3>
                        
                        <!-- Best Attendance -->
                        <div class="form-group">
                            <label>⭐ Chuyên Cần Nhất</label>
                            <MemberSelector v-model="form.awards.bestAttendance.memberId" :members="members" />
                            <input type="text" v-model="form.awards.bestAttendance.achievement" placeholder="Thành tích (vd: 95% tham gia)">
                        </div>

                        <!-- Best Contributor -->
                        <div class="form-group">
                            <label>💰 Đóng Góp Xuất Sắc</label>
                            <MemberSelector v-model="form.awards.bestContributor.memberId" :members="members" />
                            <input type="text" v-model="form.awards.bestContributor.achievement" placeholder="Thành tích">
                        </div>

                        <!-- Top Sponsor -->
                        <div class="form-group">
                            <label>💎 Mạnh Thường Quân</label>
                            <MemberSelector v-model="form.awards.topSponsor.memberId" :members="members" />
                            <input type="text" v-model="form.awards.topSponsor.achievement" placeholder="Thành tích">
                        </div>

                        <!-- No Penalty -->
                        <div class="form-group">
                            <label>🛡️ Kỷ Luật Cao</label>
                            <MemberSelector v-model="form.awards.noPenalty.memberId" :members="members" />
                            <input type="text" v-model="form.awards.noPenalty.achievement" placeholder="Thành tích">
                        </div>

                        <!-- Most Improved -->
                        <div class="form-group">
                            <label>📈 Tiến Bộ Nhất</label>
                            <MemberSelector v-model="form.awards.mostImproved.memberId" :members="members" />
                            <input type="text" v-model="form.awards.mostImproved.achievement" placeholder="Thành tích">
                        </div>

                        <!-- MVP -->
                        <div class="form-group">
                            <label>🌟 Cầu Thủ Xuất Sắc (MVP)</label>
                            <MemberSelector v-model="form.awards.mvp.memberId" :members="members" />
                            <input type="text" v-model="form.awards.mvp.achievement" placeholder="Thành tích">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="closeModal">Hủy</button>
                    <button class="btn btn-primary" @click="handleSave">💾 Lưu</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';
import MemberSelector from '../components/MemberSelector.vue';

const { members, settings, updateSettings } = useAppState();
const { permissions } = useAuth();

const showModal = ref(false);

const defaultHallOfFame = {
    awards: {
        bestAttendance: { memberId: '', name: '', achievement: '' },
        bestContributor: { memberId: '', name: '', achievement: '' },
        topSponsor: { memberId: '', name: '', achievement: '' },
        noPenalty: { memberId: '', name: '', achievement: '' },
        mostImproved: { memberId: '', name: '', achievement: '' },
        mvp: { memberId: '', name: '', achievement: '' }
    }
};

const form = ref(JSON.parse(JSON.stringify(defaultHallOfFame)));

const currentAwards = computed(() => {
    const data = settings.value.hallOfFame || defaultHallOfFame;
    const getName = (id) => members.value.find(m => m.id === id)?.name || '';
    
    return {
        awards: {
            bestAttendance: data.awards?.bestAttendance?.memberId ? { ...data.awards.bestAttendance, name: getName(data.awards.bestAttendance.memberId) } : null,
            bestContributor: data.awards?.bestContributor?.memberId ? { ...data.awards.bestContributor, name: getName(data.awards.bestContributor.memberId) } : null,
            topSponsor: data.awards?.topSponsor?.memberId ? { ...data.awards.topSponsor, name: getName(data.awards.topSponsor.memberId) } : null,
            noPenalty: data.awards?.noPenalty?.memberId ? { ...data.awards.noPenalty, name: getName(data.awards.noPenalty.memberId) } : null,
            mostImproved: data.awards?.mostImproved?.memberId ? { ...data.awards.mostImproved, name: getName(data.awards.mostImproved.memberId) } : null,
            mvp: data.awards?.mvp?.memberId ? { ...data.awards.mvp, name: getName(data.awards.mvp.memberId) } : null
        }
    };
});

const openModal = () => {
    const current = settings.value.hallOfFame || defaultHallOfFame;
    if (!current.awards) current.awards = defaultHallOfFame.awards;
    form.value = JSON.parse(JSON.stringify(current));
    showModal.value = true;
};

const closeModal = () => { showModal.value = false; };

const handleSave = async () => {
    const updatedSettings = { ...settings.value, hallOfFame: form.value };
    await updateSettings(updatedSettings);
    showModal.value = false;
    alert('✅ Đã cập nhật Bảng Vàng thành công!');
};

onMounted(() => {
    if (!settings.value.hallOfFame) {
        updateSettings({ ...settings.value, hallOfFame: defaultHallOfFame });
    }
});

const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    return parts.length === 1 ? name.substring(0, 2).toUpperCase() : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
</script>

<style scoped>
.hall-of-fame-header { text-align: center; margin-bottom: 3rem; }
.hall-of-fame-header h1 { font-size: 2.5rem; background: linear-gradient(to right, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
.subtitle { color: var(--text-secondary); font-size: 1.1rem; }

.awards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.award-card { background: var(--bg-secondary); border: 1px solid var(--border-primary); border-radius: var(--radius-xl); padding: 2rem; text-align: center; transition: all 0.3s; position: relative; overflow: hidden; }
.award-card:hover { transform: translateY(-5px); border-color: var(--primary-500); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
.award-icon { font-size: 3rem; margin-bottom: 1rem; }
.award-card h3 { font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--primary-400); }
.award-description { font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.5rem; }

.winner { display: flex; align-items: center; justify-content: center; gap: 1rem; background: rgba(255, 255, 255, 0.03); padding: 1rem; border-radius: var(--radius-lg); }
.winner-avatar { width: 48px; height: 48px; border-radius: 50%; background: var(--primary-500); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.25rem; }
.winner-info { text-align: left; }
.winner-name { font-weight: 700; color: var(--text-primary); }
.winner-stat { font-size: 0.8rem; color: var(--primary-400); font-weight: 600; }

.form-section h3 { margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-primary); padding-bottom: 0.5rem; }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
.form-group input { width: 100%; padding: 0.75rem 1rem; background: var(--bg-tertiary); border: 1px solid var(--border-primary); border-radius: var(--radius-md); color: var(--text-primary); margin-top: 0.5rem; }
</style>
