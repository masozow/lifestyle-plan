import { createBrowserRouter } from "react-router";
import { AuthLayout, ProtectedLayout } from "@/layouts";
import DashboardHome from "@/components/my-components/dashboard/DashboardHome";
import { Suspense } from "react";
import * as Pages from "@/pages";
import {
  DashBoardHomeSkeleton,
  Error404,
  ErrorBoundaryWrapper,
  MealPlanFormSkeleton,
  ProgressChartSkeleton,
  TextWaveBase,
} from "@/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundaryWrapper>
        <AuthLayout />
      </ErrorBoundaryWrapper>
    ),
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
    element: (
      <ErrorBoundaryWrapper>
        <ProtectedLayout />,
      </ErrorBoundaryWrapper>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<TextWaveBase text="Loading dashboard..." />}>
            <Pages.DashboardPage />
          </Suspense>
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
              <Suspense fallback={<TextWaveBase text="Loading profile..." />}>
                <Pages.ProfilePage />
              </Suspense>
            ),
          },
          {
            path: "view-profile",
            element: (
              <Suspense
                fallback={<TextWaveBase text="Loading profile preview..." />}
              >
                <Pages.ViewProfilePage />
              </Suspense>
            ),
          },
          {
            path: "planner",
            element: (
              <Suspense
                fallback={<TextWaveBase text="Loading planner page..." />}
              >
                <Pages.PlannerPage />
              </Suspense>
            ),
          },
          {
            path: "new-plan",
            element: (
              <Suspense
                fallback={<TextWaveBase text="Loading new plan page..." />}
              >
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
              <Suspense
                fallback={<TextWaveBase text="Loading objectives page..." />}
              >
                <Pages.ObjectivesPage />
              </Suspense>
            ),
          },
          {
            path: "user",
            element: (
              <Suspense fallback={<TextWaveBase text="Loading user page..." />}>
                <Pages.UserPage />
              </Suspense>
            ),
          },
          {
            path: "progress-chart",
            element: (
              <Suspense fallback={<ProgressChartSkeleton />}>
                <Pages.ProgressChartPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
