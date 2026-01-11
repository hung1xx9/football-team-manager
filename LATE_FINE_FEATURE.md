# 💰 Tính Năng Phạt Đi Muộn Tự Động

## 📋 Tổng Quan

Hệ thống tự động tính và áp dụng **tiền phạt** khi thành viên điểm danh muộn, dựa trên số phút đi muộn.

---

## 💵 Bảng Mức Phạt

| Mức Độ Muộn | Số Phút | Tiền Phạt |
|-------------|---------|-----------|
| **Muộn nhẹ** | < 10 phút | 10,000 VNĐ |
| **Muộn vừa** | 10-19 phút | 20,000 VNĐ |
| **Muộn nặng** | ≥ 20 phút | 50,000 VNĐ |

---

## 🔧 Cách Hoạt Động

### **1. Khi Thành Viên Quét QR**

```javascript
// Bước 1: Lấy thời gian điểm danh
const attendanceTimestamp = new Date();

// Bước 2: Tính số phút muộn
const matchStartDateTime = new Date(match.date);
matchStartDateTime.setHours(startHours, startMinutes, 0, 0);
const lateMinutes = Math.floor((attendanceTimestamp - matchStartDateTime) / (1000 * 60));

// Bước 3: Áp dụng mức phạt
if (lateMinutes < 10) {
    lateFine = 10000;
} else if (lateMinutes < 20) {
    lateFine = 20000;
} else {
    lateFine = 50000;
}

// Bước 4: Lưu vào attendance record
match.attendance[index].lateMinutes = lateMinutes;
match.attendance[index].lateFine = lateFine;
```

### **2. Hiển Thị Thông Tin**

#### **Khi Quét QR Thành Công**
```
✅ Điểm danh thành công! (Đi muộn 15 phút)
💰 Phạt: 20.000 ₫

Đội ABC - 11/01/2026
```

#### **Trong Danh Sách Trận Đấu**
```
✓ Nguyễn Văn A
  11/01, 19:15 ⏰ Muộn 15 phút 💰 20.000 ₫
```

---

## 📊 Ví Dụ Thực Tế

### **Trận Đấu: 11/01/2026, 19:00**

| Thành Viên | Giờ Điểm Danh | Số Phút Muộn | Tiền Phạt |
|------------|---------------|--------------|-----------|
| Nguyễn Văn A | 18:55 | 0 (đúng giờ) | 0 ₫ |
| Trần Văn B | 19:05 | 5 phút | 10.000 ₫ |
| Lê Văn C | 19:15 | 15 phút | 20.000 ₫ |
| Phạm Văn D | 19:25 | 25 phút | 50.000 ₫ |
| **TỔNG** | - | - | **80.000 ₫** |

---

## 🎨 Giao Diện

### **1. Kết Quả Quét QR**

#### Đúng Giờ
```
┌─────────────────────────────────┐
│        ✅                        │
│ Điểm danh thành công!           │
│ (Đúng giờ)                      │
│                                 │
│ Đội ABC - 11/01/2026            │
└─────────────────────────────────┘
```

#### Muộn Nhẹ (< 10 phút)
```
┌─────────────────────────────────┐
│        ✅                        │
│ Điểm danh thành công!           │
│ (Đi muộn 5 phút)                │
│ 💰 Phạt: 10.000 ₫               │
│                                 │
│ Đội ABC - 11/01/2026            │
└─────────────────────────────────┘
```

#### Muộn Vừa (10-19 phút)
```
┌─────────────────────────────────┐
│        ✅                        │
│ Điểm danh thành công!           │
│ (Đi muộn 15 phút)               │
│ 💰 Phạt: 20.000 ₫               │
│                                 │
│ Đội ABC - 11/01/2026            │
└─────────────────────────────────┘
```

#### Muộn Nặng (≥ 20 phút)
```
┌─────────────────────────────────┐
│        ✅                        │
│ Điểm danh thành công!           │
│ (Đi muộn 25 phút)               │
│ 💰 Phạt: 50.000 ₫               │
│                                 │
│ Đội ABC - 11/01/2026            │
└─────────────────────────────────┘
```

### **2. Danh Sách Trận Đấu**

