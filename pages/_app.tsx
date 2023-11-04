import "../styles/normalize.css";
import "../styles/fonts.css";
import "../styles/ddx-global.css";
import "../styles/ddx-main.css";

import { AppProps } from "next/app";
import Router from "next/router";

import { useMemo } from "react";
import { IntlProvider } from "react-intl";

import { ThemeProvider } from "../context/ThemeContext";
import InternationalizationContext, {
  Language,
} from "../context/InternationalizationContext";

import English from "../translations/en.json";
import French from "../translations/fr.json";
import { useLanguage } from "../hooks/useLanguage";

// OVERRIDE for now; only enable dark mode for /se1 page
const handleRouteChange = (url) => {
  const root = document.getElementsByTagName("html")[0];
  root.setAttribute("data-dark-mode-enabled", String(url === "/se1"));
};

export default function App({ Component, pageProps }: AppProps) {
  const [language, setLanguage] = useLanguage();

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

  return (
    <ThemeProvider>
      <InternationalizationContext.Provider
        value={{
          currentLanguage: language as Language,
          updateLanguage: setLanguage as (_: Language) => void,
        }}
      >
        <IntlProvider
          locale={language as string}
          defaultLocale="en"
          messages={messages}
        >
          <Component {...pageProps} />;
        </IntlProvider>
      </InternationalizationContext.Provider>
    </ThemeProvider>
  );
}

Router.events.on("routeChangeStart", handleRouteChange);
