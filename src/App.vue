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
                                    <polyline points="20 6 9 17 4 12"/>
                                </template>
                                <template v-else-if="syncStatus === 'error'">
                                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                                </template>
                                <template v-else>
                                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                                </template>
                            </svg>
                            <span>{{ syncStatusText }}</span>
                        </div>
                        <button class="btn btn-sm btn-primary" v-if="!isSignedIn" @click="firebaseSignIn">
                             Đăng nhập Google
                        </button>
                        <template v-if="isSignedIn">
                            <button class="btn btn-sm btn-info" @click="downloadFromFirebase" title="Lấy dữ liệu từ Firebase">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Lấy từ Cloud
                            </button>
                            <button class="btn btn-sm btn-secondary" @click="firebaseSignOut">
                                Đăng xuất
                            </button>
                        </template>
                    </div>
                    <button class="btn btn-sm btn-secondary" style="margin-left: 10px;" @click="handleLogout">
                        Thoát
                    </button>
                </div>
            </header>

            <router-view />
        </main>

        <!-- Role Selection Modal (Simplified entry) -->
        <div class="modal" v-if="!currentRole" style="background-color: rgba(0,0,0,0.9); z-index: 9999; display: flex;">
            <div class="modal-content" style="max-width: 400px; text-align: center;">
                <div class="modal-header" style="justify-content: center;"><h2>Tinh Hoa FC</h2></div>
                <div class="modal-body">
                    <p style="margin-bottom: 2rem;">Vui lòng chọn chế độ truy cập</p>
                    
                    <!-- Admin Login Form -->
                    <div v-if="selectingAdmin" style="text-align: left;">
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
                        <div class="form-group">
                            <label>Tìm Kiếm Thành Viên</label>
                            <input 
                                type="text" 
                                v-model="memberSearch" 
                                placeholder="Nhập tên để tìm kiếm..."
                                @focus="showMemberList = true"
                                style="width: 100%;">
                        </div>
                        
                        <!-- Member List -->
                        <div v-if="showMemberList && filteredMembers.length > 0" class="member-search-list">
                            <div 
                                v-for="member in filteredMembers" 
                                :key="member.id"
                                class="member-search-item"
                                :class="{ selected: selectedMemberId === member.id }"
                                @click="selectMember(member)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span>{{ member.name }}</span>
                                <svg v-if="selectedMemberId === member.id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; color: var(--success-500);">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div v-else-if="showMemberList && memberSearch" class="empty-state" style="padding: 1rem;">
                            <p style="margin: 0; font-size: 0.875rem;">Không tìm thấy thành viên</p>
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
                    <div v-else class="form-actions" style="flex-direction: column; gap: 1rem;">
                        <button class="btn btn-primary" style="width: 100%;" @click="selectingAdmin = true">Quản Trị Viên (Full)</button>
                        <button class="btn btn-secondary" style="width: 100%;" @click="handleGuestClick">Khách (Chỉ xem)</button>
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
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import { useAppState } from './composables/useAppState';
import { useFirebase } from './composables/useFirebase';
import { useAuth } from './composables/useAuth';

const router = useRouter();
const { loadData, members, matches, transactions, updateFromFirebase } = useAppState();
const { initFirebase, signIn: firebaseSignIn, signOut: firebaseSignOut, uploadData, downloadData, syncStatus, isSignedIn, isConfigured, hasNewUpdate, setupRealtimeListener, stopRealtimeListener } = useFirebase();
const { currentRole, isAdmin, setRole, logout, permissions } = useAuth();

const notification = reactive({ show: false, message: '', type: 'info' });
const mobileMenuOpen = ref(false);
const selectingAdmin = ref(false);
const selectingGuest = ref(false);
const selectedMemberId = ref('');
const memberSearch = ref('');
const showMemberList = ref(false);
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

// Filter members based on search
const filteredMembers = computed(() => {
    if (!memberSearch.value) return members.value;
    
    const search = memberSearch.value.toLowerCase();
    return members.value.filter(m => 
        m.name.toLowerCase().includes(search)
    );
});

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

const confirmAdminLogin = async () => {
    adminLoginError.value = '';
    
    // Validate credentials
    if (adminForm.username !== 'admin') {
        adminLoginError.value = 'Tên đăng nhập không đúng';
        return;
    }
    
    if (adminForm.password !== 'khongngungbocuoc') {
        adminLoginError.value = 'Mật khẩu không đúng';
        return;
    }
    
    // Login successful
    setRole('admin');
    selectingAdmin.value = false;
    adminForm.username = '';
    adminForm.password = '';
    adminLoginError.value = '';
    showNotification('✅ Đăng nhập Admin thành công!', 'success');
    
    // Auto-download data from Firebase (without requiring Google sign-in)
    showNotification('🔄 Đang tải dữ liệu từ Cloud...', 'info');
    
    // Wait for Firebase to initialize (max 3 seconds)
    let attempts = 0;
    while (!isConfigured.value && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    
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
    adminForm.username = '';
    adminForm.password = '';
    adminLoginError.value = '';
};

const handleSetRole = (role) => {
    setRole(role);
    showNotification(`Đã vào chế độ ${role === 'admin' ? 'Quản trị' : 'Khách'}`, 'success');
    
    // Navigate to dashboard
    router.push('/dashboard');
};

const selectMember = (member) => {
    selectedMemberId.value = member.id;
    memberSearch.value = member.name;
    showMemberList.value = false;
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
    
    const memberName = member ? member.name : 'Khách';
    showNotification(`Xin chào ${memberName}!`, 'success');
    
    // Sign in anonymously to Firebase for write access
    try {
        if (isConfigured.value) {
            const firebase = (await import('firebase/compat/app')).default;
            await firebase.auth().signInAnonymously();
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
            transactions: transactions.value
        });
        showNotification('✅ Đã ghi dữ liệu lên Cloud thành công!', 'success');
    } catch (e) {
        showNotification('❌ Lỗi khi ghi: ' + e.message, 'error');
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
.member-search-list {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
    background: rgba(15, 23, 42, 0.8);
    margin-top: var(--spacing-sm);
}

.member-search-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    cursor: pointer;
    transition: all var(--transition-fast);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.member-search-item:last-child {
    border-bottom: none;
}

.member-search-item:hover {
    background: rgba(59, 130, 246, 0.1);
}

.member-search-item.selected {
    background: rgba(59, 130, 246, 0.2);
    border-left: 3px solid var(--primary-500);
}

.member-search-item span {
    flex: 1;
    color: var(--text-primary);
    font-weight: 500;
}

.member-search-item svg {
    color: var(--text-secondary);
}

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
</style>
