import React from "react";
import { AppSidebar } from "./app-sidebar";
import HeaderBar from "./header-bar";
import {
  SidebarInset,
  SidebarProvider,
  // SidebarTrigger,
} from "@/components/ui/sidebar";
import { CustomBreadcrumbs } from "./components";

interface SidebarLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: {
    label: string;
    link: string;
    icon: string;
  }[];
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  breadcrumbs,
}) => {
  return (
    <>
      {/* <SidebarTrigger className="-ml-1" /> */}
      {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
      <SidebarProvider>
        <HeaderBar />
        <AppSidebar className="mt-[56px]" />
        <SidebarInset className="mt-[56px]">
          {breadcrumbs?.length ? (
            <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
          ) : null}
          <div className="bg-[#F2F4F7] h-full">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default SidebarLayout;
