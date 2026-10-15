import fs from "node:fs";
import path from "node:path";

/**
 * Original logos live in public/brand/logos/ (see README there).
 * They are never redrawn – we only reference the files.
 */
export const LOGO_FILES = {
  ausdauer: "ausdauer",
  ausdauerRed: "ausdauer-rot",
  ausdauerNegative: "ausdauer-negativ",
  absoluteRun: "absolute-run-ausdauer",
  crownTown: "crown-town-runners",
  firmenlauf: "westerwaelder-firmenlauf",
} as const;

export type LogoKey = keyof typeof LOGO_FILES;

const EXTENSIONS = ["svg", "png", "webp"];

/** Returns the public URL of a logo file, or null if it is missing. */
export function resolveLogo(key: LogoKey): string | null {
  const dir = path.join(process.cwd(), "public", "brand", "logos");
  for (const ext of EXTENSIONS) {
    const file = `${LOGO_FILES[key]}.${ext}`;
    if (fs.existsSync(path.join(dir, file))) return `/brand/logos/${file}`;
  }
  return null;
}
