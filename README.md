# 📱 React PhoneBox
[![npm version](https://img.shields.io/npm/v/react-phonebox.svg)](https://www.npmjs.com/package/react-phonebox)

A lightweight, customizable, and i18n-ready phone number input component with country selection, flag icons, validation, and formatting — powered by [`libphonenumber-js`](https://github.com/catamphetamine/libphonenumber-js).

## ✨ Features

- 🌍 Locale-based country names (supports `en`, `tr`, `fr`, `de`, `ar`, `es`, `ur`, etc.)
- 📞 Auto-formats and validates numbers using libphonenumber-js
- 🇺🇳 Flag icons from [flagcdn.com](https://flagcdn.com)
- 🔍 Debounced country search
- 😦 Validity feedback
- 💡 Built-in RTL support

## 🚀 Installation

```bash
npm install react-phonebox
# or
yarn add react-phonebox
```

## 🔧 Usage

```tsx
import { useState } from "react";
import { PhoneBox } from "react-phonebox";
import "react-phonebox/dist/PhoneBox.css";

function App() {
  const [phone, setPhone] = useState("");
  const [rawPhone, setRawPhone] = useState("");

  return (
    <PhoneBox
      value={phone}
      onChange={(val) => setPhone(val)}
      onRawChange={(rawVal) => setRawPhone(rawVal)}
      locale="en"
    />
  );
}
```

## 🧪 Props

| Prop               | Type                         | Description                                                      |
| ------------------ | ---------------------------- | ---------------------------------------------------------------- |
| `value`            | `string`                     | Current phone number value                                       |
| `onChange`         | `(value: string) => void`    | Triggered on input change                                        |
| `onRawChange`      | `(raw: string) => void`      | Triggered on input change (raw numeric value without formatting) |
| `locale`           | `string`                     | Language key (`en`, `tr`, `fr`, etc.)                            |
| `initialCountry`   | `string`                     | ISO 3166-1 alpha-2 country code (e.g. `tr`, `us`)                |
| `onCountryChange`  | `(country: Country) => void` | Returns selected country object                                  |
| `onValidityChange` | `(valid: boolean) => void`   | Returns whether current phone is valid                           |
| `searchPlaceholder`| `string`                     | Placeholder text for the country search input                    |


## 🌐 Languages Supported

Currently includes static JSON translations for:

- English (`en`)
- Turkish (`tr`)
- Arabic (`ar`)
- Urdu (`ur`)
- German (`de`)
- French (`fr`)
- Spanish (`es`)

## 🧱 Styling

Basic styles are included via `PhoneBox.css`. You can customize it or override styles via your own stylesheet.

## 🛆 License

MIT

---

## 🔗 Live Demo

Check out the live demo: [react-phonebox demo](https://react-phonebox-demo.vercel.app)

> Developed with 🎉​ by [frkngnc](https://github.com/frkngnc)
