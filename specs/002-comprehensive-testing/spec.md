# Feature Specification: Comprehensive Testing Suite

**Feature Branch**: `002-comprehensive-testing`
**Created**: 2026-04-07
**Status**: Draft
**Input**: User description: "Tạo bộ test trên toàn bộ phần mềm Football Team Manager"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Xác thực & Phân quyền (Priority: P1)

Một quản trị viên đăng nhập vào hệ thống, được phân quyền đúng vai trò (admin/member), và chỉ truy cập được các chức năng phù hợp. Thành viên thường không thể truy cập trang quản trị.

**Why this priority**: Xác thực là nền tảng bảo mật của toàn bộ ứng dụng. Mọi chức năng khác đều phụ thuộc vào việc này hoạt động đúng.

**Independent Test**: Có thể kiểm tra độc lập bằng cách thử đăng nhập với các vai trò khác nhau và xác minh quyền truy cập.

**Acceptance Scenarios**:

1. **Given** người dùng chưa đăng nhập, **When** truy cập trang Dashboard, **Then** bị chuyển hướng tới trang đăng nhập
2. **Given** người dùng là thành viên thường, **When** truy cập trang Settings (admin-only), **Then** bị từ chối truy cập
3. **Given** người dùng là admin, **When** đăng nhập thành công, **Then** hiển thị đầy đủ menu quản trị

---

### User Story 2 - Điểm danh trận đấu (Priority: P1)

Quản trị viên tạo trận đấu mới, thành viên điểm danh (qua QR hoặc thủ công), admin duyệt điểm danh và hệ thống cập nhật bảng thống kê.

**Why this priority**: Điểm danh là chức năng cốt lõi của ứng dụng quản lý đội bóng.

**Independent Test**: Tạo trận → Điểm danh → Duyệt → Kiểm tra bảng thống kê.

**Acceptance Scenarios**:

1. **Given** admin đã tạo trận đấu, **When** thành viên quét QR, **Then** điểm danh được ghi nhận ở trạng thái "chờ duyệt"
2. **Given** có điểm danh chờ duyệt, **When** admin nhấn "Approve", **Then** điểm danh được xác nhận và cập nhật bảng thống kê
3. **Given** có nhiều điểm danh chờ, **When** admin nhấn "Approve All", **Then** tất cả được duyệt cùng lúc

---

### User Story 3 - Quản lý tài chính (Priority: P1)

Hệ thống theo dõi thu/chi quỹ đội, hiển thị số dư hiện tại, lịch sử giao dịch, và phân bậc đóng góp cho từng thành viên.

**Why this priority**: Tài chính là yếu tố nhạy cảm, cần đảm bảo tính chính xác tuyệt đối.

**Independent Test**: Tạo giao dịch thu/chi → Kiểm tra số dư → Xác minh lịch sử.

**Acceptance Scenarios**:

1. **Given** quỹ đội có số dư X, **When** admin tạo giao dịch thu Y, **Then** số dư mới = X + Y
2. **Given** có giao dịch chờ duyệt, **When** admin phê duyệt, **Then** giao dịch cập nhật vào sổ chính
3. **Given** thành viên xem trang "My Payments", **When** trang tải xong, **Then** hiển thị đúng lịch sử đóng góp cá nhân

---

### User Story 4 - Quản lý nghỉ phép (Priority: P2)

Thành viên gửi yêu cầu nghỉ phép cho trận đấu cụ thể, admin duyệt hoặc từ chối, hệ thống cập nhật trạng thái.

**Why this priority**: Nghỉ phép ảnh hưởng đến kế hoạch đội hình và phạt vắng mặt.

**Independent Test**: Gửi đơn nghỉ → Admin duyệt/từ chối → Kiểm tra trạng thái.

**Acceptance Scenarios**:

1. **Given** thành viên đã đăng nhập, **When** gửi yêu cầu nghỉ phép với lý do, **Then** đơn xuất hiện trong danh sách chờ duyệt
2. **Given** admin xem danh sách nghỉ phép, **When** phê duyệt đơn, **Then** trạng thái chuyển thành "Đã duyệt"

