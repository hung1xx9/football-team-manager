import { useAppState } from './useAppState';
import { usePenalties } from './usePenalties';

export const useFinancialCalculations = () => {
    const { members, matches, contributionTiers } = useAppState();
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
            const record = match.attendance?.find(a => a.memberId === memberId);
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

    const getMemberFinancialStatus = (member) => {
        const fundRequired = calculateRequiredFund(member);
        const fundPaid = member.fundPaid || 0;
        const fundMissing = Math.max(0, fundRequired - fundPaid);

        const fineRequired = calculateRequiredFines(member.id);
        const finePaid = member.fines || 0;
        const fineMissing = Math.max(0, fineRequired - finePaid);

        return {
            fundRequired,
            fundPaid,
            fundMissing,
            fineRequired,
            finePaid,
            fineMissing,
            totalDebt: fundMissing + fineMissing,
            isPaidUp: fundMissing === 0 && fineMissing === 0
        };
    };

    const getStatusText = (status) => {
        if (status.fineMissing > 0) return 'Nợ Phạt';
        if (status.fundMissing > 0) return 'Nợ Quỹ';
        return 'Đủ';
    };

    const calculatePerMatchRevenue = (match) => {
        if (!match || !match.attendance) return 0;
        let total = 0;
        match.attendance.forEach(record => {
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
        let total = 0;
        match.attendance.forEach(record => {
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
