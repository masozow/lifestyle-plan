import { Outlet } from "react-router";
import NavBar from "@/components/my-components/nav-bar/NavBar";
import styles from "./AppLayout.module.css";

export const AppLayout = () => {
  return (
    <div className={styles.layout}>
      <NavBar />
      <Outlet />
    </div>
  );
};
