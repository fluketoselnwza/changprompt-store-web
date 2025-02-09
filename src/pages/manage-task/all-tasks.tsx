import SidebarLayout from "../sidebar-layout";
import { CustomInputIcon, CustomTable, CustomSelect } from "../components";
import { Button } from "@/components/ui/button";
import IconLink from "@/assets/icons/icon-link.png";
import IconPencil from "@/assets/icons/icon-pencil.png";
import IconSearch from "@/assets/icons/icon-search.png";
import { HeaderTableAllTask } from "../data/headerTable";
import IconSubMenu from "@/assets/icons/icon-sub-menu.png";
import { TableCell } from "@/components/ui/table";

const data = [
  {
    key: "",
    data: "#INS-24020001-0001",
  },
  {
    key: "",
    data: "ติดตั้ง",
  },
  {
    key: "",
    data: "แอร์",
  },
  {
    key: "",
    data: "Brooklyn Simmons",
  },
  {
    key: "",
    data: "Annette Black",
  },
  {
    key: "",
    data: "01/05/2024",
  },
  {
    key: "",
    data: "#1000345678 : แอดมิน",
  },
  {
    key: "",
    data: "รอมอบหมาย",
    renderCell: () => {
      return (
        <TableCell>
          <div className="bg-[#FDF6B2] text-[#723B13] flex items-center justify-center">
            รอมอบหมาย
          </div>
        </TableCell>
      );
    },
  },
  {
    key: "",
    data: "#",
    renderCell: () => {
      return (
        <TableCell className="sticky right-0 bg-gray-50 z-10">
          <img
            src={IconSubMenu}
            width={22}
            height={22}
            alt="icon sub menu"
            className="mx-auto"
          />
        </TableCell>
      );
    },
  },
];

const AllTasksPage = () => {
  return (
    <>
      <SidebarLayout>
        <div className="px-8 py-4 rounded-lg">
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">ใบงานทั้งหมด</p>
            <div className="flex items-center gap-4">
              <Button variant={"outline"}>
                <img src={IconLink} width={20} height={20} alt="icon link" />
                <span>สร้างลิงค์ใบงาน</span>
              </Button>
              <Button variant={"outline"}>
                <img
                  src={IconPencil}
                  width={20}
                  height={20}
                  alt="icon pencil"
                />

                <span>สร้างใบงานใหม่</span>
              </Button>
            </div>
          </div>
          <div className="bg-white p-4 mt-4">
            <div className="grid grid-cols-6 gap-3 mb-5">
              <CustomInputIcon
                iconLeft={IconSearch}
                name="numberTask"
                placeholder="ค้นหาเลขที่ใบงาน"
              />
              <CustomInputIcon
                iconLeft={IconSearch}
                name="nameCustomer"
                placeholder="ชื่อลูกค้า"
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
                <Button className="w-full" variant={"outline"}>
                  ล้าง
                </Button>
                <Button className="w-full">ค้นหา</Button>
              </div>
            </div>
            <div className="w-[79vw]">
              <CustomTable
                width={1400}
                bodyData={data}
                headerData={HeaderTableAllTask}
              />
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default AllTasksPage;
