import { Navigate, Outlet } from "react-router";
import { useSessionStore } from "@/store";
import { NavBar, SessionInitializer } from "@/components";
import styles from "../app-layout/AppLayout.module.css";

export const ProtectedLayout = () => {
  const { isAuthenticated, isLoading, user } = useSessionStore();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className={styles.layout}>
      <SessionInitializer />
      <NavBar userName={user?.name} />
      <Outlet />
    </div>
  );
};
