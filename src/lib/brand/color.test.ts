import { describe, expect, it } from "vitest";
import { contrastRatio, hexToRgb, wcagLevel } from "./color";

describe("color", () => {
  it("parses short and long hex", () => {
    expect(hexToRgb("#fff")).toEqual([255, 255, 255]);
    expect(hexToRgb("CAFF42")).toEqual([202, 255, 66]);
  });

  it("rejects invalid hex", () => {
    expect(() => hexToRgb("#zzzzzz")).toThrow();
  });

  it("computes the WCAG reference contrast black/white = 21", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrastRatio("#ffffff", "#000000")).toBeCloseTo(21, 5);
  });

  it("maps ratios to levels", () => {
    expect(wcagLevel(7.1)).toBe("AAA");
    expect(wcagLevel(4.5)).toBe("AA");
    expect(wcagLevel(3.2)).toBe("AA groß");
    expect(wcagLevel(1.4)).toBe("nicht zulässig");
  });
});
