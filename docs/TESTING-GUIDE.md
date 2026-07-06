# 🧪 Hướng Dẫn Test Hệ Thống MoMo Payment

## ✅ Checklist Test

### 1. Test Đổi Tên Vai Trò
- [ ] Mở ứng dụng tại http://localhost:5173
- [ ] Kiểm tra modal chọn vai trò
- [ ] Xác nhận nút hiển thị: **"Thành viên (Chỉ xem)"** (không phải "Khách")
- [ ] Đăng nhập và kiểm tra thông báo có hiển thị "Thành viên" không

### 2. Test Luồng Thành Viên - Thanh Toán MoMo

#### A. Đăng nhập Thành viên
1. Nhấn nút **"Thành viên (Chỉ xem)"**
2. Chọn một thành viên từ danh sách
3. Nhấn **"Xác Nhận"**
4. Kiểm tra thông báo: "Xin chào [Tên Thành Viên]!"

#### B. Vào trang Đóng Quỹ/Phạt
1. Click menu **"Đóng Quỹ/Phạt"** (icon đồng hồ)
2. Kiểm tra hiển thị:
   - [ ] Card "Quỹ Còn Phải Đóng"
   - [ ] Card "Phạt Còn Phải Đóng"
   - [ ] Nút "Đóng Quỹ Qua MoMo"
   - [ ] Nút "Đóng Phạt Qua MoMo"

#### C. Test Thanh Toán Quỹ
1. Nhấn **"Đóng Quỹ Qua MoMo"**
2. Kiểm tra modal hiển thị:
   - [ ] Tiêu đề: "Đóng Quỹ Qua MoMo"
   - [ ] Input số tiền (có placeholder hiển thị số tiền tối đa)
   - [ ] Textarea ghi chú
   - [ ] Nút "Tạo Mã QR"

3. Nhập số tiền (VD: 100000)
4. Nhập ghi chú (VD: "Đóng quỹ tháng 1")
5. Nhấn **"Tạo Mã QR"**

6. Kiểm tra màn hình QR:
   - [ ] Hiển thị QR code
   - [ ] Hiển thị số tiền
   - [ ] Hiển thị loại: "Quỹ tháng"
   - [ ] Hiển thị SĐT nhận (nếu đã cấu hình)
   - [ ] Hiển thị hướng dẫn 5 bước
   - [ ] Hiển thị cảnh báo: "Giao dịch sẽ được gửi đến Admin để phê duyệt"
   - [ ] Nút "Quay Lại"
   - [ ] Nút "Đã Thanh Toán"

7. Nhấn **"Đã Thanh Toán"**
8. Confirm dialog xuất hiện
9. Nhấn OK
10. Kiểm tra thông báo: "✅ Giao dịch đã được gửi! ⏳ Đang chờ Admin phê duyệt..."

#### D. Kiểm tra Giao Dịch Chờ Duyệt
1. Modal đóng lại
2. Scroll xuống phần **"Giao Dịch Chờ Phê Duyệt"**
3. Kiểm tra card giao dịch vừa tạo:
   - [ ] Icon: 💰 Quỹ Tháng
   - [ ] Số tiền hiển thị đúng
   - [ ] Thời gian tạo
   - [ ] Status badge: "⏳ Chờ Admin phê duyệt" (màu vàng)
   - [ ] Border màu vàng bên trái

#### E. Test Thanh Toán Phạt
1. Lặp lại các bước C nhưng với nút **"Đóng Phạt Qua MoMo"**
2. Kiểm tra icon: ⚠️ Tiền Phạt

### 3. Test Luồng Admin - Phê Duyệt

#### A. Đăng nhập Admin
1. Thoát khỏi tài khoản Thành viên (nút "Thoát")
2. Nhấn **"Quản Trị Viên (Full)"**
3. Nhập:
   - Username: `admin`
   - Password: `khongngungbocuoc`
4. Nhấn **"Đăng Nhập"**

