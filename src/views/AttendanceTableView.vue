<template>
    <div class="view-container">
        <!-- Spotlight Highlight & Popover UI -->
        <Transition name="fade">
            <div v-if="editingCell" class="spotlight-overlay" @click="cancelEdit">
                <!-- Crosshair for Row and Column -->
                <div class="row-spotlight" :style="rowSpotlightStyle"></div>
                <div class="col-spotlight" :style="colSpotlightStyle"></div>

                <!-- Selected Cell content cloned into a spotlight -->
                <div class="cell-spotlight" :style="spotlightStyle" :class="editingCellStatusClass">
                    <div class="status-inner">
                        <div class="status-indicator"></div>
                        <span class="status-label-text">{{ editingCellStatusLabel }}</span>
                        <span v-if="editStatus === 'late'" class="late-minutes-text">
                            ({{ editLateMinutes }}')
                        </span>
                    </div>
                </div>
                
                <!-- Popover positioned near the spotlight -->
                <Transition name="popover-zoom" appear>
                    <div class="edit-popover" :style="popoverStyle" @click.stop>
                        <div class="popover-header">
                            <div class="popover-title">Ghi chú điểm danh</div>
                            <div class="popover-subtitle">{{ editingMember?.name }} • {{ editingMatchDate }}</div>
                        </div>
                        <div class="popover-body">
                            <div class="status-options">
                                <button type="button" class="opt-btn opt-present" :class="{ active: editStatus === 'present' }" @click.stop="editStatus = 'present'">Có mặt</button>
                                <button type="button" class="opt-btn opt-late" :class="{ active: editStatus === 'late' }" @click.stop="editStatus = 'late'">Muộn</button>
                                <button type="button" class="opt-btn opt-absent" :class="{ active: editStatus === 'absent' }" @click.stop="editStatus = 'absent'">Vắng</button>
                            </div>

                            <div v-if="editStatus === 'absent'" class="extra-field">
                                <label class="custom-switch" :class="{ checked: editIsCP }" @click.stop="editIsCP = !editIsCP">
                                    <div class="switch-track"><div class="switch-thumb"></div></div>
                                    <span class="switch-label">Vắng có phép (CP)</span>
                                </label>
                            </div>

                            <div v-if="editStatus === 'late'" class="extra-field">
                                <div class="minutes-box">
                                    <label>Số phút đến muộn:</label>
                                    <div class="stepper-row">
                                        <button type="button" class="stepper-btn" @click.stop="editLateMinutes = Math.max(0, editLateMinutes - 5)">-5</button>
                                        <button type="button" class="stepper-btn" @click.stop="editLateMinutes = Math.max(0, editLateMinutes - 1)">-</button>
                                        <div class="stepper-display">
                                            <input type="number" v-model="editLateMinutes" class="stepper-input" min="0" v-focus @keyup.enter="handleGlobalSave" @click.stop>
                                            <span class="stepper-unit">phút</span>
                                        </div>
                                        <button type="button" class="stepper-btn" @click.stop="editLateMinutes += 1">+</button>
                                        <button type="button" class="stepper-btn" @click.stop="editLateMinutes += 5">+5</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="popover-footer">
                            <button type="button" class="pop-btn-secondary" @click.stop="cancelEdit">Hủy</button>
                            <button type="button" class="pop-btn-primary" @click.stop="handleGlobalSave">Lưu thay đổi</button>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>

        <div class="page-content">
            <div class="table-controls">
                <div class="month-selector">
                    <button class="btn btn-sm btn-ghost" @click="prevMonth">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <div class="current-month">
                        <h2>{{ displayMonth }}</h2>
                        <p>{{ displayYear }}</p>
                    </div>
                    <button class="btn btn-sm btn-ghost" @click="nextMonth">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
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
                        🏁 Chốt & Tính phạt
                    </button>
                </div>
            </div>

            <div class="table-wrapper">
                <table class="attendance-table">
                    <thead>
                        <tr>
                            <th rowspan="2" class="sticky-col header-cell stt-header">STT</th>
                            <th rowspan="2" class="sticky-col-name header-cell name-header">HỌ VÀ TÊN</th>
                            <th class="header-cell month-header" :colspan="Math.max(monthMatches.length, 5)">
                                {{ displayMonth }} {{ displayYear }}
                            </th>
                        </tr>
                        <tr>
                            <th v-for="match in monthMatches" :key="match.id" class="date-header" :class="{ 'is-finalized': match.finalized }">
                                {{ formatDateShort(match.date) }}
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
                                @click="startEdit(member.id, match, $event)"
                            >
                                <div class="status-inner">
                                    <div class="status-indicator"></div>
                                    <span class="status-label-text">{{ getStatusLabel(member.id, match) }}</span>
                                    <span v-if="getInternalStatus(member.id, match) === 'late'" class="late-minutes-text">
                                        ({{ getLateMinutes(member.id, match) }}')
                                    </span>
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
                        💡 Khi "Chốt", hệ thống sẽ tự động tạo hóa đơn nợ cho các thành viên trên.
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="showFinalizeModal = false">Hủy</button>
                    <button class="btn btn-primary" :disabled="!selectedMatchToFinalize || selectedMatchToFinalize.finalized" @click="handleFinalize">
                        Chốt & Tính phạt
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBreakpoints } from '../composables/useBreakpoints';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';
import { usePenalties } from '../composables/usePenalties';
import BaseSelect from '../components/BaseSelect.vue';

const { isMobile } = useBreakpoints();
const { members, matches, hasApprovedLeave, saveMatch, finalizeMatch, getMemberName } = useAppState();
const { isAdmin, isAccountant } = useAuth();
const { getLatePenalty, absentPenalty } = usePenalties();

const vFocus = {
    mounted: (el) => el.focus()
};

const canEdit = computed(() => isAdmin.value || isAccountant.value);

const editingCell = ref(null);
const editStatus = ref("");
const editIsCP = ref(false);
const editLateMinutes = ref(0);
const popoverStyle = ref({});
const spotlightStyle = ref({});
const rowSpotlightStyle = ref({});
const colSpotlightStyle = ref({});

const editingMember = computed(() => {
    if (!editingCell.value) return null;
    return members.value.find(m => m.id === editingCell.value.memberId);
});

const editingCellStatusClass = computed(() => {
    if (!editingCell.value) return '';
    const isLate = editStatus.value === 'late';
    const isCP = editStatus.value === 'absent' && editIsCP.value;
    const s = isCP ? 'absent-cp' : (isLate ? 'late' : editStatus.value);
    return `status-${s}`;
});

const editingCellStatusLabel = computed(() => {
    if (!editStatus.value) return '';
    if (editStatus.value === 'late') return 'muộn';
    if (editStatus.value === 'absent') {
        return editIsCP.value ? 'vắng (CP)' : 'vắng';
    }
    return 'có mặt';
});

const editingMatchDate = computed(() => {
    if (!editingCell.value) return '';
    return formatDateShort(editingCell.value.match.date);
});

const handleGlobalSave = () => {
    if (!editingCell.value) return;
    saveEdit(editingCell.value.memberId, editingCell.value.match);
};

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
        } else if (!hasApprovedLeave(member.id, match.date)) {
            penalties.push({
                memberId: member.id,
                amount: absentPenalty.value,
                type: 'fine',
                description: `Vắng không phép (Trận ${formatDateShort(match.date)})`
            });
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
    const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    return months[parseInt(m) - 1];
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

const startEdit = (mId, match, event) => {
    if (!canEdit.value) return;
    const att = match.attendance?.find(a => a.memberId === mId);
    
    // Spotlight & Popover Positioning
    const cell = event ? event.currentTarget : null;
    if (cell) {
        const rect = cell.getBoundingClientRect();
        
        // Calculate crosshair boundaries based on table wrapper
        const wrapper = document.querySelector('.table-wrapper');
        const wrapRect = wrapper ? wrapper.getBoundingClientRect() : { left: 0, width: window.innerWidth, top: 0, height: window.innerHeight };

        // Horizontal Crosshair
        rowSpotlightStyle.value = {
            top: rect.top + 'px',
            height: rect.height + 'px',
            left: wrapRect.left + 'px',
            width: wrapRect.width + 'px'
        };
        // Vertical Crosshair
        colSpotlightStyle.value = {
            left: rect.left + 'px',
            width: rect.width + 'px',
            top: (wrapRect.top + 80) + 'px', // Adjusted for header
            height: (wrapRect.height - 80) + 'px'
        };

        spotlightStyle.value = {
            top: rect.top + 'px',
            left: rect.left + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px'
        };

        const popoverHeight = 250;
        const showBelow = (window.innerHeight - rect.bottom) > (popoverHeight + 20);

        popoverStyle.value = {
            top: showBelow ? (rect.bottom + 12) + 'px' : (rect.top - popoverHeight - 12) + 'px',
            left: Math.max(10, Math.min(window.innerWidth - 310, rect.left + rect.width / 2 - 150)) + 'px'
        };
    }

    editingCell.value = { memberId: mId, matchId: match.id, match: match };
    
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
        const attendance = Array.isArray(match.attendance) ? [...match.attendance] : (match.attendance ? Object.values(match.attendance) : []);
        const idx = attendance.findIndex(a => String(a.memberId) === String(mId));
        const newRecord = {
            memberId: mId,
            status,
            isLate,
            lateMinutes: isLate ? lateMinutes : 0,
            lateFine: isLate ? getLatePenalty(lateMinutes) : 0,
            timestamp: new Date().toISOString(),
            attendanceMethod: "table-edit"
        };
        if (idx !== -1) attendance[idx] = newRecord;
        else attendance.push(newRecord);
        const updatedMatch = { ...match, attendance };
        editingCell.value = null;
        await saveMatch(updatedMatch);
    } catch (error) {
        console.error("Error saving attendance:", error);
        editingCell.value = null;
    }
};

