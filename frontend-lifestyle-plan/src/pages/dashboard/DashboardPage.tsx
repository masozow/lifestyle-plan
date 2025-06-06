import { useSessionStore } from "@/store";

export const DashboardPage = () => {
  const { user } = useSessionStore();
  console.log("User from Zustand:", user);
  return <div className="h-screen mt-10">DashboardPage: </div>;
};
