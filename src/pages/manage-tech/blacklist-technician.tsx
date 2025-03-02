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
    label: "ปิดใช้งานช่าง (Blacklist)",
    link: "",
    icon: "",
  },
];

const BlacklistTechnicianPage: React.FC = () => {
  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">ปิดใช้งานช่าง (Blacklist)</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          BlacklistTechnicianPage
        </div>
      </SidebarLayout>
    </>
  );
};

export default BlacklistTechnicianPage;
