// @ts-check
import { move, pathExists, writeJSON } from "fs-extra";
import { updateFile, updatePackageJSON } from "../helpers/fs";
import { withParser } from "jscodeshift";
import ansi from "ansi-colors";
import { addImport } from "../helpers/jscodeshift";

/** @typedef {import("@/types/next-gen").Dependencies} Dependencies */
/** @typedef {import("jscodeshift").ObjectPattern} ObjectPattern */
/** @typedef {import("jscodeshift").Identifier} Identifier */

/** @type {Dependencies} */
const dependencies = {
	devDependencies: {
		"@types/react": "^17.0.0",
		"@types/node": "^14.14.22",
		typescript: "^4.1.3",
	},
};

const TSCONFIG = {
	compilerOptions: {
		target: "es5",
		lib: ["dom", "dom.iterable", "esnext"],
		allowJs: true,
		skipLibCheck: true,
		strict: false,
		forceConsistentCasingInFileNames: true,
		noEmit: true,
		esModuleInterop: true,
		module: "esnext",
		moduleResolution: "node",
		resolveJsonModule: true,
		isolatedModules: true,
		jsx: "preserve",
	},
	include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
	exclude: ["node_modules"],
};

const noop = () => {};

/**
 * Adds TypeScript to a Next.js project.
 * - installs dependencies
 * - adds a `tsconfig.json`
 * - converts existing `_app.js` and `_document.js` files to typescript
 */
export async function recipeTypeScript() {
	await writeJSON("tsconfig.json", TSCONFIG, { flag: "wx", spaces: 2 }).catch(
		noop
	);
	await updatePackageJSON(dependencies);
	// update _app.js file
	if (await pathExists("pages/_app.js")) {
		await move("pages/_app.js", "pages/_app.tsx");
		await updateFile("pages/_app.tsx", addAppTypes).catch(() => {
			console.warn(ansi.bold.red("failed to add types to _app.tsx"));
		});
	}
	// update _document.js files
	if (await pathExists("pages/_document.js")) {
		await move("pages/_document.js", "pages/_document.tsx");
		await updateFile("pages/_document.tsx", addDocumentTypes).catch(() => {
			console.warn(ansi.bold.red("failed to add types to _document.tsx"));
		});
	}
}

const j = withParser("tsx");
/**
 * Adds imports and types to an untyped Next.js _app file.
 * @param {string} src
 * @returns {string} src with types added
 */

function addAppTypes(src) {
	const root = j(src);

	addImport(j, root, `import type { AppProps } from "next/app";`);
	root
		.find(j.FunctionDeclaration)
		.at(0)
		.forEach((p) => {
			const parameter = /** @type {ObjectPattern} */ (p.node.params[0]);
			parameter.typeAnnotation = j.typeAnnotation(
				j.genericTypeAnnotation(j.identifier("AppProps"), null)
			);
		});

	return root.toSource();
}

/**
 * Adds imports and types to an untyped Next.js _document file.
 * @param {string} src
 * @returns {string} src with types added
 */
function addDocumentTypes(src) {
	const root = j(src);

	const initialPropsMethod = root.find(j.ClassMethod, {
		key: { name: "getInitialProps" },
	});

	if (initialPropsMethod.length > 0) {
		addImport(j, root, `import { DocumentContext } from "next/document";`);
		initialPropsMethod.forEach((p) => {
			const param = /** @type {Identifier} */ (p.node.params[0]);
			param.typeAnnotation = j.typeAnnotation(
				j.genericTypeAnnotation(j.identifier("DocumentContext"), null)
			);
		});
	}

	return root.toSource();
}
