import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLeaveRequests } from '@/composables/useLeaveRequests';

describe('useLeaveRequests Composable', () => {
    // We get the state and actions from the composable
    const { leaveRequests, createLeaveRequest, approveLeaveRequest, hasApprovedLeave } = useLeaveRequests();

    beforeEach(() => {
        // Since it's a global state in the composable, we need to manual reset
        leaveRequests.value = [];
        vi.clearAllMocks();
    });

    it('should create a leave request', async () => {
        await createLeaveRequest({ 
            memberId: 1, 
            memberName: 'Tester',
            leaveDate: '2024-05-01', 
            reason: 'Sick', 
            type: 'leave' 
        });
        
        expect(leaveRequests.value.length).toBe(1);
        expect(leaveRequests.value[0].status).toBe('pending');
        expect(leaveRequests.value[0].memberName).toBe('Tester');
    });

    it('should approve a leave request', async () => {
        const id = 12345;
        leaveRequests.value = [{ 
            id, 
            memberId: 1, 
            leaveDate: '2024-05-01', 
            status: 'pending',
            reason: 'Test'
        }];
        
        await approveLeaveRequest(id, 'Approved by Admin');
        
        expect(leaveRequests.value[0].status).toBe('approved');
        expect(leaveRequests.value[0].adminNote).toBe('Approved by Admin');
    });

    it('should check if a member has approved leave correctly', () => {
        const date = '2024-05-01';
        leaveRequests.value = [{ 
            id: 1, 
            memberId: 1, 
            leaveDate: date, 
            status: 'approved', 
            type: 'leave' 
        }];
        
        expect(hasApprovedLeave(1, date)).toBe(true);
        expect(hasApprovedLeave(1, '2024-05-02')).toBe(false);
    });
});
