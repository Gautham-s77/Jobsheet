/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f9fafb",
        foreground: "#1f2937",
        surface: "#ffffff",
        border: "#f3f4f6",
        primary: {
          DEFAULT: "#8b5cf6",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ede9fe",
          foreground: "#6d28d9",
        },
        muted: {
          foreground: "#6b7280",
        },
        danger: "#ef4444",
        "info-bg": "#dbeafe",
        "info-text": "#1e40af",
        "neutral-bg": "#f3f4f6",
        "neutral-text": "#374151",
      },
      fontFamily: {
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        headings: ["Nunito", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "24px",
        "2xl": "1rem",
      },
      maxWidth: {
        "5xl": "64rem",
      },
      boxShadow: {
        "primary-soft":
          "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.06), 0 12px 40px -12px rgba(139, 92, 246, 0.25)",
      },
    },
  },
  plugins: [],
};
