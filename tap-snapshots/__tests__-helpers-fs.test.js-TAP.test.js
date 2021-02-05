/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/helpers/fs.test.js TAP updateApp fallback > updateApp fallback 1`] = `
import test from "test/js;"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

`

exports[`__tests__/helpers/fs.test.js TAP updateApp fallback typescript > updateApp typescript fallback 1`] = `
import test from "test/ts;"

import { AppProps } from "next/app";

function MyApp({ Component, pagesProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
`

exports[`__tests__/helpers/fs.test.js TAP updateApp update _app.js > updateApp js 1`] = `
import test from "test/js;"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

`

exports[`__tests__/helpers/fs.test.js TAP updateApp update _app.tsx > updateApp tsx 1`] = `
import test from "test/ts;"

import { AppProps } from "next/app";

function MyApp({ Component, pagesProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
`

exports[`__tests__/helpers/fs.test.js TAP updateDocument fallback > updateDocument fallback 1`] = `
import test from "test/js;"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

`

exports[`__tests__/helpers/fs.test.js TAP updateDocument fallback typescript > updateDocument typescript fallback 1`] = `
import test from "test/ts;"

import { AppProps } from "next/app";

function MyApp({ Component, pagesProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
`

exports[`__tests__/helpers/fs.test.js TAP updateDocument update _document.js > updateDocument js 1`] = `
import test from "test/js;"

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

exports[`__tests__/helpers/fs.test.js TAP updateDocument update _document.tsx > updateDocument tsx 1`] = `
import test from "test/ts;"

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

exports[`__tests__/helpers/fs.test.js TAP updateFile should update file > must match snapshot 1`] = `
"use strict"
console.log("hello")
`

exports[`__tests__/helpers/fs.test.js TAP updateFile should use fallback > must match snapshot 1`] = `
"use strict"
console.log("hello")
`

exports[`__tests__/helpers/fs.test.js TAP updatePackageJSON logs warning if there's no package.json > package.json error log 1`] = `
Array [
  "\\u001b[1m\\u001b[31mwarning - no package.json found\\u001b[39m\\u001b[22m\\n",
]
`
