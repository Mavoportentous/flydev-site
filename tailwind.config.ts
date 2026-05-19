// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'fly-dark': '#0a0f1a',    // Fondo profundo
                'fly-cyan': '#22d3ee',    // Azul neón (Dev)
                'fly-orange': '#f97316',  // Naranja (Drone)
                'fly-glow': '#d1fae5',    // Luz blanquiazul
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;