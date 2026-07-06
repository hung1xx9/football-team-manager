import { useAppState } from './useAppState';
import { usePenalties } from './usePenalties';

export const useFinancialCalculations = () => {
    const { members, matches, contributionTiers, receivables, transactions } = useAppState();
    const { calculatePenalty } = usePenalties();

    const getCurrentMonthCount = () => Math.max(1, new Date().getMonth() + 1);

    const calculateRequiredFund = (member) => {
        if (!member || !member.contributionTierId) return 0;
        const tier = contributionTiers.value.find(t => t.id === member.contributionTierId);
        if (!tier) return 0;
        return tier.monthlyFee * getCurrentMonthCount();
    };

    const calculateRequiredFines = (memberId) => {
        let total = 0;
        matches.value.forEach(match => {
            const attList = Array.isArray(match.attendance) ? match.attendance : Object.values(match.attendance || {});
            const record = attList.find(a => String(a.memberId) === String(memberId));
            if (record) {
                total += calculatePenalty(record);
            }
        });
        return total;
    };

    const calculateRemainingFund = (member) => {
        if (!member) return 0;
        const required = calculateRequiredFund(member);
        const paid = member.fundPaid || 0;
        return Math.max(0, required - paid);
    };

    const calculateRemainingFines = (member) => {
        if (!member) return 0;
        const required = calculateRequiredFines(member.id);
        const paid = member.fines || 0;
        return Math.max(0, required - paid);
    };

    const calculateTotalDebt = (member) => {
        return calculateRemainingFund(member) + calculateRemainingFines(member);
    };

    const getMemberFinancialStatus = (memberId) => {
        const member = members.value.find(m => m.id === memberId);
        if (!member) return null;

        const memberReceivables = receivables.value.filter(r => r.memberId === memberId);
        
        const fundRequired = memberReceivables.filter(r => r.type === 'monthly_fund').reduce((sum, r) => sum + r.amount, 0);
        const fundPaid = memberReceivables.filter(r => r.type === 'monthly_fund' && r.status === 'paid').reduce((sum, r) => sum + r.amount, 0);
        const fundMissing = fundRequired - fundPaid;

        const fineRequired = memberReceivables.filter(r => (r.type === 'fine' || r.type === 'pitch_fee')).reduce((sum, r) => sum + r.amount, 0);
        const finePaid = memberReceivables.filter(r => (r.type === 'fine' || r.type === 'pitch_fee') && r.status === 'paid').reduce((sum, r) => sum + r.amount, 0);
        const fineMissing = fineRequired - finePaid;

        const otherDebt = memberReceivables.filter(r => r.type === 'legacy_debt' && r.status === 'unpaid').reduce((sum, r) => sum + r.amount, 0);

        return {
            fundRequired,
            fundPaid,
            fundMissing,
            fineRequired,
            finePaid,
            fineMissing,
            totalDebt: fundMissing + fineMissing + otherDebt,
            isPaidUp: (fundMissing + fineMissing + otherDebt) === 0
        };
    };

    const getStatusText = (status) => {
        if (status.fineMissing > 0) return 'Nợ Phạt';
        if (status.fundMissing > 0) return 'Nợ Quỹ';
        return 'Đủ';
    };

    const calculatePerMatchRevenue = (match) => {
        if (!match || !match.attendance) return 0;
        const attList = Array.isArray(match.attendance) ? match.attendance : Object.values(match.attendance || {});
        let total = 0;
        attList.forEach(record => {
            if (record.status === 'present') {
                const member = members.value.find(m => m.id === record.memberId);
                if (member && member.paymentType === 'per-match') {
                    total += (member.perMatchFee || 50000);
                }
            }
        });
        return total;
    };

    const calculateMatchFines = (match) => {
        if (!match || !match.attendance) return 0;
        const attList = Array.isArray(match.attendance) ? match.attendance : Object.values(match.attendance || {});
        let total = 0;
        attList.forEach(record => {
            total += calculatePenalty(record);
        });
        return total;
    };

    return {
        getCurrentMonthCount,
        calculateRequiredFund,
        calculateRequiredFines,
        calculateRemainingFund,
        calculateRemainingFines,
        calculateTotalDebt,
        getMemberFinancialStatus,
        getStatusText,
        calculatePerMatchRevenue,
        calculateMatchFines
    };
};
