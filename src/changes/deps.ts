import { Change } from './change';

export interface Dependency {
	package: string;
	version: string;
	dev?: boolean;
}

export const addDependencies = (dependencies: Dependency[]): Change => ({
	path: 'package.json',
	transform: (src: string) => {
		const pkg = JSON.parse(src) as Record<string, unknown>;

		for (const dep of dependencies) {
			const key = dep.dev ? 'devDependencies' : 'dependencies';
			set(pkg, [key, dep.package], dep.version);
		}

		return JSON.stringify(pkg, null, 2);
	},
});

const set = (obj: Record<string, unknown>, paths: string[], value: unknown) => {
	let curr = obj;
	for (const key of paths.slice(0, -1)) {
		if (!curr[key] || typeof curr[key] !== 'object') curr[key] = {};
		curr = curr[key] as Record<string, unknown>;
	}
	curr[paths.slice(-1)[0]] = value;
	return obj;
};
