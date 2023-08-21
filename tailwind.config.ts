import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        'deep-gray': 'rgb(var(--color-deep-gray))',
        'dark-gray': 'rgb(var(--color-dark-gray))',
        'mid-gray': 'rgb(var(--color-mid-gray))',
        'light-gray': 'rgb(var(--color-light-gray))',
        'pale-gray': 'rgb(var(--color-pale-gray))',

      }
    },
  },
  plugins: [],
} satisfies Config;
