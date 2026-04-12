import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useBreakpoints } from '@/composables/useBreakpoints';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

describe('useBreakpoints Composable', () => {
    // Helper component to test life-cycle hooks
    const TestComponent = defineComponent({
        setup() {
            return useBreakpoints();
        },
        template: '<div></div>'
    });

    let originalInnerWidth;

    beforeEach(() => {
        originalInnerWidth = window.innerWidth;
    });

    afterEach(() => {
        window.innerWidth = originalInnerWidth;
        vi.restoreAllMocks();
    });

    it('should initialize with current window width', () => {
        window.innerWidth = 500;
        const wrapper = mount(TestComponent);
        expect(wrapper.vm.windowWidth).toBe(500);
        expect(wrapper.vm.isMobile).toBe(true);
        expect(wrapper.vm.isDesktop).toBe(false);
    });

    it('should detect desktop resolution', () => {
        window.innerWidth = 1200;
        const wrapper = mount(TestComponent);
        expect(wrapper.vm.isDesktop).toBe(true);
        expect(wrapper.vm.isMobile).toBe(false);
    });

    it('should update reactive state on window resize', async () => {
        window.innerWidth = 1024; // Tablet boundary
        const wrapper = mount(TestComponent);
        expect(wrapper.vm.isTablet).toBe(true);

        // Resize to Mobile
        window.innerWidth = 500;
        window.dispatchEvent(new Event('resize'));

        expect(wrapper.vm.windowWidth).toBe(500);
        expect(wrapper.vm.isMobile).toBe(true);
        expect(wrapper.vm.isTablet).toBe(false);
    });
});
