import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/",
  plugins: [react()],
  csss: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@carbon/react/scss/styles;"`,
      },
    },
  },
});
