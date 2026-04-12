import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import PendingAttendancesView from '@/views/PendingAttendancesView.vue';
import { ref } from 'vue';

// Mock app settings and state
const mockPending = ref([
    { id: 1, memberId: 123, matchId: 'm1', status: 'pending', submittedAt: '2024-04-06T10:00:00Z', method: 'qr' }
]);
const mockMembers = ref([{ id: 123, name: 'Member 123' }]);
const mockMatches = ref([{ id: 'm1', opponent: 'Enemy FC', date: '2024-04-06' }]);

const mockUpdateAttendance = vi.fn(() => Promise.resolve());
const mockUpdateMatch = vi.fn(() => Promise.resolve());
const mockShowConfirm = vi.fn(() => Promise.resolve(true));

vi.mock('@/composables/useAppState', () => ({
    useAppState: () => ({
        members: mockMembers,
        matches: mockMatches,
        pendingAttendances: mockPending,
        updateManualAttendanceRequest: mockUpdateAttendance,
        updateMatchAttendance: mockUpdateMatch,
        showConfirm: mockShowConfirm,
        showPrompt: vi.fn(() => Promise.resolve('Reason')),
        showAlert: vi.fn(),
        isSyncingLocal: ref(false)
    })
}));

vi.mock('@/composables/useAuth', () => ({
    useAuth: () => ({
        permissions: ref({ canReviewAttendance: true }),
        currentRole: ref('admin')
    })
}));

// Mock vue-router
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: vi.fn()
    })
}));

describe('PendingAttendancesView.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should display list of pending attendances with correct names', () => {
        const wrapper = mount(PendingAttendancesView);
        expect(wrapper.text()).toContain('Member 123');
        expect(wrapper.text()).toContain('Enemy FC');
    });

    it('should show "Duyệt tất cả" button when multiple requests exist', async () => {
        mockPending.value = [
            { id: 1, memberId: 123, matchId: 'm1', status: 'pending', submittedAt: '2024-04-06T10:00:00Z' },
            { id: 2, memberId: 124, matchId: 'm1', status: 'pending', submittedAt: '2024-04-06T10:01:00Z' }
        ];
        const wrapper = mount(PendingAttendancesView);
        expect(wrapper.find('.btn-approve-all').exists()).toBe(true);
        expect(wrapper.text()).toContain('Duyệt tất cả (2)');
    });

    it('should call approve function when "Duyệt" button is clicked', async () => {
        mockPending.value = [{ id: 1, memberId: 123, matchId: 'm1', status: 'pending', submittedAt: '2024-04-06T10:00:00Z' }];
        const wrapper = mount(PendingAttendancesView);
        const approveBtn = wrapper.find('.btn-success');
        
        await approveBtn.trigger('click');
        
        expect(mockShowConfirm).toHaveBeenCalled();
        expect(mockUpdateMatch).toHaveBeenCalled();
        expect(mockUpdateAttendance).toHaveBeenCalled();
    });

    it('should show confirmation warning when "Duyệt tất cả" button is clicked', async () => {
        mockPending.value = [
            { id: 1, memberId: 123, matchId: 'm1', status: 'pending', submittedAt: '2024-04-06T10:00:00Z' },
            { id: 2, memberId: 124, matchId: 'm1', status: 'pending', submittedAt: '2024-04-06T10:01:00Z' }
        ];
        const wrapper = mount(PendingAttendancesView);
        const approveAllBtn = wrapper.find('.btn-approve-all');
        
        await approveAllBtn.trigger('click');
        
        expect(mockShowConfirm).toHaveBeenCalledWith(expect.stringContaining('Phê duyệt tất cả'));
    });
});
