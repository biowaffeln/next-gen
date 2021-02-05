// @ts-check
import { pathExists, writeFile } from "fs-extra";
import {
	updateApp,
	updateDocument,
	updateJSON,
	updatePackageJSON,
} from "../helpers/fs";
import { BABELRC } from "../helpers/source";
import { withParser } from "jscodeshift";
import { addImport } from "../helpers/jscodeshift";

/** @typedef {import("@/types/next-gen").Dependencies} Dependencies */

/** @type {Dependencies} */
const dependencies = {
	dependencies: {
		"@chakra-ui/react": "^1.1.5",
		"@emotion/react": "^11.1.4",
		"@emotion/styled": "^11.0.0",
		"framer-motion": "^3.2.1",
	},
};

/**
 * Adds Chakra UI to a Next.js project.
 * Applies thefollowing changes:
 * - add dependencies to package.json
 * - add a theme provider to _app.(js|tsx)
 */
export async function recipeChakraUI() {
	await updatePackageJSON(dependencies);
	await updateApp(addProvider);
}

const j = withParser("tsx");

/**
 * @param {string} src
 * @returns {string}
 */
function addProvider(src) {
	const root = j(src);
	addImport(j, root, `import { ChakraProvider } from "@chakra-ui/react";`);
	// wrap Component with ChakraProvider
	root
		.findJSXElements("Component")
		.replaceWith((component) =>
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier("ChakraProvider")),
				j.jsxClosingElement(j.jsxIdentifier("ChakraProvider")),
				[component.node]
			)
		);
	return root.toSource();
}
