# Hướng Dẫn Sử Dụng Tính Năng Đơn Xin Nghỉ

## Tổng Quan

Hệ thống đơn xin nghỉ cho phép thành viên gửi đơn xin nghỉ cho các trận đấu hoặc ngày cụ thể, và Admin có thể phê duyệt hoặc từ chối các đơn này.

## Tính Năng Chính

### 1. Đối với Thành Viên (Member/Guest)

#### Gửi Đơn Xin Nghỉ
1. Đăng nhập với vai trò **Member** (Guest)
2. Vào menu **"Xin Nghỉ"**
3. Click nút **"Gửi Đơn Xin Nghỉ"**
4. Điền thông tin:
   - **Chọn Trận Đấu** (tùy chọn): Chọn trận đấu cụ thể từ danh sách các trận sắp tới
   - **Ngày Nghỉ**: Nếu không chọn trận đấu, chọn ngày nghỉ cụ thể
   - **Lý Do**: Nhập lý do xin nghỉ (bắt buộc)
5. Click **"Gửi Đơn"**

#### Xem Trạng Thái Đơn
- Tất cả đơn xin nghỉ của bạn sẽ hiển thị trong trang **"Xin Nghỉ"**
- Mỗi đơn sẽ có một trong các trạng thái:
  - 🟡 **Chờ duyệt**: Đơn đang chờ Admin xử lý
  - 🟢 **Đã duyệt**: Đơn đã được Admin chấp nhận
  - 🔴 **Từ chối**: Đơn đã bị Admin từ chối

#### Thông Tin Hiển Thị
- Ngày nghỉ
- Trận đấu (nếu có)
- Lý do xin nghỉ
- Ngày gửi đơn
- Trạng thái
- Phản hồi từ Admin (nếu có)
- Ngày xử lý (nếu đã xử lý)

### 2. Đối với Admin

#### Xem Danh Sách Đơn Xin Nghỉ
1. Đăng nhập với vai trò **Admin**
2. Vào menu **"Quản Lý Xin Nghỉ"**
3. Xem tổng quan thống kê:
   - Số đơn chờ duyệt
   - Số đơn đã duyệt
   - Số đơn từ chối
   - Tổng số đơn

#### Lọc và Tìm Kiếm
- **Lọc theo trạng thái**: Chọn "Tất cả", "Chờ duyệt", "Đã duyệt", hoặc "Từ chối"
- **Tìm kiếm thành viên**: Nhập tên thành viên để lọc

#### Phê Duyệt Đơn
1. Tìm đơn cần phê duyệt (trạng thái "Chờ duyệt")
2. Click nút **✓** (Duyệt)
3. Xem lại thông tin đơn
4. Nhập ghi chú cho thành viên (tùy chọn)
5. Click **"Xác Nhận Duyệt"**

#### Từ Chối Đơn
1. Tìm đơn cần từ chối (trạng thái "Chờ duyệt")
2. Click nút **✕** (Từ chối)
3. Xem lại thông tin đơn
4. Nhập lý do từ chối (khuyến nghị)
5. Click **"Xác Nhận Từ Chối"**

#### Xem Chi Tiết Đơn
- Click nút **👁** (Xem) để xem chi tiết đầy đủ của bất kỳ đơn nào
- Thông tin bao gồm:
  - Thông tin thành viên
  - Ngày nghỉ và trận đấu
  - Lý do xin nghỉ
  - Ngày gửi và ngày xử lý
  - Trạng thái
  - Ghi chú của Admin

## Tích Hợp Firebase

### Đồng Bộ Tự Động
- Tất cả đơn xin nghỉ được lưu trữ trong **localStorage**
- Khi Admin đăng nhập Firebase, dữ liệu sẽ tự động đồng bộ lên Cloud
- Khi có thay đổi từ thiết bị khác, dữ liệu sẽ tự động cập nhật

### Đồng Bộ Thủ Công
Admin có thể:
- **Tải lên Cloud**: Click nút "Lên Cloud" để đồng bộ dữ liệu lên Firebase
- **Tải từ Cloud**: Click nút "Từ Cloud" để tải dữ liệu mới nhất từ Firebase

## Lưu Ý Quan Trọng

### Đối với Thành Viên
1. ✅ Gửi đơn xin nghỉ **trước** ngày trận đấu
2. ✅ Nhập lý do rõ ràng và hợp lý
3. ✅ Kiểm tra trạng thái đơn thường xuyên
4. ⚠️ Không thể chỉnh sửa đơn sau khi gửi
5. ⚠️ Đơn bị từ chối cần gửi lại nếu muốn

### Đối với Admin
1. ✅ Xử lý đơn kịp thời để thành viên biết trước
2. ✅ Ghi chú rõ ràng khi từ chối để thành viên hiểu lý do
3. ✅ Kiểm tra thông tin trận đấu trước khi duyệt
4. ⚠️ Không thể thay đổi trạng thái sau khi đã phê duyệt/từ chối
5. ⚠️ Đảm bảo đồng bộ Firebase để dữ liệu không bị mất

## Quy Trình Làm Việc Đề Xuất

### Thành Viên
1. Biết trước lịch không thể tham gia
2. Gửi đơn xin nghỉ sớm nhất có thể
3. Chờ phản hồi từ Admin
4. Kiểm tra ghi chú từ Admin (nếu có)

### Admin
1. Kiểm tra đơn xin nghỉ mỗi ngày
2. Xử lý các đơn "Chờ duyệt" trong vòng 24h
3. Ghi chú rõ ràng khi từ chối
4. Đồng bộ dữ liệu thường xuyên

## Câu Hỏi Thường Gặp

**Q: Tôi có thể chỉnh sửa đơn đã gửi không?**
A: Không, bạn cần liên hệ Admin để xóa đơn cũ và gửi đơn mới.

**Q: Đơn bị từ chối có nghĩa là gì?**
A: Admin không chấp nhận lý do xin nghỉ. Hãy đọc ghi chú từ Admin để hiểu rõ lý do.

**Q: Tôi có thể xin nghỉ cho nhiều ngày không?**
A: Có, bạn cần gửi nhiều đơn riêng biệt cho mỗi ngày/trận đấu.

**Q: Admin có thể xóa đơn xin nghỉ không?**
A: Hiện tại chưa có tính năng này. Admin chỉ có thể phê duyệt hoặc từ chối.

**Q: Dữ liệu có bị mất khi đăng xuất không?**
A: Không, dữ liệu được lưu trong localStorage và Firebase (nếu Admin đã đồng bộ).

## Cập Nhật Trong Tương Lai

- [ ] Cho phép chỉnh sửa đơn chưa xử lý
- [ ] Thông báo realtime khi đơn được xử lý
- [ ] Xin nghỉ cho nhiều ngày cùng lúc
- [ ] Lịch sử đơn xin nghỉ theo tháng
- [ ] Xuất báo cáo đơn xin nghỉ
- [ ] Tích hợp với hệ thống điểm danh

---

**Phiên bản**: 1.0.0  
**Ngày cập nhật**: 2026-01-16  
**Người phát triển**: Tinh Hoa FC Development Team
