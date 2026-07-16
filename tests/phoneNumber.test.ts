import { describe, expect, it } from "vitest";
import { getPhoneNumberState } from "../src/utils/phoneNumber";

describe("getPhoneNumberState", () => {
  it("parses a Turkish national number with its trunk prefix", () => {
    const result = getPhoneNumberState("0532 123 45 67", "TR", true);

    expect(result.formatted).toBe("0532 123 45 67");
    expect(result.raw).toBe("+905321234567");
    expect(result.isValid).toBe(true);
    expect(result.isMobile).toBe(true);
  });

  it("parses a British national number without duplicating the trunk prefix", () => {
    const result = getPhoneNumberState("07123 456789", "GB");

    expect(result.raw).toBe("+447123456789");
    expect(result.isValid).toBe(true);
  });

  it("rejects a landline when mobile-only validation is enabled", () => {
    const general = getPhoneNumberState("030 123456", "DE");
    const mobileOnly = getPhoneNumberState("030 123456", "DE", true);

    expect(general.isValid).toBe(true);
    expect(general.isMobile).toBe(false);
    expect(mobileOnly.isValid).toBe(false);
  });

  it("keeps incomplete input available without marking it valid", () => {
    const result = getPhoneNumberState("0532", "TR");

    expect(result.formatted).toBe("0532");
    expect(result.raw).toBe("+90532");
    expect(result.isValid).toBe(false);
  });
});
