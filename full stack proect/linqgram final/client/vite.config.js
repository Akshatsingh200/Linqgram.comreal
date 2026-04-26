import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(), tailwindcss()],
  resolve: {
    alias: {
      // Make React Router work with Preact
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
});
