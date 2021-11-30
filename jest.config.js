module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js'],
	collectCoverageFrom: ['src/**/*.{ts,js}'],
	testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|dist)[/\\\\]'],
	transform: {
		'^.+\\.ts$': [
			'@swc/jest',
			{
				sourceMaps: true,
				module: {
					type: 'commonjs',
				},
				jsc: {
					target: 'es2020',
					parser: {
						syntax: 'typescript',
						tsx: false,
						decorators: false,
						dynamicImport: false,
					},
				},
			},
		],
	},
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
	silent: false,
};
