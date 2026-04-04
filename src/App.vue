<template>
    <div class="app-container" :class="{ 'simulate-mobile-view': isMobileView && !isMobileDevice, 'mobile-menu-active': mobileMenuOpen }">
        <!-- Sidebar Overlay for Mobile -->
        <div class="sidebar-overlay" :class="{ show: mobileMenuOpen }" @click="toggleMobileMenu"></div>

        <!-- Sidebar for Desktop/Tablet -->
        <Sidebar v-if="currentRole" :class="{ open: mobileMenuOpen }" />

        <!-- Floating Mobile Menu Button -->
        <button v-if="currentRole && (isMobileDevice || isMobileView)" class="btn-mobile-fab" @click="toggleMobileMenu" :class="{ open: mobileMenuOpen }" title="Menu">
            <div class="fab-icon-wrapper">
                <svg v-if="!mobileMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        </button>


        <!-- Main Content -->
        <main class="main-content" v-if="currentRole" :class="{ 'menu-open': mobileMenuOpen }">
            <header class="top-bar">
                <h1 class="page-title">{{ $route.name }}</h1>
                <div class="top-bar-actions">
                    <div class="sync-controls" v-if="isAdmin">
                        <div class="sync-status" :class="[syncStatus, { 'has-update': hasNewUpdate }]">
                            <div class="status-dot-wrapper">
                                <div class="status-dot"></div>
                                <svg class="sync-icon" :class="{ spinning: syncStatus === 'syncing', pulse: hasNewUpdate }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <template v-if="hasNewUpdate">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                    </template>
                                    <template v-else-if="syncStatus === 'syncing'">
                                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                                    </template>
                                    <template v-else-if="syncStatus === 'success'">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </template>
                                    <template v-else-if="syncStatus === 'error'">
                                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                                    </template>
                                    <template v-else>
                                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                                    </template>
                                </svg>
                            </div>
                            <span class="status-text">{{ syncStatusText }}</span>
                        </div>
                        <template v-if="isSignedIn">
                            <button class="btn btn-sm btn-primary" @click="uploadToFirebase" title="Đồng bộ dữ liệu lên Firebase">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                Lên Cloud
                            </button>
                            <button class="btn btn-sm btn-info" @click="downloadFromFirebase" title="Lấy dữ liệu từ Firebase">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Từ Cloud
                            </button>
                        </template>
                    </div>
                    <button class="btn-theme-toggle mobile-view-toggle" v-if="!isMobileDevice" @click="toggleMobileView" :title="isMobileView ? 'Tắt chế độ Mobile' : 'Bật chế độ Mobile'">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-if="isMobileView">
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                            <line x1="12" y1="18" x2="12.01" y2="18"></line>
                        </svg>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-else>
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                    </button>
                    <button class="btn-theme-toggle" @click="toggleTheme" :title="currentTheme === 'dark' ? 'Chuyển sang Giao diện sáng' : 'Chuyển sang Giao diện tối'">
                        <svg v-if="currentTheme === 'dark'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    </button>

                    <button class="btn btn-sm btn-exit" @click="handleLogout">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Thoát
                    </button>
                </div>
            </header>

            <router-view v-slot="{ Component }">
                <transition name="page" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>

        <div class="modal login-modal" v-if="!currentRole" style="display: flex;">
            <div class="modal-content login-modal-content">
                <div class="modal-header login-modal-header">
                    <div class="logo-wrapper">
                        <img src="./assets/logo.png" alt="Tinh Hoa FC Logo" class="team-logo-img">
                    </div>
                    <h2>Tinh Hoa FC</h2>
                </div>
                <div class="modal-body">
                    <p v-if="!selectingAdmin && !selectingAccountant && !selectingGuest" style="margin-bottom: 2rem;">Vui lòng chọn chế độ truy cập</p>
                    
                    <!-- Admin/Accountant Login Form -->
                    <div v-if="selectingAdmin || selectingAccountant" style="text-align: left;">
                        <div class="form-group">
                            <label class="form-label">Tên Đăng Nhập</label>
                            <div class="search-input-fancy-wrapper">
                                <input 
                                    type="text" 
                                    v-model="adminForm.username" 
                                    placeholder="manager"
                                    @keyup.enter="confirmAdminLogin"
                                    class="input-fancy-borderless">
                            </div>
                        </div>
                        <div class="form-group" style="margin-top: -1rem;">
                            <label class="form-label">Mật Khẩu</label>
                            <div class="search-input-fancy-wrapper">
                                <input 
                                    type="password" 
                                    v-model="adminForm.password" 
                                    placeholder="••••••••"
                                    @keyup.enter="confirmAdminLogin"
                                    class="input-fancy-borderless">
                            </div>
                        </div>
                        <div v-if="adminLoginError" style="color: var(--danger-500); font-size: 0.875rem; margin-bottom: 1rem;">
                            {{ adminLoginError }}
                        </div>
                        <div class="form-actions" style="flex-direction: column; gap: 1rem;">
                            <button class="btn btn-primary" style="width: 100%;" @click="confirmAdminLogin">
                                Đăng Nhập
                            </button>
                            <button class="btn btn-secondary" style="width: 100%;" @click="cancelAdminLogin">
                                Quay Lại
                            </button>
                        </div>
                    </div>
                    
                    <!-- Guest Mode - Select Member -->
                    <div v-else-if="selectingGuest" style="text-align: left;">
                        <div class="form-group" style="margin-top: 1rem;">
                            <label class="form-label">TÌM KIẾM THÀNH VIÊN</label>
                            <div class="search-input-fancy-wrapper" :class="{ 'is-focused': isSearchFocused }">
                                <div class="search-icon-container">
                                    <svg class="search-icon-fancy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </div>
                                <input 
                                    type="text" 
                                    v-model="memberSearch" 
                                    placeholder="Nhập tên để tìm kiếm..."
                                    @focus="onSearchWrapperFocus"
                                    @blur="onSearchWrapperBlur"
                                    @keydown="handleComboboxKeydown"
                                    class="input-fancy-borderless"
                                    ref="memberSearchInput">
                                <button v-if="memberSearch" class="input-clear-btn" @click="clearMemberSelection" type="button">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                            
                            <!-- Member List Container (Persistent) -->
                            <div class="member-list-fancy-container" ref="dropdownList">
                                <template v-if="filteredMembers.length > 0">
                                    <div 
                                        v-for="(member, index) in filteredMembers" 
                                        :key="member.id"
                                        class="combobox-item fancy-item"
                                        :class="{ 
                                            selected: selectedMemberId === member.id,
                                            highlight: index === activeIndex
                                        }"
                                        @mousedown.prevent="selectMember(member)">
                                        <div class="member-item-avatar" :style="{ background: `linear-gradient(135deg, ${getInitialsColor(member.name)}, ${getInitialsColor(member.name)}dd)` }">
                                            {{ getInitials(member.name) }}
                                        </div>
                                        <div class="member-item-info">
                                            <span class="member-name">{{ member.name }}</span>
                                            <span class="member-role">Thành viên chính thức</span>
                                        </div>
                                        <div v-if="selectedMemberId === member.id" class="selected-check">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                </template>
                                <div v-else-if="memberSearch" class="fancy-empty-inline">
                                    <p>Không tìm thấy thành viên nào khớp với "{{ memberSearch }}"</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="login-actions">
                            <button class="btn btn-primary btn-hero-confirm" @click="confirmGuestLogin" :disabled="!selectedMemberId">
                                Xác Nhận Truy Cập
                            </button>
                            <button class="btn btn-secondary btn-hero-back" @click="cancelGuestSelection">
                                Quay Lại
                            </button>
                        </div>
                    </div>
                    
                    <!-- Role Selection -->
                    <div v-else class="role-cards-grid">
                        <div class="role-card" @click="selectingAdmin = true">
                            <div class="role-card-icon role-admin">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                </svg>
                            </div>
                            <div class="role-card-content">
                                <h3>Quản Trị Viên</h3>
                                <p>Toàn quyền quản lý đội bóng</p>
                            </div>
                            <div class="role-card-arrow">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </div>

                        <div class="role-card" @click="selectingAccountant = true">
                            <div class="role-card-icon role-accountant">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                </svg>
                            </div>
                            <div class="role-card-content">
                                <h3>Kế Toán</h3>
                                <p>Quản lý thu chi và quỹ đội</p>
                            </div>
                            <div class="role-card-arrow">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </div>

                        <div class="role-card" @click="handleGuestClick">
                            <div class="role-card-icon role-guest">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <div class="role-card-content">
                                <h3>Thành viên</h3>
                                <p>Xem thông tin & điểm danh</p>
                            </div>
                            <div class="role-card-arrow">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="login-modal-footer">
                    <div class="version-tag">
                        <svg class="version-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                        </svg>
                        <span>Phiên bản v{{ appVersion }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Notification -->
        <div class="notification" :class="['notification-' + notification.type, { show: notification.show }]">
            <div class="notification-status-stripe"></div>
            <div class="notification-icon-container">
                <svg v-if="notification.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <svg v-else-if="notification.type === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <svg v-else-if="notification.type === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            </div>
            <div class="notification-content">
                <div class="notification-label">{{ notification.type === 'success' ? 'Thành công' : (notification.type === 'error' ? 'Lỗi' : 'Thông báo') }}</div>
                <div class="notification-message">{{ notification.message }}</div>
            </div>
            <button class="notification-close" @click="notification.show = false">×</button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import BottomNav from './components/BottomNav.vue';
import { useAppState } from './composables/useAppState';
import { useFirebase } from './composables/useFirebase';
import { useAuth } from './composables/useAuth';
import { useBreakpoints } from './composables/useBreakpoints';
import bcrypt from 'bcryptjs';
const appVersion = __APP_VERSION__;

const { isMobile: isMobileDevice } = useBreakpoints();
const router = useRouter();
const { loadData, members, matches, transactions, pendingTransactions, contributionTiers, settings, updateFromFirebase, isMobileView, toggleMobileView } = useAppState();

const { initFirebase, signIn: firebaseSignIn, signOut: firebaseSignOut, uploadData, downloadData, syncStatus, isSignedIn, isConfigured, hasNewUpdate, setupRealtimeListener, stopRealtimeListener } = useFirebase();
const { currentRole, isAdmin, setRole, logout, permissions } = useAuth();

const notification = reactive({ show: false, message: '', type: 'info' });
const mobileMenuOpen = ref(false);
const selectingAdmin = ref(false);
const selectingAccountant = ref(false);
const selectingGuest = ref(false);
const selectedMemberId = ref('');
const memberSearch = ref('');
const showMemberList = ref(false);
const memberSearchInput = ref(null);
const dropdownList = ref(null);
const activeIndex = ref(-1);
const adminForm = reactive({
    username: '',
    password: ''
});
const adminLoginError = ref('');

// Theme Management
const currentTheme = ref('light');

const applyTheme = (theme) => {
    console.log('🎨 Applying Theme:', theme);
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    // Explicitly update color scheme for system integration
    html.style.colorScheme = theme;
};

const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        currentTheme.value = savedTheme;
    } else if (prefersDark) {
        currentTheme.value = 'dark';
    } else {
        currentTheme.value = 'light';
    }
};

