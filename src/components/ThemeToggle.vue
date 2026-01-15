<template>
    <button 
        class="theme-toggle" 
        @click="toggleTheme"
        :title="isDark ? 'Chuyển sang Light Mode' : 'Chuyển sang Dark Mode'"
        aria-label="Toggle theme">
        <div class="toggle-track" :class="{ dark: isDark }">
            <div class="toggle-thumb">
                <svg v-if="isDark" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
                <svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
            </div>
        </div>
    </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(true);

const toggleTheme = () => {
    isDark.value = !isDark.value;
    const theme = isDark.value ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

onMounted(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    isDark.value = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
});
</script>

<style scoped>
.theme-toggle {
    position: relative;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    outline: none;
}

.toggle-track {
    width: 60px;
    height: 32px;
    background: var(--bg-tertiary);
    border: 2px solid var(--border-primary);
    border-radius: var(--radius-full);
    position: relative;
    transition: all var(--transition-normal);
    display: flex;
    align-items: center;
    padding: 0 4px;
}

.toggle-track:hover {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 4px var(--bg-hover);
}

.toggle-track.dark {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}

.toggle-thumb {
    width: 24px;
    height: 24px;
    background: var(--gradient-primary);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-normal);
    transform: translateX(0);
    box-shadow: var(--shadow-md);
}

.toggle-track.dark .toggle-thumb {
    transform: translateX(28px);
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.icon {
    width: 14px;
    height: 14px;
    color: white;
    animation: iconRotate 0.3s ease-in-out;
}

@keyframes iconRotate {
    0% {
        transform: rotate(-180deg) scale(0);
    }
    100% {
        transform: rotate(0deg) scale(1);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .toggle-track {
        width: 52px;
        height: 28px;
    }
    
    .toggle-thumb {
        width: 20px;
        height: 20px;
    }
    
    .toggle-track.dark .toggle-thumb {
        transform: translateX(24px);
    }
    
    .icon {
        width: 12px;
        height: 12px;
    }
}
</style>
