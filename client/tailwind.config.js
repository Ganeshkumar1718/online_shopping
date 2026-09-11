/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        body: "var(--bg-body)",
        card: "var(--bg-card)",
        sec: "var(--bg-sec)",
        input: "var(--bg-input)",
        primary: "var(--text-primary)",
        heading: "var(--text-heading)",
        secondary: "var(--text-sec)",
        muted: "var(--text-muted)",
        placeholder: "var(--text-placeholder)",
        brand: {
          DEFAULT: "var(--brand-pri)",
          hover: "var(--btn-pri-hover)",
          text: "var(--btn-pri-text)"
        },
        btnsec: {
          DEFAULT: "var(--btn-sec-bg)",
          text: "var(--btn-sec-text)"
        },
        norm: "var(--border-norm)",
        borderInput: "var(--border-input)",
        nav: {
          bg: "var(--nav-bg)",
          text: "var(--nav-text)",
          sec: "var(--nav-sec)",
          hover: "var(--nav-hover)"
        }
      }
    },
  },
  plugins: [],
}
