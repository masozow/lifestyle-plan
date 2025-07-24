import { lazy } from "react";

// Páginas con Lazy Loading
export const PlannerPage = lazy(() =>
  import("./planner/PlannerPage").then((m) => ({ default: m.default }))
);
export const ProfilePage = lazy(() =>
  import("./profile/ProfilePage").then((m) => ({ default: m.default }))
);
export const ViewProfilePage = lazy(() =>
  import("./profile/ViewProfilePage").then((m) => ({ default: m.default }))
);
export const NewPlanPage = lazy(() =>
  import("./new-plan/NewPlanPage").then((m) => ({ default: m.default }))
);
export const ObjectivesPage = lazy(() =>
  import("./planner/ObjectivesPage").then((m) => ({ default: m.default }))
);
export const UserPage = lazy(() =>
  import("./user/UserPage").then((m) => ({ default: m.default }))
);
export const MealPlanPage = lazy(() =>
  import("./meal-plan/MealPlanPage").then((m) => ({ default: m.default }))
);


// Páginas con carga inmediata
export {  LandingPage } from "./landing/LandingPage";
export { LoginPage } from "./login/LoginPage";
export { RegisterPage } from "./register/RegisterPage";
export {  DashboardPage } from "./dashboard/DashboardPage";

//charts
export const ProgressChartPage = lazy(() =>
  import("./charts/ProgressChartPage").then((m) => ({ default: m.default }))
);