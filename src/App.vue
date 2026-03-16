<template>
    <div class="app-container">
        <!-- Sidebar Overlay for Mobile -->
        <div class="sidebar-overlay" :class="{ show: mobileMenuOpen }" @click="toggleMobileMenu"></div>

        <!-- Sidebar Navigation -->
        <Sidebar v-if="currentRole" :class="{ open: mobileMenuOpen }" />

        <!-- Mobile Menu Toggle -->
        <button v-if="currentRole" class="mobile-menu-toggle" @click="toggleMobileMenu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </button>

        <!-- Main Content -->
        <main class="main-content" v-if="currentRole">
            <header class="top-bar">
                <h1 class="page-title">{{ $route.name }}</h1>
                <div class="top-bar-actions">
                    <div class="sync-controls" v-if="isAdmin">
                        <div class="sync-status" :class="{ 'has-update': hasNewUpdate }">
                            <svg class="sync-icon" :class="{ spinning: syncStatus === 'syncing', pulse: hasNewUpdate }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                            <span :class="{'text-success': syncStatus === 'success', 'text-warning': hasNewUpdate}">{{ syncStatusText }}</span>
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

            <router-view />
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
                            <label>Tên Đăng Nhập</label>
                            <input 
                                type="text" 
                                v-model="adminForm.username" 
                                placeholder="admin"
                                @keyup.enter="confirmAdminLogin"
                                style="width: 100%;">
                        </div>
                        <div class="form-group">
                            <label>Mật Khẩu</label>
                            <input 
                                type="password" 
                                v-model="adminForm.password" 
                                placeholder="••••••••"
                                @keyup.enter="confirmAdminLogin"
                                style="width: 100%;">
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
                            <div class="search-input-fancy-wrapper">
                                <svg class="search-icon-fancy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input 
                                    type="text" 
                                    v-model="memberSearch" 
                                    placeholder="Nhập tên để tìm kiếm..."
                                    @focus="onSearchFocus"
                                    @blur="onSearchBlur"
                                    @keydown="handleComboboxKeydown"
                                    class="input-fancy"
                                    ref="memberSearchInput">
                                <button v-if="memberSearch" class="input-clear-btn" @click="clearMemberSelection" type="button">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                                        <div class="member-item-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>
                                        <span class="member-name">{{ member.name }}</span>
                                        <div v-if="selectedMemberId === member.id" class="selected-check">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                        
                        <div class="form-actions" style="flex-direction: column; gap: 1rem; margin-top: 1rem;">
                            <button class="btn btn-primary" style="width: 100%;" @click="confirmGuestLogin" :disabled="!selectedMemberId">
                                Xác Nhận
                            </button>
                            <button class="btn btn-secondary" style="width: 100%;" @click="cancelGuestSelection">
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
            </div>
        </div>

        <!-- Notification -->
        <div class="notification" :class="['notification-' + notification.type, { show: notification.show }]">
            <div class="notification-content"><span>{{ notification.message }}</span></div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import { useAppState } from './composables/useAppState';
import { useFirebase } from './composables/useFirebase';
import { useAuth } from './composables/useAuth';
import bcrypt from 'bcryptjs';

const router = useRouter();
const { loadData, members, matches, transactions, pendingTransactions, contributionTiers, settings, updateFromFirebase } = useAppState();
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

const onSearchFocus = () => {
    if (selectedMemberId.value && memberSearchInput.value) {
        memberSearchInput.value.select();
    }
};

