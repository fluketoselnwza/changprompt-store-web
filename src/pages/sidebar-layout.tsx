import React from "react";
import { AppSidebar } from "./app-sidebar";
import HeaderBar from "./header-bar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import IconHome from "@/assets/icons/icon-home.png";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <>
      <SidebarProvider>
        <HeaderBar />
        <AppSidebar className="mt-[56px]" />
        <SidebarInset className="mt-[56px]">
          <header className="flex bg-[#F2F4F7] h-[80px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[80px]">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
              <div className="bg-white h-[45px] flex items-center px-5 rounded-lg	gap-4">
                <div className="flex items-center gap-4">
                  <img src={IconHome} width={18} height={18} alt="icon home" />
                  <span>จัดการงาน</span>
                </div>
                <ChevronRight className="w-[16px] h-[32px]" />
                <span>ใบงานทั้งหมด</span>
              </div>
            </div>
          </header>
          <div className="bg-[#F2F4F7] h-full">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default SidebarLayout;
