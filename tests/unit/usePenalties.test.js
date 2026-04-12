import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePenalties } from '@/composables/usePenalties';
import { ref } from 'vue';

// Mock dependencies
const mockSettings = ref({
    penalties: {
        absent: 50000,
        late: {
            lessThan10Min: 10000,
            lessThan20Min: 20000,
            moreThan20Min: 50000
        }
    }
});

vi.mock('@/composables/useAppState', () => ({
    useAppState: () => ({
        settings: mockSettings
    })
}));

describe('usePenalties Composable', () => {
    const { absentPenalty, getLatePenalty, calculatePenalty } = usePenalties();

    it('should return correct absent penalty from settings', () => {
        expect(absentPenalty.value).toBe(50000);
        
        // Update settings
        mockSettings.value.penalties.absent = 60000;
        expect(absentPenalty.value).toBe(60000);
    });

    it('should calculate late penalty correctly based on minutes', () => {
        expect(getLatePenalty(5)).toBe(10000);
        expect(getLatePenalty(15)).toBe(20000);
        expect(getLatePenalty(25)).toBe(50000);
    });

    it('should calculate penalty for a record', () => {
        // Absent
        expect(calculatePenalty({ status: 'absent' })).toBe(60000); // Updated value from previous test
        
        // Present, not late
        expect(calculatePenalty({ status: 'present', isLate: false })).toBe(0);
        
        // Late
        expect(calculatePenalty({ status: 'present', isLate: true, lateMinutes: 15 })).toBe(20000);
    });

    it('should handle missing settings with defaults', () => {
        mockSettings.value = {}; // Clear settings
        
        expect(absentPenalty.value).toBe(50000); // Default
        expect(getLatePenalty(5)).toBe(10000); // Default
    });
});
