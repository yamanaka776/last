module.exports = {
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	extends: ['plugin:astro/recommended', 'prettier', 'plugin:import/recommended'],
	overrides: [
		{
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
			},
		},
	],
}
