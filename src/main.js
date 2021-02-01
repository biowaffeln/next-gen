// @ts-check
import yargs from "yargs"
import prompts from "prompts"

export function cli() {
	yargs
		.scriptName("next-gen")
		.command("add [recipe]", "add a recipe to a Next.js project", () => {}, add)
		.command("init", "create a new Next.js project", () => {}, init)
		.demandCommand()
		.recommendCommands()
		.strict()
		.help().argv
}

/**
 * @param {{recipe?: string}} args
 */
async function add({ recipe }) {
	if (!recipe) {
		const response = await prompts({
			name: "recipe",
			message: "Select a recipe",
			type: "autocomplete",
			choices: [
				{ title: "TypeScript", value: "typescript" },
				{ title: "Sass", value: "sass" },
			],
		})
		if (!response.recipe) {
			process.exit(0)
		}
		recipe = response.recipe
	}
	// do something with recipe
}

function init() {
	// TODO: implement
}
