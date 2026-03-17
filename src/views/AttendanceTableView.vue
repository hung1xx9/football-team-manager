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
                        <h2>{{ displayMonth }}</h2>
                        <p>{{ displayYear }}</p>
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
                </div>
            </div>

            <div class="table-wrapper">
                <table class="attendance-table">
                    <thead>
                        <tr>
                            <th class="sticky-col header-cell">STT</th>
                            <th class="sticky-col-name header-cell">Tên<br>Thành viên</th>
                            <th class="header-cell month-header" :colspan="Math.max(monthMatches.length, 5)">
                                {{ displayMonth }}
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
                                <div class="status-inner">
                                    <div class="status-indicator"></div>
                                    <span class="status-label-text">{{ getStatusLabel(member.id, match) }}</span>
                                    <span v-if="getInternalStatus(member.id, match) === 'late'" class="late-minutes-text">
                                        ({{ getLateMinutes(member.id, match) }}')
                                    </span>
                                </div>

                                <!-- Edit Popover -->
                                <div v-if="isEditing(member.id, match.id)" class="edit-popover" @click.stop>
                                    <div class="popover-header">
                                        <div class="popover-title">Cập nhật điểm danh</div>
                                        <div class="popover-subtitle">{{ member.name }} - Trận {{ formatDateShort(match.date) }}</div>
                                    </div>
                                    <div class="popover-body">
                                        <div class="status-toggle">
                                            <button type="button" class="status-btn btn-present" :class="{ active: editStatus === 'present' }" @click.stop="editStatus = 'present'">Có mặt</button>
                                            <button type="button" class="status-btn btn-late" :class="{ active: editStatus === 'late' }" @click.stop="editStatus = 'late'">Muộn</button>
                                            <button type="button" class="status-btn btn-absent" :class="{ active: editStatus === 'absent' }" @click.stop="editStatus = 'absent'">Vắng</button>
                                        </div>

                                        <div v-if="editStatus === 'absent'" class="cp-checkbox-container" @click.stop>
                                            <label class="checkbox-label">
                                                <input type="checkbox" v-model="editIsCP">
                                                <span>Có phép (CP)</span>
                                            </label>
                                        </div>

                                        <div v-if="editStatus === 'late'" class="late-input-container">
                                            <label>Số phút muộn:</label>
                                            <input type="number" v-model="editLateMinutes" class="compact-input" min="1" v-focus @keyup.enter="saveEdit(member.id, match)" @click.stop>
                                        </div>
                                    </div>
                                    <div class="popover-footer">
                                        <button type="button" class="btn btn-sm btn-secondary" @click.stop="cancelEdit">Hủy</button>
                                        <button type="button" class="btn btn-sm btn-primary" @click.stop="saveEdit(member.id, match)">Lưu</button>
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

const { members, matches, hasApprovedLeave, saveMatch } = useAppState();
const { isAdmin, isAccountant } = useAuth();
const { getLatePenalty } = usePenalties();

// Focus directive
const vFocus = {
    mounted: (el) => el.focus()
};

const canEdit = computed(() => isAdmin.value || isAccountant.value);

const editingCell = ref(null);
const editStatus = ref("");
const editIsCP = ref(false);
const editLateMinutes = ref(0);

const currentMonthStr = ref((() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
})());

const displayMonth = computed(() => {
    const [_, m] = currentMonthStr.value.split("-");
    return `Tháng ${parseInt(m)}`;
});

const displayYear = computed(() => {
    const [y] = currentMonthStr.value.split("-");
    return `Năm ${y}`;
});

