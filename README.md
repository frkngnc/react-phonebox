# React PhoneBox

[![npm version](https://img.shields.io/npm/v/react-phonebox.svg)](https://www.npmjs.com/package/react-phonebox)
[![Docs](https://img.shields.io/badge/docs-online-blue)](https://frkngnc.github.io/react-phonebox)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)

A lightweight, customizable, and i18n-ready phone number input component with country selection, flag icons, validation, and formatting. Powered by [`libphonenumber-js`](https://github.com/catamphetamine/libphonenumber-js).

---

## 📘 Documentation

Official documentation is available at:  
🔗 [https://frkngnc.github.io/react-phonebox](https://frkngnc.github.io/react-phonebox)

Includes:
- Easy & Advanced usage examples
- Full API reference
- Customization & styling guides
- Supported locales & validation behavior
- An interactive light and dark theme demo

Try the live demo at
[https://frkngnc.github.io/react-phonebox/demo](https://frkngnc.github.io/react-phonebox/demo).

---

## ✨ Features

- 🌍 Locale-based country names (supports `en`, `tr`, `fr`, `ar`, `es`, `ur`, etc.)
- 📞 Auto-formats and validates numbers using libphonenumber-js
- 🇺🇳 Flag icons from [flagcdn.com](https://flagcdn.com)
- 🏳️ CDN, native emoji, no-flag, or fully custom flag rendering
- 🔍 Debounced country search with intelligent filtering
- ⚡ Virtualized country list for low DOM and image overhead
- ⌨️ Keyboard and screen-reader friendly country picker
- ✅ Validity feedback via callback
- 🌗 Light & Dark theme support
- 🎛️ Classic, minimal, soft, and pill design variants
- 💡 Built-in RTL support
- 🔧 Modular hook-based API for advanced use cases
- 🪶 Lightweight and tree-shakable

---

## 🚀 Installation

```bash
npm install react-phonebox
# or
yarn add react-phonebox
```

---

## 🔧 Basic Usage (Easy Mode)

```tsx
import { useState } from "react";
import { PhoneBox } from "react-phonebox";
import "react-phonebox/style.css";

function App() {
  const [phone, setPhone] = useState("");
  const [rawPhone, setRawPhone] = useState("");
  const [isValid, setIsValid] = useState(false);

  return (
    <>
      <PhoneBox
        value={phone}
        onChange={setPhone}
        onRawChange={setRawPhone}
        onValidChange={setIsValid}
        locale="tr"
        initialCountry="TR"
        theme="dark"
        variant="soft"
        searchPlaceholder="Ülke ara..."
        flagMode="emoji"
        mobileOnly
      />

      <p>Formatted: {phone || "-"}</p>
      <p>Raw: {rawPhone || "-"}</p>
      <p>Valid: {phone ? (isValid ? "Yes" : "No") : "-"}</p>
    </>
  );
}
```

---

## ⚙️ Advanced Usage (Full Control)

```tsx
import { useState } from "react";
import {
  type Country,
  PhoneBoxInput,
  useFormatter,
  useExampleNumber,
  useMobileOnly,
} from "react-phonebox";
import "react-phonebox/style.css";

function PhoneInputWithHooks() {
  const [value, setValue] = useState("");
  const [country, setCountry] = useState<Country>({
    iso2: "TR",
    dialCode: "+90",
    name: "Turkey"
  });

  const { format } = useFormatter(country?.iso2);
  const { placeholder, example } = useExampleNumber(country?.iso2);
  const { validate } = useMobileOnly();

  const formatted = format(value);
  const validation = validate(value, false, country?.iso2);

  return (
      <PhoneBoxInput
        value={formatted}
        onChange={setValue}
        onCountryChange={setCountry}
        initialCountry="TR"
        locale="tr"
        placeholder={placeholder}
        theme="dark"
        searchPlaceholder="Ülke ara..."
      />
  );
}
```

---

## 🔌 Exposed Hooks

| Hook                 | Description                                                |
|----------------------|------------------------------------------------------------|
| `useFormatter()`     | Formats input value live using `AsYouType`                 |
| `useExampleNumber()` | Returns example number, placeholder, and max digits        |
| `useMobileOnly()`    | Validates mobile numbers only if `mobileOnly: true`        |

---

## 🧪 `<PhoneBox />` Props

| Prop               | Type                           | Description                                                  |
|--------------------|--------------------------------|--------------------------------------------------------------|
| `value`            | `string`                       | Formatted phone number string                                |
| `onChange`         | `(val: string) => void`        | Called with the formatted display value                      |
| `locale`           | `string`                       | Locale key (`en`, `tr`, `fr`, etc.)                          |
| `initialCountry`   | `string`                       | Initial country ISO2 code (`TR`, `US`, etc.)                 |
| `theme`            | `"dark"` \| `"light"`          | Theme mode                                                   |
| `variant`          | `"classic" \| "minimal" \| "soft" \| "pill"` | Built-in visual treatment                     |
| `searchPlaceholder`| `string`                       | Country search input placeholder                             |
| `mobileOnly`       | `boolean`                      | If true, only mobile numbers are considered valid            |
| `onRawChange`      | `(raw: string) => void`        | Callback for the E.164 phone number                          |
| `onValidChange`    | `(valid: boolean) => void`     | Callback to track if phone number is valid                   |
| `countrySelectorLabel` | `string`                  | Accessible label for the country selector                    |
| `noResultsText`    | `string`                       | Empty-state text for country search                          |
| `flagMode`         | `"cdn" \| "emoji" \| "none"` | Built-in flag rendering strategy                         |
| `renderFlag`       | `(country, context) => ReactNode` | Overrides built-in flag rendering                         |
| `virtualizeThreshold` | `number`                    | Number of results after which list virtualization starts     |

Native input attributes such as `name`, `required`, `disabled`, `onBlur`,
`autoComplete`, and `aria-*` are forwarded to the telephone input.

Use `flagMode="emoji"` for a fully offline flag display, or `flagMode="none"`
when flags are not needed. `renderFlag` can render a local SVG, icon component,
or any other React node.

---

## 🧱 Styling

You must import styles manually:

```tsx
import "react-phonebox/style.css";
```

You can override any class via CSS or use CSS variables for customization.

---

## 🌐 Languages Supported

Static JSON translations for:

- English (`en`)
- Turkish (`tr`)
- Arabic (`ar`)
- Urdu (`ur`)
- French (`fr`)
- Spanish (`es`)

Other locales use `Intl.DisplayNames` when the runtime supports them.

---

## 🛆 License

MIT

---

## 🔗 Live Demo

Check out the live demo: [react-phonebox demo](https://frkngnc.github.io/react-phonebox/demo)

> Developed by [frkngnc](https://github.com/frkngnc)