// Call init early
initTheme();

// Use watcher for reliable theme application and persistence
watch(currentTheme, (newTheme) => {
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}, { immediate: true });


const toggleTheme = (event) => {
    const isAppearanceTransition = document.startViewTransition &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition) {
        currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
        return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(async () => {
        currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
    });

    transition.ready.then(() => {
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
            {
                clipPath: clipPath,
            },
            {
                duration: 500,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
            }
        );
    });
};

onMounted(() => {
    // Other initialization if needed
    
    // Apply platform style guide
    if (isMobileDevice.value || isMobileView.value) {
        document.documentElement.setAttribute('data-app-platform', 'mobile');
    }
});


// Watch for screen size changes or simulation to switch style guides
watch([isMobileDevice, isMobileView], ([newDevice, newSim]) => {
    if (newDevice || newSim) {
        document.documentElement.setAttribute('data-app-platform', 'mobile');
    } else {
        document.documentElement.removeAttribute('data-app-platform');
    }
});

// Close mobile menu on route change
watch(() => router.currentRoute.value.path, () => {
    mobileMenuOpen.value = false;
});


const syncStatusText = computed(() => {
    if (hasNewUpdate.value) return 'Cập nhật mới!';
    if (!isSignedIn.value) return 'Chưa kết nối';
    if (syncStatus.value === 'syncing') return 'Đang đồng bộ...';
    if (syncStatus.value === 'success') return 'Đã đồng bộ';
    if (syncStatus.value === 'error') return 'Lỗi đồng bộ';
    return 'Đã kết nối';
});

