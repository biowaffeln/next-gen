import { readAsync } from 'fs-jetpack';

export interface Dependency {
	package: string;
	version: string;
	dev?: true;
}

export const addDependencies = async (
	path: string,
	dependencies: Dependency[]
) => {
	const pkg = (await readAsync(path, 'json')) as
		| Record<string, any>
		| undefined;
	if (!pkg) throw new Error('package.json could not be found.');

	for (const dep of dependencies) {
		const key = dep.dev ? 'devDependencies' : 'dependencies';
		set(pkg, [key, dep.package], dep.version);
	}

	return {
		path,
		content: pkg,
	};
};

const set = (obj: Record<string, unknown>, paths: string[], value: unknown) => {
	let curr = obj;
	for (const key of paths.slice(0, -1)) {
		if (!curr[key] || curr[key] !== 'object') curr[key] = {};
		curr = curr[key] as Record<string, unknown>;
	}
	curr[paths.slice(-1)[0]] = value;
	return obj;
};
