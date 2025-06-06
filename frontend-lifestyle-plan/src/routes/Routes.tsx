import { createBrowserRouter } from "react-router";
import { AuthLayout, ProtectedLayout } from "@/layouts";

import {
  LandingPage,
  LoginPage,
  PlannerPage,
  DashboardPage,
  ProfilePage,
  RegisterPage,
} from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/app",
    // element: <AppLayout/> //if routes shouldn't be protected
    element: <ProtectedLayout />,
    children: [
      { path: "", element: <PlannerPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
