import "../styles/ddx-global.css";
import "../styles/ddx-main.css";
import "../styles/fonts.css";
import "../styles/normalize.css";

import { AppProps } from "next/app";
import Router from "next/router";

import { useEffect, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";

import InternationalizationContext, {
  Language,
} from "../context/InternationalizationContext";
import { ThemeProvider } from "../context/ThemeContext";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useLanguage } from "../hooks/useLanguage";
import English from "../translations/en.json";
import French from "../translations/fr.json";

// OVERRIDE for now; only enable dark mode for /se1 page
const handleRouteChange = (url) => {
  const root = document.getElementsByTagName("html")[0];
  root.setAttribute("data-dark-mode-enabled", String(url === "/se1"));
};

export default function App({ Component, pageProps }: AppProps) {
  const [language, setLanguage] = useState<Language | null>(null);
  const [preferredLangauge, setPreferredLanguage] = useLanguage();

  const messages = useMemo(() => {
    switch (language) {
      case Language.fr:
        return French;
      case Language.en:
        return English;
      default:
        return English;
    }
  }, [language]);

  useEffect(() => {
    setLanguage(preferredLangauge);
  }, [preferredLangauge]);

  if (!language) { return null; }

  return (
    <ThemeProvider>
      <InternationalizationContext.Provider
        value={{
          currentLanguage: language as Language,
          updateLanguage: setPreferredLanguage as (_: Language) => void,
        }}
      >
        <IntlProvider
          locale={language as string}
          defaultLocale="en"
          messages={messages}
        >
          <Component {...pageProps} />

          {/* Vercel Analytics */}
          <Analytics />
          <SpeedInsights />
        </IntlProvider>
      </InternationalizationContext.Provider>
    </ThemeProvider>
  );
}

Router.events.on("routeChangeStart", handleRouteChange);
