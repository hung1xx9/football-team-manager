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
    console.log('🔍 parseQRData - Raw input:', qrString);

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
        alert('⚠️ QR Structure Invalid\n\n' + debugInfo);

        console.warn('⚠️ parseQRData - Invalid QR data structure');
        return null;
    } catch (error) {
        // Show alert on mobile for debugging
        alert('❌ QR Parse Error\n\nRaw: ' + qrString.substring(0, 100) + '...\n\nError: ' + error.message);

        console.error('❌ parseQRData - JSON parse error:', error.message);
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
