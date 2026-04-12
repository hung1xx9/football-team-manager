import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MatchesView from '@/views/MatchesView.vue';
import { ref } from 'vue';

// Maintain references for mocks
const mockShowConfirm = vi.fn(() => Promise.resolve(true));
const mockDeleteMatch = vi.fn();
const mockMatches = ref([
    { id: 'm1', opponent: 'Enemy FC', date: '2024-05-01', location: 'Sân A', startTime: '18:00', duration: 90, finalized: false, attendance: [] },
    { id: 'm2', opponent: 'Friend FC', date: '2024-04-01', location: 'Sân B', startTime: '19:00', duration: 90, finalized: true, attendance: [] }
]);

vi.mock('@/composables/useAppState', () => ({
    useAppState: () => ({
        sortedMatches: mockMatches,
        matches: mockMatches,
        members: ref([]),
        fixedMatches: ref([]),
        getMemberName: (id) => 'Member ' + id,
        saveMatch: vi.fn(),
        deleteMatch: mockDeleteMatch,
        sendMessengerNotification: vi.fn(),
        showConfirm: mockShowConfirm,
        showAlert: vi.fn()
    })
}));

vi.mock('@/composables/useAuth', () => ({
    useAuth: () => ({
        permissions: ref({ canAddMatch: true, canDeleteMatch: true }),
        isAdmin: ref(true)
    })
}));

vi.mock('@/composables/useBreakpoints', () => ({
    useBreakpoints: () => ({ isMobile: ref(false) })
}));

vi.mock('@/composables/useEscapeClose', () => ({
    useEscapeClose: vi.fn()
}));

// Mock IntersectionObserver for infinite scroll tracking
global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
};

// Mock vue-router
vi.mock('vue-router', () => ({
    useRouter: () => ({ push: vi.fn() })
}));

describe('MatchesView.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should show list of scheduled matches', () => {
        const wrapper = mount(MatchesView);
        expect(wrapper.text()).toContain('Enemy FC');
        expect(wrapper.text()).toContain('Sân A');
    });

    it('should show confirmation warning before deleting a match', async () => {
        const wrapper = mount(MatchesView);
        const deleteBtn = wrapper.find('.btn-delete-action');
        
        await deleteBtn.trigger('click');
        
        expect(mockShowConfirm).toHaveBeenCalledWith(expect.stringContaining('xóa trận đấu này'));
        expect(mockDeleteMatch).toHaveBeenCalledWith('m1');
    });
});
