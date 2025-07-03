import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useSessionStore } from "@/store";
import { CheckingCredentialsLoader, SessionInitializer } from "@/components";

export const ProtectedLayout = () => {
  const { isAuthenticated, hasTriedFetching } = useSessionStore();
  const [timeoutExceeded, setTimeoutExceeded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!hasTriedFetching) {
      timer = setTimeout(() => {
        setTimeoutExceeded(true);
      }, 8000);
    }

    return () => clearTimeout(timer);
  }, [hasTriedFetching]);

  useEffect(() => {
    if (timeoutExceeded && !hasTriedFetching) {
      navigate("/login");
    }
  }, [timeoutExceeded, hasTriedFetching, navigate]);

  if (!hasTriedFetching) {
    return <CheckingCredentialsLoader textSize="text-3xl" />;
  }

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <SessionInitializer />
      <Outlet />
    </>
  );
};
