import { useMemo } from "react";
import { getExampleNumber, CountryCode } from "libphonenumber-js/max";
import examples from "libphonenumber-js/examples.mobile.json";

export function useExampleNumber(iso2?: string, mask?: string) {
  const example = useMemo(() => {
    if (!iso2) return undefined;
    try {
      return getExampleNumber(iso2.toUpperCase() as CountryCode, examples);
    } catch {
      return undefined;
    }
  }, [iso2]);

  const placeholder = useMemo(() => {
    if (!example) return "";
    const nationalFormat = example.formatNational();
    if (mask === "exampleNumber") return nationalFormat;
    if (typeof mask === "string" && mask.length === 1 && !/[a-zA-Z]/.test(mask)) {
      return nationalFormat.replace(/\d/g, mask);
    }
    return nationalFormat;
  }, [example, mask]);

  const maxDigits = example?.nationalNumber?.length ?? 15;

  return { example, placeholder, maxDigits };
}