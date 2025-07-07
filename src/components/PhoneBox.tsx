import React, { useState, useEffect } from "react";
import { PhoneBoxInput } from "./PhoneBoxInput";
import { useFormatter } from "../hooks/useFormatter";
import { useExampleNumber } from "../hooks/useExampleNumber";
import { useMobileOnly } from "../hooks/useMobileOnly";
import { Country } from "../utils/loadCountries";
import { getCountryCallingCode, CountryCode } from "libphonenumber-js";
import "../styles/PhoneBox.css";

type PhoneBoxProps = {
  value: string;
  onChange: (value: string) => void;
  locale?: string;
  initialCountry?: string;
  theme?: "dark" | "light";
  searchPlaceholder?: string;
  mobileOnly?: boolean;
  onRawChange?: (raw: string) => void;
  onValidChange?: (isValid: boolean) => void;
};

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
}) => {
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (country || !initialCountry) return;

    try {
      const iso = initialCountry.toUpperCase();
      const dial = "+" + getCountryCallingCode(iso as CountryCode);
      setCountry({ iso2: iso, dialCode: dial, name: iso });
    } catch {
      console.warn("Invalid initialCountry code");
    }
  }, [initialCountry, country]);

  const { format } = useFormatter(country?.iso2);
  const { placeholder, maxDigits } = useExampleNumber(country?.iso2);
  const { validate } = useMobileOnly();

  const digits = value.replace(/\D/g, "").slice(0, maxDigits ?? 15);
  const formatted = format(digits);
  const raw = (country?.dialCode ?? "") + digits;
  const validation = validate(raw, mobileOnly);

  useEffect(() => {
    onRawChange?.(raw);
  }, [raw]);

  useEffect(() => {
    onValidChange?.(validation.isValid);
  }, [validation.isValid]);

  return (
    <PhoneBoxInput
      value={formatted}
      onChange={onChange}
      onCountryChange={setCountry}
      locale={locale}
      initialCountry={initialCountry}
      searchPlaceholder={searchPlaceholder}
      theme={theme}
      placeholder={placeholder}
    />
  );
};