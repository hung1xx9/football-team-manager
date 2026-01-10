# Hướng Dẫn Cài Đặt Git

## ⚠️ Git chưa được cài đặt trên hệ thống

Để sử dụng Git cho dự án này, bạn cần cài đặt Git trước.

## 📥 Cài Đặt Git trên Windows

### Cách 1: Tải từ trang chính thức
1. Truy cập: https://git-scm.com/download/win
2. Tải phiên bản phù hợp (64-bit hoặc 32-bit)
3. Chạy file cài đặt
4. Chọn các tùy chọn mặc định (Next → Next → Install)
5. Khởi động lại Terminal/PowerShell

### Cách 2: Sử dụng Winget (Windows 10/11)
```powershell
winget install --id Git.Git -e --source winget
```

### Cách 3: Sử dụng Chocolatey
```powershell
choco install git
```

## ✅ Kiểm Tra Cài Đặt

Sau khi cài đặt, mở PowerShell mới và chạy:
```powershell
git --version
```

Nếu hiển thị phiên bản Git (ví dụ: `git version 2.43.0`), cài đặt thành công!

## 🚀 Khởi Tạo Git Repository

Sau khi cài đặt Git, chạy các lệnh sau trong thư mục dự án:

```powershell
# Khởi tạo Git repository
git init

# Thêm tất cả files
git add .

# Commit đầu tiên
git commit -m "Initial commit: Tinh Hoa FC Management System"

# (Tùy chọn) Kết nối với GitHub
git remote add origin https://github.com/your-username/tinh-hoa-fc.git
git branch -M main
git push -u origin main
```

## 📝 File .gitignore

File `.gitignore` đã được tạo sẵn với các mục:
- `node_modules/` - Dependencies
- `dist/` - Build output
- `.env` - Environment variables
- Các file tạm và cache

## 💡 Lệnh Git Cơ Bản

```powershell
# Xem trạng thái
git status

# Thêm files mới/thay đổi
git add .

# Commit thay đổi
git commit -m "Mô tả thay đổi"

# Xem lịch sử
git log

# Tạo branch mới
git branch feature-name
git checkout feature-name

# Hoặc tạo và chuyển luôn
git checkout -b feature-name

# Push lên remote
git push origin main
```

## 🔗 Kết Nối GitHub (Tùy Chọn)

1. Tạo repository mới trên GitHub
2. Copy URL repository
3. Chạy lệnh:
```powershell
git remote add origin <URL-repository>
git push -u origin main
```

## 📚 Tài Liệu Tham Khảo

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf

---

**Lưu ý:** Sau khi cài đặt Git, bạn cần **khởi động lại Terminal/PowerShell** để các lệnh Git có hiệu lực.
