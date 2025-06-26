import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useSessionStore } from "@/store";
import { SessionInitializer } from "@/components";

export const ProtectedLayout = () => {
  const { isAuthenticated, hasTriedFetching } = useSessionStore();
  const [timeoutExceeded, setTimeoutExceeded] = useState(false);

  useEffect(() => {
    if (hasTriedFetching) {
      setTimeoutExceeded(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeoutExceeded(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, [hasTriedFetching]);

  if (!hasTriedFetching) {
    if (timeoutExceeded) {
      return (
        <div className="text-red-500 p-4">
          Unable to verify session. Please{" "}
          <a href="/login" className="underline">
            log in again
          </a>
          .
        </div>
      );
    }
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <SessionInitializer />
      <Outlet />
    </>
  );
};
