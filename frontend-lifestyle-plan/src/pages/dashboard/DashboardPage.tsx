import { Dashboard } from "@/components";
import { useSessionStore } from "@/store";

export const DashboardPage = () => {
  const { user } = useSessionStore();
  console.log("User from Zustand:", user);
  return <Dashboard user={user} />;
};
