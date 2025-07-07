# 📦 Changelog

## [2.0.0] - 2025-07-07

### ✨ Added
- `PhoneBoxInput`: A new headless UI component exposing full control via props.
- `PhoneBox`: A higher-level smart component with built-in logic (formatting, validation, example numbers).
- `useFormatter`: Hook to auto-format user input using libphonenumber-js.
- `useExampleNumber`: Hook to generate dynamic placeholders and max digit limits.
- `useMobileOnly`: Hook for validating mobile-only or general phone numbers.
- `useCountries`: Hook to handle country list, initial country, and selection logic.
- RTL support and dynamic `dir` detection.
- `onRawChange` and `onValidChange` callbacks for raw number and validation updates.

### 🔧 Changed
- Modularized internal structure for lighter imports (tree-shaking friendly).
- Removed `getExampleNumber` and `AsYouType` from core bundle unless explicitly used.
- Reorganized file structure into `core`, `hooks`, and `utils`.
- Country data loading is now fully async and i18n-ready (via `langs/*.json`).
- Style import now resides in `style.css` and must be included by consumer explicitly.

### 🧪 Improved
- Dramatically reduced bundle size (~55kb gzip with base component).
- Flag icons now loaded from CDN with caching-friendly URLs.
- Debounced country search input for better performance.

### 🛠️ Breaking Changes
- Default export removed. Use named imports instead:
  ```ts
  import { PhoneBox, PhoneBoxInput } from 'react-phonebox';