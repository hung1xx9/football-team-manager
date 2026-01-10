<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h2>Điểm Danh QR Code</h2>
            </div>
            <div class="card-content">
                <!-- Scan Status -->
                <div v-if="!canScan" class="scan-locked">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 64px; height: 64px; margin: 0 auto 1rem; color: var(--warning-500);">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <h3>Đã điểm danh trận này</h3>
                </div>

                <!-- QR Scanner -->
                <div v-else class="qr-scanner-container">
                    <div v-if="!isScanning" class="scan-prompt">
                        <!-- <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 80px; height: 80px; margin: 0 auto 1rem; color: var(--primary-400);">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <path d="M3 9h18"></path>
                            <path d="M9 21V9"></path>
                        </svg> -->
                        <button class="btn btn-primary btn-lg" @click="startScanning">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                <circle cx="12" cy="13" r="4"></circle>
                            </svg>
                            Bắt Đầu Quét QR
                        </button>
                    </div>

                    <div v-else class="scanner-active">
                        <qrcode-stream 
                            @detect="onDetect" 
                            @error="onError"
                            @camera-on="onCameraOn"
                            :track="paintBoundingBox">
                            <div class="scanner-overlay">
                                <div class="scanner-frame"></div>
                                <p class="scanner-hint">Đưa mã QR vào khung hình</p>
                            </div>
                        </qrcode-stream>
                        <button class="btn btn-secondary" style="margin-top: 1rem;" @click="stopScanning">
                            Dừng Quét
                        </button>
                    </div>
                </div>

                <!-- Scan Result -->
                <div v-if="scanResult" class="scan-result" :class="scanResult.success ? 'success' : 'error'">
                    <svg v-if="scanResult.success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 48px; height: 48px;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 48px; height: 48px;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    <h3>{{ scanResult.message }}</h3>
                    <p v-if="scanResult.matchInfo">{{ scanResult.matchInfo }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import { useQRAttendance, parseQRData, canScanToday, markScannedToday, getNextScanTime } from '../composables/useQRAttendance';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';

const { matches, saveMatch } = useAppState();
const { guestMemberId } = useAuth();

const isScanning = ref(false);
const canScan = ref(true);
const nextScanTime = ref('');
const scanResult = ref(null);

onMounted(() => {
    checkScanPermission();
});

const checkScanPermission = () => {
    if (!guestMemberId.value) {
        canScan.value = false;
        return;
    }
    
    canScan.value = canScanToday(guestMemberId.value);
    
    if (!canScan.value) {
        const nextTime = getNextScanTime(guestMemberId.value);
        if (nextTime) {
            nextScanTime.value = nextTime.toLocaleString('vi-VN');
        }
    }
};

const startScanning = () => {
    isScanning.value = true;
    scanResult.value = null;
};

const stopScanning = () => {
    isScanning.value = false;
};

const onDetect = async (detectedCodes) => {
    if (detectedCodes && detectedCodes.length > 0) {
        const qrData = parseQRData(detectedCodes[0].rawValue);
        
        if (!qrData) {
            showResult(false, 'Mã QR không hợp lệ');
            return;
        }
        
        // Find match
        const match = matches.value.find(m => m.id === qrData.matchId);
        
        if (!match) {
            showResult(false, 'Không tìm thấy trận đấu');
            return;
        }
        
        // Check if member exists in attendance list
        const attendanceIndex = match.attendance.findIndex(a => a.memberId === guestMemberId.value);
        
        if (attendanceIndex === -1) {
            showResult(false, 'Bạn không có trong danh sách trận này');
            return;
        }
        
        // Check if already marked as present
        if (match.attendance[attendanceIndex].status === 'present') {
            showResult(false, 'Bạn đã điểm danh trận này rồi');
            return;
        }
        
        // Update attendance status to present
        match.attendance[attendanceIndex].status = 'present';
        
        // Save match with updated attendance
        try {
            await saveMatch(match);
            console.log('✅ Attendance updated:', {
                matchId: match.id,
                memberId: guestMemberId.value,
                status: 'present'
            });
            
            // Mark as scanned for this match (prevent duplicate scan)
            markScannedToday(guestMemberId.value);
            
            const matchInfo = `${match.opponent || 'Trận đấu'} - ${new Date(match.date).toLocaleDateString('vi-VN')}`;
            showResult(true, '✅ Điểm danh thành công!', matchInfo);
            
            // Update scan permission after 2 seconds
            setTimeout(() => {
                checkScanPermission();
                stopScanning();
            }, 2000);
        } catch (error) {
            console.error('❌ Error saving attendance:', error);
            showResult(false, 'Lỗi khi lưu điểm danh. Vui lòng thử lại.');
        }
    }
};

const showResult = (success, message, matchInfo = null) => {
    scanResult.value = { success, message, matchInfo };
    stopScanning();
};

const onError = (error) => {
    console.error('Camera error:', error);
    showResult(false, 'Lỗi camera: ' + error.message);
};

const onCameraOn = () => {
    console.log('Camera ready');
};

const paintBoundingBox = (detectedCodes, ctx) => {
    for (const detectedCode of detectedCodes) {
        const { boundingBox: { x, y, width, height } } = detectedCode;
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00ff00';
        ctx.strokeRect(x, y, width, height);
    }
};
</script>

<style scoped>
.qr-scanner-container {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
}

.scan-prompt {
    padding: var(--spacing-2xl);
}

.scanner-active {
    position: relative;
}

.scanner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.scanner-frame {
    width: 250px;
    height: 250px;
    border: 3px solid var(--primary-400);
    border-radius: var(--radius-lg);
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}

.scanner-hint {
    margin-top: var(--spacing-lg);
    color: white;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.scan-locked {
    text-align: center;
    padding: var(--spacing-2xl);
}

.scan-locked h3 {
    color: var(--warning-500);
    margin-bottom: var(--spacing-md);
}

.scan-result {
    text-align: center;
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    margin-top: var(--spacing-xl);
}

.scan-result.success {
    background: rgba(34, 197, 94, 0.1);
    border: 2px solid var(--success-500);
    color: var(--success-500);
}

.scan-result.error {
    background: rgba(239, 68, 68, 0.1);
    border: 2px solid var(--danger-500);
    color: var(--danger-500);
}

.scan-result svg {
    margin: 0 auto var(--spacing-md);
}

.scan-result h3 {
    margin-bottom: var(--spacing-sm);
}
</style>
