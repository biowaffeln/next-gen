// @ts-check
import { readJSON, writeJSON } from "fs-extra"
import merge from "lodash.merge"
import ansi from "ansi-colors"

/**
 * Merge the contents of a JSON file with
 * the provided object
 * @param {string} file
 * @param {object} object
 */
export async function updateJSON(file, object) {
	const src = await readJSON(file)
	merge(src, object)
	await writeJSON(file, src)
}

/**
 * Merge contents of package.json with the
 * provided object.
 * @param {object} dependencies
 */
export function updatePackageJSON(dependencies) {
	return updateJSON("package.json", dependencies).catch(() =>
		console.warn(ansi.bold.red("warning - no package.json found"))
	)
}
