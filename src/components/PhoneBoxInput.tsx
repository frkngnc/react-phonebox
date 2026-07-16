import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCountries } from "../hooks/useCountries";
import { useClickOutside } from "../hooks/useClickOutside";
import { useDebounce } from "../hooks/useDebounce";
import type { Country } from "../utils/loadCountries";
import "../styles/PhoneBox.css";

const OPTION_HEIGHT = 36;
const LIST_HEIGHT = 200;
const VIRTUALIZATION_THRESHOLD = 80;
const VIRTUALIZATION_OVERSCAN = 4;

export type PhoneBoxFlagMode = "cdn" | "emoji" | "none";
export type PhoneBoxVariant = "classic" | "minimal" | "soft" | "pill";
export type PhoneBoxFlagRenderer = (
  country: Country,
  context: { location: "selector" | "option" }
) => React.ReactNode;

function countryCodeToEmoji(iso2: string): string {
  const normalized = iso2.toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized)) return "🏳️";
  return String.fromCodePoint(
    ...normalized.split("").map((letter) => letter.charCodeAt(0) + 127397)
  );
}

const CdnFlag = React.memo(
  ({ country, lazy = true }: { country: Country; lazy?: boolean }) => (
    <img
      src={`https://flagcdn.com/w40/${country.iso2.toLowerCase()}.png`}
      alt=""
      aria-hidden="true"
      width={20}
      height={15}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      style={{ borderRadius: "2px" }}
    />
  )
);

function CountryFlag({
  country,
  flagMode,
  lazy,
  location,
  renderFlag,
}: {
  country: Country;
  flagMode: PhoneBoxFlagMode;
  lazy?: boolean;
  location: "selector" | "option";
  renderFlag?: PhoneBoxFlagRenderer;
}) {
  if (renderFlag) return <>{renderFlag(country, { location })}</>;
  if (flagMode === "none") return null;
  if (flagMode === "emoji") {
    return (
      <span className="phonebox-flag-emoji" aria-hidden="true">
        {countryCodeToEmoji(country.iso2)}
      </span>
    );
  }
  return <CdnFlag country={country} lazy={lazy} />;
}

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "placeholder" | "type" | "value"
>;

export type PhoneBoxInputProps = NativeInputProps & {
  value: string;
  onChange: (value: string) => void;
  onCountryChange?: (country: Country) => void;
  placeholder?: string;
  locale?: string;
  initialCountry?: string;
  searchPlaceholder?: string;
  countrySelectorLabel?: string;
  noResultsText?: string;
  flagMode?: PhoneBoxFlagMode;
  renderFlag?: PhoneBoxFlagRenderer;
  virtualizeThreshold?: number;
  variant?: PhoneBoxVariant;
  theme?: "dark" | "light";
};

function normalizeSearchValue(value: string, locale: string): string {
  const withoutMarks = value.normalize("NFKD").replace(/\p{M}/gu, "");

  try {
    return withoutMarks
      .toLocaleLowerCase(locale)
      .replace(/[^\p{L}\p{N}+]/gu, "");
  } catch {
    return withoutMarks.toLowerCase().replace(/[^\p{L}\p{N}+]/gu, "");
  }
}

