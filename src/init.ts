import { exec } from 'child_process';
import { promisify } from 'util';
import { writeChanges } from './actions/writeChanges';
import { transformSimple } from './actions/transformSimple';
import * as path from 'path';

const execAsync = promisify(exec);
const repository = 'git@github.com:biowaffeln/next-gen.git';

export const init = async (
	template: 'js' | 'ts',
	folder: string,
	projectName: string
) => {
	try {
		await execAsync(
			`git clone ${repository} -b template-${template} ${folder}`
		);
	} catch (e) {
		console.log(e);
		return;
	}

	const addProjectNameToREADME = await transformSimple(
		path.join(folder, 'README.md'),
		(a) => a.replace('{{project-name}}', projectName)
	);

	const addProjectNameToPkg = await transformSimple(
		path.join(folder, 'package.json'),
		(a) => a.replace('{{project-name}}', projectName)
	);

	await writeChanges(addProjectNameToREADME, addProjectNameToPkg);
};
