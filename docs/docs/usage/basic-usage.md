# Basic Usage

The `PhoneBox` component is the easiest way to get started. It includes:

- ✅ Country selection dropdown  
- ✅ Phone number formatting  
- ✅ Example-based placeholder  
- ✅ Mobile number validation (optional)  

---

## 📦 Import

```ts
import { PhoneBox } from 'react-phonebox';
import 'react-phonebox/style.css';
```

---

## 🚀 Example

```tsx
'use client';
import React, { useState } from 'react';
import { PhoneBox } from 'react-phonebox';
import 'react-phonebox/style.css';

export default function Example() {
  const [value, setValue] = useState('');
  const [raw, setRaw] = useState('');
  const [valid, setValid] = useState(false);

  return (
    <>
      <PhoneBox
        value={value}
        onChange={setValue}
        onRawChange={setRaw}
        onValidChange={setValid}
        initialCountry="US"
        locale="en"
        theme="dark"
        variant="soft"
        searchPlaceholder="Search country"
        flagMode="emoji"
        mobileOnly
      />

      <p>Formatted: {value || '-'}</p>
      <p>Raw: {raw || '-'}</p>
      <p>Valid: {value ? (valid ? 'Yes' : 'No') : '-'}</p>
    </>
  );
}
```

---

## 🧾 Props

| Prop             | Type                                 | Default     | Description                                               |
|------------------|--------------------------------------|-------------|-----------------------------------------------------------|
| `value`          | `string`                             | `""`        | The formatted phone number                                |
| `onChange`       | `(value: string) => void`            | -           | Called with the formatted display value                  |
| `onRawChange`    | `(raw: string) => void`              | -           | Optional. Called with the E.164 value                     |
| `onValidChange`  | `(isValid: boolean) => void`         | -           | Optional. Called with validation result                   |
| `initialCountry` | `string` (ISO2)                      | `"US"`      | Default selected country                                  |
| `locale`         | `string`                             | `"en"`      | Used for localized country names                          |
| `theme`          | `'dark'` \| `'light'`               | `'dark'`    | Input theme                                               |
| `variant`        | `'classic' \| 'minimal' \| 'soft' \| 'pill'` | `'classic'` | Built-in visual treatment                          |
| `searchPlaceholder` | `string`                         | `'Search...'`| Placeholder for the country search field                 |
| `mobileOnly`     | `boolean`                            | `false`     | Only allow mobile-type numbers                            |
| `countrySelectorLabel` | `string`                       | `'Select country'` | Accessible label for the country selector          |
| `noResultsText`  | `string`                             | `'No countries found'` | Country search empty-state text                    |
| `flagMode`       | `'cdn' \| 'emoji' \| 'none'`        | `'cdn'`     | Built-in flag rendering mode                       |
| `renderFlag`     | `(country, context) => ReactNode`     | -           | Custom flag renderer                               |
| `virtualizeThreshold` | `number`                        | `80`        | Result count after which virtualization starts     |

---

Standard telephone input attributes such as `name`, `required`, `disabled`,
`onBlur`, `autoComplete`, and `aria-*` are forwarded to the native input.

Country names missing from a bundled translation are resolved through
`Intl.DisplayNames`. This also allows locales such as `de-DE` to display localized
country names even without a dedicated JSON file.

`onChange` is intended for the formatted value shown to the user. Store the
`onRawChange` value when your API or database expects an E.164 number such as
`+905321234567`.
