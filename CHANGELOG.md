# Changelog

## [2.1.0] - 2026-07-16

### Added
- Added `classic`, `minimal`, `soft`, and `pill` design variants through the new `variant` prop.
- Added `flagMode` options for CDN images, native emoji, and flag-free rendering.
- Added `renderFlag` for local assets and fully custom flag components.
- Added accessible country-list virtualization with the configurable `virtualizeThreshold` prop.
- Added keyboard navigation, focus restoration, listbox semantics, and accessible empty states to the country selector.
- Added forwarding for native telephone input attributes such as `name`, `required`, `disabled`, `onBlur`, `autoComplete`, and `aria-*`.
- Added public exports for `PhoneBoxProps`, `PhoneBoxInputProps`, `PhoneBoxVariant`, `Country`, and `useCountries`.
- Added an interactive Docusaurus demo for comparing every variant in light and dark themes.
- Added automated coverage for parsing, validation, localization, design variants, and accessibility behavior.

### Changed
- `PhoneBox` now calls `onChange` with the formatted display value. Use `onRawChange` for the E.164 value.
- Country names missing from bundled translations now fall back to `Intl.DisplayNames`, including locales without a dedicated JSON file.
- Country translations use bundler-independent static imports so the package source works in Vite and Docusaurus builds.
- React, React DOM, and `libphonenumber-js` are externalized from the library bundle.
- Package output now uses explicit ESM and CommonJS entry points and includes generated TypeScript declarations.

### Fixed
- Parse national numbers with their selected country before producing E.164 output.
- Preserve national trunk prefixes such as `0` without duplicating them after the country code.
- Limit input to the selected country's example format while accounting for national trunk prefixes and international dial codes.
- Support Unicode country-name search and `00` international dialing-prefix queries.
- Keep country selection synchronized when `initialCountry` changes.
- Remove the heavy focus outline from the telephone and country-search text fields.

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
