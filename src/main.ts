import yargs from "yargs";
import prompts from "prompts";
import { recipeMap, RecipeEntry } from "./recipes";
import c from "ansi-colors";
import { copy, ensureDir, pathExists, readdir } from "fs-extra";
import { join } from "path";
import { makeChoice, pick, pipe, toKebab } from "./util";
import { updateFile, updatePackageJSON } from "./helpers/fs";

interface CmdResult {
	recipe: string | undefined;
}

export function cli() {
	yargs
		.scriptName("next-gen")
		.command<CmdResult>(
			"add [recipe]",
			"add a recipe to a Next.js project",
			() => {},
			add
		)
		.command("init", "create a new Next.js project", () => {}, init)
		.demandCommand()
		.recommendCommands()
		.strict()
		.help().argv;
}

async function add({ recipe: recipeName }: CmdResult) {
	if (!(await pathExists("package.json"))) {
		console.error(c.red("Error - no package.json was found."));
		process.exit(1);
	}

	const recipe = await getRecipeEntry(recipeName);

	if (!recipe) {
		console.log(`\nNo recipe called ${c.red.italic(
			<string>recipeName
		)} was found.
Try \`next-gen add\` to search for recipes.\n`);
	} else {
		console.log(`\nAdding ${recipe.title}...`);
		try {
			await recipe.run();
			console.log(`Recipe added ${c.green("✔")}\n`);
		} catch (e) {
			console.warn(`Error encountered:\n${c.red(e.message)}\n`);
		}
	}
}

async function getRecipeEntry(
	recipeName: string | undefined
): Promise<RecipeEntry | undefined> {
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
				initial: "My App",
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

	const recipes: RecipeEntry[] = [
		recipeMap[opts.language],
		recipeMap[opts.styling],
		...opts.plugins.map((plugin: string) => recipeMap[plugin]),
	].filter(Boolean);

	await ensureDir(opts.directory);
	await copy(join(__dirname, "../template"), opts.directory);
	process.chdir(opts.directory);

	await updatePackageJSON({ name: toKebab(opts.name) });

	await updateFile("README.md", (src) => {
		return src.replace(/PROJECT_NAME/, opts.name);
	});

	console.log("");
	// apply recipes
	for (const recipe of recipes) {
		try {
			await recipe.run();
			console.log(`Added ${recipe.title} ${c.green("✔")}`);
		} catch (e) {
			console.warn(`Error at ${recipe.title}:\n${c.red(e.message)}`);
		}
	}

	console.log(`
project was created successfully under:
${c.blue(opts.directory)}

install dependencies with:
${c.blue(`<npm|yarn|pnpm> install`)}

then start the development server with:
${c.blue(`<npm|yarn|pnpm> run dev`)}
`);
}
