import React, { useCallback, useState } from "react";
import Layout from "@theme/Layout";
import { useColorMode } from "@docusaurus/theme-common";
import { PhoneBox } from "../../../src";
import type { PhoneBoxVariant } from "../../../src";
import styles from "./demo.module.css";

const variants: Array<{
  variant: PhoneBoxVariant;
  title: string;
  description: string;
}> = [
  {
    variant: "classic",
    title: "Classic",
    description: "A familiar bordered control for forms and account screens.",
  },
  {
    variant: "minimal",
    title: "Minimal",
    description: "A low-chrome option for focused and editorial layouts.",
  },
  {
    variant: "soft",
    title: "Soft",
    description: "A calm filled surface for modern product interfaces.",
  },
  {
    variant: "pill",
    title: "Pill",
    description: "A rounded control with a larger, tactile country selector.",
  },
];

type VariantPreviewProps = (typeof variants)[number] & {
  theme: "light" | "dark";
};

function VariantPreview({
  variant,
  title,
  description,
  theme,
}: VariantPreviewProps) {
  const [value, setValue] = useState("");
  const [raw, setRaw] = useState("");
  const [isValid, setIsValid] = useState(false);
  const handleRawChange = useCallback((nextRaw: string) => setRaw(nextRaw), []);
  const handleValidChange = useCallback(
    (nextValid: boolean) => setIsValid(nextValid),
    []
  );
  const inputId = `phonebox-${variant}`;
  const hasValue = value.trim().length > 0;

  return (
    <article className={styles.previewCard}>
      <header className={styles.cardHeader}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <code>{variant}</code>
      </header>

      <div className={styles.field}>
        <label htmlFor={inputId}>Phone number</label>
        <PhoneBox
          id={inputId}
          name={`phone-${variant}`}
          value={value}
          onChange={setValue}
          onRawChange={handleRawChange}
          onValidChange={handleValidChange}
          locale="en"
          initialCountry="TR"
          searchPlaceholder="Search country"
          countrySelectorLabel="Select country"
          noResultsText="No countries found"
          flagMode="emoji"
          variant={variant}
          theme={theme}
          autoComplete="tel-national"
        />
      </div>

      <dl className={styles.result} aria-live="polite">
        <div>
          <dt>Formatted:</dt>
          <dd title={value}>{value || "-"}</dd>
        </div>
        <div>
          <dt>Raw:</dt>
          <dd title={raw}>{raw || "-"}</dd>
        </div>
        <div>
          <dt>Valid:</dt>
          <dd
            className={
              !hasValue
                ? styles.emptyValue
                : isValid
                  ? styles.validValue
                  : styles.invalidValue
            }
          >
            {!hasValue ? "-" : isValid ? "Yes" : "No"}
          </dd>
        </div>
      </dl>
    </article>
  );
}

function DemoContent() {
  const { colorMode, setColorMode } = useColorMode();
  const theme = colorMode === "dark" ? "dark" : "light";

  return (
    <main className={styles.demoPage}>
      <div className={styles.shell}>
        <header className={styles.pageHeader}>
          <div>
            <p className={styles.productName}>React PhoneBox</p>
            <h1>Four styles. One reliable phone input.</h1>
            <p className={styles.intro}>
              Try each variant and inspect its formatted value, raw number, and validity.
            </p>
          </div>

          <div className={styles.themeSwitcher} aria-label="Theme selection">
            <button
              type="button"
              aria-pressed={theme === "light"}
              onClick={() => setColorMode("light")}
            >
              Light
            </button>
            <button
              type="button"
              aria-pressed={theme === "dark"}
              onClick={() => setColorMode("dark")}
            >
              Dark
            </button>
          </div>
        </header>

        <section className={styles.previewGrid} aria-label="Design variants">
          {variants.map((item) => (
            <VariantPreview key={item.variant} {...item} theme={theme} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default function DemoPage() {
  return (
    <Layout
      title="Live Demo"
      description="Try every React PhoneBox design variant in light and dark themes."
    >
      <DemoContent />
    </Layout>
  );
}
