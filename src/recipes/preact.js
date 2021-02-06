// @ts-check
import { updateFile, updatePackageJSON } from "../helpers/fs";
import j from "jscodeshift";
import { addRequire, wrapNextConfig } from "../helpers/jscodeshift";
import { NEXT_CONFIG } from "../helpers/source";

/** @typedef {import("@/types/next-gen").Dependencies} Dependencies */

/** @type {Dependencies} */
const dependencies = {
	dependencies: {
		"@prefresh/next": "^1.3.0",
		preact: "^10.5.5",
		"preact-render-to-string": "^5.1.11",
		react: "npm:@preact/compat@^0.0.4",
		"react-dom": "npm:@preact/compat@^0.0.4",
		"react-ssr-prepass": "npm:preact-ssr-prepass@^1.1.2",
	},
	devDependencies: {
		"next-plugin-preact": "^3.0.3",
	},
};

/**
 * Adds Preact to a Next.js project.
 */
export async function recipePreact() {
	await updatePackageJSON(dependencies);
	await updateFile("next.config.js", addPreact, {
		fallback: NEXT_CONFIG,
	});
}

/**
 * @param {string} src
 * @returns {string}
 */
function addPreact(src) {
	const root = j(src);
	addRequire(j, root, `const withPreact = require("next-plugin-preact");`);
	wrapNextConfig(j, root, j.identifier("withPreact"));
	return root.toSource();
}
