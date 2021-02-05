// @ts-check
import merge from "lodash.merge";
import tap from "tap";
import { APP_JS, DOCUMENT_JS } from "../src/helpers/source";
import { PACKAGE_JSON } from "./test-source";

/**
 * @param {object} overrides
 */
export default function setupDirectory(overrides = {}) {
	const directory = {
		"package.json": PACKAGE_JSON,
		"next.config.js": "module.exports = {};",
		pages: {
			"_app.js": APP_JS,
			"_document.js": DOCUMENT_JS,
		},
	};

	merge(directory, overrides);

	// @ts-ignore
	const dir = tap.testdir(directory);
	process.chdir(dir);
}
