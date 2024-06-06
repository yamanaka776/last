/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
	theme: {
		extend:{		colors: {
			'main-text' : '#444444',
			'sub-text' : '#4F4F4F' ,
			'dark-back' : '#23282F',
			'dark-text' : '#E6E6E6',
		},},
        typography: {
        DEFAULT: {
          css: {
            '--tw-prose-links': '#0000ee',
            '--tw-prose-invert-links': '#99CCFF'
              },
            },
        },
      },
	}

