import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactPhoneBox",
      cssFileName: "style",
      fileName: (format) => (format === "es" ? "index.es.mjs" : "index.cjs"),
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: (id) =>
        id === "react" ||
        id.startsWith("react/") ||
        id === "react-dom" ||
        id.startsWith("react-dom/") ||
        id === "libphonenumber-js" ||
        id.startsWith("libphonenumber-js/"),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
