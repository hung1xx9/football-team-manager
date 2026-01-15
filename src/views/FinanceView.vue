<template>
    <div class="page-content">
        <!-- Tabs Navigation -->
        <div class="tabs">
            <button 
                class="tab-btn" 
                :class="{ active: activeTab === 'overview' }" 
                @click="activeTab = 'overview'">
                Tổng Quan
            </button>
            <button 
                class="tab-btn" 
                :class="{ active: activeTab === 'debts' }" 
                @click="activeTab = 'debts'">
                Tình Hình Đóng Quỹ
            </button>
            <button 
                class="tab-btn" 
                :class="{ active: activeTab === 'transactions' }" 
                @click="activeTab = 'transactions'">
                Lịch Sử Giao Dịch
            </button>
        </div>

        <!-- Tab: Overview -->
        <div v-if="activeTab === 'overview'" class="tab-content">
            <div class="stats-grid">
                <div class="stat-card stat-success">
                    <div class="stat-content">
                        <div class="stat-label">Tổng Thu</div>
                        <div class="stat-value">{{ formatCurrency(stats.totalIncome) }}</div>
                    </div>
                </div>
                <div class="stat-card stat-danger">
                    <div class="stat-content">
                        <div class="stat-label">Tổng Chi</div>
                        <div class="stat-value">{{ formatCurrency(stats.totalExpense) }}</div>
                    </div>
                </div>
                <div class="stat-card stat-info">
                    <div class="stat-content">
                        <div class="stat-label">Số Dư</div>
                        <div class="stat-value">{{ formatCurrency(stats.balance) }}</div>
                    </div>
                </div>
            </div>
            
            <div class="page-actions">
                <button class="btn btn-success" @click="openModal('income')">Thêm Thu</button>
                <button class="btn btn-danger" @click="openModal('expense')">Thêm Chi</button>
            </div>
        </div>

        <!-- Tab: Debts (Member Payment Status) -->
        <div v-if="activeTab === 'debts'" class="tab-content">
            <div class="card">
                <div class="card-header">
                    <h2>Theo Dõi Đóng Quỹ & Phạt</h2>
                    <div class="card-actions">
                         <div class="summary-badge warning">Tổng Nợ Quỹ: {{ formatCurrency(totalFundDebt) }}</div>
                         <div class="summary-badge danger">Tổng Nợ Phạt: {{ formatCurrency(totalFineDebt) }}</div>
                         <button class="btn btn-sm btn-secondary" @click="showSettingsModal = true">⚙️ Cài đặt ví</button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Thành Viên</th>
                                    <th class="text-center">Quỹ Tháng</th>
                                    <th class="text-center">Tiền Phạt</th>
                                    <th>Trạng Thái</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="m in memberStats" :key="m.id">
                                    <td class="font-medium">{{ m.name }}</td>
                                    <!-- Fund Column -->
                                    <td class="text-center">
                                        <div class="debt-cell">
                                            <span class="paid" title="Đã đóng">{{ formatCurrency(m.fundPaid) }}</span>
                                            <span class="separator">/</span>
                                            <span class="required" title="Phải đóng">{{ formatCurrency(m.fundRequired) }}</span>
                                            <div v-if="m.fundMissing > 0" class="debt-amount text-warning">
                                                Thiếu: {{ formatCurrency(m.fundMissing) }}
                                            </div>
                                        </div>
                                    </td>
                                    <!-- Fine Column -->
                                    <td class="text-center">
                                        <div class="debt-cell">
                                            <span class="paid" title="Đã đóng">{{ formatCurrency(m.finePaid) }}</span>
                                            <span class="separator">/</span>
                                            <span class="required" title="Phải đóng">{{ formatCurrency(m.fineRequired) }}</span>
                                            <div v-if="m.fineMissing > 0" class="debt-amount text-danger">
                                                Thiếu: {{ formatCurrency(m.fineMissing) }}
                                            </div>
                                        </div>
                                    </td>
                                    <!-- Status -->
                                    <td>
                                        <span class="badge" 
                                            :class="{
                                                'badge-success': m.fundMissing <= 0 && m.fineMissing <= 0,
                                                'badge-warning': m.fundMissing > 0 && m.fineMissing <= 0,
                                                'badge-danger': m.fineMissing > 0
                                            }">
                                            {{ getStatusText(m) }}
                                        </span>
                                    </td>
                                    <!-- Actions -->
                                    <td>
                                        <div v-if="m.fundMissing > 0 || m.fineMissing > 0" class="action-buttons-group">
                                            <!-- Primary: MoMo Payment -->
                                            <button class="btn btn-sm btn-primary" @click="openPaymentModal(m)" title="Thanh toán qua MoMo">
                                                <span class="btn-icon">💳</span> Đóng qua MoMo
                                            </button>
                                            
                                            <!-- Secondary: Manual Payment (Dropdown) -->
                                            <div class="dropdown-wrapper">
                                                <button 
                                                    class="btn btn-sm btn-secondary dropdown-toggle" 
                                                    @click="toggleDropdown(m.id)"
                                                    title="Các tùy chọn khác"
                                                >
                                                    ⋮
                                                </button>
                                                <div v-if="activeDropdown === m.id" class="dropdown-menu">
                                                    <button class="dropdown-item" @click="quickPayAll(m); closeDropdown()">
                                                        <span class="dropdown-icon">💵</span> Đóng thủ công (Tiền mặt)
                                                    </button>
                                                    <button class="dropdown-item" @click="quickPayFund(m); closeDropdown()" v-if="m.fundMissing > 0">
                                                        <span class="dropdown-icon">📊</span> Chỉ đóng quỹ ({{ formatCurrency(m.fundMissing) }})
                                                    </button>
                                                    <button class="dropdown-item" @click="quickPayFine(m); closeDropdown()" v-if="m.fineMissing > 0">
                                                        <span class="dropdown-icon">⚠️</span> Chỉ đóng phạt ({{ formatCurrency(m.fineMissing) }})
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <span v-else class="text-success">✔ Hoàn thành</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab: Transactions History -->
        <div v-if="activeTab === 'transactions'" class="tab-content">
            <div class="card">
                <div class="card-content">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Loại</th>
                                    <th>Mô Tả</th>
                                    <th>Thành Viên</th>
                                    <th>Số Tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="t in sortedTransactions" :key="t.id">
                                    <td>{{ formatDate(t.date) }}</td>
                                    <td>
                                        <span class="badge" :class="getBadgeClass(t)">
                                            {{ getCategoryLabel(t) }}
                                        </span>
                                    </td>
                                    <td>{{ t.description }}</td>
                                    <td>{{ getMemberName(t.memberId) || '-' }}</td>
                                    <td :style="{ color: t.type === 'income' ? 'var(--success-500)' : 'var(--danger-500)' }">
                                        {{ t.type === 'income' ? '+' : '-' }}{{ formatCurrency(t.amount) }}
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-danger" @click="handleDelete(t.id)">Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Transaction Modal -->
        <div class="modal" v-if="showModal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ form.type === 'income' ? 'Thêm Thu' : 'Thêm Chi' }}</h2>
                    <button class="modal-close" @click="closeModal">x</button>
                </div>
                <div class="modal-body">
                    <div class="form-group"><label>Ngày</label><input type="date" v-model="form.date"></div>
                    <div class="form-group">
                        <label>Loại</label>
                        <select v-model="form.category">
                            <option v-for="c in availableCategories" :value="c.value" :key="c.value">{{ c.label }}</option>
                        </select>
                    </div>
                    <div class="form-group" v-if="form.type === 'income' || form.category === 'fund' || form.category === 'fine'">
                        <label>Thành Viên</label>
                        <select v-model="form.memberId">
                            <option :value="null">Chọn thành viên</option>
                            <option v-for="m in members" :value="m.id" :key="m.id">{{ m.name }}</option>
                        </select>
                    </div>
                    <div class="form-group"><label>Số Tiền</label><input type="number" v-model="form.amount" step="1000"></div>
                     <div class="form-group"><label>Mô tả</label><input type="text" v-model="form.description" placeholder="Chi tiết..."></div>
                    <div class="form-actions"><button class="btn btn-primary" @click="save">Lưu</button></div>
                </div>
            </div>
        </div>

        <!-- Settings Modal -->
        <div class="modal" v-if="showSettingsModal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Cài Đặt Thanh Toán</h2>
                    <button class="modal-close" @click="showSettingsModal = false">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Số điện thoại MoMo nhận tiền</label>
                        <input type="text" v-model="tempSettings.momoPhone" placeholder="09xxxxxxxx">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" @click="saveSettings">Lưu Cài Đặt</button>
                </div>
            </div>
        </div>

        <!-- Payment Modal -->
        <div class="modal" v-if="showPaymentModal" style="display: flex;">
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>Thanh toán MoMo</h2>
                    <button class="modal-close" @click="showPaymentModal = false">×</button>
                </div>
                <div class="modal-body">
                    <!-- Error Display -->
                    <div v-if="momoError" class="alert alert-danger">
                        ⚠ {{ momoError }}
                    </div>

                    <!-- Loading State -->
                    <div v-if="momoLoading" class="loading-state">
                        <div class="spinner"></div>
                        <p>Đang tạo mã thanh toán...</p>
                    </div>

                    <!-- No Configuration -->
                    <div v-else-if="!isBusinessAPIConfigured && !settings.momoPhone">
                        <p class="text-danger">⚠ Chưa cấu hình thanh toán MoMo</p>
                        <button class="btn btn-primary" @click="showSettingsModal = true; showPaymentModal = false">Cài đặt ngay</button>
                    </div>

                    <!-- Payment Display -->
                    <div v-else-if="paymentTarget.qrCodeUrl">
                        <!-- Payment Method Badge -->
                        <div class="payment-method-badge">
                            <span v-if="paymentTarget.method === 'business_api'" class="badge badge-success">
                                🔄 Tự động cập nhật
                            </span>
                            <span v-else class="badge badge-warning">
                                ✋ Xác nhận thủ công
                            </span>
                        </div>

                        <p style="text-align: center; margin: 1rem 0;">
                            Quét mã để thanh toán cho <strong>{{ paymentTarget.name }}</strong>
                        </p>
                        
                        <div class="qr-container" style="text-align: center;">
                            <img :src="paymentTarget.qrCodeUrl" alt="MoMo QR" style="width: 250px; height: 250px; border-radius: 10px;">
                        </div>
                        
                        <div class="payment-amount" style="text-align: center; margin: 1rem 0;">
                            <span>Số tiền: </span>
                            <strong style="font-size: 1.5rem; color: var(--primary-400);">{{ formatCurrency(paymentTarget.amount) }}</strong>
                        </div>
                        
                        <p class="payment-note" style="text-align: center;">{{ paymentTarget.note }}</p>
                        
                        <!-- Business API: Show status checker -->
                        <div v-if="paymentTarget.method === 'business_api'" class="api-payment-actions">
                            <div class="info-box">
                                <p>✅ Giao dịch sẽ tự động được cập nhật vào hệ thống sau khi thanh toán thành công</p>
                                <p style="font-size: 0.9rem; color: var(--text-muted);">Mã đơn: {{ paymentTarget.orderId }}</p>
                            </div>
                            
                            <button class="btn btn-secondary btn-sm" @click="handleCheckStatus" :disabled="momoLoading">
                                {{ momoLoading ? 'Đang kiểm tra...' : '🔍 Kiểm tra trạng thái' }}
                            </button>
                        </div>

                        <!-- Personal Method: Show manual confirm -->
                        <div v-else class="manual-payment-actions">
                            <div class="info-box warning">
                                <p>⚠ Sau khi chuyển tiền, vui lòng nhấn "Xác nhận đã thanh toán" để cập nhật vào hệ thống</p>
                            </div>
                            
                            <button class="btn btn-success full-width" @click="handleManualConfirm">
                                ✓ Xác nhận đã thanh toán
                            </button>
                        </div>
                        
                        <div class="action-buttons" style="margin-top: 15px;">
                            <a :href="paymentTarget.deepLink" target="_blank" class="btn btn-primary full-width">
                                Mở ứng dụng MoMo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useMoMo } from '../composables/useMoMo';

