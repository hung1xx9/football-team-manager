<template>
    <div class="page-content">
        <div class="tabs">
            <button class="tab-btn" :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">
                Tổng Quan
            </button>
            <button class="tab-btn" :class="{ active: activeTab === 'debts' }" @click="activeTab = 'debts'">
                Tình Hình Đóng Quỹ
            </button>
            <button class="tab-btn" :class="{ active: activeTab === 'monthly-fund' }" @click="activeTab = 'monthly-fund'">
                Theo Tháng
            </button>
            <button class="tab-btn" :class="{ active: activeTab === 'per-match' }" @click="activeTab = 'per-match'">
                Theo Trận
            </button>
            <button class="tab-btn" :class="{ active: activeTab === 'pending' }" @click="activeTab = 'pending'">
                Duyệt Giao Dịch
                <span v-if="pendingCount > 0" class="tab-badge">{{ pendingCount }}</span>
            </button>
            <button class="tab-btn" :class="{ active: activeTab === 'transactions' }" @click="activeTab = 'transactions'">
                Lịch Sử Giao Dịch
            </button>
        </div>

        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="tab-content animate-fade">
            <div class="stats-grid">
                <div class="stat-card stat-success animate-spring animate-stagger-1">
                    <div class="stat-content">
                        <div class="stat-label">Tổng Thu</div>
                        <div class="stat-value">{{ formatCurrency(stats.totalIncome) }}</div>
                    </div>
                </div>
                <div class="stat-card stat-danger animate-spring animate-stagger-2">
                    <div class="stat-content">
                        <div class="stat-label">Tổng Chi</div>
                        <div class="stat-value">{{ formatCurrency(stats.totalExpense) }}</div>
                    </div>
                </div>
                <div class="stat-card animate-spring animate-stagger-3">
                    <div class="stat-content">
                        <div class="stat-label">Tổng Dư Nợ (Phải Thu)</div>
                        <div class="stat-value text-danger">{{ formatCurrency(stats.totalUnpaidReceivables) }}</div>
                    </div>
                </div>
                <div class="stat-card stat-info animate-spring animate-stagger-4">
                    <div class="stat-content">
                        <div class="stat-label">Số Dư</div>
                        <div class="stat-value">{{ formatCurrency(stats.balance) }}</div>
                    </div>
                </div>
            </div>
            <div class="page-actions">
                <button class="btn btn-hero btn-hero-income" @click="openTransactionModal('income')" style="flex: 1; max-width: 300px;">
                    <div class="btn-hero-icon">💰</div>
                    <span class="btn-hero-text">Ghi Thu</span>
                </button>
                <button class="btn btn-hero btn-hero-expense" @click="openTransactionModal('expense')" style="flex: 1; max-width: 300px;">
                    <div class="btn-hero-icon">💸</div>
                    <span class="btn-hero-text">Ghi Chi</span>
                </button>
            </div>
        </div>

        <!-- Debts Tab -->
        <div v-if="activeTab === 'debts'" class="tab-content">
            <div class="card" style="margin-bottom: var(--spacing-6); overflow: visible;">
                <div class="card-header">
                    <h2>👥 Quỹ Theo Tháng</h2>
                    <div class="card-actions">
                        <div class="summary-badge warning">Tổng Nợ Quỹ: {{ formatCurrency(totalFundDebt) }}</div>
                        <div class="summary-badge danger">Tổng Nợ Phạt: {{ formatCurrency(totalFineDebt) }}</div>
                    </div>
                </div>
                <div class="card-content">
                    <div v-if="monthlyMembers.length === 0" style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary);">
                        Chưa có thành viên đóng quỹ theo tháng
                    </div>
                    <template v-else>
                        <!-- Desktop Table View -->
                        <div v-if="!isMobile" class="table-container">
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
                                    <tr v-for="(member, index) in monthlyMembers" :key="member.id" :class="{ 'active-row': activeDropdownId === member.id }" class="list-item-animate" :style="{ animationDelay: (0.1 + index * 0.03) + 's' }">
                                        <td class="font-medium">{{ member.name }}</td>
                                        <td class="text-center">
                                            <div class="debt-cell">
                                                <span class="paid" title="Đã đóng">{{ formatCurrency(member.fundPaid) }}</span>
                                                <span class="separator">/</span>
                                                <span class="required" title="Phải đóng">{{ formatCurrency(member.fundRequired) }}</span>
                                                <div v-if="member.fundMissing > 0" class="debt-amount text-warning">
                                                    Thiếu: {{ formatCurrency(member.fundMissing) }}
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <div class="debt-cell">
                                                <span class="paid" title="Đã đóng">{{ formatCurrency(member.finePaid) }}</span>
                                                <span class="separator">/</span>
                                                <span class="required" title="Phải đóng">{{ formatCurrency(member.fineRequired) }}</span>
                                                <div v-if="member.fineMissing > 0" class="debt-amount text-danger">
                                                    Thiếu: {{ formatCurrency(member.fineMissing) }}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="badge" :class="getStatusBadgeClass(member)">
                                                {{ member.statusText }}
                                            </span>
                                        </td>
                                        <td>
                                            <div v-if="member.fundMissing > 0 || member.fineMissing > 0" class="action-buttons-group">
                                                <div class="dropdown-wrapper">
                                                    <button class="btn btn-sm btn-ghost" @click.stop="toggleDropdown($event, member.id)" style="padding: 0 8px;">
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;">
                                                            <circle cx="12" cy="12" r="1"></circle>
                                                            <circle cx="12" cy="5" r="1"></circle>
                                                            <circle cx="12" cy="19" r="1"></circle>
                                                        </svg>
                                                    </button>
                                                    <div v-if="activeDropdownId === member.id" class="dropdown-menu" :class="{ 'open-up': dropdownDirection === 'up' }">
                                                        <button class="dropdown-item" @click="handleAutoClear(member)">
                                                            💵 Thu tiền mặt (xóa nợ)
                                                        </button>
                                                        <button v-if="member.fundMissing > 0" class="dropdown-item" @click="handleManualPayment(member, 'fund')">
                                                            💰 Đóng Quỹ Tháng
                                                        </button>
                                                        <button v-if="member.fineMissing > 0" class="dropdown-item" @click="handleManualPayment(member, 'fine')">
                                                            🚩 Đóng Tiền Phạt
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else class="text-success" style="font-weight: 600; font-size: 13px;">✔ Hoàn tất</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Mobile Cards View -->
                        <div v-else class="mobile-finance-list">
                            <div v-for="(member, index) in monthlyMembers" :key="member.id" class="finance-card-simple list-item-animate" :style="{ animationDelay: (0.1 + index * 0.04) + 's' }">
                                <div class="card-header-simple">
                                    <span class="member-name">{{ member.name }}</span>
                                    <span class="badge" :class="getStatusBadgeClass(member)">{{ member.statusText }}</span>
                                </div>
                                <div class="card-body-simple">
                                    <div class="finance-row">
                                        <span class="label">Quỹ Tháng:</span>
                                        <div class="value-group">
                                            <span class="paid">{{ formatCurrency(member.fundPaid) }}</span>
                                            <span class="total">/ {{ formatCurrency(member.fundRequired) }}</span>
                                        </div>
                                    </div>
                                    <div class="finance-row">
                                        <span class="label">Tiền Phạt:</span>
                                        <div class="value-group">
                                            <span class="paid">{{ formatCurrency(member.finePaid) }}</span>
                                            <span class="total">/ {{ formatCurrency(member.fineRequired) }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer-simple" v-if="member.fundMissing > 0 || member.fineMissing > 0">
                                    <button class="btn btn-sm btn-success" @click="handleAutoClear(member)">Thu Mặt</button>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <!-- Monthly Fund Tab -->
        <div v-if="activeTab === 'monthly-fund'" class="tab-content">
            <div class="card">
                <div class="card-header">
                    <h2>Danh Sách Đóng Quỹ Theo Tháng</h2>
                    <div class="card-actions">
                        <BaseSelect 
                            v-model="selectedYear"
                            :options="yearOptions"
                            style="min-width: 140px;"
                        />
                    </div>
                </div>
                <div class="card-content">
                    <div class="statistics-summary">
                        <div class="mf-stat-card">
                            <div class="mf-stat-icon">👥</div>
                            <div class="mf-stat-info">
                                <div class="stat-label">Thành viên đóng quỹ tháng</div>
                                <div class="stat-value">{{ monthlyMembersForFund.length }}</div>
                            </div>
                        </div>
                        <div class="mf-stat-card success">
                            <div class="mf-stat-icon">✅</div>
                            <div class="mf-stat-info">
                                <div class="stat-label">Đã thu năm {{ selectedYear }}</div>
                                <div class="stat-value">{{ formatCurrency(actualYearlyTotal) }}</div>
                            </div>
                        </div>
                        <div class="mf-stat-card warning">
                            <div class="mf-stat-icon">⏳</div>
                            <div class="mf-stat-info">
                                <div class="stat-label">Còn thiếu (đến T{{ currentMonth }})</div>
                                <div class="stat-value">{{ formatCurrency(mfTotalMissing) }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="table-wrapper">
                        <table class="monthly-fund-table">
                            <thead>
                                <tr>
                                    <th class="mf-sticky-col" rowspan="2">STT</th>
                                    <th class="mf-sticky-col mf-name-col" rowspan="2">HỌ VÀ TÊN</th>
                                    <th rowspan="2">Mức đóng/tháng</th>
                                    <th colspan="12" class="months-header">Tháng {{ selectedYear }}</th>
                                </tr>
                                <tr>
                                    <th v-for="m in 12" :key="m" class="month-col" :class="{ 'current-month': m === currentMonth && selectedYear === currentYear }">T{{ m }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(member, index) in sortedMonthlyMembersForFund" :key="member.id">
                                    <td class="mf-sticky-col text-center">{{ index + 1 }}</td>
                                    <td class="mf-sticky-col mf-name-col">
                                        <div class="member-info">
                                            {{ member.name }}
                                            <span v-if="member.contributionTierId" class="tier-badge-small" :style="getMFTierStyle(member.contributionTierId)">{{ getMFTierName(member.contributionTierId) }}</span>
                                        </div>
                                    </td>
                                    <td class="text-right" style="font-weight:600;">{{ formatCurrency(getMonthlyFee(member)) }}</td>
                                    <td v-for="m in 12" :key="m" class="month-cell" :class="{ 'future-month': isFutureMonth(m) }">
                                        <label class="checkbox-wrapper" :class="{ disabled: isFutureMonth(m) }">
                                            <input type="checkbox" :checked="isMFPaid(member.id, m)" @change="toggleMFPayment(member.id, m, $event)" :disabled="isFutureMonth(m)">
                                            <span class="checkmark"></span>
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="summary-row">
                                    <td colspan="3" class="mf-sticky-col" style="text-align:right;">Số người đã đóng</td>
                                    <td v-for="m in 12" :key="m" class="text-center" :class="{ 'future-month': isFutureMonth(m) }">
                                        <span v-if="isFutureMonth(m)">-</span>
                                        <span v-else>{{ getMFPaidCount(m) }}/{{ monthlyMembersForFund.length }}</span>
                                    </td>
                                </tr>
                                <tr class="amount-summary-row">
                                    <td colspan="3" class="mf-sticky-col" style="text-align:right;">Tổng thu tháng</td>
                                    <td v-for="m in 12" :key="m" class="text-center" :class="{ 'future-month': isFutureMonth(m) }">
                                        <span v-if="!isFutureMonth(m) && getMFPaidAmount(m) > 0">{{ formatCurrency(getMFPaidAmount(m)) }}</span>
                                        <span v-else>-</span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Per Match Tab -->
        <div v-if="activeTab === 'per-match'" class="tab-content">
            <div class="card">
                <div class="card-header">
                    <h2>📋 Tổng Hợp Tất Cả Trận</h2>
                    <div class="card-actions">
                        <span class="badge badge-success">Tổng thu: {{ formatCurrency(pmGrandTotalCollected) }}</span>
                    </div>
                </div>
                <div class="card-content">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Địa Điểm</th>
                                    <th class="text-center">Số người</th>
                                    <th class="text-center">Phải thu</th>
                                    <th class="text-center">Đã thu</th>
                                    <th class="text-center">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="stat in pmDisplayedStats" :key="stat.id" @click="pmOpenDetail(stat.id)" style="cursor:pointer;" :class="{ 'selected-row': pmSelectedMatchId === stat.id }">
                                    <td>{{ pmFormatDate(stat.date) }}</td>
                                    <td>{{ stat.location || 'Sân đấu' }}</td>
                                    <td class="text-center">{{ stat.attendedPerMatchPlayers }} người</td>
                                    <td class="text-center"><strong class="text-success">{{ formatCurrency(stat.totalRevenue) }}</strong></td>
                                    <td class="text-center"><strong class="text-primary">{{ formatCurrency(stat.totalCollected) }}</strong></td>
                                    <td class="text-center">
                                        <span v-if="stat.totalCollected >= stat.totalRevenue && stat.totalRevenue > 0" class="badge badge-success">✔ Đủ</span>
                                        <span v-else-if="stat.totalCollected > 0" class="badge badge-warning">⏳ Thiếu</span>
                                        <span v-else class="badge badge-danger">✗ Chưa thu</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div v-if="pmHasMore" style="text-align: center; margin-top: 16px; margin-bottom: 16px; color: var(--text-muted); font-size: 14px; font-weight: 500;">
                            <div class="spinner" style="width: 20px; height: 20px; display: inline-block; margin-right: 8px; vertical-align: middle;"></div>
                            Đang tải thêm trận đấu...
                        </div>
                        <div v-else-if="pmDisplayedStats.length > 0" style="text-align: center; margin-top: 16px; margin-bottom: 16px; color: var(--text-muted); font-size: 13px;">
                            Đã hiển thị tất cả các trận
                        </div>
                        <div ref="pmBottomSentinel" style="height: 1px;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pending Transactions Tab -->
        <div v-if="activeTab === 'pending'" class="tab-content">
            <div class="card">
                <div class="card-header">
                    <h2>Duyệt Giao Dịch</h2>
                </div>
                <div class="card-content">
                    <div v-if="pendingTransactions.length === 0" style="padding: 3rem; text-align: center; color: var(--text-secondary);">
                        Không có yêu cầu chờ duyệt
                    </div>
                    <div v-else class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Thời Gian</th>
                                    <th>Thành Viên</th>
                                    <th>Nội Dung</th>
                                    <th class="text-right">Số Tiền</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tx in pendingTransactions" :key="tx.id">
                                    <td>{{ formatFullDateTime(tx.date) }}</td>
                                    <td class="font-medium">{{ getMemberName(tx.memberId) }}</td>
                                    <td>
                                        <span class="badge" :class="getCategoryClass(tx)">{{ tx.category === 'fund' ? 'Quỹ' : 'Phạt' }}</span>
                                        {{ tx.description }}
                                    </td>
                                    <td class="text-right font-bold text-success">{{ formatCurrency(tx.amount) }}</td>
                                    <td>
                                        <div class="action-buttons-group">
                                            <button class="btn btn-sm btn-success" @click="handleApprove(tx)">Duyệt</button>
                                            <button class="btn btn-sm btn-danger" @click="handleReject(tx)">Hủy</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Transactions Tab -->
        <div v-if="activeTab === 'transactions'" class="tab-content">
            <div class="card">
                <div class="card-content">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Loại</th>
                                    <th>Thành Viên</th>
                                    <th>Mô Tả</th>
                                    <th class="text-right">Số Tiền</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tx, index) in txDisplayedStats" :key="tx.id" class="list-item-animate" :style="{ animationDelay: (0.1 + index * 0.03) + 's' }">
                                    <td>{{ formatDate(tx.date) }}</td>
                                    <td>
                                        <span class="badge" :class="getCategoryClass(tx)">
                                            {{ getCategoryLabel(tx) }}
                                        </span>
                                    </td>
                                    <td>{{ getMemberName(tx.memberId) || '—' }}</td>
                                    <td>{{ tx.description }}</td>
                                    <td class="text-right font-bold" :class="tx.type === 'income' ? 'text-success' : 'text-danger'">
                                        {{ tx.type === 'income' ? '+' : '-' }}{{ formatCurrency(tx.amount) }}
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-ghost text-danger" @click="handleDeleteTransaction(tx.id)">Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div v-if="txHasMore" style="text-align: center; margin-top: 16px; margin-bottom: 16px; color: var(--text-muted); font-size: 14px; font-weight: 500;">
                            <div class="spinner" style="width: 20px; height: 20px; display: inline-block; margin-right: 8px; vertical-align: middle;"></div>
                            Đang tải thêm giao dịch...
                        </div>
                        <div v-else-if="txDisplayedStats.length > 0" style="text-align: center; margin-top: 16px; margin-bottom: 16px; color: var(--text-muted); font-size: 13px;">
                            Đã hiển thị tất cả các giao dịch
                        </div>
                        <div ref="txBottomSentinel" style="height: 1px;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Transaction Modal -->
        <div v-if="showModal" class="modal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ form.type === 'income' ? '💰 Thêm Khoản Thu' : '💸 Thêm Khoản Chi' }}</h2>
                    <button class="modal-close" @click="closeModal">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Ngày Giao Dịch</label>
                        <input type="date" v-model="form.date">
                    </div>
                    <div class="form-group">
                        <label>Phân Loại</label>
                        <BaseSelect 
                            v-model="form.category"
                            :options="currentCategories"
                            placeholder="Chọn phân loại..."
                        />
                    </div>
                    <div v-if="form.type === 'income'" class="form-group">
                        <label>Thành Viên Kèm Theo</label>
                        <BaseSelect 
                            v-model="form.memberId"
                            :options="memberOptions"
                            placeholder="-- Không bắt buộc --"
                        />
                    </div>
                    <div class="form-group">
                        <label>Số Tiền (VNĐ)</label>
                        <input type="number" v-model.number="form.amount" placeholder="Ví dụ: 500000" style="font-size: 1.1rem; font-weight: bold; color: var(--primary-600);">
                    </div>
                    <div class="form-group">
                        <label>Ghi Chú Chi Tiết</label>
                        <input type="text" v-model="form.description" placeholder="Nhập ghi chú chi tiết...">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="closeModal">Hủy Bỏ</button>
                    <button class="btn btn-primary" @click="handleSaveTransaction">Lưu Giao Dịch</button>
                </div>
            </div>
        </div>

        <!-- Per Match Detail Modal -->
        <div v-if="showPMDetailModal" class="modal" style="display: flex;">
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2>⚽ Chi Tiết Thu Tiền - {{ pmFormatDate(pmDetailMatch?.date) }}</h2>
                    <button class="modal-close" @click="showPMDetailModal = false">×</button>
                </div>
                <div class="modal-body">
                    <div v-if="pmDetailMatch" class="stats-grid" style="margin-bottom: 2rem;">
                        <div class="stat-card stat-info"><div class="stat-content"><div class="stat-value">{{ formatCurrency(pmDetailMatchRevenue.totalRevenue) }}</div><div class="stat-label">Tổng phải thu</div></div></div>
                        <div class="stat-card"><div class="stat-content"><div class="stat-value">{{ formatCurrency(pmDetailMatchRevenue.totalCollected) }}</div><div class="stat-label">Đã thu</div></div></div>
                    </div>
                    <div class="table-container" style="max-height: 400px; border: 1px solid var(--border-color);">
                        <table class="data-table">
                            <thead><tr><th>Thành Viên</th><th class="text-center">Giá/Trận</th><th class="text-center">Điểm danh</th><th class="text-center">Đã thu</th><th class="text-center">Hành động</th></tr></thead>
                            <tbody>
                                <tr v-for="player in pmDetailMatchRevenue.players" :key="player.id" :class="{ 'row-absent': !player.attended, 'row-paid': player.attended && player.isPaid }">
                                    <td class="font-medium">{{ player.name }}</td>
                                    <td class="text-center">{{ formatCurrency(player.perMatchFee) }}</td>
                                    <td class="text-center"><span v-if="player.attended" class="badge badge-success">✅ Có mặt</span><span v-else class="badge badge-secondary">❌ Vắng</span></td>
                                    <td class="text-center"><template v-if="player.attended"><span v-if="player.isPaid" class="badge badge-success">✔ Đã thu</span><span v-else class="badge badge-warning">⏳ Chờ</span></template><span v-else class="text-muted">—</span></td>
                                    <td class="text-center"><template v-if="player.attended"><button v-if="!player.isPaid" class="btn btn-sm btn-success" @click="pmCollectFeeModal(player)">💵 Thu</button><button v-else class="btn btn-sm btn-ghost" @click="pmUndoCollectFeeModal(player)">Hoàn</button></template><span v-else class="text-muted">—</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" @click="showPMDetailModal = false">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick, onUnmounted } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useFinancialCalculations } from '../composables/useFinancialCalculations';
import { useAuth } from '../composables/useAuth';
import BaseSelect from '../components/BaseSelect.vue';

const { 
    transactions, stats, members, getMemberName, 
    addTransaction, deleteTransaction, 
    pendingTransactions, approvePendingTransaction, rejectPendingTransaction,
    contributionTiers, matches, getContributionTier,
    receivables
} = useAppState();

const { getStatusText } = useFinancialCalculations();
const { isAdmin, isAccountant } = useAuth();

const props = defineProps({
    initialTab: { type: String, default: 'overview' }
});

const activeTab = ref(props.initialTab);
const showModal = ref(false);
const showPMDetailModal = ref(false);
const pmDetailMatchId = ref(null);
const activeDropdownId = ref(null);
const dropdownDirection = ref('down');

const form = reactive({ id: null, date: '', type: 'income', category: '', description: '', amount: 0, memberId: null });

const incomeCategories = [
    { value: 'fund', label: 'Đóng Quỹ Tháng' },
    { value: 'fine', label: 'Nộp Phạt' },
    { value: 'sponsor', label: 'Ủng Hộ / Tài Trợ' },
    { value: 'other_income', label: 'Thu Nhập Khác' }
];

const expenseCategories = [
    { value: 'pitch', label: 'Tiền Sân' },
    { value: 'water', label: 'Tiền Nước' },
    { value: 'equipment', label: 'Mua Dụng Cụ' },
    { value: 'event', label: 'Tiền Liên Hoan' },
    { value: 'referee', label: 'Tiền Trọng Tài' },
    { value: 'other_expense', label: 'Chi Phí Khác' }
];

const currentCategories = computed(() => form.type === 'income' ? incomeCategories : expenseCategories);
const memberOptions = computed(() => [{ label: '-- Không bắt buộc --', value: null }, ...members.value.map(m => ({ label: m.name, value: m.id }))]);

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const getMemberReceivableStatus = (memberId) => {
    const list = receivables.value.filter(r => r.memberId === memberId);
    const fundR = list.filter(r => r.type === 'fund' || r.type === 'legacy_debt' && r.description.includes('Quỹ'));
    const fineR = list.filter(r => r.type === 'fine' || r.type === 'legacy_debt' && r.description.includes('Phạt'));
    const otherR = list.filter(r => r.type === 'legacy_debt' && !r.description.includes('Quỹ') && !r.description.includes('Phạt'));

    const fundRequired = fundR.reduce((s, r) => s + r.amount, 0);
    const fundPaid = fundR.filter(r => r.status === 'paid').reduce((s, r) => s + r.amount, 0);
    const fineRequired = fineR.reduce((s, r) => s + r.amount, 0);
    const finePaid = fineR.filter(r => r.status === 'paid').reduce((s, r) => s + r.amount, 0);

    const totalDebt = (fundRequired - fundPaid) + (fineRequired - finePaid) + otherR.filter(r => r.status === 'unpaid').reduce((s, r) => s + r.amount, 0);

    return { fundRequired, fundPaid, fundMissing: fundRequired - fundPaid, fineRequired, finePaid, fineMissing: fineRequired - finePaid, totalDebt };
};

const monthlyMembers = computed(() => members.value.filter(m => m.paymentType !== 'per-match').map(m => {
    const status = getMemberReceivableStatus(m.id);
    return { ...m, ...status, statusText: getStatusText(status) };
}).sort((a, b) => b.totalDebt - a.totalDebt));

const perMatchMembers = computed(() => members.value.filter(m => m.paymentType === 'per-match').map(m => {
    const status = getMemberReceivableStatus(m.id);
    return { ...m, ...status, statusText: getStatusText(status) };
}).sort((a, b) => a.name.localeCompare(b.name, 'vi')));

const totalFundDebt = computed(() => monthlyMembers.value.reduce((sum, m) => sum + m.fundMissing, 0));
const totalFineDebt = computed(() => [...monthlyMembers.value, ...perMatchMembers.value].reduce((sum, m) => sum + m.fineMissing, 0));
const sortedTransactions = computed(() => [...transactions.value].sort((a, b) => new Date(b.date) - new Date(a.date)));
const pendingCount = computed(() => pendingTransactions.value.filter(t => t.status === 'pending').length);

const openTransactionModal = (type) => {
    form.type = type; form.date = new Date().toISOString().split('T')[0]; form.amount = 0; form.category = currentCategories.value[0].value; form.memberId = null; form.description = ''; showModal.value = true;
};
const closeModal = () => { showModal.value = false; };
const handleSaveTransaction = async () => { if (!form.description) form.description = currentCategories.value.find(c => c.value === form.category)?.label || form.category; await addTransaction({ ...form }); closeModal(); };
const handleDeleteTransaction = (id) => { if (confirm('Xóa giao dịch này?')) deleteTransaction(id); };

const handleAutoClear = async (member) => {
    if (member.totalDebt <= 0) return;
    if (!confirm(`Xác nhận thu TIỀN MẶT và xóa nợ cho ${member.name}?\nSố tiền: ${formatCurrency(member.totalDebt)}`)) return;
    await addTransaction({ type: 'income', category: 'other', amount: member.totalDebt, description: `Thu tiền mặt xóa nợ - ${member.name}`, date: new Date().toISOString().split('T')[0], memberId: member.id });
    closeDropdown();
};

const toggleDropdown = (event, id) => { activeDropdownId.value = (activeDropdownId.value === id) ? null : id; if (activeDropdownId.value) { const spaceBelow = window.innerHeight - event.currentTarget.getBoundingClientRect().bottom; dropdownDirection.value = (spaceBelow < 200) ? 'up' : 'down'; } };
const closeDropdown = () => { activeDropdownId.value = null; };

const handleManualPayment = (member, category) => {
    form.type = 'income'; form.date = new Date().toISOString().split('T')[0]; form.category = category; form.memberId = member.id;
    form.amount = category === 'fund' ? member.fundMissing : member.fineMissing; form.description = `Đóng ${category === 'fund' ? 'quỹ' : 'phạt'} - ${member.name}`;
    showModal.value = true; closeDropdown();
};

const handleApprove = (tx) => { const amount = prompt(`Xác nhận số tiền thực nhận:`, tx.amount); if (amount) approvePendingTransaction(tx.id, parseInt(amount.replace(/[^0-9]/g, ''))); };
const handleReject = (tx) => { const reason = prompt('Lý do từ chối:'); if (reason !== null) rejectPendingTransaction(tx.id, reason); };

import { useBreakpoints } from '../composables/useBreakpoints';
const { isMobile } = useBreakpoints();

const formatFullDateTime = (ts) => ts ? new Date(ts).toLocaleString('vi-VN') : '';
const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0);
const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('vi-VN') : '';

const getStatusBadgeClass = (m) => (m.fundMissing <= 0 && m.fineMissing <= 0) ? 'badge-success' : (m.fundMissing > 0 && m.fineMissing <= 0 ? 'badge-warning' : 'badge-danger');
const getCategoryLabel = (tx) => [...incomeCategories, ...expenseCategories].find(c => c.value === tx.category)?.label || tx.category;
const getCategoryClass = (tx) => tx.type === 'expense' ? 'badge-danger' : (tx.category === 'fund' ? 'badge-info' : (tx.category === 'fine' ? 'badge-warning' : 'badge-success'));

// Monthly Fund Logic
const selectedYear = ref(currentYear);
const yearOptions = computed(() => [currentYear, currentYear - 1].map(y => ({ label: `Năm ${y}`, value: y })));
const monthlyMembersForFund = computed(() => members.value.filter(m => m.paymentType !== 'per-match'));
const sortedMonthlyMembersForFund = computed(() => [...monthlyMembersForFund.value].sort((a, b) => a.name.localeCompare(b.name, 'vi')));
const isFutureMonth = (m) => selectedYear.value > currentYear || (selectedYear.value === currentYear && m > currentMonth);
const getMonthlyFee = (member) => member.contributionTierId ? (getContributionTier(member.contributionTierId)?.monthlyFee || 0) : (contributionTiers.value[0]?.monthlyFee || 0);

const mfProcessedPayments = computed(() => {
    const map = {};
    transactions.value.forEach(tx => { if (tx.type === 'income' && tx.category === 'monthly_fund' && tx.monthlyFundMeta) map[`${tx.memberId}-${tx.monthlyFundMeta.year}-${tx.monthlyFundMeta.month}`] = tx.id; });
    return map;
});

const isMFPaid = (memberId, month) => mfProcessedPayments.value[`${memberId}-${selectedYear.value}-${month}`] !== undefined;
const getMFPaidCount = (month) => monthlyMembersForFund.value.filter(m => isMFPaid(m.id, month)).length;
const getMFPaidAmount = (month) => transactions.value.filter(t => t.type === 'income' && t.category === 'monthly_fund' && t.monthlyFundMeta?.year === selectedYear.value && t.monthlyFundMeta?.month === month).reduce((sum, t) => sum + t.amount, 0);
const actualYearlyTotal = computed(() => transactions.value.filter(t => t.type === 'income' && t.category === 'monthly_fund' && t.monthlyFundMeta?.year === selectedYear.value).reduce((sum, t) => sum + t.amount, 0));
const mfTotalMissing = computed(() => {
    const end = selectedYear.value < currentYear ? 12 : currentMonth;
    const expected = monthlyMembersForFund.value.reduce((sum, m) => sum + (getMonthlyFee(m) * end), 0);
    return Math.max(0, expected - actualYearlyTotal.value);
});

const toggleMFPayment = async (memberId, month, event) => {
    const checked = event.target.checked; const key = `${memberId}-${selectedYear.value}-${month}`; const member = members.value.find(m => m.id === memberId);
    if (!member) return;
    if (checked) {
        const fee = getMonthlyFee(member); const input = prompt(`Số tiền đóng quỹ T${month}/${selectedYear.value} của ${member.name}:`, fee);
        if (input) await addTransaction({ type: 'income', category: 'monthly_fund', amount: parseInt(input.replace(/[^0-9]/g, '')), description: `Đóng quỹ T${month}/${selectedYear.value} - ${member.name}`, date: new Date(selectedYear.value, month - 1, 1).toISOString(), memberId, monthlyFundMeta: { year: selectedYear.value, month } }); else event.target.checked = false;
    } else {
        const txId = mfProcessedPayments.value[key]; if (txId && confirm('Hủy ghi nhận đóng quỹ này?')) await deleteTransaction(txId); else event.target.checked = true;
    }
};

const getMFTierName = (id) => getContributionTier(id)?.name || '';
const getMFTierStyle = (id) => { const t = getContributionTier(id); return t ? { backgroundColor: t.color + '15', color: t.color, border: `1px solid ${t.color}` } : {}; };

// Per Match Logic
const pmSelectedMatchId = ref(null);
const pmPerMatchMembers = computed(() => members.value.filter(m => m.paymentType === 'per-match'));
const pmIsPaid = (memberId, matchId) => transactions.value.some(t => t.type === 'income' && t.category === 'per_match_fund' && t.memberId === memberId && t.perMatchFundMeta?.matchId === matchId);
const pmFormatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN', { weekday: 'short', month: '2-digit', day: '2-digit' }) : '—';
const pmOpenDetail = (id) => { pmDetailMatchId.value = id; showPMDetailModal.value = true; };
const pmDetailMatch = computed(() => matches.value.find(m => m.id === pmDetailMatchId.value));

const pmAllStats = computed(() => matches.value.map(match => {
    const players = pmPerMatchMembers.value.map(m => ({ id: m.id, fee: m.perMatchFee || 50000, attended: match.attendance?.[m.id]?.status === 'present', paid: pmIsPaid(m.id, match.id) }));
    const attended = players.filter(p => p.attended);
    return { id: match.id, date: match.date, location: match.location, attendedPerMatchPlayers: attended.length, totalRevenue: attended.reduce((a, p) => a + p.fee, 0), totalCollected: attended.filter(p => p.paid).reduce((a, p) => a + p.fee, 0) };
}).sort((a, b) => new Date(b.date) - new Date(a.date)));

const pmDisplayCount = ref(10);
const pmDisplayedStats = computed(() => pmAllStats.value.slice(0, pmDisplayCount.value));
const pmHasMore = computed(() => pmDisplayCount.value < pmAllStats.value.length);
const pmLoadMore = () => { pmDisplayCount.value += 10; };
const pmBottomSentinel = ref(null);
let pmObserver = null;

const txDisplayCount = ref(15);
const txDisplayedStats = computed(() => sortedTransactions.value.slice(0, txDisplayCount.value));
const txHasMore = computed(() => txDisplayCount.value < sortedTransactions.value.length);
const txLoadMore = () => { txDisplayCount.value += 15; };
const txBottomSentinel = ref(null);
let txObserver = null;

watch(() => activeTab.value, async (newTab) => {
    // Setup for per-match tab
    if (newTab === 'per-match') {
        await nextTick();
        if (pmBottomSentinel.value) {
            if (!pmObserver) {
                pmObserver = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting && pmHasMore.value) {
                        pmLoadMore();
                    }
                }, { rootMargin: '200px' });
            }
            pmObserver.observe(pmBottomSentinel.value);
        }
    } else {
        if (pmObserver) {
            pmObserver.disconnect();
            pmObserver = null;
        }
    }
    
    // Setup for transactions tab
    if (newTab === 'transactions') {
        await nextTick();
        if (txBottomSentinel.value) {
            if (!txObserver) {
                txObserver = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting && txHasMore.value) {
                        txLoadMore();
                    }
                }, { rootMargin: '200px' });
            }
            txObserver.observe(txBottomSentinel.value);
        }
    } else {
        if (txObserver) {
            txObserver.disconnect();
            txObserver = null;
        }
    }
}, { immediate: true });

