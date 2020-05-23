import Head from "next/head";
import styles from "./layout.module.css";

import Nav from "./Nav";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Devin Nguyen" />
        <meta property="og:site_name" content="Devin Nguyen" />
        <meta name="description" content="software engineer" />
      </Head>

      {!home ? <Nav /> : null}

      <main role="main">{children}</main>
    </div>
  );
}
