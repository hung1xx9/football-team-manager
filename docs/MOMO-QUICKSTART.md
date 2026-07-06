# 🚀 Quick Start - MoMo Integration

## Chọn Phương Thức của Bạn

### Option A: Personal Link (Nhanh & Đơn Giản) ⚡

**Phù hợp cho**: CLB nhỏ, không cần tự động

**Thời gian setup**: 2 phút

```bash
# 1. Không cần config .env cho MoMo
# 2. Chỉ cần vào app > Finance > Cài đặt ví
# 3. Nhập số điện thoại MoMo của bạn
# 4. Xong! 🎉
```

**Cách dùng**:
1. Click nút "MOMO" bên cạnh thành viên
2. QR code xuất hiện với số tiền chính xác
3. Thành viên quét và chuyển tiền
4. ⚠️ **Bạn phải click "Xác nhận đã thanh toán"** để cập nhật vào hệ thống

---

### Option B: Business API (Chuyên Nghiệp & Tự Động) 🔄

**Phù hợp cho**: CLB lớn, muốn tự động 100%

**Thời gian setup**: 30 phút (+ thời gian chờ duyệt Business)

#### Bước 1: Lấy Credentials (10 phút)

```bash
# 1. Đăng ký tài khoản tại:
https://business.momo.vn/

# 2. Vào Developer Portal:
https://developers.momo.vn/

# 3. Tạo app và lấy:
#    - Partner Code
#    - Access Key
#    - Secret Key
```

#### Bước 2: Config File .env (2 phút)

```bash
# Copy file mẫu
cp .env.example .env

# Mở .env và điền:
VITE_MOMO_PARTNER_CODE=MOMOXXXX
VITE_MOMO_ACCESS_KEY=your_access_key
VITE_MOMO_SECRET_KEY=your_secret_key
VITE_MOMO_ENDPOINT=https://test-payment.momo.vn
VITE_APP_URL=http://localhost:5173
```

#### Bước 3: Deploy Firebase Functions (5 phút)

```bash
# Cài đặt dependencies
cd functions
npm install
cd ..

# Set config cho Firebase
firebase functions:config:set momo.partner_code="MOMOXXXX"
firebase functions:config:set momo.access_key="your_access_key"
firebase functions:config:set momo.secret_key="your_secret_key"
firebase functions:config:set momo.endpoint="https://test-payment.momo.vn"

# Deploy
firebase deploy --only functions
```

#### Bước 4: Config Webhook trên MoMo Portal (3 phút)

```bash
# 1. Vào MoMo Developer Portal
# 2. Chọn app của bạn
# 3. Cấu hình IPN URL:

https://<region>-<project-id>.cloudfunctions.net/momoWebhook

# Ví dụ:
https://asia-southeast1-my-app.cloudfunctions.net/momoWebhook

# 4. Return URL:
https://your-domain.com/finance
```

#### Bước 5: Test! (5 phút)

```bash
# 1. Chạy app
npm run dev

# 2. Vào Finance > Click MOMO
# 3. Quét QR và thanh toán
# 4. ✅ Tự động cập nhật ngay lập tức!
```

---

## 🎯 So Sánh Nhanh

| Tính năng | Personal Link | Business API |
|-----------|---------------|--------------|
| Thời gian setup | 2 phút | 30 phút |
| Tự động cập nhật | ❌ | ✅ |
| Cần tài khoản Business | ❌ | ✅ |
| Xác nhận thủ công | ✅ Cần | ❌ Không cần |
| Chi phí | Miễn phí | Miễn phí* |
| Phù hợp | CLB nhỏ | CLB lớn, chuyên nghiệp |

\* Có thể có phí giao dịch tùy gói Business

---

## 🆘 Cần Trợ Giúp?

### Personal Link Không Hoạt Động?

```bash
# Kiểm tra:
1. Số điện thoại đã đúng chưa? (09xxxxxxxx)
2. Đã lưu cài đặt chưa?
3. Thử refresh lại trang
```

### Business API Không Nhận Webhook?

```bash
# Kiểm tra:
1. Firebase Functions đã deploy chưa?
   firebase deploy --only functions

2. Xem logs:
   firebase functions:log --only momoWebhook

3. Webhook URL đúng chưa?
   - Vào MoMo Portal kiểm tra IPN URL
   - So sánh với URL trong Firebase Console

4. Test đơn giản:
   curl -X POST https://your-function-url/momoWebhook
```

### Lỗi Signature Verification?

```bash
# Secret Key sai!
# Fix:
firebase functions:config:set momo.secret_key="CORRECT_KEY"
firebase deploy --only functions
```

---

## 📖 Tài Liệu Chi Tiết

- **MOMO-INTEGRATION-GUIDE.md**: Hướng dẫn đầy đủ
- **MOMO-API-REFERENCE.md**: Reference cho developer
- **CHANGELOG-MOMO.md**: Tính năng mới

---

## ✅ Checklist

### Personal Link
- [ ] Vào Finance > Cài đặt ví
- [ ] Nhập số điện thoại MoMo
- [ ] Lưu cài đặt
- [ ] Test tạo QR code
- [ ] Test xác nhận thủ công

### Business API
- [ ] Đăng ký MoMo Business
- [ ] Lấy credentials từ Developer Portal
- [ ] Config `.env`
- [ ] Deploy Firebase Functions
- [ ] Config webhook URL trên MoMo Portal
- [ ] Test với môi trường test
- [ ] Chuyển sang production
- [ ] Monitor logs 24h đầu

---

**🎉 Xong! Giờ bạn có thể thu quỹ qua MoMo rồi!**

*Có câu hỏi? Đọc MOMO-INTEGRATION-GUIDE.md để biết thêm chi tiết.*
