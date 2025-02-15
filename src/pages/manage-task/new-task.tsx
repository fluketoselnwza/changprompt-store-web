import React from "react";
import SidebarLayout from "../sidebar-layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import IconHome from "@/assets/icons/icon-home.png";

const breadcrumbs = [
  {
    label: "จัดการงาน",
    link: "",
    icon: IconHome,
  },
  {
    label: "ใบงานทั้งหมด",
    link: "",
    icon: "",
  },
  {
    label: "สร้างใบงานใหม่",
    link: "",
    icon: "",
  },
];

const NewTaskPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div className="px-8 py-4 rounded-lg">
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">สร้างใบงานใหม่</p>
            <div className="flex items-center gap-4">
              <Button
                variant={"outline"}
                onClick={() => navigate("/manage-task/all-tasks")}
              >
                <span className="text-[16px]">ย้อนกลับ</span>
              </Button>
              <Button variant={"outline"}>
                <span className="text-[16px]">สร้างใบงาน</span>
              </Button>
            </div>
          </div>
          <div className="bg-white p-4 mt-4 rounded-[8px]"></div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default NewTaskPage;