const { transactions, stats, members, getMemberName, addTransaction, deleteTransaction, contributionTiers, matches, settings, updateSettings } = useAppState();

const {
    isLoading: momoLoading,
    error: momoError,
    currentPayment: momoPayment,
    isBusinessAPIConfigured,
    isPersonalConfigured,
    createPayment,
    checkPaymentStatus,
    manuallyConfirmPayment
} = useMoMo();

const activeTab = ref('debts'); // Default to debts view as requested
const showModal = ref(false);
const showSettingsModal = ref(false);
const showPaymentModal = ref(false);
const activeDropdown = ref(null); // For dropdown menu control

const tempSettings = reactive({ momoPhone: '' });
watch(showSettingsModal, (val) => {
    if (val) tempSettings.momoPhone = settings.value.momoPhone || '';
});

const paymentTarget = reactive({
    name: '',
    amount: 0,
    note: ''
});

const form = reactive({ id: null, date: '', type: 'income', category: '', description: '', amount: 0, memberId: null });

const incomeCategories = [
    { value: 'fund', label: 'Quỹ tháng' },
    { value: 'fine', label: 'Tiền phạt' },
    { value: 'sponsor', label: 'Tài trợ' },
    { value: 'other', label: 'Khác' }
];

const saveSettings = () => {
    updateSettings({ momoPhone: tempSettings.momoPhone });
    showSettingsModal.value = false;
};

