import { Command } from '@oclif/command';
import { initPrompt } from '../init/prompt';

export default class Hello extends Command {
	static description = 'initialize a new Next.js project';

	async run() {
		const { name, directory } = await initPrompt();
		this.log(name, directory);
	}
}