onUnmounted(() => {
    if (pmObserver) {
        pmObserver.disconnect();
        pmObserver = null;
    }
    if (txObserver) {
        txObserver.disconnect();
        txObserver = null;
    }
});

const pmGrandTotalCollected = computed(() => pmAllStats.value.reduce((a, s) => a + s.totalCollected, 0));
const pmDetailMatchRevenue = computed(() => {
    const m = pmDetailMatch.value; if (!m) return { players: [] };
    const players = pmPerMatchMembers.value.map(mem => ({ id: mem.id, name: mem.name, perMatchFee: mem.perMatchFee || 50000, attended: m.attendance?.[mem.id]?.status === 'present', isPaid: pmIsPaid(mem.id, m.id) }));
    const attended = players.filter(p => p.attended);
    return { totalRevenue: attended.reduce((a, p) => a + p.perMatchFee, 0), totalCollected: attended.filter(p => p.isPaid).reduce((a, p) => a + p.perMatchFee, 0), players };
});

const pmCollectFeeModal = async (player) => {
    if (confirm(`Thu tiền trận của ${player.name}?`)) {
        await addTransaction({ type: 'income', category: 'per_match_fund', amount: player.perMatchFee, description: `Thu tiền trận ${pmFormatDate(pmDetailMatch.value.date)} - ${player.name}`, date: pmDetailMatch.value.date, memberId: player.id, perMatchFundMeta: { matchId: pmDetailMatch.value.id } });
    }
};

