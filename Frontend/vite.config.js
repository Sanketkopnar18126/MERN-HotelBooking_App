import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/users": {
        target: "http://localhost:8000/api/v1",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
