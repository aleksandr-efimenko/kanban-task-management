import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "hsl(242, 48%, 58%)",
        "purple-hover": "hsl(242, 100%, 82%)",
        "dark-gray": "hsl(235, 12%, 19%)",
        "very-dark-gray": "hsl(235, 16%, 15%)",
        "lines-dark": "hsl(235, 12%, 27%)",
        "lines-light": "hsl(221, 69%, 94%)",
        "medium-gray": "hsl(216, 15%, 57%)",
        "light-gray": "hsl(220, 69%, 97%)",
        red: "hsl(0, 78%, 63%)",
        "red-hover": "hsl(0, 100%, 80%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
