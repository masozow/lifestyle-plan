import { IconDotsVertical, type Icon } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { useState } from "react";

export interface NavDocumentItem {
  name: string;
  url: string;
  icon: Icon;
  children?: NavDocumentItem[];
}

export function NavDocuments({
  items,
  title,
}: {
  items: NavDocumentItem[];
  title?: string;
}) {
  const { isMobile, toggleSidebar } = useSidebar();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            {item.children ? (
              <DropdownMenu
                open={openMenu === item.name}
                onOpenChange={(open) => setOpenMenu(open ? item.name : null)}
              >
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <item.icon />
                    <span>{item.name}</span>
                    <IconDotsVertical className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-40 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.name} asChild>
                      <NavLink
                        onClick={() => {
                          if (isMobile) toggleSidebar();
                        }}
                        to={child.url}
                        className="flex items-center gap-2 w-full"
                      >
                        <child.icon className="size-4" />
                        <span>{child.name}</span>
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SidebarMenuButton asChild size="lg" className="w-full">
                <NavLink
                  onClick={() => {
                    if (isMobile) toggleSidebar();
                  }}
                  to={item.url}
                  className="flex items-center gap-2 w-full"
                >
                  <item.icon />
                  <span>{item.name}</span>
                </NavLink>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
