# Feature Specification: Financial Data Synchronization

**Feature Branch**: `007-sync-financial-data`  
**Created**: 2026-05-18  
**Status**: Draft  
**Input**: User description: "Anh muốn em tạo cho anh logic đồng nhất thông tin tiền quỹ, tiền phạt, tiền theo trận khớp với dữ liệu đóng quỹ, dữ liệu trận đấu, điểm danh. Các thông tin này phải sync với nhau để không lệch tiền của các thành viên trong đội."

## Overview

Đảm bảo rằng số dư tài chính của từng thành viên trong đội (tiền quỹ, tiền phạt, tiền theo trận) luôn khớp chính xác với dữ liệu gốc từ các nguồn: lịch sử đóng quỹ, dữ liệu trận đấu và điểm danh. Mọi thao tác tạo, chỉnh sửa hoặc xóa trên một nguồn dữ liệu phải tự động phản ánh đồng bộ lên số dư tài chính tổng hợp của thành viên, không phụ thuộc vào thứ tự thực hiện.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Số dư thành viên tự động cập nhật khi đóng quỹ được duyệt (Priority: P1)

Khi ban quản lý duyệt một giao dịch đóng quỹ của thành viên, số tiền quỹ (fund balance) của thành viên đó phải tăng ngay lập tức và đồng thời khoản nợ đang tồn đọng (nếu có) phải được trừ đi tương ứng. Trang tổng hợp tài chính phải phản ánh ngay thay đổi này mà không cần tải lại trang.

**Why this priority**: Đây là luồng tài chính cơ bản nhất và quan trọng nhất của ứng dụng. Nếu số dư không cập nhật sau khi duyệt đóng quỹ, toàn bộ hệ thống tài chính mất tin cậy.

**Independent Test**: Có thể kiểm tra độc lập bằng cách duyệt một giao dịch đóng quỹ và xác minh số dư thành viên tăng đúng giá trị, khoản nợ giảm tương ứng.

**Acceptance Scenarios**:

1. **Given** thành viên có nợ tồn đọng 200.000đ và đóng quỹ 300.000đ đang chờ duyệt, **When** quản lý duyệt giao dịch đó, **Then** nợ của thành viên phải về 0đ, số tiền quỹ tăng 100.000đ (300.000 - 200.000), và tổng thu của quỹ đội tăng 300.000đ.
2. **Given** thành viên không có nợ và đóng quỹ 200.000đ đang chờ duyệt, **When** quản lý duyệt, **Then** số dư quỹ thành viên tăng đúng 200.000đ, không có thay đổi nào ở khoản nợ.
3. **Given** quản lý duyệt đóng quỹ thành công, **When** thành viên mở trang tài chính cá nhân, **Then** họ thấy ngay số dư mới mà không cần làm mới trang.

---

### User Story 2 - Tiền theo trận và tiền phạt tự động tính khi điểm danh thay đổi (Priority: P1)

Khi điểm danh của một trận đấu được ghi nhận hoặc chỉnh sửa (vắng mặt có phép, vắng không phép, tham gia, đến muộn...), số tiền phải đóng theo trận và tiền phạt của thành viên liên quan phải được tính lại và cập nhật ngay lập tức vào hồ sơ tài chính cá nhân.

**Why this priority**: Điểm danh là nguồn gốc trực tiếp sinh ra khoản nợ theo trận và tiền phạt. Nếu thay đổi điểm danh không kéo theo cập nhật tài chính, thành viên sẽ thấy số liệu sai.

**Independent Test**: Thay đổi trạng thái điểm danh của một thành viên trong một trận và xác minh khoản nợ/phạt của họ thay đổi đúng theo quy tắc tài chính của đội.

**Acceptance Scenarios**:

