// @ts-check
import { writeFile } from "fs-extra"
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
 */
export async function generatorSass() {
	await updatePackageJSON(dependencies)
	await writeFile("styles.scss", STYLES_SCSS)
	await updateApp(addScssImport)
}

const j = withParser("tsx")

/**
 * Adds .scss file import to app.(js|tsx)
 * @param {string} src
 * @returns {string}
 */
function addScssImport(src) {
	const root = j(src)
	addImport(j, root, `import "../styles.scss"`)
	return root.toSource()
}
