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
                <button class="btn btn-success" @click="openTransactionModal('income')">Thêm Thu</button>
                <button class="btn btn-danger" @click="openTransactionModal('expense')">Thêm Chi</button>
            </div>
        </div>

        <!-- Debts Tab -->
        <div v-if="activeTab === 'debts'" class="tab-content">
            <div class="card" style="margin-bottom: var(--spacing-xl); overflow: visible;">
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
                    <div v-else class="table-container">
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
                                <tr v-for="member in monthlyMembers" :key="member.id" :class="{ 'active-row': activeDropdownId === member.id }">
                                    <td class="font-medium">{{ member.name }}</td>
                                    <td class="text-center">
                                        <div class="debt-cell">
                                            <span class="paid" title="Đã đóng">{{ formatCurrency(member.fundPaid) }}</span>
                                            <span class="separator">/</span>
                                            <span class="required" title="Phải đóng">{{ formatCurrency(member.fundRequired) }}</span>
                                            <div v-if="member.fundMissing > 0" class="debt-amount text-warning">
                                                Thiếu: {{ formatCurrency(member.fundMissing) }}
                                            </div>
                                            <div v-if="member.fundRequired > 0" class="calculation-hint" :title="getFundHint(member)">
                                                <small style="color: var(--text-muted); font-size: 0.75rem;">{{ getTierDetails(member) }}</small>
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
                                                <button class="btn btn-sm btn-ghost dropdown-toggle" @click.stop="toggleDropdown($event, member.id)" style="width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;">
                                                        <circle cx="12" cy="12" r="1"></circle>
                                                        <circle cx="12" cy="5" r="1"></circle>
                                                        <circle cx="12" cy="19" r="1"></circle>
                                                    </svg>
                                                </button>
                                                <div v-if="activeDropdownId === member.id" class="dropdown-menu" :class="{ 'open-up': dropdownDirection === 'up' }">
                                                    <button class="dropdown-item" @click="handleAutoClear(member)">
                                                        <span class="dropdown-icon">💵</span> Đóng nhanh (Tiền mặt)
                                                    </button>
                                                    <button v-if="member.fundMissing > 0" class="dropdown-item" @click="handleManualPayment(member, 'fund')">
                                                        <span class="dropdown-icon">💰</span> Đóng Quỹ Tháng
                                                    </button>
                                                    <button v-if="member.fineMissing > 0" class="dropdown-item" @click="handleManualPayment(member, 'fine')">
                                                        <span class="dropdown-icon">🚩</span> Đóng Tiền Phạt
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="text-success">✔ Đã xong</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- per-match members -->
             <div v-if="perMatchMembers.length > 0" class="card" style="overflow: visible;">
                 <div class="card-header">
                     <h2>⚽ Theo Trận</h2>
                 </div>
                 <div class="card-content">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Thành Viên</th>
                                    <th class="text-center">Phí Trận Đấu</th>
                                    <th class="text-center">Lịch Sử</th>
                                    <th class="text-center">Tiền Phạt</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="member in perMatchMembers" :key="member.id">
                                    <td class="font-medium">{{ member.name }}</td>
                                    <td class="text-center">
                                        <span class="badge badge-secondary">{{ formatCurrency(member.perMatchFee || 50000) }}/trận</span>
                                    </td>
                                    <td class="text-center">
                                        {{ member.presentMatchesCount }} trận tham gia
                                    </td>
                                    <td class="text-center">
                                        <div class="debt-cell">
                                            <span class="paid">{{ formatCurrency(member.finePaid) }}</span>
                                            <span class="separator">/</span>
                                            <span class="required">{{ formatCurrency(member.fineRequired) }}</span>
                                            <div v-if="member.fineMissing > 0" class="debt-amount text-danger">
                                                Thiếu: {{ formatCurrency(member.fineMissing) }}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="action-buttons-group">
                                            <span v-if="member.fineMissing <= 0" class="badge badge-success">Sạch nợ</span>
                                            <button v-if="member.fineMissing > 0" class="btn btn-sm btn-danger" @click="handleManualPayment(member, 'fine')">Đóng Phạt</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                 </div>
             </div>
        </div>

        <!-- Monthly Fund Tab -->
        <div v-if="activeTab === 'monthly-fund'" class="tab-content">
            <div class="card">
                <div class="card-header">
                    <h2>Danh Sách Đóng Quỹ Theo Tháng</h2>
                    <div class="card-actions" style="display:flex;gap:0.75rem;align-items:center;">
                        <select v-model="selectedYear" class="year-selector">
                            <option v-for="year in availableYears" :key="year" :value="year">Năm {{ year }}</option>
                        </select>
                    </div>
                </div>
                <div class="card-content">
                    <div v-if="perMatchMembersForFund.length > 0" class="info-notice">
                        <span class="notice-icon">ℹ️</span>
                        <span>Bảng này chỉ hiển thị thành viên <strong>đóng quỹ theo tháng</strong>. {{ perMatchMembersForFund.length }} thành viên đá theo trận không có trong danh sách này.</span>
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
                                <tr v-if="monthlyMembersForFund.length === 0">
                                    <td colspan="15" style="padding:2rem;text-align:center;color:var(--text-secondary);">Chưa có thành viên đóng quỹ theo tháng</td>
                                </tr>
                                <tr v-for="(member, index) in sortedMonthlyMembersForFund" :key="member.id">
                                    <td class="mf-sticky-col text-center">{{ index + 1 }}</td>
                                    <td class="mf-sticky-col mf-name-col">
                                        <div class="member-info">
                                            {{ member.name }}
                                            <span v-if="member.contributionTierId" class="tier-badge-small" :style="getMFTierStyle(member.contributionTierId)">{{ getMFTierIcon(member.contributionTierId) }} {{ getMFTierName(member.contributionTierId) }}</span>
                                        </div>
                                    </td>
                                    <td class="text-right" style="font-weight:600;">{{ formatCurrency(getMonthlyFee(member)) }}</td>
                                    <td v-for="m in 12" :key="m" class="month-cell" :class="{ 'future-month': isFutureMonth(m) }">
                                        <label class="checkbox-wrapper" :class="{ disabled: isFutureMonth(m) }">
                                            <input type="checkbox" :checked="isMFPaid(member.id, m)" @change="toggleMFPayment(member.id, m, $event)" :disabled="isFutureMonth(m)">
                                            <span class="checkmark" :class="getMFCheckmarkClass(member.id, m)"></span>
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="summary-row">
                                    <td colspan="3" class="mf-sticky-col" style="text-align:right;font-weight:700;padding-right:1.5rem;">Số người đã đóng</td>
                                    <td v-for="m in 12" :key="m" class="text-center" :class="{ 'future-month': isFutureMonth(m) }" style="font-weight:700;color:var(--primary-400);">
                                        <span v-if="isFutureMonth(m)" class="text-muted">-</span>
                                        <span v-else>{{ getMFPaidCount(m) }}/{{ monthlyMembersForFund.length }}</span>
                                    </td>
                                </tr>
                                <tr class="amount-summary-row">
                                    <td colspan="3" class="mf-sticky-col" style="text-align:right;font-weight:700;padding-right:1.5rem;">Tổng thu theo tháng</td>
                                    <td v-for="m in 12" :key="m" class="text-center" :class="{ 'future-month': isFutureMonth(m) }" style="font-size:0.75rem;font-weight:700;color:var(--success-400);">
                                        <span v-if="!isFutureMonth(m) && getMFPaidAmount(m) > 0">{{ formatCurrency(getMFPaidAmount(m)) }}</span>
                                        <span v-else class="text-muted">-</span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="statistics-summary">
                        <div class="mf-stat-card"><div class="mf-stat-icon">👥</div><div class="mf-stat-info"><div class="stat-label">Thành viên đóng quỹ tháng</div><div class="stat-value">{{ monthlyMembersForFund.length }}</div></div></div>
                        <div class="mf-stat-card"><div class="mf-stat-icon">💰</div><div class="mf-stat-info"><div class="stat-label">Quỹ dự kiến/tháng</div><div class="stat-value">{{ formatCurrency(expectedMonthlyTotal) }}</div></div></div>
                        <div class="mf-stat-card"><div class="mf-stat-icon">📊</div><div class="mf-stat-info"><div class="stat-label">Dự kiến cả năm {{ selectedYear }}</div><div class="stat-value">{{ formatCurrency(expectedYearlyTotal) }}</div></div></div>
                        <div class="mf-stat-card success"><div class="mf-stat-icon">✅</div><div class="mf-stat-info"><div class="stat-label">Đã thu năm {{ selectedYear }}</div><div class="stat-value">{{ formatCurrency(actualYearlyTotal) }}</div></div></div>
                        <div class="mf-stat-card warning"><div class="mf-stat-icon">⏳</div><div class="mf-stat-info"><div class="stat-label">Còn thiếu (đến tháng {{ currentMonth }})</div><div class="stat-value">{{ formatCurrency(mfTotalMissing) }}</div></div></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Per Match Tab -->
        <div v-if="activeTab === 'per-match'" class="tab-content">
            <div class="card" style="margin-bottom: var(--spacing-xl);">
                <div class="card-header">
                    <h2>⚽ Đóng Quỹ Theo Trận</h2>
                    <div class="card-actions"><span class="badge badge-warning">{{ pmPerMatchMembers.length }} thành viên đá theo trận</span></div>
                </div>
                <div class="card-content">
                    <div v-if="pmPerMatchMembers.length === 0" style="padding:3rem;text-align:center;color:var(--text-secondary);">
                        <div style="font-size:2rem;margin-bottom:1rem;">⚽</div>
                        <h3>Chưa có thành viên đá theo trận</h3>
                        <p>Vào <strong>Thành Viên</strong> → Thêm/Sửa thành viên → Chọn loại <strong>"Đá theo trận"</strong></p>
                    </div>
                    <template v-else>
                        <div class="form-group" style="margin-bottom: var(--spacing-xl);">
                            <label>Chọn Trận Đấu</label>
                            <select v-model="pmSelectedMatchId">
                                <option :value="null">-- Chọn trận để xem & quản lý --</option>
                                <option v-for="match in sortedMatches" :key="match.id" :value="match.id">{{ pmFormatDate(match.date) }} - {{ match.location || 'Sân đấu' }}</option>
                            </select>
                        </div>
                        <div v-if="pmSelectedMatchId && pmCurrentMatch">
                            <div class="stats-grid" style="margin-bottom: var(--spacing-xl);">
                                <div class="stat-card"><div class="stat-content"><div class="stat-value">{{ pmMatchRevenue.totalPerMatchPlayers }}</div><div class="stat-label">Thành viên theo trận</div></div></div>
                                <div class="stat-card stat-success"><div class="stat-content"><div class="stat-value">{{ pmMatchRevenue.attendedPerMatchPlayers }}</div><div class="stat-label">Đã tham gia</div></div></div>
                                <div class="stat-card stat-info"><div class="stat-content"><div class="stat-value">{{ formatCurrency(pmMatchRevenue.totalRevenue) }}</div><div class="stat-label">Tổng phải thu</div></div></div>
                                <div class="stat-card"><div class="stat-content"><div class="stat-value">{{ formatCurrency(pmMatchRevenue.totalCollected) }}</div><div class="stat-label">Đã thu được</div></div></div>
                            </div>
                            <div class="table-container">
                                <table class="data-table">
                                    <thead><tr><th>Thành Viên</th><th class="text-center">Giá/Trận</th><th class="text-center">Điểm danh</th><th class="text-center">Đã thu tiền</th><th class="text-center">Thao tác</th></tr></thead>
                                    <tbody>
                                        <tr v-for="player in pmMatchRevenue.players" :key="player.id" :class="{ 'row-absent': !player.attended, 'row-paid': player.attended && player.isPaid }">
                                            <td><strong>{{ player.name }}</strong></td>
                                            <td class="text-center">{{ formatCurrency(player.perMatchFee) }}</td>
                                            <td class="text-center"><span v-if="player.attended" class="badge badge-success">✅ Có mặt</span><span v-else class="badge badge-secondary">❌ Vắng</span></td>
                                            <td class="text-center"><template v-if="player.attended"><span v-if="player.isPaid" class="badge badge-success">✔ Đã thu</span><span v-else class="badge badge-warning">⏳ Chưa thu</span></template><span v-else class="badge badge-secondary">N/A</span></td>
                                            <td class="text-center"><template v-if="player.attended"><button v-if="!player.isPaid" class="btn btn-sm btn-success" @click="pmCollectFee(player)">💵 Thu tiền</button><button v-else class="btn btn-sm btn-secondary" @click="pmUndoCollectFee(player)">↩ Hoàn tác</button></template><span v-else class="text-muted">—</span></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr style="font-weight:700;"><td colspan="3" style="text-align:right;">Tổng phải thu:</td><td class="text-center" style="color:var(--success-500);">{{ formatCurrency(pmMatchRevenue.totalRevenue) }}</td><td></td></tr>
                                        <tr style="font-weight:700;"><td colspan="3" style="text-align:right;">Đã thu:</td><td class="text-center" style="color:var(--primary-500);">{{ formatCurrency(pmMatchRevenue.totalCollected) }}<span v-if="pmMatchRevenue.totalCollected < pmMatchRevenue.totalRevenue" style="color:var(--warning-500);font-size:0.8rem;display:block;">Còn thiếu: {{ formatCurrency(pmMatchRevenue.totalRevenue - pmMatchRevenue.totalCollected) }}</span></td><td></td></tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <!-- Summary Across All Matches -->
            <div v-if="pmPerMatchMembers.length > 0" class="card">
                <div class="card-header"><h2>📋 Tổng Hợp Tất Cả Trận</h2><div class="card-actions"><span class="badge badge-success">Tổng thu: {{ formatCurrency(pmGrandTotalCollected) }}</span></div></div>
                <div class="card-content">
                    <div v-if="pmAllStats.length === 0" style="padding:3rem;text-align:center;color:var(--text-secondary);"><p>Chưa có trận đấu nào</p></div>
                    <div v-else class="table-container">
                        <table class="data-table">
                            <thead><tr><th>Ngày</th><th>Địa Điểm</th><th class="text-center">Theo trận / Có mặt</th><th class="text-center">Phải thu</th><th class="text-center">Đã thu</th><th class="text-center">Trạng thái</th><th class="text-center">Thao tác</th></tr></thead>
                            <tbody>
                                <tr v-for="stat in pmAllStats" :key="stat.id" @click="pmScrollToMatch(stat.id)" style="cursor:pointer;" :class="{ 'selected-row': pmSelectedMatchId === stat.id }">
                                    <td>{{ pmFormatDate(stat.date) }}</td>
                                    <td>{{ stat.location || 'Sân đấu' }}</td>
                                    <td class="text-center">{{ stat.totalPerMatchPlayers }} / {{ stat.attendedPerMatchPlayers }}</td>
                                    <td class="text-center"><strong style="color:var(--success-500)">{{ formatCurrency(stat.totalRevenue) }}</strong></td>
                                    <td class="text-center"><strong style="color:var(--primary-500)">{{ formatCurrency(stat.totalCollected) }}</strong></td>
                                    <td class="text-center">
                                        <span v-if="stat.attendedPerMatchPlayers === 0" class="badge badge-secondary">Không ai tham gia</span>
                                        <span v-else-if="stat.totalCollected >= stat.totalRevenue && stat.totalRevenue > 0" class="badge badge-success">✔ Đủ</span>
                                        <span v-else-if="stat.totalCollected > 0" class="badge badge-warning">⏳ Chưa đủ</span>
                                        <span v-else class="badge badge-danger">✗ Chưa thu</span>
                                    </td>
                                    <td class="text-center"><button class="btn btn-sm btn-ghost" @click.stop="pmScrollToMatch(stat.id)">Chi tiết</button></td>
                                </tr>
                            </tbody>
                            <tfoot><tr style="font-weight:700;"><td colspan="3" style="text-align:right;">Tổng Tất Cả:</td><td class="text-center" style="color:var(--success-500);font-size:1.1rem;">{{ formatCurrency(pmGrandTotalRevenue) }}</td><td class="text-center" style="color:var(--primary-500);font-size:1.1rem;">{{ formatCurrency(pmGrandTotalCollected) }}</td><td colspan="2"></td></tr></tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pending Transactions Tab -->
        <div v-if="activeTab === 'pending'" class="tab-content">
            <div class="card">
                <div class="card-header">
                    <h2>Duyệt Giao Dịch</h2>
                    <div class="card-actions">
                        <span class="badge badge-info">{{ pendingTransactions.length }} yêu cầu</span>
                    </div>
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
                                    <th>Số Tiền</th>
                                    <th>Minh Chứng</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tx in pendingTransactions" :key="tx.id">
                                    <td>{{ formatFullDateTime(tx.date) }}</td>
                                    <td><strong>{{ getMemberName(tx.memberId) }}</strong></td>
                                    <td>
                                        <span class="badge" :class="getCategoryClass(tx)">{{ tx.category === 'fund' ? 'Quỹ' : 'Phạt' }}</span>
                                        {{ tx.description }}
                                    </td>
                                    <td class="font-bold text-success">{{ formatCurrency(tx.amount) }}</td>
                                    <td>
                                        <a v-if="tx.evidence" :href="tx.evidence" target="_blank" class="link">Xem ảnh</a>
                                        <span v-else>Không có</span>
                                    </td>
                                    <td>
                                        <div class="action-buttons-group">
                                            <button class="btn btn-sm btn-success" @click="handleApprove(tx)">Duyệt</button>
                                            <button class="btn btn-sm btn-danger" @click="handleReject(tx)">Từ chối</button>
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
                                    <th>Số Tiền</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tx in sortedTransactions" :key="tx.id">
                                    <td>{{ formatDate(tx.date) }}</td>
                                    <td>
                                        <span class="badge" :class="getCategoryClass(tx)">
                                            {{ getCategoryLabel(tx) }}
                                        </span>
                                    </td>
                                    <td>{{ getMemberName(tx.memberId) || '—' }}</td>
                                    <td>{{ tx.description }}</td>
                                    <td :class="tx.type === 'income' ? 'text-success' : 'text-danger'">
                                        {{ tx.type === 'income' ? '+' : '-' }}{{ formatCurrency(tx.amount) }}
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-danger" @click="handleDeleteTransaction(tx.id)">Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Transaction Modal -->
        <div v-if="showModal" class="modal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ form.type === 'income' ? '💰 Thêm Khoản Thu' : '💸 Thêm Khoản Chi' }}</h2>
                    <button class="close-btn" @click="closeModal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Ngày Giao Dịch</label>
                        <input type="date" v-model="form.date">
                    </div>
                    <div class="form-group">
                        <label>Phân Loại</label>
                        <select v-model="form.category">
                            <option v-for="cat in currentCategories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
                        </select>
                    </div>
                    <div v-if="form.type === 'income'" class="form-group">
                        <label>Thành Viên Kèm Theo</label>
                        <select v-model="form.memberId">
                            <option :value="null">-- Không bắt buộc --</option>
                            <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Số Tiền (VNĐ)</label>
                        <input type="number" v-model.number="form.amount" placeholder="Ví dụ: 500000" style="font-size: 1.1rem; font-weight: bold; color: var(--primary-500);">
                    </div>
                    <div class="form-group">
                        <label>Ghi Chú Chi Tiết</label>
                        <input type="text" v-model="form.description" placeholder="Nhập ghi chú chi tiết...">
                    </div>
                    
                    <div class="form-actions">
                        <button class="btn btn-secondary" @click="closeModal">Hủy Bỏ</button>
                        <button class="btn btn-primary" @click="handleSaveTransaction">Lưu Giao Dịch</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useAppState } from '../composables/useAppState';
