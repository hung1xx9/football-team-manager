<template>
    <div class="member-selector">
        <input 
            type="text" 
            v-model="search" 
            :placeholder="placeholder" 
            @focus="handleFocus" 
            @blur="handleBlur" 
            class="member-search-input"
        >
        <div v-if="showDropdown && filteredMembers.length > 0" class="combobox-dropdown" :class="{ 'open-up': direction === 'up' }">
            <div 
                v-for="member in filteredMembers" 
                :key="member.id" 
                class="combobox-item" 
                :class="{ selected: modelValue === member.id }"
                @mousedown.prevent="selectMember(member)"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>{{ member.name }}</span>
                <svg v-if="modelValue === member.id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="check-icon">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
        </div>
        <div v-else-if="showDropdown && search" class="empty-state-dropdown">
            <p style="margin: 0;">Không tìm thấy thành viên</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
    modelValue: { type: [String, Number], default: '' },
    members: { type: Array, required: true },
    placeholder: { type: String, default: 'Tìm kiếm thành viên...' }
});

const emit = defineEmits(['update:modelValue']);

const search = ref('');
const showDropdown = ref(false);
const direction = ref('down');

const selectedMember = computed(() => props.members.find(m => m.id === props.modelValue));

watch(() => props.modelValue, (val) => {
    if (val && selectedMember.value) {
        search.value = selectedMember.value.name;
    } else {
        search.value = '';
    }
}, { immediate: true });

const filteredMembers = computed(() => {
    if (!search.value) return props.members;
    const q = search.value.toLowerCase();
    return props.members.filter(m => m.name.toLowerCase().includes(q));
});

const selectMember = (member) => {
    emit('update:modelValue', member.id);
    search.value = member.name;
    showDropdown.value = false;
};

const handleFocus = (e) => {
    showDropdown.value = true;
    const rect = e.target.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    direction.value = (spaceBelow < 210 && rect.top > 210) ? 'up' : 'down';
};

const handleBlur = () => {
    setTimeout(() => {
        showDropdown.value = false;
        if (selectedMember.value) {
            search.value = selectedMember.value.name;
        } else {
            search.value = '';
        }
    }, 200);
};
</script>

<style scoped>
.member-selector {
    position: relative;
    width: 100%;
}

.member-search-input {
    width: 100%;
    /* Same as standard input but maybe specific overrides if needed */
}

/* Dropdown list handled by global .combobox-dropdown */

.check-icon {
    margin-left: auto;
    width: 16px !important;
    height: 16px !important;
}

.empty-state-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    text-align: center;
    color: var(--text-muted);
    z-index: 1000;
}
</style>

