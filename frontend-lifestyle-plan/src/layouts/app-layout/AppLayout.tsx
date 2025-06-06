import { Outlet } from "react-router";
import { NavBar } from "@/components";
import styles from "./AppLayout.module.css";

export const AppLayout = () => {
  return (
    <div className={styles.layout}>
      <NavBar />
      <Outlet />
    </div>
  );
};
