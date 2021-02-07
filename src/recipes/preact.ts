import { updateFile, updatePackageJSON } from "../helpers/fs";
import j from "jscodeshift";
import { wrapNextConfig, addRequire } from "../helpers/jscodeshift";
import { NEXT_CONFIG } from "../helpers/source";
import { Dependencies } from "../types/next-gen";

const dependencies: Dependencies = {
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

function addPreact(src: string): string {
	const root = j(src);
	addRequire(j, root, `const withPreact = require("next-plugin-preact");`);
	wrapNextConfig(j, root, j.identifier("withPreact"));
	return root.toSource();
}
