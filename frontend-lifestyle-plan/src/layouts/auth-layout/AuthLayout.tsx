import { Outlet } from "react-router";
import styles from "./AuhtLayout.module.css";

export const AuthLayout = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
};
