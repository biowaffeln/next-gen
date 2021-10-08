import { Collection, Program } from 'jscodeshift';

export interface Dependency {
	package: string;
	version?: string;
	dev?: boolean;
}

/**
 * Represents of a file or a directory in a Next.js project.  If `isRoot` is set
 * to true then the path always resolves to the value in `path`, otherwise the
 * path might get prefixed with `src/` if the project has a `src` directory.
 */
export interface NextPath {
	path: string;
	isRoot?: boolean;
}

export interface NextFile {
	path: string;
	content: string;
}

export interface CreateFile extends NextFile, NextPath {}

export interface SimpleTransform extends NextPath {
	fallback: string;
	transform: (source: string) => string;
}

export interface ASTTransform extends NextPath {
	fallback: string;
	parser: string;
	transform: (program: Collection<Program>) => Collection<Program>;
}

export interface Changes {
	addDependencies?: Dependency[];
	createFiles?: CreateFile[];
	simpleTransforms?: SimpleTransform[];
	ASTTransforms?: ASTTransform[];
}