```
┌─────────────────────────────────────────────┐
│ Trận Đấu tập 11/01/2026                     │
│ 🕐 19:00                                    │
│ [Đấu tập] Đội ABC                           │
│ Sân Thống Nhất                              │
│ [5 có mặt] [2 vắng] [💰 80.000 ₫]          │
│                                             │
│ Điểm danh:                                  │
│ ✓ Nguyễn Văn A                              │
│   11/01, 18:55 ✓ Đúng giờ                  │
│                                             │
│ ✓ Trần Văn B                                │
│   11/01, 19:05 ⏰ Muộn 5 phút 💰 10.000 ₫  │
│                                             │
│ ✓ Lê Văn C                                  │
│   11/01, 19:15 ⏰ Muộn 15 phút 💰 20.000 ₫ │
│                                             │
│ ✓ Phạm Văn D                                │
│   11/01, 19:25 ⏰ Muộn 25 phút 💰 50.000 ₫ │
└─────────────────────────────────────────────┘
```

---

## 📈 Cấu Trúc Dữ Liệu

### **Attendance Object**
```javascript
{
    memberId: 5,
    status: "present",
    timestamp: "2026-01-11T12:15:00.000Z",
    isLate: true,
    lateMinutes: 15,        // ⭐ MỚI: Số phút muộn
    lateFine: 20000         // ⭐ MỚI: Tiền phạt (VNĐ)
}
```

### **Match Object với Tổng Phạt**
```javascript
{
    id: 1736611200000,
    date: "2026-01-11",
    startTime: "19:00",
    opponent: "Đội ABC",
    attendance: [
        { memberId: 1, status: "present", lateMinutes: 0, lateFine: 0 },
        { memberId: 2, status: "present", lateMinutes: 5, lateFine: 10000 },
        { memberId: 3, status: "present", lateMinutes: 15, lateFine: 20000 },
        { memberId: 4, status: "present", lateMinutes: 25, lateFine: 50000 }
    ]
}

// Tổng phạt = 0 + 10000 + 20000 + 50000 = 80,000 VNĐ
```

---

## 🔄 Luồng Xử Lý Đầy Đủ

```
1. Thành viên quét QR
   ↓
2. Lấy thời gian điểm danh hiện tại
   ↓
3. So sánh với giờ bắt đầu trận đấu
   ↓
4. Tính số phút muộn (nếu muộn)
   ↓
5. Áp dụng mức phạt theo bảng quy định
   ↓
6. Lưu vào attendance record:
   - lateMinutes
   - lateFine
   ↓
7. Lưu match vào Firebase
   ↓
8. Hiển thị kết quả với thông tin phạt
   ↓
9. Dừng quét sau 3 giây
```

---

## 📊 Thống Kê & Báo Cáo

### **1. Tổng Phạt Theo Trận**
```javascript
const getTotalFines = (match) => {
    return match.attendance.reduce((total, att) => {
        return total + (att.lateFine || 0);
    }, 0);
};

// Ví dụ: getTotalFines(match) => 80000
```

### **2. Thống Kê Phạt Cá Nhân**
```javascript
const getMemberFineStats = (memberId) => {
    let totalFines = 0;
    let lateCount = 0;
    
    matches.value.forEach(match => {
        const att = match.attendance.find(a => a.memberId === memberId);
        if (att && att.lateFine > 0) {
            totalFines += att.lateFine;
            lateCount++;
        }
    });
    
    return { totalFines, lateCount };
};
```

### **3. Top Người Bị Phạt Nhiều Nhất**
```javascript
const topFined = computed(() => {
    return members.value.map(m => ({
        ...m,
        ...getMemberFineStats(m.id)
    })).sort((a, b) => b.totalFines - a.totalFines).slice(0, 5);
});
```

---

## 🎯 Tính Năng Tương Lai

### **1. Tự Động Tạo Transaction**
```javascript
// Sau khi điểm danh, tự động tạo giao dịch phạt
if (lateFine > 0) {
    addTransaction({
        type: 'income',
        amount: lateFine,
        description: `Phạt đi muộn ${lateMinutes} phút - ${memberName}`,
        date: new Date().toISOString().split('T')[0],
        category: 'fine',
        relatedMatchId: match.id,
        relatedMemberId: memberId
    });
}
```

### **2. Dashboard Thống Kê Phạt**
```
┌─────────────────────────────────┐
│ Thống Kê Phạt Đi Muộn          │
├─────────────────────────────────┤
│ Tổng tiền phạt: 500.000 ₫      │
│ Số lần bị phạt: 25              │
│ Trung bình/lần: 20.000 ₫       │
│                                 │
│ Top 5 Bị Phạt Nhiều Nhất:      │
│ 1. Nguyễn Văn A - 150.000 ₫    │
│ 2. Trần Văn B - 120.000 ₫      │
│ 3. Lê Văn C - 100.000 ₫        │
└─────────────────────────────────┘
```

