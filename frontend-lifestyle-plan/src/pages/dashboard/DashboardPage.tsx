import { lazy } from "react";

const Dashboard = lazy(
  () => import("@/components/my-components/dashboard/Dashboard")
);
const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
