import { ModeToggle } from "@/components/theme/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { NavLink } from "react-router";
import { LanguageMenu } from "@/components";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { JSX } from "react";

interface Props {
  userName?: string;
}
export const NavBar = ({ userName }: Props): JSX.Element => {
  return (
    <div className="flex justify-between fixed top-0 left-0 w-full px-4 py-2 backdrop-blur-md bg-background/50 dark:bg-background-dark/50 z-50">
      <NavLink className="text-2xl font-bold" to={"/"}>
        <span className="text-primary">Fit</span>app
      </NavLink>
      <NavigationMenu>
        <NavigationMenuList>
          {!userName && (
            <NavigationMenuItem>
              <Button asChild variant="outline">
                <NavLink to="/register">Register</NavLink>
              </Button>
            </NavigationMenuItem>
          )}
          {!userName && (
            <NavigationMenuItem>
              <Button asChild>
                <NavLink to="/login">Login</NavLink>
              </Button>
            </NavigationMenuItem>
          )}
          {userName && (
            <NavigationMenuItem>
              <Button
                asChild
                variant="ghost"
                className="p-2 flex items-center border-1 border-dashed"
              >
                <NavLink to="/app/dashboard" className="flex items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      {userName?.split(" ")[0][0] || "User"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-md">
                    {userName?.split(" ")[0] || "User"}
                  </span>
                </NavLink>
              </Button>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <LanguageMenu />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
