# React PhoneBox

[![npm version](https://img.shields.io/npm/v/react-phonebox.svg)](https://www.npmjs.com/package/react-phonebox)

A lightweight, customizable, and i18n-ready phone number input component with country selection, flag icons, validation, and formatting — powered by [`libphonenumber-js`](https://github.com/catamphetamine/libphonenumber-js).

---

## ✨ Features

- 🌍 Locale-based country names (supports `en`, `tr`, `fr`, `de`, `ar`, `es`, `ur`, etc.)
- 📞 Auto-formats and validates numbers using libphonenumber-js
- 🇺🇳 Flag icons from [flagcdn.com](https://flagcdn.com)
- 🔍 Debounced country search with intelligent filtering
- ✅ Validity feedback via callback
- 🌗 Light & Dark theme support
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
    <PhoneBox
      value={phone}
      onChange={setPhone}
      onRawChange={setRawPhone}
      onValidChange={setIsValid}
      locale="tr"
      initialCountry="TR"
      theme="dark"
      searchPlaceholder="Ülke ara..."
      mobileOnly
    />
  );
}
```

---

## ⚙️ Advanced Usage (Full Control)

```tsx
import { useState } from "react";
import {
  PhoneBoxInput,
  useFormatter,
  useExampleNumber,
  useMobileOnly
} from "react-phonebox";
import "react-phonebox/style.css";

function PhoneInputWithHooks() {
  const [value, setValue] = useState("");
  const [country, setCountry] = useState<any>({
    iso2: "TR",
    dialCode: "+90",
    name: "Turkey"
  });

  const { format } = useFormatter(country?.iso2);
  const { placeholder, example, maxDigits } = useExampleNumber(country?.iso2);
  const { validate } = useMobileOnly();

  const digits = value.replace(/\D/g, "").slice(0, maxDigits ?? 15);
  const formatted = format(digits);
  const raw = (country?.dialCode ?? "") + digits;
  const validation = validate(raw, false);

  return (
    <>
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
    </>
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
| `onChange`         | `(val: string) => void`        | Input value change handler                                   |
| `locale`           | `string`                       | Locale key (`en`, `tr`, `fr`, etc.)                          |
| `initialCountry`   | `string`                       | Initial country ISO2 code (`TR`, `US`, etc.)                 |
| `theme`            | `"dark"` \| `"light"`          | Theme mode                                                   |
| `searchPlaceholder`| `string`                       | Country search input placeholder                             |
| `mobileOnly`       | `boolean`                      | If true, only mobile numbers are considered valid            |
| `onRawChange`      | `(raw: string) => void`        | Callback for raw (unformatted) phone number                  |
| `onValidChange`    | `(valid: boolean) => void`     | Callback to track if phone number is valid                   |

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
- German (`de`)
- French (`fr`)
- Spanish (`es`)

---

## 🛆 License

MIT

---

## 🔗 Live Demo

Check out the live demo: [react-phonebox demo](https://react-phonebox-demo.vercel.app)

> Developed with ❤️ by [frkngnc](https://github.com/frkngnc)