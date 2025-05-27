import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useLocale } from "@/hooks";
import { availableLocales, type LocaleCode } from "@/locales/localesTypes";

import { NavLink, Outlet } from "react-router";

const NavBar = () => {
  const { locale, changeLocale } = useLocale();

  return (
    <>
      <div className="flex justify-between fixed top-0 left-0 w-full px-4 py-2 backdrop-blur-md bg-background/50 dark:bg-background-dark/50">
        <NavLink className="text-2xl font-bold" to={"/"}>
          <span className="text-primary">Fit</span>app
        </NavLink>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Language: {availableLocales[locale as LocaleCode] || locale}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {Object.entries(availableLocales).map(([code, name]) => (
                  <NavigationMenuLink
                    key={code}
                    onClick={() => changeLocale(code as LocaleCode)}
                    className="cursor-pointer"
                  >
                    {name}
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
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
