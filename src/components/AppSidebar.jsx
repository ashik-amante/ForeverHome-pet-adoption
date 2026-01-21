import React from 'react';
import {
  PlusCircle, PawPrint, ClipboardList,
  HandCoins, LayoutDashboard, History, Heart,
  DollarSign,
  Dog, ChartColumnIncreasing
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
import useUserRole from '@/hooks/useUserRole';
import Loading from './Loading';

const userMenuItems = [
  { title: "Add a Pet", url: "/dashboard/add-pet", icon: PlusCircle },
  { title: "My Added Pets", url: "/dashboard/my-pets", icon: PawPrint },
  { title: "Adoption Request", url: "/dashboard/adoption-requests", icon: ClipboardList },
  { title: "Create Donation Campaign", url: "/dashboard/create-donation", icon: HandCoins },
  { title: "My Campaigns", url: "/dashboard/my-campaigns", icon: LayoutDashboard },
  { title: "My Donations", url: "/dashboard/my-donations", icon: History },
  { title: "My adopted pets", url: "/dashboard/my-adopted", icon: History },
 
];

const adminMenuItems = [
  { title: "All Pets", url: "/dashboard/all-pets", icon: Dog },
  { title: "All Donations", url: "/dashboard/all-donations", icon: DollarSign },
  { title: "Admin Statistics", url: "/dashboard/statistics", icon: ChartColumnIncreasing },
]

export function AppSidebar() {
  const location = useLocation();
  const { role,isLoading } = useUserRole()
  console.log(role);
  if(isLoading) return <Loading></Loading>

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 flex flex-row items-center gap-2">
        <Heart className="text-primary fill-primary" />
        <Link to="/" className="font-bold text-xl group-data-[collapsible=icon]:hidden">
          ForeverHome
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* user dashboard */}
        <SidebarGroup>
          <SidebarGroupLabel className={'font-bold text-2xl'}>User Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenuItems.map((item) => (
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

        {/* admin dashboard */}
        {
          role === 'admin' && (
            <SidebarGroup>
              <SidebarGroupLabel className={'font-bold text-2xl'}>Admin Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminMenuItems.map((item) => (
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
          )
        }
      </SidebarContent>
    </Sidebar>
  );
}