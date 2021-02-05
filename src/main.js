// @ts-check
import yargs from "yargs";
import prompts from "prompts";
import { recipeMap } from "./recipes";
import c from "ansi-colors";

/** @typedef {import("./recipes").RecipeEntry} RecipeEntry */
/** @typedef {string | undefined} UserInput */

export function cli() {
	yargs
		.scriptName("next-gen")
		.command("add [recipe]", "add a recipe to a Next.js project", () => {}, add)
		.command("init", "create a new Next.js project", () => {}, init)
		.demandCommand()
		.recommendCommands()
		.strict()
		.help().argv;
}

/**
 * @param {{recipe: UserInput}} args
 */
async function add({ recipe: recipeName }) {
	const recipe = await getRecipeEntry(recipeName);

	if (!recipe) {
		console.log(`\nNo recipe called ${c.red.italic(
			/** @type {string} */ (recipeName)
		)} was found.
Try \`next-gen add\` to search for recipes.\n`);
	} else {
		console.log(`\nAdding ${recipe.title}...`);
		await recipe.run();
		console.log(`Recipe added ${c.green("✔")}\n`);
	}
}

/**
 * @param {UserInput} recipeName
 * @returns {Promise<RecipeEntry | undefined>}
 */
async function getRecipeEntry(recipeName) {
	if (!recipeName) {
		const response = await prompts({
			name: "recipeName",
			message: "Select a recipe",
			type: "autocomplete",
			choices: Object.entries(recipeMap)
				.map(([k, v]) => ({ value: k, ...v }))
				.sort((a, b) =>
					// prettier-ignore
					a.title < b.title ? -1 :
					a.title > b.title ?  1 :
					0
				),
		});
		if (!response.recipeName) {
			console.log(`\n${c.red.italic("Aborted.")} No recipes applied.\n`);
			process.exit(0);
		}
		return recipeMap[response.recipeName];
	}
	return recipeMap[recipeName];
}

function init() {
	// TODO: implement
}
