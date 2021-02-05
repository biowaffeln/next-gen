// @ts-check
import { readFile, remove, writeFile } from "fs-extra";
import tap from "tap";
import { recipePreact } from "../../src/recipes/preact";
import setupDirectory from "../setup-dir";

tap.beforeEach((done) => {
	setupDirectory();
	done();
});

tap.test("should update files", async (t) => {
	await recipePreact();
	t.matchSnapshot(await readFile("package.json", "utf-8"));
	t.matchSnapshot(await readFile("next.config.js", "utf-8"));
	t.end();
});

tap.test("should create config if not exists", async (t) => {
	await remove("next.config.js");
	await recipePreact();
	t.matchSnapshot(await readFile("next.config.js", "utf-8"));
});

tap.test("works with existing plugins", async (t) => {
	await writeFile(
		"next.config.js",
		// prettier-ignore
		`const otherPlugin = require("plugin");
    
const withOther = otherPlugin();

module.exports = withOther({});
`
	);
	await recipePreact();
	t.matchSnapshot(await readFile("next.config.js", "utf-8"));
});
