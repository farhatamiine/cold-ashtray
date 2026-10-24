import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "cold.ashtray — Drawings & Writings",
    template: "%s — cold.ashtray",
  },
  description: "A private first exhibition of drawings, fragments, and writings by cold.ashtray.",
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "cold.ashtray — Drawings & Writings",
    description: "A private first exhibition.",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0908",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
