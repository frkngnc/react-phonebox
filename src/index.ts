export { PhoneBoxInput } from "./components/PhoneBoxInput";
export type {
  PhoneBoxFlagMode,
  PhoneBoxFlagRenderer,
  PhoneBoxInputProps,
  PhoneBoxVariant,
} from "./components/PhoneBoxInput";
export { PhoneBox } from "./components/PhoneBox";
export type { PhoneBoxProps } from "./components/PhoneBox";

export { useFormatter } from "./hooks/useFormatter";
export { useExampleNumber } from "./hooks/useExampleNumber";
export { useMobileOnly } from "./hooks/useMobileOnly";
export { useCountries } from "./hooks/useCountries";
export type { Country } from "./utils/loadCountries";

import "./styles/PhoneBox.css";
