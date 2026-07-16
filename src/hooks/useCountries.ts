import { useEffect, useRef, useState } from "react";
import { loadCountries, Country } from "../utils/loadCountries";

export function useCountries(locale: string, initialCountry?: string) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const previousInitialCountry = useRef(initialCountry);

  useEffect(() => {
    let active = true;
    const initialCountryChanged = previousInitialCountry.current !== initialCountry;
    previousInitialCountry.current = initialCountry;

    loadCountries(locale).then((loaded) => {
      if (!active) return;
      setCountries(loaded);

      setSelectedCountry((current) => {
        const targetIso = initialCountryChanged
          ? initialCountry
          : current?.iso2 ?? initialCountry;
        return targetIso
          ? loaded.find((c) => c.iso2.toLowerCase() === targetIso.toLowerCase()) ??
              loaded[0] ??
              null
          : loaded[0] ?? null;
      });
    });

    return () => {
      active = false;
    };
  }, [locale, initialCountry]);

  return {
    countries,
    selectedCountry,
    setSelectedCountry,
  };
}
