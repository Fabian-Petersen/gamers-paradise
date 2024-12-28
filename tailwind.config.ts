import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      darkMode: "class",
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 0.8s linear infinite",
      },
      colors: {
        bgLight: "#f1f5f9",
        bgDark: "#1a202c",
        categories: "#2e5077",
        availableOn: "#80C4E9",
        heading: "#213555",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        // Add custom breakpoints if needed:
        "3xl": "1920px",
        "4xl": "2560px",
      },
      fontSize: {
        clampBodyText: "clamp(0.85rem, 0.7vw, 1.125rem)",
        clampH2: "clamp(1.5rem, 3vw, 1.75rem)",
        clampH3: "clamp(1rem, 2vw, 1.3rem)",
        clampFooterHeading: "clamp(1rem, 1vw, 1.5rem)",
        clampLogo: "clamp(1rem, 1.2vw, 1.8rem)",
        clampNavLinks: "clamp(0.8rem, 3vw, 1rem)",
        clampPageHeading: "clamp(1.3rem, 5vw + 0.5rem, 3rem)",
      },
      gridTemplateColumns: {
        gallery: "repeat(auto-fill, minmax(250px, 1fr))",
        mainSection: "(15rem_1fr))",
      },
      height: { sectionHeight: "calc(100vh - var(--navbarHeight))" },
    },
    plugins: [require("flowbite/plugin")],
  },
};

export default config;
