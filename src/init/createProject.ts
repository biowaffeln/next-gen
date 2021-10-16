/**
 * create an empty project
 * 1. get config:
 * - is it `ts` or `js` ?
 * - does it have a `src` directory?
 * 2. create files:
 * - pages:
 *   - _app.(js|tsx)
 *   - _document.(js|tsx)
 *   - index.(js|tsx)
 * - next.config.js
 * - package.json
 * 3. run (npm|pnpm|yarn) install
 */

import { NextFile } from '../changes/types';
import { readTemplatePath } from '../utils/readTemplatePath';
import { writeNextFiles } from '../utils/writeNextFiles';

interface Options {
	isTs: boolean;
	hasSrc: boolean;
}

const getTemplate = readTemplatePath(__dirname);

export const createProject = async ({ isTs, hasSrc }: Options) => {
	const ending = isTs ? 'tsx' : 'js';
	const srcPrefix = hasSrc ? 'src/' : '';

	const document = await getTemplate(`_document.${ending}.template`);
	const app = await getTemplate(`_app.${ending}.template`);
	const index = await getTemplate(`index.${ending}.template`);

	const files: NextFile[] = [
		{ path: `${srcPrefix}pages/_document.${ending}`, content: document },
		{ path: `${srcPrefix}pages/_app.${ending}`, content: app },
		{ path: `${srcPrefix}pages/_index.${ending}`, content: index },
		{ path: 'package.json', content: '{}' },
		{ path: 'next.config.js', content: 'module.exports = {}' },
	];

	if (isTs) {
		files.push({
			path: 'tsconfig.json',
			content: '',
		});
	}

	await writeNextFiles(files);
};
