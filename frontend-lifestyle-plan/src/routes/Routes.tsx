import { createBrowserRouter } from "react-router";
import { AuthLayout, ProtectedLayout } from "@/layouts";

import {
  LandingPage,
  LoginPage,
  PlannerPage,
  ProfilePage,
  RegisterPage,
  MealPlanPage,
  NewPlanPage,
  DashboardPage,
  ObjectivesPage,
} from "@/pages";
import DashboardHome from "@/components/my-components/dashboard/DashboardHome";

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
    element: <ProtectedLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
        children: [
          { path: "", element: <DashboardHome /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "planner", element: <PlannerPage /> },
          { path: "new-plan", element: <NewPlanPage /> },
          { path: "meal-plan", element: <MealPlanPage /> },
          { path: "objectives", element: <ObjectivesPage /> },
        ],
      },
    ],
  },
]);
