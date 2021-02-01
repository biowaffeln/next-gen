/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/recipes/sass.test.js TAP should create files > app 1`] = `
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

`

exports[`test/recipes/sass.test.js TAP should create files > package 1`] = `
{"devDependencies":{"sass":"1.26.3"}}

`

exports[`test/recipes/sass.test.js TAP should create files > styles 1`] = `
$color: hotpink;

body {
  color: $color;
}

`
