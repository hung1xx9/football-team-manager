<template>
    <div class="page-content">
        <div class="page-actions" style="margin-bottom: var(--spacing-lg);">
            <p class="text-muted" style="font-size: 1.1rem;">Quản lý thông tin tài khoản và bảo mật</p>
        </div>

        <div class="card" style="margin-bottom: var(--spacing-xl);">
            <div class="card-header">
                <h2>Thông Tin Tài Khoản</h2>
            </div>
            <div class="card-content">
                <div class="info-grid">
                    <div class="info-item">
                        <label>Vai trò:</label>
                        <span class="badge" :class="roleBadgeClass">{{ roleLabel }}</span>
                    </div>
                    <div class="info-item">
                        <label>Tên đăng nhập:</label>
                        <span>{{ username }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h2>Đổi Mật Khẩu</h2>
            </div>
            <div class="card-content">
                <form @submit.prevent="handlePasswordChange" class="password-form">
                    <div class="form-group">
                        <label>Mật khẩu hiện tại <span class="required">*</span></label>
                        <div class="password-input-wrapper">
                            <input :type="showPass.current ? 'text' : 'password'" v-model="passForm.currentPassword" placeholder="Nhập mật khẩu hiện tại" required>
                            <button type="button" class="toggle-password" @click="showPass.current = !showPass.current">
                                <svg v-if="showPass.current" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Mật khẩu mới <span class="required">*</span></label>
                        <div class="password-input-wrapper">
                            <input :type="showPass.new ? 'text' : 'password'" v-model="passForm.newPassword" placeholder="Nhập mật khẩu mới" required minlength="6">
                            <button type="button" class="toggle-password" @click="showPass.new = !showPass.new">
                                <svg v-if="showPass.new" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            </button>
                        </div>
                        <small>Mật khẩu phải có ít nhất 6 ký tự</small>
                    </div>

                    <div class="form-group">
                        <label>Xác nhận mật khẩu mới <span class="required">*</span></label>
                        <div class="password-input-wrapper">
                            <input :type="showPass.confirm ? 'text' : 'password'" v-model="passForm.confirmPassword" placeholder="Nhập lại mật khẩu mới" required minlength="6">
                            <button type="button" class="toggle-password" @click="showPass.confirm = !showPass.confirm">
                                <svg v-if="showPass.confirm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
                    <div v-if="successMsg" class="alert alert-success">{{ successMsg }}</div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary" :disabled="isBusy">
                            <span v-if="isBusy">Đang xử lý...</span>
                            <span v-else>Đổi Mật Khẩu</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Admin System Settings -->
        <div v-if="permissions.canManageQRCode" class="card" style="margin-top: var(--spacing-xl);">
            <div class="card-header">
                <h2>⚙️ Cài Đặt Hệ Thống</h2>
            </div>
            <div class="card-content">
                <div class="settings-section">
                    <h3>📲 Mã QR & Link Thanh Toán</h3>
                    <p class="section-desc">Cấu hình mã QR và link MoMo để thành viên đóng quỹ và nộp phạt nhanh chóng.</p>
                    
                    <div class="form-group" style="margin-bottom: var(--spacing-xl);">
                        <label>Link MoMo thanh toán</label>
                        <input type="url" v-model="sysSettings.momoLink" placeholder="https://nhantien.momo.vn/..." class="form-control" @change="saveMomoLink">
                        <small class="form-hint">Dán link "Nhận tiền" từ ứng dụng MoMo của bạn vào đây.</small>
                    </div>

                    <div class="branding-grid single-item">
                        <div class="branding-card">
                            <div class="branding-header">
                                <label>Mã QR Hiện Tại</label>
                                <button v-if="sysSettings.fundQR" type="button" class="btn-icon-danger" @click="deleteQR" title="Xóa QR">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="branding-preview qr-preview">
                                <div v-if="sysSettings.fundQR" class="qr-svg-container" v-html="sysSettings.fundQR"></div>
                                <div v-else class="empty-preview">Chưa có mã QR</div>
                                <div class="media-overlay">
                                    <div class="overlay-content">
                                        <button class="btn btn-sm btn-light" @click="triggerQRUpload">{{ sysSettings.fundQR ? 'Thay đổi QR' : 'Tải lên QR' }}</button>
                                        <input type="file" ref="qrInput" style="display: none;" accept="image/*" @change="handleQRUpload">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="sysError" class="alert alert-danger" style="margin-top: var(--spacing-lg);">{{ sysError }}</div>
                    <div v-if="sysSuccess" class="alert alert-success" style="margin-top: var(--spacing-lg);">{{ sysSuccess }}</div>
                </div>

                <div class="penalty-section" style="margin-top: var(--spacing-xl);">
                    <h3>💸 Cấu Hình Mức Phạt</h3>
                    <div class="form-group">
                        <label>Vắng mặt không phép</label>
                        <div class="input-with-unit">
                            <input type="number" v-model="penalties.absent" class="form-control">
                            <span class="unit">VNĐ</span>
                        </div>
                    </div>
                    <div class="penalty-grid">
                        <div class="form-group">
                            <label>Muộn < 10 phút</label>
                            <div class="input-with-unit">
                                <input type="number" v-model="penalties.late.lessThan10Min" class="form-control">
                                <span class="unit">VNĐ</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Muộn < 20 phút</label>
                            <div class="input-with-unit">
                                <input type="number" v-model="penalties.late.lessThan20Min" class="form-control">
                                <span class="unit">VNĐ</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Muộn > 20 phút</label>
                            <div class="input-with-unit">
                                <input type="number" v-model="penalties.late.moreThan20Min" class="form-control">
                                <span class="unit">VNĐ</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-primary" @click="savePenalties" :disabled="isSavingPenalties">
                            {{ isSavingPenalties ? 'Đang lưu...' : '💾 Lưu mức phạt' }}
                        </button>
                        <button class="btn btn-secondary" @click="resetPenalties">Khôi phục mặc định</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Fixed Match Schedules -->
        <div v-if="permissions.canManageQRCode" class="card" style="margin-top: var(--spacing-xl);">
            <div class="card-header">
                <h2>🗓️ Lịch Trận Đấu Cố Định</h2>
            </div>
            <div class="card-content">
                <p class="section-desc">Thiết lập các trận đấu định kỳ hàng tuần. Hệ thống sẽ tự động tạo trận đấu trước 1 ngày.</p>
                
                <div class="table-container" style="margin-bottom: 2rem;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Thứ</th>
                                <th>Giờ</th>
                                <th>Đối thủ</th>
                                <th>Địa điểm</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="fixed in fixedMatches" :key="fixed.id">
                                <td>{{ getDayName(fixed.dayOfWeek) }}</td>
                                <td>{{ fixed.startTime }}</td>
                                <td>{{ fixed.opponent || 'Nội bộ' }}</td>
                                <td>{{ fixed.location || 'Sân vận động' }}</td>
                                <td>
                                    <button class="btn-icon-danger" @click="deleteFixedMatch(fixed.id)">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="fixedMatches.length === 0">
                                <td colspan="5" class="text-center" style="padding: 2rem; color: var(--text-muted);">Chưa có lịch cố định nào</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="add-fixed-form">
                    <h3>➕ Thêm Lịch Cố Định Mới</h3>
                    <div class="fixed-form-grid">
                        <div class="form-group">
                            <label>Thứ trong tuần</label>
                            <select v-model="newFixed.dayOfWeek" class="form-control">
                                <option value="1">Thứ 2</option>
                                <option value="2">Thứ 3</option>
                                <option value="3">Thứ 4</option>
                                <option value="4">Thứ 5</option>
                                <option value="5">Thứ 6</option>
                                <option value="6">Thứ 7</option>
                                <option value="0">Chủ Nhật</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Giờ bắt đầu</label>
                            <input type="time" v-model="newFixed.startTime" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Đối thủ (tùy chọn)</label>
                            <input type="text" v-model="newFixed.opponent" placeholder="Nội bộ..." class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Địa điểm</label>
                            <input type="text" v-model="newFixed.location" placeholder="Tên sân..." class="form-control">
                        </div>
                    </div>
                    <div class="form-actions" style="margin-top: 1rem;">
                        <button class="btn btn-primary" @click="handleAddFixedMatch">
                            💾 Thêm vào lịch cố định
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Data & Migration Settings -->
        <div v-if="permissions.canManageQRCode" class="card" style="margin-top: var(--spacing-xl);">
            <div class="card-header">
                <h2>📦 Dữ Liệu & Chuyển Đổi</h2>
            </div>
            <div class="card-content">
                <p class="section-desc">Chuyển đổi dữ liệu nợ cũ sang cơ chế <strong>"Hóa đơn" (Receivables)</strong> để quản lý chính xác và chuyên nghiệp hơn.</p>
                
                <div class="migration-banner" :class="{ 'already-done': hasReceivables }">
                    <div class="banner-icon">🚀</div>
                    <div class="banner-text">
                        <template v-if="!hasReceivables">
                            <h4>Hệ thống nợ mới đã sẵn sàng!</h4>
                            <p>Bấm nút bên dưới để gộp toàn bộ nợ cũ (Quỹ + Phạt) của thành viên vào sổ nợ mới.</p>
                        </template>
                        <template v-else>
                            <h4>Dữ liệu đã được chuyển đổi</h4>
                            <p>Bạn đã có {{ receivables.length }} bản ghi nợ trong hệ thống. Nếu nhấn chuyển đổi lần nữa, nợ cũ sẽ bị tính trùng.</p>
                        </template>
                    </div>
                </div>

                <div class="form-actions" style="margin-top: 2rem;">
                    <button class="btn btn-warning" @click="handleMigration" :disabled="isMigrating">
                        <span v-if="isMigrating">Đang chuyển đổi...</span>
                        <span v-else>🔄 Bắt đầu Chuyển đổi Dữ liệu</span>
                    </button>
                    <small style="display: block; margin-top: 1rem; color: var(--danger-400);">* Lưu ý: Hãy chắc chắn bạn đã sao lưu dữ liệu trước khi thực hiện.</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useAppState } from '../composables/useAppState';
