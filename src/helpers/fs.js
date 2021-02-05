// @ts-check
import {
	outputFile,
	pathExists,
	readFile,
	readJSON,
	writeFile,
	writeJSON,
} from "fs-extra";
import merge from "lodash.merge";
import ansi from "ansi-colors";
import { APP_JS, APP_TSX } from "./source";

/** @typedef {Object<string, any>} JSON */

/**
 * Merges the contents of a JSON file with the provided object.
 * @param {string} file
 * @param {JSON} object
 */
export async function updateJSON(file, object) {
	const src = await readJSON(file);
	merge(src, object);
	await writeJSON(file, src, { spaces: 2 });
}

/**
 * Merges contents of package.json with the provided object.
 * @param {JSON} dependencies
 */
export function updatePackageJSON(dependencies) {
	return updateJSON("package.json", dependencies).catch(() => {
		console.warn(ansi.bold.red("warning - no package.json found"));
	});
}

/**
 * @callback updateCallback
 * @param {string} src The content of the updated file.
 * @returns {string} The updated content.
 */

/**
 * Updates the content of a file. Takes a path to
 * @param {string} file A path to the file to update.
 * @param {updateCallback} callback
 */
export async function updateFile(file, callback) {
	const src = await readFile(file, "utf-8");
	await writeFile(file, callback(src));
}

/**
 * @callback updateNextCallback
 * @param {string} src The content of the updated file.
 * @param {"javascript" | "typescript"} language The language of the updated file.
 * @returns {string} The updated content.
 */

/**
 * Updates the content of a Next.js _app.(js|tsx) file.
 * Provides fallback content if no _app.(js|tsx) is found.
 * @param {updateNextCallback} callback
 */
export async function updateApp(callback) {
	if (await pathExists("pages/_app.js")) {
		const src = await readFile("pages/_app.js", "utf-8");
		await outputFile("pages/_app.js", callback(src, "javascript"));
	} else if (await pathExists("pages/_app.tsx")) {
		const src = await readFile("pages/_app.tsx", "utf-8");
		await outputFile("pages/_app.tsx", callback(src, "typescript"));
	} else if (await pathExists("tsconfig.json")) {
		await outputFile("pages/_app.tsx", callback(APP_TSX, "typescript"));
	} else {
		await outputFile("pages/_app.js", callback(APP_JS, "javascript"));
	}
}
