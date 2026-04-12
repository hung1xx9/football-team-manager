# Feature Specification: Football Team Manager — Toàn Bộ Hệ Thống

**Feature Branch**: `003-full-system-spec`  
**Created**: 2026-04-12  
**Status**: Draft  
**Input**: Rà soát và tạo lại specification cho toàn bộ phần mềm Football Team Manager  
**Methodology**: Phân tích trực tiếp từ source code hiện tại (không dựa vào document cũ)

---

## Tổng Quan Hệ Thống

Ứng dụng quản lý đội bóng đá (Tinh Hoa FC) dạng Progressive Web App (PWA). Hệ thống hỗ trợ quản lý toàn diện hoạt động đội bóng bao gồm: thành viên, trận đấu, điểm danh, tài chính, xin nghỉ phép, và đồng bộ dữ liệu realtime qua Firebase.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Đăng Nhập & Phân Quyền (Priority: P1)

Hệ thống cung cấp 3 vai trò truy cập: **Quản Trị Viên (Admin)**, **Kế Toán (Accountant)**, và **Thành Viên (Guest)**. Mỗi vai trò có bộ quyền riêng biệt, quyết định những chức năng nào được phép sử dụng.

- **Admin**: Đăng nhập bằng username `admin` + mật khẩu (bcrypt hash). Có toàn quyền: quản lý thành viên, trận đấu, tài chính, Firebase, cài đặt hệ thống, duyệt điểm danh, quản lý đơn nghỉ phép.
- **Kế Toán**: Đăng nhập bằng username `ketoan` + mật khẩu (bcrypt hash). Quyền tương tự Admin nhưng **không** được: xóa thành viên, xóa trận, quản lý Firebase, quản lý QR Code.
- **Thành Viên (Guest)**: Chọn tên mình từ danh sách. Chỉ được: xem Dashboard (readonly), xem bảng điểm danh, gửi đơn xin nghỉ, đóng quỹ/phạt cá nhân, xem lịch sử thanh toán.

Session có thời hạn 6 giờ, sau đó tự động đăng xuất. Hệ thống kiểm tra hết hạn mỗi 60 giây.

**Why this priority**: Xác thực và phân quyền là nền tảng của mọi thao tác trong hệ thống. Không thể sử dụng bất kỳ chức năng nào nếu chưa đăng nhập.

**Independent Test**: Có thể kiểm tra bằng cách đăng nhập với từng vai trò và xác minh các quyền tương ứng.

**Acceptance Scenarios**:

1. **Given** người dùng ở màn hình đăng nhập, **When** chọn vai trò Admin và nhập đúng mật khẩu, **Then** đăng nhập thành công, sidebar hiển thị đầy đủ menu, tự động kết nối Firebase và tải dữ liệu mới nhất.
2. **Given** Admin đã đăng nhập, **When** 6 giờ trôi qua, **Then** session hết hạn, trang tự động reload về màn hình đăng nhập.
3. **Given** người dùng chọn vai trò Guest, **When** tìm và chọn tên thành viên, **Then** đăng nhập thành công, chỉ thấy menu: Dashboard, Bảng Điểm Danh, Xin Nghỉ, Đóng Quỹ/Phạt.
4. **Given** Kế Toán đã đăng nhập, **When** thử truy cập xóa thành viên, **Then** nút xóa không hiển thị (quyền `canDeleteMember: false`).
5. **Given** mật khẩu nhập sai, **When** nhấn đăng nhập, **Then** hiển thị lỗi "Mật khẩu không đúng", không chuyển trang.

---

### User Story 2 — Quản Lý Thành Viên (Priority: P1)

Admin và Kế Toán quản lý danh sách thành viên đội bóng. Mỗi thành viên có: tên, số quỹ đã đóng (fundPaid), số tiền phạt đã nộp (fines), hạng đóng góp (contributionTierId), loại thanh toán (paymentType: monthly hoặc per-match), và phí mỗi trận (perMatchFee).

**Why this priority**: Thành viên là thực thể trung tâm, liên kết với điểm danh, tài chính, xin nghỉ.

**Independent Test**: Thêm/sửa/xóa thành viên, kiểm tra dữ liệu persist qua localStorage và sync Firebase.

**Acceptance Scenarios**:

