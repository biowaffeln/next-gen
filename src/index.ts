#!/usr/bin/env node

import { init } from './init';
import { tailwind } from './recipes/tailwind/tailwind';
import process from 'process';
import { writeChanges } from './actions/writeChanges';

const main = async () => {
	// await init('js', 'repo', 'Cool Project');
	process.chdir('repo');
	const changes = await tailwind();
	writeChanges(...changes);
};

main();
