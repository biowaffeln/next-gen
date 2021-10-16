import { readAsync, writeAsync } from 'fs-jetpack';
import { Package } from '../changes/dependencies';

export const updatePackageJSON = async (obj: Package) => {
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
