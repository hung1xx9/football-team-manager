# ✅ Checklist Trước Khi Push Lên GitHub

## 🔒 Bảo Mật

- [ ] File `.env` đã được tạo và chứa Firebase credentials
- [ ] File `.env` **KHÔNG** xuất hiện trong `git status`
- [ ] File `.env.example` đã được tạo với placeholder values
- [ ] Đã xóa hết hardcoded API keys trong code
- [ ] Đã xóa hết hardcoded API keys trong documentation

## 🧪 Kiểm Tra Hoạt Động

- [ ] Dev server đã được restart sau khi tạo `.env`
- [ ] Ứng dụng chạy bình thường trên localhost
- [ ] Firebase authentication hoạt động
- [ ] Có thể upload/download data từ Firebase
- [ ] Console không có lỗi liên quan đến Firebase config

## 📝 Documentation

- [ ] File `SECURITY_SETUP.md` đã được tạo
- [ ] File `FIREBASE_SETUP.md` đã được cập nhật
- [ ] File `RESTART_SERVER.md` đã được tạo
- [ ] README.md có hướng dẫn setup `.env` (nếu cần)

## 🔍 Kiểm Tra Git

Chạy các lệnh sau để đảm bảo an toàn:

```bash
# 1. Kiểm tra file .env KHÔNG được track
git status --short .env
# Kết quả: KHÔNG có output (tốt) hoặc "!! .env" (tốt)
# Nếu có "?? .env" hoặc "M .env" → NGUY HIỂM!

# 2. Kiểm tra các file sẽ được commit
git status --porcelain
# Đảm bảo .env KHÔNG xuất hiện trong danh sách

# 3. Tìm kiếm API key trong code
git grep "YOUR_ACTUAL_API_KEY"
# Kết quả: KHÔNG có (tốt)
# Nếu có → Cần xóa hardcoded key

# 4. Kiểm tra .gitignore
cat .gitignore | grep ".env"
# Kết quả: Phải có dòng ".env"
```

## 🚀 Sẵn Sàng Push

Nếu tất cả checklist đều ✅, bạn có thể push an toàn:

```bash
git add .
git commit -m "feat: secure Firebase credentials with environment variables"
git push origin master
```

## ⚠️ Nếu Đã Push Nhầm API Key

Nếu bạn đã vô tình push API key lên GitHub:

### 1. **NGAY LẬP TỨC** Regenerate API Key
   - Vào [Firebase Console](https://console.firebase.google.com/)
   - Project Settings > General
   - Xóa app hiện tại và tạo app mới (hoặc rotate credentials)

### 2. Xóa API Key Khỏi Git History
   ```bash
   # Cảnh báo: Lệnh này sẽ rewrite git history!
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch src/composables/useFirebase.js" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push
   git push origin --force --all
   ```

### 3. Cập Nhật File `.env` Với Key Mới

### 4. Commit Và Push Lại

---

## 📊 Kết Quả Mong Đợi

Sau khi push, khi người khác clone repo:

1. ❌ Họ **KHÔNG** thấy API key thật
2. ✅ Họ thấy file `.env.example` với hướng dẫn
3. ✅ Họ phải tự tạo file `.env` và điền credentials
4. ✅ Code sử dụng environment variables

---

**Lưu ý cuối:** File `.env` chỉ dùng cho local development. Khi deploy lên production (GitHub Pages, Vercel, etc.), bạn cần setup environment variables trên platform đó.
