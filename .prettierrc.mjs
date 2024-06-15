// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
	printWidth: 100,
	tabWidth: 4,
	singleQuote: true,
	plugins: ['prettier-plugin-astro','prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
