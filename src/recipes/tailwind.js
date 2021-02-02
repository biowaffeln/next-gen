// @ts-check
import { outputFile, pathExists, writeFile } from "fs-extra"
import { withParser } from "jscodeshift"
import { updateApp, updatePackageJSON } from "../helpers/fs"
import { addImport } from "../helpers/jscodeshift"

/** @typedef {import("@/types/next-gen").Dependencies} Dependencies */

/** @type {Dependencies} */
const dependencies = {
	devDependencies: {
		autoprefixer: "^10.2.1",
		postcss: "^8.2.4",
		tailwindcss: "^2.0.2",
	},
}

const JS_TAILWIND_CONFIG = `module.exports = {
	purge: ["./pages/**/*.js", "./components/**/*.js"],
	darkMode: "media", // or "media" or "class"
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: []
}`

const TS_TAILWIND_CONFIG = `module.exports = {
	purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
	darkMode: "media", // "media" or "class"
	theme: {
		extend: {}
	},
	variants: {
		extend: {},
	},
	plugins: [],
}`

const POSTCSS_CONFIG = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`

const STYLES = `@tailwind base;
@tailwind components;
@tailwind utilities;
`

/**
 * Adds Tailwind support to a Next.js project.
 * - installs dependencies
 * - adds tailwind and postcss config files
 * - adds an import to
 */
export async function recipeTailwind() {
	await updatePackageJSON(dependencies)
	if (await pathExists("tsconfig.json")) {
		writeFile("tailwind.config.js", TS_TAILWIND_CONFIG)
	} else {
		writeFile("tailwind.config.js", JS_TAILWIND_CONFIG)
	}
	await writeFile("postcss.config.js", POSTCSS_CONFIG)
	await outputFile("styles/tailwind.css", STYLES)
	await updateApp(addTailwindImport)
}

const j = withParser("tsx")

/**
 * @param {string} src
 * @returns {string}
 */
function addTailwindImport(src) {
	const root = j(src)
	addImport(j, root, `import "../styles/tailwind.css";`)
	return root.toSource()
}
