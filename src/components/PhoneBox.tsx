import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PhoneBoxInput, PhoneBoxInputProps } from "./PhoneBoxInput";
import { useExampleNumber } from "../hooks/useExampleNumber";
import { Country } from "../utils/loadCountries";
import { getCountryCallingCode, CountryCode } from "libphonenumber-js";
import { getPhoneNumberState } from "../utils/phoneNumber";
import "../styles/PhoneBox.css";

export type PhoneBoxProps = Omit<
  PhoneBoxInputProps,
  "onCountryChange" | "placeholder"
> & {
  mobileOnly?: boolean;
  onRawChange?: (raw: string) => void;
  onValidChange?: (isValid: boolean) => void;
};

function createCountry(iso2?: string): Country | null {
  if (!iso2) return null;

  try {
    const iso = iso2.toUpperCase();
    const dialCode = "+" + getCountryCallingCode(iso as CountryCode);
    return { iso2: iso, dialCode, name: iso };
  } catch {
    console.warn("Invalid initialCountry code");
    return null;
  }
}

export const PhoneBox: React.FC<PhoneBoxProps> = ({
  value,
  onChange,
  locale = "en",
  initialCountry = "US",
  theme = "dark",
  searchPlaceholder = "Search...",
  mobileOnly = false,
  onRawChange,
  onValidChange,
  ...inputProps
}) => {
  const [country, setCountry] = useState<Country | null>(() =>
    createCountry(initialCountry)
  );
  const { placeholder } = useExampleNumber(country?.iso2);
  const phoneNumber = useMemo(
    () => getPhoneNumberState(value, country?.iso2, mobileOnly),
    [country?.iso2, mobileOnly, value]
  );

  useEffect(() => {
    onRawChange?.(phoneNumber.raw);
  }, [onRawChange, phoneNumber.raw]);

  useEffect(() => {
    onValidChange?.(phoneNumber.isValid);
  }, [onValidChange, phoneNumber.isValid]);

  const handleChange = useCallback(
    (nextValue: string) => {
      onChange(
        getPhoneNumberState(nextValue, country?.iso2, mobileOnly).formatted
      );
    },
    [country?.iso2, mobileOnly, onChange]
  );

  return (
    <PhoneBoxInput
      {...inputProps}
      value={phoneNumber.formatted}
      onChange={handleChange}
      onCountryChange={setCountry}
      locale={locale}
      initialCountry={initialCountry}
      searchPlaceholder={searchPlaceholder}
      theme={theme}
      placeholder={placeholder}
    />
  );
};
