// @ts-check
import {
	outputFile,
	pathExists,
	readFile,
	readJSON,
	writeFile,
	writeJSON,
} from "fs-extra";
import merge from "deepmerge";
import ansi from "ansi-colors";
import { APP_JS, APP_TSX } from "./source";

/** @typedef {Object<string, any>} JSON */

/**
 * Merges the contents of a JSON file with the provided objects.
 *
 * @param {string} file
 * @param {JSON[]} objects
 */
export async function updateJSON(file, ...objects) {
	const src = await readJSON(file);
	const merged = merge.all([src, ...objects]);
	await writeJSON(file, merged, { spaces: 2 });
}

/**
 * Merges contents of package.json with the provided objects.
 *
 * @param {JSON[]} dependencies
 */
export function updatePackageJSON(...dependencies) {
	return updateJSON("package.json", ...dependencies).catch(() => {
		console.warn(ansi.bold.red("warning - no package.json found"));
	});
}

/**
 * @callback updateCallback
 * @param {string} src The content of the updated file.
 * @returns {string} The updated content.
 */

/**
 * Updates the content of a file.
 *
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
 *
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

/**
 * Updates the content of a Next.js _document.(js|tsx) file.
 * Provides fallback content if no _document.(js|tsx) is found.
 *
 * @param {updateNextCallback} callback
 */
export async function updateDocument(callback) {
	if (await pathExists("pages/_document.js")) {
		const src = await readFile("pages/_document.js", "utf-8");
		await outputFile("pages/_document.js", callback(src, "javascript"));
	} else if (await pathExists("pages/_document.tsx")) {
		const src = await readFile("pages/_document.tsx", "utf-8");
		await outputFile("pages/_document.tsx", callback(src, "typescript"));
	} else if (await pathExists("tsconfig.json")) {
		await outputFile("pages/_document.tsx", callback(APP_TSX, "typescript"));
	} else {
		await outputFile("pages/_document.js", callback(APP_JS, "javascript"));
	}
}
