import Document, { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/react";

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
          <Analytics />
        </body>
      </Html>
    );
  }
}

export default DevinDocument;
