import type { Config } from "tailwindcss";

/** Every colour resolves to an HSL custom property from src/index.css, so the
 *  slash-opacity modifiers (bg-cherry/10) keep working. */
const hsl = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "0",
      screens: { "2xl": "1180px" },
    },
    extend: {
      fontFamily: {
        script: ["Pacifico", "cursive"],
        display: ["Alfa Slab One", "Georgia", "serif"],
        body: ["Archivo", "system-ui", "sans-serif"],
        mono: ["Courier Prime", "ui-monospace", "monospace"],
      },
      colors: {
        cream: hsl("cream"),
        "cream-2": hsl("cream-2"),
        "cream-3": hsl("cream-3"),
        porcelain: hsl("porcelain"),
        ink: hsl("ink"),
        "ink-2": hsl("ink-2"),
        "ink-3": hsl("ink-3"),
        cherry: hsl("cherry"),
        "cherry-dk": hsl("cherry-dk"),
        "cherry-wash": hsl("cherry-wash"),
        aqua: hsl("aqua"),
        "aqua-dk": hsl("aqua-dk"),
        "aqua-wash": hsl("aqua-wash"),
        sun: hsl("sun"),
        "sun-dk": hsl("sun-dk"),
        "sun-wash": hsl("sun-wash"),
        mint: hsl("mint"),
        "mint-dk": hsl("mint-dk"),
        "mint-wash": hsl("mint-wash"),
        chrome: hsl("chrome"),
        "chrome-dk": hsl("chrome-dk"),

        background: hsl("background"),
        foreground: hsl("foreground"),
        card: hsl("card"),
        primary: hsl("primary"),
        "primary-foreground": hsl("primary-foreground"),
        muted: hsl("muted"),
        "muted-foreground": hsl("muted-foreground"),
        accent: hsl("accent"),
        border: hsl("border"),
      },
      borderRadius: {
        chip: "999px",
        card: "12px",
        panel: "16px",
      },
      borderWidth: {
        3: "3px",
      },
      spacing: {
        /* the handoff's 4.4px base; it worked */
        1.1: "4.4px",
        2.2: "8.8px",
        3.3: "13.2px",
        4.4: "17.6px",
        5.5: "22px",
        6.6: "26.4px",
        8.8: "35.2px",
      },
      boxShadow: {
        stamp: "3px 3px 0 hsl(var(--ink))",
        "stamp-lg": "5px 5px 0 hsl(var(--ink))",
      },
    },
  },
  plugins: [],
} satisfies Config;
