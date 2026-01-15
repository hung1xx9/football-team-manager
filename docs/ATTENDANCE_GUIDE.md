# Hệ Thống Điểm Danh - Football Team Manager

## Tổng Quan
Hệ thống quản lý điểm danh linh hoạt với 2 phương thức:
1. **Điểm danh QR Code** - Tự động và chính xác
2. **Điểm danh Thủ công** - Linh hoạt cho admin

## Tính Năng Chính

### 📱 Điểm Danh QR Code
- Thành viên quét mã QR để điểm danh
- Tự động ghi nhận thời gian chính xác
- Tự động tính toán trễ và phạt:
  - Muộn < 10 phút: 10,000 VND
  - Muộn 10-20 phút: 20,000 VND
  - Muộn > 20 phút: 50,000 VND
- Không thể quét lại trong cùng một trận

### ✋ Điểm Danh Thủ Công
- Admin có thể tích chọn để điểm danh hộ
- **Tự động tính toán trễ và phạt** dựa trên giờ bắt đầu trận đấu
- Điểm danh trước giờ đá = Đúng giờ (không phạt)
- Điểm danh sau giờ đá = Muộn (có phạt tương ứng)
- Linh hoạt trong các tình huống đặc biệt
- Giữ nguyên thông tin QR nếu đã quét
- Có thể thay đổi trạng thái bất cứ lúc nào

## Cách Sử Dụng

### Cho Admin
1. **Tạo mã QR**: Vào Trận Đấu → Nhấn "Mã QR"
2. **Điểm danh thủ công**: Vào Trận Đấu → Nhấn "Sửa/Điểm danh" → Tích chọn thành viên

### Cho Thành Viên
1. Vào trang "Điểm Danh"
2. Nhấn "Bắt Đầu Quét QR"
3. Quét mã QR do admin cung cấp
4. Nhận thông báo kết quả

## Hiển Thị Thông Tin

Mỗi lần điểm danh sẽ hiển thị:
- ⏰ Thời gian điểm danh
- 📱 hoặc ✋ Phương thức (QR hoặc Thủ công)
- ✓ hoặc ⏰ Trạng thái (Đúng giờ hoặc Muộn)
- 💰 Phạt (nếu có)

## Ví Dụ

```
Nguyễn Văn A
15/01 14:30 📱 QR ✓ Đúng giờ

Trần Văn B
15/01 14:45 📱 QR ⏰ Muộn 15p 💰 20,000đ

Lê Văn C
15/01 15:00 ✋ Thủ công
```

## Chi Tiết Kỹ Thuật
Xem file [MANUAL_ATTENDANCE.md](./MANUAL_ATTENDANCE.md) để biết thêm chi tiết.
