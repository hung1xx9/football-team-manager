# ⚽ Football Team Manager - Ứng Dụng Quản Lý Đội Bóng

Ứng dụng web hiện đại để quản lý đội bóng với Vue 3 + Vite, hỗ trợ đồng bộ Firebase.

## 🌟 Tính Năng

### 📊 Dashboard
- Thống kê tổng quan về đội bóng
- Tỷ lệ tham gia trận đấu
- Tổng số thành viên và trận đã đá
- Số dư quỹ đội
- Danh sách trận đấu gần đây
- Top cầu thủ tích cực nhất

### 👥 Quản Lý Thành Viên
- Thêm/sửa/xóa thành viên
- Xem tỷ lệ tham gia của từng thành viên
- Theo dõi số tiền quỹ đã đóng
- Theo dõi tiền phạt

### ⚽ Quản Lý Trận Đấu
- Tạo trận đấu mới
- Ghi nhận danh sách tham gia/vắng mặt
- Xem lịch sử các trận đã đá
- Thống kê số người tham gia mỗi trận

### 💰 Quản Lý Tài Chính
- Theo dõi thu/chi
- Quản lý quỹ đội
- Ghi nhận tiền phạt
- Xem lịch sử giao dịch
- Thống kê tổng thu, tổng chi và số dư

### ☁️ Đồng Bộ Firebase (Tùy Chọn)
- Realtime sync tự động
- Đăng nhập Google
- Multi-device collaboration
- Xem hướng dẫn: [docs/CLOUD_SYNC_GUIDE.md](docs/CLOUD_SYNC_GUIDE.md)

## 🚀 Cài Đặt & Chạy

### Yêu Cầu
- **Node.js** (phiên bản 16 trở lên)
- **Yarn** hoặc **npm**

### Bước 1: Cài đặt dependencies
```bash
yarn install
# hoặc
npm install
```

### Bước 2: Chạy development server
```bash
yarn dev
# hoặc
npm run dev
```

Truy cập vào địa chỉ hiện ra (thường là `http://localhost:5173`).

### Bước 3: Build production
```bash
yarn build
# hoặc
npm run build
```

## 📁 Cấu Trúc Dự Án

```
football-team-manager/
├── src/
│   ├── assets/           # CSS và tài nguyên tĩnh
│   ├── components/       # Các component Vue dùng chung
│   ├── composables/      # Logic tái sử dụng (useAppState, useFirebase)
│   ├── router/           # Cấu hình Vue Router
│   ├── views/            # Các trang chính (Dashboard, Members, Matches, Finance)
│   ├── App.vue           # Component gốc
│   └── main.js           # Entry point
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Cấu hình Vite
└── README.md             # File này
```

## 🔧 Công Nghệ

- **Vue 3** - Framework JavaScript hiện đại
- **Vite** - Build tool cực nhanh
- **Vue Router** - Điều hướng SPA
- **Firebase** - Backend & Authentication (tùy chọn)
- **Composition API** - Code organization pattern
- **localStorage** - Lưu trữ dữ liệu local

## 💾 Lưu Trữ Dữ Liệu

Ứng dụng sử dụng **localStorage** để lưu trữ dữ liệu local:
- ✅ Dữ liệu được lưu tự động
- ✅ Không cần server
- ✅ Dữ liệu vẫn còn khi đóng/mở lại trình duyệt

**Tùy chọn:** Bật Firebase để đồng bộ dữ liệu giữa nhiều thiết bị.

## 🎨 Thiết Kế

- **Dark Theme** - Giao diện tối dễ nhìn
- **Glassmorphism** - Hiệu ứng kính mờ sang trọng
- **Smooth Animations** - Chuyển động mượt mà
- **Responsive Design** - Tương thích mọi thiết bị
- **Modern Typography** - Font chữ Inter đẹp mắt

## 📱 Tương Thích

- ✅ Chrome/Edge (phiên bản mới)
- ✅ Firefox (phiên bản mới)
- ✅ Safari (phiên bản mới)
- ✅ Desktop & Mobile

## 📚 Tài Liệu Thêm

- [docs/HUONG-DAN-SU-DUNG.md](docs/HUONG-DAN-SU-DUNG.md) - Hướng dẫn sử dụng ứng dụng
- [docs/CLOUD_SYNC_GUIDE.md](docs/CLOUD_SYNC_GUIDE.md) - Hướng dẫn đồng bộ Firebase
- [docs/MOMO-INTEGRATION-GUIDE.md](docs/MOMO-INTEGRATION-GUIDE.md) - Hướng dẫn tích hợp MoMo
- [docs/TESTING-GUIDE.md](docs/TESTING-GUIDE.md) - Hướng dẫn test
- [docs/THEME-GUIDE.md](docs/THEME-GUIDE.md) - Hướng dẫn theme

## 🎯 Chế Độ Sử Dụng

Ứng dụng hỗ trợ 2 chế độ:
1. **Admin** - Toàn quyền quản lý (username: `admin`, password: `12345678@Abc`)
2. **Guest** - Chỉ xem và điểm danh

---

**Phát triển bởi:** Antigravity AI  
**Phiên bản:** 3.0.0 (Vue 3 + Vite)  
**Ngày:** Tháng 1, 2026
