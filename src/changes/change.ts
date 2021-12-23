import { read, writeAsync } from 'fs-jetpack';

export type Change = {
	path: string;
	transform: (src: string) => string;
	fallback?: string;
};

export const writeChanges = async (changes: Change[]) => {
	const map = new Map<string, string>();

	for (const change of changes) {
		const { path, transform, fallback } = change;
		const content = map.get(path) ?? read(path) ?? fallback;
		if (content === undefined) {
			throw Error(`File missing and no fallback was given: ${path} `);
		}
		map.set(path, transform(content));
	}

	return Promise.all(
		Array.from(map).map(([path, content]) => writeAsync(path, content))
	);
};
