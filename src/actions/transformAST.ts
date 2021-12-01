import { readAsync } from 'fs-jetpack';
import { withParser } from 'jscodeshift';
import type { Collection, Program } from 'jscodeshift';

interface Options {
	parser?: string;
	fallback?: string;
}

export const transformAST = async (
	path: string,
	transform: (program: Collection<Program>) => Collection<Program>,
	{ fallback, parser = 'tsx' }: Options = {}
) => {
	const content = (await readAsync(path)) ?? fallback;
	if (!content) throw Error('File missing and no fallback was given');

	const j = withParser(parser);
	return { path, content: transform(j(content)).toSource() };
};
