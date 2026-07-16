---
id: getting-started
title: Getting Started
slug: /
---

# Getting Started

Welcome to **react-phonebox**, a lightweight, customizable and i18n-ready phone input component for React.

:::info Current release
These docs describe React PhoneBox 2.1.0.
:::

## ✨ Features

- Built-in country selector with flags and dialing codes
- Locale-based country names with `Intl.DisplayNames` fallback
- Country-aware formatting and E.164 output using `libphonenumber-js`
- General or mobile-only validation
- Classic, minimal, soft, and pill design variants
- CDN, emoji, hidden, or custom flag rendering
- Keyboard-accessible and virtualized country selection
- Light, dark, RTL, and native input attribute support
- TypeScript support
- Modular component and hook APIs

## 📦 Installation

```bash
npm install react-phonebox
# or
yarn add react-phonebox
```

## 🔌 Peer Dependencies

React and React DOM are peer dependencies and must be available in your project:

- `react >=17`
- `react-dom >=17`
```bash
npm install react react-dom
```

---

Now you're ready to use `PhoneBox` or `PhoneBoxInput`!

➡️ Head over to the [Usage section](./usage/basic-usage) to learn more.

## Live Demo

Compare all four variants, switch between light and dark themes, and inspect the
formatted, E.164, and validity outputs in the
[interactive demo](https://frkngnc.github.io/react-phonebox/demo).