1. **Given** thành viên được đánh dấu "có mặt" cho một trận, **When** quản lý đổi thành "vắng không phép", **Then** tiền phạt của thành viên tăng đúng mức phạt vắng không phép đã cấu hình, và tổng nợ của họ cập nhật ngay.
2. **Given** thành viên bị phạt vì đến muộn, **When** quản lý chỉnh lại thành "có mặt đúng giờ", **Then** khoản tiền phạt đến muộn phải được xóa khỏi hồ sơ tài chính của thành viên đó.
3. **Given** một trận đấu có 15 thành viên điểm danh, **When** quản lý phê duyệt toàn bộ điểm danh, **Then** 15 hồ sơ tài chính thành viên phải được cập nhật đồng thời, không ai bị bỏ sót.

---

### User Story 3 - Phát hiện và cảnh báo khi dữ liệu tài chính bị lệch (Priority: P2)

Hệ thống tự động phát hiện khi số dư tài chính tổng hợp của một thành viên không khớp với tổng số liệu tính được từ lịch sử giao dịch thực tế (đóng quỹ + điểm danh + trận đấu). Quản lý được thông báo về sự lệch lạc này và có thể khởi động quy trình đồng bộ lại.

**Why this priority**: Dữ liệu có thể bị lệch do lỗi kỹ thuật hoặc thao tác thủ công trước đây. Cần cơ chế phát hiện để duy trì độ tin cậy dài hạn.

**Independent Test**: Có thể kiểm tra bằng cách chạy chức năng kiểm tra tính nhất quán và xác minh nó đánh dấu đúng các thành viên có số dư không khớp.

**Acceptance Scenarios**:

1. **Given** số dư tổng hợp của thành viên A là 500.000đ nhưng tổng cộng từ lịch sử giao dịch chỉ là 450.000đ, **When** hệ thống chạy kiểm tra tính nhất quán, **Then** thành viên A được đánh dấu là "dữ liệu lệch" và quản lý nhận thông báo.
2. **Given** quản lý nhận thông báo về lệch dữ liệu, **When** họ chọn "Đồng bộ lại", **Then** hệ thống tính lại số dư từ lịch sử gốc và cập nhật số dư tổng hợp về giá trị đúng.
3. **Given** tất cả thành viên có số dư khớp với lịch sử giao dịch, **When** chạy kiểm tra, **Then** không có cảnh báo nào được sinh ra.

---

### User Story 4 - Xem lịch sử biến động tài chính của từng thành viên (Priority: P3)

Quản lý và thành viên có thể xem lịch sử đầy đủ các lần biến động số dư tài chính cá nhân, bao gồm: nguồn gốc giao dịch (đóng quỹ/trận đấu/phạt), thời gian, giá trị thay đổi và số dư trước/sau.

**Why this priority**: Tính minh bạch giúp thành viên tin tưởng vào hệ thống và dễ dàng xác minh nếu nghi ngờ số liệu.

**Independent Test**: Có thể kiểm tra bằng cách thực hiện một số giao dịch và xác minh lịch sử hiển thị đúng và đủ các sự kiện theo thứ tự thời gian.

**Acceptance Scenarios**:

1. **Given** thành viên đã đóng quỹ 2 lần và vắng 1 trận, **When** xem lịch sử tài chính, **Then** họ thấy 3 dòng giao dịch với đầy đủ thông tin nguồn gốc, giá trị và số dư sau mỗi giao dịch.
2. **Given** quản lý xem lịch sử của thành viên bất kỳ, **When** lọc theo tháng, **Then** chỉ hiển thị các giao dịch trong tháng đó, sắp xếp theo thứ tự thời gian mới nhất trước.

---

### Edge Cases

