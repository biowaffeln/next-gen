import { expect } from 'chai';
import { resolveNextGenPaths } from '../../src/changes/resolveNextGenPaths';

describe('resolvePaths', () => {
	it('should resolve without hasSrcDir', () => {
		const file = { path: 'test.config.js', content: 'test' };

		expect(resolveNextGenPaths({ hasSrcDir: false })([file])).to.eql([
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

		const result = resolveNextGenPaths({ hasSrcDir: true })([
			testConfig,
			cssTransform,
		]);

		expect(result).to.eql([
			{ path: 'test.config.js', content: 'test' },
			{ path: 'src/styles/index.css', transform },
		]);
	});
});
