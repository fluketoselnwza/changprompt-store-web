import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import IconManageTask from "@/assets/icons/icon-manage-task.png";
import IconManageStore from "@/assets/icons/icon-manage-store.png";
import IconManageTechnician from "@/assets/icons/icon-manage-technician.png";
import IconManageReview from "@/assets/icons/icon-namage-review.png";
import IconManageUser from "@/assets/icons/icon-manage-user.png";
import { ISidebarState } from "./interface";
import { connect } from "react-redux";

// This is sample data.
const data = {
  navMain: [
    {
      title: "จัดการงาน",
      url: "#",
      icon: IconManageTask,
      id: "manage-task",
      isActive: true,
      items: [
        {
          title: "ใบงานทั้งหมด",
          url: "/manage-task/all-tasks",
          id: "all-tasks",
        },
        {
          title: "งานรอช่างกดรับ",
          url: "/manage-task/waiting-tech-task",
          id: "waiting-tech-task",
        },
        {
          title: "ประวัติใบงาน",
          url: "/manage-task/history-task",
          id: "history-task",
        },
      ],
    },
    {
      title: "จัดการร้านค้า",
      url: "#",
      icon: IconManageStore,
      id: "manage-store",
      isActive: false,
      items: [
        {
          title: "ข้อมูลร้านค้า",
          url: "/manage-store/get-store",
          id: "get-store",
        },
      ],
    },
    {
      title: "จัดการช่าง",
      url: "#",
      icon: IconManageTechnician,
      isActive: false,
      id: "manage-tech",
      items: [
        {
          title: "ช่างทั้งหมด",
          url: "/manage-tech/all-technician",
          id: "all-technician",
        },
        {
          title: "ขออนุมัติเข้าร่วมร้าน",
          url: "/manage-tech/approval-technician",
          id: "approval-technician",
        },
        {
          title: "ตารางงานช่าง",
          url: "/manage-tech/schedule-technician",
          id: "schedule-technician",
        },
        {
          title: "ปิดใช้งานช่าง (Blacklist)",
          url: "/manage-tech/backlist-technician",
          id: "backlist-technician",
        },
        {
          title: "ประวัติการทำงานช่าง",
          url: "/manage-tech/history-technician",
          id: "history-technician",
        },
      ],
    },
    {
      title: "จัดการรีวิว",
      url: "#",
      icon: IconManageReview,
      id: "manage-review",
      isActive: false,
      items: [
        {
          title: "ความคิดเห็นและรีวิว",
          url: "/manage-review/comment-and-review",
          id: "comment-and-review",
        },
      ],
    },
    {
      title: "จัดการผู้ใช้งาน",
      url: "#",
      icon: IconManageUser,
      id: "manage-user",
      isActive: false,
      items: [
        {
          title: "ข้อมูลผู้ใช้งานทั้งหมด",
          url: "/manage-user/all-user",
          id: "all-user",
        },
        {
          title: "จัดการรหัสผ่าน",
          url: "/manage-user/change-password",
          id: "change-password",
        },
      ],
    },
  ],
};

function AppSidebarConncet({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}

const mapDispatchToProps = () => ({});

const mapStateToProps = (state: { onSidebar: ISidebarState }) => ({
  isSidebar: state?.onSidebar.isSidebar,
});

const AppSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebarConncet);

export default AppSidebar;
