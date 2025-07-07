import React, { useState, useRef, useEffect } from "react";
import { useCountries } from "../hooks/useCountries";
import { useClickOutside } from "../hooks/useClickOutside";
import { useDebounce } from "../hooks/useDebounce";
import type { Country } from "../utils/loadCountries";
import "../styles/PhoneBox.css";

const FlagIcon = React.memo(({ iso2 }: { iso2: string }) => (
  <img
    src={`https://flagcdn.com/w40/${iso2.toLowerCase()}.png`}
    alt={iso2}
    width={20}
    height={15}
    style={{ borderRadius: "2px" }}
  />
));

export type PhoneBoxInputProps = {
  value: string;
  onChange: (value: string) => void;
  onCountryChange?: (country: Country) => void;
  placeholder?: string;
  locale?: string;
  initialCountry?: string;
  searchPlaceholder?: string;
  theme?: "dark" | "light";
};

export const PhoneBoxInput: React.FC<PhoneBoxInputProps> = ({
  value,
  onChange,
  onCountryChange,
  placeholder,
  locale = "en",
  initialCountry,
  searchPlaceholder = "Search country",
  theme = "dark",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(search, 200);
  const [isRTL, setIsRTL] = useState(false);

  const { countries, selectedCountry, setSelectedCountry } = useCountries(
    locale,
    initialCountry
  );

  useClickOutside(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsRTL(document?.dir === "rtl");
    }
  }, []);

  const normalize = (str: string) =>
    str.toLocaleLowerCase(locale).replace(/[^a-z0-9+]/gi, "");

  const filteredCountries = countries.filter((country) => {
    const term = normalize(debouncedSearch);
    if (!term) return true;
    const name = normalize(country.name);
    const dial = normalize(country.dialCode);
    const iso2 = normalize(country.iso2);
    return (
      name.includes(term) ||
      dial.includes(term) ||
      ("+" + dial).includes(term) ||
      ("00" + dial).includes(term) ||
      iso2.includes(term)
    );
  });

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearch("");
    onCountryChange?.(country);
  };

  return (
    <div
      ref={wrapperRef}
      className={`phonebox-wrapper ${isRTL ? "rtl" : ""} ${theme}`}
    >
      <div className="phonebox-input">
        <div className="phonebox-select" onClick={() => setIsOpen(!isOpen)}>
          {selectedCountry && <FlagIcon iso2={selectedCountry.iso2} />}
          <span className="phonebox-dialcode">{selectedCountry?.dialCode}</span>
          <span className="phonebox-caret">▼</span>
        </div>
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="phonebox-field"
          placeholder={placeholder}
        />
      </div>
      {isOpen && (
        <div className="phonebox-dropdown">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="phonebox-search"
          />
          <div className="phonebox-options-scroll">
            {filteredCountries.map((country) => (
              <div
                key={country.iso2}
                className="phonebox-option"
                onClick={() => handleSelectCountry(country)}
              >
                <FlagIcon iso2={country.iso2} />
                <span>{country.name}</span>
                <span className="phonebox-option-dialcode">
                  {country.dialCode}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};