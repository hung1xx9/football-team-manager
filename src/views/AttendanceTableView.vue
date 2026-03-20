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
                <div v-if="monthMatches.length > 0 && canEdit" class="table-actions">
                    <button class="btn btn-primary" @click="showFinalizeModal = true">
                        🏁 Chốt trận & Tính phạt
                    </button>
                </div>
            </div>

            <div class="table-wrapper">
                <table class="attendance-table">
                    <thead>
                        <tr>
                            <th rowspan="2" class="sticky-col header-cell stt-header">STT</th>
                            <th rowspan="2" class="sticky-col-name header-cell name-header">Tên thành viên</th>
                            <th class="header-cell month-header" :colspan="Math.max(monthMatches.length, 5)">
                                {{ displayMonth }}
                            </th>
                        </tr>
                        <tr>
                            <th v-for="match in monthMatches" :key="match.id" class="date-header" :class="{ 'is-finalized': match.finalized }">
                                Trận<br>{{ formatDateShort(match.date) }}
                                <span v-if="match.finalized" class="finalized-badge" title="Đã chốt nợ">✔️</span>
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

        <!-- Finalize Preview Modal -->
        <div v-if="showFinalizeModal" class="modal" style="display: flex;">
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2>🏁 Chốt Trận & Ghi Nợ</h2>
                    <button class="modal-close" @click="showFinalizeModal = false">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Chọn trận muốn chốt:</label>
                        <BaseSelect 
                            v-model="selectedMatchToFinalize"
                            :options="matchOptions"
                            placeholder="Chọn trận đấu..."
                        />
                    </div>

                    <div v-if="selectedMatchToFinalize" class="penalty-preview">
                        <h3>Danh sách phạt dự kiến:</h3>
                        <div class="table-container">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Thành viên</th>
                                        <th>Lỗi</th>
                                        <th class="text-right">Số tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="p in previewPenalties" :key="p.memberId">
                                        <td>{{ getMemberName(p.memberId) }}</td>
                                        <td>{{ p.description }}</td>
                                        <td class="text-right font-bold">{{ formatCurrency(p.amount) }}</td>
                                    </tr>
                                    <tr v-if="previewPenalties.length === 0">
                                        <td colspan="3" class="text-center">Không có ai bị phạt trong trận này 🎉</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2" class="text-right"><strong>Tổng cộng:</strong></td>
                                        <td class="text-right font-bold text-danger">{{ formatCurrency(totalPreviewPenalty) }}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div class="alert alert-info" style="margin-top: 1rem;">
                        💡 Khi "Chốt", hệ thống sẽ tự động tạo hóa đơn nợ cho các thành viên trên. Sau khi chốt, bạn vẫn có thể sửa điểm danh nhưng nợ sẽ không tự động thay đổi.
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="showFinalizeModal = false">Hủy</button>
                    <button class="btn btn-primary" :disabled="!selectedMatchToFinalize || selectedMatchToFinalize.finalized" @click="handleFinalize">
                        🚀 Xác nhận Chốt & Ghi Nợ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';
import { usePenalties } from '../composables/usePenalties';
import BaseSelect from '../components/BaseSelect.vue';

const { members, matches, hasApprovedLeave, saveMatch, finalizeMatch, getMemberName } = useAppState();
const { isAdmin, isAccountant } = useAuth();
const { getLatePenalty, absentPenalty } = usePenalties();

// Focus directive
const vFocus = {
    mounted: (el) => el.focus()
};

const canEdit = computed(() => isAdmin.value || isAccountant.value);

const editingCell = ref(null);
const editStatus = ref("");
const editIsCP = ref(false);
const editLateMinutes = ref(0);

const showFinalizeModal = ref(false);
const selectedMatchToFinalize = ref(null);

const matchOptions = computed(() => monthMatches.value.map(match => ({
    label: `Trận ${formatDateShort(match.date)} ${match.finalized ? '(Đã chốt)' : ''}`,
    value: match,
    disabled: match.finalized
})));

const previewPenalties = computed(() => {
    if (!selectedMatchToFinalize.value) return [];
    
    const penalties = [];
    const match = selectedMatchToFinalize.value;
    
    // Check members for each match
    members.value.forEach(member => {
        const att = match.attendance?.find(a => a.memberId === member.id);
        
        if (att) {
            if (att.status === 'present' && att.isLate) {
                penalties.push({
                    memberId: member.id,
                    amount: att.lateFine || getLatePenalty(att.lateMinutes),
                    type: 'fine',
                    description: `Muộn ${att.lateMinutes} phút (Trận ${formatDateShort(match.date)})`
                });
            } else if (att.status === 'absent') {
                penalties.push({
                    memberId: member.id,
                    amount: absentPenalty.value,
                    type: 'fine',
                    description: `Vắng không phép (Trận ${formatDateShort(match.date)})`
                });
            }
        } else {
             // No attendance record = Absent (unexcused if no leave approved)
             if (!hasApprovedLeave(member.id, match.date)) {
                 penalties.push({
                     memberId: member.id,
                     amount: absentPenalty.value,
                     type: 'fine',
                     description: `Vắng không phép (Trận ${formatDateShort(match.date)})`
                 });
             }
        }
    });
    
    return penalties;
});

