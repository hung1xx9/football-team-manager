# Hướng Dẫn Sử Dụng Yarn

Dự án đã được chuyển đổi sang cấu trúc chuẩn **Vite + Vue 3**.

## Yêu Cầu
Bạn cần cài đặt **Node.js** để sử dụng Yarn.
Tải tại: [https://nodejs.org/](https://nodejs.org/)

Sau khi cài đặt Node.js, cài Yarn bằng lệnh:
```bash
npm install -g yarn
```

## Cách Chạy Dự Án

1. **Cài đặt thư viện**:
   Chạy lệnh sau trong thư mục dự án để tải các gói cần thiết (Vue, Firebase, Vite...):
   ```bash
   yarn
   ```

2. **Chạy server phát triển**:
   ```bash
   yarn dev
   ```
   Truy cập vào địa chỉ hiện ra (thường là `http://localhost:5173`).

3. **Build để deploy**:
   ```bash
   yarn build
   ```

## Lưu Ý Quan Trọng
File `start.ps1` cũ sẽ **KHÔNG** hoạt động nữa vì trình duyệt không thể chạy trực tiếp các file module mà không có Vite. Bạn bắt buộc phải dùng lệnh `yarn dev`.
