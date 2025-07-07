# Styling

React PhoneBox comes with built-in support for **light** and **dark** themes, and also allows full **custom styling** via CSS overrides.

---

## ✅ Built-in Themes

Use the `theme` prop to switch between `dark` and `light` themes.

```tsx
<PhoneBox theme="dark" />
<PhoneBox theme="light" />
```

---

## 🧩 Custom Styling

You can override styles using plain CSS or utility-based frameworks like Tailwind or CSS Modules.

Example:

```css
.phonebox-wrapper {
  border-radius: 8px;
  border: 1px solid #ddd;
}

.phonebox-field {
  font-size: 16px;
  padding: 0.5rem;
}
```

Make sure to include the default stylesheet if you're overriding styles:

```tsx
import 'react-phonebox/style.css';
```

---

## 🧪 RTL Support

Right-to-left support is **automatic**. When `document.dir === 'rtl'`, the layout direction will adjust accordingly.
