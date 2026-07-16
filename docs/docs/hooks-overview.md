
# Hooks Overview

This section provides detailed information about the custom React hooks provided by **react-phonebox**.
These hooks allow for full control over formatting, validation, placeholder generation, and country selection.

---

## 🧩 useFormatter

Formats a given phone number string according to the selected country.

```tsx
import { useFormatter } from 'react-phonebox';

const { format } = useFormatter('TR');
const formatted = format('05012345678');
```

### Returns:
- `format(input: string): string` - Formats input using the selected country and
  libphonenumber-js `AsYouType`.

---

## 🔢 useExampleNumber

Generates an example number and placeholder for the selected country.

```tsx
import { useExampleNumber } from 'react-phonebox';

const { placeholder, example, maxDigits } = useExampleNumber('US');
```

### Returns:
- `placeholder` - Example-based national format string (e.g. `201-555-0123`)
- `example` - Example number object with formatting methods
- `maxDigits` - Maximum national input length for the example format, including
  a national trunk prefix when the selected country uses one.

---

## 📱 useMobileOnly

Validates a phone number and ensures it's a mobile number if `mobileOnly = true`.

```tsx
import { useMobileOnly } from 'react-phonebox';

const { validate } = useMobileOnly();
const result = validate('05012345678', true, 'TR');

if (result.isValid) {
  console.log(result.parsed); // +905012345678
}
```

### Returns:
- `validate(value: string, mobileOnly: boolean, country?: string)` → `{ isValid: boolean; parsed?: string }`

The optional country code allows national input, including trunk prefixes such as
`0`, to be parsed into the correct E.164 value.

---

## 🌍 useCountries

Loads all countries with localized names and dial codes.

```tsx
import { useCountries } from 'react-phonebox';

const { countries, selectedCountry, setSelectedCountry } = useCountries('tr', 'TR');
```

### Returns:
- `countries`: Array of `{ name, iso2, dialCode }`
- `selectedCountry`: Currently selected country
- `setSelectedCountry(country)`: Manually update selection

---
