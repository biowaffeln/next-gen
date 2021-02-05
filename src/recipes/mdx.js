// @ts-check
import { pathExists } from "fs-extra";
import { updateFile, updatePackageJSON } from "../helpers/fs";
import j from "jscodeshift";
import { addRequire, addWebpackOptions } from "../helpers/jscodeshift";
import { NEXT_CONFIG } from "../helpers/source";

/** @typedef {import("@/types/next-gen").Dependencies} Dependencies */

/** @type {Dependencies} */
const dependencies = {};

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

	const moduleExport = root.find(j.AssignmentExpression, {
		left: {
			object: { name: "module" },
			property: { name: "exports" },
		},
	});

	moduleExport.forEach((p) => {
		p.node.right = j.callExpression(j.identifier("withMDX"), [p.node.right]);
	});

	const { expression } = j.template;

	const pageExtensions = isTs
		? expression`["js", "tsx", "mdx"]`
		: expression`["js", "jsx", "mdx"]`;

	addWebpackOptions(
		j,
		root,
		j.objectProperty(j.identifier("pageExtensions"), pageExtensions)
	);
	return root.toSource();
}
