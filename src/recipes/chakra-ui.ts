import { updateApp, updatePackageJSON } from "../helpers/fs";
import { withParser } from "jscodeshift";
import { addImport } from "../helpers/jscodeshift";
import { Dependencies } from "../types/next-gen";

const dependencies: Dependencies = {
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

function addProvider(src: string): string {
	const root = j(src);
	addImport(j, root, `import { ChakraProvider } from "@chakra-ui/react";`);
	// wrap Component with ChakraProvider
	root
		.findJSXElements("Component")
		.replaceWith((component) =>
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier("ChakraProvider")),
				j.jsxClosingElement(j.jsxIdentifier("ChakraProvider")),
				[j.jsxText("\n"), component.node, j.jsxText("\n")]
			)
		);
	return root.toSource();
}
