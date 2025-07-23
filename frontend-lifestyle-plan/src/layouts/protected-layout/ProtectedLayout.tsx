import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useSessionStore } from "@/store";
import { CheckingCredentialsLoader, SessionInitializer } from "@/components";

export const ProtectedLayout = () => {
  const { isAuthenticated } = useSessionStore();
  const [checking, setChecking] = useState(true);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;

    const waitForAuth = async () => {
      try {
        await Promise.race([
          new Promise<void>((resolve) => {
            const interval = setInterval(() => {
              if (!isCancelled && useSessionStore.getState().hasTriedFetching) {
                clearInterval(interval);
                resolve();
              }
            }, 100);
          }),
          new Promise<void>((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 8000)
          ),
        ]);
      } catch {
        if (!isCancelled) {
          setFailed(true);
          navigate("/login");
        }
      } finally {
        if (!isCancelled) {
          setChecking(false);
        }
      }
    };

    waitForAuth();

    return () => {
      isCancelled = true;
    };
  }, [navigate]);

  if (checking) {
    return <CheckingCredentialsLoader textSize="text-3xl" />;
  }

  if (failed || !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <SessionInitializer />
      <Outlet />
    </>
  );
};
