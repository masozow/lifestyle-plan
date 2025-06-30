import { lazy } from "react";

export const LandingPage = lazy(() => import("./landing/LandingPage"));
export const LoginPage = lazy(() => import("./login/LoginPage"));
export const RegisterPage = lazy(() => import("./register/RegisterPage"));
export const PlannerPage = lazy(() => import("./planner/PlannerPage"));
export const ProfilePage = lazy(() => import("./profile/ProfilePage"));
export const ViewProfilePage = lazy(() => import("./profile/ViewProfilePage"));
export const NewPlanPage = lazy(() => import("./new-plan/NewPlanPage"));
export const ObjectivesPage = lazy(() => import("./planner/ObjectivesPage"));
export const UserPage = lazy(() => import("./user/UserPage"));
export const MealPlanPage = lazy(() => import("./meal-plan/MealPlanPage"));
export const DashboardPage = lazy(() => import("./dashboard/DashboardPage"));

// export * from "./landing/LandingPage.tsx";
// export * from "./login/LoginPage.tsx";
// export * from "./register/RegisterPage.tsx";
// export * from "./planner/PlannerPage.tsx";
// export * from "./dashboard/DashboardPage.tsx";
// export * from "./profile/ProfilePage.tsx";
// export * from "./new-plan/NewPlanPage.tsx";
// export * from "./meal-plan/MealPlanPage.tsx";
// export * from "./planner/ObjectivesPage.tsx";
// export * from "./profile/ViewProfilePage.tsx";
// export * from "./user/UserPage.tsx";