import { createBrowserRouter } from "react-router";
import { AuthLayout, ProtectedLayout } from "@/layouts";
import DashboardHome from "@/components/my-components/dashboard/DashboardHome";
import { Suspense } from "react";
import * as Pages from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading landing...</div>}>
            <Pages.LandingPage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading landing...</div>}>
            <Pages.LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<div>Loading landing...</div>}>
            <Pages.RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/app",
    element: <ProtectedLayout />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading landing...</div>}>
            <Pages.DashboardPage />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<div>Loading landing...</div>}>
                <DashboardHome />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<div>Loading landing...</div>}>
                <Pages.ProfilePage />
              </Suspense>
            ),
          },
          {
            path: "view-profile",
            element: (
              <Suspense fallback={<div>Loading landing...</div>}>
                <Pages.ViewProfilePage />
              </Suspense>
            ),
          },
          {
            path: "planner",
            element: (
              <Suspense fallback={<div>Loading landing...</div>}>
                <Pages.PlannerPage />
              </Suspense>
            ),
          },
          {
            path: "new-plan",
            element: (
              <Suspense fallback={<div>Loading landing...</div>}>
                <Pages.NewPlanPage />
              </Suspense>
            ),
          },
          {
            path: "meal-plan",
            element: (
              <Suspense fallback={<div>Loading landing...</div>}>
                <Pages.MealPlanPage />
              </Suspense>
            ),
          },
          {
            path: "objectives",
            element: (
              <Suspense fallback={<div>Loading landing...</div>}>
                <Pages.ObjectivesPage />
              </Suspense>
            ),
          },
          {
            path: "user",
            element: (
              <Suspense fallback={<div>Loading landing...</div>}>
                <Pages.UserPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
