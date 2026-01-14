import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "microsoft-cream": "#FEF9ED",
                "microsoft-warm-text": "#5D524B",
                "microsoft-glass": "rgba(255, 255, 255, 0.5)",
            },
        },
    },
    plugins: [],
};
export default config;
