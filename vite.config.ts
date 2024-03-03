import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ["oh-vue-icons/icons"],
  },
  server: {
    proxy: {
      "/dict": {
        target: "https://phrase.rensatsu.com",
        changeOrigin: true,
      },
    },
  },
});
