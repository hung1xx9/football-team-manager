# Hướng Dẫn Đồng Bộ Dữ Liệu Cloud

## 📍 Vị Trí
Các nút đồng bộ nằm ở **góc trên bên phải** của màn hình, bên cạnh nút "Thoát".

## 🔘 Các Nút Đồng Bộ

### 1. Trạng Thái Đồng Bộ
**Icon động** hiển thị trạng thái kết nối:
- 🔄 **Đang đồng bộ...**: Icon xoay tròn
- ✅ **Đã đồng bộ**: Icon check màu xanh
- ❌ **Lỗi đồng bộ**: Icon cảnh báo màu đỏ
- 🔔 **Cập nhật mới!**: Icon chuông nhấp nháy (có dữ liệu mới từ cloud)
- 🔗 **Đã kết nối**: Sẵn sàng đồng bộ

### 2. Nút "Lên Cloud" (Màu Xanh Dương)
**Chức năng**: Đồng bộ dữ liệu từ thiết bị lên Firebase Cloud

**Khi nào dùng:**
- ✅ Sau khi thêm/sửa/xóa thành viên
- ✅ Sau khi tạo/cập nhật trận đấu
- ✅ Sau khi điểm danh thủ công
- ✅ Sau khi xử lý giao dịch
- ✅ Muốn backup dữ liệu lên cloud

**Dữ liệu được đồng bộ:**
- 👥 Danh sách thành viên
- ⚽ Trận đấu và điểm danh
- 💰 Giao dịch tài chính
- ⏳ Giao dịch chờ duyệt
- 🎯 Mức đóng góp
- ⚙️ Cài đặt hệ thống

**Lưu ý:**
- ⚠️ Dữ liệu trên cloud sẽ được **ghi đè** bởi dữ liệu hiện tại
- ⚠️ Yêu cầu đã đăng nhập Firebase
- ⚠️ Cần kết nối internet

### 3. Nút "Từ Cloud" (Màu Xanh Lá)
**Chức năng**: Lấy dữ liệu mới nhất từ Firebase Cloud về thiết bị

**Khi nào dùng:**
- ✅ Khi có thông báo "Cập nhật mới!"
- ✅ Khi muốn đồng bộ dữ liệu từ thiết bị khác
- ✅ Khi khôi phục dữ liệu từ backup
- ✅ Sau khi thiết bị khác đã upload dữ liệu mới

**Lưu ý:**
- ⚠️ Dữ liệu hiện tại sẽ được **ghi đè** bởi dữ liệu từ cloud
- ⚠️ Hệ thống sẽ hỏi xác nhận trước khi thực hiện
- ⚠️ Yêu cầu đã đăng nhập Firebase
- ⚠️ Cần kết nối internet

## 🔄 Quy Trình Đồng Bộ

### Kịch Bản 1: Admin Làm Việc Trên Thiết Bị A
```
1. Admin đăng nhập
2. Thực hiện các thao tác (thêm thành viên, điểm danh, etc.)
3. Nhấn "Lên Cloud" để backup
4. ✅ Dữ liệu đã được lưu trên cloud
```

### Kịch Bản 2: Admin Chuyển Sang Thiết Bị B
```
1. Admin đăng nhập trên thiết bị B
2. Hệ thống tự động tải dữ liệu từ cloud
3. Hoặc nhấn "Từ Cloud" để lấy dữ liệu mới nhất
4. ✅ Dữ liệu đã được đồng bộ
```

### Kịch Bản 3: Nhiều Admin Cùng Làm Việc
```
Admin A:
1. Thực hiện thay đổi
2. Nhấn "Lên Cloud"

Admin B:
1. Nhận thông báo "Cập nhật mới!"
2. Nhấn "Từ Cloud" để lấy dữ liệu mới
3. ✅ Đã đồng bộ với Admin A
```

## 🔔 Đồng Bộ Tự Động

