<template>
    <div class="view-container">
        <div v-if="editingCell" class="edit-backdrop" @click="cancelEdit"></div>
        <div class="page-content">
            <div class="table-controls">
                <div class="month-selector">
                    <button class="btn btn-sm btn-secondary" @click="prevMonth">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <div class="current-month">
                        <h2>Tháng {{ displayMonth }}</h2>
                        <p>Năm {{ displayYear }}</p>
                    </div>
                    <button class="btn btn-sm btn-secondary" @click="nextMonth">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
                <div class="legend">
                    <div class="legend-item"><div class="legend-color status-present"></div><span>Có mặt</span></div>
                    <div class="legend-item"><div class="legend-color status-late"></div><span>Muộn</span></div>
                    <div class="legend-item"><div class="legend-color status-absent-cp"></div><span>Vắng (CP)</span></div>
                    <div class="legend-item"><div class="legend-color status-absent"></div><span>Vắng</span></div>
                    <div class="legend-item"><div class="legend-color status-pending"></div><span>Chưa ĐD</span></div>
                </div>
            </div>

            <div class="table-wrapper">
                <table class="attendance-table">
                    <thead>
                        <tr>
                            <th class="sticky-col header-cell">STT</th>
                            <th class="sticky-col-name header-cell">TÊN<br>THÀNH VIÊN</th>
                            <th class="header-cell month-header" :colspan="Math.max(monthMatches.length, 5)">
                                THÁNG {{ displayMonth }}
                            </th>
                        </tr>
                        <tr>
                            <th class="sticky-col sub-header"></th>
                            <th class="sticky-col-name sub-header"></th>
                            <th v-for="match in monthMatches" :key="match.id" class="date-header">
                                Trận<br>{{ formatDateShort(match.date) }}
                            </th>
                            <th v-for="i in Math.max(0, 5 - monthMatches.length)" :key="`empty-${i}`" class="date-header">
                                <span class="no-match">-</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(member, idx) in members" :key="member.id">
                            <td class="sticky-col stt-cell">{{ idx + 1 }}</td>
                            <td class="sticky-col-name name-cell">{{ member.name }}</td>
                            <td v-for="match in monthMatches" :key="match.id" 
                                class="status-cell" 
                                :class="[getStatusClass(member.id, match), { 'is-editable': canEdit, 'active-editing': isEditing(member.id, match.id) }]"
                                @click="startEdit(member.id, match)"
                            >
                                <div class="status-content">
                                    {{ getStatusLabel(member.id, match) }}
                                    <span v-if="getLateMin(member.id, match) > 0" class="late-minutes-text">
                                        ({{ getLateMin(member.id, match) }}')
                                    </span>
                                </div>

                                <!-- Edit Popover -->
                                <div v-if="isEditing(member.id, match.id)" class="edit-popover" @click.stop>
                                    <div class="popover-header">Cập nhật điểm danh</div>
                                    <div class="popover-body">
                                        <div class="status-toggle">
                                            <button type="button" class="status-btn btn-present" :class="{ active: editForm.status === 'present' }" @click="editForm.status = 'present'">Có mặt</button>
                                            <button type="button" class="status-btn btn-late" :class="{ active: editForm.status === 'late' }" @click="editForm.status = 'late'">Muộn</button>
                                            <button type="button" class="status-btn btn-absent" :class="{ active: editForm.status === 'absent' }" @click="editForm.status = 'absent'">Vắng</button>
                                        </div>
                                        <div v-if="editForm.status === 'late'" class="late-input-container">
                                            <label>Số phút muộn:</label>
                                            <input type="number" v-model="editForm.lateMinutes" class="compact-input" min="1" @keyup.enter="saveEdit(member.id, match)">
                                        </div>
                                    </div>
                                    <div class="popover-footer">
                                        <button type="button" class="btn btn-xs btn-ghost" @click="cancelEdit">Hủy</button>
                                        <button type="button" class="btn btn-xs btn-primary" @click="saveEdit(member.id, match)">Lưu</button>
                                    </div>
                                </div>
                            </td>
                            <!-- Fill empty cells if few matches in month -->
                            <td v-for="i in Math.max(0, 5 - monthMatches.length)" :key="`fill-${i}`" class="status-cell status-no-data">
                                <div class="status-content"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';
import { usePenalties } from '../composables/usePenalties';

const { members, matches, updateMatchAttendance, hasApprovedLeave } = useAppState();
const { permissions } = useAuth();
const { getLatePenalty } = usePenalties();

const canEdit = computed(() => permissions.value.canManageAttendance);

const currentMonthStr = ref(new Date().toISOString().substring(0, 7)); // YYYY-MM
const displayMonth = computed(() => parseInt(currentMonthStr.value.split('-')[1]));
const displayYear = computed(() => currentMonthStr.value.split('-')[0]);

const monthMatches = computed(() => {
    const [y, m] = currentMonthStr.value.split('-').map(Number);
    return matches.value
        .filter(match => {
            const d = new Date(match.date);
            return d.getFullYear() === y && d.getMonth() + 1 === m;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
});

const prevMonth = () => {
    const d = new Date(currentMonthStr.value + '-01');
    d.setMonth(d.getMonth() - 1);
    currentMonthStr.value = d.toISOString().substring(0, 7);
};

const nextMonth = () => {
    const d = new Date(currentMonthStr.value + '-01');
    d.setMonth(d.getMonth() + 1);
    currentMonthStr.value = d.toISOString().substring(0, 7);
};

const formatDateShort = (d) => d ? new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) : '';

// Direct Editing State
const editingCell = ref(null);
const editForm = ref({ status: 'present', lateMinutes: 0 });

const isEditing = (mId, matchId) => editingCell.value && editingCell.value.memberId === mId && editingCell.value.matchId === matchId;

const startEdit = (mId, match) => {
    if (!canEdit.value) return;
    editingCell.value = { memberId: mId, matchId: match.id };
    const existing = getAttendance(mId, match) || {};
    editForm.value = {
        status: existing.status === 'present' ? (existing.isLate ? 'late' : 'present') : (existing.status || 'absent'),
        lateMinutes: existing.lateMinutes || 0
    };
};

const cancelEdit = () => {
    editingCell.value = null;
};

const saveEdit = async (mId, match) => {
    const isLate = editForm.value.status === 'late';
    const status = isLate ? 'present' : editForm.value.status;
    const lateMinutes = isLate ? parseInt(editForm.value.lateMinutes) : 0;
    
    const attList = Array.isArray(match.attendance) ? [...match.attendance] : Object.values(match.attendance || {});
    const idx = attList.findIndex(a => a.memberId === mId || a.memberId === String(mId) || a.memberId === Number(mId));
    
    const updObj = {
        memberId: mId,
        status,
        isLate,
        lateMinutes,
        lateFine: isLate ? getLatePenalty(lateMinutes) : 0,
        timestamp: new Date().toISOString(),
        method: 'table_edit'
    };
    
    if (idx !== -1) {
        attList[idx] = { ...attList[idx], ...updObj };
    } else {
        attList.push(updObj);
    }

    await updateMatchAttendance(match.id, attList);
    editingCell.value = null;
};

const getAttendance = (mId, match) => {
    if (!match.attendance) return null;
    const attList = Array.isArray(match.attendance) ? match.attendance : Object.values(match.attendance);
    return attList.find(a => a.memberId === mId || a.memberId === String(mId) || a.memberId === Number(mId));
};

const getStatusClass = (mId, match) => {
    const att = getAttendance(mId, match);
    if (att && att.status === 'present') return att.isLate ? 'status-late' : 'status-present';
    if (hasApprovedLeave(mId, match.date)) return 'status-absent-cp';
    if (att?.status === 'absent') return 'status-absent';
    return 'status-pending';
};

const getStatusLabel = (mId, match) => {
    const s = getStatusClass(mId, match);
    return {
        'status-present': 'có mặt',
        'status-late': 'muộn',
        'status-absent-cp': 'vắng CP',
        'status-absent': 'vắng',
        'status-pending': '-' // or empty string
    }[s] || '';
};

const getLateMin = (mId, match) => getAttendance(mId, match)?.lateMinutes || 0;
</script>

<style scoped>
.table-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.month-selector { display: flex; align-items: center; gap: 2rem; background: var(--bg-secondary); padding: 1rem 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-primary); }
.current-month { text-align: center; min-width: 120px; }
.current-month h2 { font-size: 1.25rem; margin: 0; color: var(--primary-400); }
.current-month p { font-size: 0.85rem; color: var(--text-muted); margin: 0; }
.month-selector button svg { width: 20px; height: 20px; }

.legend { display: flex; gap: 1.5rem; }
.legend-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; }
.legend-color { width: 12px; height: 12px; border-radius: 3px; }

