import { ref } from 'vue';
import QRCode from 'qrcode';

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
export const parseQRData = (qrString) => {
    try {
        const data = JSON.parse(qrString);
        if (data.type === 'attendance' && data.matchId && data.matchDate) {
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
};

// Check if user can scan (not scanned today)
export const canScanToday = (memberId) => {
    const lastScanKey = `last_scan_${memberId}`;
    const lastScan = localStorage.getItem(lastScanKey);

    if (!lastScan) return true;

    const lastScanDate = new Date(parseInt(lastScan));
    const today = new Date();

    // Check if last scan was today
    return !(
        lastScanDate.getDate() === today.getDate() &&
        lastScanDate.getMonth() === today.getMonth() &&
        lastScanDate.getFullYear() === today.getFullYear()
    );
};

// Mark as scanned today
export const markScannedToday = (memberId) => {
    const lastScanKey = `last_scan_${memberId}`;
    localStorage.setItem(lastScanKey, Date.now().toString());
};

// Get time until next scan available
export const getNextScanTime = (memberId) => {
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
        canScanToday,
        markScannedToday,
        getNextScanTime
    };
};
