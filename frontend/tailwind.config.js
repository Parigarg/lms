// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure this includes ALL files where you use Tailwind classes
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // If your structure is complex (like frontend/pages, backend/models), you may need more paths
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}