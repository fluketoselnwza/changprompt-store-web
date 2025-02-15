import React from "react";
import { AppSidebar } from "./app-sidebar";
import HeaderBar from "./header-bar";
import {
  SidebarInset,
  SidebarProvider,
  // SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";

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
            <header className="flex bg-[#F2F4F7] h-[90px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[90px]">
              <div className="flex items-center gap-2 px-8">
                <div className="bg-white h-[45px] flex items-center px-5 rounded-lg	gap-4">
                  {breadcrumbs.map((item, index) => (
                    <>
                      <div className="flex items-center gap-4" key={index}>
                        {item.icon && (
                          <img
                            src={item.icon}
                            className="w-[16px] h-[16px]"
                            alt="icon home"
                          />
                        )}
                        <span>{item.label}</span>
                      </div>
                      {breadcrumbs.length - 1 !== index ? (
                        <ChevronRight className="w-[16px] h-[32px]" />
                      ) : null}
                    </>
                  ))}
                </div>
              </div>
            </header>
          ) : null}
          <div className="bg-[#F2F4F7] h-full">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default SidebarLayout;
