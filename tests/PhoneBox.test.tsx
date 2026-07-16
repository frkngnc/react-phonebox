// @vitest-environment jsdom

import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhoneBox } from "../src/components/PhoneBox";
import { PhoneBoxInput } from "../src/components/PhoneBoxInput";

afterEach(cleanup);

describe("PhoneBox", () => {
  it("emits the formatted display value on change", () => {
    const onChange = vi.fn();

    render(
      <PhoneBox value="" onChange={onChange} initialCountry="TR" />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "05321234567" },
    });

    expect(onChange).toHaveBeenLastCalledWith("0532 123 45 67");
  });

  it("limits national input to the selected country format", () => {
    const onChange = vi.fn();

    render(
      <PhoneBox value="" onChange={onChange} initialCountry="TR" />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "0532123456789" },
    });

    expect(onChange).toHaveBeenLastCalledWith("0532 123 45 67");
  });

  it("limits international input without counting the national trunk prefix", () => {
    const onChange = vi.fn();

    render(
      <PhoneBox value="" onChange={onChange} initialCountry="TR" />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "+90532123456789" },
    });

    expect(onChange).toHaveBeenLastCalledWith("+90 532 123 45 67");
  });

  it("emits a valid E.164 value for a Turkish national number", async () => {
    const onRawChange = vi.fn();
    const onValidChange = vi.fn();

    render(
      <PhoneBox
        value="05321234567"
        onChange={() => undefined}
        initialCountry="TR"
        mobileOnly
        onRawChange={onRawChange}
        onValidChange={onValidChange}
      />
    );

    expect(screen.getByRole("textbox")).toHaveProperty(
      "value",
      "0532 123 45 67"
    );
    await waitFor(() => {
      expect(onRawChange).toHaveBeenLastCalledWith("+905321234567");
      expect(onValidChange).toHaveBeenLastCalledWith(true);
    });
    expect(onRawChange).toHaveBeenCalledTimes(1);
  });

  it("forwards native form attributes to the phone input", () => {
    render(
      <PhoneBox
        value=""
        onChange={() => undefined}
        name="phone"
        required
        aria-invalid="true"
      />
    );

    const input = screen.getByRole("textbox");
    expect(input.getAttribute("name")).toBe("phone");
    expect(input.hasAttribute("required")).toBe(true);
    expect(input.getAttribute("aria-invalid")).toBe("true");
  });
});

describe("PhoneBoxInput", () => {
  it.each(["classic", "minimal", "soft", "pill"] as const)(
    "applies the %s design variant",
    (variant) => {
      const { container } = render(
        <PhoneBoxInput
          value=""
          onChange={() => undefined}
          variant={variant}
        />
      );

      expect(
        container.querySelector(".phonebox-wrapper")?.classList.contains(
          `phonebox-variant-${variant}`
        )
      ).toBe(true);
    }
  );

  it("reports the initially selected country", async () => {
    const onCountryChange = vi.fn();

    render(
      <PhoneBoxInput
        value=""
        onChange={() => undefined}
        onCountryChange={onCountryChange}
        initialCountry="TR"
      />
    );

    await waitFor(() => {
      expect(onCountryChange).toHaveBeenCalledWith(
        expect.objectContaining({ iso2: "TR", dialCode: "+90" })
      );
    });
  });

  it("finds countries using non-Latin localized names", async () => {
    const user = userEvent.setup();

    render(
      <PhoneBoxInput
        value=""
        onChange={() => undefined}
        locale="ar"
        initialCountry="TR"
      />
    );

    await user.click(screen.getByRole("button", { name: "Select country" }));
    await user.type(screen.getByRole("textbox", { name: "Search country" }), "تركيا");

    expect(
      await screen.findByRole("option", { name: /تركيا/ })
    ).toBeTruthy();
  });

  it("can render flags without a CDN", async () => {
    render(
      <PhoneBoxInput
        value=""
        onChange={() => undefined}
        initialCountry="TR"
        flagMode="emoji"
      />
    );

    const selector = screen.getByRole("button", { name: "Select country" });
    await waitFor(() => expect(selector.textContent).toContain("🇹🇷"));
    expect(selector.querySelector("img")).toBeNull();
  });

  it("supports a custom flag renderer", async () => {
    render(
      <PhoneBoxInput
        value=""
        onChange={() => undefined}
        initialCountry="TR"
        renderFlag={(country, context) => (
          <span data-testid="custom-flag">
            {country.iso2}:{context.location}
          </span>
        )}
      />
    );

    expect(await screen.findByTestId("custom-flag")).toHaveProperty(
      "textContent",
      "TR:selector"
    );
  });

  it("supports international dialing-prefix searches", async () => {
    const user = userEvent.setup();

    render(
      <PhoneBoxInput
        value=""
        onChange={() => undefined}
        locale="en"
        initialCountry="US"
      />
    );

    await user.click(screen.getByRole("button", { name: "Select country" }));
    await user.type(screen.getByRole("textbox", { name: "Search country" }), "0090");

    expect(
      await screen.findByRole("option", { name: /Turkey.*\+90/ })
    ).toBeTruthy();
  });

  it("closes the country list with Escape and restores focus", async () => {
    const user = userEvent.setup();

    render(
      <PhoneBoxInput value="" onChange={() => undefined} initialCountry="US" />
    );

    const selector = screen.getByRole("button", { name: "Select country" });
    await user.click(selector);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(selector);
  });

  it("virtualizes long lists while preserving keyboard navigation", async () => {
    const user = userEvent.setup();

    render(
      <PhoneBoxInput value="" onChange={() => undefined} initialCountry="US" />
    );

    const selector = screen.getByRole("button", { name: "Select country" });
    await waitFor(() => expect(selector.textContent).toContain("+1"));
    await user.click(selector);

    expect(screen.getAllByRole("option").length).toBeLessThan(30);
    await user.keyboard("{End}");

    const lastOption = await screen.findByRole("option", { name: /Zimbabwe/ });
    await waitFor(() => expect(document.activeElement).toBe(lastOption));
  });
});
