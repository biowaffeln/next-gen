import * as j from 'jscodeshift';
import { addDependencies } from '../../actions/addDependencies';
import { createFile } from '../../actions/createFile';
import { transformAST } from '../../actions/transformAST';
import { Change } from '../../actions/writeChanges';
import { addImport } from '../../transforms/addImport';
import { getTemplate } from '../../utils/getTemplate';

const get = getTemplate(__dirname);

export const deps = [
	{ package: 'tailwindcss', version: '^2.2.19', dev: true },
	{ package: 'postcss', version: '^8.4.4', dev: true },
	{ package: 'autoprefixer', version: '^10.4.0', dev: true },
];

export const tailwind = async (): Promise<Change[]> => {
	const addDeps = await addDependencies(deps);
	const addConfig = await Promise.all([
		createFile('tailwind.config.js', await get('tailwind.config.js')),
		createFile('postcss.config.js', await get('postcss.config.js')),
	]);
	const addStyles = createFile('styles/global.css', await get('global.css'));
	const addStylesImport = await transformAST('pages/_app.js', (root) =>
		addImport(root, j.template.statement`import "../styles/global.css";`)
	);

	return [addDeps, ...addConfig, addStyles, addStylesImport];
};
