<template>
  <div class="base-select" ref="selectRef" v-bind="$attrs">
    <div 
      class="base-select-trigger" 
      :class="{ 'open': isOpen, 'disabled': disabled }"
      @click="toggleDropdown"
    >
      <div class="selected-value">
        <slot name="selected" :selectedOption="selectedOption">
          <span v-if="selectedOption">{{ selectedOption.label }}</span>
          <span v-else class="placeholder">{{ placeholder }}</span>
        </slot>
      </div>
      <div class="base-select-arrow" :class="{ 'rotated': isOpen }">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <!-- Teleport dropdown to body to avoid container clipping -->
    <Teleport to="body">
      <div 
        v-if="isOpen" 
        class="combobox-dropdown" 
        :class="{ 'open-up': dropDirection === 'up' }"
        :style="dropdownStyle"
        ref="dropdownRef"
      >
        <div 
          v-for="option in options" 
          :key="option.value" 
          class="combobox-item"
          :class="{ 'selected': modelValue === option.value, 'disabled': option.disabled }"
          @click="selectOption(option)"
        >
          <div class="item-content">
            <slot name="option" :option="option">
               <span>{{ option.label }}</span>
            </slot>
          </div>
          <svg v-if="modelValue === option.value" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div v-if="options.length === 0" class="empty-state">
          {{ emptyText }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
    inheritAttrs: false
}
</script>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number, Object], default: null },
  options: { type: Array, required: true },
  placeholder: { type: String, default: 'Chọn...' },
  disabled: { type: Boolean, default: false },
  emptyText: { type: String, default: 'Không có dữ liệu' }
});

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const selectRef = ref(null);
const dropdownRef = ref(null);
const dropDirection = ref('down');
const dropdownPosition = ref({ top: 0, left: 0, width: 0 });

const selectedOption = computed(() => {
  if (props.modelValue && typeof props.modelValue === 'object') {
     return props.options.find(opt => {
        if (opt.value && typeof opt.value === 'object') {
           return opt.value.id === props.modelValue.id;
        }
        return opt.value === props.modelValue;
     }) || null;
  }
  return props.options.find(opt => opt.value === props.modelValue) || null;
});

const dropdownStyle = computed(() => ({
  position: 'fixed',
  top: dropDirection.value === 'down' ? `${dropdownPosition.value.top}px` : 'auto',
  bottom: dropDirection.value === 'up' ? `${window.innerHeight - dropdownPosition.value.bottom + 48 + 8}px` : 'auto',
  left: `${dropdownPosition.value.left}px`,
  width: `${dropdownPosition.value.width}px`,
  zIndex: 9999
}));

const updatePosition = () => {
  if (!selectRef.value) return;
  const rect = selectRef.value.getBoundingClientRect();
  dropdownPosition.value = {
    top: rect.bottom + 8,
    left: rect.left,
    width: rect.width,
    bottom: rect.bottom
  };

  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  
  if (spaceBelow < 300 && spaceAbove > 300) {
    dropDirection.value = 'up';
  } else {
    dropDirection.value = 'down';
  }
};

const toggleDropdown = async () => {
  if (props.disabled) return;
  
  if (!isOpen.value) {
    updatePosition();
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', updatePosition);
  } else {
    window.removeEventListener('scroll', close, true);
    window.removeEventListener('resize', updatePosition);
  }
  
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  if (option.disabled) return;
  emit('update:modelValue', option.value);
  emit('change', option.value);
  isOpen.value = false;
  cleanupListeners();
};

const cleanupListeners = () => {
  window.removeEventListener('scroll', close, true);
  window.removeEventListener('resize', updatePosition);
};

const close = (e) => {
  if (!isOpen.value) return;
  
  // Check if click is outside both the trigger AND the teleported dropdown
  const isOutsideTrigger = selectRef.value && !selectRef.value.contains(e.target);
  const isOutsideDropdown = dropdownRef.value && !dropdownRef.value.contains(e.target);
  
  if (isOutsideTrigger && isOutsideDropdown) {
    isOpen.value = false;
    cleanupListeners();
  }
};

onMounted(() => {
  window.addEventListener('mousedown', close);
});

onUnmounted(() => {
  window.removeEventListener('mousedown', close);
  window.removeEventListener('scroll', close, true);
  window.removeEventListener('resize', updatePosition);
});
</script>

<style scoped>
.base-select {
  position: relative;
  display: block;
  width: 100%;
}

.base-select-trigger {
  width: 100%;
  height: 48px;
  background: var(--bg-tertiary);
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  color: var(--text-primary);
  user-select: none;
  font-family: inherit;
  box-sizing: border-box;
}

.base-select-trigger:hover:not(.disabled) {
  border-color: var(--border-focus, var(--primary-400));
  background: var(--bg-hover);
}

.base-select-trigger.open {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 4px var(--bg-active), var(--shadow-glow);
  background: var(--bg-elevated);
}

.base-select-trigger.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.selected-value {
  flex: 1;
  font-size: 0.9375rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

.placeholder {
  color: var(--text-muted);
  opacity: 0.7;
}

.base-select-arrow {
  width: 20px;
  height: 20px;
  color: var(--primary-400);
  transition: transform var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--spacing-sm);
  flex-shrink: 0;
}

.base-select-arrow.rotated {
  transform: rotate(180deg);
}

.base-select-arrow svg {
  width: 16px;
  height: 16px;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: var(--primary-400);
  margin-left: var(--spacing-md);
  flex-shrink: 0;
}

.empty-state {
  padding: var(--spacing-lg);
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
}

.item-content {
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
}

.item-content span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
