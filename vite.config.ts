import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
/** Fills %CAREER_YEARS% in index.html so the meta tags age with the site. */
const htmlFacts = () => ({
  name: "html-facts",
  transformIndexHtml(html: string) {
    const years = String(new Date().getFullYear() - 2008);
    return html.replace(/%CAREER_YEARS%/g, years);
  },
});

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), htmlFacts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
