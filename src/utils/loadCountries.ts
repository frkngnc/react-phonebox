import metadata from "libphonenumber-js/metadata.min.json";
import { getCountryCallingCode } from "libphonenumber-js";
import ar from "./langs/ar.json";
import en from "./langs/en.json";
import es from "./langs/es.json";
import fr from "./langs/fr.json";
import tr from "./langs/tr.json";
import ur from "./langs/ur.json";

export type Country = {
  name: string;
  iso2: string;
  dialCode: string;
};

const EXCLUDED_CODES = ["AC", "TA", "XK", "ZZ"];

const locales: Record<string, Record<string, string>> = {
  ar,
  en,
  es,
  fr,
  tr,
  ur,
};

const countryCache = new Map<string, Country[]>();

export async function loadCountries(locale: string = "en"): Promise<Country[]> {
  const requestedLocale = locale || "en";
  const cacheKey = requestedLocale.toLowerCase();

  if (countryCache.has(cacheKey)) {
    return countryCache.get(cacheKey)!;
  }

  const localeKey = requestedLocale.toLowerCase().split(/[-_]/)[0];

  const translations = locales[localeKey] ?? {};
  const englishTranslations = locales.en;

  let displayNames: Intl.DisplayNames | undefined;
  try {
    displayNames = new Intl.DisplayNames([requestedLocale], { type: "region" });
  } catch {
    try {
      displayNames = new Intl.DisplayNames(["en"], { type: "region" });
    } catch {
      displayNames = undefined;
    }
  }

  const isoCodes = Object.keys(metadata.countries).filter(
    (iso2) => !EXCLUDED_CODES.includes(iso2)
  );

  const countries: Country[] = isoCodes.map((iso2) => {
    const name =
      translations[iso2.toUpperCase()] ||
      translations[iso2.toLowerCase()] ||
      displayNames?.of(iso2) ||
      englishTranslations[iso2.toUpperCase()] ||
      englishTranslations[iso2.toLowerCase()] ||
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

  const sorted = countries.sort((a, b) => {
    try {
      return a.name.localeCompare(b.name, requestedLocale);
    } catch {
      return a.name.localeCompare(b.name, "en");
    }
  });

  countryCache.set(cacheKey, sorted);
  return sorted;
}
