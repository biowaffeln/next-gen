/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/recipes/preact.test.ts TAP should update files > must match snapshot 1`] = `
{
  "name": "test-project",
  "dependencies": {
    "react": "npm:@preact/compat@^0.0.4",
    "react-dom": "npm:@preact/compat@^0.0.4",
    "next": "latest",
    "@prefresh/next": "^1.3.0",
    "preact": "^10.5.5",
    "preact-render-to-string": "^5.1.11",
    "react-ssr-prepass": "npm:preact-ssr-prepass@^1.1.2"
  },
  "devDependencies": {
    "next-plugin-preact": "^3.0.3"
  }
}

`

exports[`__tests__/recipes/preact.test.ts TAP should update files > must match snapshot 2`] = `
const withPreact = require("next-plugin-preact");

module.exports = withPreact({});
`

exports[`__tests__/recipes/preact.test.ts TAP works with existing plugins > must match snapshot 1`] = `
const otherPlugin = require("plugin");
const withPreact = require("next-plugin-preact");

const withOther = otherPlugin();

module.exports = withPreact(withOther({}));

`
