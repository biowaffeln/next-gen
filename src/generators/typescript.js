// @ts-check
import { move, pathExists, writeJSON } from "fs-extra"
import { updatePackageJSON } from "../helpers/fs"

/** @type {import("@/types").Dependencies} */
const dependencies = {
	devDependencies: {
		"@types/react": "^17.0.0",
		"@types/node": "^14.14.22",
		typescript: "^4.1.3",
	},
}

const noop = () => {}

/**
 * Adds TypeScript to a Next.js project.
 */
export async function generatorTypeScript() {
	await writeJSON("tsconfig.json", {}, { flag: "wx" }).catch(noop)
	await updatePackageJSON(dependencies)
	// update _app.js and _document.js files
	if (await pathExists("pages/_app.js")) {
		await move("pages/_app.js", "pages/_app.tsx")
		// do jscodeshift magic
	}
	if (await pathExists("pages/_document.js")) {
		await move("pages/_document.js", "pages/_document.tsx")
		// do jscodeshift magic
	}
}
