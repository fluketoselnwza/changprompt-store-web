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
    label: "ช่างทั้งหมด",
    link: "",
    icon: "",
  },
];

const AllTechnicianPage: React.FC = () => {
  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">ช่างทั้งหมด (0 คน)</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          AllTechnicianPage
        </div>
      </SidebarLayout>
    </>
  );
};

export default AllTechnicianPage;
