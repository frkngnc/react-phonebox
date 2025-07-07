/// <reference types="vite/client" />
import metadata from "libphonenumber-js/metadata.min.json";
import { getCountryCallingCode } from "libphonenumber-js";

export type Country = {
  name: string;
  iso2: string;
  dialCode: string;
};

const EXCLUDED_CODES = ["AC", "TA", "XK", "ZZ"];

const locales = import.meta.glob("../utils/langs/*.json", {
  eager: true,
}) as Record<string, { default: Record<string, string> }>;

const countryCache = new Map<string, Country[]>();

export async function loadCountries(locale: string = "en"): Promise<Country[]> {
  if (countryCache.has(locale)) {
    return countryCache.get(locale)!;
  }

  let translations: Record<string, string> = {};

  const availableKey = Object.keys(locales).find((key) =>
    key.endsWith(`/${locale}.json`)
  );
  const fallbackKey = Object.keys(locales).find((key) =>
    key.endsWith("/en.json")
  );

  if (availableKey && locales[availableKey]) {
    translations = locales[availableKey].default;
  } else if (fallbackKey && locales[fallbackKey]) {
    console.warn("Fallback to English");
    translations = locales[fallbackKey].default;
    locale = "en";
  } else {
    console.error("No valid locale files found.");
    return [];
  }

  const isoCodes = Object.keys(metadata.countries).filter(
    (iso2) => !EXCLUDED_CODES.includes(iso2)
  );

  const countries: Country[] = isoCodes.map((iso2) => {
    const name =
      translations[iso2.toUpperCase()] ||
      translations[iso2.toLowerCase()] ||
      iso2;

    let dialCode = "";
    try {
      dialCode = "+" + getCountryCallingCode(iso2 as any);
    } catch {
      console.warn("No dial code found for", iso2);
    }

    return {
      name,
      iso2,
      dialCode,
    };
  });

  const sorted = countries.sort((a, b) => a.name.localeCompare(b.name, locale));

  countryCache.set(locale, sorted);
  return sorted;
}