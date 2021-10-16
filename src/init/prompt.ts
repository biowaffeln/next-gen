import * as prompts from 'prompts';
import { existsAsync, listAsync } from 'fs-jetpack';

const kebabCase = (input: string) => input.replace(/\s+/g, '-').toLowerCase();

const isNonEmptyDir = async (path: string) => {
	return (
		(await existsAsync(path)) === 'dir' &&
		((await listAsync(path)) ?? []).length > 0
	);
};

interface PromptResult {
	name: string;
	directory: string;
	styling: string;
	isTs: boolean;
}

export const initPrompt = async (): Promise<PromptResult> =>
	await prompts([
		{
			name: 'name',
			type: 'text',
			message: 'What should your project be called?\n',
		},
		{
			name: 'directory',
			type: 'text',
			message: 'In which directory do you want to initialize your project?\n',
			initial: kebabCase,
			validate: async (path) => {
				if (await isNonEmptyDir(path)) {
					return 'Directory is not empty.';
				} else {
					return true;
				}
			},
		},
		{
			name: 'isTs',
			type: 'toggle',
			message: 'Do you want to use Typescript?',
			initial: false,
			active: 'yes',
			inactive: 'no',
		},
		{
			name: 'styling',
			type: 'select',
			message: 'What styling solution would you like to use?',
			choices: [
				{
					title: 'none',
					value: 'none',
					description: 'supports CSS Modules out of the box',
				},
				{
					title: 'Sass',
					value: 'sass',
					description: 'CSS extension language',
				},
				{
					title: 'Tailwind CSS',
					value: 'tailwind',
					description: 'utility-first CSS framework',
				},
				{
					title: 'Styled Components',
					value: 'styled-components',
					description: 'CSS-in-JS library',
				},
				{
					title: 'Stitches',
					value: 'stitches',
					description: 'CSS-in-JS library',
				},
			],
		},
	]);
