// @ts-check
import { recipeSass } from "./sass";
import { recipeTypeScript } from "./typescript";
import { recipeTailwind } from "./tailwind";
import { recipePreact } from "./preact";

/** @typedef {{title: string, run: () => Promise<any>}} RecipeEntry */

/** @type {Record<string, RecipeEntry>} */
export const recipeMap = {
	sass: {
		title: "Sass",
		run: recipeSass,
	},
	typescript: {
		title: "TypeScript",
		run: recipeTypeScript,
	},
	tailwind: {
		title: "Tailwind CSS",
		run: recipeTailwind,
	},
	preact: {
		title: "Preact",
		run: recipePreact,
	},
};
