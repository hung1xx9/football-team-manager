# 🔐 Hướng Dẫn Bảo Mật Firebase Credentials

## Vấn Đề
API keys và credentials của Firebase đang bị hardcode trong source code, dẫn đến nguy cơ bị lộ khi push lên GitHub.

## Giải Pháp
Sử dụng **Environment Variables** để lưu trữ các thông tin nhạy cảm.

---

## 📋 Các Bước Thực Hiện

### 1. Tạo File `.env`

Tạo file `.env` trong thư mục gốc của project với nội dung:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> ⚠️ **QUAN TRỌNG**: File `.env` đã được thêm vào `.gitignore` nên sẽ KHÔNG bị push lên GitHub!

### 2. Cài Đặt Dependencies

Chạy lệnh sau để cài đặt package `dotenv`:

```bash
npm install
```

hoặc

```bash
yarn install
```

### 3. Khởi Động Lại Dev Server

Sau khi tạo file `.env`, restart lại dev server:

```bash
npm run dev
```

---

## 🔍 Những Gì Đã Thay Đổi

### ✅ Files Đã Được Cập Nhật

1. **`src/composables/useFirebase.js`**
   - Thay thế hardcoded config bằng `import.meta.env.VITE_*`
   - Vite tự động load các biến môi trường có prefix `VITE_`

2. **`scripts/upload-to-primary.js`**
   - Sử dụng `dotenv` package để load environment variables
   - Thay thế hardcoded config bằng `process.env.VITE_*`

3. **`.env.example`** (Mới)
   - Template file để hướng dẫn người khác setup
   - File này ĐƯỢC push lên GitHub (không chứa thông tin thật)

4. **`.gitignore`**
   - Đã có sẵn rule ignore file `.env` (dòng 28-30)

---

## 🚀 Cách Sử Dụng Cho Người Khác

Khi người khác clone project của bạn:

1. Copy file `.env.example` thành `.env`:
   ```bash
   cp .env.example .env
   ```

2. Điền thông tin Firebase credentials vào file `.env`

3. Chạy `npm install` và `npm run dev`

---

## 🛡️ Bảo Mật Tốt Hơn

### Những Gì ĐÃ An Toàn
- ✅ File `.env` không bị push lên GitHub
- ✅ Credentials được tách riêng khỏi source code
- ✅ File `.env.example` giúp người khác dễ dàng setup

### Lưu Ý Quan Trọng

⚠️ **Firebase API Key vẫn có thể bị lộ ở client-side!**

Firebase API key được thiết kế để sử dụng ở client-side (browser), nên nó vẫn sẽ xuất hiện trong bundle JavaScript sau khi build. Điều này là **BÌNH THƯỜNG** và được Firebase chấp nhận.

**Để bảo vệ thực sự, bạn cần:**

1. **Firestore Security Rules** ✅ (Đã setup)
   - Kiểm soát quyền truy cập vào database
   - Chỉ cho phép authenticated users upload data

2. **Firebase App Check** (Tùy chọn)
   - Bảo vệ backend resources khỏi abuse
   - Verify requests đến từ app hợp lệ

3. **Authorized Domains** ✅ (Đã setup)
   - Chỉ cho phép domain được ủy quyền sử dụng Firebase Auth
   - Đã thêm GitHub Pages domain

---

## 📝 Checklist Trước Khi Push

- [ ] File `.env` đã được tạo và chứa credentials thật
- [ ] File `.env` KHÔNG xuất hiện trong `git status`
- [ ] File `.env.example` đã được tạo với placeholder values
- [ ] Code đã được test và hoạt động bình thường
- [ ] Đã xóa hết hardcoded credentials trong code

---

## 🔧 Troubleshooting

### Lỗi: "Firebase config missing"
- Kiểm tra file `.env` đã tồn tại
- Kiểm tra tên biến môi trường có prefix `VITE_`
- Restart dev server sau khi tạo/sửa file `.env`

### Lỗi: "Cannot find module 'dotenv'"
- Chạy `npm install` để cài đặt dependencies

### Environment variables không load
- Vite chỉ load biến có prefix `VITE_`
- Phải restart dev server sau khi thay đổi `.env`
- Trong browser code: dùng `import.meta.env.VITE_*`
- Trong Node.js scripts: dùng `process.env.VITE_*` với dotenv

---

## ✅ Kết Luận

Bây giờ project của bạn đã an toàn hơn! API keys không còn bị hardcode trong source code và sẽ không bị push lên GitHub nữa. 🎉
