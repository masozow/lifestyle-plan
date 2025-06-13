import { Navigate, Outlet } from "react-router";
import { useSessionStore } from "@/store";
import { SessionInitializer } from "@/components";

export const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useSessionStore();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <SessionInitializer />
      <Outlet />
    </>
  );
};
