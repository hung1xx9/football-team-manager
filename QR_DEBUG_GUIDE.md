# Hướng Dẫn Kiểm Tra Lỗi QR Code Điểm Danh

## Vấn Đề
Khi Khách quét mã QR điểm danh, hệ thống báo "Mã QR không hợp lệ" hoặc "Bạn không có trong danh sách trận này".

## Nguyên Nhân
Có thể do sự không khớp kiểu dữ liệu (type mismatch) giữa:
- `guestMemberId` (ID của Khách đăng nhập)
- `memberId` trong danh sách attendance của trận đấu

## Các Thay Đổi Đã Thực Hiện

### 1. Sửa App.vue
- Chuyển đổi `selectedMemberId` sang kiểu `number` trước khi lưu
- Thêm logging để debug

### 2. Sửa AttendanceView.vue
- Thêm logging chi tiết để xem:
  - Giá trị và kiểu của `guestMemberId`
  - Danh sách attendance với kiểu dữ liệu của từng `memberId`
  - Kết quả so sánh

## Cách Kiểm Tra

### Bước 1: Đăng xuất và đăng nhập lại
1. Mở ứng dụng (đang chạy tại http://localhost:5173)
2. Click "Thoát" để đăng xuất
3. Chọn "Khách (Chỉ xem)"
4. Chọn một thành viên từ danh sách
5. Mở Console (F12) và xem log "👤 Guest Login:"

### Bước 2: Tạo trận đấu mới (với tài khoản Admin)
1. Đăng xuất khỏi tài khoản Khách
2. Đăng nhập Admin (username: admin, password: 12345678@Abc)
3. Vào "Trận Đấu"
4. Tạo một trận đấu mới
5. Chọn thành viên có mặt (bao gồm thành viên bạn sẽ dùng để test)
6. Lưu trận đấu
7. Click "Mã QR" để xem mã QR

### Bước 3: Quét QR với tài khoản Khách
1. Đăng xuất Admin
2. Đăng nhập lại với tài khoản Khách (chọn cùng thành viên đã được thêm vào trận đấu)
3. Vào "Điểm Danh"
4. Click "Bắt Đầu Quét QR"
5. Quét mã QR (hoặc dùng điện thoại quét QR trên màn hình)
6. Mở Console (F12) và xem các log:
   - "🔍 QR Scan Debug:" - Xem guestMemberId và kiểu dữ liệu
   - "📋 Attendance List:" - Xem danh sách attendance và kiểu dữ liệu
   - "🎯 Match Result:" - Xem kết quả tìm kiếm

## Kết Quả Mong Đợi

### Console Log khi đăng nhập Khách:
```
👤 Guest Login: {
  selectedMemberId: 1,
  selectedMemberIdType: "number",
  memberIdAsNumber: 1,
  memberIdAsNumberType: "number",
  memberName: "Nguyễn Văn A"
}
```

### Console Log khi quét QR:
```
🔍 QR Scan Debug: {
  guestMemberId: 1,
  guestMemberIdType: "number",
  qrData: { type: "attendance", matchId: 1234567890, matchDate: "2026-01-11" }
}

📋 Attendance List: [
  { memberId: 1, memberIdType: "number", status: "absent" },
  { memberId: 2, memberIdType: "number", status: "absent" },
  ...
]

🎯 Match Result: {
  attendanceIndex: 0,
  found: true
}

✅ Attendance updated: {
  matchId: 1234567890,
  memberId: 1,
  status: "present"
}
```

## Nếu Vẫn Lỗi

Nếu vẫn thấy `attendanceIndex: -1` hoặc `found: false`, hãy:

1. Kiểm tra log "📋 Attendance List" - xem có `memberId` nào khớp với `guestMemberId` không
2. Kiểm tra kiểu dữ liệu - tất cả phải là `"number"`
3. Chụp màn hình Console log và gửi lại để tôi hỗ trợ thêm

## Lưu Ý
- Mỗi Khách chỉ có thể quét QR **1 lần mỗi ngày**
- Sau khi quét thành công, phải đợi đến ngày hôm sau mới quét được tiếp
- Nếu muốn test lại, cần xóa localStorage: `localStorage.removeItem('last_scan_' + guestMemberId)`
