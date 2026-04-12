import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import DashboardView from '@/views/DashboardView.vue';
import { ref } from 'vue';

// Mock app data
const mockStats = ref({ 
    balance: 5000000, 
    totalIncome: 10000000, 
    totalExpense: 5000000,
    totalMembers: 20,
    attendanceRate: 85,
    totalMatches: 10
});

vi.mock('@/composables/useAppState', () => ({
    useAppState: () => ({
        stats: mockStats,
        members: ref([]),
        sortedMatches: ref([]),
        settings: ref({ hallOfFame: { awards: {} } }),
        saveMatch: vi.fn(),
        updateManualAttendanceRequest: vi.fn(),
        pendingAttendances: ref([]),
    })
}));

vi.mock('@/composables/useAuth', () => ({
    useAuth: () => ({
        isAdmin: ref(true),
        isGuest: ref(false),
        guestMemberId: ref(null)
    })
}));

vi.mock('@/composables/useBreakpoints', () => ({
    useBreakpoints: () => ({
        isMobile: ref(false)
    })
}));

vi.mock('@/composables/usePenalties', () => ({
    usePenalties: () => ({
        getLatePenalty: vi.fn(() => 50000)
    })
}));

describe('DashboardView.vue', () => {
    it('should display key statistics cards correctly', () => {
        const wrapper = mount(DashboardView);
        expect(wrapper.text()).toContain('5.000.000');
        expect(wrapper.text()).toContain('85%');
        expect(wrapper.text()).toContain('20');
    });

    it('should show management buttons if admin', () => {
        const wrapper = mount(DashboardView);
        expect(wrapper.text()).toContain('Ghi Điểm Danh');
        expect(wrapper.text()).toContain('Quản Lý Thành Viên');
    });
});
