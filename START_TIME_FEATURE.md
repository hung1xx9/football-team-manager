# ⏰ Tính Năng Giờ Bắt Đầu & Theo Dõi Đi Muộn

## 📋 Tổng Quan

Hệ thống đã được bổ sung tính năng **giờ bắt đầu trận đấu** để theo dõi thành viên **đi muộn** hay **đúng giờ** khi điểm danh.

---

## ✨ Tính Năng Mới

### 1. **Giờ Bắt Đầu Trận Đấu**
- Admin có thể thiết lập giờ bắt đầu cụ thể cho mỗi trận đấu
- Định dạng: HH:MM (ví dụ: 19:00, 14:30)
- Hiển thị trên danh sách trận đấu với icon 🕐

### 2. **Tự Động Tính Đi Muộn/Đúng Giờ**
- Khi thành viên quét QR để điểm danh, hệ thống tự động:
  - Lưu **timestamp** (thời gian điểm danh chính xác)
  - So sánh với **giờ bắt đầu** của trận đấu
  - Đánh dấu **đi muộn** (⏰) hoặc **đúng giờ** (✓)

### 3. **Hiển Thị Chi Tiết**
- Trong danh sách điểm danh của trận đấu:
  - Thời gian điểm danh (ngày/tháng, giờ:phút)
  - Trạng thái: **⏰ Muộn** (màu vàng) hoặc **✓ Đúng giờ** (màu xanh)

---

## 🔧 Cách Sử Dụng

### **Cho Admin**

#### 1. Tạo Trận Đấu Mới
```
1. Vào menu "Trận Đấu"
2. Click "Thêm Trận Đấu"
3. Điền thông tin:
   - Loại trận đấu
   - Ngày
   - ⭐ Giờ Bắt Đầu (mới!) - Ví dụ: 19:00
   - Đối thủ
   - Địa điểm
   - Danh sách điểm danh
4. Click "Lưu"
```

#### 2. Sửa Trận Đấu
```
1. Click "Sửa/Điểm danh" trên trận đấu
2. Cập nhật "Giờ Bắt Đầu" nếu cần
3. Click "Lưu"
```

#### 3. Xem Thông Tin Điểm Danh
```
Trong danh sách trận đấu, mỗi thành viên có mặt sẽ hiển thị:
- Tên thành viên
- Thời gian điểm danh: "11/01, 19:05"
- Trạng thái: "⏰ Muộn" (nếu sau 19:00) hoặc "✓ Đúng giờ" (nếu trước/đúng 19:00)
```

### **Cho Thành Viên (Guest)**

#### Quét QR Điểm Danh
```
1. Vào menu "Điểm Danh"
2. Click "Bắt Đầu Quét QR"
3. Quét mã QR của trận đấu
4. Hệ thống sẽ hiển thị:
   - "✅ Điểm danh thành công! (Đúng giờ)" - nếu đến đúng giờ
   - "✅ Điểm danh thành công! (Đi muộn)" - nếu đến muộn
```

---

## 📊 Cấu Trúc Dữ Liệu

### **Match Object (Trận Đấu)**
```javascript
{
    id: 1736611200000,
    date: "2026-01-11",
    startTime: "19:00",  // ⭐ MỚI
    matchType: "friendly",
    opponent: "Đội ABC",
    location: "Sân Thống Nhất",
    attendance: [
        {
            memberId: 5,
            status: "present",
            timestamp: "2026-01-11T12:05:30.000Z",  // ⭐ MỚI
            isLate: true  // ⭐ MỚI
        },
        {
            memberId: 7,
            status: "present",
            timestamp: "2026-01-11T11:55:00.000Z",  // ⭐ MỚI
            isLate: false  // ⭐ MỚI
        }
    ]
}
```

### **Attendance Object (Điểm Danh)**
```javascript
{
    memberId: 5,           // ID thành viên
    status: "present",     // Trạng thái: present/absent
    timestamp: "2026-01-11T12:05:30.000Z",  // Thời gian điểm danh (ISO format)
    isLate: true          // true = đi muộn, false = đúng giờ
}
```

---

## 🔄 Logic Tính Đi Muộn

### **Công Thức**
```javascript
// 1. Lấy giờ bắt đầu từ trận đấu
const [hours, minutes] = match.startTime.split(':').map(Number);

// 2. Tạo DateTime cho giờ bắt đầu
const matchStartDateTime = new Date(match.date);
matchStartDateTime.setHours(hours, minutes, 0, 0);

// 3. Lấy thời gian điểm danh hiện tại
const attendanceTimestamp = new Date();

// 4. So sánh
const isLate = attendanceTimestamp > matchStartDateTime;
```

### **Ví Dụ**
```
Trận đấu:
- Ngày: 11/01/2026
- Giờ bắt đầu: 19:00

Thành viên A quét QR lúc 18:55 → ✓ Đúng giờ (isLate = false)
Thành viên B quét QR lúc 19:05 → ⏰ Muộn (isLate = true)
Thành viên C quét QR lúc 19:00 → ✓ Đúng giờ (isLate = false)
```

---

## 🎨 Giao Diện

### **1. Form Tạo/Sửa Trận Đấu**
```
┌─────────────────────────────────┐
│ Thêm Trận Đấu                   │
├─────────────────────────────────┤
│ Loại Trận Đấu: [Đấu tập ▼]     │
│ Ngày: [11/01/2026]              │
│ Giờ Bắt Đầu: [19:00] ⭐ MỚI    │
│ Đối Thủ: [Đội ABC]              │
│ Địa Điểm: [Sân Thống Nhất]      │
│ Điểm Danh: [☑ Member A]         │
│            [☐ Member B]         │
│            [☑ Member C]         │
│                                 │
│           [Lưu]                 │
└─────────────────────────────────┘
```

