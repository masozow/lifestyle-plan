import { ModeToggle } from "@/components/theme/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { NavLink, Outlet } from "react-router";
import LanguageMenu from "./LanguageMenu";
const NavBar = () => {
  return (
    <>
      <div className="flex justify-between fixed top-0 left-0 w-full px-4 py-2 backdrop-blur-md bg-background/50 dark:bg-background-dark/50">
        <NavLink className="text-2xl font-bold" to={"/"}>
          <span className="text-primary">Fit</span>app
        </NavLink>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <LanguageMenu />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Outlet />
    </>
  );
};
export default NavBar;
