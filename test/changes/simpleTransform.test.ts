import { expect } from 'chai';
import { evaluateSimpleTransforms } from '../../src/changes/simpleTransform';
import * as mock from 'mock-fs';
import { resolvePaths } from '../../src/changes/resolveNextPaths';
import { SimpleTransform } from '../../src/changes/types';

describe('evaluateSimpleTransforms', () => {
	before(() => {
		mock({ 'test.js': `console.log('hello')` });
	});

	after(() => {
		mock.restore();
	});

	const resolve = resolvePaths({ hasSrcDir: false });

	const test = resolve<SimpleTransform>([
		{
			path: 'test.js',
			fallback: '',
			transform: (src: string) => src.replace('hello', 'bye'),
		},
	]);

	const missing = resolve<SimpleTransform>([
		{
			path: 'missing.js',
			fallback: `console.log('hello')`,
			transform: (src: string) => src.replace('hello', 'test'),
		},
	]);

	it('should transform existing file', async () => {
		const res = await Promise.all(evaluateSimpleTransforms(test));
		expect(res).to.eql([{ path: 'test.js', content: `console.log('bye')` }]);
	});

	it("should use fallback if file doesn't exist", async () => {
		const res = await Promise.all(evaluateSimpleTransforms(missing));
		expect(res).to.eql([
			{ path: 'missing.js', content: `console.log('test')` },
		]);
	});
});
