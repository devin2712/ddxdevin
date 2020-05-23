import "../styles/normalize.css";
import "../styles/fonts.css";
import "../styles/ddx-global.css";
import "../styles/ddx-main.css";

import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