### **3. Cảnh Báo Đi Muộn Thường Xuyên**
```javascript
// Cảnh báo nếu bị phạt > 3 lần trong tháng
if (lateCountThisMonth > 3) {
    showWarning(`Bạn đã đi muộn ${lateCountThisMonth} lần tháng này!`);
}
```

### **4. Giảm Phạt Cho Người Đúng Giờ**
```javascript
// Giảm 50% phạt nếu đúng giờ 5 trận liên tiếp
if (consecutiveOnTime >= 5) {
    lateFine = lateFine * 0.5;
    showNotification('🎉 Giảm 50% phạt vì đúng giờ 5 trận liên tiếp!');
}
```

---

## ⚙️ Tùy Chỉnh Mức Phạt

Để thay đổi mức phạt, sửa trong file `AttendanceView.vue`:

```javascript
// Tìm đoạn code này (khoảng dòng 170-180)
if (lateMinutes < 10) {
    lateFine = 10000;      // Thay đổi mức phạt < 10 phút
} else if (lateMinutes < 20) {
    lateFine = 20000;      // Thay đổi mức phạt 10-20 phút
} else {
    lateFine = 50000;      // Thay đổi mức phạt > 20 phút
}
```

### **Ví Dụ: Tăng Mức Phạt**
```javascript
if (lateMinutes < 10) {
    lateFine = 20000;      // Tăng từ 10k lên 20k
} else if (lateMinutes < 20) {
    lateFine = 50000;      // Tăng từ 20k lên 50k
} else {
    lateFine = 100000;     // Tăng từ 50k lên 100k
}
```

### **Ví Dụ: Thêm Mức Phạt Chi Tiết Hơn**
```javascript
if (lateMinutes < 5) {
    lateFine = 5000;       // Muộn < 5 phút
} else if (lateMinutes < 10) {
    lateFine = 10000;      // Muộn 5-10 phút
} else if (lateMinutes < 15) {
    lateFine = 20000;      // Muộn 10-15 phút
} else if (lateMinutes < 20) {
    lateFine = 30000;      // Muộn 15-20 phút
} else if (lateMinutes < 30) {
    lateFine = 50000;      // Muộn 20-30 phút
} else {
    lateFine = 100000;     // Muộn > 30 phút
}
```

---

## ⚠️ Lưu Ý Quan Trọng

### **1. Không Tự Động Thu Tiền**
- Hệ thống chỉ **ghi nhận** số tiền phạt
- **Không tự động** trừ tiền hoặc tạo transaction
- Admin cần **thu tiền thủ công** và ghi nhận

### **2. Chỉ Áp Dụng Khi Có Giờ Bắt Đầu**
- Trận đấu phải có `startTime` mới tính phạt
- Trận cũ không có giờ bắt đầu → không tính phạt

### **3. Dữ Liệu Cũ**
- Attendance records cũ không có `lateFine`
- Chỉ áp dụng cho điểm danh mới sau khi cập nhật

### **4. Múi Giờ**
- Phụ thuộc vào thời gian hệ thống thiết bị
- Đảm bảo thiết bị đặt đúng múi giờ

---

## 🐛 Troubleshooting

### **Vấn đề: Không hiển thị tiền phạt**
```
Nguyên nhân:
- Trận đấu không có giờ bắt đầu
- Điểm danh đúng giờ (không bị phạt)
- Điểm danh trước khi cập nhật tính năng

Giải pháp:
- Thêm giờ bắt đầu cho trận đấu
- Kiểm tra lại thời gian điểm danh
```

### **Vấn đề: Số tiền phạt sai**
```
Nguyên nhân:
- Logic tính phạt bị sửa đổi
- Thời gian hệ thống không chính xác

Giải pháp:
- Kiểm tra code trong AttendanceView.vue
- Đồng bộ thời gian thiết bị
```

---

## 📝 Changelog

### **Version 2.2 - 11/01/2026**
- ✅ Tính toán số phút muộn tự động
- ✅ Áp dụng mức phạt theo bảng quy định
- ✅ Lưu `lateMinutes` và `lateFine` vào attendance
- ✅ Hiển thị thông tin phạt khi quét QR
- ✅ Hiển thị tiền phạt trong danh sách trận đấu
- ✅ Tính tổng tiền phạt cho mỗi trận
- ✅ Hiển thị badge tổng phạt trên match card

---

**Cập nhật:** 11/01/2026  
**Phiên bản:** 2.2  
**Tác giả:** Antigravity AI
