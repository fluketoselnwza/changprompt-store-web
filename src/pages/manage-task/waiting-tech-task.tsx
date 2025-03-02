import React from "react";
import SidebarLayout from "../sidebar-layout";

import IconHome from "@/assets/icons/icon-home.png";

const breadcrumbs = [
  {
    label: "จัดการงาน",
    link: "",
    icon: IconHome,
  },
  {
    label: "งานรอช่างกดรับ",
    link: "",
    icon: "",
  },
];

const WaitingTechTaskPage: React.FC = () => {
  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">งานรอช่างกดรับ</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          waiting tech task
        </div>
      </SidebarLayout>
    </>
  );
};

export default WaitingTechTaskPage;