import { useFinancialCalculations } from '../composables/useFinancialCalculations';
import bcrypt from 'bcryptjs';

const { currentRole, ROLES, permissions } = useAuth();
const { 
    getPassword, updatePassword, settings, updateSettings, 
    fixedMatches, addFixedMatch, deleteFixedMatch,
    receivables, migrateToReceivables, members
} = useAppState();

const { getMemberFinancialStatus } = useFinancialCalculations();

const showPass = ref({ current: false, new: false, confirm: false });
const passForm = ref({ currentPassword: '', newPassword: '', confirmPassword: '' });
const isBusy = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const sysSettings = ref({ fundQR: '', momoLink: '' });
const qrInput = ref(null);
const sysError = ref('');
const sysSuccess = ref('');

const penalties = ref({
    absent: 50000,
    late: { lessThan10Min: 10000, lessThan20Min: 20000, moreThan20Min: 50000 }
});
const isSavingPenalties = ref(false);

const newFixed = ref({
    dayOfWeek: '2',
    startTime: '16:30',
    opponent: '',
    location: ''
});

const isMigrating = ref(false);
const hasReceivables = computed(() => receivables.value.length > 0);

const username = computed(() => {
    if (currentRole.value === ROLES.ADMIN) return 'admin';
    if (currentRole.value === ROLES.ACCOUNTANT) return 'ketoan';
    return '';
});

