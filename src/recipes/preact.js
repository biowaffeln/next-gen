// @ts-check
import { pathExists, writeFile } from "fs-extra";
import { updateFile, updatePackageJSON } from "../helpers/fs";
import j from "jscodeshift";
import { addRequire } from "../helpers/jscodeshift";

/** @typedef {import("@/types/next-gen").Dependencies} Dependencies */

/** @type {Dependencies} */
const dependencies = {
	dependencies: {
		"@prefresh/next": "^1.3.0",
		preact: "^10.5.5",
		"preact-render-to-string": "^5.1.11",
		react: "npm:@preact/compat@^0.0.3",
		"react-dom": "npm:@preact/compat@^0.0.3",
		"react-ssr-prepass": "npm:preact-ssr-prepass@^1.1.2",
	},
	devDependencies: {
		"next-plugin-preact": "^3.0.3",
	},
};

const NEXT_CONFIG = `module.exports = {};
`;

/**
 * Adds Preact to a Next.js project.
 */
export async function recipePreact() {
	await updatePackageJSON(dependencies);
	if (!(await pathExists("next.config.js"))) {
		await writeFile("next.config.js", NEXT_CONFIG);
	}
	await updateFile("next.config.js", addPreact);
}

/**
 * @param {string} src
 * @returns {string}
 */
function addPreact(src) {
	const root = j(src);
	addRequire(j, root, `const withPreact = require("next-plugin-preact");`);

	const expression = root.find(j.AssignmentExpression, {
		left: {
			object: { name: "module" },
			property: { name: "exports" },
		},
	});

	expression.forEach((p) => {
		p.node.right = j.callExpression(j.identifier("withPreact"), [p.node.right]);
	});

	return root.toSource();
}
