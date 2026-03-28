import { ref, onMounted, onUnmounted } from 'vue';

export function useBreakpoints() {
  const windowWidth = ref(window.innerWidth);
  const isMobile = ref(window.innerWidth <= 768);
  const isTablet = ref(window.innerWidth > 768 && window.innerWidth <= 1024);
  const isDesktop = ref(window.innerWidth > 1024);

  const onResize = () => {
    windowWidth.value = window.innerWidth;
    isMobile.value = window.innerWidth <= 768;
    isTablet.value = window.innerWidth > 768 && window.innerWidth <= 1024;
    isDesktop.value = window.innerWidth > 1024;
  };

  onMounted(() => {
    window.addEventListener('resize', onResize);
    onResize(); // Initial check
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  return {
    windowWidth,
    isMobile,
    isTablet,
    isDesktop
  };
}
