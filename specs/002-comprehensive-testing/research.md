# Research: Comprehensive Testing Suite

## 1. Testing Framework Selection

**Decision**: Vitest
**Rationale**: Vitest tích hợp native với Vite (build tool hiện tại), hỗ trợ ESM, nhanh hơn Jest, và có API tương thích Jest.
**Alternatives**: Jest (chậm hơn với Vite, cần cấu hình thêm), Mocha (thiếu tích hợp Vue).

## 2. Vue Component Testing

**Decision**: @vue/test-utils + happy-dom
**Rationale**: @vue/test-utils là thư viện chính thức của Vue cho component testing. happy-dom nhẹ hơn jsdom, phù hợp cho test nhanh.
**Alternatives**: @testing-library/vue (tốt nhưng thêm abstraction layer không cần thiết cho dự án này).

## 3. Firebase Mocking Strategy

**Decision**: Manual mock modules qua vi.mock()
**Rationale**: Dự án sử dụng Firebase SDK trực tiếp trong composables. Mock ở module level cho phép kiểm soát hoàn toàn hành vi Firebase mà không cần emulator.
**Alternatives**: Firebase Emulator (nặng, cần Java runtime, phù hợp hơn cho integration test).

## 4. Test Coverage Tool

**Decision**: Vitest built-in coverage (v8 provider)
**Rationale**: Tích hợp sẵn, không cần cài thêm. Output HTML report dễ đọc.

## 5. Vue Router Mocking

**Decision**: Mock vue-router với vi.mock('vue-router')
**Rationale**: Views sử dụng useRouter/useRoute, cần mock để test component isolation.
