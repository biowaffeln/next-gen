import { readAsync } from 'fs-jetpack';
import { ASTTransform, NextFile } from './types';
import { withParser } from 'jscodeshift';
import { Resolved } from './resolveNextPaths';

export const evaluateASTTransforms = (transforms: Resolved<ASTTransform>[]) =>
	transforms.map(evaluateASTTransform);

const evaluateASTTransform = async (
	t: Resolved<ASTTransform>
): Promise<Resolved<NextFile>> => {
	const content = (await readAsync(t.path)) ?? t.fallback;
	const j = withParser(t.parser);
	return {
		path: t.path,
		content: t.transform(j(content)).toSource(),
	};
};
