import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "./components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.pokepicker.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PokePicker",
    template: "%s | PokePicker",
  },
  description:
    "PokePicker — pick your Pokémon, preview your selection, and share a card.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PokePicker",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@pokepicker",
  },
};

// Allow users to zoom up to 5x for accessibility (Apple HIG / a11y).
// width=device-width + initialScale=1 is the responsive baseline.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 预连接 sprite CDN，加速首屏图片加载 */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