const onSearchBlur = () => {
    // Keep list visible - no need to hide
    setTimeout(() => {
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
/* Realtime Update Animations */
.sync-icon.pulse {
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.7;
        transform: scale(1.1);
    }
}

.sync-status.has-update {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: var(--radius-md);
    padding: 0.5rem 1rem;
}

.sync-status.has-update .sync-icon {
    color: var(--success-500);
}

.sync-status.has-update span {
    color: var(--success-500);
    font-weight: 600;
}

/* Updated Login Modal Styles */
.btn-exit {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger-400);
    border: 1px solid rgba(239, 68, 68, 0.2);
    margin-left: 10px;
}

.btn-exit:hover {
    background: var(--danger-500);
    color: white;
    border-color: var(--danger-500);
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
}

.login-modal {
    background: radial-gradient(circle at center, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 1) 100%);
    backdrop-filter: blur(12px);
    z-index: 9999;
}

.login-modal-content {
    max-width: 440px !important;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%) !important;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.login-modal-header {
    flex-direction: column;
    padding: 3rem 2rem 2rem !important;
    border-bottom: none !important;
}

.logo-wrapper {
    width: 100px;
    height: 100px;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.4));
    animation: float 6s ease-in-out infinite;
}

.team-logo-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.login-modal-header h2 {
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.025em;
    margin-bottom: 0.5rem;
    background: linear-gradient(to right, #fff, #94a3b8);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle {
    color: var(--text-muted);
    font-size: 0.875rem;
}

/* Role Cards Grid */
.role-cards-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.role-card {
    display: flex;
    align-items: center;
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 1.25rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.role-card:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3);
}

.role-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.25rem;
    flex-shrink: 0;
}

.role-admin { background: rgba(59, 130, 246, 0.1); color: #60a5fa; }
.role-accountant { background: rgba(34, 197, 94, 0.1); color: #4ade80; }
.role-guest { background: rgba(168, 85, 247, 0.1); color: #c084fc; }

.role-card-icon svg {
    width: 24px;
    height: 24px;
}

.role-card-content {
    text-align: left;
    flex: 1;
}

.role-card-content h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: white;
}

.role-card-content p {
    font-size: 0.8125rem;
    color: var(--text-muted);
}

.role-card-arrow {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
    color: var(--text-muted);
}

.role-card:hover .role-card-arrow {
    opacity: 1;
    transform: translateX(0);
}

/* Fancy Search Input */
.search-input-fancy-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.search-icon-fancy {
    position: absolute;
    left: 1rem;
    width: 18px;
    height: 18px;
    color: var(--text-muted);
    pointer-events: none;
}

.input-fancy {
    width: 100%;
    background: rgba(0, 0, 0, 0.2) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 1rem !important;
    padding: 0.875rem 1rem 0.875rem 2.75rem !important;
    color: white !important;
    font-size: 0.9375rem !important;
    transition: all 0.3s ease !important;
}

.input-fancy:focus {
    border-color: var(--primary-500) !important;
    background: rgba(0, 0, 0, 0.3) !important;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15) !important;
}

.input-clear-btn {
    position: absolute;
    right: 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: var(--text-muted);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.input-clear-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
}

/* Fancy Member List - Persistent */
.member-list-fancy-container {
    margin-top: 1rem;
    max-height: 300px;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 1.25rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.fancy-item {
    display: flex;
    align-items: center;
    padding: 0.875rem 1rem !important;
    border-radius: 0.875rem !important;
    cursor: pointer;
    transition: all 0.2s ease;
}

.fancy-item.highlight {
    background: rgba(255, 255, 255, 0.05) !important;
}

.fancy-item.selected {
    background: var(--bg-active) !important;
    border: 1px solid rgba(59, 130, 246, 0.3);
}

.fancy-empty-inline {
    padding: 2rem;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.875rem;
}

.member-item-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.25rem;
    color: var(--text-muted);
}

.member-item-icon svg {
    width: 20px;
    height: 20px;
}

.member-name {
    font-weight: 500;
    color: white;
    font-size: 1rem;
    flex: 1;
}

.selected-check {
    color: var(--success-500);
    width: 20px;
}

.fancy-empty {
    padding: 2rem !important;
    text-align: center;
}

.fancy-empty p {
    color: var(--text-muted);
    font-size: 0.875rem;
}
</style>