const removeAccents = (str) => {
    if (!str) return '';
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase();
};

// Filter members based on search
const filteredMembers = computed(() => {
    const list = members.value || [];
    if (!memberSearch.value) {
        return [...list].sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    }
    
    const search = memberSearch.value.toLowerCase();
    return list.filter(m => 
        m.name.toLowerCase().includes(search) || 
        (m.position && m.position.toLowerCase().includes(search))
    ).sort((a, b) => a.name.localeCompare(b.name, 'vi'));
});

// Reset active index when filter changes
watch(filteredMembers, () => {
    activeIndex.value = -1;
});

// Auto-focus search input when opening guest mode
watch(selectingGuest, (val) => {
    if (val) {
        setTimeout(() => {
            if (memberSearchInput.value) memberSearchInput.value.focus();
        }, 100);
    }
});

const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const getInitialsColor = (name) => {
    const colors = [
        '#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

const confirmAdminLogin = async () => {
    adminLoginError.value = '';
    
    // Determine the role we're trying to log into
    const loginUsername = adminForm.username || (selectingAdmin.value ? 'admin' : 'ketoan');
    
    // Basic validation
    if (selectingAdmin.value && loginUsername !== 'admin') {
        adminLoginError.value = 'Tên đăng nhập admin không đúng';
        return;
    }
    if (selectingAccountant.value && loginUsername !== 'ketoan') {
        adminLoginError.value = 'Tên đăng nhập kế toán không đúng';
        return;
    }

    adminLoginError.value = 'Đang kết nối...';
    // Wait for Firebase to initialize (max 3 seconds)
    let attempts = 0;
    while (!isConfigured.value && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    
    // Auto-download data from Firebase to get latest password hash
    if (isConfigured.value) {
        try {
            const data = await downloadData();
            if (data && data.settings) {
                updateFromFirebase(data);
            }
        } catch (e) {
            console.error('Không thể tải dữ liệu hash mới nhất:', e);
        }
    }

    adminLoginError.value = 'Đang kiểm tra...';
    const { getPassword } = useAppState();
    const storedHash = await getPassword(loginUsername);
    
    if (!storedHash) {
        adminLoginError.value = 'Lỗi hệ thống khi truy xuất mật khẩu';
        return;
    }

    let isValid = false;
    try {
        if (!storedHash.startsWith('$2')) {
            // Fallback for plaintext (migration)
            isValid = (adminForm.password === storedHash);
            // Optionally auto-update to hash after login:
            if (isValid) {
                const { updatePassword } = useAppState();
                await updatePassword(loginUsername, adminForm.password);
            }
        } else {
            isValid = bcrypt.compareSync(adminForm.password, storedHash);
        }
    } catch (e) {
        console.error('Lỗi hash:', e);
    }
    
    if (!isValid) {
        adminLoginError.value = 'Mật khẩu không đúng';
        return;
    }
    
    // Login successful
    const roleId = loginUsername === 'admin' ? 'admin' : 'ketoan';
    setRole(roleId);
    selectingAdmin.value = false;
    selectingAccountant.value = false;
    adminForm.username = '';
    adminForm.password = '';
    adminLoginError.value = '';
    showNotification(`✅ Đăng nhập ${roleId === 'admin' ? 'Admin' : 'Kế toán'} thành công!`, 'success');
    
    // Auto Login Firebase Anonymous
    await firebaseSignIn();
    
    if (isConfigured.value) {
        try {
            const data = await downloadData();
            if (data && data.members && data.members.length > 0) {
                updateFromFirebase(data);
                showNotification('✅ Đã tải dữ liệu mới nhất từ Cloud!', 'success');
            } else {
                console.log('No cloud data found, using local data');
                showNotification('📱 Sử dụng dữ liệu cục bộ', 'info');
            }
            
            // Setup realtime listener for live updates
            setupRealtimeListener((newData) => {
                console.log('🔔 Admin received realtime update');
                updateFromFirebase(newData);
                showNotification('🔔 Dữ liệu đã được cập nhật!', 'info');
            });
            
        } catch (e) {
            console.error('Admin auto-download error:', e);
            showNotification('📱 Sử dụng dữ liệu cục bộ', 'info');
        }
    } else {
        console.warn('Firebase not initialized, using local data');
        showNotification('📱 Sử dụng dữ liệu cục bộ', 'info');
    }
    
    // Navigate to dashboard
    router.push('/dashboard');
};

const cancelAdminLogin = () => {
    selectingAdmin.value = false;
    selectingAccountant.value = false;
    adminForm.username = '';
    adminForm.password = '';
    adminLoginError.value = '';
};

const handleSetRole = (role) => {
    setRole(role);
    showNotification(`Đã vào chế độ ${role === 'admin' ? 'Quản trị' : 'Thành viên'}`, 'success');
    
    // Navigate to dashboard
    router.push('/dashboard');
};

const selectMember = (member) => {
    selectedMemberId.value = member.id;
    memberSearch.value = member.name;
    showMemberList.value = false;
    activeIndex.value = -1;
};

const clearMemberSelection = () => {
    memberSearch.value = '';
    selectedMemberId.value = '';
    activeIndex.value = -1;
    if (memberSearchInput.value) memberSearchInput.value.focus();
};

const isSearchFocused = ref(false);

const onSearchWrapperFocus = () => {
    isSearchFocused.value = true;
    if (selectedMemberId.value && memberSearchInput.value) {
        memberSearchInput.value.select();
    }
};

const onSearchWrapperBlur = () => {
    setTimeout(() => {
        isSearchFocused.value = false;
        activeIndex.value = -1;
        const member = members.value.find(m => m.id === selectedMemberId.value);
        if (member) {
            memberSearch.value = member.name;
        }
    }, 200);
};

const handleComboboxKeydown = (e) => {
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            activeIndex.value = (activeIndex.value + 1) % filteredMembers.value.length;
            scrollSelectedIntoView();
            break;
        case 'ArrowUp':
            e.preventDefault();
            activeIndex.value = activeIndex.value <= 0 ? filteredMembers.value.length - 1 : activeIndex.value - 1;
            scrollSelectedIntoView();
            break;
        case 'Enter':
            e.preventDefault();
            if (activeIndex.value !== -1 && filteredMembers.value[activeIndex.value]) {
                selectMember(filteredMembers.value[activeIndex.value]);
            }
            break;
    }
};

const scrollSelectedIntoView = () => {
    if (activeIndex.value === -1) return;
    setTimeout(() => {
        const dropdown = dropdownList.value;
        const selectedItem = dropdown?.children[activeIndex.value];
        if (dropdown && selectedItem) {
            const dropdownRect = dropdown.getBoundingClientRect();
            const itemRect = selectedItem.getBoundingClientRect();
            
            if (itemRect.bottom > dropdownRect.bottom) {
                dropdown.scrollTop += (itemRect.bottom - dropdownRect.bottom);
            } else if (itemRect.top < dropdownRect.top) {
                dropdown.scrollTop -= (dropdownRect.top - itemRect.top);
            }
        }
    }, 0);
};

const cancelGuestSelection = () => {
    selectingGuest.value = false;
    selectedMemberId.value = '';
    memberSearch.value = '';
    showMemberList.value = false;
};

const confirmGuestLogin = async () => {
    if (!selectedMemberId.value) {
        showNotification('Vui lòng chọn thành viên', 'error');
        return;
    }
    
    const member = members.value.find(m => m.id === selectedMemberId.value);
    
    // Convert to number to match the type used in attendance records
    const memberIdAsNumber = typeof selectedMemberId.value === 'string' 
        ? parseInt(selectedMemberId.value) 
        : selectedMemberId.value;
    
    console.log('👤 Guest Login:', {
        selectedMemberId: selectedMemberId.value,
        selectedMemberIdType: typeof selectedMemberId.value,
        memberIdAsNumber,
        memberIdAsNumberType: typeof memberIdAsNumber,
        memberName: member ? member.name : 'Unknown'
    });
    
    setRole('guest', memberIdAsNumber);
    selectingGuest.value = false;
    memberSearch.value = '';
    showMemberList.value = false;
    
    const memberName = member ? member.name : 'Thành viên';
    showNotification(`Xin chào ${memberName}!`, 'success');
    
    // Sign in anonymously to Firebase for write access
    try {
        if (isConfigured.value) {
            await firebaseSignIn();
            console.log('✅ Guest signed in anonymously to Firebase');
        }
    } catch (e) {
        console.warn('Anonymous sign-in failed:', e);
        // Continue anyway - guest can still use app with local data
    }
    
    // Reset for next time
    selectedMemberId.value = '';
    
    // Navigate to dashboard
    router.push('/dashboard');
};

const handleLogout = () => {
    // Stop realtime listener
    stopRealtimeListener();
    
    logout();
    mobileMenuOpen.value = false;
    selectingAdmin.value = false;
    selectingAccountant.value = false;
    selectingGuest.value = false;
    selectedMemberId.value = '';
    memberSearch.value = '';
    showMemberList.value = false;
    adminForm.username = '';
    adminForm.password = '';
    adminLoginError.value = '';
};

const showNotification = (msg, type = 'info') => {
    notification.message = msg;
    notification.type = type;
    notification.show = true;
    setTimeout(() => notification.show = false, 3000);
};

const handleGuestClick = async () => {
    selectingGuest.value = true;
    
    // Always ensure we have local data loaded first (seed data if needed)
    if (members.value.length === 0) {
        loadData(); // This will load from localStorage or create seed data
    }
    
    // Then try to update from cloud in the background
    showNotification('🔄 Đang kiểm tra dữ liệu mới...', 'info');
    
    // Wait for Firebase to initialize (max 3 seconds)
    let attempts = 0;
    while (!isConfigured.value && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    
    if (!isConfigured.value) {
        console.warn('Firebase not initialized, using local data');
        showNotification('📱 Sử dụng dữ liệu cục bộ', 'info');
        return;
    }
    
    try {
        const data = await downloadData();
        if (data && data.members && data.members.length > 0) {
            updateFromFirebase(data);
            showNotification('✅ Đã cập nhật dữ liệu mới nhất từ Cloud!', 'success');
        } else {
             // No cloud data, but we already have local data
             console.log('No cloud data found, using local/seed data');
             showNotification('📱 Sử dụng dữ liệu cục bộ', 'info');
        }
    } catch (e) {
        console.error('Guest load error:', e);
        // Don't show error, just use local data
        showNotification('📱 Sử dụng dữ liệu cục bộ', 'info');
    }
};

onMounted(() => {
    loadData();
    initFirebase();
});

onBeforeUnmount(() => {
    // Cleanup realtime listener when component is destroyed
    stopRealtimeListener();
});

// Note: Data is now auto-downloaded when admin logs in (see confirmAdminLogin)
// Google sign-in is only required for uploading data to Cloud

// Upload data to Firebase
const uploadToFirebase = async () => {
    if (!isSignedIn.value) {
        showNotification('Vui lòng đăng nhập Firebase trước', 'error');
        return;
    }
    
    try {
        await uploadData({
            members: members.value,
            matches: matches.value,
            transactions: transactions.value,
            pendingTransactions: pendingTransactions.value,
            contributionTiers: contributionTiers.value,
            settings: settings.value
        });
        showNotification('✅ Đã đồng bộ dữ liệu lên Cloud thành công!', 'success');
    } catch (e) {
        showNotification('❌ Lỗi khi đồng bộ: ' + e.message, 'error');
    }
};

// Download data from Firebase
const downloadFromFirebase = async () => {
    if (!isSignedIn.value) {
        showNotification('Vui lòng đăng nhập Firebase trước', 'error');
        return;
    }
    
    if (!confirm('⚠️ Lấy dữ liệu từ Cloud sẽ GHI ĐÈ dữ liệu hiện tại. Bạn có chắc chắn?')) {
        return;
    }
    
    try {
        const data = await downloadData();
        if (data) {
            updateFromFirebase(data);
            showNotification('✅ Đã lấy dữ liệu từ Cloud thành công!', 'success');
        } else {
            showNotification('ℹ️ Chưa có dữ liệu trên Cloud', 'info');
        }
    } catch (e) {
        showNotification('❌ Lỗi khi lấy: ' + e.message, 'error');
    }
};
</script>

<style scoped>
/* Firebase Sync Styles - Premium Pill Design */
.sync-controls {
    display: flex;
    align-items: center;
    gap: 12px;
}

.sync-status {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    transition: all 0.3s ease;
    white-space: nowrap;
}

.status-dot-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.status-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--text-muted);
    left: -2px;
    top: -2px;
    border: 1.5px solid var(--bg-secondary);
    z-index: 2;
}

.sync-status.success .status-dot { background: var(--success); }
.sync-status.syncing .status-dot { background: var(--primary-500); }
.sync-status.error .status-dot { background: var(--danger); }
.sync-status.has-update .status-dot { background: var(--warning); }

.sync-icon {
    width: 14px;
    height: 14px;
    color: var(--text-secondary);
    z-index: 1;
}

.sync-icon.spinning {
    animation: spin 2s linear infinite;
}

.sync-icon.pulse {
    animation: pulse 1.5s ease-in-out infinite;
}

.status-text {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.02em;
}

.sync-status.success {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(34, 197, 94, 0.2);
}

.sync-status.success .status-text {
    color: var(--success-700);
}

.sync-status.has-update {
    background: rgba(245, 158, 11, 0.1);
    border-color: rgba(245, 158, 11, 0.3);
}

.sync-status.has-update .status-text {
    color: var(--warning-700);
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
}

.btn-theme-toggle {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    margin-right: 12px;
}

.btn-theme-toggle:hover {
    background: var(--bg-hover);
    color: var(--primary-500);
    border-color: var(--primary-500);
}

.btn-theme-toggle svg {
    width: 18px;
    height: 18px;
}

.btn-exit {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger);
    border: 1px solid rgba(239, 68, 68, 0.3);
    margin-left: 10px;
    height: 32px !important;
    padding: 0 12px;
    font-size: 13px;
    font-weight: 700;
}