1. **Given** Admin ở trang Thành Viên, **When** thêm thành viên mới, **Then** thành viên xuất hiện trong danh sách, tự động gán ID = `Date.now()`, đồng bộ Firebase (nếu đã đăng nhập).
2. **Given** thành viên đã tồn tại, **When** Admin sửa thông tin, **Then** dữ liệu cập nhật ngay lập tức, sync lên Firebase granular (chỉ upload item đó, không bulk).
3. **Given** Admin xóa thành viên, **When** xác nhận xóa, **Then** thành viên bị loại khỏi danh sách, xóa trên Firebase.
4. **Given** hệ thống mới (chưa có dữ liệu), **When** lần đầu tải, **Then** tự động seed 5 thành viên mẫu.

---

### User Story 3 — Quản Lý Trận Đấu (Priority: P1)

Admin/Kế Toán quản lý lịch trận đấu. Mỗi trận có: ngày, giờ bắt đầu, đối thủ, địa điểm, loại trận (friendly/competitive), danh sách điểm danh (attendance), và trạng thái chốt (finalized).

**Why this priority**: Trận đấu là sự kiện chính mà mọi hoạt động xoay quanh (điểm danh, phạt, thu phí).

**Independent Test**: Tạo/sửa/xóa trận đấu, kiểm tra logic attendance và finalization.

**Acceptance Scenarios**:

1. **Given** Admin tạo trận đấu mới, **When** điền thông tin và chọn thành viên tham gia, **Then** trận đấu lưu với attendance array, mỗi phần tử chứa `{ memberId, status: 'present'/'absent' }`.
2. **Given** trận đấu đã tạo, **When** Admin sửa điểm danh thủ công (preserveAttendanceData), **Then** giữ nguyên metadata gốc (timestamp, method) cho thành viên đã điểm danh trước đó, chỉ cập nhật thành viên mới.
3. **Given** Admin xóa trận đấu, **When** xác nhận, **Then** trận bị xóa, các receivables liên kết (matchId) cũng bị xóa theo.
4. **Given** trận đấu mới được tạo VÀ Messenger Webhook đã cấu hình, **When** lưu trận mới (không phải edit), **Then** tự động gửi thông báo qua Webhook kèm thông tin trận.
5. **Given** trận đã tạo, **When** Admin chốt trận (finalizeMatch), **Then** tạo receivables cho mỗi khoản phạt (vắng/muộn), ghi trạng thái `finalized: true`.

---

### User Story 4 — Hệ Thống Điểm Danh (Priority: P1)

Thành viên có thể gửi yêu cầu điểm danh thủ công (pendingAttendances) cho trận đấu. Admin/Kế Toán duyệt hoặc từ chối yêu cầu. Khi duyệt, attendance của trận đấu tương ứng được cập nhật.

**Lưu ý thực tế**: Tính năng QR Code scanning đã bị xóa khỏi codebase. Hiện tại chỉ còn điểm danh thủ công (manual attendance).

**Why this priority**: Điểm danh xác định ai có mặt, từ đó tính phạt và phí. 

**Independent Test**: Guest gửi yêu cầu điểm danh → Admin duyệt → xác minh attendance update.

**Acceptance Scenarios**:

1. **Given** Thành Viên truy cập trang PendingAttendances, **When** gửi yêu cầu điểm danh cho trận cụ thể, **Then** request lưu vào pendingAttendances array, hiển thị trạng thái "Chờ duyệt".
2. **Given** Admin mở trang PendingAttendances, **When** nhấn "Duyệt" yêu cầu, **Then** nếu Firebase configured sử dụng atomic transaction (approveAttendanceAtomic): cập nhật attendance trong match document + xóa pending request trong cùng 1 transaction.
3. **Given** Admin duyệt yêu cầu thành công, **When** kiểm tra trận đấu, **Then** thành viên đó có status 'present', method 'manual_approved'.
4. **Given** Admin duyệt tất cả (Approve All), **When** nhấn nút, **Then** tất cả pending requests được xử lý tuần tự.

---

### User Story 5 — Bảng Điểm Danh Tổng Hợp (Priority: P2)