const openPaymentModal = async (member) => {
    const totalDebt = member.fundMissing + member.fineMissing;
    paymentTarget.name = member.name;
    paymentTarget.amount = totalDebt;
    paymentTarget.note = `${member.name} dong quy`;
    paymentTarget.memberId = member.id;
    
    // Determine category based on what's owed
    const category = member.fundMissing > 0 ? 'fund' : 'fine';
    
    // Create payment using smart router
    const payment = await createPayment({
        memberId: member.id,
        memberName: member.name,
        amount: totalDebt,
        category
    });
    
    if (payment) {
        // Store payment info for modal
        paymentTarget.qrCodeUrl = payment.qrCodeUrl;
        paymentTarget.deepLink = payment.deepLink;
        paymentTarget.payUrl = payment.payUrl;
        paymentTarget.orderId = payment.orderId;
        paymentTarget.method = payment.method;
    }
    
    showPaymentModal.value = true;
};

// Generate QR Code URL (using quickchart.io or similar for simplicity, or vietqr.io)
// Format 2.momo.vn is dynamic QR. 
// However, the best personal link is https://me.momo.vn/PHONE?amount=...
// We can encode this URL into a generic QR.
const qrCodeUrl = computed(() => {
    const link = `https://me.momo.vn/${settings.value.momoPhone}?amount=${paymentTarget.amount}&comment=${encodeURIComponent(paymentTarget.note)}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(link)}`;
});

