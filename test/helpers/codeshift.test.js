// @ts-check
import tap from "tap"
import { addImport } from "../../src/helpers/jscodeshift"
import { withParser } from "jscodeshift"
const j = withParser("tsx")

/**
 * A jscodeshift test case
 * @typedef {Object} TestCase
 * @property {string} code
 * @property {string} importString
 * @property {string} expected
 */

/** @typedef {import("@/types/tap").Test} Test */

/**
 * @param {string} name
 * @param {Test} t
 * @param {TestCase} testCase
 */
const testCase = (name, t, { code, importString, expected }) => {
	t.test(name, (t) => {
		const root = j(code)
		addImport(j, root, importString)
		t.equal(root.toSource(), expected)
		t.end()
	})
}

tap.test("addImports", (t) => {
	testCase("should add import to empty file", t, {
		code: "",
		importString: `import test from "test"`,
		expected: `import test from "test"`,
	})
	testCase("should add import, with proper formatting", t, {
		code: "const value = test();",
		importString: `import test from "test"`,
		expected: `import test from "test"

const value = test();`,
	})

	testCase("should merge imports", t, {
		code: `import React from "react";`,
		importString: `import { Component } from "react";`,
		expected: `import React, { Component } from "react";`,
	})

	testCase("should not merge imports", t, {
		code: `import thing from "lib";`,
		importString: `import otherThing from "other-lib";`,
		expected: `import thing from "lib";
import otherThing from "other-lib";`,
	})

	testCase("should add imports with body", t, {
		code: `import thing from "lib";

const test = thing();`,
		importString: `import otherThing from "other-lib";`,
		expected: `import thing from "lib";
import otherThing from "other-lib";

const test = thing();`,
	})

	testCase("should add import without export", t, {
		code: "",
		importString: `import "../styles/index.css"`,
		expected: `import "../styles/index.css"`,
	})

	testCase("should add import without export, with proper formatting", t, {
		code: "const test = 123;",
		importString: `import "../styles/index.css";`,
		expected: `import "../styles/index.css";

const test = 123;`,
	})

	testCase("should not merge type import", t, {
		code: `import app from "app"

app()`,
		importString: `import type { Test } from "app"`,
		expected: `import app from "app"
import type { Test } from "app"

app()`,
	})

	testCase("should merge type imports", t, {
		code: `import type {Test} from "test"`,
		importString: `import type {Test2} from "test"`,
		expected: `import type { Test, Test2 } from "test";`,
	})
	t.end()
})
