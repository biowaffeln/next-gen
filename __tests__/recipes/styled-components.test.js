// @ts-check
import tap from "tap";
import { recipeStyledComponents } from "../../src/recipes/styled-components";
import { readFile, readJSON, writeFile, writeJSON } from "fs-extra";
import { recipeTypeScript } from "../../src/recipes/typescript";
import { DOCUMENT_TSX_WITH_INITIAL_PROPS } from "../test-source";
import setupDirectory from "../setup-dir";

tap.beforeEach((done) => {
	setupDirectory();
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

tap.test("should update .babelrc", async (t) => {
	await writeJSON(".babelrc", {
		presets: ["next/babel"],
		plugins: ["existing-plugin"],
	});
	await recipeStyledComponents();
	t.deepEqual(await readJSON(".babelrc"), {
		presets: ["next/babel"],
		plugins: ["existing-plugin", ["styled-components", { ssr: true }]],
	});
});
