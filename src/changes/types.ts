import { Collection, Program } from 'jscodeshift';

export interface Dependency {
	package: string;
	version?: string;
	dev?: boolean;
}

export interface NextGenPath {
	path: string;
	isRoot?: boolean;
}

export interface NextGenFile {
	path: string;
	content: string;
}

export interface CreateFile extends NextGenFile, NextGenPath {}

export interface SimpleTransform extends NextGenPath {
	fallback: string;
	transform: (source: string) => string;
}

export interface ASTTransform extends NextGenPath {
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