const totalPreviewPenalty = computed(() => previewPenalties.value.reduce((sum, p) => sum + p.amount, 0));

const handleFinalize = async () => {
    if (!selectedMatchToFinalize.value) return;
    try {
        await finalizeMatch(selectedMatchToFinalize.value.id, previewPenalties.value);
        showFinalizeModal.value = false;
        selectedMatchToFinalize.value = null;
        alert('Đã chốt trận và ghi nợ thành công!');
    } catch (e) {
        alert('Lỗi: ' + e.message);
    }
};

const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0);

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
.month-selector { display: flex; align-items: center; gap: 2rem; background: var(--bg-secondary); padding: 1rem 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-primary); box-shadow: var(--shadow-md); }
.current-month { text-align: center; min-width: 140px; }
.current-month h2 { font-size: 1.4rem; margin: 0; color: #fff; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
.current-month p { font-size: 0.85rem; color: var(--primary-400); margin: 0; font-weight: 700; }
.month-selector button { width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center; }
.month-selector button svg { width: 24px; height: 24px; }

.legend { display: flex; gap: 1.5rem; background: rgba(0,0,0,0.2); padding: 0.75rem 1.5rem; border-radius: var(--radius-full); border: 1px solid var(--border-primary); }
.legend-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; }
.legend-color { width: 10px; height: 10px; border-radius: 50%; }

.table-wrapper { 
    overflow: auto; 
    background: #0f172a; 
    border-radius: var(--radius-xl); 
    border: 1px solid var(--border-primary); 
    max-height: 75vh;
    box-shadow: var(--shadow-2xl);
    position: relative;
}

.attendance-table { 
    width: 100%; 
    border-collapse: separate; 
    border-spacing: 0;
}

.sticky-col { 
    position: sticky; 
    left: 0; 
    z-index: 10; 
    width: 50px; 
    min-width: 50px;
    text-align: center; 
    border-right: 1px solid rgba(255,255,255,0.05);
}

.sticky-col-name { 
    position: sticky; 
    left: 50px; 
    z-index: 10; 
    width: 180px; 
    min-width: 180px;
    text-align: left; 
    padding: 0 1rem; 
    border-right: 1px solid rgba(255,255,255,0.05);
}

th.sticky-col, th.sticky-col-name {
    z-index: 110; /* Higher than other headers */
    background: #1e293b;
}

td.sticky-col, td.sticky-col-name {
    background: #0f172a;
}

.stt-cell { font-family: monospace; font-weight: 600; color: var(--text-secondary); }
.name-cell { font-weight: 700; color: #fff; }

/* Headers */
.header-cell { 
    background: #1e293b; 
    padding: 0.6rem 1rem; 
    font-size: 0.8rem; 
    color: #fff; 
    border-bottom: 1px solid rgba(255,255,255,0.1); 
    font-weight: 900; 
    position: sticky; 
    top: 0; 
    z-index: 100; 
    height: 48px; 
    vertical-align: middle; 
    text-transform: uppercase;
    letter-spacing: 0.1em;
    box-shadow: 0 1px 0 rgba(255,255,255,0.1);
}

.month-header {
    background: #111a2e;
    color: var(--primary-400);
    font-size: 1rem;
    letter-spacing: 0.2em;
}

.date-header { 
    width: 110px; 
    text-align: center; 
    background: #0f172a; 
    font-size: 0.65rem; 
    color: var(--text-secondary); 
    padding: 0.5rem; 
    height: 42px; 
    border-bottom: 2px solid var(--border-primary); 
    border-right: 1px solid rgba(255,255,255,0.05); 
    font-weight: 800; 
    text-transform: uppercase; 
    letter-spacing: 0.05em; 
    position: sticky; 
    top: 48px; 
    z-index: 100; 
    vertical-align: middle; 
    box-shadow: 0 1px 0 var(--border-primary);
}

.status-cell {
    height: 65px; 
    position: relative; 
    padding: 6px; 
    cursor: pointer;
    background: rgba(15, 23, 42, 0.2);
    transition: all 0.2s;
}

.status-cell:hover {
    background: rgba(255,255,255,0.05);
}

.status-inner { 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    width: 100%; 
    height: 100%; 
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
}

.status-label-text {
    font-size: 0.65rem;
    font-weight: 850;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 2px;
}

.status-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-bottom: 4px;
}