const roleLabel = computed(() => {
    if (currentRole.value === ROLES.ADMIN) return 'Quản Trị Viên';
    if (currentRole.value === ROLES.ACCOUNTANT) return 'Kế Toán';
    return '';
});

const roleBadgeClass = computed(() => {
    if (currentRole.value === ROLES.ADMIN) return 'badge-primary';
    if (currentRole.value === ROLES.ACCOUNTANT) return 'badge-success';
    return '';
});

onMounted(() => {
    if (settings.value) {
        sysSettings.value.fundQR = settings.value.fundQR || '';
        sysSettings.value.momoLink = settings.value.momoLink || '';
        if (settings.value.penalties) {
            penalties.value.absent = settings.value.penalties.absent || 50000;
            penalties.value.late = { ...settings.value.penalties.late };
        }
    }
});

const handlePasswordChange = async () => {
    errorMsg.value = '';
    successMsg.value = '';

    if (passForm.value.newPassword !== passForm.value.confirmPassword) {
        errorMsg.value = 'Mật khẩu mới và xác nhận mật khẩu không khớp!';
        return;
    }

    if (passForm.value.newPassword.length < 6) {
        errorMsg.value = 'Mật khẩu mới phải có ít nhất 6 ký tự!';
        return;
    }

    isBusy.value = true;
    try {
        const currentHash = await getPassword(username.value);
        if (!currentHash) {
            errorMsg.value = 'Lỗi kết nối. Vui lòng tải lại trang.';
            return;
        }

        let isValid = false;
        try {
            if (!currentHash.startsWith('$2')) {
                isValid = (passForm.value.currentPassword === currentHash);
            } else {
                isValid = bcrypt.compareSync(passForm.value.currentPassword, currentHash);
            }
        } catch (e) {
            console.error('Lỗi hash:', e);
        }

        if (!isValid) {
            errorMsg.value = 'Mật khẩu hiện tại không đúng!';
            return;
        }

        await updatePassword(username.value, passForm.value.newPassword);
        successMsg.value = 'Đổi mật khẩu thành công! Vui lòng sử dụng mật khẩu mới trong lần đăng nhập tới.';
        passForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
    } catch (e) {
        console.error(e);
        errorMsg.value = 'Có lỗi xảy ra khi đổi mật khẩu.';
    } finally {
        isBusy.value = false;
    }
};

