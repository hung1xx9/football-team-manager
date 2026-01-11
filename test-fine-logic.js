// Test script để kiểm tra logic tính phạt đi muộn

// Giả lập dữ liệu trận đấu
const match = {
    id: 1736611200000,
    date: "2026-01-11",
    startTime: "19:00",
    matchType: "friendly",
    opponent: "Đội ABC",
    location: "Sân Thống Nhất"
};

// Hàm tính phạt (giống logic trong AttendanceView.vue)
function calculateLateFine(match, attendanceTime) {
    if (!match.startTime) {
        return { isLate: false, lateMinutes: 0, lateFine: 0 };
    }

    const [hours, minutes] = match.startTime.split(':').map(Number);
    const matchStartDateTime = new Date(match.date);
    matchStartDateTime.setHours(hours, minutes, 0, 0);

    const attendanceTimestamp = new Date(attendanceTime);
    const isLate = attendanceTimestamp > matchStartDateTime;

    let lateMinutes = 0;
    let lateFine = 0;

    if (isLate) {
        lateMinutes = Math.floor((attendanceTimestamp - matchStartDateTime) / (1000 * 60));

        if (lateMinutes < 10) {
            lateFine = 10000;
        } else if (lateMinutes < 20) {
            lateFine = 20000;
        } else {
            lateFine = 50000;
        }
    }

    return { isLate, lateMinutes, lateFine };
}

// Hàm format tiền
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Test cases
console.log('=== TEST TÍNH PHẠT ĐI MUỘN ===\n');

console.log('Trận đấu:', match.opponent);
console.log('Ngày:', match.date);
console.log('Giờ bắt đầu:', match.startTime);
console.log('---\n');

const testCases = [
    { time: '2026-01-11T18:55:00', desc: 'Đến sớm 5 phút', expectedFine: 0 },
    { time: '2026-01-11T19:00:00', desc: 'Đến đúng giờ', expectedFine: 0 },
    { time: '2026-01-11T19:01:00', desc: 'Muộn 1 phút', expectedFine: 10000 },
    { time: '2026-01-11T19:05:00', desc: 'Muộn 5 phút', expectedFine: 10000 },
    { time: '2026-01-11T19:09:00', desc: 'Muộn 9 phút', expectedFine: 10000 },
    { time: '2026-01-11T19:10:00', desc: 'Muộn 10 phút', expectedFine: 20000 },
    { time: '2026-01-11T19:15:00', desc: 'Muộn 15 phút', expectedFine: 20000 },
    { time: '2026-01-11T19:19:00', desc: 'Muộn 19 phút', expectedFine: 20000 },
    { time: '2026-01-11T19:20:00', desc: 'Muộn 20 phút', expectedFine: 50000 },
    { time: '2026-01-11T19:30:00', desc: 'Muộn 30 phút', expectedFine: 50000 },
    { time: '2026-01-11T20:00:00', desc: 'Muộn 60 phút', expectedFine: 50000 }
];

let passCount = 0;
let failCount = 0;

testCases.forEach((test, index) => {
    const result = calculateLateFine(match, test.time);
    const passed = result.lateFine === test.expectedFine;

    console.log(`Test ${index + 1}: ${test.desc}`);
    console.log(`  Giờ điểm danh: ${new Date(test.time).toLocaleTimeString('vi-VN')}`);
    console.log(`  Kết quả: ${result.isLate ? '⏰ Muộn' : '✓ Đúng giờ'}`);
    console.log(`  Số phút muộn: ${result.lateMinutes} phút`);
    console.log(`  Tiền phạt: ${formatCurrency(result.lateFine)}`);
    console.log(`  Expected: ${formatCurrency(test.expectedFine)}`);
    console.log(`  Status: ${passed ? '✅ PASS' : '❌ FAIL'}`);
    console.log('');

    if (passed) passCount++;
    else failCount++;
});

console.log('=== KẾT QUẢ TEST ===');
console.log(`✅ Passed: ${passCount}/${testCases.length}`);
console.log(`❌ Failed: ${failCount}/${testCases.length}`);

// Test tổng phạt cho nhiều người
console.log('\n=== TEST TỔNG PHẠT TRẬN ĐẤU ===\n');

const attendances = [
    { name: 'Nguyễn Văn A', time: '2026-01-11T18:55:00' },
    { name: 'Trần Văn B', time: '2026-01-11T19:05:00' },
    { name: 'Lê Văn C', time: '2026-01-11T19:15:00' },
    { name: 'Phạm Văn D', time: '2026-01-11T19:25:00' },
    { name: 'Hoàng Văn E', time: '2026-01-11T19:00:00' }
];

let totalFines = 0;

console.log('Danh sách điểm danh:\n');
attendances.forEach(att => {
    const result = calculateLateFine(match, att.time);
    totalFines += result.lateFine;

    const status = result.isLate
        ? `⏰ Muộn ${result.lateMinutes} phút`
        : '✓ Đúng giờ';

    const fine = result.lateFine > 0
        ? `💰 ${formatCurrency(result.lateFine)}`
        : '';

    console.log(`${att.name}: ${status} ${fine}`);
});

console.log('\n---');
console.log(`💰 TỔNG TIỀN PHẠT: ${formatCurrency(totalFines)}`);
console.log('\n=== KẾT THÚC TEST ===');
