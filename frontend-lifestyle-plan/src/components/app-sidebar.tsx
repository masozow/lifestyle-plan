import * as React from "react";
import {
  IconChartArea,
  IconCheckbox,
  IconDashboard,
  IconHelp,
  IconList,
  IconPlus,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { Cherry } from "lucide-react";
import { useSessionStore } from "@/store";
import LanguageMenu from "./my-components/nav-bar/LanguageMenu";
import { ModeToggle } from "./theme/mode-toggle";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "",
      icon: IconDashboard,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Profile",
      url: "#",
      icon: IconUsers,
      children: [
        {
          name: "New profile",
          url: "profile",
          icon: IconPlus,
        },
        {
          name: "View",
          url: "view-profile",
          icon: IconSearch,
        },
      ],
    },
    {
      name: "Meal Plan",
      url: "#",
      icon: IconList,
      children: [
        {
          name: "New",
          url: "new-plan",
          icon: IconPlus,
        },
        {
          name: "View",
          url: "meal-plan",
          icon: IconSearch,
        },
      ],
    },
    {
      name: "Objectives",
      url: "#",
      icon: IconCheckbox,
      children: [
        {
          name: "New",
          url: "planner",
          icon: IconPlus,
        },
        {
          name: "View",
          url: "objectives",
          icon: IconSearch,
        },
      ],
    },
    {
      name: "Progress",
      url: "#",
      icon: IconChartArea,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSessionStore();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="mt-10">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 py-0.5 !text-left"
            >
              <NavLink
                to="/"
                className="flex items-center gap-2 font-medium justify-center"
              >
                <Cherry className="!size-6 color-primary rounded-md bg-primary text-primary-foreground p-0.5" />
                <p className="text-2xl font-bold">
                  <span className="text-primary">Fit</span>app
                </p>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} title="Options" />
      </SidebarContent>
      <SidebarFooter>
        <LanguageMenu />
        <ModeToggle />
        <NavUser
          user={{
            name: user?.name || "user",
            email: user?.email || "m@example.com",
            avatar: "https://github.com/shadcn.png",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