const getLateMinutes = (mId, match) => {
  const attList = Array.isArray(match.attendance) ? match.attendance : (match.attendance ? Object.values(match.attendance) : []);
  return attList.find(a => String(a.memberId) === String(mId))?.lateMinutes || 0;
}

const getInternalStatus = (mId, match) => {
    const attList = Array.isArray(match.attendance) ? match.attendance : (match.attendance ? Object.values(match.attendance) : []);
    const att = attList.find(a => String(a.memberId) === String(mId));
    if (att && att.status === "present") return att.isLate ? "late" : "present";
    if (hasApprovedLeave(mId, match.date)) return "absent-cp";
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
.table-controls { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 24px; 
    flex-wrap: wrap;
    gap: 16px;
}

.month-selector { 
    display: flex; 
    align-items: center; 
    gap: 24px; 
    background: var(--bg-secondary); 
    padding: 8px 16px; 
    border-radius: var(--radius-md); 
    border: 1px solid var(--border-color); 
    box-shadow: var(--shadow-sm); 
}

.current-month { text-align: center; min-width: 120px; }
.current-month h2 { 
    font-size: 16px; 
    margin: 0; 
    color: var(--text-primary); 
    font-weight: 700; 
}
.current-month p { 
    font-size: 12px; 
    color: var(--text-secondary); 
    margin: 0; 
    font-weight: 500; 
}

.legend { 
    display: flex; 
    align-items: center;
    gap: 20px; 
    background: var(--bg-secondary); 
    padding: 10px 24px; 
    border-radius: var(--radius-full); 
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
}

.legend-item { 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    font-size: 11px; 
    font-weight: 800; 
    color: var(--text-secondary); 
    text-transform: uppercase; 
    letter-spacing: 0.05em;
    white-space: nowrap;
}

.legend-color { 
    width: 8px; 
    height: 8px; 
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
}

.legend-color.status-present { background: var(--success); box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
.legend-color.status-late { background: #d6336c; box-shadow: 0 0 8px rgba(214, 51, 108, 0.4); }
.legend-color.status-absent-cp { background: #f08c00; box-shadow: 0 0 8px rgba(240, 140, 0, 0.4); }
.legend-color.status-absent { background: var(--danger); box-shadow: 0 0 8px rgba(239, 68, 68, 0.4); }

.table-wrapper { 
    overflow: auto; 
    background: var(--bg-secondary); 
    border-radius: var(--radius-md); 
    border: 1px solid var(--border-color); 
    max-height: 70vh;
    box-shadow: var(--shadow-sm);
    position: relative;
}

.attendance-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.sticky-col { position: sticky; left: 0; z-index: 10; width: 40px; min-width: 40px; text-align: center; border-right: 1px solid var(--border-color); }
.sticky-col-name { position: sticky; left: 40px; z-index: 10; width: 180px; min-width: 150px; text-align: left; padding: 0 12px; border-right: 2px solid var(--border-color); }

th.sticky-col, th.sticky-col-name { z-index: 110; background: var(--bg-tertiary); }
td.sticky-col, td.sticky-col-name { background: var(--bg-secondary); }

.stt-cell { font-family: inherit; font-weight: 400; color: var(--text-secondary); font-size: 12px; }
.name-cell { font-weight: 600; color: var(--text-primary); font-size: 13px; }

.header-cell { 
    background: var(--bg-tertiary); 
    padding: 8px 12px; 
    font-size: 11px; 
    color: var(--text-primary); 
    border-bottom: 1px solid var(--border-color); 
    font-weight: 700; 
    position: sticky; 
    top: 0; 
    z-index: 100; 
    height: 40px; 
    vertical-align: middle; 
    text-transform: uppercase;
}

.month-header { background: var(--bg-tertiary); color: var(--primary-700); font-weight: 700; }
.date-header { 
    width: 100px; text-align: center; background: var(--bg-tertiary); font-size: 10px; color: var(--text-secondary); 
    padding: 4px; height: 36px; border-bottom: 1px solid var(--border-color); border-right: 1px solid var(--border-color); 
    font-weight: 600; position: sticky; top: 40px; z-index: 100;
}

.status-cell { height: 50px; position: relative; padding: 4px; cursor: pointer; transition: all 0.2s; }
.status-cell:hover { background: var(--bg-hover); }
.status-inner { 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    width: 100%; 
    height: 100%; 
    border-radius: 6px; 
    border: 1px solid transparent;
}
.status-label-text { font-size: 10px; font-weight: 700; text-transform: uppercase; margin-top: 2px; }
.status-indicator { width: 6px; height: 6px; border-radius: 50%; margin-bottom: 2px; }

.status-present .status-inner { background: rgba(16, 185, 129, 0.1); color: var(--success); }
.status-present .status-indicator { background: var(--success); }
.status-late .status-inner { background: rgba(214, 51, 108, 0.1); color: #d6336c; }
.status-late .status-indicator { background: #d6336c; }
.status-absent .status-inner { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
.status-absent .status-indicator { background: var(--danger); opacity: 0.6; }
.status-absent-cp .status-inner { background: rgba(240, 140, 0, 0.1); color: #f08c00; }
.status-absent-cp .status-indicator { background: #f08c00; }

/* Spotlight UI Styles */
.spotlight-overlay {
    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.2); z-index: 2000;
}

.row-spotlight, .col-spotlight {
    position: fixed;
    background: var(--primary-50);
    opacity: 0.07;
    pointer-events: none;
    z-index: 2000;
}

.cell-spotlight {
    position: fixed; border-radius: 8px; border: 2px solid var(--primary-600);
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.2);
    pointer-events: none; z-index: 2001; background: var(--bg-secondary); 
    display: flex; align-items: center; justify-content: center;
    padding: 4px;
}

.edit-popover {
    position: fixed; 
    width: 320px; 
    background: var(--bg-elevated);
    border: 1px solid var(--border-color); 
    border-radius: var(--radius-lg);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); 
    z-index: 2002; 
    padding: 20px;
    animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes popIn {
    from { opacity: 0; transform: scale(0.9) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}

.popover-header { margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; }
.popover-title { font-size: 15px; font-weight: 800; color: var(--text-primary); margin: 0; }
.popover-subtitle { font-size: 13px; color: var(--text-secondary); margin-top: 4px; font-weight: 500;}

.status-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
.opt-btn {
    border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-secondary); height: 40px;
    border-radius: var(--radius-md); font-size: 12px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
}
.opt-btn:hover:not(.active) { background: var(--bg-hover); border-color: var(--border-hover); }

.opt-btn.active.opt-present { background: var(--success); color: #fff; border-color: var(--success); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2); }
.opt-btn.active.opt-late { background: var(--primary-600); color: #fff; border-color: var(--primary-600); box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }
.opt-btn.active.opt-absent { background: var(--danger); color: #fff; border-color: var(--danger); box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2); }

.extra-field { margin-top: 12px; }

.minutes-box { background: var(--primary-50); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--primary-100); }
.minutes-box label { display: block; font-size: 11px; color: var(--primary-700); text-transform: uppercase; margin-bottom: 10px; font-weight: 800; letter-spacing: 0.05em; }

.stepper-row { 
    display: flex; 
    align-items: stretch; 
    background: var(--bg-secondary); 
    border: 1px solid var(--border-color);
    border-radius: 8px; 
    overflow: hidden;
    height: 44px;
    box-shadow: var(--shadow-sm);
}

.stepper-btn {
    width: 44px; border: none; background: var(--bg-tertiary); color: var(--text-primary); font-weight: 800; cursor: pointer; transition: all 0.2s; font-size: 14px;
}
.stepper-btn:hover { background: var(--bg-hover); color: var(--primary-600); }
.stepper-btn:active { background: var(--gray-200); }

.stepper-display {
    flex: 1; display: flex; align-items: center; gap: 4px; justify-content: center; background: var(--bg-secondary); padding: 0 12px; border-left: 1px solid var(--border-color); border-right: 1px solid var(--border-color);
}

.stepper-input {
    width: 32px; background: transparent; border: none; color: var(--text-primary); text-align: center; font-size: 18px; font-weight: 800; outline: none; padding: 0;
}
.stepper-input::-webkit-inner-spin-button { appearance: none; }

.stepper-unit { font-size: 13px; font-weight: 600; color: var(--text-secondary); }

.popover-footer { display: flex; gap: 10px; margin-top: 20px; }
.popover-footer button { flex: 1; height: var(--height-md); border-radius: var(--radius-md); border: none; font-weight: 700; cursor: pointer; font-size: 14px; transition: all 0.2s; }
.pop-btn-secondary { background: var(--bg-tertiary); color: var(--text-primary); }
.pop-btn-secondary:hover { background: var(--bg-active); }
.pop-btn-primary { background: var(--primary-600); color: #fff; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); }
.pop-btn-primary:hover { background: var(--primary-700); transform: translateY(-1px); }

/* Custom Switch for Light Theme */
.custom-switch { display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 4px 0; }
.switch-track { width: 36px; height: 18px; background: var(--gray-300); border-radius: 12px; position: relative; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.switch-thumb { width: 14px; height: 14px; background: #fff; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.custom-switch.checked .switch-track { background: var(--primary-600); }
.custom-switch.checked .switch-thumb { transform: translateX(18px); }
.switch-label { font-size: 13px; color: var(--text-primary); font-weight: 600; }

.modal { 
    position: fixed; inset: 0; z-index: 2000; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); 
}
.modal-content { 
    background: var(--bg-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-lg); color: var(--text-primary); width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-lg); 
}
.modal-header { padding: 16px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; }
.modal-body { padding: 20px; }
.modal-footer { padding: 16px 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 12px; }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.popover-zoom-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.popover-zoom-enter-from { opacity: 0; transform: scale(0.9) translateY(10px); }
</style>
