import { ref, computed } from 'vue';
import { useAppState } from './useAppState';
import { useFirebase } from './useFirebase';
import { useToast } from './useToast';

// --- Module-level singleton state ---
const isChecking = ref(false);
const isReconciling = ref(false);
const lastCheckResults = ref([]);

export const useFinancialSync = () => {
    const { members, transactions, receivables } = useAppState();
    const {
        postAttendanceFeeAtomic,
        voidMatchFeesAtomic,
        reconcileMemberAtomic,
        getMemberAuditLogFromFirestore,
    } = useFirebase();
    const { showToast } = useToast();

    // T010: Pure consistency check — no Firestore call, reads reactive state only
    const runConsistencyCheck = () => {
        isChecking.value = true;
        try {
            const results = members.value.map(member => {
                const memberTxs = transactions.value.filter(
                    t => String(t.memberId) === String(member.id) && t.type === 'income'
                );

                const expectedFundPaid = memberTxs
                    .filter(t => ['fund', 'monthly_fund'].includes(t.category))
                    .reduce((sum, t) => sum + (t.amount || 0), 0);

                const expectedFines = memberTxs
                    .filter(t => ['fine', 'pitch_fee'].includes(t.category))
                    .reduce((sum, t) => sum + (t.amount || 0), 0);

                const actualFundPaid = member.fundPaid || 0;
                const actualFines = member.fines || 0;

                return {
                    memberId: member.id,
                    memberName: member.name,
                    expectedFundPaid,
                    actualFundPaid,
                    expectedFines,
                    actualFines,
                    fundDrift: actualFundPaid - expectedFundPaid,
                    finesDrift: actualFines - expectedFines,
                    isConsistent:
                        actualFundPaid === expectedFundPaid &&
                        actualFines === expectedFines,
                };
            });

            lastCheckResults.value = results;
            return results;
        } finally {
            isChecking.value = false;
        }
    };

    // Derived count of inconsistent members
    const inconsistentCount = computed(
        () => lastCheckResults.value.filter(r => !r.isConsistent).length
    );

    // T015: postAttendanceFee wrapper — updates local state + toasts
    const postAttendanceFee = async (matchId, memberId, attendanceRecord, feeAmount, feeDescription) => {
        try {
            const result = await postAttendanceFeeAtomic(
                matchId, memberId, attendanceRecord, feeAmount, feeDescription
            );

            if (result) {
                // Void old receivable in local state
                if (result.voidedReceivableId) {
                    const idx = receivables.value.findIndex(
                        r => String(r.id) === String(result.voidedReceivableId)
                    );
                    if (idx !== -1) receivables.value[idx] = { ...receivables.value[idx], status: 'voided' };
                }
                // Add new receivable to local state
                if (result.newReceivable) {
                    receivables.value.push(result.newReceivable);
                }
            }
            return result;
        } catch (e) {
            showToast('Lỗi khi cập nhật khoản phí điểm danh: ' + e.message, 'error');
            throw e;
        }
    };

    // T019: voidMatchFees wrapper
    const voidMatchFees = async (matchId) => {
        try {
            const result = await voidMatchFeesAtomic(matchId);

            // Update local receivables state
            receivables.value = receivables.value.map(r =>
                r.matchId === matchId && r.status === 'unpaid'
                    ? { ...r, status: 'voided' }
                    : r
            );

            if (result.voidedCount > 0) {
                showToast(
                    `Đã hủy ${result.voidedCount} khoản phí liên quan đến trận đấu`,
                    'success'
                );
            }
            return result;
        } catch (e) {
            showToast('Lỗi khi hủy khoản phí trận đấu: ' + e.message, 'error');
            throw e;
        }
    };

    // T020: reconcileMember — correct one member's balance from ledger
    const reconcileMember = async (memberId) => {
        try {
            const result = await reconcileMemberAtomic(memberId);

            // Update local member state
            const memberIdx = members.value.findIndex(m => m.id === memberId);
            if (memberIdx !== -1 && result.after) {
                members.value[memberIdx] = {
                    ...members.value[memberIdx],
                    fundPaid: result.after.fundPaid,
                    fines: result.after.fines,
                };
            }

            // Mark as consistent in results list
            lastCheckResults.value = lastCheckResults.value.map(r =>
                r.memberId === memberId
                    ? { ...r, isConsistent: true, fundDrift: 0, finesDrift: 0 }
                    : r
            );

            return result;
        } catch (e) {
            showToast('Lỗi khi đồng bộ số dư thành viên: ' + e.message, 'error');
            throw e;
        }
    };

    // T021: reconcileAllMembers — fix all inconsistent members
    const reconcileAllMembers = async () => {
        isReconciling.value = true;
        const check = runConsistencyCheck();
        const inconsistent = check.filter(r => !r.isConsistent);
        let reconciled = 0;
        const errors = [];

        try {
            for (const report of inconsistent) {
                try {
                    await reconcileMember(report.memberId);
                    reconciled++;
                } catch (e) {
                    errors.push(`${report.memberName}: ${e.message}`);
                }
            }
            return { reconciled, skipped: members.value.length - inconsistent.length, errors };
        } finally {
            isReconciling.value = false;
        }
    };

    // T025: getMemberAuditLog — fetch audit log from Firestore
    const getMemberAuditLog = async (memberId, options = {}) => {
        try {
            return await getMemberAuditLogFromFirestore(memberId, options);
        } catch (e) {
            showToast('Lỗi khi tải lịch sử tài chính: ' + e.message, 'error');
            return [];
        }
    };

    return {
        // State
        isChecking,
        isReconciling,
        lastCheckResults,
        inconsistentCount,
        // Operations
        runConsistencyCheck,
        postAttendanceFee,
        voidMatchFees,
        reconcileMember,
        reconcileAllMembers,
        getMemberAuditLog,
    };
};
