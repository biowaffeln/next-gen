// @ts-check
import tap from "tap"
import { readFile, writeFile } from "fs-extra"
import { generatorTypeScript } from "../../src/generators/typescript"
import { APP_JS, DOCUMENT_JS } from "../../src/helpers/source"
import { DOCUMENT_JS_WITH_INITIAL_PROPS } from "../test-source"

tap.beforeEach((done) => {
	// @ts-ignore
	const dir = tap.testdir({
		"package.json": "{}",
		pages: {
			"_app.js": APP_JS,
			"_document.js": DOCUMENT_JS,
		},
	})
	process.chdir(dir)
	done()
})

tap.test("should create files", async (t) => {
	await generatorTypeScript()
	t.matchSnapshot(await readFile("tsconfig.json", "utf-8"), "tsconfig")
	t.matchSnapshot(await readFile("package.json", "utf-8"), "package")
	t.matchSnapshot(await readFile("pages/_app.tsx", "utf-8"), "app")
	t.matchSnapshot(await readFile("pages/_document.tsx", "utf-8"), "document")
	t.end()
})

tap.test("should add types to document", async (t) => {
	await writeFile("pages/_document.js", DOCUMENT_JS_WITH_INITIAL_PROPS)
	await generatorTypeScript()
	t.matchSnapshot(await readFile("pages/_document.tsx", "utf-8"), "document")
	t.end()
})
