/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/recipes/sass.test.ts TAP should create files > app 1`] = `
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

`

exports[`__tests__/recipes/sass.test.ts TAP should create files > package 1`] = `
{
  "name": "test-project",
  "dependencies": {
    "react": "17.0.0",
    "react-dom": "17.0.0",
    "next": "latest"
  },
  "devDependencies": {
    "sass": "^1.32.6"
  }
}

`

exports[`__tests__/recipes/sass.test.ts TAP should create files > styles 1`] = `
$color: hotpink;

body {
  color: $color;
}

`
