import { readFile } from "fs-extra";
import tap from "tap";
import { recipeSass } from "../../src/recipes/sass";
import setupDirectory from "../setup-dir";

tap.beforeEach((done) => {
	setupDirectory();
	done();
});

tap.test("should create files", async (t) => {
	await recipeSass();
	t.matchSnapshot(await readFile("styles/index.scss", "utf-8"), "styles");
	t.matchSnapshot(await readFile("package.json", "utf-8"), "package");
	t.matchSnapshot(await readFile("pages/_app.js", "utf-8"), "app");
	t.end();
});
