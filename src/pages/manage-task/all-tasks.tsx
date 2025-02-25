import SidebarLayout from "../sidebar-layout";
import {
  CustomInputIcon,
  // CustomTable,
  CustomSelect,
  ModalInput,
} from "../components";
import { Button } from "@/components/ui/button";
import IconLink from "@/assets/icons/icon-link.png";
import IconPencil from "@/assets/icons/icon-pencil.png";
import IconSearch from "@/assets/icons/icon-search.png";
// import { HeaderTableAllTask } from "../data/headerTable";
// import IconSubMenu from "@/assets/icons/icon-sub-menu.png";
// import { TableCell } from "@/components/ui/table";
import { useState } from "react";
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
];

const AllTasksPage = () => {
  const navigate = useNavigate();
  const [isOpenLink, setIsOpenLink] = useState<boolean>(false);

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">ใบงานทั้งหมด</p>
            <div className="flex items-center gap-4">
              <Button variant={"outline"} onClick={() => setIsOpenLink(true)}>
                <img src={IconLink} width={20} height={20} alt="icon link" />
                <span className="text-[16px]">สร้างลิงค์ใบงาน</span>
              </Button>
              <Button
                variant={"outline"}
                onClick={() => navigate("/manage-task/all-tasks/new-task")}
              >
                <img
                  src={IconPencil}
                  alt="icon pencil"
                  className="w-[20px] h-[20px]"
                />
                <span className="text-[16px]">สร้างใบงานใหม่</span>
              </Button>
            </div>
          </div>
          <div className="bg-white p-[16px] mt-[24px] rounded-[8px]">
            <div className="grid grid-cols-6 gap-3 mb-5">
              <CustomInputIcon
                iconLeft={IconSearch}
                name="numberTask"
                placeholder="ค้นหาเลขที่ใบงาน"
                classInput="text-[14px]"
              />
              <CustomInputIcon
                iconLeft={IconSearch}
                name="nameCustomer"
                placeholder="ชื่อลูกค้า"
                classInput="text-[14px]"
              />
              <CustomSelect
                name="product"
                placeholder="เลืกสินค้า"
                options={[
                  {
                    label: "แอร์",
                    value: "1",
                  },
                  {
                    label: "พัดลม",
                    value: "2",
                  },
                  {
                    label: "ทีวี",
                    value: "3",
                  },
                ]}
              />
              <CustomSelect
                name="category"
                placeholder="หมวดหมู่งาน"
                options={[
                  {
                    label: "ซ่อม",
                    value: "1",
                  },
                  {
                    label: "ติดตั้ง",
                    value: "2",
                  },
                ]}
              />
              <CustomSelect
                name="status"
                placeholder="สถานะงาน"
                options={[
                  {
                    label: "สำเร็จ",
                    value: "1",
                  },
                  {
                    label: "รอให้บริการ",
                    value: "2",
                  },
                ]}
              />
              <div className="flex gap-3">
                <Button
                  className="w-full text-[16px] h-[42px] rounded-lg"
                  variant={"outline"}
                >
                  ล้าง
                </Button>
                <Button className="w-full text-[16px] h-[42px] rounded-lg">
                  ค้นหา
                </Button>
              </div>
            </div>
            <div>
              {/* <CustomTable
                bodyData={bodyData}
                headerData={HeaderTableAllTask}
              /> */}
            </div>
          </div>
        </div>
      </SidebarLayout>
      <ModalInput isOpen={isOpenLink} setIsOpen={setIsOpenLink} />
    </>
  );
};

export default AllTasksPage;
