# 📱 Hướng Dẫn Test QR Code Trên Điện Thoại

## ✅ Đã Deploy Phiên Bản Mới

**URL:** https://football-team-manager-14a39.web.app

**Thay đổi:** Thêm **alert popup** để hiển thị lỗi chi tiết ngay trên màn hình điện thoại (không cần console)

---

## 🧪 Cách Test

### Chuẩn Bị: Tạo Mã QR (Trên Máy Tính)

1. Mở https://football-team-manager-14a39.web.app trên **máy tính**
2. Đăng nhập Admin:
   - Username: `admin`
   - Password: `12345678@Abc`
3. Vào **"Trận Đấu"** → Click **"Thêm Trận Đấu"**
4. Điền thông tin:
   - Ngày: Chọn ngày hôm nay
   - Đối thủ: "Đội Test"
   - Địa điểm: "Sân 1"
   - **QUAN TRỌNG:** Tick chọn ít nhất 1-2 thành viên
5. Click **"Lưu"**
6. Click **"Mã QR"** → Mã QR sẽ hiển thị trên màn hình
7. **GIỮ NGUYÊN CỬA SỔ NÀY**

---

### Test 1: Quét QR Trên Điện Thoại

1. **Mở điện thoại**, truy cập: https://football-team-manager-14a39.web.app
2. Chọn **"Khách (Chỉ xem)"**
3. Chọn **ĐÚNG THÀNH VIÊN** mà bạn đã tick ở bước chuẩn bị
4. Vào **"Điểm Danh"**
5. Click **"Bắt Đầu Quét QR"**
6. Cho phép truy cập camera
7. **Quét mã QR từ màn hình máy tính**

---

## 📊 Kết Quả Mong Đợi

### ✅ Nếu Thành Công:
- Sẽ hiển thị: **"✅ Điểm danh thành công!"**
- Không có popup alert nào xuất hiện

### ❌ Nếu Lỗi - Sẽ Có 1 Trong 2 Popup:

#### Popup 1: "❌ QR Parse Error"
```
❌ QR Parse Error

Raw: [chuỗi ký tự lạ]...

Error: Unexpected token...
```
**Nghĩa là:** Camera đọc sai mã QR hoặc mã QR bị hỏng

**Giải pháp:**
- ✅ Tăng độ sáng màn hình máy tính
- ✅ Giữ camera ổn định hơn
- ✅ Đưa camera gần/xa màn hình để lấy nét
- ✅ Thử quét lại

---

#### Popup 2: "⚠️ QR Structure Invalid"
```
⚠️ QR Structure Invalid

QR Data:
{
  "type": "...",
  "matchId": ...,
  "matchDate": "..."
}

Validation:
type: ...
matchId: ...
matchDate: ...
```

**Nghĩa là:** Mã QR đọc được nhưng thiếu thông tin

**Hãy chụp màn hình popup này và gửi cho tôi!**

---

## 📸 Cần Gửi Cho Tôi

Nếu vẫn lỗi, hãy **chụp màn hình** popup alert và gửi cho tôi. Tôi cần thấy:

1. ✅ Nội dung popup (toàn bộ text)
2. ✅ Loại popup (Parse Error hay Structure Invalid)
3. ✅ Dữ liệu trong popup (nếu có)

---

## 💡 Tips

### Để Quét QR Dễ Hơn:
- 📱 Tăng độ sáng màn hình máy tính lên MAX
- 🔦 Bật đèn phòng cho đủ sáng
- 📏 Giữ khoảng cách 15-20cm giữa camera và màn hình
- ⏱️ Giữ camera ổn định 2-3 giây
- 🎯 Đảm bảo mã QR nằm trong khung hình vuông

### Nếu Vẫn Không Quét Được:
1. Thử dùng ứng dụng quét QR khác (Google Lens, QR Scanner app)
2. Chụp ảnh mã QR và dùng app quét từ ảnh
3. Thử trên điện thoại khác

---

## 🔄 Test Lại Nhiều Lần

Nếu muốn test lại (đã quét thành công rồi nhưng muốn thử lại):

1. Mở trình duyệt trên điện thoại
2. Vào **Settings** → **Site Settings** → **Storage**
3. Tìm `football-team-manager-14a39.web.app`
4. Click **"Clear & Reset"**
5. Reload lại trang và đăng nhập lại

---

## 🎯 Mục Tiêu

Với phiên bản mới này, khi quét QR:
- Nếu lỗi → Sẽ có **popup alert** hiển thị chi tiết lỗi
- Bạn **chụp màn hình popup** và gửi cho tôi
- Tôi sẽ biết chính xác vấn đề và sửa ngay!

**Hãy test và gửi screenshot cho tôi nhé!** 📸
