// @ts-check
import { readFile, readJSON, writeFile, writeJSON } from "fs-extra"
import merge from "lodash.merge"
import ansi from "ansi-colors"

/** @typedef {Object<string, any>} JSON */

/**
 * Merge the contents of a JSON file with
 * the provided object
 * @param {string} file
 * @param {JSON} object
 */
export async function updateJSON(file, object) {
	const src = await readJSON(file)
	merge(src, object)
	await writeJSON(file, src)
}

/**
 * Merge contents of package.json with the
 * provided object.
 * @param {JSON} dependencies
 */
export function updatePackageJSON(dependencies) {
	return updateJSON("package.json", dependencies).catch(() => {
		console.warn(ansi.bold.red("warning - no package.json found"))
	})
}

/**
 *
 * @param {string} file
 * @param {(src: string) => string} callback
 */
export async function updateFile(file, callback) {
	const src = await readFile(file, "utf-8")
	await writeFile(file, callback(src))
}
