import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import IconManageTask from "@/assets/icons/icon-manage-task.png";
import IconManageStore from "@/assets/icons/icon-manage-store.png";
import IconManageTechnician from "@/assets/icons/icon-manage-technician.png";
import IconManageReview from "@/assets/icons/icon-namage-review.png";
import IconManageUser from "@/assets/icons/icon-manage-user.png";

// This is sample data.
const data = {
  navMain: [
    {
      title: "จัดการงาน",
      url: "#",
      icon: IconManageTask,
      isActive: true,
      items: [
        {
          title: "ใบงานทั้งหมด",
          url: "#",
        },
        {
          title: "งานรอช่างกดรับ",
          url: "#",
        },
        {
          title: "ประวัติใบงาน",
          url: "#",
        },
      ],
    },
    {
      title: "จัดการร้านค้า",
      url: "#",
      icon: IconManageStore,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "จัดการช่าง",
      url: "#",
      icon: IconManageTechnician,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "จัดการรีวิว",
      url: "#",
      icon: IconManageReview,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "จัดการผู้ใช้งาน",
      url: "#",
      icon: IconManageUser,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
