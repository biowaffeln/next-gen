// @ts-check
import tap from "tap";
import { recipeChakraUI } from "../../src/recipes/chakra-ui";
import { readFile } from "fs-extra";
import setupDirectory from "../setup-dir";

// prettier-ignore
const TEST_APP =
`import Provider from "other-package";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  ) 
}

export default MyApp;
`

tap.beforeEach((done) => {
	setupDirectory({
		pages: {
			"_app.js": TEST_APP,
		},
	});
	done();
});

tap.test("should add Chakra UI to project", async (t) => {
	await recipeChakraUI();
	t.matchSnapshot(await readFile("package.json", "utf-8"));
	t.matchSnapshot(await readFile("pages/_app.js", "utf-8"));
	t.end();
});
