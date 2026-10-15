/**
 * Generates contour lines ("Höhenlinien") inspired by the Westerwald/Siegerland hills.
 * Pure + deterministic so the React component and the exported SVG files are identical.
 */

export interface TopoOptions {
  width: number;
  height: number;
  /** Hill centers as fractions of width/height */
  peaks?: Array<{ x: number; y: number; levels: number; spacing: number; seed: number }>;
}

type Point = [number, number];

const DEFAULT_PEAKS: NonNullable<TopoOptions["peaks"]> = [
  { x: 0.28, y: 0.62, levels: 14, spacing: 0.045, seed: 1.7 },
  { x: 0.78, y: 0.3, levels: 10, spacing: 0.05, seed: 4.2 },
];

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Closed Catmull-Rom spline through the points, converted to cubic Béziers. */
export function smoothClosedPath(points: Point[]): string {
  const n = points.length;
  if (n < 3) return "";
  let d = `M${round(points[0][0])} ${round(points[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ${round(p2[0])} ${round(p2[1])}`;
  }
  return `${d} Z`;
}

export function topoPaths({ width, height, peaks = DEFAULT_PEAKS }: TopoOptions): string[] {
  const size = Math.max(width, height);
  const steps = 48;
  const paths: string[] = [];

  for (const peak of peaks) {
    const cx = peak.x * width;
    const cy = peak.y * height;
    for (let level = 1; level <= peak.levels; level++) {
      const r = level * peak.spacing * size;
      // Outer rings get more irregular, like real terrain.
      const wobble = 0.06 + level * 0.012;
      const points: Point[] = [];
      for (let i = 0; i < steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        const k =
          1 +
          wobble *
            (Math.sin(3 * t + peak.seed) * 0.9 +
              Math.sin(5 * t + peak.seed * 2.3 + level * 0.25) * 0.5 +
              Math.sin(2 * t - peak.seed + level * 0.4) * 0.7);
        points.push([cx + Math.cos(t) * r * k * 1.25, cy + Math.sin(t) * r * k * 0.85]);
      }
      paths.push(smoothClosedPath(points));
    }
  }
  return paths;
}

export function topoSvg(width: number, height: number, stroke = "currentColor", strokeWidth = 1.25): string {
  const paths = topoPaths({ width, height })
    .map((d) => `<path d="${d}"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}">${paths}</svg>`;
}
