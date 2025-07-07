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
    <PhoneBox
      value={value}
      onChange={setValue}
      onRawChange={setRaw}
      onValidChange={setValid}
      initialCountry="US"
      locale="en"
      theme="dark"
      searchPlaceholder="Search Country.."
      mobileOnly={true}
    />
  );
}
```

---

## 🧾 Props

| Prop             | Type                                 | Default     | Description                                               |
|------------------|--------------------------------------|-------------|-----------------------------------------------------------|
| `value`          | `string`                             | `""`        | The formatted phone number                                |
| `onChange`       | `(value: string) => void`            | –           | Called on input change                                    |
| `onRawChange`    | `(raw: string) => void`              | –           | Optional. Called with raw value including dial code       |
| `onValidChange`  | `(isValid: boolean) => void`         | –           | Optional. Called with validation result                   |
| `initialCountry` | `string` (ISO2)                      | `"US"`      | Default selected country                                  |
| `locale`         | `string`                             | `"en"`      | Used for localized country names                          |
| `theme`          | `'dark'` \| `'light'`               | `'dark'`    | Input theme                                               |
| `searchPlaceholder` | `string`                         | `'Search...'`| Placeholder for the country search field                 |
| `mobileOnly`     | `boolean`                            | `false`     | Only allow mobile-type numbers                            |

---
