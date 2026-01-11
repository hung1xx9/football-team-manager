# 🔧 Hướng Dẫn Debug Lỗi "Mã QR Không Hợp Lệ"

## ⚠️ Vấn Đề
Khi quét mã QR, luôn nhận được thông báo **"Mã QR không hợp lệ"**

## 🔍 Cách Debug

### Bước 1: Mở Console
1. Truy cập: https://football-team-manager-14a39.web.app
2. Nhấn **F12** để mở Developer Tools
3. Chuyển sang tab **Console**

### Bước 2: Đăng Nhập Admin và Tạo Mã QR
1. Đăng nhập Admin:
   - Username: `admin`
   - Password: `12345678@Abc`
2. Vào **"Trận Đấu"**
3. Click **"Thêm Trận Đấu"**:
   - Chọn ngày
   - Nhập đối thủ
   - Nhập địa điểm
   - **QUAN TRỌNG:** Tick chọn ít nhất 1 thành viên trong danh sách điểm danh
   - Click **"Lưu"**
4. Click **"Mã QR"** trên trận đấu vừa tạo
5. Mã QR sẽ hiển thị - **GIỮ NGUYÊN CỬA SỔ NÀY**

### Bước 3: Đăng Nhập Khách (Tab/Cửa Sổ Mới)
**QUAN TRỌNG:** Mở một tab mới hoặc cửa sổ ẩn danh (Incognito)

1. Truy cập: https://football-team-manager-14a39.web.app
2. Nhấn **F12** để mở Console
3. Chọn **"Khách (Chỉ xem)"**
4. Chọn **ĐÚNG THÀNH VIÊN** mà bạn đã tick ở Bước 2
5. Xem Console, sẽ có log:
   ```
   👤 Guest Login: {
     selectedMemberId: ...,
     memberIdAsNumber: ...,
     memberName: "..."
   }
   ```

### Bước 4: Quét Mã QR
1. Vào **"Điểm Danh"**
2. Click **"Bắt Đầu Quét QR"**
3. Cho phép truy cập camera khi trình duyệt hỏi
4. Quét mã QR từ tab Admin (hoặc dùng điện thoại quét từ màn hình)

### Bước 5: Xem Console Log
Sau khi quét, Console sẽ hiển thị các log theo thứ tự:

#### ✅ Log Mong Đợi (Thành Công):
```
🔍 parseQRData - Raw input: {"type":"attendance","matchId":1736577600000,"matchDate":"2026-01-11","timestamp":1736577600123}

✅ parseQRData - Parsed JSON: {type: 'attendance', matchId: 1736577600000, matchDate: '2026-01-11', timestamp: 1736577600123}

🎯 parseQRData - Validation: {
  hasType: true,
  typeValue: "attendance",
  typeMatch: true,
  hasMatchId: true,
  matchIdValue: 1736577600000,
  hasMatchDate: true,
  matchDateValue: "2026-01-11",
  isValid: true
}

🔍 QR Scan Debug: {
  guestMemberId: 1,
  guestMemberIdType: "number",
  qrData: {type: 'attendance', matchId: 1736577600000, matchDate: '2026-01-11'}
}

📋 Attendance List: [
  {memberId: 1, memberIdType: "number", status: "absent"},
  {memberId: 2, memberIdType: "number", status: "absent"},
  ...
]

🎯 Match Result: {
  attendanceIndex: 0,
  found: true
}

✅ Attendance updated: {...}
```

#### ❌ Log Lỗi (Cần Kiểm Tra):

**Lỗi 1: JSON Parse Error**
```
🔍 parseQRData - Raw input: [chuỗi lạ không phải JSON]
❌ parseQRData - JSON parse error: Unexpected token...
```
➡️ **Nguyên nhân:** Camera đọc sai mã QR hoặc mã QR bị hỏng

**Lỗi 2: Invalid QR Structure**
```
🔍 parseQRData - Raw input: {"something":"else"}
✅ parseQRData - Parsed JSON: {something: "else"}
🎯 parseQRData - Validation: {
  hasType: false,
  typeValue: undefined,
  typeMatch: false,
  ...
  isValid: false
}
⚠️ parseQRData - Invalid QR data structure
```
➡️ **Nguyên nhân:** Quét nhầm mã QR khác (không phải mã QR điểm danh)

**Lỗi 3: Không Tìm Thấy Trận Đấu**
```
🔍 QR Scan Debug: {guestMemberId: 1, ...}
[Không có log "📋 Attendance List"]
```
➡️ **Nguyên nhân:** `matchId` trong QR không khớp với trận đấu nào trong database

**Lỗi 4: Không Có Trong Danh Sách**
```
📋 Attendance List: [
  {memberId: 2, ...},
  {memberId: 3, ...},
  // Không có memberId: 1
]
🎯 Match Result: {
  attendanceIndex: -1,
  found: false
}
```
➡️ **Nguyên nhân:** Thành viên không được tick trong danh sách điểm danh khi tạo trận

## 🎯 Các Trường Hợp Thường Gặp

### Trường Hợp 1: "Mã QR không hợp lệ" ngay lập tức
- ✅ Kiểm tra log `parseQRData`
- ✅ Đảm bảo quét đúng mã QR từ Admin
- ✅ Thử tạo mã QR mới

### Trường Hợp 2: "Không tìm thấy trận đấu"
- ✅ Đảm bảo đã tải lại trang sau khi tạo trận mới
- ✅ Kiểm tra `matchId` trong log có khớp không

### Trường Hợp 3: "Bạn không có trong danh sách trận này"
- ✅ Kiểm tra `guestMemberId` trong log
- ✅ Kiểm tra `Attendance List` có chứa `memberId` đó không
- ✅ Đảm bảo đã tick thành viên khi tạo trận

## 📸 Gửi Thông Tin Debug

Nếu vẫn lỗi, hãy chụp màn hình Console với:
1. ✅ Tất cả log từ khi bắt đầu quét
2. ✅ Log "👤 Guest Login" (nếu có)
3. ✅ Log "🔍 parseQRData" 
4. ✅ Thông báo lỗi màu đỏ (nếu có)

## 🔄 Reset Để Test Lại

Nếu muốn test lại trong cùng ngày:

1. Mở Console (F12)
2. Chạy lệnh:
```javascript
// Xem ID hiện tại
console.log('Current guest ID:', localStorage.getItem('guest_member_id'));

// Xóa giới hạn quét
const guestId = localStorage.getItem('guest_member_id');
localStorage.removeItem('last_scan_' + guestId);
console.log('Reset done! You can scan again.');
```

## 💡 Tips
- Dùng **Incognito/Private Mode** để test với nhiều tài khoản khác nhau
- Đảm bảo camera có đủ ánh sáng khi quét QR
- Giữ mã QR ổn định, không rung lắc
- Nếu dùng điện thoại quét từ màn hình, tăng độ sáng màn hình