### **2. Danh Sách Trận Đấu**
```
┌─────────────────────────────────────────────┐
│ Trận Đấu tập 11/01/2026                     │
│ 🕐 19:00 ⭐ MỚI                             │
│ [Đấu tập] Đội ABC                           │
│ Sân Thống Nhất                              │
│                                             │
│ Điểm danh:                                  │
│ ✓ Member A                                  │
│   11/01, 18:55 ✓ Đúng giờ ⭐ MỚI           │
│                                             │
│ ✓ Member B                                  │
│   11/01, 19:05 ⏰ Muộn ⭐ MỚI              │
│                                             │
│ ✗ Member C                                  │
└─────────────────────────────────────────────┘
```

### **3. Kết Quả Quét QR**
```
┌─────────────────────────────────┐
│        ✅                        │
│ Điểm danh thành công!           │
│ (Đúng giờ) ⭐ MỚI              │
│                                 │
│ Đội ABC - 11/01/2026            │
└─────────────────────────────────┘

hoặc

┌─────────────────────────────────┐
│        ✅                        │
│ Điểm danh thành công!           │
│ (Đi muộn) ⭐ MỚI               │
│                                 │
│ Đội ABC - 11/01/2026            │
└─────────────────────────────────┘
```

---

## 📈 Ứng Dụng Thực Tế

### **1. Quản Lý Kỷ Luật**
- Theo dõi thành viên thường xuyên đi muộn
- Áp dụng chính sách phạt nếu cần
- Tạo báo cáo thống kê đi muộn

### **2. Lập Kế Hoạch**
- Xác định giờ bắt đầu phù hợp
- Điều chỉnh lịch tập dựa trên thói quen của đội

### **3. Động Viên**
- Khen thưởng thành viên luôn đúng giờ
- Tạo văn hóa đúng giờ trong đội

---

## 🔮 Tính Năng Tương Lai (Có Thể Mở Rộng)

### **1. Thống Kê Đi Muộn**
```javascript
// Thêm vào Dashboard
const lateStats = computed(() => {
    let totalPresent = 0;
    let totalLate = 0;
    
    matches.value.forEach(match => {
        match.attendance.forEach(att => {
            if (att.status === 'present') {
                totalPresent++;
                if (att.isLate) totalLate++;
            }
        });
    });
    
    return {
        totalPresent,
        totalLate,
        lateRate: totalPresent > 0 
            ? Math.round((totalLate / totalPresent) * 100) 
            : 0
    };
});
```

### **2. Báo Cáo Cá Nhân**
```javascript
// Thống kê đi muộn của từng thành viên
const getMemberLateStats = (memberId) => {
    let attended = 0;
    let late = 0;
    
    matches.value.forEach(match => {
        const att = match.attendance.find(a => a.memberId === memberId);
        if (att && att.status === 'present') {
            attended++;
            if (att.isLate) late++;
        }
    });
    
    return {
        attended,
        late,
        lateRate: attended > 0 ? Math.round((late / attended) * 100) : 0
    };
};
```

### **3. Thông Báo Tự Động**
- Nhắc nhở trước giờ bắt đầu 30 phút
- Cảnh báo nếu thành viên có xu hướng đi muộn

### **4. Phạt Tự Động**
- Tự động tính phạt cho người đi muộn
- Tích hợp với module Finance

---

## ⚠️ Lưu Ý

### **1. Múi Giờ**
- Hệ thống sử dụng múi giờ của thiết bị
- Đảm bảo thiết bị đặt đúng múi giờ Việt Nam (GMT+7)

### **2. Trận Đấu Cũ**
- Trận đấu tạo trước khi có tính năng này sẽ không có `startTime`
- Không tính đi muộn/đúng giờ cho các trận này
- Có thể sửa trận cũ để thêm giờ bắt đầu

### **3. Dữ Liệu Cũ**
- Attendance records cũ không có `timestamp` và `isLate`
- Chỉ áp dụng cho điểm danh mới sau khi cập nhật

### **4. Độ Chính Xác**
- Phụ thuộc vào thời gian hệ thống của thiết bị
- Nên đồng bộ thời gian thiết bị với internet

---

## 🐛 Troubleshooting

### **Vấn đề: Không hiển thị trạng thái đi muộn**
```
Nguyên nhân:
- Trận đấu không có giờ bắt đầu
- Điểm danh trước khi cập nhật tính năng

Giải pháp:
- Thêm giờ bắt đầu cho trận đấu
- Chỉ áp dụng cho điểm danh mới
```

### **Vấn đề: Thời gian hiển thị sai**
```
Nguyên nhân:
- Múi giờ thiết bị không đúng
- Thời gian hệ thống không chính xác

Giải pháp:
- Kiểm tra cài đặt múi giờ
- Đồng bộ thời gian với internet
```

---

## 📝 Changelog

### **Version 2.1 - 11/01/2026**
- ✅ Thêm trường `startTime` cho Match
- ✅ Lưu `timestamp` khi điểm danh
- ✅ Tính toán `isLate` tự động
- ✅ Hiển thị trạng thái đi muộn/đúng giờ trong UI
- ✅ Cập nhật form tạo/sửa trận đấu
- ✅ Cập nhật màn hình điểm danh QR

---

**Cập nhật:** 11/01/2026  
**Phiên bản:** 2.1  
**Tác giả:** Antigravity AI
