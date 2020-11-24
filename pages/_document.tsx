import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import HeadCustom from '../utils/headCustom';
import NextScriptCustom from '../utils/nextScriptCustom';
import HextScriptCustom from '../utils/nextScriptCustom';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    return (
      <Html>
        <HeadCustom />
        <body>
          <Main />
          <NextScriptCustom />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
