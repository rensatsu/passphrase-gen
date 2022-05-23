import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    polyfillDynamicImport: false,
    target: "es2020",
  },
  server: {
    proxy: {
      "/dict": {
        target: "https://ren-phrase-dict.netlify.app",
        changeOrigin: true,
      },
    },
  },
});
