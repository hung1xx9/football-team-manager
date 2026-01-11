# ⚠️ QUAN TRỌNG: Restart Dev Server

Sau khi tạo/sửa file `.env`, bạn **BẮT BUỘC** phải restart dev server để load environment variables mới.

## Cách Restart:

### Option 1: Trong Terminal đang chạy `npm run dev`
1. Nhấn `Ctrl + C` để dừng server
2. Chạy lại: `npm run dev`

### Option 2: Trong VS Code
1. Mở Terminal đang chạy dev server
2. Click vào icon **Kill Terminal** (thùng rác) hoặc nhấn `Ctrl + C`
3. Mở terminal mới và chạy: `npm run dev`

## Kiểm Tra Environment Variables Đã Load

Mở browser console (F12) và kiểm tra:

```javascript
// Trong browser console, chạy:
console.log(import.meta.env.VITE_FIREBASE_API_KEY)
```

- ✅ Nếu hiện API key → Đã load thành công
- ❌ Nếu hiện `undefined` → Chưa load, cần restart lại

## Lưu Ý

- Vite chỉ load file `.env` khi **START** server, không phải khi đang chạy
- Mọi thay đổi trong `.env` đều cần restart server
- File `.env` phải ở thư mục gốc của project (cùng cấp với `package.json`)
