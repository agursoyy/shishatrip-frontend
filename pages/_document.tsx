import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import HeadCustom from '../utils/headCustom';
import HextScriptCustom from '../utils/nextScriptCustom';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
