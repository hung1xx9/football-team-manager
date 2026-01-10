# 🔐 Hệ Thống Phân Quyền

## Tổng Quan

Ứng dụng sử dụng hệ thống phân quyền dựa trên **Role-Based Access Control (RBAC)** với 2 vai trò chính:

## 👥 Các Vai Trò

### 1. **Admin** (Quản Trị Viên)
- **Quyền hạn**: Toàn quyền quản lý
- **Mục đích**: Dành cho người quản lý đội bóng

#### Quyền truy cập:
- ✅ Xem Dashboard
- ✅ Quản lý Thành Viên (Thêm/Sửa/Xóa)
- ✅ Quản lý Trận Đấu (Thêm/Sửa/Xóa)
- ✅ Quản lý Tài Chính (Thêm/Xóa giao dịch)
- ✅ Đồng bộ Firebase
- ✅ Xuất dữ liệu

### 2. **Guest** (Khách)
- **Quyền hạn**: Chỉ xem và tương tác hạn chế
- **Mục đích**: Dành cho thành viên đội

#### Quyền truy cập:
- ✅ Xem Dashboard (chỉ đọc)
- ✅ Xem Trận Đấu
- ✅ Điểm danh cho bản thân
- ❌ Không thể thêm/sửa/xóa thành viên
- ❌ Không thể thêm/xóa trận đấu
- ❌ Không thể xem tài chính chi tiết
- ❌ Không thể quản lý Firebase

## 📋 Chi Tiết Quyền

### Permissions Object

```javascript
{
    canViewDashboard: boolean,
    canViewMembers: boolean,
    canViewMatches: boolean,
    canViewFinance: boolean,
    canAddMember: boolean,
    canEditMember: boolean,
    canDeleteMember: boolean,
    canAddMatch: boolean,
    canEditMatch: boolean,
    canDeleteMatch: boolean,
    canAddTransaction: boolean,
    canDeleteTransaction: boolean,
    canManageFirebase: boolean,
    canExportData: boolean
}
```

## 🔧 Sử Dụng trong Code

### Import composable:
```javascript
import { useAuth } from '@/composables/useAuth';

const { isAdmin, isGuest, permissions, checkPermission } = useAuth();
```

### Kiểm tra quyền trong template:
```vue
<button v-if="isAdmin" @click="deleteItem">Xóa</button>
<button v-if="permissions.canEditMatch" @click="editMatch">Sửa</button>
<button v-if="checkPermission('canAddMember')" @click="addMember">Thêm</button>
```

### Kiểm tra quyền trong script:
```javascript
if (isAdmin.value) {
    // Admin logic
}

if (checkPermission('canDeleteMatch')) {
    // Delete match
}
```

## 🔒 Bảo Mật

### Lưu trữ:
- Role được lưu trong `localStorage` với key `user_role`
- Guest member ID được lưu trong `localStorage` với key `guest_member_id`

### Lưu ý:
- ⚠️ Đây là phân quyền **frontend-only**
- ⚠️ Không thay thế cho authentication/authorization backend
- ⚠️ Dữ liệu vẫn có thể bị truy cập qua DevTools
- ✅ Phù hợp cho ứng dụng nội bộ, tin tưởng người dùng

## 🎯 Mở Rộng

### Thêm vai trò mới:
1. Thêm vào `ROLES` constant trong `useAuth.js`
2. Định nghĩa permissions trong computed `permissions`
3. Cập nhật UI để hiển thị role mới

### Thêm permission mới:
1. Thêm vào permissions object
2. Set giá trị cho từng role
3. Sử dụng `checkPermission('newPermission')` trong code

## 📝 Ví Dụ Thực Tế

### Ẩn/hiện nút dựa trên quyền:
```vue
<div class="page-actions">
    <button 
        v-if="permissions.canAddMatch" 
        class="btn btn-primary" 
        @click="openMatchModal()">
        Thêm Trận Đấu
    </button>
</div>
```

### Disable input cho Guest:
```vue
<input 
    type="text" 
    v-model="matchForm.opponent" 
    :disabled="!isAdmin">
```

### Conditional rendering:
```vue
<template v-if="isAdmin">
    <button @click="deleteMatch">Xóa</button>
</template>
<template v-else>
    <span class="text-muted">Chỉ xem</span>
</template>
```

---

**Lưu ý**: Hệ thống này được thiết kế cho môi trường tin tưởng (trusted environment). Nếu cần bảo mật cao hơn, nên implement authentication/authorization ở backend.
