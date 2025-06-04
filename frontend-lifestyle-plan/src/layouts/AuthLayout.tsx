import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full">
      <Outlet />
    </div>
  );
};