Admin/Kế Toán xem bảng tổng hợp điểm danh tất cả trận đấu (AttendanceTableView). Bảng hiển thị ma trận: hàng = thành viên, cột = trận đấu, ô = trạng thái điểm danh (có mặt/vắng/muộn/có phép nghỉ).

**Why this priority**: Cung cấp cái nhìn toàn cảnh về mức độ tham gia của từng thành viên.

**Independent Test**: Mở trang AttendanceTable, xác minh bảng hiển thị đúng dữ liệu từ tất cả trận.

**Acceptance Scenarios**:

1. **Given** có nhiều trận đấu với dữ liệu điểm danh, **When** mở bảng điểm danh, **Then** hiển thị ma trận thành viên × trận đấu với status rõ ràng.
2. **Given** thành viên có đơn nghỉ phép được duyệt (hasApprovedLeave), **When** hiển thị ô điểm danh, **Then** đánh dấu đặc biệt (khác với vắng không phép).

---

### User Story 6 — Quản Lý Tài Chính (Priority: P1)

Hệ thống tài chính gồm nhiều tầng:

1. **Giao dịch (transactions)**: Thu (income) / Chi (expense) với category: fund, monthly_fund, fine, pitch_fee, v.v.
2. **Giao dịch chờ duyệt (pendingTransactions)**: Thành viên tự gửi yêu cầu đóng quỹ/phạt → Admin/Kế Toán duyệt. Duyệt sử dụng atomic Firestore transaction (approvePendingTransactionAtomic).
3. **Hóa đơn / Khoản phải thu (receivables)**: Hệ thống sổ nợ hiện đại. Mỗi khoản có type (monthly_fund, fine, pitch_fee, legacy_debt), status (unpaid/paid), liên kết thành viên.
4. **Tự động tạo nợ hàng tháng (checkAndCreateMonthlyDebts)**: Mỗi tháng, tự động tạo receivable "Quỹ tháng" cho mỗi thành viên dựa trên contribution tier của họ.
5. **Smart Debt Clearing**: Khi ghi nhận thu từ thành viên, hệ thống tự động xác định các khoản nợ chưa thanh toán (ưu tiên phạt trước → quỹ tháng cũ nhất) và đánh dấu paid.
6. **Migration**: Chuyển đổi dữ liệu nợ cũ (legacy) sang hệ thống receivables mới.

**Why this priority**: Tài chính là xương sống quản lý đội bóng — quỹ, phạt, phí sân.

**Independent Test**: Tạo giao dịch, kiểm tra smart allocation, kiểm tra auto monthly debt.

**Acceptance Scenarios**:

1. **Given** Admin thêm giao dịch thu từ thành viên X, **When** lưu giao dịch, **Then** tự động cập nhật fundPaid/fines của thành viên, tự động xóa nợ unpaid receivables (ưu tiên phạt trước), sync Firebase.
2. **Given** Guest gửi yêu cầu đóng quỹ, **When** Admin duyệt (approvePendingTransactionAtomic), **Then** trong 1 Firestore transaction: tạo income transaction + cập nhật member balance + xóa pending record.
3. **Given** đầu tháng mới, **When** app load (loadData hoặc updateFromFirebase), **Then** checkAndCreateMonthlyDebts tự tạo receivable "Quỹ tháng X/Y" cho mỗi thành viên có contribution tier > 0. Bỏ qua thành viên paymentType = 'per-match'.
4. **Given** Admin reject pending transaction, **When** nhấn từ chối + nhập lý do, **Then** status chuyển 'rejected', lưu reason + rejectedAt.

---

### User Story 7 — Hạng Đóng Góp (Contribution Tiers) (Priority: P2)

Admin quản lý các hạng đóng góp (tiers) với tên, phí hàng tháng, icon, màu sắc. Seed mặc định: Học Sinh (30K), Sinh Viên (50K), Đi Làm (100K). Mỗi thành viên được gán 1 tier → xác định số tiền quỹ hàng tháng.

**Why this priority**: Quyết định cách tính nợ quỹ monthly cho từng thành viên.

**Independent Test**: Thêm/sửa/xóa tier, gán tier cho thành viên, kiểm tra auto debt creation.

**Acceptance Scenarios**:

