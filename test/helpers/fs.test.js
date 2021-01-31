// @ts-check
import tap from "tap"
import { outputFile, readFile, readJSON, remove, writeFile } from "fs-extra"
import { updateApp, updatePackageJSON } from "../../src/helpers/fs"
import { stderr } from "test-console"

tap.beforeEach((done) => {
	// @ts-ignore
	const dir = tap.testdir({
		"package.json": `{"name": "test-project"}`,
	})
	process.chdir(dir)
	done()
})

tap.test("updatePackageJSON", async (t) => {
	t.test("updates package.json", async (t) => {
		await updatePackageJSON({ version: "1.0.0" })
		const res = await readJSON("package.json")
		t.deepEqual(res, {
			name: "test-project",
			version: "1.0.0",
		})
		t.end()
	})

	t.test("logs warning if there's no package.json", async (t) => {
		await remove("package.json")
		const inspect = stderr.inspect()
		await updatePackageJSON({ version: "1.0.0" })
		inspect.restore()
		t.matchSnapshot(inspect.output, "package.json error log")
		t.end()
	})
	t.end()
})

/** @type {(src: string, lang: "javascript" | "typescript") => string} */
const updateCallback = (src, lang) => {
	const stmt =
		lang === "javascript"
			? `import test from "test/js"`
			: `import test from "test/ts"`
	return `${stmt}\n\n${src}`
}

tap.test("updateApp", (t) => {
	t.test("fallback", async (t) => {
		await updateApp(updateCallback)
		const res = await readFile("pages/_app.js", "utf-8")
		t.matchSnapshot(res, "updateApp fallback")
		t.end()
	})

	t.test("fallback typescript", async (t) => {
		await writeFile("tsconfig.json", "{}")
		await updateApp(updateCallback)
		const res = await readFile("pages/_app.tsx", "utf-8")
		t.matchSnapshot(res, "updateApp typescript fallback")
		t.end()
	})

	t.test("update app.js", async (t) => {
		await outputFile("pages/_app.js", "const App = () => {};")
		await updateApp(updateCallback)
		const res = await readFile("pages/_app.js", "utf-8")
		t.matchSnapshot(res, "updateApp js")
		t.end()
	})

	t.test("update app.tsx", async (t) => {
		await outputFile("pages/_app.tsx", "const App = () => {};")
		await updateApp(updateCallback)
		const res = await readFile("pages/_app.tsx", "utf-8")
		t.matchSnapshot(res, "updateApp tsx")
		t.end()
	})

	t.end()
})
