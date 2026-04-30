import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        muted: "#66756d",
        canvas: "#f4f1ea",
        surface: "#fffdf8",
        forest: {
          50: "#eef7f0",
          100: "#d9ebdc",
          500: "#2f7d57",
          600: "#256646",
          700: "#1c4d36"
        },
        amber: {
          50: "#fff8e8",
          100: "#fcecc3",
          500: "#d99a22",
          600: "#b87814"
        },
        coral: {
          50: "#fff1ed",
          500: "#e46d55",
          600: "#ca563f"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 33, 27, 0.10)",
        lift: "0 24px 70px rgba(37, 102, 70, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