import { usePenalties } from '../composables/usePenalties';
import { useFinancialCalculations } from '../composables/useFinancialCalculations';
import { useAuth } from '../composables/useAuth';

const { 
    transactions, stats, members, getMemberName, 
    addTransaction, deleteTransaction, 
    pendingTransactions, approvePendingTransaction, rejectPendingTransaction,
    contributionTiers, matches, sortedMatches, getContributionTier
} = useAppState();

const { getMemberFinancialStatus, getStatusText } = useFinancialCalculations();
const { permissions } = useAuth();

const props = defineProps({
    initialTab: {
        type: String,
        default: 'overview'
    }
});

const activeTab = ref(props.initialTab);
const showModal = ref(false);
const activeDropdownId = ref(null);
const dropdownDirection = ref('down');

const form = reactive({
    id: null,
    date: '',
    type: 'income',
    category: '',
    description: '',
    amount: 0,
    memberId: null
});

const incomeCategories = [
    { value: 'fund', label: 'Quỹ tháng' },
    { value: 'fine', label: 'Tiền phạt' },
    { value: 'sponsor', label: 'Tài trợ' },
    { value: 'other', label: 'Khác' }
];

const expenseCategories = [
    { value: 'pitch', label: 'Thuê sân' },
    { value: 'water', label: 'Nước uống' },
    { value: 'equipment', label: 'Dụng cụ' },
    { value: 'party', label: 'Liên hoan' },
    { value: 'other', label: 'Khác' }
];

