import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import inspect from "vite-plugin-inspect";

export default defineConfig(({ command }) => ({
// export default defineConfig(() => ({
  plugins: [
    react(), 
    tailwindcss(),
    inspect(),
     ...(command === "build"
      ? [
          visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          chart: ['recharts'],
          shadcn: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-dropdown-menu',
            'lucide-react',
          ],
        },
      },
    },
  }
}));
