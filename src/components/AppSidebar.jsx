import React from 'react';
import {
  PlusCircle, PawPrint, ClipboardList,
  HandCoins, LayoutDashboard, History, Heart
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Add a Pet", url: "/dashboard/add-pet", icon: PlusCircle },

  { title: "My Added Pets", url: "/dashboard/my-pets", icon: PawPrint },

  { title: "Adoption Request", url: "/dashboard/adoption-requests", icon: ClipboardList },
  { title: "Create Donation", url: "/dashboard/create-donation", icon: HandCoins },
  { title: "My Campaigns", url: "/dashboard/my-campaigns", icon: LayoutDashboard },
  { title: "My Donations", url: "/dashboard/my-donations", icon: History },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 flex flex-row items-center gap-2">
        <Heart className="text-primary fill-primary" />
        <Link to="/" className="font-bold text-xl group-data-[collapsible=icon]:hidden">
          ForeverHome
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>User Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={'mt-2'}
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
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