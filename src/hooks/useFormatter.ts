import { useMemo } from "react";
import { AsYouType, CountryCode } from "libphonenumber-js";

export function useFormatter(iso2?: string) {
  const formatter = useMemo(() => {
    if (!iso2) return null;
    return new AsYouType(iso2.toUpperCase() as CountryCode);
  }, [iso2]);

  const format = (input: string) => {
    if (!formatter) return input;
    formatter.reset();
    return formatter.input(input);
  };

  return {
    formatter,
    format,
  };
}