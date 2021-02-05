/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/recipes/preact.test.js TAP should create config if not exists > must match snapshot 1`] = `
const withPreact = require("next-plugin-preact");

module.exports = withPreact({});

`

exports[`test/recipes/preact.test.js TAP should update files > must match snapshot 1`] = `
{
  "dependencies": {
    "@prefresh/next": "^1.3.0",
    "preact": "^10.5.5",
    "preact-render-to-string": "^5.1.11",
    "react": "npm:@preact/compat@^0.0.3",
    "react-dom": "npm:@preact/compat@^0.0.3",
    "react-ssr-prepass": "npm:preact-ssr-prepass@^1.1.2"
  },
  "devDependencies": {
    "next-plugin-preact": "^3.0.3"
  }
}

`

exports[`test/recipes/preact.test.js TAP should update files > must match snapshot 2`] = `
const withPreact = require("next-plugin-preact");

module.exports = withPreact({});
`

exports[`test/recipes/preact.test.js TAP works with existing plugins > must match snapshot 1`] = `
const otherPlugin = require("plugin");
const withPreact = require("next-plugin-preact");

const withOther = otherPlugin();

module.exports = withPreact(withOther({}));

`