const momoDeepLink = computed(() => {
    // This deep link scheme works on some devices, otherwise falls back to web
    return `https://me.momo.vn/${settings.value.momoPhone}?amount=${paymentTarget.amount}&comment=${encodeURIComponent(paymentTarget.note)}`;
});
const expenseCategories = [
    { value: 'pitch', label: 'Thuê sân' },
    { value: 'water', label: 'Nước uống' },
    { value: 'equipment', label: 'Dụng cụ' },
    { value: 'party', label: 'Liên hoan' },
    { value: 'other', label: 'Khác' }
];

const availableCategories = computed(() => {
    return form.type === 'income' ? incomeCategories : expenseCategories;
});

// Calculate Member Stats (Debts)
const memberStats = computed(() => {
    // Basic settings (Should be moved to settings db later)
    const startDate = new Date('2026-01-01');
    const currentDate = new Date();
    // Calculate months elapsed since start of year/season
    const monthsDiff = Math.max(1, Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 30)) + 1);

    return members.value.map(m => {
        // 1. Calculate Fund
        let tier = contributionTiers.value.find(t => t.id === m.contributionTierId);
        // Default tier if not set (fallback)
        if (!tier) tier = { monthlyFee: 0, name: 'Không xác định' };

        const fundRequired = tier.monthlyFee * monthsDiff;
        
        // Use member.fundPaid directly (updated when admin approves)
        const fundPaid = m.fundPaid || 0;
            
        const fundMissing = Math.max(0, fundRequired - fundPaid);

        // 2. Calculate Fine
        let fineRequired = 0;
        matches.value.forEach(match => {
            if (match.attendance && match.attendance[m.id]) {
                const att = match.attendance[m.id];
                if (att.status === 'ABSENT') {
                    fineRequired += 50000;
                } else if (att.isLate) {
                    fineRequired += 20000;
                }
            }
        });

        // Use member.fines directly (updated when admin approves)
        const finePaid = m.fines || 0;

        const fineMissing = Math.max(0, fineRequired - finePaid);

        return {
            ...m,
            fundPaid,
            fundRequired,
            fundMissing,
            finePaid,
            fineRequired,
            fineMissing
        };
    }).sort((a, b) => (b.fundMissing + b.fineMissing) - (a.fundMissing + a.fineMissing)); // Sort by debt desc
});

