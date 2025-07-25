import { lazy } from "react";

const Dashboard = lazy(
  () => import("@/components/my-components/dashboard/Dashboard")
);
export const DashboardPage = () => {
  return <Dashboard />;
};

// export default DashboardPage;
