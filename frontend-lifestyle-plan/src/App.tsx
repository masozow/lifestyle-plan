import { Outlet } from "react-router";
import "./App.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
