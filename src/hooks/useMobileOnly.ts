import { useCallback } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";

export function useMobileOnly() {
  const validate = useCallback(
    (rawNumber: string, mobileOnly: boolean): { isValid: boolean; parsed?: string } => {
      const parsed = parsePhoneNumberFromString(rawNumber);
      if (!parsed || !parsed.isValid()) {
        return { isValid: false };
      }

      const type = parsed.getType?.();
      const isMobile = type === "MOBILE" || type === "FIXED_LINE_OR_MOBILE";

      if (mobileOnly && !isMobile) {
        return { isValid: false };
      }

      return { isValid: true, parsed: parsed.number };
    },
    []
  );

  return { validate };
}