import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-phonebox": path.resolve(__dirname, "../src")
    }
  },
  root: __dirname
});