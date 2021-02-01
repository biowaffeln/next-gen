// @ts-check
import { outputFile } from "fs-extra"
import { withParser } from "jscodeshift"
import { updateApp, updatePackageJSON } from "../helpers/fs"
import { addImport } from "../helpers/jscodeshift"

/** @typedef {import("@/types/next-gen").Dependencies} Dependencies */

/** @type {Dependencies} */
const dependencies = {
	devDependencies: {
		sass: "1.26.3",
	},
}

const STYLES_SCSS = `$color: hotpink;

body {
  color: $color;
}
`

/**
 * Adds Sass support to a Next.js project.
 * - installs dependencies
 * - creates a sample .scss file
 */
export async function recipeSass() {
	await updatePackageJSON(dependencies)
	await outputFile("styles/index.scss", STYLES_SCSS)
	await updateApp(addScssImport)
}

const j = withParser("tsx")

/**
 * @param {string} src
 * @returns {string}
 */
function addScssImport(src) {
	const root = j(src)
	addImport(j, root, `import "../styles/index.scss";`)
	return root.toSource()
}
