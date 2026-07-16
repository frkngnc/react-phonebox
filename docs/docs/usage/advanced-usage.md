# Advanced Usage

If you need full control over formatting, placeholder, validation logic, or want to combine with external form libraries, use `PhoneBoxInput` along with our powerful hooks.

This allows you to:

- 🎯 Control the formatting logic
- 🧪 Use custom validation
- 🌍 Localize everything
- 🔁 Handle selected country manually

---

## Import

```tsx
import {
  type Country,
  PhoneBoxInput,
  useFormatter,
  useExampleNumber,
  useMobileOnly,
} from 'react-phonebox';
import 'react-phonebox/style.css';
```

---

## Example

```tsx
'use client';
import React, { useState } from 'react';
import {
  type Country,
  PhoneBoxInput,
  useFormatter,
  useExampleNumber,
  useMobileOnly,
} from 'react-phonebox';
import 'react-phonebox/style.css';

export default function AdvancedExample() {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState<Country>({
    iso2: 'TR',
    dialCode: '+90',
    name: 'Turkey',
  });

  const { format } = useFormatter(country.iso2);
  const { placeholder, example } = useExampleNumber(country.iso2);
  const { validate } = useMobileOnly();

  const formatted = format(value);
  const validation = validate(value, false, country.iso2);

  return (
    <div>
      <PhoneBoxInput
        value={formatted}
        onChange={setValue}
        initialCountry="TR"
        locale="tr"
        theme="dark"
        searchPlaceholder="Ülke ara..."
        onCountryChange={setCountry}
        placeholder={placeholder}
      />

      <p><strong>Placeholder:</strong> {placeholder}</p>
      <p><strong>Raw:</strong> {validation.parsed ?? ''}</p>
      <p><strong>Valid:</strong> {validation.isValid ? 'Yes' : 'No'}</p>
      {example && (
        <p><strong>Example:</strong> {example.formatInternational()}</p>
      )}
    </div>
  );
}
```

---

## Hooks

| Hook | Description |
|------|-------------|
| `useFormatter(iso2)` | Returns a formatter to live-format digits |
| `useExampleNumber(iso2)` | Returns an example number and placeholder |
| `useMobileOnly()` | Returns a validator function for mobile-only or general numbers |

---
