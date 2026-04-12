import { describe, it, expect, vi } from 'vitest';
import { useMoMo } from '@/composables/useMoMo';
import { ref, computed } from 'vue';

vi.mock('@/composables/useAppState', () => {
    return {
        useAppState: () => ({
            settings: ref({ momoPhone: '0987654321' }),
            members: ref([{ id: 1, name: 'Nguyễn Văn A' }]),
            addTransaction: vi.fn(),
            addPendingTransaction: vi.fn()
        })
    };
});

vi.mock('../utils/momoService', () => ({
    momoService: {
        generatePersonalQRLink: vi.fn(() => 'momo-qr-data')
    }
}));

describe('useMoMo Composable', () => {
    it('should detect if personal MoMo is configured', () => {
        const { isPersonalConfigured } = useMoMo();
        expect(isPersonalConfigured.value).toBe(true);
    });

    it('should create personal payment link', () => {
        const { createPersonalPayment } = useMoMo();
        const payment = createPersonalPayment({
            memberName: 'Tester',
            amount: 50000
        });
        expect(payment.qrCodeUrl).toBeDefined();
        expect(payment.amount).toBe(50000);
    });
});
