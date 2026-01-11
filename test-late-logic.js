// Test script để kiểm tra logic tính đi muộn

// Giả lập dữ liệu trận đấu
const match = {
    id: 1736611200000,
    date: "2026-01-11",
    startTime: "19:00",
    matchType: "friendly",
    opponent: "Đội ABC",
    location: "Sân Thống Nhất"
};

// Hàm tính đi muộn (giống logic trong AttendanceView.vue)
function calculateIsLate(match, attendanceTime) {
    if (!match.startTime) {
        return null; // Không có giờ bắt đầu
    }

    const [hours, minutes] = match.startTime.split(':').map(Number);
    const matchStartDateTime = new Date(match.date);
    matchStartDateTime.setHours(hours, minutes, 0, 0);

    const attendanceTimestamp = new Date(attendanceTime);

    return attendanceTimestamp > matchStartDateTime;
}

// Test cases
console.log('=== TEST TÍNH ĐI MUỘN ===\n');

console.log('Trận đấu:', match.opponent);
console.log('Ngày:', match.date);
console.log('Giờ bắt đầu:', match.startTime);
console.log('---\n');

// Test 1: Đến đúng giờ
const onTime = new Date('2026-01-11T19:00:00');
console.log('Test 1: Điểm danh lúc 19:00:00');
console.log('Kết quả:', calculateIsLate(match, onTime) ? '⏰ Muộn' : '✓ Đúng giờ');
console.log('Expected: ✓ Đúng giờ\n');

// Test 2: Đến sớm
const early = new Date('2026-01-11T18:55:00');
console.log('Test 2: Điểm danh lúc 18:55:00');
console.log('Kết quả:', calculateIsLate(match, early) ? '⏰ Muộn' : '✓ Đúng giờ');
console.log('Expected: ✓ Đúng giờ\n');

// Test 3: Đến muộn
const late = new Date('2026-01-11T19:05:00');
console.log('Test 3: Điểm danh lúc 19:05:00');
console.log('Kết quả:', calculateIsLate(match, late) ? '⏰ Muộn' : '✓ Đúng giờ');
console.log('Expected: ⏰ Muộn\n');

// Test 4: Đến muộn nhiều
const veryLate = new Date('2026-01-11T19:30:00');
console.log('Test 4: Điểm danh lúc 19:30:00');
console.log('Kết quả:', calculateIsLate(match, veryLate) ? '⏰ Muộn' : '✓ Đúng giờ');
console.log('Expected: ⏰ Muộn\n');

// Test 5: Không có giờ bắt đầu
const matchNoTime = { ...match, startTime: null };
console.log('Test 5: Trận không có giờ bắt đầu');
console.log('Kết quả:', calculateIsLate(matchNoTime, onTime));
console.log('Expected: null (không tính)\n');

console.log('=== KẾT THÚC TEST ===');
