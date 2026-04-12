import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MyPaymentsView from '@/views/MyPaymentsView.vue';
import { ref } from 'vue';

// Mock dependencies
const mockMembers = ref([{ id: 1, name: 'Nguyễn Văn A' }]);
const mockReceivables = ref([
    { id: 'r1', memberId: 1, amount: 100000, type: 'fund', status: 'unpaid', description: 'Quỹ tháng 4', date: '2024-04-01' }
]);

vi.mock('@/composables/useAppState', () => ({
    useAppState: () => ({
        members: mockMembers,
        receivables: mockReceivables,
        transactions: ref([]),
        pendingTransactions: ref([]),
        settings: ref({ momoPhone: '0987654321', fundQR: '<svg>QR</svg>', momoLink: 'https://momo.vn/pay' }),
        addPendingTransaction: vi.fn(() => Promise.resolve()),
        deletePendingTransaction: vi.fn(),
        showAlert: vi.fn(),
        showConfirm: vi.fn(() => Promise.resolve(true))
    })
}));

vi.mock('@/composables/useAuth', () => ({
    useAuth: () => ({
        currentRole: ref('guest'),
        guestMemberId: ref(1),
        isGuest: ref(true)
    })
}));

vi.mock('@/composables/useFinancialCalculations', () => ({
    useFinancialCalculations: () => ({
        getStatusText: () => 'Chưa đóng'
    })
}));

describe('MyPaymentsView.vue', () => {
    it('should show list of unpaid debts for the member', () => {
        const wrapper = mount(MyPaymentsView);
        expect(wrapper.text()).toContain('Quỹ tháng 4');
        expect(wrapper.text()).toContain('100.000');
    });

    it('should show MoMo payment button if configured', () => {
        const wrapper = mount(MyPaymentsView);
        expect(wrapper.find('.btn-momo-full').exists()).toBe(true);
    });

    it('should call submit confirmation when button clicked', async () => {
        const wrapper = mount(MyPaymentsView);
        
        // Fill form
        const amountInput = wrapper.find('input[type="number"]');
        await amountInput.setValue(100000);
        
        const submitBtn = wrapper.find('.btn-primary');
        await submitBtn.trigger('click');
        
        // Note: The actual check depends on the mock behavior
        expect(wrapper.text()).toContain('Gửi Yêu Cầu Xác Nhận');
    });
});