const currentCategories = computed(() => form.type === 'income' ? incomeCategories : expenseCategories);

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const monthlyMembers = computed(() => {
    return members.value
        .filter(m => m.paymentType !== 'per-match')
        .map(m => ({ ...m, ...getMemberFinancialStatus(m), statusText: getStatusText(getMemberFinancialStatus(m)) }))
        .sort((a, b) => b.totalDebt - a.totalDebt);
});

const perMatchMembers = computed(() => {
    return members.value
        .filter(m => m.paymentType === 'per-match')
        .map(m => ({ ...m, ...getMemberFinancialStatus(m), fundMissing: 0, fundRequired: 0, statusText: getStatusText(getMemberFinancialStatus(m)) }))
        .sort((a, b) => a.name.localeCompare(b.name, 'vi'));
});

const allSortedMembers = computed(() => [...monthlyMembers.value, ...perMatchMembers.value]);

const totalFundDebt = computed(() => monthlyMembers.value.reduce((sum, m) => sum + m.fundMissing, 0));
const totalFineDebt = computed(() => allSortedMembers.value.reduce((sum, m) => sum + m.fineMissing, 0));

const sortedTransactions = computed(() => [...transactions.value].sort((a, b) => new Date(b.date) - new Date(a.date)));

const pendingCount = computed(() => pendingTransactions.value.filter(t => t.status === 'pending').length);

