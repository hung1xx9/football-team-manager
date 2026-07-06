import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuth, ROLES } from '@/composables/useAuth';

describe('useAuth Composable', () => {
    const { currentRole, setRole, logout, isAdmin, isGuest, checkPermission } = useAuth();

    beforeEach(() => {
        logout();
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('should initialize with no role', () => {
        expect(currentRole.value).toBeNull();
    });

    it('should set admin role correctly', () => {
        setRole(ROLES.ADMIN);
        expect(currentRole.value).toBe(ROLES.ADMIN);
        expect(isAdmin.value).toBe(true);
        expect(localStorage.getItem('user_role')).toBe(ROLES.ADMIN);
    });

    it('should set guest role with member ID', () => {
        const memberId = 123;
        setRole(ROLES.GUEST, memberId);
        expect(currentRole.value).toBe(ROLES.GUEST);
        expect(isGuest.value).toBe(true);
        expect(localStorage.getItem('guest_member_id')).toBe('123');
    });

    it('should handle logout', () => {
        setRole(ROLES.ADMIN);
        logout();
        expect(currentRole.value).toBeNull();
        expect(localStorage.getItem('user_role')).toBeNull();
    });

    it('should check permissions correctly for admin', () => {
        setRole(ROLES.ADMIN);
        expect(checkPermission('canViewDashboard')).toBe(true);
        expect(checkPermission('canManageFirebase')).toBe(true);
    });

    it('should check permissions correctly for guest', () => {
        setRole(ROLES.GUEST, 1);
        expect(checkPermission('canViewDashboard')).toBe(true);
        expect(checkPermission('canManageFirebase')).toBe(false);
    });

    it('should set session expiry for Admin', () => {
        setRole(ROLES.ADMIN);
        const expiry = localStorage.getItem('session_expiry');
        expect(expiry).toBeDefined();
        expect(parseInt(expiry, 10)).toBeGreaterThan(new Date().getTime());
    });

    it('should NOT set session expiry for Guest', () => {
        setRole(ROLES.GUEST, 1);
        const expiry = localStorage.getItem('session_expiry');
        expect(expiry).toBeNull(); // Guest session should persist indefinitely
    });
});