1. **Given** Admin tạo tier mới "VIP" 200K, **When** gán cho thành viên, **Then** tháng sau receivable monthly_fund = 200K.
2. **Given** tier đã có thành viên sử dụng, **When** Admin xóa tier, **Then** tier bị xóa, thành viên mất liên kết (contributionTierId orphaned).

---

### User Story 8 — Hệ Thống Phạt (Penalties) (Priority: P2)

Hệ thống tính phạt tự động dựa trên trạng thái điểm danh:

- **Vắng không phép**: Mặc định 50,000 VNĐ (configurable)
- **Muộn < 10 phút**: 10,000 VNĐ
- **Muộn < 20 phút**: 20,000 VNĐ
- **Muộn > 20 phút**: 50,000 VNĐ

Mức phạt configurable qua Settings. Khi finalizeMatch, hệ thống tạo receivables cho tất cả khoản phạt.

**Why this priority**: Cơ chế kỷ luật tài chính giúp đảm bảo thành viên có mặt đúng giờ.

**Independent Test**: Tạo trận với người vắng/muộn, finalize, kiểm tra receivables.

**Acceptance Scenarios**:

1. **Given** trận đấu có thành viên muộn 15 phút, **When** finalize, **Then** tạo receivable type='fine', amount=20000 (mức phạt < 20 phút).
2. **Given** Admin thay đổi mức phạt vắng thành 100K, **When** lưu Settings, **Then** penalties mới áp dụng cho trận sau.

---

### User Story 9 — Xin Nghỉ / Đến Muộn (Priority: P2)

Thành viên gửi đơn xin nghỉ hoặc thông báo đến muộn cho trận đấu sắp tới. Admin/Kế Toán duyệt (approved) hoặc từ chối (rejected). Đơn có trạng thái: pending → approved/rejected.

**Why this priority**: Cho phép thành viên thông báo trước, giúp Admin quản lý nhân sự trận đấu.

**Independent Test**: Guest gửi đơn, Admin duyệt/từ chối, kiểm tra hasApprovedLeave.

**Acceptance Scenarios**:

1. **Given** Guest có guestMemberId, **When** gửi đơn xin nghỉ cho trận cụ thể, **Then** request lưu vào leaveRequests với status='pending'.
2. **Given** Admin duyệt đơn, **When** xem bảng điểm danh, **Then** thành viên đó với ngày tương ứng hiển thị "Có phép" thay vì "Vắng".
3. **Given** Admin mở LeaveManagement, **When** filter theo status/member/date, **Then** danh sách cập nhật chính xác.

---

### User Story 10 — Thanh Toán Cá Nhân & MoMo (Priority: P2)

**MyPaymentsView**: Guest xem công nợ cá nhân và tự gửi yêu cầu đóng quỹ/phạt. Tích hợp MoMo: 
- **MoMo Personal**: Tạo link/QR chuyển tiền cá nhân qua số điện thoại (cấu hình trong Settings).
- **MoMo Business API** (optional): Tạo payment QR tự động qua API MoMo. Hỗ trợ fallback: Firebase Function → Client-side call.
- **Webhook xử lý**: Cloud Function `momoWebhook` nhận IPN từ MoMo, verify signature, tạo transaction tự động.

**Why this priority**: Cho phép thành viên tự đóng quỹ/phạt mà không cần Admin thao tác thủ công.

**Independent Test**: Guest tạo payment request, kiểm tra pending transaction, Admin duyệt.

**Acceptance Scenarios**:

1. **Given** Guest ở MyPayments, **When** chọn "Đóng quỹ" + nhập số tiền, **Then** tạo pendingTransaction type='income'.
2. **Given** MoMo link đã cấu hình, **When** Guest thanh toán qua MoMo, **Then** hiển thị QR code/deeplink.
3. **Given** MoMo Webhook nhận IPN thành công, **When** errorCode=0, **Then** tự động tạo transaction trong Firestore + check idempotency (requestId unique).

---

### User Story 11 — Dashboard Tổng Quan (Priority: P2)

Dashboard hiển thị thống kê: tổng thành viên, tổng trận, tỷ lệ điểm danh trung bình, số dư quỹ (income - expense), tổng receivables chưa thanh toán, trận đấu gần đây (sorted by date desc), top cầu thủ tích cực nhất.

**Why this priority**: Cung cấp cái nhìn nhanh về tình hình đội bóng.