const openTransactionModal = (type) => {
    form.id = null;
    form.type = type;
    form.date = new Date().toISOString().split('T')[0];
    form.amount = 0;
    form.category = currentCategories.value[0].value;
    form.memberId = null;
    form.description = '';
    showModal.value = true;
};

const closeModal = () => { showModal.value = false; };

const handleSaveTransaction = async () => {
    if (!form.description) {
        const cat = currentCategories.value.find(c => c.value === form.category);
        form.description = cat ? cat.label : form.category;
    }
    await addTransaction({ ...form });
    closeModal();
};

const handleDeleteTransaction = (id) => {
    if (confirm('Bạn có chắc muốn xóa giao dịch này?')) deleteTransaction(id);
};

const handleAutoClear = async (member) => {
    if (!confirm(`Xác nhận đóng hết nợ cho ${member.name}?\n- Nợ Quỹ: ${formatCurrency(member.fundMissing)}\n- Nợ Phạt: ${formatCurrency(member.fineMissing)}`)) return;
    
    const today = new Date().toISOString().split('T')[0];
    if (member.fundMissing > 0) {
        await addTransaction({ type: 'income', category: 'fund', amount: member.fundMissing, description: 'Đóng bù quỹ tháng (Auto)', date: today, memberId: member.id });
    }
    if (member.fineMissing > 0) {
        await addTransaction({ type: 'income', category: 'fine', amount: member.fineMissing, description: 'Đóng bù tiền phạt (Auto)', date: today, memberId: member.id });
    }
    closeDropdown();
};

