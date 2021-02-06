/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/recipes/mdx.test.js TAP should update files > must match snapshot 1`] = `
{
  "name": "test-project",
  "dependencies": {
    "react": "17.0.0",
    "react-dom": "17.0.0",
    "next": "latest",
    "@mdx-js/react": "^1.6.18",
    "@mdx-js/loader": "^1.5.1",
    "@next/mdx": "^10.0.6"
  }
}

`

exports[`__tests__/recipes/mdx.test.js TAP should update files > must match snapshot 2`] = `
const withMDX = require("@next/mdx")();

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"]
});
`

exports[`__tests__/recipes/mdx.test.js TAP should work with typescript > must match snapshot 1`] = `
const withMDX = require("@next/mdx")();

module.exports = withMDX({
  pageExtensions: ["js", "tsx", "mdx"]
});
`
