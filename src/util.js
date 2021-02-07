// @ts-check

/**
 * @param {...string} keys
 * @returns {function(Object.<string, T>): Object.<string, T>}
 * @template T
 */
export const pick = (...keys) => (obj) =>
	keys.reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

/**
 * @param  {...Function} fns
 * @returns {function(any): any}
 */
export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

/**
 * @param {Record<string, import("./recipes").RecipeEntry>} recipeMap
 */
export const makeChoice = (recipeMap) =>
	Object.entries(recipeMap).map(([k, v]) => ({ value: k, ...v }));

/**
 * @param {string} input
 */
export const toKebab = (input) => input.replace(/\s+/g, "-").toLowerCase();
