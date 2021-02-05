/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/recipes/chakra-ui.test.js TAP should add Chakra UI to project > must match snapshot 1`] = `
{
  "name": "test-project",
  "dependencies": {
    "react": "17.0.0",
    "react-dom": "17.0.0",
    "next": "latest",
    "@chakra-ui/react": "^1.1.5",
    "@emotion/react": "^11.1.4",
    "@emotion/styled": "^11.0.0",
    "framer-motion": "^3.2.1"
  }
}

`

exports[`__tests__/recipes/chakra-ui.test.js TAP should add Chakra UI to project > must match snapshot 2`] = `
import Provider from "other-package";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ChakraProvider><Component {...pageProps} /></ChakraProvider>
    </Provider>
  ); 
}

export default MyApp;

`
