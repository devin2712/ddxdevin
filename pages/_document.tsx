import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

class DevinDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html
        lang="en"
        data-dark-mode-enabled={this.props.__NEXT_DATA__.page === "/se1"}
      >
        <Head />
        <body>
          <Main />
          <NextScript />

          {/* Vercel Analytics */}
          <Analytics />
          <SpeedInsights />
        </body>
      </Html>
    );
  }
}

export default DevinDocument;
