import { Outlet } from "react-router";
import NavBar from "@/components/my-components/nav-bar/NavBar";

export const AppLayout = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-8">
      <NavBar />
      <Outlet />
    </div>
  );
};
