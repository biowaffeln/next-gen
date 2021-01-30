import tap from "tap"
import { readFile } from "fs-extra"
import { generatorTypeScript } from "../../src/generators/typescript"

tap.beforeEach((done) => {
	const dir = tap.testdir({
		"package.json": "{}",
	})
	process.chdir(dir)
	done()
})

tap.test("should create files", async (t) => {
	await generatorTypeScript()
	t.matchSnapshot(await readFile("tsconfig.json", "utf-8"), "config")
	t.matchSnapshot(await readFile("package.json", "utf-8"), "package")
	t.end()
})
