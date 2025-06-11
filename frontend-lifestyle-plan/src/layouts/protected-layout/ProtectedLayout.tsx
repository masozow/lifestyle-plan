import { Navigate, Outlet, useLocation } from "react-router";
import { useSessionStore } from "@/store";
import { NavBar, SessionInitializer } from "@/components";
import appStyles from "../app-layout/AppLayout.module.css";
import authStyles from "../auth-layout/AuhtLayout.module.css";

export const ProtectedLayout = () => {
  const { isAuthenticated, isLoading, user } = useSessionStore();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;
  const locationIsDashboard = location.pathname == "/app/dashboard";
  return (
    <div className={locationIsDashboard ? authStyles.layout : appStyles.layout}>
      <SessionInitializer />
      {!locationIsDashboard && <NavBar userName={user?.name} />}
      <Outlet />
    </div>
  );
};
