import { lazy } from "react";

//pages that can lazy load
export const PlannerPage = lazy(() => import("./planner/PlannerPage"));
export const ProfilePage = lazy(() => import("./profile/ProfilePage"));
export const ViewProfilePage = lazy(() => import("./profile/ViewProfilePage"));
export const NewPlanPage = lazy(() => import("./new-plan/NewPlanPage"));
export const ObjectivesPage = lazy(() => import("./planner/ObjectivesPage"));
export const UserPage = lazy(() => import("./user/UserPage"));
export const MealPlanPage = lazy(() => import("./meal-plan/MealPlanPage"));

//instant loading pages
export * from "./landing/LandingPage.tsx";
export * from "./login/LoginPage.tsx";
export * from "./register/RegisterPage.tsx";
export * from  "./dashboard/DashboardPage.tsx";

//charts
export * from "./charts/ProgressChartPage.tsx";
