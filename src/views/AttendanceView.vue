<template>
    <div class="page-content animate-fade">
        <div class="card animate-spring">
            <div class="card-header">
                <h2>Điểm Danh QR Code</h2>
            </div>
            <div class="card-content">
                <!-- QR Scanner -->
                <div class="qr-scanner-container">
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
import { useQRAttendance, parseQRData, canScanMatch, markScannedMatch, getScannedMatchInfo } from '../composables/useQRAttendance';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';

const { matches, saveMatch, updateManualAttendanceRequest } = useAppState();
const { guestMemberId } = useAuth();

const isScanning = ref(false);
const canScan = ref(true);
const currentMatchId = ref(null);
const scanResult = ref(null);

onMounted(() => {
    // Không check permission khi mount nữa
    // Sẽ check khi quét QR (vì cần matchId từ QR)
});

const checkScanPermissionForMatch = (matchId) => {
    if (!guestMemberId.value || !matchId) {
        return false;
    }
    
    return canScanMatch(guestMemberId.value, matchId);
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
        const qrData = await parseQRData(detectedCodes[0].rawValue);

        
        console.log('🔍 QR Scan Debug:', {
            guestMemberId: guestMemberId.value,
            guestMemberIdType: typeof guestMemberId.value,
            qrData
        });
        
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
        
        console.log('📋 Attendance List:', match.attendance.map(a => ({
            memberId: a.memberId,
            memberIdType: typeof a.memberId,
            status: a.status
        })));
        
        // Check if member exists in attendance list
        let attList = [];
        if (match.attendance) {
            attList = Array.isArray(match.attendance) ? [...match.attendance] : Object.values(match.attendance);
        }
        const attendanceIndex = attList.findIndex(a => String(a.memberId) === String(guestMemberId.value));
        
        console.log('🎯 Match Result:', {
            attendanceIndex,
            found: attendanceIndex !== -1
        });
        
        if (attendanceIndex === -1) {
            showResult(false, 'Bạn không có trong danh sách trận này');
            return;
        }
        
        // Check if already scanned this match (using new logic)
        if (!checkScanPermissionForMatch(qrData.matchId)) {
            const scanInfo = getScannedMatchInfo(guestMemberId.value, qrData.matchId);
            const timeStr = scanInfo ? ` lúc ${scanInfo.formattedTime}` : '';
            showResult(false, `Bạn đã điểm danh trận này rồi${timeStr}`);
            return;
        }
        
        match.attendance = attList; // Normalize to array for Firebase update
        
        // Check if already marked as present in match data
        if (match.attendance[attendanceIndex].status === 'present') {
            showResult(false, 'Bạn đã điểm danh trận này rồi');
            return;
        }
        
        // Update attendance status to present
        const attendanceTimestamp = new Date();
        
        // Calculate if late or on-time
        let isLate = false;
        let lateMinutes = 0;
        let lateFine = 0;
        
        if (match.startTime) {
            // Parse match start time
            const [hours, minutes] = match.startTime.split(':').map(Number);
            const matchStartDateTime = new Date(match.date);
            matchStartDateTime.setHours(hours, minutes, 0, 0);
            
            // Check if attendance is after start time
            isLate = attendanceTimestamp > matchStartDateTime;
            
            if (isLate) {
                // Calculate minutes late
                lateMinutes = Math.floor((attendanceTimestamp - matchStartDateTime) / (1000 * 60));
                
                // Calculate fine based on late minutes
                if (lateMinutes < 10) {
                    lateFine = 10000;
                } else if (lateMinutes < 20) {
                    lateFine = 20000;
                } else {
                    lateFine = 50000;
                }
            }
        }
        
        match.attendance[attendanceIndex].status = 'present';
        match.attendance[attendanceIndex].timestamp = attendanceTimestamp.toISOString();
        match.attendance[attendanceIndex].attendanceMethod = 'qr';
        match.attendance[attendanceIndex].isLate = isLate;
        match.attendance[attendanceIndex].lateMinutes = lateMinutes;
        match.attendance[attendanceIndex].lateFine = lateFine;
        
        try {
            await saveMatch(match);
            console.log('✅ QR Attendance updated directly:', {
                matchId: match.id,
                memberId: guestMemberId.value,
                status: 'present',
                timestamp: attendanceTimestamp.toISOString()
            });
            
            markScannedMatch(guestMemberId.value, qrData.matchId);
            
            const matchInfo = `${match.opponent || 'Trận đấu'} - ${new Date(match.date).toLocaleDateString('vi-VN')}`;
            let lateInfo = isLate ? ` (Đi muộn ${lateMinutes} phút)` : ' (Đúng giờ)';
            
            if (lateFine > 0) {
                const fineFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(lateFine);
                lateInfo += `\n💰 Phạt: ${fineFormatted}`;
            }
            
            showResult(true, '✅ Điểm danh thành công!' + lateInfo, matchInfo);
            
            setTimeout(() => {
                stopScanning();
            }, 3000);
        } catch (error) {
            console.error('❌ Error saving QR attendance:', error);
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
    padding: 3rem 0;
}

.scanner-active {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
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
    width: 240px;
    height: 240px;
    border: 3px solid var(--primary-500);
    border-radius: var(--radius-xl);
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.4);
}

.scanner-hint {
    margin-top: 1.5rem;
    color: white;
    font-weight: 700;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    font-size: 15px;
}

.scan-result {
    text-align: center;
    padding: 2rem;
    border-radius: var(--radius-lg);
    margin-top: 2rem;
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.scan-result.success {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid var(--success);
    color: var(--success);
}

.scan-result.error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid var(--danger);
    color: var(--danger);
}

.scan-result svg {
    margin: 0 auto 1.25rem;
}

.scan-result h3 {
    margin-bottom: 0.5rem;
    font-weight: 700;
    font-size: 1.25rem;
}

.scan-result p {
    font-size: 1rem;
    font-weight: 500;
}
</style>
