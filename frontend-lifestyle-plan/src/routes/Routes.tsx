import App from "@/App";
import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login/LoginPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },
      // { path: "search", element: <SearchPage /> },
      // { path: "dashboard", element: <Page /> },
      // { path: "design-guide", element: <DesignPage /> },
      // {
      //   path: "company/:ticker",
      //   element: <Company />,
      //   children: [
      //     { path: "company-profile", element: <CompanyProfile /> },
      //     { path: "income-statement", element: <IncomeStatement /> },
      //     { path: "balance-sheet", element: <BalanceSheet /> },
      //     { path: "cashflow-statement", element: <CashFlowStatement /> },
      //   ],
      // },
    ],
  },
]);
