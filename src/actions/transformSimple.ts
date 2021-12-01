import { readAsync } from 'fs-jetpack';

interface Options {
	fallback?: string;
}

export const transformSimple = async (
	path: string,
	transform: (content: string) => string,
	{ fallback }: Options = {}
) => {
	const content = (await readAsync(path)) ?? fallback;
	if (!content) throw Error('File missing and no fallback was given');

	return { path, content: transform(content) };
};
