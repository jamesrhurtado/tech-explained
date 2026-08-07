import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech en 60 — Investiga. Entiende. Explícalo.",
  description:
    "Elige un concepto tecnológico, investígalo durante 15 minutos y explícalo en 60 segundos.",
};

export const viewport: Viewport = {
  themeColor: "#101613",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
