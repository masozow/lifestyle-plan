import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "zustand",
      "clsx",
      "lucide-react",
      "zod",
      "zod-i18n-map",
      "react-hook-form",
      "@hookform/resolvers",
      "@tanstack/react-query",
      "i18next",
      "react-i18next",
      "i18next-browser-languagedetector",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-tooltip",
      "@tabler/icons-react"
    ],
  },
});
