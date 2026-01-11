# 🔄 Hướng Dẫn Đồng Bộ Dữ Liệu Qua Firebase

## 🎯 Vấn Đề

- **Admin** tạo trận trên máy tính → Lưu trong localStorage máy tính
- **Khách** quét QR trên điện thoại → Không tìm thấy trận (localStorage khác nhau)

## ✅ Giải Pháp

Sử dụng **Firebase Firestore** làm database chung cho tất cả thiết bị.

---

## 📋 Quy Trình Đồng Bộ

### Bước 1: Admin Đăng Nhập Firebase (Máy Tính)

1. Mở https://football-team-manager-14a39.web.app
2. Đăng nhập Admin (`admin` / `12345678@Abc`)
3. Click **"Đăng nhập Google"** (nút màu xanh ở góc phải)
4. Chọn tài khoản Google
5. Sau khi đăng nhập, sẽ thấy:
   - ✅ Nút "Đăng nhập Google" → "Đăng xuất"
   - ✅ Status: "Đã kết nối"
   - ✅ Nút "Lấy từ Cloud" và "Đăng xuất"

### Bước 2: Upload Dữ Liệu Lên Firebase

**Cách 1: Tự Động (Khuyến Nghị)**

Sau khi đăng nhập Firebase, mọi thay đổi (tạo/sửa/xóa trận, thành viên, giao dịch) sẽ **tự động upload** lên Firebase.

**Cách 2: Thủ Công**

Nếu muốn upload ngay lập tức:
1. Mở Console (F12)
2. Chạy:
```javascript
// Kiểm tra xem đã đăng nhập Firebase chưa
console.log('Firebase signed in:', localStorage.getItem('firebase:authUser:AIzaSyCb3uX6bNgt4kF5ZTYmABvhq_g5icip2no:[DEFAULT]') !== null);

// Nếu đã đăng nhập, dữ liệu sẽ tự động upload khi bạn tạo/sửa trận
```

### Bước 3: Tạo Trận Đấu (Sau Khi Đã Đăng Nhập Firebase)

1. Vào **"Trận Đấu"**
2. Click **"Thêm Trận Đấu"**
3. Điền thông tin và tick thành viên
4. Click **"Lưu"**
5. ✅ Dữ liệu sẽ **tự động upload lên Firebase**

### Bước 4: Tạo Mã QR

1. Click **"Mã QR"** trên trận vừa tạo
2. Mã QR hiển thị
3. Giữ nguyên cửa sổ

### Bước 5: Khách Quét QR (Điện Thoại)

1. Mở https://football-team-manager-14a39.web.app trên điện thoại
2. Click **"Khách (Chỉ xem)"**
3. ✅ Hệ thống sẽ **tự động download dữ liệu từ Firebase**
4. Chọn thành viên
5. Vào "Điểm Danh" → Quét QR
6. ✅ Thành công!

---

## 🔍 Kiểm Tra Đồng Bộ

### Kiểm Tra Admin Đã Upload Chưa

Mở Console (F12) trên máy tính Admin:

```javascript
// Kiểm tra Firebase connection
const checkFirebase = async () => {
  const db = firebase.firestore();
  const doc = await db.collection('teams').doc('primary').get();
  
  if (doc.exists) {
    const data = doc.data();
    console.log('✅ Firebase có dữ liệu!');
    console.log('Số trận:', data.matches?.length || 0);
    console.log('Số thành viên:', data.members?.length || 0);
    console.log('Last updated:', data.lastUpdated?.toDate());
  } else {
    console.log('❌ Firebase chưa có dữ liệu!');
    console.log('Hãy đăng nhập Firebase và tạo trận mới.');
  }
};

checkFirebase();
```

### Kiểm Tra Khách Download Được Chưa

Mở Console trên điện thoại (hoặc Chrome DevTools Remote Debugging):

```javascript
// Kiểm tra localStorage
const matches = JSON.parse(localStorage.getItem('matches') || '[]');
console.log('Số trận trong localStorage:', matches.length);

if (matches.length > 0) {
  console.log('✅ Đã có dữ liệu!');
  console.log('Trận cuối:', matches[matches.length - 1]);
} else {
  console.log('❌ Chưa có dữ liệu!');
  console.log('Hãy reload trang và chọn "Khách" lại.');
}
```

---

## ⚠️ Lưu Ý Quan Trọng

### 1. Admin PHẢI Đăng Nhập Firebase

- ❌ Nếu Admin không đăng nhập Firebase → Dữ liệu chỉ lưu localStorage
- ✅ Nếu Admin đăng nhập Firebase → Dữ liệu tự động upload

### 2. Khách Tự Động Download

- Khi click "Khách (Chỉ xem)", hệ thống tự động download từ Firebase
- Nếu Firebase chưa có dữ liệu → Sử dụng seed data (5 thành viên mẫu)

### 3. Firestore Rules

Đã cấu hình:
```
/teams/primary:
  - Read: Public (ai cũng đọc được)
  - Write: Chỉ khi đăng nhập Firebase
```

---

## 🚀 Quy Trình Hoàn Chỉnh

### Lần Đầu Setup (Admin)

1. ✅ Đăng nhập Admin
2. ✅ Click "Đăng nhập Google"
3. ✅ Tạo trận đấu mới
4. ✅ Dữ liệu tự động upload lên Firebase

### Mỗi Lần Sử Dụng (Khách)

1. ✅ Mở app trên điện thoại
2. ✅ Click "Khách (Chỉ xem)"
3. ✅ Dữ liệu tự động download từ Firebase
4. ✅ Quét QR → Thành công!

---

## 🔧 Troubleshooting

### Lỗi: "Không tìm thấy trận đấu"

**Nguyên nhân:** Khách chưa download được dữ liệu từ Firebase

**Giải pháp:**
1. Kiểm tra Admin đã đăng nhập Firebase chưa
2. Kiểm tra Admin đã upload dữ liệu chưa (chạy script kiểm tra ở trên)
3. Reload trang Khách và chọn "Khách" lại

### Lỗi: "Firebase not initialized"

**Nguyên nhân:** Firebase chưa khởi tạo xong

**Giải pháp:**
1. Đợi 2-3 giây sau khi load trang
2. Reload trang

### Lỗi: "Permission denied"

**Nguyên nhân:** Firestore rules chưa đúng

**Giải pháp:**
1. Deploy lại Firestore rules: `firebase deploy --only firestore:rules`
2. Kiểm tra rules tại Firebase Console

---

## 📊 Luồng Dữ Liệu

```
Admin (Máy tính)
  ↓
Đăng nhập Firebase
  ↓
Tạo/Sửa trận đấu
  ↓
Auto upload → Firebase Firestore (/teams/primary)
  ↓
Khách (Điện thoại)
  ↓
Click "Khách (Chỉ xem)"
  ↓
Auto download ← Firebase Firestore (/teams/primary)
  ↓
Quét QR → Tìm thấy trận → Thành công!
```

---

## ✅ Checklist

Trước khi Khách quét QR, đảm bảo:

- [ ] Admin đã đăng nhập Firebase (thấy nút "Đăng xuất")
- [ ] Admin đã tạo trận đấu (sau khi đăng nhập Firebase)
- [ ] Khách đã click "Khách (Chỉ xem)" (để download dữ liệu)
- [ ] Khách đã chọn đúng thành viên (có trong danh sách trận)

Nếu tất cả đều ✅ → Quét QR sẽ thành công 100%!