### Khi Admin Đăng Nhập
- ✅ Tự động tải dữ liệu từ cloud
- ✅ Tự động lắng nghe cập nhật realtime
- ✅ Hiển thị thông báo khi có dữ liệu mới

### Khi Có Thay Đổi Dữ Liệu
- ✅ Tự động lưu vào localStorage
- ✅ Tự động upload lên cloud (nếu đã đăng nhập)
- ⚠️ Nếu chưa đăng nhập, cần nhấn "Lên Cloud" thủ công

## ⚠️ Lưu Ý Quan Trọng

### Xung Đột Dữ Liệu
Nếu 2 admin cùng chỉnh sửa:
1. Admin A upload trước → Dữ liệu A lên cloud
2. Admin B upload sau → Dữ liệu B **ghi đè** dữ liệu A
3. ⚠️ Dữ liệu của Admin A bị mất

**Giải pháp:**
- ✅ Luôn nhấn "Từ Cloud" trước khi làm việc
- ✅ Nhấn "Lên Cloud" ngay sau khi hoàn thành
- ✅ Phân công rõ ràng ai làm gì

### Khi Mất Kết Nối
- ✅ Dữ liệu vẫn được lưu trên thiết bị (localStorage)
- ✅ Có thể tiếp tục làm việc offline
- ⚠️ Nhớ nhấn "Lên Cloud" khi có internet trở lại

### Backup Định Kỳ
**Khuyến nghị:**
- 📅 Nhấn "Lên Cloud" ít nhất 1 lần/ngày
- 📅 Nhấn "Lên Cloud" sau mỗi thay đổi quan trọng
- 📅 Kiểm tra trạng thái đồng bộ thường xuyên

## 🎯 Best Practices

### Cho Admin
1. ✅ Đăng nhập Firebase khi bắt đầu làm việc
2. ✅ Nhấn "Từ Cloud" để lấy dữ liệu mới nhất
3. ✅ Thực hiện các thao tác cần thiết
4. ✅ Nhấn "Lên Cloud" để backup
5. ✅ Kiểm tra trạng thái "Đã đồng bộ"

### Cho Nhiều Admin
1. ✅ Thông báo cho nhau khi sắp làm việc
2. ✅ Luôn lấy dữ liệu mới nhất trước khi bắt đầu
3. ✅ Upload ngay sau khi hoàn thành
4. ✅ Kiểm tra thông báo "Cập nhật mới!"

## 🆘 Xử Lý Sự Cố

### "Vui lòng đăng nhập Firebase trước"
**Nguyên nhân**: Chưa đăng nhập Firebase
**Giải pháp**: 
1. Thoát ra
2. Đăng nhập lại với tài khoản Admin
3. Hệ thống sẽ tự động đăng nhập Firebase

### "Lỗi khi đồng bộ"
**Nguyên nhân**: Mất kết nối internet hoặc lỗi Firebase
**Giải pháp**:
1. Kiểm tra kết nối internet
2. Thử lại sau vài giây
3. Nếu vẫn lỗi, liên hệ kỹ thuật

### Dữ Liệu Không Khớp
**Nguyên nhân**: Chưa đồng bộ hoặc xung đột
**Giải pháp**:
1. Nhấn "Từ Cloud" để lấy dữ liệu mới nhất
2. Kiểm tra lại dữ liệu
3. Nếu cần, thực hiện lại thao tác

## 📱 Giao Diện

```
┌────────────────────────────────────────────────┐
│ Dashboard                    🌙 [🔄 Đã đồng bộ] │
│                              [⬆️ Lên Cloud]     │
│                              [⬇️ Từ Cloud]      │
│                              [Thoát]            │
└────────────────────────────────────────────────┘
```

**Màu sắc:**
- 🔵 **Lên Cloud**: Xanh dương (Primary)
- 🟢 **Từ Cloud**: Xanh lá (Info)
- ⚪ **Thoát**: Xám (Secondary)

Với hệ thống đồng bộ này, dữ liệu của bạn luôn được backup an toàn và đồng bộ giữa các thiết bị! 🎉
