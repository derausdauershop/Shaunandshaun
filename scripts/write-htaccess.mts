/**
 * Writes out/.htaccess (redirects + security headers for Apache/STRATO) after `next build`.
 * Runs automatically as "postbuild".
 */
import fs from "node:fs";
import path from "node:path";
import { htaccess } from "../src/lib/static-hosting.ts";

const out = path.resolve(import.meta.dirname, "..", "out");
if (!fs.existsSync(out)) throw new Error("out/ not found – run `next build` first");
fs.writeFileSync(path.join(out, ".htaccess"), htaccess());
console.log("out/.htaccess written");
