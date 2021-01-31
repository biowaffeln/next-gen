/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/helpers/fs.test.js TAP updateApp fallback > updateApp fallback 1`] = `
import test from "test/js"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

`

exports[`test/helpers/fs.test.js TAP updateApp fallback typescript > updateApp typescript fallback 1`] = `
import test from "test/ts"

import { AppProps } from "next/app";

function MyApp({ Component, pagesProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
`

exports[`test/helpers/fs.test.js TAP updateApp update app.js > updateApp js 1`] = `
import test from "test/js"

const App = () => {};
`

exports[`test/helpers/fs.test.js TAP updateApp update app.tsx > updateApp tsx 1`] = `
import test from "test/ts"

const App = () => {};
`

exports[`test/helpers/fs.test.js TAP updatePackageJSON logs warning if there's no package.json > package.json error log 1`] = `
Array [
  "\\u001b[1m\\u001b[31mwarning - no package.json found\\u001b[39m\\u001b[22m\\n",
]
`
