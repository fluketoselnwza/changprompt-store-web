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
    label: "ประวัติใบงาน",
    link: "",
    icon: "",
  },
];

const HistoryTaskPage: React.FC = () => {
  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">ประวัติใบงาน</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          history task
        </div>
      </SidebarLayout>
    </>
  );
};

export default HistoryTaskPage;
