import { describe, expect, it } from "vitest";
import { smoothClosedPath, topoPaths, topoSvg } from "./topo";

describe("topo", () => {
  it("is deterministic", () => {
    expect(topoPaths({ width: 800, height: 600 })).toEqual(topoPaths({ width: 800, height: 600 }));
  });

  it("creates one closed path per contour level", () => {
    const paths = topoPaths({
      width: 100,
      height: 100,
      peaks: [{ x: 0.5, y: 0.5, levels: 3, spacing: 0.1, seed: 1 }],
    });
    expect(paths).toHaveLength(3);
    paths.forEach((d) => {
      expect(d.startsWith("M")).toBe(true);
      expect(d.endsWith("Z")).toBe(true);
    });
  });

  it("returns an empty path for fewer than 3 points", () => {
    expect(smoothClosedPath([[0, 0], [1, 1]])).toBe("");
  });

  it("renders a standalone svg", () => {
    expect(topoSvg(200, 100)).toMatch(/^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 200 100"/);
  });
});
