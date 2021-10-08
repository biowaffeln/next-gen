import { readAsync } from 'fs-jetpack';
import { Resolved } from './resolveNextPaths';
import { NextFile, SimpleTransform } from './types';

export const evaluateSimpleTransforms = (
	transforms: Resolved<SimpleTransform>[]
) => transforms.map(evaluateSimpleTransform);

const evaluateSimpleTransform = async (
	t: Resolved<SimpleTransform>
): Promise<Resolved<NextFile>> => {
	const content = (await readAsync(t.path)) ?? t.fallback;
	return {
		path: t.path,
		content: t.transform(content),
	};
};
