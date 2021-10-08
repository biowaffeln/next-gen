import { readAsync } from 'fs-jetpack';
import { NextGenFile, SimpleTransform } from './types';

export const evaluateSimpleTransforms = (transforms: SimpleTransform[]) =>
	transforms.map(evaluateSimpleTransform);

const evaluateSimpleTransform = async (
	t: SimpleTransform
): Promise<NextGenFile> => {
	const content = (await readAsync(t.path)) ?? t.fallback;
	return {
		path: t.path,
		content: t.transform(content),
	};
};
