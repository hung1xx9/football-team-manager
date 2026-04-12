import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LeaveRequestView from '@/views/LeaveRequestView.vue';
import { ref, nextTick } from 'vue';

// Mock app settings and state
const mockMembers = ref([{ id: 1, name: 'Nguyễn Văn A' }]);
const mockMatches = ref([{ id: 'm1', opponent: 'Enemy FC', date: '2024-05-01', startTime: '18:00', location: 'Sân A' }]);
const mockRequests = ref([]);

const mockCreateLeaveRequest = vi.fn(() => Promise.resolve());
const mockGetMemberLeaveRequests = vi.fn(() => mockRequests.value);
const mockShowAlert = vi.fn(() => Promise.resolve());

vi.mock('@/composables/useAppState', () => ({
    useAppState: () => ({
        members: mockMembers,
        matches: mockMatches,
        createLeaveRequest: mockCreateLeaveRequest,
        getMemberLeaveRequests: mockGetMemberLeaveRequests,
        showAlert: mockShowAlert,
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

describe('LeaveRequestView.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockRequests.value = [];
    });

    it('should show view correctly', () => {
        const wrapper = mount(LeaveRequestView);
        expect(wrapper.text()).toContain('Xin Nghỉ/ Muộn');
    });

    it('should submit leave request correctly', async () => {
        const wrapper = mount(LeaveRequestView);
        
        // Open modal
        const openBtn = wrapper.find('.btn-hero');
        await openBtn.trigger('click');
        
        // Modal is in transition, wait for next tick
        await nextTick();
        
        // Find inputs in the modal content
        const modal = wrapper.get('.modal-content');
        
        // Set date
        const dateInput = modal.find('input[type="date"]');
        await dateInput.setValue('2024-05-01');

        // Set reason
        const reasonInput = modal.find('textarea');
        await reasonInput.setValue('Em bận việc ạ');
        
        // Submit button inside modal
        const submitBtn = modal.find('.btn-hero-primary');
        await submitBtn.trigger('click');
        
        // Verify call
        expect(mockCreateLeaveRequest).toHaveBeenCalled();
        expect(mockShowAlert).toHaveBeenCalledWith(expect.stringContaining('thành công'));
    });
});
