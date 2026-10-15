import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Fonts are downloaded at build time and served from our own domain (no Google requests at runtime).
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AUSDAUER – Wir leben Sport",
    template: "%s | AUSDAUER",
  },
  description:
    "AUSDAUER – dein Laufsport-Spezialist in Betzdorf und Siegen. Laufanalyse, Beratung, Run Academy und Community seit 1986.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
