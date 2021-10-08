import { readAsync } from 'fs-jetpack';
import { ASTTransform, NextGenFile } from './types';
import { withParser } from 'jscodeshift';

export const evaluateASTTransforms = (transforms: ASTTransform[]) =>
	transforms.map(evaluateASTTransform);

const evaluateASTTransform = async (t: ASTTransform): Promise<NextGenFile> => {
	const content = (await readAsync(t.path)) ?? t.fallback;
	const j = withParser(t.parser);
	return {
		path: t.path,
		content: t.transform(j(content)).toSource(),
	};
};
