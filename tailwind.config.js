/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [],
    safelist: [
        {
            pattern: /card*/
        },
        // {
        // pattern: /btn/,
        // variants: ['primary', 'secondary'],
        //}
        {
            pattern: /grid-cols-\d+/,
            variants: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
        },
    ]
};
