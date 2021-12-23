import { Change } from './change';
import { withParser } from 'jscodeshift';
import type { Collection, Program } from 'jscodeshift';

export const createFile = (path: string, content: string): Change => ({
	path,
	transform: () => content,
	fallback: '',
});

export const updateFile = (
	path: string,
	transform: (src: string) => string,
	fallback?: string
): Change => ({
	path,
	transform,
	fallback,
});

interface Options {
	parser?: string;
	fallback?: string;
}

export const updateFileAST = (
	path: string,
	transform: (program: Collection<Program>) => Collection<Program>,
	{ fallback, parser = 'tsx' }: Options = {}
): Change => ({
	path,
	transform: (src: string) => {
		const j = withParser(parser);
		return transform(j(src)).toSource();
	},
	fallback,
});
