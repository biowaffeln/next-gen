import { Recipe } from '../recipe';
import { addImport } from '../transforms/addImport';
import { getAppPath } from '../pathHelpers/getPagePath';
import { readTemplatePath } from '../pathHelpers/readTemplatePath';
import * as j from 'jscodeshift';

const getTemplate = readTemplatePath(__dirname);

export const tailwind: Recipe = async () => ({
	addDependencies: [
		{ package: 'tailwindcss', version: 'latest', dev: true },
		{ package: 'autoprefixer', version: 'latest', dev: true },
		{ package: 'postcss', version: 'latest', dev: true },
	],
	createFiles: [
		{
			path: 'tailwind.config.js',
			content: await getTemplate('tailwind.config.template'),
			isRoot: true,
		},
		{
			path: 'postcss.config.js',
			content: await getTemplate('postcss.config.template'),
			isRoot: true,
		},
		{
			path: 'styles/global.css',
			content: await getTemplate('global.template'),
		},
	],
	ASTTransforms: [
		{
			path: getAppPath(),
			transform: (root) =>
				addImport(root, j.template.statement`import "../styles/global.css"`),
			fallback: '',
			parser: 'tsx',
		},
	],
});
