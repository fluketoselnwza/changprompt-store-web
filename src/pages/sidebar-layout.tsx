import React from "react";
// import { AppSidebar } from "./app-sidebar";
import AppSidebar from "./app-sidebar";
import HeaderBar from "./header-bar";
import {
  SidebarInset,
  SidebarProvider,
  // SidebarTrigger,
} from "@/components/ui/sidebar";
import { CustomBreadcrumbs } from "./components";
import { connect } from "react-redux";
import { ISidebarState } from "./interface";
import { cn } from "@/lib/utils";

interface SidebarLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: {
    label: string;
    link: string;
    icon: string;
  }[];
  isSidebar: boolean;
}

const SidebarLayoutComponent: React.FC<SidebarLayoutProps> = ({
  children,
  breadcrumbs,
  isSidebar,
}) => {
  const { innerWidth: width } = window;

  console.log("isSidebar ==> ", isSidebar);

  const widthScreen = isSidebar ? `w-[${width}px]` : `w-[${width - 240}px]`;

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
          <div className={cn(`bg-[#F2F4F7] h-full px-8 py-4`, widthScreen)}>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

const mapDispatchToProps = () => ({});

const mapStateToProps = (state: { onSidebar: ISidebarState }) => ({
  isSidebar: state?.onSidebar.isSidebar,
});

const SidebarLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarLayoutComponent);

export default SidebarLayout;