const monthMatches = computed(() => {
    const [y, m] = currentMonthStr.value.split("-");
    return matches.value.filter(match => {
        const d = new Date(match.date);
        return d.getFullYear() === parseInt(y) && d.getMonth() + 1 === parseInt(m);
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
});

const prevMonth = () => {
    const [y, m] = currentMonthStr.value.split("-");
    const d = new Date(parseInt(y), parseInt(m) - 1, 1);
    d.setMonth(d.getMonth() - 1);
    currentMonthStr.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const nextMonth = () => {
    const [y, m] = currentMonthStr.value.split("-");
    const d = new Date(parseInt(y), parseInt(m) - 1, 1);
    d.setMonth(d.getMonth() + 1);
    currentMonthStr.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const isEditing = (mId, matchId) => editingCell.value && editingCell.value.memberId === mId && editingCell.value.matchId === matchId;

const startEdit = (mId, match) => {
    if (!canEdit.value) return;
    const att = match.attendance?.find(a => a.memberId === mId);
    editingCell.value = { memberId: mId, matchId: match.id };
    
    if (att) {
        if (att.status === "present") {
            editStatus.value = att.isLate ? "late" : "present";
            editIsCP.value = false;
        } else {
            editStatus.value = "absent";
            editIsCP.value = att.status === "absent-cp";
        }
        editLateMinutes.value = att.lateMinutes || 0;
    } else if (hasApprovedLeave(mId, match.date)) {
        editStatus.value = "absent";
        editIsCP.value = true;
        editLateMinutes.value = 0;
    } else {
        editStatus.value = "absent";
        editIsCP.value = false;
        editLateMinutes.value = 0;
    }
};

const cancelEdit = () => {
    editingCell.value = null;
};

const saveEdit = async (mId, match) => {
    try {
        const isLate = editStatus.value === "late";
        const isCP = editStatus.value === "absent" && editIsCP.value;
        const status = isCP ? "absent-cp" : (isLate ? "present" : editStatus.value);
        const lateMinutes = isLate ? parseInt(editLateMinutes.value) || 0 : 0;
        
        const attendance = [...(match.attendance || [])];
        const idx = attendance.findIndex(a => a.memberId === mId);
        
        const newRecord = {
            memberId: mId,
            status,
            isLate,
            lateMinutes: isLate ? lateMinutes : 0,
            lateFine: isLate ? getLatePenalty(lateMinutes) : 0,
            timestamp: new Date().toISOString(),
            attendanceMethod: "table-edit"
        };
        
        if (idx !== -1) {
            attendance[idx] = newRecord;
        } else {
            attendance.push(newRecord);
        }
        
        const updatedMatch = { ...match, attendance };
        editingCell.value = null;
        await saveMatch(updatedMatch);
    } catch (error) {
        console.error("Error saving attendance:", error);
        editingCell.value = null;
    }
};

const getLateMinutes = (mId, match) => {
    return match.attendance?.find(a => a.memberId === mId)?.lateMinutes || 0;
};

const getInternalStatus = (mId, match) => {
    const att = match.attendance?.find(a => a.memberId === mId);
    if (att && att.status === "present") {
        return att.isLate ? "late" : "present";
    }
    if (hasApprovedLeave(mId, match.date)) {
        return "absent-cp";
    }
    return att?.status || "absent";
};

const getStatusLabel = (mId, match) => {
    const status = getInternalStatus(mId, match);
    switch (status) {
        case "present": return "có mặt";
        case "late": return "muộn";
        case "absent-cp": return "vắng (CP)";
        case "absent": return "vắng";
        default: return "";
    }
};

const getStatusClass = (mId, match) => `status-${getInternalStatus(mId, match)}`;

const formatDateShort = (date) => new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit"
});
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
.status-cell { text-align: center; border-bottom: 1px solid var(--border-primary); border-right: 1px solid var(--border-primary); font-size: 0.75rem; cursor: pointer; height: 60px; position: relative; padding: 4px; transition: z-index 0.3s; }
.status-cell.active-editing { z-index: 1001; }

.status-inner { 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    width: 100%; 
    height: 100%; 
    border-radius: 8px;
    transition: all 0.2s;
    border: 1px solid transparent;
}

.status-label-text {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.02em;
}

.status-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-bottom: 4px;
}

.status-present .status-inner { background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.2); color: #4ade80; }
.status-present .status-indicator { background: #4ade80; box-shadow: 0 0 10px #4ade80; }

.status-late .status-inner { background: rgba(236, 72, 153, 0.1); border-color: rgba(236, 72, 153, 0.2); color: #f472b6; }
.status-late .status-indicator { background: #f472b6; box-shadow: 0 0 10px #f472b6; }

.status-absent .status-inner { background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); color: #f87171; }
.status-absent .status-indicator { background: #f87171; box-shadow: 0 0 10px #f87171; }

.status-absent-cp .status-inner { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.2); color: #fbbf24; }
.status-absent-cp .status-indicator { background: #fbbf24; box-shadow: 0 0 10px #fbbf24; }

.status-pending .status-inner { background: rgba(255, 255, 255, 0.02); color: var(--text-muted); }
.status-pending .status-indicator { background: var(--text-muted); opacity: 0.3; }

.legend-item .status-present { background-color: var(--success-500); }
.legend-item .status-late { background-color: #ec4899; }
.legend-item .status-absent-cp { background-color: var(--warning-500); }
.legend-item .status-absent { background-color: var(--danger-500); }
.legend-item .status-pending { background-color: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-primary); }

.late-minutes-text { font-size: 0.7rem; font-weight: 700; display: block; }
.is-editable:hover { background: rgba(255, 255, 255, 0.05); }

.edit-popover { 
    position: absolute; 
    top: calc(100% + 10px); 
    left: 50%; 
    transform: translateX(-50%); 
    z-index: 1002; 
    background: #111a2e; 
    border: 1px solid var(--primary-500); 
    border-radius: var(--radius-xl); 
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(59, 130, 246, 0.2); 
    padding: 1.5rem; 
    width: 300px;
    backdrop-filter: blur(25px);
}
.popover-header { margin-bottom: 1.25rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 1rem; }
.popover-title { font-weight: 800; font-size: 1.25rem; color: #ffffff; letter-spacing: -0.02em; }
.popover-subtitle { font-size: 0.95rem; color: #94a3b8; margin-top: 0.5rem; font-weight: 500; }

.status-toggle { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin: 1rem 0; }
.status-btn { font-size: 0.8rem; padding: 0.6rem; border: 1px solid var(--border-primary); border-radius: 8px; background: rgba(255, 255, 255, 0.03); color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
.status-btn:hover { background: var(--bg-hover); color: #fff; }
.status-btn.active.btn-present { background: var(--success-500); color: white; border-color: var(--success-500); font-weight: 700; box-shadow: 0 0 15px rgba(34, 197, 94, 0.3); }
.status-btn.active.btn-late { background: #ec4899; color: white; border-color: #ec4899; font-weight: 700; box-shadow: 0 0 15px rgba(236, 72, 153, 0.3); }
.status-btn.active.btn-absent, .status-btn.active.btn-absent-cp { background: var(--danger-500); color: white; border-color: var(--danger-500); font-weight: 700; box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); }

.cp-checkbox-container { margin-top: 0.8rem; padding: 0.5rem; background: var(--bg-tertiary); border-radius: 4px; border: 1px solid var(--border-primary); }
.checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.8rem; color: var(--text-primary); }
.checkbox-label input { width: 16px; height: 16px; cursor: pointer; }

.late-input-container { margin-top: 1rem; text-align: left; }
.late-input-container label { font-size: 0.7rem; margin-bottom: 0.4rem; display: block; }
.compact-input { width: 100%; background: var(--bg-tertiary); border: 1px solid var(--border-primary); color: var(--text-primary); padding: 0.4rem; border-radius: 4px; }
.popover-footer { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem; }

.edit-backdrop { position: fixed; inset: 0; z-index: 900; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); }
</style>
