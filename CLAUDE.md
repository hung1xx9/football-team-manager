# CLAUDE.md

File này cung cấp hướng dẫn cho Claude Code (claude.ai/code) khi làm việc trong repository này.

## Lệnh thường dùng

```bash
npm run dev            # Chạy dev server (Vite, thường ở :5173)
npm run build          # Clean + build production
npm run preview        # Xem trước bản production
npm test               # Chạy toàn bộ test (single run)
npm run test:ui        # Giao diện Vitest UI
npx vitest             # Watch mode (dùng khi dev TDD)
npx vitest run         # Chạy một lần (giống npm test)
npx vitest run path/to/test --reporter=verbose  # Chạy một file test duy nhất
npm run test:coverage  # Chạy test kèm coverage report
npm run deploy         # Tăng patch version, build, và deploy lên Firebase
```

## Tổng quan kiến trúc

**Stack**: Vue 3 (Composition API, không TypeScript) + Vite + Vue Router + Vitest với happy-dom + Firebase Firestore (cloud sync tùy chọn) + PWA (vite-plugin-pwa).

**State toàn cục**: `src/composables/useAppState.js` là singleton store trung tâm. Tất cả dữ liệu reactive (members, matches, transactions, receivables, v.v.) được định nghĩa dưới dạng `ref()` ở cấp module và export từ composable này. Mọi thao tác CRUD đều nằm ở đây. Dữ liệu được lưu vào localStorage là nguồn chính; Firebase là lớp phụ tùy chọn.

**Firebase sync ba tầng** (`src/composables/useFirebase.js`):
- Tầng 1: Bulk batch writes qua `uploadData()` — tự động upload với debounce 5 giây
- Tầng 2: Ghi từng item riêng lẻ (`uploadSingleItem` / `deleteSingleItem`)
- Tầng 3: Atomic Firestore transactions để đảm bảo tính toàn vẹn tài chính (`approvePendingTransactionAtomic`, `postAttendanceFeeAtomic`, `voidMatchFeesAtomic`, `reconcileMemberAtomic`)

Guard `isSyncingLocal` trong `useAppState` ngăn vòng lặp sync vô hạn: khi đang có ghi local, các bản cập nhật snapshot từ Firebase bị bỏ qua trong 2 giây.

**Môi trường Firestore kép**: `VITE_USE_TEST_DATA=true` chuyển sang collection `testing`; mặc định dùng `primary`. Cho phép chạy test và dev trên dữ liệu Firestore riêng biệt, không ảnh hưởng đến dữ liệu production.

**Phân quyền** (`src/composables/useAuth.js`): Ba vai trò — `admin`, `ketoan`, `guest` (thành viên). Session admin/ketoan hết hạn sau 6 giờ; session guest không bao giờ hết hạn. Mật khẩu được hash bằng bcrypt. `App.vue` hiển thị modal đăng nhập; sau khi xác thực, router-view được render.

**Các model dữ liệu chính**:
- `members` — hồ sơ cầu thủ với `fundPaid`, `fines`, `contributionTierId`, `paymentType` (tháng hoặc theo trận)
- `matches` — trận đấu với `attendance[]` (trạng thái từng thành viên, timestamp, thông tin đi muộn), cờ `finalized`, `rsvp[]`
- `receivables` — các khoản phải thu chi tiết (quỹ tháng, phạt, phí sân, nợ cũ) với `status: unpaid|paid|voided`
- `transactions` — sổ thu/chi
- `pendingTransactions` — hàng đợi duyệt thanh toán (thành viên gửi → admin duyệt)
- `contributionTiers` — bậc đóng quỹ hàng tháng (vd: Học Sinh: 30k, Sinh Viên: 50k, Đi Làm: 100k)

**Đối chiếu tài chính**: `useFinancialSync.js` so sánh `fundPaid`/`fines` của từng thành viên với sổ giao dịch, đánh dấu các sai lệch, và cung cấp chức năng đối chiếu từng người hoặc hàng loạt qua Firestore transaction.

**Tính tiền phạt** (`usePenalties.js`): Các mức có thể cấu hình — vắng = 50k, muộn <10ph = 10k, <20ph = 20k, >20ph = 50k.

**Các composable khác**: `useBreakpoints` (responsive), `useToast` (thông báo toàn cục qua `ToastContainer`/`ToastMessage`), `usePullToRefresh` (cảm ứng kéo để refresh), `useEscapeClose`, `useMoMo` (tích hợp thanh toán MoMo), `useLeaveRequests`, `useFinancialCalculations`.

**Testing**: Vitest + happy-dom. Firebase được mock toàn cục qua `tests/mocks/firebase.js` (mock Firestore với `collection`, `doc`, `set`, `get`, `runTransaction`, batch operations). Test import từ `tests/setup.js`. Vue Router cũng được mock toàn cục.

**Cấu trúc route**: Lazy-loaded views qua `() => import(...)`. Tất cả route yêu cầu đã đăng nhập. `/pending-transactions` render `FinanceView` với prop `initialTab`.

**Các luồng dữ liệu quan trọng**:
- **Chốt trận → tạo khoản phải thu**: Khi gọi `finalizeMatch()`, hệ thống tạo `receivable` cho từng cầu thủ vắng/muộn dựa trên tính toán phạt. Các khoản này sau đó được tự động xóa khi thành viên thanh toán.
- **Tự động tạo nợ quỹ hàng tháng**: `checkAndCreateMonthlyDebts()` chạy khi app khởi động và sau mỗi lần Firebase sync. Nó tạo receivable `monthly_fund` cho tháng hiện tại với từng thành viên có bậc đóng quỹ, nếu chưa tồn tại.
- **Thanh toán → xóa nợ**: Khi ghi nhận giao dịch thu cho một thành viên, hệ thống tự động phân bổ vào các khoản phải thu chưa thanh toán (ưu tiên phạt trước, sau đó theo ngày cũ nhất). Xử lý cục bộ trong `addTransaction()` và atomic trong Firestore qua `approvePendingTransactionAtomic()`.

**Webhook Messenger**: `App.vue` và `useAppState` tích hợp với URL webhook Messenger (cấu hình trong `settings.messengerWebhookUrl`) để gửi thông báo trận đấu mới và cập nhật RSVP vào group chat Messenger.

**Phát triển theo spec**: Thư mục `specs/` chứa tài liệu đặc tả (004-unify-toasts, 005-pull-to-refresh, 006-financial-data-sync, 007-sync-financial-data) mỗi cái có `spec.md`, `plan.md`, `data-model.md`, `research.md`, `quickstart.md`, và `tasks.md`. Đọc spec liên quan trước khi làm feature đã có spec.

**Firebase Cloud Functions**: Thư mục `functions/` chứa backend Firebase Functions (dependencies Node.js riêng, có thể xử lý webhooks phía server hoặc scheduled tasks).

**Path alias**: `@` trỏ đến `./src` — chỉ được cấu hình trong `vitest.config.js` (Vite config không định nghĩa alias này, nên chỉ dùng trong test).

**UI**: Giao diện dark/light theme với animation View Transitions API. Responsive trên mobile, có chế độ giả lập mobile viewport (nút bật/tắt). Pull-to-refresh trên nội dung chính. PWA với service worker tự động cập nhật.
