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
    label: "ข้อมูลร้านค้า",
    link: "",
    icon: "",
  },
];

const GetStorePage: React.FC = () => {
  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">ข้อมูลร้านค้า</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          GetStorePage
        </div>
      </SidebarLayout>
    </>
  );
};

export default GetStorePage;
