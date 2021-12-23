import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import { removeAsync } from 'fs-jetpack';
import { toValidPath } from './utils/toValidPath';
import { updateFile } from './changes/file';
import { writeChanges } from './changes/change';

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
		await removeAsync(path.join(folder, '.git'));
	} catch (e) {
		console.log(e);
		return;
	}

	const addProjectNameToREADME = updateFile(
		path.join(folder, 'README.md'),
		(content) => content.replace('{{project-name}}', projectName)
	);

	const addProjectNameToPackageJson = updateFile(
		path.join(folder, 'package.json'),
		(content) => content.replace('{{project-name}}', toValidPath(projectName))
	);

	return writeChanges([addProjectNameToREADME, addProjectNameToPackageJson]);
};
