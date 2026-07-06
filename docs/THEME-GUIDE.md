# 🎨 Theme System - Football Team Manager

## Tổng quan

Ứng dụng Football Team Manager đã được nâng cấp với hệ thống theme hiện đại, hỗ trợ **Light Mode** và **Dark Mode** với khả năng chuyển đổi mượt mà.

## Tính năng mới

### 1. **Light & Dark Mode**
- ✅ Chuyển đổi dễ dàng giữa 2 theme
- ✅ Lưu preference vào localStorage
- ✅ Animations mượt mà khi chuyển đổi
- ✅ Toggle button đẹp mắt ở top bar

### 2. **Glassmorphism Effect**
- ✅ Cards với hiệu ứng kính mờ
- ✅ Backdrop blur cho depth
- ✅ Border gradient tinh tế
- ✅ Shadow effects hiện đại

### 3. **Cải thiện UI/UX**
- ✅ Typography rõ ràng hơn
- ✅ Spacing nhất quán
- ✅ Hover states rõ ràng
- ✅ Focus states với glow effect
- ✅ Micro-animations cho tương tác

### 4. **Responsive Design**
- ✅ Tối ưu cho mobile, tablet, desktop
- ✅ Touch-friendly buttons
- ✅ Adaptive layouts

## Cách sử dụng

### Chuyển đổi Theme

1. Tìm nút toggle theme ở góc trên bên phải (top bar)
2. Click để chuyển đổi giữa Light và Dark mode
3. Theme preference sẽ được lưu tự động

### Theme Variables

Tất cả màu sắc và styles được quản lý qua CSS custom properties trong `src/assets/css/variables.css`:

```css
/* Dark Theme (Default) */
:root,
[data-theme="dark"] {
    --bg-primary: #0a0e1a;
    --bg-secondary: #0f172a;
    --text-primary: #f1f5f9;
    --glass-bg: rgba(30, 41, 59, 0.7);
    /* ... */
}

/* Light Theme */
[data-theme="light"] {
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --text-primary: #0f172a;
    --glass-bg: rgba(255, 255, 255, 0.8);
    /* ... */
}
```

## Cấu trúc Theme

### Color System

#### Background Colors
- `--bg-primary`: Màu nền chính
- `--bg-secondary`: Màu nền phụ
- `--bg-tertiary`: Màu nền cấp 3
- `--bg-elevated`: Màu nền cho elevated elements
- `--bg-hover`: Màu nền khi hover
- `--bg-active`: Màu nền khi active

#### Text Colors
- `--text-primary`: Màu chữ chính
- `--text-secondary`: Màu chữ phụ
- `--text-muted`: Màu chữ mờ
- `--text-inverse`: Màu chữ đảo ngược

#### Glass Effect
- `--glass-bg`: Background cho glassmorphism
- `--glass-border`: Border cho glass elements
- `--glass-shadow`: Shadow cho glass elements

#### Gradients
- `--gradient-primary`: Gradient chính
- `--gradient-success`: Gradient thành công
- `--gradient-danger`: Gradient nguy hiểm
- `--gradient-bg`: Gradient nền
- `--gradient-card`: Gradient cho cards

### Component Updates

#### Cards
- Glassmorphism effect với backdrop blur
- Hover animations với scale và shadow
- Icon animations khi hover
- Responsive padding và sizing

#### Buttons
- Gradient backgrounds
- Ripple effect khi click
- Loading states
- Outline variants
- Ghost variants

#### Forms
- Focus states với glow effect
- Validation states (error, success)
- Hover states rõ ràng
- Placeholder styling

#### Layout
- Sidebar với glass effect
- Top bar sticky với blur
- Navigation với smooth transitions
- Mobile-friendly với overlay

## Customization

### Thêm màu mới

Để thêm màu mới cho cả 2 themes:

```css
/* variables.css */
:root,
[data-theme="dark"] {
    --custom-color: #your-dark-color;
}

[data-theme="light"] {
    --custom-color: #your-light-color;
}
```

### Tạo component mới

Sử dụng theme variables thay vì hardcode màu:

```css
.my-component {
    background: var(--bg-primary);
    color: var(--text-primary);
    border: 1px solid var(--border-primary);
    transition: all var(--transition-normal);
}

.my-component:hover {
    background: var(--bg-hover);
    box-shadow: var(--shadow-md);
}
```

## Best Practices

### 1. Luôn sử dụng CSS Variables
❌ **Không nên:**
```css
.card {
    background: #1e293b;
    color: #f1f5f9;
}
```

✅ **Nên:**
```css
.card {
    background: var(--bg-secondary);
    color: var(--text-primary);
}
```

### 2. Sử dụng Transitions
```css
.element {
    transition: all var(--transition-normal);
}
```

### 3. Glassmorphism Pattern
```css
.glass-element {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
}
```

### 4. Hover States
```css
.interactive-element {
    transition: all var(--transition-normal);
}

.interactive-element:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

**Note:** Backdrop blur có thể không hoạt động trên một số browsers cũ.

## Performance

### Optimizations
- CSS custom properties cho instant theme switching
- Hardware-accelerated transitions
- Minimal repaints với transform và opacity
- Lazy-loaded components

### Tips
- Sử dụng `will-change` cho animated elements
- Tránh animate width/height, dùng transform thay thế
- Debounce resize events

## Troubleshooting

### Theme không chuyển đổi
1. Kiểm tra localStorage có lưu theme không
2. Clear cache và reload
3. Kiểm tra console có lỗi không

### Màu sắc không đúng
1. Đảm bảo sử dụng CSS variables
2. Kiểm tra theme attribute trên `<html>`
3. Verify variables.css được import

### Performance issues
1. Giảm số lượng backdrop-filter
2. Optimize animations
3. Sử dụng CSS containment

## Future Enhancements

- [ ] Thêm theme colors tùy chỉnh
- [ ] System theme detection (auto dark mode)
- [ ] Accent color picker
- [ ] High contrast mode
- [ ] Animation preferences

## Credits

Thiết kế bởi: Football Team Manager Team
Sử dụng: Inter font, CSS custom properties, Vue 3

---

**Enjoy your new beautiful UI! ⚽✨**
