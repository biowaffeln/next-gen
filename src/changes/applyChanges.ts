import { existsAsync } from 'fs-jetpack';
import { Changes } from './types';
import { getDependencies } from './dependencies';
import { evaluateSimpleTransforms } from './simpleTransform';
import { evaluateASTTransforms } from './astTransform';
import { resolvePaths } from './resolveNextPaths';
import { writeResolvedNextFiles } from '../utils/writeNextFiles';
import { updatePackageJSON } from '../utils/updatePackageJSON';

export async function applyChanges(changes: Changes) {
	const isTs = (await existsAsync('tsconfig.json')) === 'file';
	const hasSrcDir = (await existsAsync('src')) === 'dir';
	const resolve = resolvePaths({ hasSrcDir });

	const packageJSON = getDependencies(changes.addDependencies, {
		installTypes: isTs,
	});
	updatePackageJSON(packageJSON);

	const newFiles = resolve(changes.createFiles);
	writeResolvedNextFiles(newFiles);

	const transformedFiles = await Promise.all(
		evaluateSimpleTransforms(resolve(changes.simpleTransforms))
	);
	writeResolvedNextFiles(transformedFiles);

	const astTransformedFiles = await Promise.all(
		evaluateASTTransforms(resolve(changes.ASTTransforms))
	);
	writeResolvedNextFiles(astTransformedFiles);
}
