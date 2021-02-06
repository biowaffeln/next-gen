// @ts-check
import { pathExists } from "fs-extra";
import { updateFile, updatePackageJSON } from "../helpers/fs";
import j from "jscodeshift";
import {
	addRequire,
	addConfigOptions,
	wrapNextConfig,
} from "../helpers/jscodeshift";
import { NEXT_CONFIG } from "../helpers/source";

/** @typedef {import("@/types/next-gen").Dependencies} Dependencies */

/** @type {Dependencies} */
const dependencies = {
	dependencies: {
		"@mdx-js/react": "^1.6.18",
		"@mdx-js/loader": "^1.5.1",
		"@next/mdx": "^10.0.6",
	},
};

/**
 * Adds MDX support to a Next.js project.
 */
export async function recipeMDX() {
	await updatePackageJSON(dependencies);
	const isTs = await pathExists("tsconfig.json");
	await updateFile("next.config.js", (src) => addMDX(src, isTs), {
		fallback: NEXT_CONFIG,
	});
}

/**
 * @param {string} src
 * @param {boolean} isTs
 * @returns {string}
 */
function addMDX(src, isTs) {
	const root = j(src);
	addRequire(j, root, `const withMDX = require("@next/mdx")();`);
	wrapNextConfig(j, root, j.identifier("withMDX"));

	const options = j.objectProperty(
		j.identifier("pageExtensions"),
		isTs
			? j.template.expression`["js", "tsx", "mdx"]`
			: j.template.expression`["js", "jsx", "mdx"]`
	);
	addConfigOptions(j, root, options);

	return root.toSource();
}
