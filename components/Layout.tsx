import Head from "next/head";

import styles from "./Layout.module.css";
import Nav from "./Nav";
import { LanguageSelector } from "./LanguageSelector";
import NoSSR from "./NoSSR";

export default function Layout({
  children,
  home,
  largeFormat,
}: {
  children: React.ReactNode;
  home?: boolean;
  largeFormat?: boolean;
}) {
  return (
    <NoSSR>
      <div
        className={`${styles.container} ${
          !!largeFormat ? styles.largeFormat : ""
        }`}
      >
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content="Devin Nguyen" />
          <meta property="og:site_name" content="Devin Nguyen" />
          <meta name="description" content="software engineer" />
          <link
            rel="icon"
            type="image/png"
            href="/images/favicon-16x16.png"
            sizes="16x16"
          />
          <link
            rel="icon"
            type="image/png"
            href="/images/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/images/android-chrome-192x192.png"
            sizes="192x192"
          />
          <link
            rel="icon"
            type="image/png"
            href="/images/favicon-512x512.png"
            sizes="512x512"
          />
          <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
        </Head>

        {!home ? <Nav /> : null}

        <main role="main">{children}</main>

        <footer>
          <LanguageSelector />
        </footer>
      </div>
    </NoSSR>
  );
}
