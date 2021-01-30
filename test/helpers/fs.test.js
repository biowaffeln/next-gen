import tap from "tap"
import { readJSON, remove } from "fs-extra"
import { updatePackageJSON } from "../../src/helpers/fs"
import { stderr } from "test-console"

tap.beforeEach((done) => {
	const dir = tap.testdir({
		"package.json": `{"name": "test-project"}`,
	})
	process.chdir(dir)
	done()
})

tap.test("updates package.json", async (t) => {
	await updatePackageJSON({ version: "1.0.0" })
	const res = await readJSON("package.json")

	t.deepEqual(res, {
		name: "test-project",
		version: "1.0.0",
	})
	t.end()
})

tap.test("UpdatePackageJSON", async (t) => {
	await remove("package.json")
	const inspect = stderr.inspect()
	await updatePackageJSON({ version: "1.0.0" })
	inspect.restore()
	t.matchSnapshot(inspect.output, "package.json error log")
	t.end()
})
