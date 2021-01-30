/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/generators/typescript.test.js TAP should add types to document > document 1`] = `
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
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

`

exports[`test/generators/typescript.test.js TAP should create files > app 1`] = `
import type { AppProps } from "next/app"

function MyApp({
  Component,
  pageProps
}: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

`

exports[`test/generators/typescript.test.js TAP should create files > document 1`] = `
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
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

`

exports[`test/generators/typescript.test.js TAP should create files > package 1`] = `
{"devDependencies":{"@types/react":"^17.0.0","@types/node":"^14.14.22","typescript":"^4.1.3"}}

`

exports[`test/generators/typescript.test.js TAP should create files > tsconfig 1`] = `
{}

`
