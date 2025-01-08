import SidebarLayout from "../sidebar-layout";
import { CustomTable } from "../components";
import { Button } from "@/components/ui/button";
import IconLink from "@/assets/icons/icon-link.png";
import IconPencil from "@/assets/icons/icon-pencil.png";

const AllTasksPage = () => {
  return (
    <>
      <SidebarLayout>
        <div className="px-8 py-4 rounded-lg">
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">ใบงานทั้งหมด</p>
            <div className="flex items-center gap-4">
              <Button className="bg-white border border-[#E5E7EB] text-black">
                <img src={IconLink} width={20} height={20} alt="icon link" />
                <span>สร้างลิงค์ใบงาน</span>
              </Button>
              <Button className="bg-white border border-[#E5E7EB] text-black">
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
          <div className="bg-white p-3 mt-4">
            <CustomTable />
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default AllTasksPage;