const toggleDropdown = (event, id) => {
    if (activeDropdownId.value === id) {
        activeDropdownId.value = null;
    } else {
        activeDropdownId.value = id;
        const rect = event.currentTarget.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        dropdownDirection.value = (spaceBelow < 220 && rect.top > 220) ? 'up' : 'down';
    }
};

const closeDropdown = () => { activeDropdownId.value = null; };

if (typeof window !== 'undefined') {
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-wrapper')) closeDropdown();
    });
}

const handleManualPayment = (member, category) => {
    form.id = null;
    form.type = 'income';
    form.date = new Date().toISOString().split('T')[0];
    form.category = category;
    form.memberId = member.id;
    form.amount = category === 'fund' ? member.fundMissing : member.fineMissing;
    form.description = `Đóng ${category === 'fund' ? 'quỹ' : 'phạt'} - ${member.name}`;
    showModal.value = true;
    closeDropdown();
};

const handleApprove = (tx) => {
    const amount = prompt(`Xác nhận số tiền thực nhận từ ${getMemberName(tx.memberId)}:`, tx.amount);
    if (amount === null) return;
    const finalAmount = parseInt(String(amount).replace(/[^0-9]/g, ''), 10);
    if (isNaN(finalAmount) || finalAmount <= 0) { alert('Số tiền không hợp lệ!'); return; }
    approvePendingTransaction(tx.id, finalAmount);
};

const handleReject = (tx) => {
    const reason = prompt('Lý do từ chối:');
    if (reason !== null) rejectPendingTransaction(tx.id, reason);
};

const formatFullDateTime = (ts) => ts ? new Date(ts).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0);
const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('vi-VN') : '';

const getStatusBadgeClass = (m) => {
    if (m.fundMissing <= 0 && m.fineMissing <= 0) return 'badge-success';
    if (m.fundMissing > 0 && m.fineMissing <= 0) return 'badge-warning';
    return 'badge-danger';
};

const getTierDetails = (m) => {
    const tier = contributionTiers.value.find(t => t.id === m.contributionTierId);
    if (!tier) return '';
    return `${formatCurrency(tier.monthlyFee)}/tháng × ${new Date().getMonth() + 1} tháng`;
};

