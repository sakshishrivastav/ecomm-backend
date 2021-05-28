module.exports = async () => ({
	testEnvironment: 'node',
	displayName: {
		name: 'Backend',
		color: 'blue',
	},
	verbose: false,
	globals: {
		__TESTENV__: true,
	},
	globalSetup: './setup.js',
	globalTeardown: './teardown.js',
	rootDir: './__tests__',
	testRegex: '((\\.|/*.)(test))\\.js?$',
});
