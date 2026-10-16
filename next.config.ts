import type { NextConfig } from "next";

/**
 * Static export for STRATO webspace (no Node server): `npm run build` → out/.
 * Redirects and security headers: src/lib/static-hosting.ts → out/.htaccess (scripts/write-htaccess.mts).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