const getFundHint = (m) => {
    const tier = contributionTiers.value.find(t => t.id === m.contributionTierId);
    if (!tier) return '';
    const months = new Date().getMonth() + 1;
    return `Quỹ tích lũy đến hiện tại:\n${formatCurrency(tier.monthlyFee)} × ${months} tháng = ${formatCurrency(m.fundRequired)}\nĐã đóng: ${formatCurrency(m.fundPaid)}\nCòn thiếu: ${formatCurrency(m.fundMissing)}`;
};

const getCategoryLabel = (tx) => {
    const cat = [...incomeCategories, ...expenseCategories].find(c => c.value === tx.category);
    return cat ? cat.label : tx.category;
};

const getCategoryClass = (tx) => {
    if (tx.type === 'expense') return 'badge-danger';
    if (tx.category === 'fund') return 'badge-info';
    if (tx.category === 'fine') return 'badge-warning';
    return 'badge-success';
};

// ==================== MONTHLY FUND TAB LOGIC ====================
const selectedYear = ref(currentYear);
const availableYears = computed(() => [currentYear, currentYear - 1, currentYear - 2]);
const monthlyMembersForFund = computed(() => members.value.filter(m => m.paymentType !== 'per-match'));
const perMatchMembersForFund = computed(() => members.value.filter(m => m.paymentType === 'per-match'));
const sortedMonthlyMembersForFund = computed(() => [...monthlyMembersForFund.value].sort((a, b) => a.name.localeCompare(b.name, 'vi')));

const isFutureMonth = (m) => {
    if (selectedYear.value < currentYear) return false;
    if (selectedYear.value > currentYear) return true;
    return m > currentMonth;
};

const getMonthlyFee = (member) => {
    if (member.contributionTierId) {
        const tier = getContributionTier(member.contributionTierId);
        if (tier) return tier.monthlyFee;
    }
    return contributionTiers.value[0]?.monthlyFee || 0;
};

const mfProcessedPayments = computed(() => {
    const map = {};
    transactions.value.forEach(tx => {
        if (tx.type === 'income' && tx.category === 'monthly_fund' && tx.monthlyFundMeta) {
            const { year, month } = tx.monthlyFundMeta;
            const key = `${tx.memberId}-${year}-${month}`;
            if (!map[key]) map[key] = tx.id;
        }
    });
    return map;
});

const isMFPaid = (memberId, month) => mfProcessedPayments.value[`${memberId}-${selectedYear.value}-${month}`] !== undefined;
const getMFCheckmarkClass = (memberId, month) => {
    if (isMFPaid(memberId, month)) return 'paid';
    if (isFutureMonth(month)) return 'future';
    return '';
};
const getMFPaidCount = (month) => monthlyMembersForFund.value.filter(m => isMFPaid(m.id, month)).length;
const getMFPaidAmount = (month) => transactions.value.filter(t => t.type === 'income' && t.category === 'monthly_fund' && t.monthlyFundMeta?.year === selectedYear.value && t.monthlyFundMeta?.month === month).reduce((sum, t) => sum + t.amount, 0);

const expectedMonthlyTotal = computed(() => monthlyMembersForFund.value.reduce((sum, m) => sum + getMonthlyFee(m), 0));
const expectedYearlyTotal = computed(() => expectedMonthlyTotal.value * 12);
const actualYearlyTotal = computed(() => transactions.value.filter(t => t.type === 'income' && t.category === 'monthly_fund' && t.monthlyFundMeta?.year === selectedYear.value).reduce((sum, t) => sum + t.amount, 0));
const mfTotalMissing = computed(() => {
    const endMonth = selectedYear.value < currentYear ? 12 : currentMonth;
    const expectedSoFar = monthlyMembersForFund.value.reduce((sum, m) => sum + (getMonthlyFee(m) * endMonth), 0);
    return Math.max(0, expectedSoFar - actualYearlyTotal.value);
});

const toggleMFPayment = async (memberId, month, event) => {
    const checked = event.target.checked;
    const key = `${memberId}-${selectedYear.value}-${month}`;
    const member = members.value.find(m => m.id === memberId);
    if (!member) return;
    if (checked) {
        if (mfProcessedPayments.value[key]) { event.target.checked = false; return; }
        const fee = getMonthlyFee(member);
        if (fee <= 0) { alert(`Thành viên ${member.name} chưa được gán mức đóng quỹ!`); event.target.checked = false; return; }
        const input = prompt(`Nhập số tiền đóng quỹ cho tháng ${month}/${selectedYear.value} của ${member.name}:`, fee);
        if (input === null) { event.target.checked = false; return; }
        const amount = parseInt(input.replace(/[^0-9]/g, ''), 10);
        if (isNaN(amount) || amount <= 0) { alert('Số tiền không hợp lệ!'); event.target.checked = false; return; }
        await addTransaction({ type: 'income', category: 'monthly_fund', amount, description: `Đóng quỹ tháng ${month}/${selectedYear.value} - ${member.name}`, date: new Date(selectedYear.value, month - 1, 1).toISOString(), memberId, monthlyFundMeta: { year: selectedYear.value, month } });
    } else {
        const txId = mfProcessedPayments.value[key];
        if (txId) {
            if (confirm(`Bạn có chắc muốn hủy ghi nhận đóng quỹ tháng ${month}/${selectedYear.value} của ${member.name}?`)) { await deleteTransaction(txId); } else { event.target.checked = true; }
        }
    }
};

