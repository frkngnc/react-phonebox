import { fileURLToPath } from "url";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ReactPhoneBox",
      formats: ["es", "umd", "cjs"],
      fileName: (format) => {
        switch (format) {
          case "es":
            return "index.es.js";
          case "umd":
            return "index.umd.js";
          case "cjs":
            return "index.cjs.js";
          default:
            return `index.${format}.js`;
        }
      },
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
});