const pmUndoCollectFeeModal = async (player) => {
    const tx = transactions.value.find(t => t.category === 'per_match_fund' && t.memberId === player.id && t.perMatchFundMeta?.matchId === pmDetailMatch.value.id);
    if (tx && confirm('Hoàn tác thu tiền?')) await deleteTransaction(tx.id);
};
</script>

<style scoped>
.tabs { 
    display: flex; 
    gap: 4px; 
    border-bottom: 1px solid var(--border-color); 
    margin-bottom: 24px; 
    padding: 2px; 
    background: var(--bg-tertiary); 
    border-radius: var(--radius-md); 
    overflow-x: auto; 
}

.tab-btn { 
    padding: 14px 20px; 
    background: none; 
    border: none; 
    font-weight: 500; 
    color: var(--text-secondary); 
    cursor: pointer; 
    border-radius: var(--radius-sm); 
    white-space: nowrap; 
    position: relative; 
    font-size: 14px;
    transition: all 0.2s;
}

.tab-btn:hover { color: var(--primary-600); background: var(--bg-secondary); }
.tab-btn.active { color: var(--primary-600); background: var(--bg-secondary); box-shadow: var(--shadow-sm); font-weight: 700; }

.tab-badge { 
    position: absolute; top: 2px; right: 2px; background: var(--danger); color: white; min-width: 16px; height: 16px; 
    font-size: 10px; border-radius: 10px; display: flex; align-items: center; justify-content: center; padding: 0 4px;
}