.btn-exit:hover {
    background: var(--danger);
    color: #fff;
    border-color: var(--danger);
    box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2);
    transform: translateY(-1px);
}

.btn-exit svg {
    width: 14px;
    height: 14px;
}

/* Modern Login Selection Styles - MDS Standard */
.login-modal {
    background: var(--bg-overlay);
    backdrop-filter: blur(8px);
    z-index: 10000;
}

.login-modal-content {
    max-width: 480px !important;
    background: var(--bg-elevated) !important;
    border: 1px solid var(--border-color) !important;
    box-shadow: var(--shadow-lg);
    border-radius: 20px !important;
    overflow: hidden;
}

.login-modal-header {
    flex-direction: column;
    padding: 2.5rem 2rem 1.25rem !important;
    text-align: center;
    border-bottom: none !important;
}

.logo-wrapper {
    width: 72px;
    height: 72px;
    margin: 0 auto 1.25rem;
    padding: 10px;
    background: var(--bg-secondary);
    border-radius: 20px;
    box-shadow: 0 8px 16px -4px rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.team-logo-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.login-modal-header h2 {
    font-size: 20px;
    letter-spacing: -0.01em;
    font-weight: 700;
    margin-bottom: 2px;
    color: var(--text-primary);
}

.form-label {
    display: block;
    font-size: 11px;
    font-weight: 800;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
    margin-left: 4px;
}

.search-input-fancy-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--bg-tertiary);
    border: 1.5px solid var(--border-color);
    border-radius: var(--radius-md);
    height: 52px;
    width: 100%;
    margin: 0 0 1.5rem;
    padding: 0 20px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-input-fancy-wrapper.is-focused {
    border-color: var(--primary-500);
}