**Independent Test**: Kiểm tra stats computed từ dữ liệu thực → đúng tổng thu, chi, tỷ lệ.

**Acceptance Scenarios**:

1. **Given** có 10 trận, 20 thành viên, **When** mở Dashboard, **Then** hiển thị attendanceRate chính xác = (tổng lượt present / (tổng trận × tổng thành viên)) × 100.
2. **Given** có giao dịch thu 5M, chi 2M, **When** xem Dashboard, **Then** balance = 3M.

---

### User Story 12 — Hall of Fame (Priority: P3)

Trang vinh danh hiển thị bảng xếp hạng thành viên theo tiêu chí: tỷ lệ tham gia, số trận đã tham gia, v.v.

**Why this priority**: Tính năng gamification, tạo động lực tham gia.

**Independent Test**: Kiểm tra ranking logic và hiển thị.

**Acceptance Scenarios**:

1. **Given** có dữ liệu điểm danh đầy đủ, **When** mở Hall of Fame, **Then** hiển thị bảng xếp hạng thành viên có tỷ lệ tham gia cao nhất.

---

### User Story 13 — Đồng Bộ Firebase Realtime (Priority: P1)

Hệ thống sử dụng Firebase Firestore với kiến trúc:
- **Root**: `teams/{primary|testing}` (env toggle qua `VITE_USE_TEST_DATA`)
- **Collections**: members, matches, transactions, pendingTransactions, pendingAttendances, leaveRequests, receivables, contributionTiers, fixedMatches
- **Sync strategies**:
  - **Granular write (Level 2)**: Khi thêm/sửa/xóa 1 item → uploadSingleItem/deleteSingleItem cho collection tương ứng
  - **Bulk upload (debounced)**: saveData khi không skip Firebase → debounce 5s → upload toàn bộ
  - **Atomic transactions**: approvePendingTransactionAtomic, approveAttendanceAtomic — dùng Firestore runTransaction
  - **Realtime listeners**: Lắng nghe thay đổi trên root + tất cả collection → debounce 1.5s → downloadData full → updateFromFirebase
  - **Race condition guard**: `isSyncingLocal` flag ngăn Firebase snapshot ghi đè local state đang được cập nhật
- **Auth**: Anonymous sign-in (không dùng Google Auth ở level code, mặc dù docs cũ đề cập)
- **FCM**: Push notification khi trận mới tạo → Cloud Function `notifyNewMatch` gửi đến tất cả FCM tokens

**Why this priority**: Cho phép nhiều thiết bị/admin cùng làm việc trên 1 bộ dữ liệu.

**Independent Test**: Tạo dữ liệu trên device A, kiểm tra realtime sync trên device B.

**Acceptance Scenarios**:

1. **Given** Admin đăng nhập, **When** Firebase configured, **Then** tự động signInAnonymously → downloadData → setupRealtimeListener.
2. **Given** Admin thêm thành viên, **When** sync hoàn thành, **Then** chỉ member document được upload (granular, không full bulk).
3. **Given** đang upload local data (isSyncingLocal=true), **When** Firestore snapshot đến, **Then** skip updateFromFirebase để tránh revert.

---

### User Story 14 — PWA & Mobile Experience (Priority: P2)

Ứng dụng là PWA: cài đặt trên home screen, service worker cho offline caching, pull-to-refresh, swipe navigation (swipe right từ cạnh mở menu, swipe left đóng menu).

- **Responsive**: Desktop sidebar cố định, Mobile dùng FAB button + slide-in sidebar overlay
- **Theme**: Light/Dark mode, lưu preference localStorage, hỗ trợ View Transition API cho animate toggle
- **Mobile View Simulation**: Desktop có toggle giả lập mobile layout
- **Haptic feedback**: navigator.vibrate khi pull-to-refresh vượt threshold

**Why this priority**: Đội bóng chủ yếu dùng điện thoại → trải nghiệm mobile phải mượt.

**Independent Test**: Test PWA trên mobile: cài đặt, offline, pull-to-refresh, theme switch.

**Acceptance Scenarios**:

