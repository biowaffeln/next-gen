import { Dependency } from './types';

export const getDependencies = (
	depChanges: Dependency[] = [],
	options: { installTypes: boolean }
) => {
	const dependencies: Record<string, string> = {};
	const devDependencies: Record<string, string> = {};

	for (const dep of depChanges) {
		// ignore types in js project
		if (dep.package.startsWith('@types/') && !options.installTypes) continue;
		if (dep.dev) {
			devDependencies[dep.package] = dep.version || 'latest';
		} else {
			dependencies[dep.package] = dep.version || 'latest';
		}
	}

	const result: Package = {};
	if (!empty(dependencies)) result.dependencies = dependencies;
	if (!empty(devDependencies)) result.devDependencies = devDependencies;

	return result;
};

export type Package = {
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
};

function empty(obj: Record<string, string>) {
	return Object.entries(obj).length === 0;
}
