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
    label: "ประวัติการทำงานช่าง",
    link: "",
    icon: "",
  },
];

const HistoryTechnicianPage: React.FC = () => {
  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">ประวัติการทำงานช่าง</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          HistoryTechnicianPage
        </div>
      </SidebarLayout>
    </>
  );
};

export default HistoryTechnicianPage;
