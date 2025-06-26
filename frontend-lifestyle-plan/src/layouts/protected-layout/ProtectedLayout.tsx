import { Navigate, Outlet } from "react-router";
import { useSessionStore } from "@/store";
import { SessionInitializer } from "@/components";

export const ProtectedLayout = () => {
  const { isAuthenticated, isLoading, hasTriedFetching } = useSessionStore();

  if (!hasTriedFetching || isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <SessionInitializer />
      <Outlet />
    </>
  );
};