const triggerQRUpload = () => qrInput.value.click();

const handleQRUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            sysError.value = '❌ Ảnh quá lớn. Vui lòng chọn ảnh < 2MB';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = async (ev) => {
            const dataUrl = ev.target.result;
            // Generate simple SVG wrapping the image for consistency with deployed version if possible
            // For now just use dataUrl as the QR content if it's already an SVG or wrap it.
            // In the deployed version, it converts to SVG. We'll store as dataUrl-based SVG for simplicity.
            const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><image href="${dataUrl}" width="200" height="200"/></svg>`;
            sysSettings.value.fundQR = svgContent;
            await updateSettings({ fundQR: svgContent });
            sysSuccess.value = '✅ Đã cập nhật mã QR thành công!';
            setTimeout(() => sysSuccess.value = '', 3000);
        };
        reader.readAsDataURL(file);
    }
};

const deleteQR = async () => {
    if (confirm('Bạn có chắc muốn xóa mã QR?')) {
        sysSettings.value.fundQR = '';
        await updateSettings({ fundQR: '' });
        sysSuccess.value = '🗑️ Đã xóa mã QR thành công!';
        setTimeout(() => sysSuccess.value = '', 3000);
    }
};

const saveMomoLink = async () => {
    await updateSettings({ momoLink: sysSettings.value.momoLink });
    sysSuccess.value = '✅ Đã lưu link MoMo thành công!';
    setTimeout(() => sysSuccess.value = '', 3000);
};

const savePenalties = async () => {
    isSavingPenalties.value = true;
    try {
        await updateSettings({ penalties: penalties.value });
        sysSuccess.value = '✅ Đã lưu cài đặt phạt thành công!';
        setTimeout(() => sysSuccess.value = '', 3000);
    } catch (e) {
        sysError.value = 'Lỗi khi lưu mức phạt';
    } finally {
        isSavingPenalties.value = false;
    }
};

const resetPenalties = () => {
    if (confirm('Bạn có chắc muốn khôi phục mức phạt về mặc định?')) {
        penalties.value = {
            absent: 50000,
            late: { lessThan10Min: 10000, lessThan20Min: 20000, moreThan20Min: 50000 }
        };
    }
};

const getDayName = (day) => {
    const names = {
        '1': 'Thứ 2', '2': 'Thứ 3', '3': 'Thứ 4', '4': 'Thứ 5', '5': 'Thứ 6', '6': 'Thứ 7', '0': 'Chủ Nhật'
    };
    return names[day] || day;
};

const handleAddFixedMatch = () => {
    if (!newFixed.value.startTime || !newFixed.value.location) {
        alert('Vui lòng điền đầy đủ giờ và địa điểm!');
        return;
    }
    
    addFixedMatch({ ...newFixed.value });
    newFixed.value = { dayOfWeek: '2', startTime: '16:30', opponent: '', location: '' };
    sysSuccess.value = '✅ Đã thêm lịch trận đấu cố định!';
    setTimeout(() => sysSuccess.value = '', 3000);
};

const handleMigration = async () => {
    if (hasReceivables.value) {
        if (!confirm('Hệ thống đã có dữ liệu nợ mới. Chuyển đổi lần nữa có thể làm sai lệch số liệu. Bạn vẫn muốn tiếp tục?')) return;
    } else {
        if (!confirm('Xác nhận chuyển đổi toàn bộ nợ cũ sang cơ chế sổ nợ mới? Các trận đấu cũ sẽ được đánh dấu là "Đã chốt".')) return;
    }

    isMigrating.value = true;
    try {
        const statusList = members.value.map(m => ({
            id: m.id,
            ...getMemberFinancialStatus(m)
        }));
        
        await migrateToReceivables(statusList);
        sysSuccess.value = '✅ Chuyển đổi dữ liệu thành công!';
        setTimeout(() => sysSuccess.value = '', 5000);
    } catch (e) {
        alert('Lỗi: ' + e.message);
    } finally {
        isMigrating.value = false;
    }
};
</script>

<style scoped>
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.info-item { display: flex; flex-direction: column; gap: 0.5rem; }
.info-item label { font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; }
.info-item span { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); }

.password-input-wrapper { position: relative; display: flex; align-items: center; }
.password-input-wrapper input { width: 100%; padding: 0.75rem 3rem 0.75rem 1rem; background: var(--bg-tertiary); border: 1px solid var(--border-primary); border-radius: var(--radius-md); color: var(--text-primary); }
.toggle-password { position: absolute; right: 1rem; background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; }
.toggle-password svg { width: 20px; height: 20px; }

.section-desc { color: var(--text-secondary); margin-bottom: 1.5rem; }
.form-hint { color: var(--text-muted); margin-top: 0.5rem; display: block; }

.branding-card { background: var(--bg-tertiary); border: 1px solid var(--border-primary); border-radius: var(--radius-lg); padding: 1.5rem; }
.branding-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.branding-preview { aspect-ratio: 1; background: var(--bg-secondary); border-radius: var(--radius-md); overflow: hidden; position: relative; border: 1px solid var(--border-primary); display: flex; align-items: center; justify-content: center; }
.qr-svg-container { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: white; }
.empty-preview { color: var(--text-muted); font-size: 0.85rem; }
.media-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }
.branding-preview:hover .media-overlay { opacity: 1; }

.input-with-unit { position: relative; display: flex; align-items: center; }
.input-with-unit input { padding-right: 3.5rem; }
.unit { position: absolute; right: 1rem; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); }

.penalty-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }

.fixed-form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.add-fixed-form {
    background: var(--bg-tertiary);
    border: 1px dashed var(--border-primary);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
}

.migration-banner {
    display: flex;
    gap: 1.5rem;
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.2);
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    align-items: center;
}
.migration-banner.already-done {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.2);
}
.banner-icon { font-size: 2.5rem; }
.banner-text h4 { margin: 0 0 0.25rem 0; color: #fff; }
.banner-text p { margin: 0; font-size: 0.9rem; color: var(--text-secondary); }

@media (max-width: 768px) {
    .info-grid,
    .penalty-grid,
    .fixed-form-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
</style>
