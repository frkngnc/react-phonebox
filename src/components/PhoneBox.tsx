import React, { useState, useEffect, useMemo, useRef } from "react";
import { Country } from "../utils/loadCountries";
import { loadCountries } from "../utils/loadCountries";
import {
  AsYouType,
  getExampleNumber,
  CountryCode
} from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";
import "./PhoneBox.css";

const FlagIcon = React.memo(({ iso2 }: { iso2: string }) => (
  <img
    src={`https://flagcdn.com/w40/${iso2.toLowerCase()}.png`}
    alt={iso2}
    width={20}
    height={15}
    style={{ borderRadius: "2px" }}
  />
));

const debounce = <F extends (...args: any[]) => void>(
  fn: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const trunkPrefixCountries = new Set([
  "TR",
]);

type PhoneBoxProps = {
  value: string;
  onChange: (value: string) => void;
  locale?: string;
  onCountryChange?: (country: Country) => void;
  onValidityChange?: (isValid: boolean) => void;
  initialCountry?: string;
  onRawChange?: (raw: string) => void;
  searchPlaceholder?: string;
  mask?: "exampleNumber" | string;
  theme?: "dark" | "light";
};

export const PhoneBox: React.FC<PhoneBoxProps> = ({
  value,
  onChange,
  locale = "en",
  onCountryChange,
  onValidityChange,
  initialCountry,
  onRawChange,
  searchPlaceholder = "Search country",
  mask = "_",
  theme = "dark"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isRTL, setIsRTL] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = debounce((val: string) => {
      setDebouncedSearch(val);
    }, 200);
    handler(search);
  }, [search]);

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

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsRTL(document?.dir === "rtl");
    }
  }, []);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalize = (str: string) =>
    str.toLocaleLowerCase(locale).replace(/[^a-z0-9+]/gi, "");

  const filteredCountries = countries.filter((country) => {
    const searchTerm = normalize(debouncedSearch);
    if (!searchTerm) return true;

    const name = normalize(country.name);
    const dialCode = normalize(country.dialCode);
    const iso2 = normalize(country.iso2);

    return (
      name.includes(searchTerm) ||
      dialCode.includes(searchTerm) ||
      ("+" + dialCode).includes(searchTerm) ||
      ("00" + dialCode).includes(searchTerm) ||
      iso2.includes(searchTerm)
    );
  });

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearch("");
    onCountryChange?.(country);
  };

  const handleInputChange = (inputValue: string) => {
    if (!selectedCountry) return;

    let inputDigits = inputValue.replace(/\D/g, "");

    if (trunkPrefixCountries.has(selectedCountry.iso2.toUpperCase())) {
      if (inputDigits.startsWith("0")) {
        inputDigits = inputDigits.substring(1);
      }
    }

    const formatter = new AsYouType(selectedCountry.iso2.toUpperCase() as CountryCode);
    const example = getExampleNumber(selectedCountry.iso2.toUpperCase() as CountryCode, examples);
    const maxDigits = example?.nationalNumber?.replace(/\D/g, "").length ?? 15;
    inputDigits = inputDigits.slice(0, maxDigits);

    const formatted = formatter.input(inputDigits);
    onChange(formatted);

    const phoneNumber = formatter.getNumber();
    if (phoneNumber) {
      onRawChange?.(phoneNumber.number);
      setIsValid(phoneNumber.isValid());
    } else {
      onRawChange?.("");
      setIsValid(false);
    }
  };

  const placeholder = useMemo(() => {
    if (!selectedCountry) return "";
    const example = getExampleNumber(selectedCountry.iso2.toUpperCase() as CountryCode, examples);
    if (!example?.nationalNumber) return "";
    const nationalFormat = example.formatNational();
    if (mask === "exampleNumber") return nationalFormat;
    if (typeof mask === "string" && mask.length === 1 && !/[a-zA-Z]/.test(mask)) {
      return nationalFormat.replace(/\d/g, mask);
    }
    return nationalFormat;
  }, [selectedCountry, mask]);

  return (
    <div
      ref={wrapperRef}
      className={`phonebox-wrapper ${isRTL ? "rtl" : ""} ${theme}`.trim()}
    >
      <div className="phonebox-input">
        <div className="phonebox-select" onClick={() => setIsOpen(!isOpen)}>
          {selectedCountry && <FlagIcon iso2={selectedCountry.iso2} />}
          <span className="phonebox-dialcode">{selectedCountry?.dialCode}</span>
          <span className="phonebox-caret">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.154909 5.27123L7.56846 12.4935C7.62748 12.551 7.69018 12.5942 7.75657 12.6229C7.82296 12.6516 7.90041 12.666 7.98893 12.666C8.07745 12.666 8.15491 12.6516 8.2213 12.6229C8.28769 12.5942 8.35039 12.551 8.4094 12.4935L15.8451 5.24967C15.9484 5.14906 16 5.02689 16 4.88316C16 4.73943 15.941 4.61008 15.823 4.4951C15.7344 4.39449 15.609 4.34418 15.4467 4.34418C15.2845 4.34418 15.1443 4.39449 15.0263 4.4951L7.98893 11.3725L0.929459 4.47354C0.826186 4.37293 0.697095 4.32622 0.542184 4.3334C0.387274 4.34059 0.258182 4.39449 0.154909 4.4951C0.0516354 4.59571 0 4.72506 0 4.88316C0 5.04126 0.0516354 5.17062 0.154909 5.27123Z"
                fill="#FAFAFA"
              />
            </svg>
          </span>
        </div>
        <input
          type="tel"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
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
                <span className="phonebox-option-dialcode">{country.dialCode}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};