import { describe, expect, it } from "vitest";
import { loadCountries } from "../src/utils/loadCountries";

describe("loadCountries", () => {
  it("uses localized region names when a static translation is missing", async () => {
    const countries = await loadCountries("tr-TR");
    const aland = countries.find((country) => country.iso2 === "AX");
    const expectedName = new Intl.DisplayNames(["tr-TR"], {
      type: "region",
    }).of("AX");

    expect(aland?.name).toBe(expectedName);
    expect(aland?.name).not.toBe("AX");
  });

  it("supports locales without a bundled translation file", async () => {
    const countries = await loadCountries("de-DE");
    const germany = countries.find((country) => country.iso2 === "DE");

    expect(germany?.name).toBe("Deutschland");
  });
});
