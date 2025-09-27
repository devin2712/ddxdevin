import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

// Fallback font registration if Tarnac is unavailable 
// We expose this as a CSS variable to <html>
const robotoSlab = Roboto_Slab({
  weight: ["400", "700", "900"],
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devinnguyen.com"),
  title: "Devin Nguyen",
  description: "Software Engineer",
  keywords: ["Software Engineer", "Developer", "Devin Nguyen"],
  authors: [{ name: "Devin Nguyen" }],
  creator: "Devin Nguyen",
  icons: {
    icon: [
      { url: "/icons/blue_arrow.svg", type: "image/svg+xml" },
      { url: "/icons/blue_arrow_16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/blue_arrow_32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/blue_arrow_64.png", sizes: "64x64", type: "image/png" },
      { url: "/icons/blue_arrow_192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/blue_arrow_512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icons/blue_arrow_32.png",
    apple: "/icons/blue_arrow_192.png",
  },
  openGraph: {
    title: "Devin Nguyen",
    description: "Software Engineer",
    url: "https://devinnguyen.com",
    siteName: "Devin Nguyen",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Devin Nguyen",
    description: "Software Engineer",
    creator: "@ddxdevin",
    images: ["/icons/blue_arrow_512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "7tYLFWNl8gb1UKWxoXxg2W8nHQ23wfpMIsGwxGySFHo",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html className={robotoSlab.variable} lang={locale}>
      <head>
        <link
          rel="preload"
          href="/fonts/Tarnac-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Tarnac-Black.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}