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

        it('should process RSVP correctly and update rsvp array', async () => {
            state.matches.value = [{ id: 'm1', date: '2024-05-01', rsvp: [] }];
            
            // Mock window.fetch since rsvpMatch calls sendMessengerNotification which uses fetch
            global.fetch = vi.fn(() => Promise.resolve({ ok: true }));

            await state.rsvpMatch('m1', 123, 'confirmed');

            expect(state.matches.value[0].rsvp.length).toBe(1);
            expect(state.matches.value[0].rsvp[0].memberId).toBe(123);
            expect(state.matches.value[0].rsvp[0].status).toBe('confirmed');
            
            // Allow changing rsvp status
            await state.rsvpMatch('m1', 123, 'declined');
            expect(state.matches.value[0].rsvp.length).toBe(1);
            expect(state.matches.value[0].rsvp[0].status).toBe('declined');
        });

        it('should reset notification flags when match date or time is changed', async () => {
            state.members.value = [{ id: 1, name: 'A' }];
            state.matches.value = [{
                id: 'm1', 
                date: '2024-05-01', 
                startTime: '16:00',
                notified1h: true, 
                notified30m: true,
                attendance: [{ memberId: 1, status: 'present' }]
            }];

            // Edit match with same time - flags should remain true
            await state.saveMatch({
                id: 'm1',
                date: '2024-05-01',
                startTime: '16:00',
                attendanceIds: [1]
            });
            expect(state.matches.value[0].notified1h).toBe(true);
            expect(state.matches.value[0].notified30m).toBe(true);

            // Edit match with new time - flags should reset to false
            await state.saveMatch({
                id: 'm1',
                date: '2024-05-01',
                startTime: '17:00',
                attendanceIds: [1]
            });
            expect(state.matches.value[0].notified1h).toBe(false);
            expect(state.matches.value[0].notified30m).toBe(false);
        });
    });

    describe('UI Alerts & Confirmations (Popups)', () => {
        it('should trigger alert via toast', async () => {
            // showAlert calls useToast internally. Since useToast isn't mocked globally,
            // we will just verify it doesn't throw and resolves a promise.
            // A true unit test would mock useToast.
            await expect(state.showAlert('Test Alert Message', 'Test Title')).resolves.toBeUndefined();
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
