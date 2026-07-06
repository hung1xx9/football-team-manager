# Hướng Dẫn Tích Hợp MoMo Payment

## 📋 Tổng Quan

Ứng dụng Football Team Manager hỗ trợ **2 phương thức** thanh toán MoMo:

### 1️⃣ **MoMo Business API** (Khuyến nghị - Tự động)
- ✅ Tự động cập nhật giao dịch vào hệ thống
- ✅ Webhook realtime từ MoMo
- ✅ Kiểm tra trạng thái giao dịch
- ✅ An toàn, chuyên nghiệp
- ⚠️ **Cần**: Tài khoản MoMo Business

### 2️⃣ **MoMo Personal Link** (Dự phòng - Thủ công)
- ✅ Không cần tài khoản Business
- ✅ Chỉ cần số điện thoại MoMo
- ✅ Tạo QR code thanh toán
- ⚠️ **Cần**: Xác nhận thủ công sau khi nhận tiền

## 🚀 Phương Pháp 1: Tích Hợp MoMo Business API

### Bước 1: Đăng Ký Tài Khoản Business

1. Truy cập: https://business.momo.vn/
2. Đăng ký tài khoản doanh nghiệp
3. Hoàn thiện thông tin xác thực (KYC)

### Bước 2: Lấy API Credentials

1. Đăng nhập vào MoMo Business Portal
2. Vào **Developer Portal**: https://developers.momo.vn/
3. Tạo ứng dụng mới
4. Lấy các thông tin sau:
   - `Partner Code`
   - `Access Key`
   - `Secret Key`

### Bước 3: Cấu Hình Environment Variables

Mở file `.env` (hoặc copy từ `.env.example`) và điền thông tin:

```bash
# MoMo Business API Configuration
VITE_MOMO_PARTNER_CODE=MOMOXXXX
VITE_MOMO_ACCESS_KEY=your_access_key_here
VITE_MOMO_SECRET_KEY=your_secret_key_here

# Test environment
VITE_MOMO_ENDPOINT=https://test-payment.momo.vn

# Production (sau khi test xong)
# VITE_MOMO_ENDPOINT=https://payment.momo.vn

# Your app URL (cho webhook)
VITE_APP_URL=http://localhost:5173
# Production: https://your-domain.com
```

### Bước 4: Setup Firebase Functions (Webhook Handler)

#### 4.1. Cài đặt Firebase Functions

```bash
cd functions
npm install
```

#### 4.2. Cấu hình Firebase Functions Environment

```bash
# Set MoMo credentials
firebase functions:config:set momo.partner_code="MOMOXXXX"
firebase functions:config:set momo.access_key="your_access_key"
firebase functions:config:set momo.secret_key="your_secret_key"
firebase functions:config:set momo.endpoint="https://test-payment.momo.vn"

# Set app URL for webhooks
firebase functions:config:set app.url="https://your-domain.com"

# View current config
firebase functions:config:get
```

#### 4.3. Deploy Functions

```bash
# Deploy all functions
firebase deploy --only functions

# Or deploy specific function
firebase deploy --only functions:momoWebhook
```

### Bước 5: Cấu Hình Webhook URL trên MoMo Portal

1. Đăng nhập vào MoMo Developer Portal
2. Vào ứng dụng của bạn
3. Cấu hình **IPN URL** (Webhook URL):
   ```
   https://<your-region>-<project-id>.cloudfunctions.net/momoWebhook
   ```
   Ví dụ: `https://asia-southeast1-football-manager-123.cloudfunctions.net/momoWebhook`

4. Cấu hình **Return URL**:
   ```
   https://your-domain.com/finance
   ```

### Bước 6: Test Tích Hợp

1. Truy cập trang **Finance** trong app
2. Click nút **MOMO** bên cạnh thành viên nợ tiền
3. Quét mã QR hoặc click "Mở ứng dụng MoMo"
4. Thanh toán
5. ✅ Giao dịch sẽ **tự động** được cập nhật vào hệ thống qua webhook

## 🔧 Phương Pháp 2: Sử Dụng MoMo Personal Link

### Bước 1: Cấu Hình Số Điện Thoại

1. Trong app, vào trang **Finance**
2. Tab **Tình Hình Đóng Quỹ**
3. Click nút **⚙️ Cài đặt ví**
4. Nhập số điện thoại MoMo của bạn (ví dụ: `0901234567`)
5. Click **Lưu Cài Đặt**

### Bước 2: Sử Dụng

1. Click nút **MOMO** bên cạnh thành viên
2. QR code sẽ được tạo với số tiền cần đóng
3. Thành viên quét mã và thanh toán
4. ⚠️ **Quan trọng**: Sau khi nhận được tiền, Admin phải click **"Xác nhận đã thanh toán"** để cập nhật vào hệ thống

