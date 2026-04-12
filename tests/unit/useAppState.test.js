import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAppState } from '@/composables/useAppState';
import { nextTick } from 'vue';

// Mock Firebase dependency
vi.mock('@/composables/useFirebase', () => ({
    useFirebase: () => ({
        uploadData: vi.fn(),
        uploadSingleItem: vi.fn(() => Promise.resolve()),
        deleteSingleItem: vi.fn(() => Promise.resolve()),
        isSignedIn: { value: false },
        approvePendingTransactionAtomic: vi.fn(),
        approveAttendanceAtomic: vi.fn()
    })
}));

describe('useAppState Composable', () => {
    const state = useAppState();

    beforeEach(() => {
        localStorage.clear();
        state.members.value = [];
        state.matches.value = [];
        state.transactions.value = [];
        state.receivables.value = [];
        state.isInitialized.value = false;
    });

    describe('Initialization & Loading', () => {
        it('should seed initial members if storage is empty', () => {
            state.loadData();
            expect(state.members.value.length).toBeGreaterThan(0);
            expect(state.members.value[0].name).toBe('Nguyễn Văn A');
        });

        it('should load existing data from localStorage', () => {
            const mockData = [{ id: 999, name: 'Existing Member' }];
            localStorage.setItem('members', JSON.stringify(mockData));
            
            state.loadData();
            expect(state.members.value).toEqual(mockData);
        });
    });

    describe('Member CRUD', () => {
        it('should add a new member', async () => {
            state.loadData();
            const initialCount = state.members.value.length;
            await state.addMember({ name: 'New Player' });
            
            expect(state.members.value.length).toBe(initialCount + 1);
            expect(state.members.value.find(m => m.name === 'New Player')).toBeDefined();
        });

        it('should update an existing member', async () => {
            state.loadData();
            const memberId = state.members.value[0].id;
            await state.updateMember(memberId, { name: 'Updated Name' });
            
            expect(state.members.value[0].name).toBe('Updated Name');
        });

        it('should delete a member', async () => {
            state.loadData();
            const memberId = state.members.value[0].id;
            await state.deleteMember(memberId);
            
            expect(state.members.value.find(m => m.id === memberId)).toBeUndefined();
        });
    });

    describe('Financial Transactions', () => {
        it('should calculate balance correctly from transactions', async () => {
            state.transactions.value = [
                { id: 1, type: 'income', amount: 100000 },
                { id: 2, type: 'expense', amount: 40000 }
            ];
            
            expect(state.stats.value.balance).toBe(60000);
        });

        it('should automatically clear unpaid receivables when an income transaction is added', async () => {
            // Setup a member and an unpaid debt
            const mId = 123;
            state.members.value = [{ id: mId, name: 'Debtor' }];
            state.receivables.value = [
                { id: 'r1', memberId: mId, amount: 50000, type: 'fine', status: 'unpaid', date: '2024-01-01' }
            ];

            // Add payment
            await state.addTransaction({
                type: 'income',
                amount: 50000,
                memberId: mId,
                category: 'fine'
            });

            const receivable = state.receivables.value.find(r => r.id === 'r1');
            expect(receivable.status).toBe('paid');
        });
    });

    describe('Match & Attendance', () => {
        it('should create a new match with attendance records for all members', async () => {
            state.members.value = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
            await state.saveMatch({
                date: '2024-05-01',
                opponent: 'Enemy FC',
                attendanceIds: [1] // member 1 present, 2 absent
            });

            expect(state.matches.value.length).toBe(1);
            const match = state.matches.value[0];
            expect(match.attendance.find(a => a.memberId === 1).status).toBe('present');
            expect(match.attendance.find(a => a.memberId === 2).status).toBe('absent');
        });

        it('should finalize a match and create penalty records', async () => {
            state.matches.value = [{ id: 'm1', date: '2024-05-01', finalized: false }];
            const penalties = [
                { memberId: 1, amount: 50000, type: 'fine', description: 'Absent' }
            ];

            await state.finalizeMatch('m1', penalties);
            
            expect(state.matches.value[0].finalized).toBe(true);
            expect(state.receivables.value.length).toBe(1);
            expect(state.receivables.value[0].amount).toBe(50000);
        });
    });

    describe('UI Alerts & Confirmations (Popups)', () => {
        it('should trigger alert with message and title', async () => {
            state.showAlert('Test Alert Message', 'Test Title');
            expect(state.dialog.value.show).toBe(true);
            expect(state.dialog.value.type).toBe('alert');
            expect(state.dialog.value.message).toBe('Test Alert Message');
            expect(state.dialog.value.title).toBe('Test Title');
        });

        it('should handle confirmations correctly', async () => {
            const confirmPromise = state.showConfirm('Confirm this?', 'Confirm Title');
            expect(state.dialog.value.show).toBe(true);
            expect(state.dialog.value.type).toBe('confirm');
            
            // Simulate user clicking "OK" (true) or "Cancel" (false)
            state.dialog.value.resolve(true);
            const result = await confirmPromise;
            expect(result).toBe(true);
        });

        it('should handle prompts with default value', async () => {
            const promptPromise = state.showPrompt('Enter color:', 'Prompt Title', 'Blue');
            expect(state.dialog.value.show).toBe(true);
            expect(state.dialog.value.type).toBe('prompt');
            expect(state.dialog.value.inputValue).toBe('Blue');
            
            // Simulate user entering new value and clicking OK
            state.dialog.value.resolve('Red');
            const result = await promptPromise;
            expect(result).toBe('Red');
        });
    });
});
