// @ts-check
import yargs from "yargs";
import prompts from "prompts";
import { recipeMap } from "./recipes";
import c from "ansi-colors";
import { pathExists, readdir } from "fs-extra";
import { makeChoice, pick, pipe, toKebab } from "./util";

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
			choices: makeChoice(recipeMap)
				// remove descriptions
				.map(({ description, ...choice }) => choice)
				// sort alphabetically
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

async function init() {
	const opts = await prompts(
		[
			{
				name: "name",
				type: "text",
				message: "What should your project be called?\n",
				initial: "My Next Project",
			},
			{
				name: "directory",
				type: "text",
				message: "In which directory do you want to initialise your project?\n",
				// @ts-ignore
				initial: toKebab,
				validate: async (path) => {
					return (await pathExists(path)) && (await readdir(path)).length > 0
						? "Chosen directory is not empty."
						: true;
				},
			},
			{
				name: "language",
				type: "select",
				message: "Choose a language",
				choices: [
					{ value: "javascript", title: "JavaScript" },
					{ value: "typescript", title: "TypeScript" },
				],
			},
			{
				name: "styling",
				type: "select",
				message: "How do you want to style your application?",
				choices: [
					{
						value: "default",
						title: "default",
						description: "supports CSS Modules and styled-jsx",
					},
					...pipe(
						pick("tailwind", "styled-components", "chakra-ui"),
						makeChoice
					)(recipeMap),
				],
			},
			{
				name: "plugins",
				message: "Do you want to install aditional plugins?",
				type: "multiselect",
				hint: "Space to select. Return to submit",
				instructions: false,
				choices: pipe(pick("preact", "mdx"), makeChoice)(recipeMap),
			},
		],
		{
			onCancel: () => {
				process.exit();
			},
		}
	);

	const recipes = [
		recipeMap[opts.language],
		recipeMap[opts.styling],
		...opts.plugins.map((plugin) => recipeMap[plugin]),
	].filter(Boolean);

	console.log(recipes);
}
