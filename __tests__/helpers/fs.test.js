// @ts-check
import tap from "tap";
import { outputFile, readFile, readJSON, remove, writeJSON } from "fs-extra";
import {
	updateApp,
	updateDocument,
	updatePackageJSON,
} from "../../src/helpers/fs";
import { stderr } from "test-console";
import { APP_JS, APP_TSX, DOCUMENT_JS } from "../../src/helpers/source";
import { DOCUMENT_TSX_WITH_INITIAL_PROPS } from "../test-source";

tap.beforeEach((done) => {
	// @ts-ignore
	const dir = tap.testdir({
		"package.json": `{"name": "test-project"}`,
	});
	process.chdir(dir);
	done();
});

tap.test("updatePackageJSON", async (t) => {
	t.test("updates package.json", async (t) => {
		await updatePackageJSON({ version: "1.0.0" });
		const res = await readJSON("package.json");
		t.deepEqual(res, {
			name: "test-project",
			version: "1.0.0",
		});
		t.end();
	});

	t.test("logs warning if there's no package.json", async (t) => {
		await remove("package.json");
		const inspect = stderr.inspect();
		await updatePackageJSON({ version: "1.0.0" });
		inspect.restore();
		t.matchSnapshot(inspect.output, "package.json error log");
		t.end();
	});
	t.end();
});

/** @type {(src: string, lang: "javascript" | "typescript") => string} */
const updateCallback = (src, lang) => {
	const stmt =
		lang === "javascript"
			? `import test from "test/js;"`
			: `import test from "test/ts;"`;
	return `${stmt}\n\n${src}`;
};

tap.test("updateApp", (t) => {
	t.test("fallback", async (t) => {
		await updateApp(updateCallback);
		const res = await readFile("pages/_app.js", "utf-8");
		t.matchSnapshot(res, "updateApp fallback");
		t.end();
	});

	t.test("fallback typescript", async (t) => {
		await writeJSON("tsconfig.json", {});
		await updateApp(updateCallback);
		const res = await readFile("pages/_app.tsx", "utf-8");
		t.matchSnapshot(res, "updateApp typescript fallback");
		t.end();
	});

	t.test("update _app.js", async (t) => {
		await outputFile("pages/_app.js", APP_JS);
		await updateApp(updateCallback);
		const res = await readFile("pages/_app.js", "utf-8");
		t.matchSnapshot(res, "updateApp js");
		t.end();
	});

	t.test("update _app.tsx", async (t) => {
		await outputFile("pages/_app.tsx", APP_TSX);
		await updateApp(updateCallback);
		const res = await readFile("pages/_app.tsx", "utf-8");
		t.matchSnapshot(res, "updateApp tsx");
		t.end();
	});

	t.end();
});

tap.test("updateDocument", (t) => {
	t.test("fallback", async (t) => {
		await updateDocument(updateCallback);
		const res = await readFile("pages/_document.js", "utf-8");
		t.matchSnapshot(res, "updateDocument fallback");
		t.end();
	});

	t.test("fallback typescript", async (t) => {
		await writeJSON("tsconfig.json", {});
		await updateDocument(updateCallback);
		const res = await readFile("pages/_document.tsx", "utf-8");
		t.matchSnapshot(res, "updateDocument typescript fallback");
		t.end();
	});

	t.test("update _document.js", async (t) => {
		await outputFile("pages/_document.js", DOCUMENT_JS);
		await updateDocument(updateCallback);
		const res = await readFile("pages/_document.js", "utf-8");
		t.matchSnapshot(res, "updateDocument js");
		t.end();
	});

	t.test("update _document.tsx", async (t) => {
		await outputFile("pages/_document.tsx", DOCUMENT_TSX_WITH_INITIAL_PROPS);
		await updateDocument(updateCallback);
		const res = await readFile("pages/_document.tsx", "utf-8");
		t.matchSnapshot(res, "updateDocument tsx");
		t.end();
	});

	t.end();
});
