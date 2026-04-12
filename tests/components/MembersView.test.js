import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MembersView from '@/views/MembersView.vue';
import { ref } from 'vue';

// Define mocks OUTSIDE to maintain reference
const mockShowConfirm = vi.fn(() => Promise.resolve(true));
const mockDeleteMember = vi.fn();
const mockMembers = ref([
    { id: 1, name: 'Nguyễn Văn A', phone: '0123456789', paymentType: 'monthly', isActive: true, shirtNumber: 10 }
]);

vi.mock('@/composables/useAppState', () => ({
    useAppState: () => ({
        members: mockMembers,
        contributionTiers: ref([{ id: 1, name: 'VIP', icon: '⭐', monthlyFee: 200000, color: '#ffd700' }]),
        receivables: ref([]),
        getMemberStats: () => ({ attendanceRate: 80 }),
        addMember: vi.fn(),
        updateMember: vi.fn(),
        deleteMember: mockDeleteMember,
        getContributionTier: () => ({ id: 1, name: 'VIP', icon: '⭐', color: '#ffd700' }),
        showAlert: vi.fn(),
        showConfirm: mockShowConfirm
    })
}));

vi.mock('@/composables/useAuth', () => ({
    useAuth: () => ({
        isAdmin: ref(true),
        permissions: ref({ canAddMember: true })
    })
}));

vi.mock('@/composables/useBreakpoints', () => ({
    useBreakpoints: () => ({ isMobile: ref(false) })
}));

vi.mock('@/composables/useEscapeClose', () => ({
    useEscapeClose: vi.fn()
}));

describe('MembersView.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should display list of members correctly', () => {
        const wrapper = mount(MembersView);
        expect(wrapper.text()).toContain('Nguyễn Văn A');
    });

    it('should show confirmation warning before deleting a member', async () => {
        const wrapper = mount(MembersView);
        const deleteBtn = wrapper.find('.btn-icon-danger');
        
        await deleteBtn.trigger('click');
        
        expect(mockShowConfirm).toHaveBeenCalled();
        expect(mockDeleteMember).toHaveBeenCalled();
    });
});
