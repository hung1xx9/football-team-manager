import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFinancialSync } from '../../src/composables/useFinancialSync';

// Mock dependencies
vi.mock('../../src/composables/useAppState', () => ({
    useAppState: () => ({
        members: {
            value: [
                { id: 1, name: 'Consistent Member', fundPaid: 500000, fines: 100000 },
                { id: 2, name: 'Drifted Member', fundPaid: 300000, fines: 50000 },
                { id: 3, name: 'Zero Tx Member', fundPaid: 100000, fines: 0 }
            ]
        },
        transactions: {
            value: [
                // Transactions for Member 1 (Consistent)
                { id: 101, memberId: 1, type: 'income', category: 'fund', amount: 300000 },
                { id: 102, memberId: 1, type: 'income', category: 'monthly_fund', amount: 200000 },
                { id: 103, memberId: 1, type: 'income', category: 'fine', amount: 100000 },
                
                // Transactions for Member 2 (Drifted: expected fund = 400k, actual = 300k. Expected fines = 150k, actual = 50k)
                { id: 104, memberId: 2, type: 'income', category: 'fund', amount: 400000 },
                { id: 105, memberId: 2, type: 'income', category: 'pitch_fee', amount: 150000 },
                
                // No transactions for Member 3
            ]
        },
        receivables: { value: [] }
    })
}));

vi.mock('../../src/composables/useFirebase', () => ({
    useFirebase: () => ({
        postAttendanceFeeAtomic: vi.fn(),
        voidMatchFeesAtomic: vi.fn(),
        reconcileMemberAtomic: vi.fn(),
        getMemberAuditLogFromFirestore: vi.fn()
    })
}));

vi.mock('../../src/composables/useToast', () => ({
    useToast: () => ({
        showToast: vi.fn()
    })
}));

describe('useFinancialSync', () => {
    let sync;

    beforeEach(() => {
        vi.clearAllMocks();
        sync = useFinancialSync();
    });

    describe('runConsistencyCheck', () => {
        it('should correctly identify consistent and inconsistent members', () => {
            const results = sync.runConsistencyCheck();
            
            expect(results.length).toBe(3);
            
            // Member 1 (Consistent)
            const m1 = results.find(r => r.memberId === 1);
            expect(m1.expectedFundPaid).toBe(500000);
            expect(m1.actualFundPaid).toBe(500000);
            expect(m1.expectedFines).toBe(100000);
            expect(m1.actualFines).toBe(100000);
            expect(m1.fundDrift).toBe(0);
            expect(m1.finesDrift).toBe(0);
            expect(m1.isConsistent).toBe(true);

            // Member 2 (Drifted)
            const m2 = results.find(r => r.memberId === 2);
            expect(m2.expectedFundPaid).toBe(400000);
            expect(m2.actualFundPaid).toBe(300000);
            expect(m2.fundDrift).toBe(-100000); // actual - expected
            expect(m2.expectedFines).toBe(150000);
            expect(m2.actualFines).toBe(50000);
            expect(m2.finesDrift).toBe(-100000);
            expect(m2.isConsistent).toBe(false);

            // Member 3 (Zero Txs but has actual balance)
            const m3 = results.find(r => r.memberId === 3);
            expect(m3.expectedFundPaid).toBe(0);
            expect(m3.actualFundPaid).toBe(100000);
            expect(m3.fundDrift).toBe(100000);
            expect(m3.isConsistent).toBe(false);
        });

        it('should correctly update inconsistentCount', () => {
            sync.runConsistencyCheck();
            expect(sync.inconsistentCount.value).toBe(2); // Members 2 and 3
        });
    });
});
