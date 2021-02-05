// @ts-check
import merge from "deepmerge";
import tap from "tap";
import { APP_JS, DOCUMENT_JS } from "../src/helpers/source";
import { PACKAGE_JSON } from "./test-source";

/**
 * @param {object} overrides
 */
export default function setupDirectory(overrides = {}) {
	const directory = merge(
		{
			"package.json": PACKAGE_JSON,
			"next.config.js": "module.exports = {};",
			pages: {
				"_app.js": APP_JS,
				"_document.js": DOCUMENT_JS,
			},
		},
		overrides
	);

	// @ts-ignore
	const dir = tap.testdir(directory);
	process.chdir(dir);
}
