import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
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
        "button-secondary": "hsla(242, 48%, 58%, 0.1)",
        "button-secondary-hover": "hsla(242, 48%, 58%, 0.25)",
      },
      fontSize: {
        "heading-xl": ["1.5rem", { lineHeight: "1.875rem", fontWeight: "700" }],
        "heading-l": [
          "1.125rem",
          { lineHeight: "1.4375rem", fontWeight: "700" },
        ],
        "heading-m": [
          "0.9375rem",
          { lineHeight: "1.375rem", fontWeight: "700" },
        ],
        "heading-s": [
          "0.75rem",
          {
            lineHeight: "0.9375rem",
            letterSpacing: "0.15rem",
            fontWeight: "700",
          },
        ],
        "body-l": ["0.8125rem", { lineHeight: "1.4375rem", fontWeight: "500" }],
        "body-m": ["0.75rem", { lineHeight: "0.9375rem", fontWeight: "700" }],
        "button-primary": [
          "0.9375rem",
          { lineHeight: "1.1875rem", fontWeight: "700" },
        ],
        "button-secondary": [
          "0.8125rem",
          { lineHeight: "1.4375rem", fontWeight: "700" },
        ],
      },
      gridTemplateColumns: {
        "main-layout": "18.75rem 1fr",
      },
      gridTemplateRows: {
        "left-panel-desktop": "7rem 1fr auto",
        "main-layout": "6rem 1fr",
      },
    },
  },
  plugins: [],
} satisfies Config;
