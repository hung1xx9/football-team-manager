# 🔒 Logic Khóa Điểm Danh Theo Match ID

## 📋 Tổng Quan

Hệ thống điểm danh đã được cập nhật để **khóa theo Match ID** thay vì theo ngày. Điều này cho phép:
- ✅ Mỗi người chỉ quét 1 lần cho 1 trận cụ thể
- ✅ Có thể quét nhiều trận trong cùng 1 ngày
- ✅ Khi xóa trận → Tự động xóa lịch sử quét → Có thể quét lại trận mới

---

## 🔄 So Sánh Logic Cũ vs Mới

### ❌ Logic Cũ (Theo Ngày)

```javascript
// localStorage key
last_scan_5  // Member ID 5 quét lần cuối

// Vấn đề:
- Chỉ quét được 1 lần/ngày (bất kể bao nhiêu trận)
- Xóa trận không reset được
- Phải đợi đến ngày mai mới quét lại
```

### ✅ Logic Mới (Theo Match ID)

```javascript
// localStorage keys
scan_5_1234  // Member 5 đã quét trận 1234
scan_5_5678  // Member 5 đã quét trận 5678
scan_7_1234  // Member 7 đã quét trận 1234

// Ưu điểm:
- Quét được nhiều trận trong cùng 1 ngày
- Xóa trận → Tự động xóa scan records
- Linh hoạt hơn cho việc quản lý
```

---

## 🔧 API Functions

### 1. **canScanMatch(memberId, matchId)**

Kiểm tra xem member có thể quét trận này không.

```javascript
import { canScanMatch } from '../composables/useQRAttendance';

const canScan = canScanMatch(5, 1234);
// true: Chưa quét trận này
// false: Đã quét rồi
```

**Cách hoạt động:**
```javascript
export const canScanMatch = (memberId, matchId) => {
    const scanKey = `scan_${memberId}_${matchId}`;
    const hasScanned = localStorage.getItem(scanKey);
    
    return !hasScanned; // true nếu chưa quét
};
```

---

### 2. **markScannedMatch(memberId, matchId)**

Đánh dấu đã quét trận này.

```javascript
import { markScannedMatch } from '../composables/useQRAttendance';

markScannedMatch(5, 1234);
// Lưu: scan_5_1234 = timestamp
```

**Cách hoạt động:**
```javascript
export const markScannedMatch = (memberId, matchId) => {
    const scanKey = `scan_${memberId}_${matchId}`;
    localStorage.setItem(scanKey, Date.now().toString());
};
```

---

### 3. **getScannedMatchInfo(memberId, matchId)**

Lấy thông tin lần quét (nếu đã quét).

```javascript
import { getScannedMatchInfo } from '../composables/useQRAttendance';

const info = getScannedMatchInfo(5, 1234);
// {
//     scannedAt: Date,
//     formattedTime: "11/01/2026 10:30:45"
// }
// hoặc null nếu chưa quét
```

**Cách hoạt động:**
```javascript
export const getScannedMatchInfo = (memberId, matchId) => {
    const scanKey = `scan_${memberId}_${matchId}`;
    const timestamp = localStorage.getItem(scanKey);
    
    if (!timestamp) return null;
    
    const scannedAt = new Date(parseInt(timestamp));
    return {
        scannedAt,
        formattedTime: scannedAt.toLocaleString('vi-VN')
    };
};
```

---

### 4. **cleanupDeletedMatch(matchId)**

Xóa tất cả scan records của trận này (gọi khi xóa trận).

```javascript
import { cleanupDeletedMatch } from '../composables/useQRAttendance';

const deletedCount = cleanupDeletedMatch(1234);
// Xóa: scan_5_1234, scan_7_1234, scan_9_1234, ...
// Return: Số lượng records đã xóa
```

**Cách hoạt động:**
```javascript
export const cleanupDeletedMatch = (matchId) => {
    const keysToDelete = [];
    
    // Tìm tất cả keys của trận này
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('scan_') && key.endsWith(`_${matchId}`)) {
            keysToDelete.push(key);
        }
    }
    
    // Xóa chúng
    keysToDelete.forEach(key => {
        localStorage.removeItem(key);
    });
    
    return keysToDelete.length;
};
```

---

## 📊 Luồng Xử Lý

### **Khi Quét QR Code**

```
1. User quét QR → Lấy matchId từ QR
   ↓
2. Kiểm tra: canScanMatch(memberId, matchId)
   ↓
3a. Nếu false → Hiển thị: "Đã điểm danh trận này rồi lúc [time]"
   ↓
3b. Nếu true → Tiếp tục
   ↓
4. Kiểm tra member có trong attendance list không
   ↓
5. Cập nhật status = 'present'
   ↓
6. Lưu match vào Firebase
   ↓
7. markScannedMatch(memberId, matchId)
   ↓
8. Hiển thị: "✅ Điểm danh thành công!"
```

### **Khi Xóa Trận**