const totalFundDebt = computed(() => memberStats.value.reduce((sum, m) => sum + m.fundMissing, 0));
const totalFineDebt = computed(() => memberStats.value.reduce((sum, m) => sum + m.fineMissing, 0));

const sortedTransactions = computed(() => {
    return [...transactions.value].sort((a, b) => new Date(b.date) - new Date(a.date));
});

const openModal = (type) => {
    form.id = null;
    form.type = type;
    form.date = new Date().toISOString().split('T')[0];
    form.amount = 0;
    form.category = availableCategories.value[0].value;
    form.memberId = null;
    form.description = '';
    showModal.value = true;
};

const closeModal = () => showModal.value = false;

const save = () => {
    // Auto fill description if empty based on category
    if (!form.description) {
        const cat = availableCategories.value.find(c => c.value === form.category);
        form.description = cat ? cat.label : form.category;
    }
    
    addTransaction({ ...form });
    closeModal();
};

const handleDelete = (id) => {
    if (confirm('Xóa giao dịch này?')) deleteTransaction(id);
};

const quickPayAll = (member) => {
    if (!confirm(`Xác nhận đóng hết nợ cho ${member.name}?
    - Còn thiếu Quỹ: ${formatCurrency(member.fundMissing)}
    - Còn thiếu Phạt: ${formatCurrency(member.fineMissing)}`)) {
        return;
    }

    const date = new Date().toISOString().split('T')[0];

    // Pay Fund
    if (member.fundMissing > 0) {
        addTransaction({
            type: 'income',
            category: 'fund',
            amount: member.fundMissing,
            description: `Đóng bù quỹ tháng (Auto)`,
            date,
            memberId: member.id
        });
    }

    // Pay Fine
    if (member.fineMissing > 0) {
        addTransaction({
            type: 'income',
            category: 'fine',
            amount: member.fineMissing,
            description: `Đóng bù tiền phạt (Auto)`,
            date,
            memberId: member.id
        });
    }
};