.search-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    margin-right: 16px;
    color: var(--text-muted);
    flex-shrink: 0;
}

.search-icon-fancy {
    width: 20px;
    height: 20px;
    display: block;
}

.input-fancy-borderless {
    flex: 1;
    background: transparent !important;
    background-color: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    color: var(--text-primary) !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    height: 100%;
    min-width: 0;
    outline: none !important;
    box-shadow: none !important;
    -webkit-appearance: none;
    appearance: none;
}

.input-fancy-borderless::placeholder {
    color: var(--text-muted) !important;
    font-weight: 500 !important;
    opacity: 0.7;
}

.input-fancy-borderless:focus {
    outline: none !important;
}

.input-clear-btn {
    background: var(--bg-tertiary);
    border: none;
    color: var(--text-muted);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    margin-left: 8px;
}

.member-list-fancy-container {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    max-height: 320px;
    overflow-y: auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 400px;
    margin: 1.5rem auto 0;
}

.fancy-item {
    padding: 10px !important;
    border-radius: 10px !important;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
}

.fancy-item:hover {
    background: var(--bg-hover) !important;
    border-color: var(--border-color);
}

.member-item-avatar {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 13px;
    margin-right: 14px;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
}

.member-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
}

.member-name {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 2px;
}

.member-role {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.02em;
}

