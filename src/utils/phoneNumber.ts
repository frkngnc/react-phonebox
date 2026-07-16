import { AsYouType, CountryCode } from "libphonenumber-js/max";

export type PhoneNumberState = {
  formatted: string;
  raw: string;
  isValid: boolean;
  isMobile: boolean;
};

function sanitizePhoneInput(value: string): string {
  const trimmed = value.trimStart();
  const prefix = trimmed.startsWith("+") ? "+" : "";
  return prefix + trimmed.replace(/\D/g, "");
}

function getCountryCode(iso2?: string): CountryCode | undefined {
  const normalized = iso2?.trim().toUpperCase();
  return normalized && /^[A-Z]{2}$/.test(normalized)
    ? (normalized as CountryCode)
    : undefined;
}

export function getPhoneNumberState(
  value: string,
  iso2?: string,
  mobileOnly = false
): PhoneNumberState {
  const input = sanitizePhoneInput(value);

  if (!input) {
    return { formatted: "", raw: "", isValid: false, isMobile: false };
  }

  try {
    const formatter = new AsYouType(getCountryCode(iso2));
    const formatted = formatter.input(input);
    const phoneNumber = formatter.getNumber();
    const type = phoneNumber?.getType?.();
    const isMobile = type === "MOBILE" || type === "FIXED_LINE_OR_MOBILE";
    const isValid = Boolean(
      phoneNumber?.isValid() && (!mobileOnly || isMobile)
    );

    return {
      formatted,
      raw: phoneNumber?.number ?? "",
      isValid,
      isMobile,
    };
  } catch {
    return {
      formatted: input,
      raw: "",
      isValid: false,
      isMobile: false,
    };
  }
}