// Handle checking payment status (for Business API)
const handleCheckStatus = async () => {
    if (!paymentTarget.orderId) return;
    
    const status = await checkPaymentStatus(paymentTarget.orderId);
    
    if (status && status.success) {
        if (status.status === 'SUCCESS') {
            alert('✅ Thanh toán thành công! Giao dịch đã được cập nhật vào hệ thống.');
            showPaymentModal.value = false;
        } else if (status.status === 'PENDING') {
            alert('⏳ Giao dịch đang chờ xử lý...');
        } else {
            alert(`❌ Giao dịch không thành công: ${status.message}`);
        }
    } else {
        alert('⚠ Không thể kiểm tra trạng thái giao dịch. Vui lòng thử lại sau.');
    }
};

// Handle manual payment confirmation (for Personal method)
const handleManualConfirm = async () => {
    if (!confirm(`Xác nhận bạn đã chuyển tiền thành công cho ${paymentTarget.name}?`)) {
        return;
    }
    
    const success = await manuallyConfirmPayment({
        memberId: paymentTarget.memberId,
        memberName: paymentTarget.name,
        amount: paymentTarget.amount,
        category: paymentTarget.fundMissing > 0 ? 'fund' : 'fine',
        note: paymentTarget.note
    });
    
    if (success) {
        alert('✅ Đã xác nhận thanh toán thành công!');
        showPaymentModal.value = false;
    } else {
        alert('❌ Có lỗi xảy ra. Vui lòng thử lại.');
    }
};

// Dropdown control
const toggleDropdown = (memberId) => {
    activeDropdown.value = activeDropdown.value === memberId ? null : memberId;
};

const closeDropdown = () => {
    activeDropdown.value = null;
};

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-wrapper')) {
            closeDropdown();
        }
    });
}

// Pay fund only (manual)
const quickPayFund = (member) => {
    if (!confirm(`Xác nhận đóng quỹ cho ${member.name}?\nSố tiền: ${formatCurrency(member.fundMissing)}`)) {
        return;
    }

    const date = new Date().toISOString().split('T')[0];
    
    addTransaction({
        type: 'income',
        category: 'fund',
        amount: member.fundMissing,
        description: `Đóng quỹ tháng (Tiền mặt)`,
        date,
        memberId: member.id
    });
};

// Pay fine only (manual)
const quickPayFine = (member) => {
    if (!confirm(`Xác nhận đóng phạt cho ${member.name}?\nSố tiền: ${formatCurrency(member.fineMissing)}`)) {
        return;
    }

    const date = new Date().toISOString().split('T')[0];
    
    addTransaction({
        type: 'income',
        category: 'fine',
        amount: member.fineMissing,
        description: `Đóng tiền phạt (Tiền mặt)`,
        date,
        memberId: member.id
    });
};

// Utils
const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
const formatDate = (str) => { if (!str) return ''; const d = new Date(str); return d.toLocaleDateString('vi-VN'); };
const getStatusText = (m) => {
    if (m.fineMissing > 0) return 'Nợ Phạt';
    if (m.fundMissing > 0) return 'Nợ Quỹ';
    return 'Đủ';
};
const getBadgeClass = (t) => {
    if (t.type === 'expense') return 'badge-danger';
    if (t.category === 'fund') return 'badge-info';
    if (t.category === 'fine') return 'badge-warning';
    return 'badge-success';
};
const getCategoryLabel = (t) => {
    const allCats = [...incomeCategories, ...expenseCategories];
    const cat = allCats.find(c => c.value === t.category);
    return cat ? cat.label : t.category;
};
</script>

<style scoped>
.tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
}

.tab-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    padding: 0.5rem 1rem;
    font-weight: 600;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
}

.tab-btn.active {
    color: var(--primary-400);
    border-bottom-color: var(--primary-400);
}

