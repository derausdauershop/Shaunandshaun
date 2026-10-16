import { describe, expect, it } from "vitest";
import { LEGACY_REDIRECTS, exportPath, htaccess, rewriteRule } from "./static-hosting";

/** Applies the generated RewriteRules like Apache does (per-directory: path without leading slash). */
function resolve(path: string) {
  for (const line of htaccess().split("\n")) {
    const m = line.trim().match(/^RewriteRule (\^\S+) (\/\S*) \[R=301/);
    if (m && new RegExp(m[1]).test(path.slice(1))) return m[2];
  }
  return null;
}

describe("static hosting (.htaccess)", () => {
  it("adds trailing slashes and keeps hashes", () => {
    expect(exportPath("/")).toBe("/");
    expect(exportPath("/magazin")).toBe("/magazin/");
    expect(exportPath("/ueber-uns#team")).toBe("/ueber-uns/#team");
  });

  it("writes 301 rules, NE only for hash targets", () => {
    expect(rewriteRule(["/team", "/ueber-uns#team"])).toBe("RewriteRule ^team(\\.html)?/?$ /ueber-uns/#team [R=301,L,NE]");
    expect(rewriteRule(["/blog", "/magazin"])).toBe("RewriteRule ^blog(\\.html)?/?$ /magazin/ [R=301,L]");
    expect(rewriteRule(["/newsreader/:slug*", "/magazin"])).toBe("RewriteRule ^newsreader(/.*)?$ /magazin/ [R=301,L]");
  });

  it("redirects the old Contao URLs like Next did", () => {
    expect(resolve("/events")).toBe("/community/#app");
    expect(resolve("/events/")).toBe("/community/#app");
    expect(resolve("/team.html")).toBe("/ueber-uns/#team");
    expect(resolve("/blog/stretch-it-out")).toBe("/magazin/dehnuebungen-fuer-laeufer/");
    // specific event before the catch-all
    expect(resolve("/eventleser/flecker-tunnellauf-2")).toBe("/ausdauer-cup/flecker-tunnellauf/");
    expect(resolve("/eventleser/irgendwas")).toBe("/community/#app");
    expect(resolve("/newsreader/alt.html")).toBe("/magazin/");
    // new pages are not touched
    expect(resolve("/magazin/")).toBeNull();
    expect(resolve("/teamwear/")).toBeNull();
    expect(resolve("/blogger")).toBeNull();
  });

  it("sets the security headers and covers every redirect", () => {
    const file = htaccess();
    expect(file).toContain('Header always set X-Frame-Options "DENY"');
    expect(file).toContain('Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"');
    expect(file.match(/RewriteRule \^[a-z]/g)).toHaveLength(LEGACY_REDIRECTS.length);
  });
});
