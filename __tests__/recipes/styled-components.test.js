// @ts-check
import tap from "tap";
import { recipeStyledComponents } from "../../src/recipes/styled-components";
import { APP_JS, DOCUMENT_JS } from "../../src/helpers/source";
import { readFile, writeFile } from "fs-extra";
import { recipeTypeScript } from "../../src/recipes/typescript";
import { DOCUMENT_TSX_WITH_INITIAL_PROPS } from "../test-source";

tap.beforeEach((done) => {
	// @ts-ignore
	const dir = tap.testdir({
		"package.json": "{}",
		"next.config.js": "module.exports = {};",
		pages: {
			"_app.js": APP_JS,
			"_document.js": DOCUMENT_JS,
		},
	});
	process.chdir(dir);
	done();
});

tap.test("should add styled-components to a js project", async (t) => {
	await recipeStyledComponents();
	t.matchSnapshot(await readFile("package.json", "utf-8"));
	t.matchSnapshot(await readFile("pages/_app.js", "utf-8"));
	t.matchSnapshot(await readFile("pages/_document.js", "utf-8"));
	t.end();
});

tap.test("should add styled-components to a ts project", async (t) => {
	await recipeTypeScript();
	await writeFile("pages/_document.tsx", DOCUMENT_TSX_WITH_INITIAL_PROPS);
	await recipeStyledComponents();
	t.matchSnapshot(await readFile("package.json", "utf-8"));
	t.matchSnapshot(await readFile("pages/_app.tsx", "utf-8"));
	t.matchSnapshot(await readFile("pages/_document.tsx", "utf-8"));
	t.end();
});
