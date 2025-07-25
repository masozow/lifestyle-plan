import { createBrowserRouter } from "react-router";
import { AuthLayout } from "@/layouts/auth-layout/AuthLayout";
import { ProtectedLayout } from "@/layouts/protected-layout/ProtectedLayout";
import DashboardHome from "@/components/my-components/dashboard/DashboardHome";
import { lazy, Suspense } from "react";
import { DashBoardHomeSkeleton } from "@/components/my-components/dashboard/DashboardHomeSkeleton";
import { Error404 } from "@/components/my-components/error-boundaries/Error404";
import { ErrorBoundaryWrapper } from "@/components/my-components/error-boundaries/ErrorBoundaryWrapper";
import { MealPlanFormSkeleton } from "@/components/my-components/MealPlanForm/MealPlanFormSkeleton";
import ProgressChartSkeleton from "@/components/my-components/charts/progress-chart/ProgressChartSkeleton";
import { TextWaveBase } from "@/components/my-components/loaders/TextWaveBase";
import { LandingPage } from "@/pages/landing/LandingPage";

const LoginPage = lazy(() =>
  import("@/pages/login/LoginPage").then((m) => ({ default: m.default }))
);
const PlannerPage = lazy(() =>
  import("@/pages/planner/PlannerPage").then((m) => ({ default: m.default }))
);
const RegisterPage = lazy(() =>
  import("@/pages/register/RegisterPage").then((m) => ({ default: m.default }))
);
const DashboardPage = lazy(() =>
  import("@/pages/dashboard/DashboardPage").then((m) => ({
    default: m.default,
  }))
);
const ProfilePage = lazy(() =>
  import("@/pages/profile/ProfilePage").then((m) => ({ default: m.default }))
);
const ViewProfilePage = lazy(() =>
  import("@/pages/profile/ViewProfilePage").then((m) => ({
    default: m.default,
  }))
);
const NewPlanPage = lazy(() =>
  import("@/pages/new-plan/NewPlanPage").then((m) => ({ default: m.default }))
);
const MealPlanPage = lazy(() =>
  import("@/pages/meal-plan/MealPlanPage").then((m) => ({ default: m.default }))
);
const ObjectivesPage = lazy(() =>
  import("@/pages/planner/ObjectivesPage").then((m) => ({ default: m.default }))
);
const UserPage = lazy(() =>
  import("@/pages/user/UserPage").then((m) => ({ default: m.default }))
);
const ProgressChartPage = lazy(() =>
  import("@/pages/charts/ProgressChartPage").then((m) => ({
    default: m.default,
  }))
);
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
        element: <LandingPage />,
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<TextWaveBase text="Loading login page..." />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<TextWaveBase text="Loading register page..." />}>
            <RegisterPage />
          </Suspense>
        ),
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
            <DashboardPage />
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
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: "view-profile",
            element: (
              <Suspense
                fallback={<TextWaveBase text="Loading profile preview..." />}
              >
                <ViewProfilePage />
              </Suspense>
            ),
          },
          {
            path: "planner",
            element: (
              <Suspense
                fallback={<TextWaveBase text="Loading planner page..." />}
              >
                <PlannerPage />
              </Suspense>
            ),
          },
          {
            path: "new-plan",
            element: (
              <Suspense
                fallback={<TextWaveBase text="Loading new plan page..." />}
              >
                <NewPlanPage />
              </Suspense>
            ),
          },
          {
            path: "meal-plan",
            element: (
              <Suspense fallback={<MealPlanFormSkeleton />}>
                <MealPlanPage />
              </Suspense>
            ),
          },
          {
            path: "objectives",
            element: (
              <Suspense
                fallback={<TextWaveBase text="Loading objectives page..." />}
              >
                <ObjectivesPage />
              </Suspense>
            ),
          },
          {
            path: "user",
            element: (
              <Suspense fallback={<TextWaveBase text="Loading user page..." />}>
                <UserPage />
              </Suspense>
            ),
          },
          {
            path: "progress-chart",
            element: (
              <Suspense fallback={<ProgressChartSkeleton />}>
                <ProgressChartPage />
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
