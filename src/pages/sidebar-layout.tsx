import React from "react";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import HeaderBar from "./header-bar";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderBar />
      <SidebarProvider>
        <AppSidebar />
        <main>
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default SidebarLayout;
