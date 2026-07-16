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

function limitPhoneInput(
  value: string,
  country: Country | null,
  example: ReturnType<typeof useExampleNumber>["example"]
): string {
  const trimmed = value.trimStart();
  const hasInternationalPrefix = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");

  if (!example) {
    return `${hasInternationalPrefix ? "+" : ""}${digits.slice(0, 15)}`;
  }

  const significantDigits = example.nationalNumber.replace(/\D/g, "");
  const formattedNationalDigits = example.formatNational().replace(/\D/g, "");
  const nationalPrefix = formattedNationalDigits.endsWith(significantDigits)
    ? formattedNationalDigits.slice(0, -significantDigits.length)
    : "";
  const dialCodeDigits = country?.dialCode.replace(/\D/g, "") ?? "";
  const maxDigits = hasInternationalPrefix
    ? dialCodeDigits.length + significantDigits.length
    : nationalPrefix && digits.startsWith(nationalPrefix)
      ? formattedNationalDigits.length
      : significantDigits.length;

  return `${hasInternationalPrefix ? "+" : ""}${digits.slice(0, maxDigits)}`;
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
  const { placeholder, example } = useExampleNumber(country?.iso2);
  const limitedValue = useMemo(
    () => limitPhoneInput(value, country, example),
    [country, example, value]
  );
  const phoneNumber = useMemo(
    () => getPhoneNumberState(limitedValue, country?.iso2, mobileOnly),
    [country?.iso2, limitedValue, mobileOnly]
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
        getPhoneNumberState(
          limitPhoneInput(nextValue, country, example),
          country?.iso2,
          mobileOnly
        ).formatted
      );
    },
    [country, example, mobileOnly, onChange]
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
