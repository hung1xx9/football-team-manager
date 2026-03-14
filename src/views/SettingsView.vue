<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h1>⚙️ Cài Đặt Hệ Thống</h1>
            </div>
            <div class="card-content">
                <!-- Role Check -->
                <div v-if="!isAdmin" class="access-denied">
                    <div class="empty-icon">🔒</div>
                    <p>Bạn không có quyền truy cập trang này.</p>
                </div>

                <template v-else>
                    <!-- Penalty Settings -->
                    <div class="settings-section">
                        <h2 class="section-title">💰 Cài Đặt Phạt</h2>
                        <form @submit.prevent="savePenaltySettings">
                            <div class="settings-grid">
                                <div class="form-group">
                                    <label>Phạt vắng mặt (VNĐ)</label>
                                    <input
                                        type="number"
                                        v-model.number="penaltyForm.absent"
                                        step="5000"
                                        class="form-control"
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Phạt đi muộn &lt; 10 phút (VNĐ)</label>
                                    <input
                                        type="number"
                                        v-model.number="penaltyForm.lessThan10Min"
                                        step="5000"
                                        class="form-control"
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Phạt đi muộn 10-20 phút (VNĐ)</label>
                                    <input
                                        type="number"
                                        v-model.number="penaltyForm.lessThan20Min"
                                        step="5000"
                                        class="form-control"
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Phạt đi muộn &gt; 20 phút (VNĐ)</label>
                                    <input
                                        type="number"
                                        v-model.number="penaltyForm.moreThan20Min"
                                        step="5000"
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary" :disabled="saving">
                                    <span v-if="saving">Đang lưu...</span>
                                    <span v-else>💾 Lưu Cài Đặt Phạt</span>
                                </button>
                                <button type="button" class="btn btn-secondary" @click="resetPenalties">
                                    🔄 Khôi Phục Mặc Định
                                </button>
                            </div>
                        </form>
                        <div v-if="saveSuccess" class="alert alert-success">✅ Đã lưu cài đặt thành công!</div>
                        <div v-if="saveError" class="alert alert-danger">❌ {{ saveError }}</div>
                    </div>

                    <!-- Password Settings -->
                    <div class="settings-section">
                        <h2 class="section-title">🔐 Đổi Mật Khẩu</h2>
                        <div class="settings-grid">
                            <div class="form-group">
                                <label>Vai trò</label>
                                <select v-model="passwordForm.role" class="form-control">
                                    <option value="admin">Quản trị viên</option>
                                    <option value="treasurer">Thủ quỹ</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Mật khẩu mới <span class="required-mark">*</span></label>
                                <input type="password" v-model="passwordForm.newPassword" class="form-control" placeholder="Nhập mật khẩu mới" />
                            </div>
                            <div class="form-group">
                                <label>Xác nhận mật khẩu <span class="required-mark">*</span></label>
                                <input type="password" v-model="passwordForm.confirmPassword" class="form-control" placeholder="Nhập lại mật khẩu" />
                            </div>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-primary" @click="changePassword" :disabled="savingPassword">
                                <span v-if="savingPassword">Đang lưu...</span>
                                <span v-else>🔑 Đổi Mật Khẩu</span>
                            </button>
                        </div>
                        <div v-if="passwordSuccess" class="alert alert-success">✅ {{ passwordSuccess }}</div>
                        <div v-if="passwordError" class="alert alert-danger">❌ {{ passwordError }}</div>
                    </div>

                    <!-- MoMo Settings -->
                    <div class="settings-section">
                        <h2 class="section-title">💳 Cài Đặt MoMo</h2>
                        <div class="form-group">
                            <label>Số điện thoại MoMo nhận tiền</label>
                            <input
                                type="text"
                                v-model="momoForm.momoPhone"
                                class="form-control"
                                placeholder="09xxxxxxxx"
                                style="max-width: 300px;"
                            />
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-primary" @click="saveMomoSettings">
                                💾 Lưu Cài Đặt MoMo
                            </button>
                        </div>
                    </div>

                    <!-- Security Notice -->
                    <div class="card" style="margin-top: var(--spacing-xl);">
                        <div class="card-content">
                            <div class="security-notice">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                                <div>
                                    <h3>Lưu Ý Bảo Mật</h3>
                                    <ul>
                                        <li>Sử dụng mật khẩu mạnh, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
                                        <li>Không chia sẻ mật khẩu với người khác</li>
                                        <li>Thay đổi mật khẩu định kỳ để đảm bảo an toàn</li>
                                        <li>Đăng xuất sau khi sử dụng xong</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useAppState } from '../composables/useAppState';

