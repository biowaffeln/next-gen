import { recipeSass } from "./sass";
import { recipeTypeScript } from "./typescript";
import { recipeTailwind } from "./tailwind";
import { recipePreact } from "./preact";
import { recipeStyledComponents } from "./styled-components";
import { recipeChakraUI } from "./chakra-ui";
import { recipeMDX } from "./mdx";

export interface RecipeEntry {
	title: string;
	run: () => Promise<any>;
	description?: string;
}

export const validate = <T extends Record<string, RecipeEntry>>(a: T) => a;

export const recipeMap = validate({
	sass: {
		title: "Sass",
		run: recipeSass,
		description: "CSS extension language",
	},
	typescript: {
		title: "TypeScript",
		run: recipeTypeScript,
	},
	tailwind: {
		title: "Tailwind CSS",
		run: recipeTailwind,
		description: "utility-first CSS framework",
	},
	preact: {
		title: "Preact",
		run: recipePreact,
		description: "3kb React alternative",
	},
	"styled-components": {
		title: "styled-components",
		run: recipeStyledComponents,
		description: "popular CSS-in-JS library",
	},
	"chakra-ui": {
		title: "Chakra UI",
		run: recipeChakraUI,
		description: "component library",
	},
	mdx: {
		title: "MDX",
		run: recipeMDX,
		description: "JSX in Markdown Documents",
	},
});