#### B. Vào trang Phê Duyệt GD
1. Click menu **"Phê Duyệt GD"** (icon check)
2. Kiểm tra hiển thị:
   - [ ] 4 stat cards:
     - Chờ duyệt (số lượng > 0)
     - Đã duyệt hôm nay
     - Đã từ chối
     - Tổng chờ duyệt (số tiền)
   - [ ] 2 tabs: "Chờ Duyệt" / "Đã Từ Chối"
   - [ ] Danh sách giao dịch chờ duyệt

#### C. Kiểm tra Transaction Card
Mỗi card phải hiển thị:
- [ ] Avatar với initials của thành viên
- [ ] Tên thành viên
- [ ] Thời gian tạo (relative time: "X phút trước")
- [ ] Số tiền (màu xanh, font lớn)
- [ ] Badge loại: 💰 Quỹ hoặc ⚠️ Phạt
- [ ] Mô tả giao dịch
- [ ] Mã GD MoMo (nếu có)
- [ ] 2 nút: "Phê Duyệt" (xanh) và "Từ Chối" (đỏ)

#### D. Test Phê Duyệt
1. Nhấn nút **"Phê Duyệt"** trên một giao dịch
2. Confirm dialog xuất hiện
3. Nhấn OK
4. Kiểm tra:
   - [ ] Thông báo: "✅ Đã phê duyệt giao dịch thành công!"
   - [ ] Giao dịch biến mất khỏi danh sách "Chờ Duyệt"
   - [ ] Stat "Chờ duyệt" giảm 1
   - [ ] Stat "Đã duyệt hôm nay" tăng 1

5. Vào trang **"Đóng Quỹ/Phạt"** (Finance)
6. Kiểm tra giao dịch đã xuất hiện trong bảng transactions

#### E. Test Từ Chối
1. Nhấn nút **"Từ Chối"** trên một giao dịch khác
2. Modal xuất hiện với:
   - [ ] Tiêu đề: "Từ Chối Giao Dịch"
   - [ ] Thông tin giao dịch (Thành viên, Số tiền, Loại)
   - [ ] Textarea "Lý do từ chối"
   - [ ] Nút "Hủy" và "Xác Nhận Từ Chối"

3. Nhập lý do: "Sai số tiền"
4. Nhấn **"Xác Nhận Từ Chối"**
5. Kiểm tra:
   - [ ] Thông báo: "✅ Đã từ chối giao dịch"
   - [ ] Giao dịch chuyển sang tab "Đã Từ Chối"

6. Click tab **"Đã Từ Chối"**
7. Kiểm tra card giao dịch:
   - [ ] Border màu đỏ
   - [ ] Opacity giảm (0.8)
   - [ ] Hiển thị lý do: "Lý do từ chối: Sai số tiền"
   - [ ] Chỉ có nút "Xóa"

#### F. Test Xóa Giao Dịch Đã Từ Chối
1. Nhấn nút **"Xóa"**
2. Confirm dialog
3. Nhấn OK
4. Kiểm tra:
   - [ ] Thông báo: "✅ Đã xóa giao dịch"
   - [ ] Giao dịch biến mất hoàn toàn

### 4. Test Đồng Bộ Giữa Thành Viên & Admin

#### A. Kiểm tra từ phía Thành viên
1. Đăng nhập lại với tài khoản Thành viên (cùng người đã tạo giao dịch)
2. Vào **"Đóng Quỹ/Phạt"**
3. Kiểm tra:
   - [ ] Giao dịch đã được duyệt → xuất hiện trong "Lịch Sử Đã Được Duyệt"
   - [ ] Giao dịch bị từ chối → vẫn trong "Giao Dịch Chờ Phê Duyệt" với status "❌ Đã từ chối"
   - [ ] Hiển thị lý do từ chối

### 5. Test Responsive Design

#### Mobile View (< 768px)
1. Thu nhỏ cửa sổ browser
2. Kiểm tra:
   - [ ] Stats cards xếp dọc
   - [ ] Nút thanh toán xếp dọc (full width)
   - [ ] Transaction cards responsive
   - [ ] Modal QR code thu nhỏ phù hợp
   - [ ] Nút actions trong modal xếp dọc