const getMFTierName = (id) => getContributionTier(id)?.name || '';
const getMFTierIcon = (id) => getContributionTier(id)?.icon || '';
const getMFTierStyle = (id) => {
    const tier = getContributionTier(id);
    return tier ? { backgroundColor: tier.color + '20', color: tier.color, border: `1px solid ${tier.color}` } : {};
};

// ==================== PER-MATCH TAB LOGIC ====================
const pmSelectedMatchId = ref(null);
const pmCurrentMatch = computed(() => pmSelectedMatchId.value ? matches.value.find(m => m.id === pmSelectedMatchId.value) : null);
const pmPerMatchMembers = computed(() => members.value.filter(m => m.paymentType === 'per-match'));

const pmIsAttended = (match, memberId) => {
    const att = match.attendance?.[memberId];
    return att && (att.status === 'present' || att.status === 'late');
};

const pmCollectedMap = computed(() => {
    const map = {};
    transactions.value.forEach(t => {
        if (t.type === 'income' && t.category === 'per_match_fund' && t.perMatchFundMeta) {
            map[`${t.memberId}-${t.perMatchFundMeta.matchId}`] = t.id;
        }
    });
    return map;
});

const pmIsPaid = (memberId, matchId) => pmCollectedMap.value[`${memberId}-${matchId}`] !== undefined;

const pmMatchRevenue = computed(() => {
    const match = pmCurrentMatch.value;
    if (!match) return { totalPerMatchPlayers: 0, attendedPerMatchPlayers: 0, totalRevenue: 0, totalCollected: 0, players: [] };
    const players = pmPerMatchMembers.value.map(m => ({ id: m.id, name: m.name, perMatchFee: m.perMatchFee || 50000, attended: pmIsAttended(match, m.id), isPaid: pmIsPaid(m.id, match.id) }));
    const attended = players.filter(p => p.attended);
    return { totalPerMatchPlayers: players.length, attendedPerMatchPlayers: attended.length, totalRevenue: attended.reduce((a, p) => a + p.perMatchFee, 0), totalCollected: attended.filter(p => p.isPaid).reduce((a, p) => a + p.perMatchFee, 0), players };
});

const pmAllStats = computed(() => matches.value.map(match => {
    const players = pmPerMatchMembers.value.map(m => ({ id: m.id, perMatchFee: m.perMatchFee || 50000, attended: pmIsAttended(match, m.id), paid: pmIsPaid(m.id, match.id) }));
    const attended = players.filter(p => p.attended);
    return { id: match.id, date: match.date, location: match.location, totalPerMatchPlayers: players.length, attendedPerMatchPlayers: attended.length, totalRevenue: attended.reduce((a, p) => a + p.perMatchFee, 0), totalCollected: attended.filter(p => p.paid).reduce((a, p) => a + p.perMatchFee, 0) };
}).sort((a, b) => new Date(b.date) - new Date(a.date)));

const pmGrandTotalRevenue = computed(() => pmAllStats.value.reduce((a, s) => a + s.totalRevenue, 0));
const pmGrandTotalCollected = computed(() => pmAllStats.value.reduce((a, s) => a + s.totalCollected, 0));

const pmCollectFee = async (player) => {
    const match = pmCurrentMatch.value;
    if (!match) return;
    if (confirm(`Thu tiền trận của ${player.name}?\nSố tiền: ${formatCurrency(player.perMatchFee)}`)) {
        await addTransaction({ type: 'income', category: 'per_match_fund', amount: player.perMatchFee, description: `Thu tiền trận ${pmFormatDate(match.date)} - ${player.name}`, date: match.date || new Date().toISOString(), memberId: player.id, perMatchFundMeta: { matchId: match.id, matchDate: match.date } });
    }
};

const pmUndoCollectFee = async (player) => {
    const tId = pmCollectedMap.value[`${player.id}-${pmCurrentMatch.value.id}`];
    if (tId && confirm(`Hoàn tác thu tiền của ${player.name}?`)) { await deleteTransaction(tId); }
};

const pmScrollToMatch = (id) => { pmSelectedMatchId.value = id; window.scrollTo({ top: 0, behavior: 'smooth' }); };
const pmFormatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN', { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' }) : '—';
</script>

<style scoped>
.tabs { display: flex; gap: 1rem; border-bottom: 2px solid var(--border-primary); margin-bottom: 2rem; padding: 0.5rem; background: rgba(0,0,0,0.1); border-radius: var(--radius-lg); overflow-x: auto; }
.tab-btn { padding: 0.75rem 1.5rem; background: none; border: none; font-weight: 600; color: var(--text-muted); cursor: pointer; border-radius: var(--radius-md); white-space: nowrap; position: relative; }
.tab-btn.active { color: var(--primary-400); background: rgba(59, 130, 246, 0.1); }
.tab-badge { position: absolute; top: -5px; right: -5px; background: var(--danger-500); color: white; width: 18px; height: 18px; font-size: 0.65rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px var(--danger-500); }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
.stat-card { padding: 1.5rem; border-radius: var(--radius-xl); background: var(--bg-secondary); border: 1px solid var(--border-primary); }
.stat-label { color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.5rem; }
.stat-value { font-size: 1.5rem; font-weight: 700; }

