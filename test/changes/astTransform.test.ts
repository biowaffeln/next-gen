import { expect } from 'chai';
import { evaluateASTTransforms } from '../../src/changes/astTransform';
import * as mock from 'mock-fs';
import * as j from 'jscodeshift';
import { resolvePaths } from '../../src/changes/resolveNextPaths';

const removeConsoleLog = (root: j.Collection) => {
	const callExpressions = root.find(j.CallExpression, {
		callee: {
			type: 'MemberExpression',
			object: { type: 'Identifier', name: 'console' },
		},
	});

	callExpressions.remove();
	return root;
};

describe('evaluateASTTransforms', () => {
	before(() => {
		mock({
			'test.js': `console.log('hello')`,
			'node_modules/jscodeshift': mock.load('node_modules/jscodeshift'),
		});
	});

	after(() => {
		mock.restore();
	});

	const resolve = resolvePaths({ hasSrcDir: false });

	const test = resolve([
		{
			path: 'test.js',
			fallback: '',
			parser: 'js',
			transform: removeConsoleLog,
		},
	]);

	const missing = resolve([
		{
			path: 'missing.js',
			fallback: `console.log('hello'); let test = 123;`,
			parser: 'tsx',
			transform: removeConsoleLog,
		},
	]);

	const invalid = resolve([
		{
			path: 'invalid.js',
			fallback: 'invalid code',
			parser: 'js',
			transform: removeConsoleLog,
		},
	]);

	it('should transform existing file', async () => {
		const result = await Promise.all(evaluateASTTransforms(test));
		expect(result).to.eql([{ path: 'test.js', content: `` }]);
	});

	it("should use fallback if file doesn't exist", async () => {
		const result = await Promise.all(evaluateASTTransforms(missing));
		expect(result).to.eql([{ path: 'missing.js', content: `let test = 123;` }]);
	});

	it('should fail parsing invalid', async () => {
		const result = await Promise.allSettled(evaluateASTTransforms(invalid));
		expect(result[0].status).to.equal('rejected');
	});
});
