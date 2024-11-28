/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    primary: '#121212',    // Dark background
                    secondary: '#1E1E1E',  // Slightly lighter background
                    accent: '#BB86FC',     // Elegant accent color (purple)
                    text: '#EDEDED',       // Light text color
                    muted: '#A1A1A1',      // Muted text color
                    hover: '#2A2A2A',      // Hover background
                    navbar: '#1F1F1F',    // New navbar background color
                    githubBg: '#252525',  // Background for GitHub quote
                    githubText: '#EDEDED', // Text color for GitHub quote
                    githubLink: '#539BF5'  // Link color for GitHub quote
                }
            }
        }
    },
    plugins: []
};
