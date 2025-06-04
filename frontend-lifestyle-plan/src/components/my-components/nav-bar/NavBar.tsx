import { ModeToggle } from "@/components/theme/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { NavLink, Outlet } from "react-router";
import LanguageMenu from "./LanguageMenu";
import { Button } from "@/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
              <Button asChild variant="outline">
                <NavLink to="/app/register">Register</NavLink>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button asChild>
                <NavLink to="/login">Login</NavLink>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                asChild
                variant="ghost"
                className="p-2 flex items-center border-1 border-dashed"
              >
                <NavLink to="/app/dashboard" className="flex items-center">
                  <Avatar className="h-full">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      className="h-full rounded-lg aspect-square object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="text-md">User</span>
                </NavLink>
              </Button>
            </NavigationMenuItem>
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
