// @ts-check
import tap from "tap";
import { createFile, pathExists, readFile, remove, writeFile } from "fs-extra";
import { recipeTypeScript } from "../../src/recipes/typescript";
import { APP_JS, DOCUMENT_JS } from "../../src/helpers/source";
import { DOCUMENT_JS_WITH_INITIAL_PROPS } from "../test-source";
import { stderr } from "test-console";

tap.beforeEach((done) => {
	// @ts-ignore
	const dir = tap.testdir({
		"package.json": "{}",
		pages: {
			"_app.js": APP_JS,
			"_document.js": DOCUMENT_JS,
		},
	});
	process.chdir(dir);
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

tap.test("should error", async (t) => {
	const inspect = stderr.inspect();
	await writeFile("pages/_document.js", "syntax error");
	await writeFile("pages/_app.js", "syntax error");
	await recipeTypeScript();
	inspect.restore();
	t.equals(inspect.output.length, 2);
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
