import "../styles/normalize.css";
import "../styles/fonts.css";
import "../styles/ddx-global.css";
import "../styles/ddx-main.css";

import { AppProps } from "next/app";
import Router from "next/router";

import { ThemeProvider } from "./ThemeContext";

// OVERRIDE for now; only enable dark mode for /se1 page
const handleRouteChange = (url) => {
  const root = document.getElementsByTagName("html")[0];
  root.setAttribute("data-dark-mode-enabled", String(url === "/se1"));
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

Router.events.on("routeChangeStart", handleRouteChange);
