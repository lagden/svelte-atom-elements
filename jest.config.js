export default {
	extensionsToTreatAsEsm: ['.svelte'],
	moduleFileExtensions: ['js', 'svelte'],
	transform: {
		// '^.+\\.js$': 'babel-jest',
		'\\.[jt]sx?$': 'babel-jest',
		'^.+\\.svelte$': ['svelte-jester', {preprocess: false}],
	},
	testEnvironment: 'jest-environment-jsdom',
	bail: false,
	verbose: true,
}
