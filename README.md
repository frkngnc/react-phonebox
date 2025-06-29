# React PhoneBox
[![npm version](https://img.shields.io/npm/v/react-phonebox.svg)](https://www.npmjs.com/package/react-phonebox)

A lightweight, customizable, and i18n-ready phone number input component with country selection, flag icons, validation, and formatting — powered by [`libphonenumber-js`](https://github.com/catamphetamine/libphonenumber-js).

## ✨ Features

- 🌍 Locale-based country names (supports `en`, `tr`, `fr`, `de`, `ar`, `es`, `ur`, etc.)
- 📞 Auto-formats and validates numbers using libphonenumber-js
- 🇺🇳 Flag icons from [flagcdn.com](https://flagcdn.com)
- 🔍 Debounced country search with intelligent filtering
- 😦 Validity feedback via callback
- 🌓 Light & Dark theme support via `theme` prop
- 💡 Built-in RTL support
- ✨ Customizable input mask formatting (single char mask like `*`, `-`, `.` or example number mask)

## 🚀 Installation

```bash
npm install react-phonebox
# or
yarn add react-phonebox
```

## 🔧 Basic Usage

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
      onChange={setPhone}
      onRawChange={setRawPhone}
    />
  );
}
```

## 🧪 Props

| Prop               | Type                         | Description                                                                               |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------------------------|
| `value`            | `string`                     | Current phone number value                                                                |
| `onChange`         | `(value: string) => void`    | Triggered on input change                                                                 |
| `onRawChange`      | `(raw: string) => void`      | Triggered on input change (raw numeric value without formatting)                          |
| `locale`           | `string`                     | Language key (`en`, `tr`, `fr`, etc.)                                                     |
| `initialCountry`   | `string`                     | ISO 3166-1 alpha-2 country code (e.g. `tr`, `us`)                                         |
| `onCountryChange`  | `(country: Country) => void` | Returns selected country object                                                           |
| `onValidityChange` | `(valid: boolean) => void`   | Returns whether current phone is valid                                                    |
| `searchPlaceholder`| `string`                     | Placeholder text for the country search input                                             |
| `mask`             | `"exampleNumber"`            | Accepts only special characters like `*`, `-`, `.`, etc., or the string `"exampleNumber"` |
| `theme`            | `string`                     | dark & light                                                                               | 


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

Basic styles are included via `PhoneBox.css`. Supports both dark and light themes via theme prop.
You can customize or override styles by importing your own CSS and/or overriding CSS variables.. 


## 🛆 License

MIT

---

## 🔗 Live Demo

Check out the live demo: [react-phonebox demo](https://react-phonebox-demo.vercel.app)

> Developed with 🎉​ by [frkngnc](https://github.com/frkngnc)
