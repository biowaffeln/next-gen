// @ts-check
import { readFile } from "fs-extra"
import tap from "tap"
import { generatorSass } from "../../src/generators/sass"
import { APP_JS } from "../../src/helpers/source"

tap.beforeEach((done) => {
	// @ts-ignore
	const dir = tap.testdir({
		"package.json": "{}",
		pages: {
			"_app.js": APP_JS,
		},
	})
	process.chdir(dir)
	done()
})

tap.test("should create files", async (t) => {
	await generatorSass()
	t.matchSnapshot(await readFile("styles/index.scss", "utf-8"), "styles")
	t.matchSnapshot(await readFile("package.json", "utf-8"), "package")
	t.matchSnapshot(await readFile("pages/_app.js", "utf-8"), "app")
	t.end()
})