const { settings, updateSettings } = useAppState();

const isAdmin = computed(() => settings.value?.currentRole === 'admin');

const saving = ref(false);
const savingPassword = ref(false);
const saveSuccess = ref(false);
const saveError = ref('');
const passwordSuccess = ref('');
const passwordError = ref('');

// Default penalty values
const DEFAULT_PENALTIES = {
    absent: 50000,
    lessThan10Min: 10000,
    lessThan20Min: 20000,
    moreThan20Min: 50000
};

const penaltyForm = reactive({ ...DEFAULT_PENALTIES });
const passwordForm = reactive({ role: 'admin', newPassword: '', confirmPassword: '' });
const momoForm = reactive({ momoPhone: '' });

// Sync from settings
watch(() => settings.value, (val) => {
    if (val?.penalties) {
        Object.assign(penaltyForm, {
            absent: val.penalties.absent ?? DEFAULT_PENALTIES.absent,
            lessThan10Min: val.penalties.lessThan10Min ?? DEFAULT_PENALTIES.lessThan10Min,
            lessThan20Min: val.penalties.lessThan20Min ?? DEFAULT_PENALTIES.lessThan20Min,
            moreThan20Min: val.penalties.moreThan20Min ?? DEFAULT_PENALTIES.moreThan20Min
        });
    }
    if (val?.momoPhone) momoForm.momoPhone = val.momoPhone;
}, { immediate: true });

const savePenaltySettings = async () => {
    saving.value = true;
    saveSuccess.value = false;
    saveError.value = '';
    try {
        await updateSettings({ penalties: { ...penaltyForm } });
        saveSuccess.value = true;
        setTimeout(() => saveSuccess.value = false, 3000);
    } catch (e) {
        saveError.value = e.message || 'Có lỗi xảy ra';
    } finally {
        saving.value = false;
    }
};

const resetPenalties = () => {
    Object.assign(penaltyForm, DEFAULT_PENALTIES);
};

const changePassword = async () => {
    passwordSuccess.value = '';
    passwordError.value = '';
    if (!passwordForm.newPassword || !passwordForm.confirmPassword) {
        passwordError.value = 'Vui lòng điền đầy đủ thông tin!';
        return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        passwordError.value = 'Mật khẩu xác nhận không khớp!';
        return;
    }
    if (passwordForm.newPassword.length < 6) {
        passwordError.value = 'Mật khẩu phải có ít nhất 6 ký tự!';
        return;
    }
    savingPassword.value = true;
    try {
        const key = passwordForm.role === 'admin' ? 'adminPassword' : 'treasurerPassword';
        await updateSettings({ [key]: passwordForm.newPassword });
        passwordSuccess.value = `Đã đổi mật khẩu ${passwordForm.role === 'admin' ? 'Quản trị viên' : 'Thủ quỹ'} thành công!`;
        passwordForm.newPassword = '';
        passwordForm.confirmPassword = '';
        setTimeout(() => passwordSuccess.value = '', 5000);
    } catch (e) {
        passwordError.value = e.message || 'Đổi mật khẩu thất bại';
    } finally {
        savingPassword.value = false;
    }
};

const saveMomoSettings = async () => {
    await updateSettings({ momoPhone: momoForm.momoPhone });
    alert('✅ Đã lưu cài đặt MoMo!');
};
</script>

<style scoped>
.settings-section {
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.settings-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.section-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: var(--text-primary);
}

.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
}

.alert {
    margin-top: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
}

.alert-success {
    background: rgba(74, 222, 128, 0.1);
    border: 1px solid rgba(74, 222, 128, 0.3);
    color: #4ade80;
}

.alert-danger {
    background: rgba(248, 113, 113, 0.1);
    border: 1px solid rgba(248, 113, 113, 0.3);
    color: #f87171;
}

.access-denied {
    text-align: center;
    padding: 3rem;
    color: var(--text-muted);
}

.empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.required-mark {
    color: #f87171;
}

.security-notice {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}

.security-notice svg {
    width: 40px;
    height: 40px;
    color: #4ade80;
    flex-shrink: 0;
}

.security-notice h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.security-notice ul {
    list-style: disc;
    padding-left: 1.25rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
</style>