export const PhoneBoxInput: React.FC<PhoneBoxInputProps> = ({
  value,
  onChange,
  onCountryChange,
  placeholder,
  locale = "en",
  initialCountry,
  searchPlaceholder = "Search country",
  countrySelectorLabel = "Select country",
  noResultsText = "No countries found",
  flagMode = "cdn",
  renderFlag,
  virtualizeThreshold = VIRTUALIZATION_THRESHOLD,
  variant = "classic",
  theme = "dark",
  className,
  dir,
  disabled,
  ...inputProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLButtonElement>(null);
  const optionsScrollRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pendingFocusIndexRef = useRef<number | null>(null);
  const onCountryChangeRef = useRef(onCountryChange);
  const notifiedCountryRef = useRef<Country | null>(null);
  const debouncedSearch = useDebounce(search, 200);
  const [isRTL, setIsRTL] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [scrollTop, setScrollTop] = useState(0);

  const { countries, selectedCountry, setSelectedCountry } = useCountries(
    locale,
    initialCountry
  );

  const closeDropdown = useCallback((restoreFocus = false) => {
    setIsOpen(false);
    setSearch("");
    setActiveIndex(-1);
    if (restoreFocus) selectorRef.current?.focus();
  }, []);

  useClickOutside(wrapperRef, closeDropdown);

  useEffect(() => {
    onCountryChangeRef.current = onCountryChange;
  }, [onCountryChange]);

  useEffect(() => {
    if (!selectedCountry || notifiedCountryRef.current === selectedCountry) return;
    notifiedCountryRef.current = selectedCountry;
    onCountryChangeRef.current?.(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    const localeLanguage = locale.toLowerCase().split(/[-_]/)[0];
    const localeIsRTL = ["ar", "fa", "he", "ur"].includes(localeLanguage);
    const documentIsRTL =
      typeof document !== "undefined" && document.dir === "rtl";
    setIsRTL(dir === "rtl" || (dir !== "ltr" && (documentIsRTL || localeIsRTL)));
  }, [dir, locale]);

  const filteredCountries = useMemo(() => {
    const term = normalizeSearchValue(debouncedSearch, locale);
    if (!term) return countries;

    const termDigits = debouncedSearch.replace(/\D/g, "");
    const normalizedDialTerm = termDigits.startsWith("00")
      ? termDigits.slice(2)
      : termDigits;

    return countries.filter((country) => {
      const name = normalizeSearchValue(country.name, locale);
      const iso2 = normalizeSearchValue(country.iso2, locale);
      const dialDigits = country.dialCode.replace(/\D/g, "");

      return (
        name.includes(term) ||
        iso2.includes(term) ||
        (normalizedDialTerm.length > 0 && dialDigits.includes(normalizedDialTerm))
      );
    });
  }, [countries, debouncedSearch, locale]);

  const shouldVirtualize = filteredCountries.length > virtualizeThreshold;
  const virtualStart = shouldVirtualize
    ? Math.max(
        0,
        Math.floor(scrollTop / OPTION_HEIGHT) - VIRTUALIZATION_OVERSCAN
      )
    : 0;
  const virtualEnd = shouldVirtualize
    ? Math.min(
        filteredCountries.length,
        Math.ceil((scrollTop + LIST_HEIGHT) / OPTION_HEIGHT) +
          VIRTUALIZATION_OVERSCAN
      )
    : filteredCountries.length;
  const visibleCountries = filteredCountries
    .slice(virtualStart, virtualEnd)
    .map((country, offset) => ({ country, index: virtualStart + offset }));

  useEffect(() => {
    setScrollTop(0);
    setActiveIndex(-1);
    optionRefs.current = [];
    if (optionsScrollRef.current) optionsScrollRef.current.scrollTop = 0;
  }, [debouncedSearch, locale]);

  useEffect(() => {
    const pendingIndex = pendingFocusIndexRef.current;
    if (pendingIndex === null) return;
    const option = optionRefs.current[pendingIndex];
    if (!option) return;
    pendingFocusIndexRef.current = null;
    option.focus();
  }, [activeIndex, scrollTop, virtualStart, virtualEnd]);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    closeDropdown(true);
  };

  const focusOption = (index: number) => {
    if (!filteredCountries.length) return;
    const nextIndex = (index + filteredCountries.length) % filteredCountries.length;
    const viewTop = scrollTop;
    const viewBottom = scrollTop + LIST_HEIGHT;
    const optionTop = nextIndex * OPTION_HEIGHT;
    const optionBottom = optionTop + OPTION_HEIGHT;
    let nextScrollTop = scrollTop;

    if (optionTop < viewTop) {
      nextScrollTop = optionTop;
    } else if (optionBottom > viewBottom) {
      nextScrollTop = optionBottom - LIST_HEIGHT;
    }

    pendingFocusIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    setScrollTop(nextScrollTop);
    if (optionsScrollRef.current) {
      optionsScrollRef.current.scrollTop = nextScrollTop;
    }
    const renderedOption = optionRefs.current[nextIndex];
    if (renderedOption) {
      pendingFocusIndexRef.current = null;
      renderedOption.focus();
    }
  };

  const handleDropdownKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown(true);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusOption(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusOption(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusOption(filteredCountries.length - 1);
    }
  };

  const openDropdown = () => {
    if (disabled) return;
    const selectedIndex = filteredCountries.findIndex(
      (country) => country.iso2 === selectedCountry?.iso2
    );
    setActiveIndex(selectedIndex);
    setScrollTop(0);
    setIsOpen(true);
  };

  return (
    <div
      ref={wrapperRef}
      className={`phonebox-wrapper phonebox-variant-${variant} ${
        isRTL ? "rtl" : ""
      } ${theme}`}
    >
      <div className="phonebox-input">
        <button
          ref={selectorRef}
          type="button"
          className="phonebox-select"
          onClick={() => (isOpen ? closeDropdown() : openDropdown())}
          onKeyDown={(event) => {
            if (!isOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
              event.preventDefault();
              openDropdown();
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={countrySelectorLabel}
          disabled={disabled}
        >
          {selectedCountry && (
            <CountryFlag
              country={selectedCountry}
              flagMode={flagMode}
              lazy={false}
              location="selector"
              renderFlag={renderFlag}
            />
          )}
          <span className="phonebox-dialcode">{selectedCountry?.dialCode}</span>
          <span className="phonebox-caret" aria-hidden="true">▼</span>
        </button>
        <input
          {...inputProps}
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`phonebox-field ${className ?? ""}`.trim()}
          placeholder={placeholder}
          disabled={disabled}
          dir={dir}
        />
      </div>
      {isOpen && (
        <div className="phonebox-dropdown" onKeyDown={handleDropdownKeyDown}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="phonebox-search"
            autoFocus
            aria-label={searchPlaceholder}
          />
          <div
            ref={optionsScrollRef}
            className="phonebox-options-scroll"
            role="listbox"
            onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
          >
            <div
              className={shouldVirtualize ? "phonebox-options-virtual" : undefined}
              style={
                shouldVirtualize
                  ? { height: filteredCountries.length * OPTION_HEIGHT }
                  : undefined
              }
            >
              {visibleCountries.map(({ country, index }) => (
                <button
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  key={country.iso2}
                  type="button"
                  role="option"
                  aria-selected={selectedCountry?.iso2 === country.iso2}
                  aria-posinset={index + 1}
                  aria-setsize={filteredCountries.length}
                  className="phonebox-option"
                  style={
                    shouldVirtualize
                      ? { transform: `translateY(${index * OPTION_HEIGHT}px)` }
                      : undefined
                  }
                  onClick={() => handleSelectCountry(country)}
                  onFocus={() => setActiveIndex(index)}
                >
                  <CountryFlag
                    country={country}
                    flagMode={flagMode}
                    location="option"
                    renderFlag={renderFlag}
                  />
                  <span className="phonebox-option-name">{country.name}</span>
                  <span className="phonebox-option-dialcode">
                    {country.dialCode}
                  </span>
                </button>
              ))}
            </div>
            {!filteredCountries.length && (
              <div className="phonebox-empty" role="status">
                {noResultsText}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