### 6. Test Edge Cases

#### A. Không có số điện thoại MoMo
1. Xóa `settings.momoPhone` trong localStorage
2. Reload trang
3. Nhấn "Đóng Quỹ Qua MoMo"
4. Kiểm tra alert: "⚠️ Chưa cấu hình số điện thoại MoMo..."

#### B. Số tiền vượt quá giới hạn
1. Nhập số tiền > số tiền còn nợ
2. Nhấn "Tạo Mã QR"
3. Kiểm tra alert: "Số tiền không được vượt quá..."

#### C. Không có giao dịch chờ duyệt
1. Admin phê duyệt/từ chối hết
2. Kiểm tra empty state:
   - [ ] Icon: 📭
   - [ ] Text: "Không có giao dịch chờ duyệt"
   - [ ] Subtext: "Tất cả giao dịch đã được xử lý"

#### D. Thành viên không có nợ
1. Đăng nhập Thành viên không có quỹ/phạt cần đóng
2. Kiểm tra:
   - [ ] Nút "Đóng Quỹ" disabled
   - [ ] Nút "Đóng Phạt" disabled
   - [ ] Hiển thị "0 ₫" cho cả 2 loại

### 7. Test Firebase Sync (Nếu đã cấu hình)

1. Tạo giao dịch trên thiết bị A
2. Mở ứng dụng trên thiết bị B
3. Đăng nhập Admin
4. Kiểm tra giao dịch đã sync
5. Phê duyệt trên thiết bị B
6. Quay lại thiết bị A
7. Kiểm tra giao dịch đã được cập nhật

---

## 🐛 Các Lỗi Thường Gặp

### 1. QR Code không hiển thị
**Nguyên nhân:** Chưa cấu hình `settings.momoPhone`
**Giải pháp:** 
```javascript
// Trong console browser
localStorage.setItem('settings', JSON.stringify({ momoPhone: '0123456789' }))
location.reload()
```

### 2. Giao dịch không xuất hiện
**Nguyên nhân:** `guestMemberId` không khớp
**Giải pháp:** Kiểm tra console log, đảm bảo memberId là number

### 3. Nút bị disabled
**Nguyên nhân:** Không có contributionTierId hoặc không có attendance records
**Giải pháp:** Gán tier cho member trong Members view

### 4. Firebase không sync
**Nguyên nhân:** Chưa đăng nhập Firebase
**Giải pháp:** Kiểm tra Firebase config, đảm bảo auto-login hoạt động

---

## ✅ Kết Quả Mong Đợi

Sau khi test xong, bạn sẽ thấy:
- ✅ Vai trò hiển thị "Thành viên" thay vì "Khách"
- ✅ Thành viên có thể tạo giao dịch MoMo với QR code
- ✅ Giao dịch được lưu với status "pending"
- ✅ Admin thấy giao dịch trong trang "Phê Duyệt GD"
- ✅ Admin có thể phê duyệt hoặc từ chối
- ✅ Giao dịch được duyệt xuất hiện trong lịch sử của Thành viên
- ✅ Giao dịch bị từ chối hiển thị lý do
- ✅ UI đẹp, responsive, animations mượt mà

---

## 📸 Screenshots Cần Chụp

1. Modal chọn vai trò (hiển thị "Thành viên")
2. Trang Đóng Quỹ/Phạt của Thành viên
3. Modal thanh toán MoMo - Bước 1 (nhập số tiền)
4. Modal thanh toán MoMo - Bước 2 (QR code)
5. Danh sách giao dịch chờ duyệt (Thành viên)
6. Trang Phê Duyệt GD (Admin) - Stats cards
7. Transaction card với nút Phê Duyệt/Từ Chối
8. Modal từ chối giao dịch
9. Tab "Đã Từ Chối"
10. Lịch sử đã được duyệt (Thành viên)

---

**Happy Testing! 🎉**
