import { expect } from 'chai';
import { SimpleTransform } from '../../src/changes/types';
import { evaluateSimpleTransforms } from '../../src/changes/simpleTransform';
import * as mock from 'mock-fs';

describe('simpleTransform', () => {
	before(() => {
		mock({ 'test.js': `console.log('hello')` });
	});

	after(() => {
		mock.restore();
	});

	describe('#evaluateSimpleTransform', () => {
		const test: SimpleTransform = {
			path: 'test.js',
			fallback: '',
			transform: (src) => src.replace('hello', 'bye'),
		};

		const missing: SimpleTransform = {
			path: 'missing.js',
			fallback: `console.log('hello')`,
			transform: (src) => src.replace('hello', 'test'),
		};

		it('should transform existing file', async () => {
			const res = await Promise.all(evaluateSimpleTransforms([test]));
			expect(res).to.eql([{ path: 'test.js', content: `console.log('bye')` }]);
		});

		it("should use fallback if file doesn't exist", async () => {
			const res = await Promise.all(evaluateSimpleTransforms([missing]));
			expect(res).to.eql([
				{ path: 'missing.js', content: `console.log('test')` },
			]);
		});
	});
});