.fancy-item.selected {
    background: rgba(59, 130, 246, 0.1) !important;
    border-color: var(--primary-500);
    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.1);
}

.fancy-item.selected .member-name { color: var(--primary-500); }
.fancy-item.selected .member-role { color: var(--primary-400); }

.selected-check {
    width: 22px;
    height: 22px;
    background: #3b82f6;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
}

.selected-check svg { width: 100%; height: 100%; }

/* Role Cards Grid */
.role-cards-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 2rem 2.5rem;
}

.role-card {
    display: flex;
    align-items: center;
    padding: 18px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.role-card:hover {
    border-color: var(--primary-500);
    background: var(--bg-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.role-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    flex-shrink: 0;
}

.role-admin { background: rgba(59, 130, 246, 0.15); color: var(--primary-500); }
.role-accountant { background: rgba(16, 185, 129, 0.15); color: var(--success); }
.role-guest { background: rgba(139, 92, 246, 0.15); color: var(--info); }

.role-card-icon svg {
    width: 24px;
    height: 24px;
}

.role-card-content {
    text-align: left;
    flex: 1;
}

.role-card-content h3 {
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 2px;
    color: var(--text-primary);
    letter-spacing: -0.01em;
}

.role-card-content p {
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 500;
}

.role-card-arrow {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.2s;
    color: #3b82f6;
}

.role-card:hover .role-card-arrow {
    opacity: 1;
    transform: translateX(0);
}

.login-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 2.5rem auto 0;
    padding: 0;
    max-width: 400px;
}

.btn-hero-confirm {
    height: 48px;
    border-radius: 12px;
    font-weight: 700;
    background: var(--primary-500);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.btn-hero-back {
    height: 48px;
    border-radius: 12px;
    font-weight: 600;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
}

.btn-hero-back:hover {
    background: var(--bg-active);
    color: var(--text-primary);
    border-color: var(--border-hover);
}

.fancy-empty-inline {
    padding: 40px 20px;
    text-align: center;
    color: var(--text-muted);
    font-family: inherit;
}

.fancy-empty-inline p { font-size: 14px; font-weight: 500; }

/* Simulate Mobile View */
.app-container.simulate-mobile-view {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-tertiary);
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}

.simulate-mobile-view .main-content {
    width: 390px;
    height: 844px;
    max-height: 95vh;
    border-radius: 40px;
    margin: auto;
    border: 8px solid #222;
    box-shadow: 0 0 0 2px #555, var(--shadow-2xl), 0 0 100px rgba(0,0,0,0.2);
    position: relative;
    overflow: hidden;
    background: var(--bg-primary);
}

.simulate-mobile-view .top-bar {
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
}

/* Floating Mobile FAB */
.btn-mobile-fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
    color: white;
    border: none;
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    padding: 0;
}

.btn-mobile-fab:active {
    transform: scale(0.9);
}

.btn-mobile-fab.open {
    background: var(--bg-elevated);
    color: var(--text-primary);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    transform: rotate(180deg);
}

.fab-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
}

.fab-icon-wrapper svg {
    width: 28px;
    height: 28px;
}

/* Simulation Adjustments */
.simulate-mobile-view .btn-mobile-fab {
    position: absolute;
    bottom: 30px;
    right: 30px;
}

/* Adjust main content padding in mobile to account for FAB area */
[data-app-platform="mobile"] .main-content {
    padding-bottom: 90px !important;
}

/* Hide old bottom nav in simulation */
.simulate-mobile-view .bottom-nav {
    display: none !important;
}

/* Adjust top bar for centered toggle */
.mobile-view-toggle {
    background: var(--bg-tertiary);
}

.mobile-view-toggle.active {
    background: var(--primary-500);
    color: white;
}

[data-theme='dark'] .simulate-mobile-view .main-content {
    border-color: #333;
    box-shadow: 0 0 0 2px #444, var(--shadow-2xl), 0 0 100px rgba(0,0,0,0.5);
}

@media (max-width: 768px) {
    .mobile-view-toggle {
        display: none !important;
    }
}
</style>

