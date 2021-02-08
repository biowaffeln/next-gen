import tap from "tap";
import { createFile, pathExists, readFile, remove, writeFile } from "fs-extra";
import { recipeTypeScript } from "../../src/recipes/typescript";
import { DOCUMENT_JS_WITH_INITIAL_PROPS } from "../test-source";
import setupDirectory from "../setup-dir";

tap.beforeEach((done) => {
	setupDirectory();
	done();
});

tap.test("should create files", async (t) => {
	await recipeTypeScript();
	t.matchSnapshot(await readFile("tsconfig.json", "utf-8"), "tsconfig");
	t.matchSnapshot(await readFile("package.json", "utf-8"), "package");
	t.matchSnapshot(await readFile("pages/_app.tsx", "utf-8"), "app");
	t.matchSnapshot(await readFile("pages/_document.tsx", "utf-8"), "document");
	t.end();
});

tap.test("should add types to document", async (t) => {
	await writeFile("pages/_document.js", DOCUMENT_JS_WITH_INITIAL_PROPS);
	await recipeTypeScript();
	t.matchSnapshot(await readFile("pages/_document.tsx", "utf-8"), "document");
	t.end();
});

tap.test("should throw error", async (t) => {
	t.test("with document", async (t) => {
		await writeFile("pages/_document.js", "syntax error");
		t.rejects(recipeTypeScript);
		t.end();
	});

	t.test("with app", async (t) => {
		await writeFile("pages/_app.js", "syntax error");
		t.rejects(recipeTypeScript);
		t.end();
	});

	t.end();
});

tap.test("should do nothing", async (t) => {
	await remove("pages/_document.js");
	await remove("pages/_app.js");
	await createFile("tsconfig.json");
	await recipeTypeScript();
	t.false(await pathExists("pages/_document.tsx"));
	t.false(await pathExists("pages/_app.tsx"));
	t.equal(await readFile("tsconfig.json", "utf-8"), "");
	t.end();
});
