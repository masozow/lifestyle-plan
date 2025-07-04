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
import type { JSX } from "react";
import { useTranslation } from "react-i18next";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element => {
  const { t } = useTranslation();

  const data = {
    navMain: [
      {
        title: t("dashboard.navMain.title"),
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
        name: t("dashboard.documents.profile"),
        url: "#",
        icon: IconUsers,
        children: [
          {
            name: t("dashboard.documents.children.new"),
            url: "profile",
            icon: IconPlus,
          },
          {
            name: t("dashboard.documents.children.view"),
            url: "view-profile",
            icon: IconSearch,
          },
        ],
      },
      {
        name: t("dashboard.documents.mealPlan"),
        url: "#",
        icon: IconList,
        children: [
          {
            name: t("dashboard.documents.children.new"),
            url: "new-plan",
            icon: IconPlus,
          },
          {
            name: t("dashboard.documents.children.view"),
            url: "meal-plan",
            icon: IconSearch,
          },
        ],
      },
      {
        name: t("dashboard.documents.objectives"),
        url: "#",
        icon: IconCheckbox,
        children: [
          {
            name: t("dashboard.documents.children.new"),
            url: "planner",
            icon: IconPlus,
          },
          {
            name: t("dashboard.documents.children.view"),
            url: "objectives",
            icon: IconSearch,
          },
        ],
      },
      {
        name: t("dashboard.documents.progress"),
        url: "progress-chart",
        icon: IconChartArea,
      },
    ],
  };
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
};
