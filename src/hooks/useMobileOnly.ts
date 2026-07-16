import { useCallback } from "react";
import { getPhoneNumberState } from "../utils/phoneNumber";

export function useMobileOnly() {
  const validate = useCallback(
    (
      rawNumber: string,
      mobileOnly: boolean,
      country?: string
    ): { isValid: boolean; parsed?: string } => {
      const result = getPhoneNumberState(rawNumber, country, mobileOnly);

      if (!result.isValid) {
        return { isValid: false };
      }

      return { isValid: true, parsed: result.raw };
    },
    []
  );

  return { validate };
}
