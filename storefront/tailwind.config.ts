import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#8B1E3F", // deep maroon - adjust to your logo colors
          light: "#B33E5C",
          dark: "#5E1229",
        },
        cream: "#FBF6EF",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