.table-wrapper { overflow-x: auto; background: var(--bg-secondary); border-radius: var(--radius-xl); border: 1px solid var(--border-primary); }
.attendance-table { width: 100%; border-collapse: separate; border-spacing: 0; table-layout: fixed; }

.sticky-col { position: sticky; left: 0; z-index: 10; background: var(--bg-secondary); width: 60px; text-align: center; border-right: 1px solid var(--border-primary); }
.sticky-col-name { position: sticky; left: 60px; z-index: 10; background: var(--bg-secondary); width: 180px; text-align: left; padding: 0 1rem; border-right: 1px solid var(--border-primary); }

.date-header { width: 100px; text-align: center; background: var(--bg-tertiary); font-size: 0.75rem; color: var(--text-secondary); padding: 1rem 0.5rem; border-bottom: 1px solid var(--border-primary); border-right: 1px solid var(--border-primary); }
.header-cell { background: var(--bg-tertiary); padding: 1rem; font-size: 0.85rem; color: var(--text-primary); border-bottom: 1px solid var(--border-primary); }
.status-cell { text-align: center; border-bottom: 1px solid var(--border-primary); border-right: 1px solid var(--border-primary); font-size: 0.75rem; cursor: pointer; height: 60px; position: relative; padding: 4px; }

.status-content { transition: transform 0.2s; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%; border-radius: 4px; }
.status-cell:hover .status-content { transform: scale(1.05); }

