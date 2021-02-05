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
		"styled-components": "^5.0.0",
	},
	devDependencies: {
		"babel-plugin-styled-components": "^1.8.0",
	},
};

/** @type {Dependencies} */
const dependenciesTs = {
	devDependencies: {
		"@types/styled-components": "^5.1.7",
	},
};

/**
 * Adds styled-components support to a Next.js project.
 * - installs dependencies
 * - adds styled-components macro to `.babelrc`
 * - adds `getStaticProps` method to `_document.(js|tsx)`
 */
export async function recipeStyledComponents() {
	const isTs = await pathExists("tsconfig.json");
	await updatePackageJSON(dependencies, isTs ? dependenciesTs : {});

	if (!(await pathExists(".babelrc"))) {
		await writeFile(".babelrc", BABELRC);
	}
	await updateJSON(".babelrc", {
		plugins: [["styled-components", { ssr: true }]],
	});

	await updateDocument(addStylesheet);
	await updateApp(addProvider);
}

const j = withParser("tsx");

/**
 * @param {string} src
 * @param {"javascript" | "typescript"} language
 */
function addStylesheet(src, language) {
	const root = j(src);
	addImport(j, root, `import { ServerStyleSheet } from "styled-components";`);
	if (language == "typescript") {
		addImport(j, root, `import {DocumentContext} from "next/document"`);
	}

	const { statements } = j.template;

	const ctx = j.identifier("ctx");

	if (language === "typescript") {
		ctx.typeAnnotation = j.typeAnnotation(
			j.genericTypeAnnotation(j.identifier("DocumentContext"), null)
		);
	}

	// define initalProps method
	const getInitialProps = j.classMethod(
		"method",
		j.identifier("getInitialProps"),
		[ctx],
		j.blockStatement([
			...statements`const sheet = new ServerStyleSheet();
const originalRenderPage = ctx.renderPage;`,
			j.tryStatement(
				j.blockStatement([
					...statements`ctx.renderPage = () => originalRenderPage({
	enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
});
`,
					j.variableDeclaration("const", [
						j.variableDeclarator(
							j.identifier("initialProps"),
							j.awaitExpression(
								j.callExpression(
									j.memberExpression(
										j.identifier("Document"),
										j.identifier("getInitialProps")
									),
									[j.identifier("ctx")]
								)
							)
						),
					]),
					...statements`return {
	...initialProps,
	styles: (
		<>{initialProps.styles}{sheet.getStyleElement()}</>
	)
};`,
				]),
				null,
				j.blockStatement([j.template.statement`sheet.seal();`])
			),
		])
	);

	getInitialProps.static = true;
	getInitialProps.async = true;

	root
		.find(j.ClassDeclaration)
		.forEach((p) => p.get("body").get("body").unshift(getInitialProps));

	return root.toSource();
}

/**
 * @param {string} src
 */
function addProvider(src) {
	const root = j(src);
	addImport(j, root, `import { ThemeProvider } from "styled-components";`);
	root.get("body");
	// add theme object after imports
	root
		.find(j.ImportDeclaration)
		.at(-1)
		.insertAfter(
			j.template.statement`const theme = {
	colors: {
		primary: "#0070f3",
	},
};\n\n`
		)
		.insertAfter(" ");

	// wrap Component with ThemeProvider
	root
		.findJSXElements("Component")
		.replaceWith((component) =>
			j.jsxElement(
				j.jsxOpeningElement(j.jsxIdentifier("ThemeProvider"), [
					j.jsxAttribute(
						j.jsxIdentifier("theme"),
						j.jsxExpressionContainer(j.identifier("theme"))
					),
				]),
				j.jsxClosingElement(j.jsxIdentifier("ThemeProvider")),
				[component.node]
			)
		);
	return root.toSource();
}
