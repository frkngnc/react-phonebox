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

## Design Variants

The `variant` prop changes the visual treatment without changing formatting,
validation, accessibility, or country selection behavior.

```tsx
<PhoneBox variant="classic" />
<PhoneBox variant="minimal" />
<PhoneBox variant="soft" />
<PhoneBox variant="pill" />
```

| Variant | Best suited for |
|---------|-----------------|
| `classic` | Familiar forms and broad framework compatibility |
| `minimal` | Editorial layouts and dense form screens |
| `soft` | Modern SaaS and product surfaces |
| `pill` | Consumer apps and touch-focused interfaces |

Every variant supports both themes:

```tsx
<PhoneBox variant="soft" theme="light" />
<PhoneBox variant="soft" theme="dark" />
```

The [interactive demo](https://frkngnc.github.io/react-phonebox/demo) renders all
variants with real formatting, E.164 output, validation, and theme switching.

---

## 🧩 Custom Styling

You can override styles using plain CSS or utility-based frameworks like Tailwind or CSS Modules.

Override the semantic tokens to match a product brand while retaining the
selected variant's spacing and shape system:

```css
.phonebox-wrapper {
  --phonebox-bg: #f8faf8;
  --phonebox-text: #1f2922;
  --phonebox-border: #aeb9b1;
  --phonebox-hover: #e7ede8;
  --phonebox-soft-bg: #edf2ee;
  --phonebox-soft-border: #ccd6ce;
}
```

Make sure to include the default stylesheet if you're overriding styles:

```tsx
import 'react-phonebox/style.css';
```

## Flag Rendering

The default mode uses FlagCDN. For an offline setup, use native emoji flags:

```tsx
<PhoneBox flagMode="emoji" />
```

Flags can also be hidden or replaced with a local component:

```tsx
<PhoneBox flagMode="none" />

<PhoneBox
  renderFlag={(country, { location }) => (
    <LocalFlag code={country.iso2} compact={location === 'option'} />
  )}
/>
```

Long country lists are virtualized after 80 results by default. Override this
with `virtualizeThreshold`, or pass a very high value to disable virtualization.

---

## 🧪 RTL Support

Right-to-left support is **automatic**. When `document.dir === 'rtl'`, the layout direction will adjust accordingly.
