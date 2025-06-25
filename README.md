# 📱 React PhoneBox

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
import { PhoneBox } from "react-phonebox";
import { useState } from "react";

function App() {
  const [phone, setPhone] = useState("");

  return (
    <PhoneBox
      value={phone}
      onChange={(val) => setPhone(val)}
      locale="en"
      initialCountry="us"
      onValidityChange={(isValid) => console.log("Valid:", isValid)}
      onCountryChange={(country) => console.log("Country:", country)}
    />
  );
}
```

## 🧪 Props

| Prop              | Type                          | Description                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| `value`           | `string`                      | Current phone number value                                |
| `onChange`        | `(value: string) => void`     | Triggered on input change                                 |
| `locale`          | `string`                      | Language key (`en`, `tr`, `fr`, etc.)                     |
| `initialCountry`  | `string`                      | ISO 3166-1 alpha-2 country code (e.g. `tr`, `us`)         |
| `onCountryChange` | `(country: Country) => void`  | Returns selected country object                           |
| `onValidityChange`| `(valid: boolean) => void`    | Returns whether current phone is valid                    |

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

> Developed with ❤️ by [frkngnc](https://github.com/frkngnc)