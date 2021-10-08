import * as mock from 'mock-fs';
import { tailwind } from '../../src/recipes/tailwind/tailwind';
import { applyChanges } from '../../src/changes/applyChanges';

describe('tailwind recipe', () => {
	before(() => {
		mock({
			'node_modules/jscodeshift': mock.load('./node_modules/jscodeshift'),
			'src/recipes/tailwind': mock.load('./src/recipes/tailwind'),
			'package.json': '{}',
		});
	});

	after(() => {
		mock.restore();
	});

	it('should work', async function () {
		const changes = await tailwind();
		await applyChanges(changes);
	});
});
