import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useAuth from "@/hooks/useAuth";
import { User } from "lucide-react";

import { Outlet } from "react-router-dom";


export default function DashboardLayout() {
  const { user } = useAuth()
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Shadcn Sidebar */}
        <AppSidebar />

        <main className="flex-1 overflow-auto bg-secondary/10">
          {/* Top Bar inside Dashboard */}
          <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 justify-between">
                Welcome to your Dashboard
                <div className="flex items-center gap-3">
                  <User size={20} /> <span className="font-bold italic text-rose-400 text-xl">{user?.displayName}</span>
                </div>
              </h1>
            </div>
          </header>

          {/* Dynamic Content Area */}
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}