```
1. Admin click "Xóa trận"
   ↓
2. Confirm dialog
   ↓
3. cleanupDeletedMatch(matchId)
   → Xóa tất cả scan_*_matchId
   ↓
4. Xóa trận khỏi matches array
   ↓
5. saveData()
   ↓
6. Console log: "Deleted match X, cleaned up Y scan records"
```

---

## 💾 Dữ Liệu LocalStorage

### **Ví Dụ Thực Tế**

```javascript
// Trận 1234: Ngày 10/01/2026
{
    "scan_1_1234": "1736481600000",  // Member 1 quét lúc 10:00
    "scan_5_1234": "1736485200000",  // Member 5 quét lúc 11:00
    "scan_7_1234": "1736488800000"   // Member 7 quét lúc 12:00
}

// Trận 5678: Ngày 10/01/2026 (cùng ngày)
{
    "scan_1_5678": "1736492400000",  // Member 1 quét trận khác lúc 13:00
    "scan_5_5678": "1736496000000"   // Member 5 quét trận khác lúc 14:00
}

// → Member 1 và 5 quét được 2 trận trong cùng 1 ngày! ✅
```

### **Khi Xóa Trận 1234**

```javascript
// Trước khi xóa
localStorage = {
    "scan_1_1234": "...",
    "scan_5_1234": "...",
    "scan_7_1234": "...",
    "scan_1_5678": "...",
    "scan_5_5678": "..."
}

// Sau khi xóa trận 1234
localStorage = {
    "scan_1_5678": "...",  // Giữ lại
    "scan_5_5678": "..."   // Giữ lại
}
// → Đã xóa 3 scan records của trận 1234
```

---

## 🎯 Use Cases

### **Use Case 1: Quét Nhiều Trận Trong 1 Ngày**

```
Ngày 11/01/2026:
- 10:00: Trận 1 vs Đội A → Member 5 quét ✅
- 14:00: Trận 2 vs Đội B → Member 5 quét ✅
- 18:00: Trận 3 vs Đội C → Member 5 quét ✅

→ Tất cả đều thành công!
```

### **Use Case 2: Không Quét Trùng Cùng Trận**

```
Trận 1234:
- 10:00: Member 5 quét lần 1 → ✅ Thành công
- 10:05: Member 5 quét lần 2 → ❌ "Đã điểm danh trận này rồi lúc 10:00"
```

### **Use Case 3: Xóa Trận Và Reset**

```
1. Admin tạo trận 1234
2. Member 5 quét → Đã điểm danh
3. Admin xóa trận 1234 → Cleanup scan records
4. Admin tạo trận mới 9999
5. Member 5 quét trận 9999 → ✅ Thành công (vì là trận mới)
```

---

## 🔍 Debug & Troubleshooting

### **Kiểm Tra Scan Records**

Mở Console (F12) và chạy:

```javascript
// Xem tất cả scan records
Object.keys(localStorage)
    .filter(key => key.startsWith('scan_'))
    .forEach(key => {
        const timestamp = localStorage.getItem(key);
        const date = new Date(parseInt(timestamp));
        console.log(key, '→', date.toLocaleString('vi-VN'));
    });

// Kết quả:
// scan_5_1234 → 11/01/2026 10:30:45
// scan_5_5678 → 11/01/2026 14:15:20
```

### **Xóa Thủ Công Scan Record**

```javascript
// Xóa 1 record cụ thể
localStorage.removeItem('scan_5_1234');

// Xóa tất cả scan records của member 5
Object.keys(localStorage)
    .filter(key => key.startsWith('scan_5_'))
    .forEach(key => localStorage.removeItem(key));

// Xóa tất cả scan records
Object.keys(localStorage)
    .filter(key => key.startsWith('scan_'))
    .forEach(key => localStorage.removeItem(key));
```

---

## ⚠️ Lưu Ý

### **1. LocalStorage Limitations**

- Dữ liệu chỉ lưu trên thiết bị
- Xóa browser data → Mất scan records
- Đổi browser/thiết bị → Có thể quét lại

### **2. Không Đồng Bộ Với Firebase**

- Scan records chỉ lưu localStorage
- Không upload lên Firebase
- Mỗi thiết bị có scan records riêng

### **3. Backward Compatibility**

- Vẫn giữ các functions cũ (`canScanToday`, `markScannedToday`)
- Có warning khi dùng functions cũ
- Khuyến nghị migrate sang functions mới

---

## 🚀 Migration Guide

### **Từ Logic Cũ Sang Mới**

```javascript
// ❌ Cũ
import { canScanToday, markScannedToday } from './useQRAttendance';

const canScan = canScanToday(memberId);
markScannedToday(memberId);

// ✅ Mới
import { canScanMatch, markScannedMatch } from './useQRAttendance';

const canScan = canScanMatch(memberId, matchId);
markScannedMatch(memberId, matchId);
```

---

## ✅ Kết Luận

Logic mới linh hoạt hơn và phù hợp với use case thực tế:
- ✅ Quét được nhiều trận/ngày
- ✅ Xóa trận tự động cleanup
- ✅ Dễ debug và maintain
- ✅ Tương thích ngược với code cũ

---

**Cập nhật:** 11/01/2026
**Phiên bản:** 2.0
