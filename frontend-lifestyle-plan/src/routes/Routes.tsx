import { createBrowserRouter } from "react-router";
import { AuthLayout, ProtectedLayout } from "@/layouts";
import DashboardHome from "@/components/my-components/dashboard/DashboardHome";
import { Suspense } from "react";
import * as Pages from "@/pages";
import { DashBoardHomeSkeleton, MealPlanFormSkeleton } from "@/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Pages.LandingPage />,
      },
      {
        path: "login",
        element: <Pages.LoginPage />,
      },
      {
        path: "register",
        element: <Pages.RegisterPage />,
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
          // <Suspense fallback={<div>Loading dashboard...</div>}>
          <Pages.DashboardPage />
          // </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<DashBoardHomeSkeleton />}>
                <DashboardHome />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<div>Loading profile...</div>}>
                <Pages.ProfilePage />
              </Suspense>
            ),
          },
          {
            path: "view-profile",
            element: (
              <Suspense fallback={<div>Loading profile preview...</div>}>
                <Pages.ViewProfilePage />
              </Suspense>
            ),
          },
          {
            path: "planner",
            element: (
              <Suspense fallback={<div>Loading planner page...</div>}>
                <Pages.PlannerPage />
              </Suspense>
            ),
          },
          {
            path: "new-plan",
            element: (
              <Suspense fallback={<div>Loading new plan page...</div>}>
                <Pages.NewPlanPage />
              </Suspense>
            ),
          },
          {
            path: "meal-plan",
            element: (
              <Suspense fallback={<MealPlanFormSkeleton />}>
                <Pages.MealPlanPage />
              </Suspense>
            ),
          },
          {
            path: "objectives",
            element: (
              <Suspense fallback={<div>Loading objectives page...</div>}>
                <Pages.ObjectivesPage />
              </Suspense>
            ),
          },
          {
            path: "user",
            element: (
              <Suspense fallback={<div>Loading user page...</div>}>
                <Pages.UserPage />
              </Suspense>
            ),
          },
          {
            path: "progress-chart",
            element: (
              <Suspense fallback={<div>Loading progress chart page...</div>}>
                <Pages.ProgressChartPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
