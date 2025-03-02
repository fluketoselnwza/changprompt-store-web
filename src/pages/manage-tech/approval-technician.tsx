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
    label: "ขออนุมัติเข้าร่วมร้าน",
    link: "",
    icon: "",
  },
];

const ApprovalTechnicianPage: React.FC = () => {
  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">ขออนุมัติเข้าร่วมร้าน</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          ApprovalTechnicianPage
        </div>
      </SidebarLayout>
    </>
  );
};

export default ApprovalTechnicianPage;
