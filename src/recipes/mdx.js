// @ts-check
import { pathExists, writeFile } from "fs-extra";
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
	if (!(await pathExists("next.config.js"))) {
		await writeFile("next.config.js", NEXT_CONFIG);
	}
	await updateFile("next.config.js", addMDX);
}

/**
 * @param {string} src
 * @returns {string}
 */
function addMDX(src) {
	const root = j(src);
	addRequire(j, root, `const withMDX = require("@next/mdx")();`);

	const expression = root.find(j.AssignmentExpression, {
		left: {
			object: { name: "module" },
			property: { name: "exports" },
		},
	});

	expression.forEach((p) => {
		p.node.right = j.callExpression(j.identifier("withMDX"), [p.node.right]);
	});

	addWebpackOptions(
		j,
		root,
		j.objectProperty(
			j.identifier("pageExtensions"),
			j.template.expression`["js", "jsx", "mdx"]`
		)
	);
	return root.toSource();
}