.page-actions { display: flex; gap: 1rem; margin-bottom: 2rem; }

.summary-badge { padding: 0.5rem 1rem; border-radius: var(--radius-full); font-weight: 600; font-size: 0.85rem; }
.summary-badge.warning { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid #f59e0b; }
.summary-badge.danger { background: rgba(239, 68, 68, 0.1); color: var(--danger-500); border: 1px solid var(--danger-500); }

.debt-cell { display: flex; flex-direction: column; gap: 0.25rem; }
.paid { color: var(--success-500); font-weight: 600; }
.required { color: var(--text-muted); }
.separator { margin: 0 0.25rem; color: var(--border-primary); }
.debt-amount { font-size: 0.8rem; font-weight: 700; margin-top: 0.25rem; }

.action-buttons-group { display: flex; gap: 0.5rem; align-items: center; justify-content: flex-end; }

.matrix-table { border-collapse: separate; border-spacing: 2px; }
.matrix-table .sticky-col { position: sticky; left: 0; background: var(--bg-secondary); z-index: 1; border-right: 1px solid var(--border-primary); }
.matrix-table th.text-center { width: 45px; min-width: 45px; }
.matrix-table td.text-center { cursor: help; transition: transform 0.1s; font-weight: 700; height: 45px; }
.status-paid { background: rgba(34, 197, 94, 0.2); color: var(--success-400); }
.status-partial { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.status-unpaid { background: rgba(239, 68, 68, 0.2); color: var(--danger-400); }
.status-future { background: rgba(255, 255, 255, 0.05); color: var(--text-muted); }
.status-na { background: rgba(0, 0, 0, 0.2); color: var(--text-muted); font-style: italic; }

.link { color: var(--primary-400); text-decoration: none; font-weight: 600; }
.link:hover { text-decoration: underline; }

/* MONTHLY FUND STYLES */
.year-selector { height: 42px; padding-left: 1rem !important; padding-right: 2.75rem !important; font-weight: 600; border-radius: var(--radius-md); background: var(--bg-tertiary); border: 1px solid var(--border-primary); color: var(--text-primary); }
.info-notice { background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: var(--radius-lg); padding: 1rem; display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
.notice-icon { font-size: 1.25rem; }
.table-wrapper { overflow-x: auto; margin-bottom: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-primary); }
.monthly-fund-table { width: 100%; border-collapse: separate; border-spacing: 0; background: var(--bg-secondary); }
.monthly-fund-table th, .monthly-fund-table td { padding: 0.75rem 1rem; border: 1px solid var(--border-primary); text-align: center; }
.mf-sticky-col { position: sticky; left: 0; background: var(--bg-secondary); z-index: 10; font-weight: 600; }
.mf-name-col { min-width: 250px; text-align: left !important; left: 60px; }
.mf-sticky-col:first-child { width: 60px; border-left: none; }
.months-header { background: rgba(59, 130, 246, 0.1); font-weight: 700; }
.month-col { width: 45px; min-width: 45px; font-size: 0.85rem; }
.current-month { background: rgba(59, 130, 246, 0.2); border: 2px solid var(--primary-500) !important; }
.member-info { display: flex; align-items: center; gap: 0.5rem; overflow: hidden; text-overflow: ellipsis; }
.tier-badge-small { font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; white-space: nowrap; font-weight: 600; }
.month-cell { position: relative; padding: 0 !important; }
.future-month { background: rgba(255, 255, 255, 0.02); }
.checkbox-wrapper { display: flex; align-items: center; justify-content: center; width: 100%; height: 45px; cursor: pointer; transition: background 0.2s; }
.checkbox-wrapper:hover:not(.disabled) { background: rgba(255, 255, 255, 0.05); }
.checkbox-wrapper input { display: none; }
.checkmark { width: 22px; height: 22px; border: 2px solid var(--border-primary); border-radius: 6px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.checkmark::after { content: '✔'; display: none; color: white; font-weight: 700; font-size: 14px; }
.checkbox-wrapper input:checked + .checkmark { background: var(--success-500); border-color: var(--success-500); box-shadow: 0 0 10px rgba(34, 197, 94, 0.4); }
.checkbox-wrapper input:checked + .checkmark::after { display: block; }
.checkbox-wrapper.disabled { cursor: not-allowed; opacity: 0.5; }
.summary-row, .amount-summary-row { background: rgba(0, 0, 0, 0.2); }
.statistics-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 2rem; }
.mf-stat-card { background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-lg); border: 1px solid var(--border-primary); display: flex; align-items: center; gap: 1rem; }
.mf-stat-icon { font-size: 1.5rem; }
.mf-stat-info { display: flex; flex-direction: column; }
.mf-stat-card.success { border-color: var(--success-500); background: rgba(34, 197, 94, 0.05); }
.mf-stat-card.warning { border-color: var(--warning-500); background: rgba(245, 158, 11, 0.05); }

/* PER MATCH STYLES */
.row-absent { opacity: 0.6; background: rgba(0,0,0,0.05); }
.row-paid { background: rgba(34, 197, 94, 0.05); }
.selected-row { background: rgba(59, 130, 246, 0.1) !important; border-left: 4px solid var(--primary-500); }
</style>
