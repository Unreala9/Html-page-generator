import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/", // required for Hostinger — assets load from correct path

  server: {
    host: true,
    port: 8080,
    allowedHosts: [
      "rewash-rematch-repost.ngrok-free.dev",
      ".ngrok-free.dev"
    ],
    proxy: {
      "/api/n8n-webhook": {
        target: "https://n8n.getaipilot.in",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/n8n-webhook/, "/webhook/e5d3d3a8-2851-4690-9467-d73ffb51f402"),
      }
    }
  },

  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
