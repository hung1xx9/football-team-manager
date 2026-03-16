import { computed } from 'vue';
import { useAppState } from './useAppState';

export const usePenalties = () => {
    const { settings } = useAppState();

    const absentPenalty = computed(() => {
        return settings.value?.penalties?.absent || 50000;
    });

    const getLatePenalty = (minutes) => {
        const latePenalties = settings.value?.penalties?.late || {
            lessThan10Min: 10000,
            lessThan20Min: 20000,
            moreThan20Min: 50000
        };

        if (minutes < 10) return latePenalties.lessThan10Min || 10000;
        if (minutes < 20) return latePenalties.lessThan20Min || 20000;
        return latePenalties.moreThan20Min || 50000;
    };

    const calculatePenalty = (record) => {
        if (!record) return 0;
        
        if (record.status === 'absent' || record.status === 'ABSENT') {
            return absentPenalty.value;
        }
        
        if (record.isLate && record.lateMinutes !== undefined) {
            return getLatePenalty(record.lateMinutes);
        }
        
        return 0;
    };

    return {
        absentPenalty,
        getLatePenalty,
        calculatePenalty
    };
};