## 📊 Theo Dõi Giao Dịch MoMo

### Trong Tab "Lịch Sử Giao Dịch"

Các giao dịch từ MoMo sẽ được đánh dấu:
- **Business API**: `source: 'momo_auto'` - Tự động từ webhook
- **Personal**: `source: 'momo_manual'` - Xác nhận thủ công

### Kiểm Tra Webhook Logs

```bash
# View Firebase Functions logs
firebase functions:log --only momoWebhook

# Realtime logs
firebase functions:log --only momoWebhook --follow
```

### Database Structure

Webhook data được lưu trong Firestore:
```
/momoWebhooks/{requestId}
  - orderId
  - amount
  - transId
  - errorCode
  - receivedAt
  - processed
  - transactionId (nếu đã tạo giao dịch)
```

## 🔐 Bảo Mật

### ✅ Best Practices

1. **Không commit `.env` vào Git**
   ```bash
   # File .gitignore đã có
   .env
   ```

2. **Sử dụng Environment Variables**
   - Development: File `.env`
   - Production: Firebase Functions Config

3. **Verify Webhook Signature**
   - Code đã tự động verify signature từ MoMo
   - Reject requests với signature không hợp lệ

4. **Idempotency**
   - Webhook handler kiểm tra `requestId` để tránh xử lý trùng lặp

## 🐛 Troubleshooting

### 1. Không nhận được webhook

**Kiểm tra:**
- Firebase Functions đã deploy chưa?
- Webhook URL đã cấu hình đúng trên MoMo Portal chưa?
- Check logs: `firebase functions:log --only momoWebhook`

### 2. Signature verification failed

**Nguyên nhân:**
- Secret Key không đúng
- Sai format dữ liệu khi tạo signature

**Giải pháp:**
```bash
# Kiểm tra config
firebase functions:config:get

# Set lại secret key
firebase functions:config:set momo.secret_key="correct_secret_key"
firebase deploy --only functions
```

### 3. CORS errors khi call API

**Giải pháp:**
- Sử dụng Firebase Functions thay vì client-side call
- Đã implement sẵn function `createMoMoPayment`

### 4. Test environment vs Production

```bash
# Test environment
VITE_MOMO_ENDPOINT=https://test-payment.momo.vn

# Production (sau khi test xong)
VITE_MOMO_ENDPOINT=https://payment.momo.vn
```

## 📱 Workflow Thực Tế

### Với Business API (Tự động)
```mermaid
User clicks MOMO button
    ↓
App gọi createMoMoPayment (Firebase Function)
    ↓
MoMo trả về QR code
    ↓
User quét và thanh toán
    ↓
MoMo gửi webhook → Firebase Function
    ↓
Function tạo transaction trong Firestore
    ↓
✅ App tự động cập nhật UI
```

### Với Personal Link (Thủ công)
```mermaid
User clicks MOMO button
    ↓
App tạo personal payment link
    ↓
Generate QR code
    ↓
User quét và thanh toán
    ↓
Admin nhận tiền trong MoMo
    ↓
⚠️ Admin click "Xác nhận đã thanh toán"
    ↓
✅ Transaction được tạo trong Firestore
```

## 🎯 Checklist Triển Khai

### Development
- [ ] Copy `.env.example` thành `.env`
- [ ] Điền thông tin MoMo (Business hoặc Personal phone)
- [ ] Install dependencies: `npm install`
- [ ] Test trên localhost

### Production (Business API)
- [ ] Đăng ký MoMo Business
- [ ] Lấy API credentials
- [ ] Deploy Firebase Functions
- [ ] Cấu hình webhook URL trên MoMo Portal
- [ ] Test với test environment trước
- [ ] Chuyển sang production endpoint
- [ ] Monitor webhook logs

### Production (Personal Link)
- [ ] Cấu hình số điện thoại MoMo trong app
- [ ] Hướng dẫn Admin cách xác nhận thủ công
- [ ] Test flow hoàn chỉnh

## 💡 Tips

1. **Nên dùng Business API** nếu có thể để tự động hóa hoàn toàn
2. **Personal Link** phù hợp cho CLB nhỏ, chấp nhận xác nhận thủ công
3. **Có thể kết hợp cả 2**: Business API cho các khoản lớn, Personal cho linh hoạt
4. **Backup data**: Export lịch sử giao dịch định kỳ
5. **Monitor logs**: Kiểm tra Firebase Functions logs thường xuyên

## 📞 Hỗ Trợ

- **MoMo Developer Portal**: https://developers.momo.vn/
- **MoMo Business**: https://business.momo.vn/
- **Firebase Console**: https://console.firebase.google.com/

---

**Chúc bạn triển khai thành công! ⚽💰**
