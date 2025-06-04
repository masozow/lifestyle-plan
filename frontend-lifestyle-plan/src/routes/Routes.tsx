import App from "@/App";
import NavBar from "@/components/my-components/nav-bar/NavBar";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login/LoginPage";
import PlannerPage from "@/pages/planner/PlannerPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <LandingPage /> },
      {
        path: "/app",
        element: <NavBar />,
        children: [
          { path: "", element: <PlannerPage /> },
          { path: "login", element: <LoginPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "dashboard", element: <DashboardPage /> },
        ],
      },
    ],
  },
]);
