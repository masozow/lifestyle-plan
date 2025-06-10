import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/lib/i18n";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
import { Toaster } from "sonner";
import { SessionInitializer, ThemeProvider } from "@/components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <SessionInitializer />
        <RouterProvider router={router} />
        <Toaster
          // theme="system"
          position="top-right"
          // toastOptions={{
          //   classNames: {
          //     success:
          //       "bg-green-100 text-green-900 dark:bg-green-800 dark:text-white",
          //     error: "bg-red-100 text-red-900 dark:bg-red-800 dark:text-white",
          //     warning:
          //       "bg-yellow-100 text-yellow-900 dark:bg-yellow-700 dark:text-white",
          //     info: "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-white",
          //   },
          // }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
