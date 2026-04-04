import { ref } from 'vue';
import QRCode from 'qrcode';
import { useAppState } from './useAppState';


// QR Code data structure
const generateQRData = (matchId, matchDate) => {
    return JSON.stringify({
        type: 'attendance',
        matchId,
        matchDate,
        timestamp: Date.now()
    });
};

// Generate QR Code as Data URL
export const generateQRCode = async (matchId, matchDate) => {
    try {
        const data = generateQRData(matchId, matchDate);
        const qrDataUrl = await QRCode.toDataURL(data, {
            width: 300,
            margin: 2,
            color: {
                dark: '#1e293b',
                light: '#ffffff'
            }
        });
        return qrDataUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
        return null;
    }
};

// Parse QR Code data
export const parseQRData = async (qrString) => {
    console.log('🔍 parseQRData - Raw input:', qrString);
    const { showAlert } = useAppState();

    try {
        const data = JSON.parse(qrString);
        console.log('✅ parseQRData - Parsed JSON:', data);

        const isValid = data.type === 'attendance' && data.matchId && data.matchDate;
        console.log('🎯 parseQRData - Validation:', {
            hasType: !!data.type,
            typeValue: data.type,
            typeMatch: data.type === 'attendance',
            hasMatchId: !!data.matchId,
            matchIdValue: data.matchId,
            hasMatchDate: !!data.matchDate,
            matchDateValue: data.matchDate,
            isValid
        });

        if (isValid) {
            return data;
        }

        // Show alert on mobile for debugging
        const debugInfo = `QR Data:\n${JSON.stringify(data, null, 2)}\n\nValidation:\ntype: ${data.type}\nmatchId: ${data.matchId}\nmatchDate: ${data.matchDate}`;
        await showAlert('⚠️ Cấu trúc mã QR không hợp lệ\n\n' + debugInfo, 'Lỗi QR');

        console.warn('⚠️ parseQRData - Invalid QR data structure');
        return null;
    } catch (error) {
        // Show alert on mobile for debugging
        await showAlert('❌ Lỗi xử lý mã QR\n\nRaw: ' + qrString.substring(0, 100) + '...\n\nError: ' + error.message, 'Lỗi QR');

        console.error('❌ parseQRData - JSON parse error:', error.message);
        return null;
    }
};

// Check if user can scan this match (not scanned this match yet)
export const canScanMatch = (memberId, matchId) => {
    const scanKey = `scan_${memberId}_${matchId}`;
    const hasScanned = localStorage.getItem(scanKey);

    console.log('🔍 canScanMatch:', { memberId, matchId, hasScanned: !!hasScanned });

    return !hasScanned; // true nếu chưa quét trận này
};

// Mark as scanned for this match
export const markScannedMatch = (memberId, matchId) => {
    const scanKey = `scan_${memberId}_${matchId}`;
    localStorage.setItem(scanKey, Date.now().toString());

    console.log('✅ markScannedMatch:', { memberId, matchId, key: scanKey });
};

// Get match info if already scanned
export const getScannedMatchInfo = (memberId, matchId) => {
    const scanKey = `scan_${memberId}_${matchId}`;
    const timestamp = localStorage.getItem(scanKey);

    if (!timestamp) return null;

    const scannedAt = new Date(parseInt(timestamp));
    return {
        scannedAt,
        formattedTime: scannedAt.toLocaleString('vi-VN')
    };
};

// Clean up scans for deleted matches (call this when deleting a match)
export const cleanupDeletedMatch = (matchId) => {
    const keysToDelete = [];

    // Find all scan keys for this match
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('scan_') && key.endsWith(`_${matchId}`)) {
            keysToDelete.push(key);
        }
    }

    // Delete them
    keysToDelete.forEach(key => {
        localStorage.removeItem(key);
        console.log('🗑️ Cleaned up scan:', key);
    });

    return keysToDelete.length;
};

// Legacy functions for backward compatibility (deprecated)
export const canScanToday = (memberId) => {
    console.warn('⚠️ canScanToday is deprecated, use canScanMatch instead');
    const lastScanKey = `last_scan_${memberId}`;
    const lastScan = localStorage.getItem(lastScanKey);

    if (!lastScan) return true;

    const lastScanDate = new Date(parseInt(lastScan));
    const today = new Date();

    return !(
        lastScanDate.getDate() === today.getDate() &&
        lastScanDate.getMonth() === today.getMonth() &&
        lastScanDate.getFullYear() === today.getFullYear()
    );
};

export const markScannedToday = (memberId) => {
    console.warn('⚠️ markScannedToday is deprecated, use markScannedMatch instead');
    const lastScanKey = `last_scan_${memberId}`;
    localStorage.setItem(lastScanKey, Date.now().toString());
};

export const getNextScanTime = (memberId) => {
    console.warn('⚠️ getNextScanTime is deprecated');
    const lastScanKey = `last_scan_${memberId}`;
    const lastScan = localStorage.getItem(lastScanKey);

    if (!lastScan) return null;

    const lastScanDate = new Date(parseInt(lastScan));
    const tomorrow = new Date(lastScanDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return tomorrow;
};

export const useQRAttendance = () => {
    const qrCodeUrl = ref(null);
    const isGenerating = ref(false);

    const generateQR = async (matchId, matchDate) => {
        isGenerating.value = true;
        qrCodeUrl.value = await generateQRCode(matchId, matchDate);
        isGenerating.value = false;
        return qrCodeUrl.value;
    };

    return {
        qrCodeUrl,
        isGenerating,
        generateQR,
        parseQRData,
        // New match-based functions
        canScanMatch,
        markScannedMatch,
        getScannedMatchInfo,
        cleanupDeletedMatch,
        // Legacy functions (deprecated)
        canScanToday,
        markScannedToday,
        getNextScanTime
    };
};
