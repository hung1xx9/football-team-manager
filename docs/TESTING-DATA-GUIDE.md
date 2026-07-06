# 🧪 Hướng Dẫn Chuyển Đổi Dữ Liệu Test và Dữ Liệu Thật

Trong quá trình phát triển và kiểm thử tính năng (ví dụ: luồng duyệt điểm danh, đóng tiền MoMo, v.v.), để tránh việc làm thay đổi hay sai lệch dữ liệu thật của đội bóng, hệ thống đã được cấu hình cung cấp một bộ dữ liệu thử nghiệm (Test Data) hoàn toàn độc lập.

Dưới đây là cách bạn có thể tự mình chuyển đổi qua lại giữa **Dữ liệu Test** và **Dữ liệu Thật**.

---

## ⚙️ Cơ Chế Hoạt Động

Ứng dụng Firebase Firestore được lưu trữ trong Collection tên là `teams`.
- Trước đây, mọi dữ liệu được lưu dưới một Document cố định tên là `primary`.
- Khi kích hoạt chế độ Test, ứng dụng sẽ không đọc/ghi vào `primary` nữa, mà tự động trỏ đến một Document mới tên là `testing`. Kể từ đó, mọi rác dữ liệu sinh ra khi bạn test ứng dụng sẽ chỉ nằm trên khu vực này.

---

## 🛠 Cách Chuyển Đổi

Trạng thái dữ liệu được điều khiển qua biến môi trường tên là **`VITE_USE_TEST_DATA`** nằm bên trong file `.env`.

### 1. Bật Dữ Liệu Thử Nghiệm (Chế độ Test)
Khi bạn chuẩn bị test một tính năng mới (chẳng hạn như duyệt điểm danh):

1. Mở file `.env` ở thư mục gốc của dự án.
2. Tìm biến `VITE_USE_TEST_DATA` và đổi giá trị thành `"true"`:
   ```env
   VITE_USE_TEST_DATA="true"
   ```
   *(Nếu chưa có dòng này, bạn hãy tự thêm nó vào cuối file)*
3. **Quan trọng:** Nếu terminal vẫn đang chạy lệnh `npm run dev`, bạn cần bấm `Ctrl + C` để tắt server cũ. Sau đó chạy lại lệnh `npm run dev` để hệ thống cập nhật biến môi trường vừa đổi.
4. Mở app trên trình duyệt, lúc này ứng dụng sẽ trống trơn (do đang tải từ db `testing` trống mới tinh), bạn có thể thoải mái thêm thành viên test, thử nghiệm duyệt điểm danh mà không sợ hỏng dữ liệu xịn.

### 2. Trở Về Dữ Liệu Thật (Chế độ Production)
Khi bạn đã kiểm thử xong và muốn app quay lại hiển thị dữ liệu của đội bóng:

1. Mở file `.env`.
2. Đổi giá trị `VITE_USE_TEST_DATA` về thành `"false"`:
   ```env
   VITE_USE_TEST_DATA="false"
   ```
   *(Hoặc bạn có thể xóa hẳn dòng này đi vì kết quả sẽ như nhau)*
3. **Khởi động lại server** bằng cách tắt `npm run dev` và chạy lại.
4. Refresh lại app, dữ liệu quen thuộc của đội bóng (document `primary`) sẽ hiển thị lại đầy đủ.

---

## 💡 Xử Lý Lỗi Thường Gặp
- **Tôi bật test="true" mà trên app vẫn thấy dữ liệu cũ?**
  👉 Bạn quên chưa khởi động lại (restart) `npm run dev`. Trình duyệt web và Vite sẽ không tự động nhận sự thay đổi bên trong file `.env` nếu server chưa được refresh.
- **Dữ liệu ở bản test có bị lẫn lộn lên Prod sau này không?**
  👉 Không. Kể cả khi bạn deploy bản cập nhật tính năng mới (`npm run deploy`), lệnh build mặc định của ứng dụng tĩnh (`vite build`) sẽ đóng gói giá trị `false` (nếu bạn đã chuyển lại). Hãy chắc chắn set biến này về `false` trước khi chạy `npm run deploy`.
