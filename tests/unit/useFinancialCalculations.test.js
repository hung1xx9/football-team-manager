import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFinancialCalculations } from '@/composables/useFinancialCalculations';
import { ref } from 'vue';

// Mock dependencies
const mockMembers = ref([]);
const mockMatches = ref([]);
const mockContributionTiers = ref([
    { id: 1, name: 'Standard', monthlyFee: 100000 }
]);

vi.mock('@/composables/useAppState', () => ({
    useAppState: () => ({
        members: mockMembers,
        matches: mockMatches,
        contributionTiers: mockContributionTiers
    })
}));

vi.mock('@/composables/usePenalties', () => ({
    usePenalties: () => ({
        calculatePenalty: (record) => {
            if (record.status === 'present' && record.isLate) return 20000;
            if (record.status === 'absent') return 50000;
            return 0;
        }
    })
}));

describe('useFinancialCalculations Composable', () => {
    const { 
        calculateRequiredFund, 
        calculateRequiredFines, 
        calculateRemainingFund,
        calculatePerMatchRevenue
    } = useFinancialCalculations();

    beforeEach(() => {
        mockMembers.value = [];
        mockMatches.value = [];
    });

    it('should calculate required fund based on month count', () => {
        const member = { id: 1, contributionTierId: 1 };
        const currentMonth = new Date().getMonth() + 1;
        const expected = 100000 * currentMonth;
        
        expect(calculateRequiredFund(member)).toBe(expected);
    });

    it('should calculate remaining fund correctly', () => {
        const currentMonth = new Date().getMonth() + 1;
        const required = 100000 * currentMonth;
        const member = { id: 1, contributionTierId: 1, fundPaid: 50000 };
        
        expect(calculateRemainingFund(member)).toBe(required - 50000);
    });

    it('should calculate required fines from matches', () => {
        mockMatches.value = [
            {
                id: 1,
                date: '2024-04-01',
                attendance: [{ memberId: 1, status: 'present', isLate: true, lateMinutes: 15 }] // 20k
            },
            {
                id: 2,
                date: '2024-04-08',
                attendance: [{ memberId: 1, status: 'absent' }] // 50k
            }
        ];

        expect(calculateRequiredFines(1)).toBe(70000);
    });

    it('should calculate revenue for per-match members', () => {
        mockMembers.value = [
            { id: 1, name: 'Guest', paymentType: 'per-match', perMatchFee: 60000 }
        ];
        const match = {
            attendance: [{ memberId: 1, status: 'present' }]
        };

        expect(calculatePerMatchRevenue(match)).toBe(60000);
    });

    it('should use default fee for per-match members if not specified', () => {
        mockMembers.value = [
            { id: 1, name: 'Guest', paymentType: 'per-match' } // No perMatchFee
        ];
        const match = {
            attendance: [{ memberId: 1, status: 'present' }]
        };

        expect(calculatePerMatchRevenue(match)).toBe(50000);
    });
});
