import { createBrowserRouter } from "react-router";
import { AuthLayout, AppLayout } from "@/layouts";

import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login/LoginPage";
import PlannerPage from "@/pages/planner/PlannerPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ProfilePage from "@/pages/profile/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "", element: <PlannerPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