- Điều gì xảy ra khi một trận đấu bị xóa sau khi điểm danh đã được duyệt? Tiền theo trận và phạt của các thành viên liên quan phải được hoàn lại.
- Điều gì xảy ra khi quản lý hoàn tác (hủy) một giao dịch đóng quỹ đã duyệt? Số dư phải được trừ lại đúng giá trị ban đầu.
- Điều gì xảy ra khi mức tiền theo trận hoặc tiền phạt thay đổi sau khi đã có dữ liệu điểm danh? Giao dịch cũ giữ nguyên giá trị tại thời điểm ghi nhận; chỉ áp dụng mức mới cho các trận tương lai.
- Điều gì xảy ra khi hai quản lý duyệt giao dịch của cùng một thành viên cùng lúc? Hệ thống phải đảm bảo tính nhất quán (không mất dữ liệu, không cộng trùng).
- Điều gì xảy ra khi thành viên đóng quỹ vượt quá tổng nợ? Phần dư phải được ghi nhận là số dư dương (credit) trong tài khoản thành viên.
- Điều gì xảy ra khi mạng bị gián đoạn trong quá trình đồng bộ? Giao dịch phải hoàn toàn thành công hoặc hoàn toàn thất bại, không để trạng thái nửa vời.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Hệ thống PHẢI cập nhật ngay số dư tài chính tổng hợp của thành viên khi một giao dịch đóng quỹ được phê duyệt, bao gồm: cộng tiền vào quỹ, trừ khoản nợ tồn đọng theo thứ tự ưu tiên (nợ cũ nhất trước).
- **FR-002**: Hệ thống PHẢI tính toán và cập nhật tiền theo trận và tiền phạt của thành viên ngay khi trạng thái điểm danh của họ trong một trận đấu được ghi nhận hoặc chỉnh sửa.
- **FR-003**: Hệ thống PHẢI đảm bảo rằng mọi thay đổi tài chính được thực hiện theo nguyên tắc tất-cả-hoặc-không-có-gì: hoặc toàn bộ cập nhật thành công, hoặc không có gì thay đổi.
- **FR-004**: Hệ thống PHẢI cung cấp chức năng kiểm tra tính nhất quán tài chính, có thể chạy theo yêu cầu của quản lý, để phát hiện mọi thành viên có số dư tổng hợp không khớp với lịch sử giao dịch.
- **FR-005**: Khi phát hiện lệch dữ liệu, hệ thống PHẢI hiển thị cảnh báo cho quản lý và cung cấp chức năng "Đồng bộ lại" để tính toán lại số dư từ lịch sử gốc.
- **FR-006**: Khi một trận đấu bị hủy hoặc xóa, hệ thống PHẢI hoàn lại toàn bộ khoản tiền theo trận và tiền phạt liên quan đến trận đó cho tất cả thành viên đã điểm danh.
- **FR-007**: Khi một giao dịch đóng quỹ đã duyệt bị hủy, hệ thống PHẢI khôi phục lại số dư thành viên về trạng thái trước khi duyệt giao dịch đó.
- **FR-008**: Hệ thống PHẢI ghi lại nhật ký (audit trail) đầy đủ cho mọi thay đổi tài chính, bao gồm: thời gian, loại giao dịch, giá trị trước/sau, và người thực hiện thao tác.
- **FR-009**: Thành viên PHẢI có thể xem lịch sử biến động tài chính cá nhân của mình theo thứ tự thời gian, với thông tin nguồn gốc giao dịch rõ ràng.
- **FR-010**: Quản lý PHẢI có thể xem lịch sử biến động tài chính của bất kỳ thành viên nào và lọc theo khoảng thời gian.
- **FR-011**: Hệ thống PHẢI ngăn chặn tình trạng cùng lúc có nhiều thao tác duyệt ảnh hưởng đến cùng một tài khoản thành viên gây ra dữ liệu không nhất quán.
- **FR-012**: Hệ thống PHẢI giữ nguyên giá trị tiền phạt và tiền theo trận tại thời điểm ghi nhận; thay đổi cấu hình mức phí chỉ áp dụng cho các trận/giao dịch tương lai.

### Key Entities

