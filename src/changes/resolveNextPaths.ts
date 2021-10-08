import { Opaque } from './opaque';
import { NextPath } from './types';

const omit = <Obj, Key extends keyof Obj>(obj: Obj, key: Key) => {
	const copy = { ...obj };
	delete copy[key];
	return copy;
};

interface ResolvedPath {
	path: Opaque<string, ResolvedPath>;
}

export type Resolved<T extends NextPath> = Omit<T, 'root'> & ResolvedPath;

export const resolvePaths =
	(options: { hasSrcDir: boolean }) =>
	<T extends NextPath>(paths: T[] = []): Resolved<T>[] =>
		paths.map((p) => ({
			...omit(p, 'isRoot'),
			path: p.isRoot || !options.hasSrcDir ? p.path : `src/${p.path}`,
		})) as unknown as Resolved<T>[];
