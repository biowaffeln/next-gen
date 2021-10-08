import { NextGenPath } from './types';

const omit = <Obj, Key extends keyof Obj>(obj: Obj, key: Key) => {
	const copy = { ...obj };
	delete copy[key];
	return copy;
};

export const resolveNextGenPaths =
	(options: { hasSrcDir: boolean }) =>
	<T extends NextGenPath>(paths: T[] = []) =>
		paths.map((p) => ({
			...omit(p, 'isRoot'),
			path: p.isRoot || !options.hasSrcDir ? p.path : `src/${p.path}`,
		}));