---

### User Story 5 - Dashboard & Thống kê (Priority: P2)

Dashboard hiển thị tổng quan: số thành viên, trận đấu gần nhất, tài chính, top điểm danh.

**Why this priority**: Dashboard là trang chính người dùng thấy đầu tiên.

**Independent Test**: Tải Dashboard → Xác minh các widget hiển thị dữ liệu chính xác.

**Acceptance Scenarios**:

1. **Given** có dữ liệu trong hệ thống, **When** truy cập Dashboard, **Then** hiển thị đúng số liệu tổng quan
2. **Given** hệ thống không có dữ liệu, **When** truy cập Dashboard, **Then** hiển thị trạng thái trống phù hợp

---

### User Story 6 - Quản lý thành viên (Priority: P2)

Admin thêm, sửa, xóa thông tin thành viên. Hệ thống hiển thị danh sách với bộ lọc.

**Why this priority**: Quản lý thành viên là nền tảng cho điểm danh và tài chính.

**Independent Test**: Thêm thành viên → Sửa thông tin → Xác minh danh sách.

**Acceptance Scenarios**:

1. **Given** admin ở trang Members, **When** thêm thành viên mới, **Then** thành viên xuất hiện trong danh sách
2. **Given** có thành viên trong hệ thống, **When** admin sửa thông tin, **Then** thông tin được cập nhật

---

### Edge Cases

- Điều gì xảy ra khi mất kết nối mạng giữa lúc điểm danh?
- Hệ thống xử lý thế nào khi admin cố duyệt một giao dịch đã bị xóa?
- Điều gì xảy ra khi hai admin cùng duyệt một điểm danh cùng lúc?
- Hệ thống hiển thị gì khi danh sách trận đấu hoặc thành viên trống?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Hệ thống PHẢI kiểm tra đúng quyền truy cập cho từng vai trò (admin/member)
- **FR-002**: Hệ thống PHẢI tính toán chính xác số dư quỹ sau mỗi giao dịch
- **FR-003**: Hệ thống PHẢI ghi nhận điểm danh với đúng trạng thái (pending/approved)
- **FR-004**: Hệ thống PHẢI hiển thị thông báo lỗi rõ ràng khi thao tác thất bại
- **FR-005**: Hệ thống PHẢI cho phép hoạt động offline cơ bản (PWA)
- **FR-006**: Hệ thống PHẢI hiển thị dữ liệu Dashboard chính xác và nhất quán
- **FR-007**: Hệ thống PHẢI xử lý đúng luồng nghỉ phép (gửi → duyệt/từ chối)

### Key Entities

- **Member**: Thành viên đội bóng (tên, vai trò, trạng thái hoạt động)
- **Match**: Trận đấu (ngày, địa điểm, trạng thái)
- **Attendance**: Bản ghi điểm danh (thành viên, trận, trạng thái duyệt)
- **Transaction**: Giao dịch tài chính (loại thu/chi, số tiền, người tạo, trạng thái)
- **LeaveRequest**: Yêu cầu nghỉ phép (thành viên, trận, lý do, trạng thái)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% các chức năng cốt lõi (đăng nhập, điểm danh, tài chính) có test tự động
- **SC-002**: Tất cả các kịch bản acceptance ở trên đều pass
- **SC-003**: Bộ test chạy hoàn thành trong dưới 5 phút
- **SC-004**: Không có regression - các chức năng hiện tại tiếp tục hoạt động đúng sau thay đổi

## Assumptions

- Dự án sử dụng Vue 3 Composition API, Vite làm build tool
- Firebase Firestore là database chính, Firebase Auth cho xác thực
- Ứng dụng đã có đầy đủ chức năng, chỉ cần thêm bộ test
- Test sẽ sử dụng mock/emulator cho Firebase thay vì database thật
- Bộ test tập trung vào unit test cho composables và component test cho views
