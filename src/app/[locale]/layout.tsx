import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { ThemeInitializer } from "@/components/ThemeInitializer";

// Primary font - Tarnac with optimized loading
const tarnac = localFont({
  src: [
    {
      path: "../fonts/Tarnac-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Tarnac-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-tarnac",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

// Fallback font registration if Tarnac is unavailable
const robotoSlab = Roboto_Slab({
  weight: ["400", "700", "900"],
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL("https://devinnguyen.com"),
    title: "Devin Nguyen",
    description: "Devin Nguyen is a full-stack software engineer based in NYC.",
    keywords: ["Software Engineer", "Developer", "Devin Nguyen"],
    authors: [{ name: "Devin Nguyen" }],
    creator: "Devin Nguyen",
    alternates: {
      canonical: `https://devinnguyen.com/${locale}`,
      languages: {
        en: "https://devinnguyen.com/en",
        de: "https://devinnguyen.com/de",
        es: "https://devinnguyen.com/es",
        fr: "https://devinnguyen.com/fr",
        hi: "https://devinnguyen.com/hi",
        ko: "https://devinnguyen.com/ko",
        vi: "https://devinnguyen.com/vi",
        zh: "https://devinnguyen.com/zh",
        "x-default": "https://devinnguyen.com/en",
      },
    },
    icons: {
      icon: [
        { url: "/icons/blue_arrow.svg", type: "image/svg+xml" },
        { url: "/icons/blue_arrow_16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/blue_arrow_32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/blue_arrow_64.png", sizes: "64x64", type: "image/png" },
        {
          url: "/icons/blue_arrow_192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "/icons/blue_arrow_512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      shortcut: "/icons/blue_arrow_32.png",
      apple: "/icons/blue_arrow_192.png",
    },
    openGraph: {
      title: "Devin Nguyen",
      description: "Software Engineer",
      url: `https://devinnguyen.com/${locale}`,
      siteName: "Devin Nguyen",
      locale: locale.replace("-", "_"),
      type: "website",
      images: [
        {
          url: "https://devinnguyen.com/icons/blue_arrow_512.png",
          width: 512,
          height: 512,
          alt: "Devin Nguyen - Software Engineer",
        },
      ],
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
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html className={`${tarnac.variable} ${robotoSlab.variable}`} lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('theme');
                var theme = 'light';
                if (stored) {
                  try {
                    var parsed = JSON.parse(stored);
                    theme = parsed.state?.theme || 'light';
                  } catch (e) {
                    theme = 'light';
                  }
                } else {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Devin Nguyen",
              jobTitle: "Software Engineer",
              url: "https://devinnguyen.com",
              sameAs: [
                "https://www.linkedin.com/in/devinnguyen/",
                "https://github.com/devin2712",
                "https://twitter.com/ddxdevin",
              ],
            }),
          }}
        />
        <meta
          name="theme-color"
          content="#fafafa"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0a0a0a"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <ThemeInitializer />
      </body>
    </html>
  );
}
