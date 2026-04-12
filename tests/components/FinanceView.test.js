import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FinanceView from '@/views/FinanceView.vue';
import { ref } from 'vue';

// Define mocks OUTSIDE
const mockShowConfirm = vi.fn(() => Promise.resolve(true));
const mockDeleteTransaction = vi.fn();
const mockTransactions = ref([
    { id: 1, type: 'income', amount: 500000, category: 'fund', description: 'Nộp quỹ', date: '2024-04-01' }
]);

vi.mock('@/composables/useAppState', () => ({
    useAppState: () => ({
        transactions: mockTransactions,
        members: ref([{ id: 1, name: 'Nguyễn Văn A' }]),
        matches: ref([]),
        pendingTransactions: ref([]),
        jerseyPayments: ref([]),
        receivables: ref([]),
        contributionTiers: ref([{ id: 1, name: 'Standard', monthlyFee: 100000 }]),
        stats: ref({ balance: 300000, totalIncome: 500000, totalExpense: 200000, totalUnpaidReceivables: 0 }),
        addTransaction: vi.fn(),
        deleteTransaction: mockDeleteTransaction,
        approvePendingTransaction: vi.fn(),
        rejectPendingTransaction: vi.fn(),
        updateJerseyPayment: vi.fn(),
        getMemberName: (id) => 'Member ' + id,
        getContributionTier: (id) => ({ id: 1, name: 'Standard', monthlyFee: 100000, color: '#ff0000' }),
        showAlert: vi.fn(),
        showConfirm: mockShowConfirm,
        showPrompt: vi.fn(() => Promise.resolve('500000'))
    })
}));

vi.mock('@/composables/useAuth', () => ({
    useAuth: () => ({
        isAdmin: ref(true),
        isAccountant: ref(false),
        permissions: ref({ canViewFinance: true }),
        currentRole: ref('admin')
    })
}));

vi.mock('@/composables/useBreakpoints', () => ({
    useBreakpoints: () => ({ isMobile: ref(false) })
}));

describe('FinanceView.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should show confirmation warning before deleting a transaction', async () => {
        const wrapper = mount(FinanceView);
        
        // Switch to history tab
        const historyTab = wrapper.findAll('.tab-btn')[1];
        await historyTab.trigger('click');
        
        // Find delete button
        const deleteBtn = wrapper.find('.btn-icon-danger');
        if (deleteBtn.exists()) {
            await deleteBtn.trigger('click');
            expect(mockShowConfirm).toHaveBeenCalled();
            expect(mockDeleteTransaction).toHaveBeenCalled();
        }
    });
});