1. **Given** truy cập app trên mobile Chrome, **When** cài đặt PWA, **Then** app standalone, FAB menu button xuất hiện.
2. **Given** ở đầu trang trên mobile, **When** kéo xuống quá 70px, **Then** trigger pull-to-refresh (reload trang).
3. **Given** user switch theme, **When** View Transition API available, **Then** circular clip-path animation từ vị trí click.

---

### User Story 15 — Cài Đặt Hệ Thống (Priority: P2)

Admin quản lý: đổi mật khẩu (bcrypt), cấu hình QR Code thanh toán (upload hình → SVG wrapper), MoMo link, Messenger Webhook URL, mức phạt (configurable), lịch trận cố định (fixedMatches), và migration dữ liệu nợ cũ.

**Why this priority**: Cho phép tùy chỉnh vận hành theo nhu cầu đội.

**Independent Test**: Đổi mật khẩu, thay đổi mức phạt, thêm lịch cố định.

**Acceptance Scenarios**:

1. **Given** Admin đổi mật khẩu, **When** nhập đúng mật khẩu cũ + mật khẩu mới >= 6 ký tự, **Then** hash bcrypt(newPassword) → lưu vào settings → sync.
2. **Given** Admin cấu hình Messenger Webhook, **When** tạo trận mới, **Then** tự động POST thông tin trận qua webhook.
3. **Given** Admin thêm lịch cố định (Thứ 2, 16:30), **When** lưu, **Then** fixedMatch lưu vào array (tính năng auto-create tạm tắt trong code nhưng UI vẫn có).

---

### User Story 16 — Quản Lý Áo Đấu (Jersey Payments) (Priority: P3)

Hệ thống theo dõi thanh toán áo đấu cho từng thành viên: size, status (none/ordered/paid), amount, note. Tự động tạo entry cho thành viên mới khi loadData.

**Why this priority**: Tính năng phụ trợ, không ảnh hưởng core workflow.

**Independent Test**: Cập nhật jersey payment status, kiểm tra persist.

**Acceptance Scenarios**:

1. **Given** thành viên mới được thêm, **When** loadData chạy, **Then** jerseyPayments có entry mới cho thành viên đó.

---

### Edge Cases

- **Đăng nhập trên nhiều thiết bị đồng thời**: Race condition giữa local writes và Firebase snapshots → giải quyết bằng `isSyncingLocal` flag + 2s cooldown
- **App offline**: Dữ liệu lưu localStorage, sync khi online lại (retry 3 lần, exponential backoff 2s × 2^attempt)
- **Trùng lặp webhook MoMo**: Kiểm tra idempotency bằng requestId trong momoWebhooks collection
- **Thành viên bị xóa nhưng có dữ liệu tài chính**: getMemberName trả empty string, không crash
- **AttendanceIds format inconsistency**: Code xử lý cả Array và Object (Object.values fallback)
- **MemberId type mismatch**: Comparison dùng cả `===`, String() và Number() để handle legacy data
- **Contribution tier bị xóa**: Thành viên liên kết sẽ có monthlyFee = 0 → không tạo receivable

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST authenticate users via 3 roles (Admin, Accountant, Guest) with bcrypt-hashed passwords stored in settings
- **FR-002**: System MUST enforce role-based access control with specific permission sets for each role (25+ granular permissions)
- **FR-003**: System MUST auto-expire sessions after 6 hours and redirect to login
- **FR-004**: System MUST support full CRUD for members, matches, and transactions with automatic Firebase synchronization
- **FR-005**: System MUST calculate and auto-create monthly fund receivables based on each member's contribution tier
- **FR-006**: System MUST implement smart debt clearing — when income received, automatically mark oldest unpaid receivables as paid (fines first, then chronological)
- **FR-007**: System MUST support pending transaction approval workflow with atomic Firestore transactions to prevent race conditions
- **FR-008**: System MUST support manual attendance requests with atomic approval (update match attendance + delete pending in single transaction)
- **FR-009**: System MUST track leave/late arrival requests with approval workflow (pending → approved/rejected)
- **FR-010**: System MUST calculate penalties based on configurable tiers (absent, late <10m, <20m, >20m)
- **FR-011**: System MUST support match finalization — generate receivables for all penalties when admin finalizes a match
- **FR-012**: System MUST persist all data in localStorage with optional real-time Firebase Firestore sync
- **FR-013**: System MUST implement granular Firebase sync (single-item upload/delete) to minimize network usage
- **FR-014**: System MUST guard against race conditions during sync using isSyncingLocal flag
- **FR-015**: System MUST support MoMo payment integration (personal QR + business API + webhook IPN)
- **FR-016**: System MUST send Messenger notifications for new matches via configurable webhook
- **FR-017**: System MUST send FCM push notifications when new matches are created (via Cloud Function)
- **FR-018**: System MUST function as a PWA with service worker, offline support, and installability
- **FR-019**: System MUST support dark/light theme with persistence and animated transitions
- **FR-020**: System MUST support responsive design with desktop sidebar and mobile FAB navigation
- **FR-021**: System MUST support pull-to-refresh gesture on mobile
- **FR-022**: System MUST provide migration tools to convert legacy debt data to receivables system
- **FR-023**: System MUST support configurable fixed match schedules (day of week, time, location)

