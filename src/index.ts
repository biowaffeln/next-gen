#!/usr/bin/env node

import prompts from 'prompts';
import { Change, writeChanges } from './actions/writeChanges';
import { init } from './init';
import { tailwind } from './recipes/tailwind/tailwind';
import { toValidPath } from './utils/toValidPath';

const main = async () => {
	const response = await prompts([
		{
			type: 'text',
			name: 'name',
			message: 'What is the name of your project?',
			initial: 'My App',
		},
		{
			type: 'text',
			name: 'directory',
			message: 'Where do you want to create your project?',
			initial: (prev) => toValidPath(prev),
		},
		{
			type: 'select',
			name: 'lang',
			message: 'What language would you like to use?',
			choices: [
				{ title: 'JavaScript', value: 'js' },
				{ title: 'TypeScript', value: 'ts' },
			],
		},
		{
			type: 'select',
			name: 'styling',
			message: 'How would you like to style your project?',
			choices: [
				{
					title: 'Default',
					value: 'default',
					description:
						'Next.js supports CSS Modules and styled-jsx out of the box',
				},
				{ title: 'Tailwind CSS', value: 'tailwind' },
				{ title: 'Styled Components', value: 'styled-components' },
			],
		},
	]);

	const { lang, directory, name, styling } = response;

	await init(lang, directory, name);
	process.chdir(directory);

	const changes: Change[] = [];
	console.log(styling);

	if (styling === 'tailwind') {
		const tailwindChanges = await tailwind();
		changes.push(...tailwindChanges);
	}

	writeChanges(...changes);
};

main();
