import { useEffect, useState } from "react";
import { loadCountries, Country } from "../utils/loadCountries";

export function useCountries(locale: string, initialCountry?: string) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    loadCountries(locale).then((loaded) => {
      setCountries(loaded);

      if (!selectedCountry) {
        const initial = initialCountry
          ? loaded.find(
              (c) => c.iso2.toLowerCase() === initialCountry.toLowerCase()
            )
          : loaded[0];

        if (initial) {
          setSelectedCountry(initial);
        }
      }
    });
  }, [locale, initialCountry]);

  return {
    countries,
    selectedCountry,
    setSelectedCountry,
  };
}