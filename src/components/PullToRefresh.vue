<template>
  <div ref="container" class="relative w-full overflow-hidden" :class="{ 'pulling-active': isPulling }">
    <!-- Pull to Refresh Indicator -->
    <div
      class="absolute top-0 left-0 w-full flex justify-center items-end overflow-hidden transition-all duration-300 z-50 bg-base-200/50 backdrop-blur-sm"
      :style="{ height: `${pullDistance}px`, opacity: pullDistance > 0 ? 1 : 0 }"
    >
      <div class="mb-4 text-primary">
        <span v-if="isRefreshing" class="loading loading-spinner loading-md"></span>
        <div v-else-if="pullDistance >= 60" class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <div v-else class="flex flex-col items-center opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Content Slot -->
    <div
      class="transition-transform duration-300 w-full"
      :style="{ transform: `translateY(${pullDistance}px)` }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePullToRefresh } from '../composables/usePullToRefresh'

const props = defineProps({
  onRefresh: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['refresh'])

const container = ref(null)

const handleRefresh = async () => {
  await props.onRefresh()
}

const { isPulling, isRefreshing, pullDistance } = usePullToRefresh(container, handleRefresh)
</script>

<style scoped>
/* Optional: Prevent text selection while pulling */
.pulling-active {
  user-select: none;
  -webkit-user-select: none;
}
</style>
