import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";


export default function DashboardLayout() {
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
              <h1 className="text-sm font-semibold text-muted-foreground">
                Welcome to your Dashboard
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