import { readAsync, writeAsync, existsAsync } from 'fs-jetpack';
import { Changes, NextGenFile } from './types';
import { getDependencies, Package } from './dependencies';
import { evaluateSimpleTransforms } from './simpleTransform';
import { evaluateASTTransforms } from './astTransform';
import { resolveNextGenPaths } from './resolveNextGenPaths';

export async function applyChanges(changes: Changes) {
	const isTs = (await existsAsync('tsconfig.json')) === 'file';
	const hasSrcDir = (await existsAsync('src')) === 'dir';
	const resolve = resolveNextGenPaths({ hasSrcDir });

	const packageJSON = getDependencies(changes.addDependencies, {
		installTypes: isTs,
	});
	writePackageJSON(packageJSON);

	const newFiles = resolve(changes.createFiles);
	writeFiles(newFiles);

	const transformedFiles = await Promise.all(
		evaluateSimpleTransforms(resolve(changes.simpleTransforms))
	);
	writeFiles(transformedFiles);

	const astTransformedFiles = await Promise.all(
		evaluateASTTransforms(resolve(changes.ASTTransforms))
	);
	writeFiles(astTransformedFiles);
}

const writeFiles = async (files: NextGenFile[]) => {
	for (const file of files) {
		await writeAsync(file.path, file.content);
	}
};

const writePackageJSON = async (obj: Package) => {
	const pkg = await readAsync('package.json', 'json');

	if (!pkg) {
		throw new Error('Error: no package.json was found');
	}
	if (obj.dependencies) {
		pkg.dependencies = { ...pkg.dependencies, ...obj.dependencies };
	}
	if (obj.devDependencies) {
		pkg.devDependencies = { ...pkg.devDependencies, ...obj.devDependencies };
	}

	await writeAsync('package.json', pkg);
};
