// @ts-check
import { recipeSass } from "./sass";
import { recipeTypeScript } from "./typescript";
import { recipeTailwind } from "./tailwind";
import { recipePreact } from "./preact";
import { recipeStyledComponents } from "./styled-components";
import { recipeChakraUI } from "./chakra-ui";
import { recipeMDX } from "./mdx";

/**
 * @typedef {object} RecipeEntry
 * @property {string} title
 * @property {() => Promise<any>} run
 */

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
	"styled-components": {
		title: "styled-components",
		run: recipeStyledComponents,
	},
	"chakra-ui": {
		title: "Chakra UI",
		run: recipeChakraUI,
	},
	mdx: {
		title: "MDX",
		run: recipeMDX,
	},
};
