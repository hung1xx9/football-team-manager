# 📱 Hướng Dẫn Sử Dụng - Tinh Hoa FC

## 🎯 Tổng Quan

Ứng dụng quản lý đội bóng Tinh Hoa FC với 2 chế độ:
- **Admin**: Quản lý toàn bộ hệ thống
- **Guest**: Xem thông tin và tự quản lý cá nhân

---

## 👤 Đăng Nhập

### **Admin (Quản Trị Viên)**
1. Chọn "Quản Trị Viên (Full)"
2. Nhập thông tin:
   - **Username**: `admin`
   - **Password**: `12345678@Abc`
3. Nhấn "Đăng Nhập" hoặc Enter

### **Guest (Khách)**
1. Chọn "Khách (Chỉ xem)"
2. Tìm kiếm và chọn tên của bạn
3. Nhấn "Xác Nhận"

---

## 🔐 Quyền Truy Cập

### **Admin có thể:**
- ✅ Quản lý Thành Viên (Thêm/Sửa/Xóa)
- ✅ Quản lý Trận Đấu (Thêm/Sửa/Xóa)
- ✅ Quản lý Tài Chính
- ✅ Tạo QR Code điểm danh
- ✅ Đồng bộ Firebase
- ✅ Xem tất cả dữ liệu

### **Guest chỉ có thể:**
- ✅ Xem Dashboard (readonly)
- ✅ Quét QR điểm danh
- ✅ Đóng quỹ/phạt cá nhân
- ✅ Gửi đơn xin nghỉ

---

## 📋 Chức Năng Chi Tiết

### **1. Dashboard**
- Xem thống kê tổng quan
- Top cầu thủ tham gia nhiều nhất
- Trận đấu gần đây

### **2. Quản Lý Thành Viên** (Admin)
- Thêm thành viên mới
- Sửa thông tin
- Xóa thành viên
- Xem thống kê cá nhân

### **3. Quản Lý Trận Đấu** (Admin)
- Thêm trận đấu mới
  - Chọn loại: Đấu tập / Đấu đối
  - Nhập đối thủ, địa điểm, ngày
  - Điểm danh thành viên
- Tạo QR Code cho trận
- Sửa/Xóa trận đấu

### **4. Điểm Danh QR Code**

#### **Admin:**
- Mở trận đấu → Nhấn "Mã QR"
- Hiển thị QR cho thành viên quét

#### **Guest:**
1. Vào menu "Điểm Danh"
2. Nhấn "Bắt Đầu Quét QR"
3. Cho phép truy cập camera
4. Quét mã QR từ Admin
5. ✅ Điểm danh thành công!

**Lưu ý:**
- Mỗi trận chỉ quét 1 lần
- Không thể quét lại sau khi đã điểm danh

### **5. Đóng Quỹ/Phạt** (Guest)
1. Vào menu "Đóng Quỹ/Phạt"
2. Chọn "Đóng Quỹ" hoặc "Đóng Phạt"
3. Nhập số tiền
4. Nhập ghi chú (tùy chọn)
5. Nhấn "Xác Nhận"

**Xem lịch sử:**
- Tất cả giao dịch hiển thị ở bảng bên dưới

### **6. Xin Nghỉ** (Guest)
1. Vào menu "Xin Nghỉ"
2. Nhấn "Gửi Đơn Xin Nghỉ"
3. Chọn trận đấu
4. Nhập lý do
5. Nhấn "Gửi Đơn"

**Trạng thái đơn:**
- 🟡 Chờ duyệt
- 🟢 Đã duyệt
- 🔴 Từ chối

### **7. Tài Chính** (Admin)
- Xem tổng quỹ
- Quản lý thu/chi
- Thêm/Xóa giao dịch
- Xem chi tiết từng thành viên

---

## ☁️ Đồng Bộ Firebase (Admin)

### **Tự Động:**
- Khi đăng nhập Firebase → Tự động tải dữ liệu
- Khi thay đổi dữ liệu → Tự động lưu lên Cloud

### **Thủ Công:**
1. Nhấn "Đăng nhập Google"
2. Chọn tài khoản Google
3. Dữ liệu tự động đồng bộ

**Lấy dữ liệu từ Cloud:**
- Nhấn "Lấy từ Cloud" để tải lại dữ liệu

---

## 📱 Responsive Mobile

Ứng dụng hoạt động tốt trên:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

**Trên mobile:**
- Menu ẩn mặc định
- Nhấn nút menu (góc dưới phải) để mở
- Tất cả chức năng đều hoạt động

---

## 🔧 Xử Lý Sự Cố

### **Không quét được QR?**
1. Kiểm tra quyền truy cập camera
2. Đảm bảo đủ ánh sáng
3. Giữ camera ổn định
4. Thử reload trang

### **Không đồng bộ Firebase?**
1. Kiểm tra kết nối internet
2. Đăng xuất và đăng nhập lại
3. Thử tải lại dữ liệu thủ công

### **Quên mật khẩu Admin?**
- Liên hệ quản trị viên hệ thống
- Mật khẩu mặc định: `12345678@Abc`

---

## 💡 Tips & Tricks

### **Cho Admin:**
- Tạo QR code trước khi đến sân
- Kiểm tra danh sách điểm danh sau trận
- Backup dữ liệu định kỳ bằng Firebase

### **Cho Guest:**
- Điểm danh ngay khi đến sân
- Đóng quỹ/phạt đúng hạn
- Xin nghỉ trước ít nhất 1 ngày

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề, liên hệ:
- Admin đội bóng
- Hoặc tạo issue trên GitHub

---

**Phiên bản:** 1.0.0  
**Cập nhật:** 11/01/2026