/* Status variants with glass effect */
.status-present .status-inner { 
    background: rgba(34, 197, 94, 0.1); 
    border-color: rgba(34, 197, 94, 0.2); 
    color: #4ade80; 
}
.status-present .status-indicator { background: #4ade80; box-shadow: 0 0 10px #4ade80; }
.status-present:hover .status-inner { background: rgba(34, 197, 94, 0.2); transform: scale(0.96); }

.status-late .status-inner { 
    background: rgba(236, 72, 153, 0.1); 
    border-color: rgba(236, 72, 153, 0.2); 
    color: #f472b6; 
}
.status-late .status-indicator { background: #f472b6; box-shadow: 0 0 10px #f472b6; }
.status-late:hover .status-inner { background: rgba(236, 72, 153, 0.2); transform: scale(0.96); }

.status-absent .status-inner { 
    background: rgba(239, 68, 68, 0.08); 
    border-color: rgba(239, 68, 68, 0.15); 
    color: #f87171; 
}
.status-absent .status-indicator { background: #f87171; opacity: 0.6; }
.status-absent:hover .status-inner { background: rgba(239, 68, 68, 0.15); }

.status-absent-cp .status-inner { 
    background: rgba(245, 158, 11, 0.1); 
    border-color: rgba(245, 158, 11, 0.2); 
    color: #fbbf24; 
}
.status-absent-cp .status-indicator { background: #fbbf24; box-shadow: 0 0 10px #fbbf24; }
.status-absent-cp:hover .status-inner { background: rgba(245, 158, 11, 0.2); transform: scale(0.96); }

/* Legend colors */
.legend-item .status-present { background-color: #22c55e; box-shadow: 0 0 8px rgba(34, 197, 94, 0.5); }
.legend-item .status-late { background-color: #ec4899; box-shadow: 0 0 8px rgba(236, 72, 153, 0.5); }
.legend-item .status-absent-cp { background-color: #f59e0b; box-shadow: 0 0 8px rgba(245, 158, 11, 0.5); }
.legend-item .status-absent { background-color: #ef4444; opacity: 0.7; }

.late-minutes-text { font-size: 0.65rem; font-weight: 800; margin-bottom: 2px; }

/* Edit Popover Enhancements */
.edit-popover { 
    position: absolute; 
    top: 50%;
    left: 50%; 
    transform: translate(-50%, -50%); 
    z-index: 1002; 
    background: #1e293b; 
    border: 1px solid var(--primary-500/30); 
    border-radius: var(--radius-xl); 
    box-shadow: 0 0 0 100vmax rgba(0,0,0,0.5), var(--shadow-2xl);
    padding: 1.5rem; 
    width: 320px;
    backdrop-filter: blur(25px);
}

.edit-backdrop { position: fixed; inset: 0; z-index: 1001; background: rgba(0, 0, 0, 0.2); }

.status-btn.active.btn-present { background: #22c55e; box-shadow: 0 0 15px rgba(34, 197, 94, 0.4); }
.status-btn.active.btn-late { background: #ec4899; box-shadow: 0 0 15px rgba(236, 72, 153, 0.4); }
.status-btn.active.btn-absent { background: #ef4444; box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }

.no-match { opacity: 0.2; font-weight: 300; }

@media (max-width: 768px) {
    .table-controls { flex-direction: column; gap: 1rem; align-items: stretch; }
    .legend { overflow-x: auto; padding: 0.5rem 1rem; }
    .sticky-col-name { width: 140px; }
}

.finalized-badge { margin-left: 4px; color: var(--success-500); font-size: 0.7rem; }
.date-header.is-finalized { border-top: 2px solid var(--success-500); }

.modal { position: fixed; inset: 0; z-index: 2000; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); }
.modal-content { background: #111a2e; border: 1px solid var(--border-primary); border-radius: var(--radius-xl); color: #fff; width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
.modal-header { padding: 1.5rem; border-bottom: 1px solid var(--border-primary); display: flex; justify-content: space-between; align-items: center; }
.modal-body { padding: 1.5rem; }
.modal-footer { padding: 1.5rem; border-top: 1px solid var(--border-primary); display: flex; justify-content: flex-end; gap: 1rem; }
.close-btn { background: none; border: none; font-size: 2rem; color: var(--text-muted); cursor: pointer; }

.penalty-preview { margin-top: 1.5rem; background: rgba(255,255,255,0.03); border-radius: var(--radius-lg); padding: 1rem; }
.penalty-preview h3 { font-size: 1rem; margin-bottom: 1rem; color: var(--warning-400); }
</style>
