// @ts-check
import { readFile, writeFile } from "fs-extra";
import tap from "tap";
import { recipeMDX } from "../../src/recipes/mdx";
import setupDirectory from "../setup-dir";

tap.beforeEach((done) => {
	setupDirectory();
	done();
});

tap.test("should update files", async (t) => {
	await recipeMDX();
	t.matchSnapshot(await readFile("package.json", "utf-8"));
	t.matchSnapshot(await readFile("next.config.js", "utf-8"));
	t.end();
});

tap.test("should work with existing plugins", async (t) => {
	await writeFile(
		"next.config.js",
		// prettier-ignore
		`const withOtherPlugin = require("plugin");

module.exports = withOtherPlugin({});
`
	);
	await recipeMDX();
	t.matchSnapshot(await readFile("next.config.js", "utf-8"));
});