- **MemberFinancialSummary (Tóm tắt tài chính thành viên)**: Số dư tổng hợp của một thành viên bao gồm tổng quỹ đã đóng, tổng nợ (tiền theo trận + tiền phạt), số dư ròng và tổng nợ tồn đọng chưa thanh toán.
- **FundTransaction (Giao dịch quỹ)**: Một lần đóng quỹ của thành viên với trạng thái (chờ duyệt/đã duyệt/đã hủy), giá trị, ngày thực hiện và ngày duyệt.
- **MatchFeeRecord (Khoản tiền theo trận)**: Khoản tiền một thành viên phải đóng cho một trận đấu cụ thể, dựa trên trạng thái điểm danh và cấu hình phí của đội.
- **PenaltyRecord (Khoản tiền phạt)**: Khoản phạt phát sinh từ hành vi vi phạm quy định đội (vắng không phép, đến muộn...) trong một trận cụ thể.
- **AttendanceRecord (Điểm danh)**: Trạng thái tham gia của một thành viên trong một trận đấu (có mặt, vắng có phép, vắng không phép, đến muộn...) là nguồn gốc sinh ra MatchFeeRecord và PenaltyRecord.
- **FinancialAuditLog (Nhật ký tài chính)**: Ghi lại từng thay đổi trên MemberFinancialSummary, bao gồm giá trị cũ, giá trị mới, nguồn gốc thay đổi và thời gian.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% giao dịch đóng quỹ được duyệt dẫn đến cập nhật số dư thành viên đúng và ngay lập tức, không có ngoại lệ.
- **SC-002**: 100% thay đổi điểm danh dẫn đến cập nhật tiền theo trận và/hoặc tiền phạt đúng cho thành viên liên quan trong vòng 3 giây.
- **SC-003**: Sau khi chạy chức năng "Đồng bộ lại", 100% thành viên có số dư tổng hợp khớp với lịch sử giao dịch gốc, không còn cảnh báo lệch dữ liệu.
- **SC-004**: 0 trường hợp dữ liệu tài chính bị trạng thái nửa vời (partial update) sau khi một giao dịch thất bại giữa chừng.
- **SC-005**: Quản lý có thể phát hiện và sửa lệch dữ liệu của toàn đội (tối đa 30 thành viên) trong vòng 2 phút thông qua chức năng kiểm tra và đồng bộ.
- **SC-006**: Lịch sử biến động tài chính của thành viên hiển thị đầy đủ và chính xác, không bị mất dòng giao dịch nào, ngay cả khi đội có hơn 100 giao dịch trong lịch sử.

---

## Assumptions

- Quy tắc tính tiền theo trận (ai phải đóng, bao nhiêu tiền, trạng thái điểm danh nào miễn phạt) đã được cấu hình sẵn trong hệ thống và không thay đổi trong phạm vi feature này.
- Mỗi trận đấu có đúng một mức phí tham gia và một mức phí phạt (vắng không phép, đến muộn) được cấu hình cố định cho đội.
- Chỉ tài khoản quản lý mới có quyền duyệt giao dịch, chỉnh sửa điểm danh và kích hoạt đồng bộ lại. Thành viên thường chỉ có quyền xem dữ liệu của bản thân.
- Hệ thống đang sử dụng cơ sở dữ liệu đám mây hỗ trợ giao dịch nguyên tử (atomic transaction) — đây là yêu cầu bắt buộc để đảm bảo FR-003.
- Số dư thành viên không bao giờ âm trong hệ thống; thành viên có thể có "nợ tồn đọng" nhưng đây là một trường riêng biệt, không phải số âm của số dư.
- Chức năng kiểm tra tính nhất quán (FR-004) có thể được chạy thủ công bởi quản lý; không yêu cầu chạy tự động theo lịch trong phạm vi feature này.
- Lịch sử đóng quỹ, dữ liệu trận đấu và điểm danh hiện đã có trong hệ thống và là nguồn dữ liệu gốc (source of truth) để tính lại số dư khi cần.
