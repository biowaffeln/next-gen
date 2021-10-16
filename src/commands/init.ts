import { Command } from '@oclif/command';
import { dirAsync } from 'fs-jetpack';
import { applyChanges } from '../changes/applyChanges';
import { Changes } from '../changes/types';
import { createProject } from '../init/createProject';
import { initPrompt } from '../init/prompt';
import { tailwind } from '../recipes/tailwind/tailwind';

export default class Hello extends Command {
	static description = 'initialize a new Next.js project';

	async run() {
		const changesList: Changes[] = [];
		const stylingThingies: Record<string, Changes> = {
			tailwind: await tailwind(),
		};

		const { name, directory, styling, isTs } = await initPrompt();
		const stylingChange = stylingThingies[styling] || {};
		changesList.push(stylingChange);

		await dirAsync(directory);
		process.chdir(directory);

		await createProject({ isTs, hasSrc: true });
		for (const changes of changesList) {
			await applyChanges(changes);
		}
	}
}