### Key Entities

- **Member**: id, name, fundPaid, fines, contributionTierId, paymentType, perMatchFee
- **Match**: id, date, startTime, opponent, location, matchType, attendance[], finalized
- **Transaction**: id, type (income/expense), category, amount, description, date, memberId, momoTransId
- **PendingTransaction**: id, type, category, amount, description, date, memberId, status (pending/approved/rejected), createdAt, approvedAt, rejectionReason
- **Receivable**: id, memberId, amount, type (monthly_fund/fine/pitch_fee/legacy_debt), description, date, monthKey, matchId, status (unpaid/paid), paidAt, transactionId
- **LeaveRequest**: id, memberId, memberName, leaveDate, matchId, reason, type (leave/late), lateMinutes, status (pending/approved/rejected), adminNote
- **PendingAttendance**: id, memberId, matchId, status, timestamp, method
- **ContributionTier**: id, name, monthlyFee, icon, color, isDefault
- **FixedMatch**: id, dayOfWeek, startTime, opponent, location
- **JerseyPayment**: memberId, size, status (none/ordered/paid), amount, note
- **Settings**: momoPhone, messengerWebhookUrl, momoLink, fundQR, adminPassword, accountantPassword, penalties

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Admin có thể hoàn thành quy trình tạo trận + điểm danh + chốt phạt trong dưới 3 phút
- **SC-002**: Thành viên Guest có thể gửi yêu cầu điểm danh + đóng quỹ trong dưới 1 phút
- **SC-003**: Dữ liệu đồng bộ giữa 2 thiết bị trong vòng 5 giây sau khi thay đổi
- **SC-004**: App tải trang lần đầu dưới 3 giây trên mạng 4G
- **SC-005**: 100% giao dịch pending được duyệt/từ chối mà không gây mất mát hoặc trùng lặp dữ liệu
- **SC-006**: Hệ thống auto-create monthly debts chính xác cho tất cả thành viên eligible mỗi tháng
- **SC-007**: Smart debt clearing xóa nợ đúng thứ tự ưu tiên (phạt → quỹ cũ nhất) mà không bỏ sót
- **SC-008**: PWA có thể cài đặt và hoạt động offline với dữ liệu đã cached
- **SC-009**: Tất cả chức năng responsive và sử dụng được trên màn hình >= 320px
- **SC-010**: Dark/Light theme chuyển đổi mượt mà, không flash nội dung sai màu

---

## Assumptions

- Ứng dụng phục vụ 1 đội bóng duy nhất (single-tenant), không cần multi-team support
- Số lượng thành viên < 100 người, phù hợp với kiến trúc localStorage + Firestore
- Firebase Anonymous Auth được sử dụng (không yêu cầu đăng nhập Google dù docs cũ đề cập)
- Tiền tệ sử dụng VNĐ, không hỗ trợ đa tiền tệ
- Tính năng auto-create fixed matches hiện tạm tắt trong code (`checkAndCreateFixedMatches` return ngay) nhưng UI vẫn hiển thị
- QR Code attendance scanning đã bị xóa — chỉ còn manual attendance
- Hệ thống chạy trên modern browsers (Chrome, Firefox, Safari) phiên bản mới
- MoMo Business API là optional, hệ thống vẫn hoạt động đầy đủ với MoMo Personal hoặc không có MoMo
- Cloud Functions deploy trên Firebase Blaze plan
