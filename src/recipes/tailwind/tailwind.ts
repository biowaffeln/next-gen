import * as j from 'jscodeshift';
import { Change } from '../../changes/change';
import { addDependencies, Dependency } from '../../changes/deps';
import { createFile, updateFileAST } from '../../changes/file';
import { addImport } from '../../transforms/addImport';
import { getAppPath } from '../../utils/getFilePath';
import { getTemplate } from '../../utils/getTemplate';

const get = getTemplate(__dirname);

export const deps: Dependency[] = [
	{ package: 'tailwindcss', version: '^3.0.0', dev: true },
	{ package: 'postcss', version: '^8.4.4', dev: true },
	{ package: 'autoprefixer', version: '^10.4.0', dev: true },
];

export const tailwind = (): Change[] => {
	const addDeps = addDependencies(deps);
	const addStyles = createFile('styles/global.css', get('global.css'));
	const addStylesImport = updateFileAST(
		getAppPath(),
		(root) =>
			addImport(root, j.template.statement`import "../styles/global.css";`),
		{ fallback: '' }
	);

	return [addDeps, addStyles, addStylesImport];
};
