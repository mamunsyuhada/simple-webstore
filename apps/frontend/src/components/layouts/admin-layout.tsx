import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