.summary-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-left: 0.5rem;
    display: inline-block;
}
.summary-badge.warning { background: rgba(234, 179, 8, 0.2); color: #facc15; }
.summary-badge.danger { background: rgba(239, 68, 68, 0.2); color: #f87171; }

.debt-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.9rem;
}

.debt-amount {
    font-size: 0.75rem;
    font-weight: 600;
    margin-top: 2px;
}

.text-warning { color: #facc15; }
.text-danger { color: #f87171; }
.text-success { color: #4ade80; }
.text-center { text-align: center; }
.font-medium { font-weight: 500; }

.separator { color: var(--text-muted); margin: 0 4px; }
.required { color: var(--text-muted); font-size: 0.85em; }

.card-actions {
    display: flex;
    gap: 0.5rem;
}

.btn-info {
    background-color: #a50064; /* MoMo color */
    color: white;
}
.full-width {
    width: 100%;
    display: block;
    text-align: center;
    text-decoration: none;
}
.payment-amount {
    margin: 1rem 0;
    font-size: 1.2rem;
}
.payment-note {
    color: var(--text-muted);
    font-style: italic;
    font-size: 0.9rem;
}

/* MoMo Payment Styles */
.payment-method-badge {
    text-align: center;
    margin-bottom: 1rem;
}

.loading-state {
    text-align: center;
    padding: 2rem;
}

.spinner {
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top: 3px solid var(--primary-400);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.info-box {
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 0.9rem;
}

.info-box.warning {
    background: rgba(234, 179, 8, 0.1);
    border-color: rgba(234, 179, 8, 0.3);
}

.info-box p {
    margin: 0.5rem 0;
}

.api-payment-actions,
.manual-payment-actions {
    margin-top: 1rem;
}

.api-payment-actions button,
.manual-payment-actions button {
    margin-top: 0.5rem;
}

.alert {
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.alert-danger {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #f87171;
}

.btn-secondary {
    background-color: var(--surface-300);
    color: var(--text-primary);
}

.btn-secondary:hover {
    background-color: var(--surface-400);
}

.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

/* Action Buttons Group */
.action-buttons-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.btn-icon {
    margin-right: 0.25rem;
}

/* Dropdown Menu */
.dropdown-wrapper {
    position: relative;
    display: inline-block;
}

.dropdown-toggle {
    padding: 0.5rem 0.75rem !important;
    font-size: 1.2rem;
    font-weight: bold;
    min-width: 36px;
    cursor: pointer;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: var(--surface-100);
    border: 2px solid rgba(139, 92, 246, 0.3);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5),
                0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    min-width: 260px;
    z-index: 1000;
    overflow: hidden;
    animation: dropdownSlideIn 0.2s ease-out;
    backdrop-filter: blur(12px);
}

@keyframes dropdownSlideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dropdown-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 1.25rem;
    background: transparent;
    border: none;
    color: var(--text-primary);
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1rem;
    font-weight: 500;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    position: relative;
}

.dropdown-item:last-child {
    border-bottom: none;
}

.dropdown-item:hover {
    background: linear-gradient(90deg, 
        rgba(139, 92, 246, 0.15),
        rgba(59, 130, 246, 0.15));
    color: var(--primary-300);
    padding-left: 1.5rem;
}

.dropdown-item:active {
    background: linear-gradient(90deg, 
        rgba(139, 92, 246, 0.25),
        rgba(59, 130, 246, 0.25));
    transform: scale(0.98);
}

.dropdown-icon {
    margin-right: 0.75rem;
    font-size: 1.25rem;
    filter: drop-shadow(0 0 4px rgba(139, 92, 246, 0.5));
}

/* Improved button styling */
.btn-primary {
    background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
    border: none;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}

.btn-primary:hover {
    background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
    transform: translateY(-1px);
}

.btn-secondary {
    background-color: var(--surface-300);
    color: var(--text-primary);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
    background-color: var(--surface-400);
    border-color: rgba(255, 255, 255, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .action-buttons-group {
        flex-direction: column;
        width: 100%;
    }
    
    .action-buttons-group .btn {
        width: 100%;
    }
    
    .dropdown-menu {
        right: auto;
        left: 0;
    }
}


</style>
