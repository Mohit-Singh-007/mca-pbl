import {
  FileText,
  History,
  LayoutDashboard,
  RefreshCw,
  FileStack,
  LucideHome,
  Calendar,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/",
    icon: LucideHome,
  },
  {
    title: "Dashboard",
    url: "/converter",
    icon: LayoutDashboard,
  },
  {
    title: "All Activity",
    url: "/converter/files",
    icon: History,
  },
  {
    title: "Images",
    url: "/converter/images",
    icon: RefreshCw,
  },
  {
    title: "Documents",
    url: "/converter/documents",
    icon: FileText,
  },
  {
    title: "Merged PDFs",
    url: "/converter/merges",
    icon: FileStack,
  },
  {
    title: "Shortener",
    url: "/shortener",
    icon: Calendar,
  },
];

export function ConverterSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Converter Hub</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
