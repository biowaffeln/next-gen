// @ts-check
import tap from "tap";
import {
	addImport,
	addRequire,
	addConfigOptions,
	wrapNextConfig,
} from "../../src/helpers/jscodeshift";
import { withParser } from "jscodeshift";

/** @typedef {import("@/types/tap").Test} Test */
/** @typedef {import("jscodeshift").ObjectProperty} ObjectProperty */

/**
 * A jscodeshift test case
 *
 * @typedef {Object} TestCase
 * @property {string} code
 * @property {string} statement
 * @property {string} expected
 */

/**
 * @param {string} name
 * @param {Test} t
 * @param {TestCase} testCase
 */
const importTestCase = (name, t, { code, statement, expected }) => {
	t.test(name, (t) => {
		const j = withParser("tsx");
		const root = j(code);
		addImport(j, root, statement);
		t.equal(root.toSource(), expected);
		t.end();
	});
};

tap.test("addImports", (t) => {
	importTestCase("should add import to empty file", t, {
		code: "",
		statement: `import test from "test"`,
		expected: `import test from "test"`,
	});
	importTestCase("should add import, with proper formatting", t, {
		code: "const value = test();",
		statement: `import test from "test"`,
		expected: `import test from "test"

const value = test();`,
	});

	importTestCase("should merge imports", t, {
		code: `import React from "react";`,
		statement: `import { Component } from "react";`,
		expected: `import React, { Component } from "react";`,
	});

	importTestCase("should not merge imports", t, {
		code: `import thing from "lib";`,
		statement: `import otherThing from "other-lib";`,
		expected: `import thing from "lib";
import otherThing from "other-lib";`,
	});

	importTestCase("should add imports with body", t, {
		code: `import thing from "lib";

const test = thing();`,
		statement: `import otherThing from "other-lib";`,
		expected: `import thing from "lib";
import otherThing from "other-lib";

const test = thing();`,
	});

	importTestCase("should add import without export", t, {
		code: "",
		statement: `import "../styles/index.css"`,
		expected: `import "../styles/index.css"`,
	});

	importTestCase(
		"should add import without export, with proper formatting",
		t,
		{
			code: "const test = 123;",
			statement: `import "../styles/index.css";`,
			expected: `import "../styles/index.css";

const test = 123;`,
		}
	);

	importTestCase("should not merge type import", t, {
		code: `import app from "app"

app()`,
		statement: `import type { Test } from "app"`,
		expected: `import app from "app"
import type { Test } from "app"

app()`,
	});

	importTestCase("should merge type imports", t, {
		code: `import type {Test} from "test"`,
		statement: `import type {Test2} from "test"`,
		expected: `import type { Test, Test2 } from "test";`,
	});
	t.end();
});

/**
 * @param {string} name
 * @param {Test} t
 * @param {TestCase} testCase
 */
const requireTestCase = (name, t, { code, statement, expected }) => {
	t.test(name, (t) => {
		const j = withParser("tsx");
		const root = j(code);
		addRequire(j, root, statement);
		t.equal(root.toSource(), expected);
		t.end();
	});
};

tap.test("addRequire", (t) => {
	requireTestCase("should insert to empty file", t, {
		code: "",
		statement: `const test = require("test");`,
		expected: `const test = require("test");`,
	});

	requireTestCase("should insert to file with content", t, {
		code: "module.exports = {}",
		statement: `const test = require("test");`,
		// prettier-ignore
		expected:
`const test = require("test");

module.exports = {}`,
	});

	requireTestCase("should append after existing requires", t, {
		// prettier-ignore
		code:
`const thing = require("module");

const abc = thing();
module.exports = {}`,
		statement: `const test = require("test");`,
		// prettier-ignore
		expected:
`const thing = require("module");
const test = require("test");

const abc = thing();
module.exports = {}`,
	});

	t.end();
});

/**
 * @param {string} name
 * @param {Test} t
 * @param {{code: string, expected: string}} testCase
 */
const addConfigTestCase = (name, t, { code, expected }) => {
	t.test(name, (t) => {
		const j = withParser("js");

		const prop = j.objectProperty(
			j.identifier("key"),
			j.stringLiteral("value")
		);

		const root = j(code);
		addConfigOptions(j, root, prop);
		t.equal(root.toSource(), expected);
		t.end();
	});
};

tap.test("addConfigOptions", (t) => {
	addConfigTestCase("simple insert", t, {
		code: `module.exports = {};`,
		expected: `module.exports = {
  key: "value"
};`,
	});

	addConfigTestCase("with wrapper function", t, {
		code: `module.exports = withPlugin({});`,
		expected: `module.exports = withPlugin({
  key: "value"
});`,
	});

	addConfigTestCase("with wrapper function without object", t, {
		code: `module.exports = withPlugin();`,
		expected: `module.exports = withPlugin({
  key: "value"
});`,
	});

	addConfigTestCase("with wrapper function without object", t, {
		code: `module.exports = first(second());`,
		expected: `module.exports = first(second({
  key: "value"
}));`,
	});

	t.test("should throw", (t) => {
		const j = withParser("js");

		const prop = j.objectProperty(
			j.identifier("key"),
			j.stringLiteral("value")
		);
		t.throws(() => addConfigOptions(j, j(``), prop));
		t.throws(() => addConfigOptions(j, j(`module.exports = ""`), prop));
		t.end();
	});

	t.end();
});

tap.test("wrapNextConfig", (t) => {
	t.test("should wrap", (t) => {
		const j = withParser("js");
		const wrapper = j.identifier("myPlugin");
		const root = j(`module.exports = {}`);
		wrapNextConfig(j, root, wrapper);
		t.equal(root.toSource(), `module.exports = myPlugin({})`);
		t.end();
	});

	t.test("should throw", (t) => {
		const j = withParser("js");
		const wrapper = j.identifier("myPlugin");
		t.throws(() => wrapNextConfig(j, j(``), wrapper));
		t.end();
	});

	t.end();
});