.status-present .status-content { color: #fff; background: var(--success-500); }
.status-late .status-content { color: #fff; background: #ec4899; }
.status-absent .status-content { color: #fff; background: var(--danger-500); }
.status-absent-cp .status-content { color: #fff; background: var(--warning-500); }
.status-pending .status-content { color: var(--text-muted); background: rgba(255, 255, 255, 0.05); }

.legend-item .status-present { background-color: var(--success-500); }
.legend-item .status-late { background-color: #ec4899; }
.legend-item .status-absent-cp { background-color: var(--warning-500); }
.legend-item .status-absent { background-color: var(--danger-500); }
.legend-item .status-pending { background-color: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-primary); }

.late-minutes-text { font-size: 0.7rem; font-weight: 700; display: block; }
.is-editable:hover { background: rgba(255, 255, 255, 0.05); }

.edit-popover { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); z-index: 100; background: var(--bg-secondary); border: 1px solid var(--primary-500); border-radius: var(--radius-md); box-shadow: 0 10px 30px rgba(0,0,0,0.5); padding: 1rem; width: 220px; }
.popover-header { font-weight: 700; margin-bottom: 1rem; color: var(--text-primary); }
.status-toggle { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; margin-bottom: 1rem; }
.status-btn { font-size: 0.7rem; padding: 0.4rem; border: 1px solid var(--border-primary); border-radius: 4px; background: transparent; color: var(--text-primary); cursor: pointer; }
.status-btn:hover { background: var(--bg-hover); }
.status-btn.active.btn-present { background: var(--success-500); color: white; border-color: var(--success-500); }
.status-btn.active.btn-late { background: #ec4899; color: white; border-color: #ec4899; }
.status-btn.active.btn-absent { background: var(--danger-500); color: white; border-color: var(--danger-500); }

.late-input-container { margin-top: 1rem; text-align: left; }
.late-input-container label { font-size: 0.7rem; margin-bottom: 0.4rem; display: block; }
.compact-input { width: 100%; background: var(--bg-tertiary); border: 1px solid var(--border-primary); color: var(--text-primary); padding: 0.4rem; border-radius: 4px; }
.popover-footer { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem; }

.edit-backdrop { position: fixed; inset: 0; z-index: 90; }
</style>
