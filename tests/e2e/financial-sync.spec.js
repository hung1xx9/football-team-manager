import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FinanceView from '../../src/views/FinanceView.vue';
import { ref } from 'vue';

// Mock child components to prevent deep rendering issues
vi.mock('../../src/components/BaseSelect.vue', () => ({
    default: { template: '<select><option value=""></option></select>' }
}));
vi.mock('../../src/components/FinancialAuditLog.vue', () => ({
    default: { template: '<div class="mock-audit-log">Mock Audit Log</div>' }
}));

// Mock composables
const mockRunConsistencyCheck = vi.fn();
const mockReconcileAllMembers = vi.fn().mockResolvedValue({ reconciled: 1, errors: [] });
const mockShowConfirm = vi.fn().mockResolvedValue(true);
const mockShowAlert = vi.fn().mockResolvedValue(true);

vi.mock('../../src/composables/useFinancialSync', () => ({
    useFinancialSync: () => ({
        isChecking: ref(false),
        isReconciling: ref(false),
        lastCheckResults: ref([
            { memberId: 1, memberName: 'Drifted Member', expectedFundPaid: 100, actualFundPaid: 50, fundDrift: -50, isConsistent: false }
        ]),
        inconsistentCount: ref(1),
        runConsistencyCheck: mockRunConsistencyCheck,
        reconcileAllMembers: mockReconcileAllMembers,
        reconcileMember: vi.fn(),
    })
}));

vi.mock('../../src/composables/useAppState', () => ({
    useAppState: () => ({
        members: ref([{ id: 1, name: 'Drifted Member' }]),
        transactions: ref([]),
        matches: ref([]),
        pendingTransactions: ref([]),
        jerseyPayments: ref([]),
        receivables: ref([]),
        contributionTiers: ref([]),
        showConfirm: mockShowConfirm,
        showAlert: mockShowAlert,
        getContributionTier: vi.fn(),
        getMemberName: vi.fn(id => 'Member ' + id),
    })
}));

vi.mock('../../src/composables/useFinancialCalculations', () => ({
    useFinancialCalculations: () => ({
        getStatusText: vi.fn().mockReturnValue('Mock Status'),
    })
}));

vi.mock('../../src/composables/useAuth', () => ({
    useAuth: () => ({
        isAdmin: ref(true),
        isAccountant: ref(true),
    })
}));

describe('Financial Sync E2E Flows', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('T035: Should show consistency check results and trigger reconcile', async () => {
        // Mount with activeTab = 'sync'
        const wrapper = mount(FinanceView, {
            props: { initialTab: 'sync' }
        });
        
        await wrapper.vm.$nextTick();

        // Should see the table with results from the mock
        const tableHtml = wrapper.html();
        expect(tableHtml).toContain('Drifted Member');
        
        // Find and click run check
        const runBtn = wrapper.find('#btn-run-consistency-check');
        expect(runBtn.exists()).toBe(true);
        await runBtn.trigger('click');
        expect(mockRunConsistencyCheck).toHaveBeenCalled();

        // Find and click reconcile all
        const reconcileAllBtn = wrapper.find('#btn-reconcile-all');
        expect(reconcileAllBtn.exists()).toBe(true);
        await reconcileAllBtn.trigger('click');

        // It should ask for confirmation, which we mocked to return true
        expect(mockShowConfirm).toHaveBeenCalled();
        
        // Then it should call reconcileAllMembers
        // Wait for promises to resolve
        await new Promise(resolve => setTimeout(resolve, 0));
        
        expect(mockReconcileAllMembers).toHaveBeenCalled();
        expect(mockShowAlert).toHaveBeenCalledWith(expect.stringContaining('Đã đồng bộ thành công'));
    });
});
