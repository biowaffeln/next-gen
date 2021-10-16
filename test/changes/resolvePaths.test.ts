import { expect } from 'chai';
import { resolvePaths } from '../../src/changes/resolveNextPaths';

describe('resolvePaths', () => {
	it('should resolve without hasSrcDir', () => {
		const file = { path: 'test.config.js', content: 'test' };
		const result = resolvePaths({ hasSrcDir: false })([file]);

		expect(result).to.eql([
			{
				path: 'test.config.js',
				content: 'test',
			},
		]);
	});

	it('should resolve with hasSrcDir', () => {
		const testConfig = {
			path: 'test.config.js',
			content: 'test',
			isRoot: true,
		};
		const transform = (src: unknown) => src;
		const cssTransform = { path: 'styles/index.css', transform };

		const result = resolvePaths({ hasSrcDir: true })([
			testConfig,
			cssTransform,
		]);

		expect(result).to.eql([
			{ path: 'test.config.js', content: 'test' },
			{ path: 'src/styles/index.css', transform },
		]);
	});
});