.summary-badge { padding: 4px 12px; border-radius: var(--radius-full); font-weight: 700; font-size: 11px; }
.summary-badge.warning { background: rgba(245, 158, 11, 0.1); color: #f08c00; border: 1px solid rgba(245, 158, 11, 0.3); }
.summary-badge.danger { background: rgba(239, 68, 68, 0.1); color: #f03e3e; border: 1px solid rgba(239, 68, 68, 0.3); }

.debt-cell { display: flex; flex-direction: column; gap: 2px; }
.paid { color: var(--success); font-weight: 700; }
.required { color: var(--text-muted); }
.separator { margin: 0 4px; color: var(--border-color); }
.debt-amount { font-size: 11px; font-weight: 700; }

.action-buttons-group { display: flex; gap: 8px; align-items: center; justify-content: flex-end; }

/* MONTHLY FUND TABLE */
.table-wrapper { overflow: auto; margin-bottom: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-color); max-height: 600px; }
.monthly-fund-table { width: 100%; border-collapse: collapse; background: var(--bg-secondary); }
.monthly-fund-table th, .monthly-fund-table td { padding: 8px 12px; border: 1px solid var(--border-color); text-align: center; font-size: 12px; }

.monthly-fund-table thead th { 
    position: sticky; top: -1px; z-index: 100; background: var(--bg-tertiary); font-weight: 700; color: var(--text-primary); text-transform: uppercase; font-size: 11px;
}
.monthly-fund-table thead tr:nth-child(2) th { top: 31px; background: var(--bg-tertiary); height: 32px; font-size: 10px; }
.monthly-fund-table tfoot td { position: sticky; bottom: -1px; z-index: 100; background: var(--bg-tertiary); font-weight: 700; color: var(--text-primary); }

.mf-sticky-col { position: sticky; left: 0; background: var(--bg-secondary); z-index: 90; font-weight: 700; border-right: 2px solid var(--border-color) !important; }
.monthly-fund-table thead th.mf-sticky-col, .monthly-fund-table tfoot td.mf-sticky-col { background: var(--bg-tertiary); z-index: 120; }
.mf-name-col { min-width: 250px; text-align: left !important; left: 40px; }
.monthly-fund-table thead th.mf-name-col { left: 40px; }

.current-month { background: rgba(37, 99, 235, 0.15) !important; border: 2px solid var(--primary-500) !important; color: var(--primary-400) !important; }
.tier-badge-small { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 8px; }

.month-cell { position: relative; padding: 0 !important; }
.future-month { background: var(--bg-tertiary); opacity: 0.6; }

.checkbox-wrapper { display: flex; align-items: center; justify-content: center; width: 100%; height: 40px; cursor: pointer; }
.checkbox-wrapper:hover:not(.disabled) { background: var(--bg-hover); }
.checkbox-wrapper input { display: none; }
.checkmark { width: 18px; height: 18px; border: 1px solid var(--border-color); border-radius: 4px; display: flex; align-items: center; justify-content: center; background: var(--bg-secondary); }
.checkmark::after { content: '✔'; display: none; color: white; font-weight: 700; font-size: 12px; }
.checkbox-wrapper input:checked + .checkmark { background: var(--success); border-color: var(--success); }
.checkbox-wrapper input:checked + .checkmark::after { display: block; }

.statistics-summary { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
    gap: var(--spacing-6); 
    margin-bottom: var(--spacing-6); 
}

.mf-stat-card { 
    background: var(--bg-secondary); 
    padding: var(--container-padding); 
    border-radius: var(--radius-md); 
    border: 1px solid var(--border-color); 
    display: flex; 
    align-items: center; 
    gap: 12px; 
}
.mf-stat-icon { font-size: 20px; }
.mf-stat-card.success { border-color: var(--success); background: rgba(16, 185, 129, 0.1); }
.mf-stat-card.warning { border-color: var(--warning); background: rgba(245, 158, 11, 0.1); }

/* PER MATCH STYLES */
.row-absent { opacity: 0.6; }
.row-paid { background: rgba(16, 185, 129, 0.08); }
.selected-row { background: rgba(37, 99, 235, 0.1) !important; border-left: 4px solid var(--primary-400); }
</style>
