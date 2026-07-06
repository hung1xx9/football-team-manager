import { ref, onMounted, onUnmounted } from 'vue'

export function usePullToRefresh(containerRef, onRefresh) {
  const isPulling = ref(false)
  const isRefreshing = ref(false)
  const pullDistance = ref(0)
  const threshold = 60
  const maxDistance = 100

  let startY = 0
  let currentY = 0

  const handleTouchStart = (e) => {
    // Only allow pull to refresh if we are at the top of the container/window
    const scrollTop = containerRef.value?.scrollTop || window.scrollY || 0
    if (scrollTop > 0) return

    if (isRefreshing.value) return

    startY = e.touches[0].clientY
    isPulling.value = true
  }

  const handleTouchMove = (e) => {
    if (!isPulling.value) return

    currentY = e.touches[0].clientY
    const distance = currentY - startY

    // If scrolling up (negative distance) or not reached top, ignore
    if (distance < 0) {
      isPulling.value = false
      return
    }

    // Prevent default scrolling behavior while pulling
    if (e.cancelable) {
      e.preventDefault()
    }

    // Add resistance
    pullDistance.value = Math.min(distance * 0.5, maxDistance)
  }

  const handleTouchEnd = async () => {
    if (!isPulling.value) return
    isPulling.value = false

    if (pullDistance.value >= threshold) {
      isRefreshing.value = true
      pullDistance.value = threshold // keep at threshold while loading
      
      try {
        if (onRefresh) {
          await onRefresh()
        }
      } finally {
        isRefreshing.value = false
        pullDistance.value = 0
      }
    } else {
      pullDistance.value = 0
    }
  }

  onMounted(() => {
    if (containerRef.value) {
      // Passive false to allow preventDefault
      containerRef.value.addEventListener('touchstart', handleTouchStart, { passive: true })
      containerRef.value.addEventListener('touchmove', handleTouchMove, { passive: false })
      containerRef.value.addEventListener('touchend', handleTouchEnd, { passive: true })
    }
  })

  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('touchstart', handleTouchStart)
      containerRef.value.removeEventListener('touchmove', handleTouchMove)
      containerRef.value.removeEventListener('touchend', handleTouchEnd)
    }
  })

  return {
    isPulling,
    isRefreshing,
    pullDistance
  }
}
