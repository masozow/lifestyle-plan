import { useApiGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/backendURLS";
import { useSessionStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";

type Profile = {
  id: number;
  unitSystem: string;
  weight: number;
  height: number;
  age: number;
  waist: number;
  neck: number;
  hip?: number | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export const Profile = () => {
  const { user } = useSessionStore();
  const userId = 40; // o user?.id

  const { data, isLoading, isError, error } = useApiGet<{
    success: boolean;
    data: Profile;
  }>({
    url: `${API_ENDPOINTS.profile}/${userId}`,
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading profile...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  const plan = data?.data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-1/2 mx-auto mt-10"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile</CardTitle>
          <div className="w-full border-b border-gray-200 mt-2"></div>
        </CardHeader>
        <CardContent>
          {plan &&
            Object.entries(plan)
              .filter(
                ([key, value]) =>
                  !["id", "userId", "createdAt", "updatedAt"].includes(key) &&
                  value !== null &&
                  value !== ""
              )
              .map(([key, value]) => (
                <div key={key} className="grid grid-cols-4">
                  <p className="col-span-1 font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                  <Badge variant="outline" className="col-span-3 text-md">
                    {String(value).replace("-", " ").charAt(0).toUpperCase() +
                      String(value).replace("-", " ").slice(1)}
                  </Badge>
                </div>
              ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};
