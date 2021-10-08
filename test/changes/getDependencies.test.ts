import { expect } from 'chai';
import { Dependency } from '../../src/changes/types';
import { getDependencies } from '../../src/changes/dependencies';

describe('getDependencies', () => {
	it('should leave out missing dependencies', () => {
		const empty = getDependencies([], { installTypes: false });
		expect(empty).to.eql({});

		const withDeps = getDependencies([{ package: 'test' }], {
			installTypes: false,
		});
		expect(withDeps.devDependencies).to.eq(undefined);
	});

	it('should add dependencies', () => {
		const deps: Dependency[] = [
			{ package: 'packageA' },
			{ package: 'packageB', version: '2.0.0' },
			{ package: 'packageC', dev: true },
		];

		const result = getDependencies(deps, { installTypes: false });
		expect(result).to.eql({
			dependencies: {
				packageA: 'latest',
				packageB: '2.0.0',
			},
			devDependencies: {
				packageC: 'latest',
			},
		});
	});

	it('should filter out types dependencies in js project', () => {
		const changes: Dependency[] = [
			{ package: 'node' },
			{ package: '@types/node', dev: true },
		];

		const result = getDependencies(changes, { installTypes: false });
		expect(result.dependencies).to.eql({ node: 'latest' });
	});

	it('should keep types dependencies in ts project', () => {
		const deps: Dependency[] = [
			{ package: 'node' },
			{ package: '@types/node', dev: true },
		];

		const result = getDependencies(deps, { installTypes: true });
		expect(result.devDependencies).to.eql({ '@types/node': 'latest' });
	});
});
