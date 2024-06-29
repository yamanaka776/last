/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    plugins: [
        require('@tailwindcss/typography'),
        // ...
    ],
    theme: {
        extend: {
            colors: {
                'main-text': '#444444',
                'sub-text': '#4F4F4F',
                'dark-back': '#23282F',
                'dark-text': '#E6E6E6',
            },
              flex: {
        '1-100': '1 1 100px',
        '4-100': '4 1 100px'
      },
        },
    },
};
