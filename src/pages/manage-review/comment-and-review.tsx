import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import { CustomInputIcon, DatePicker, CustomTable } from "../components";
import IconSearch from "@/assets/icons/icon-search.png";
import { Button } from "@/components/ui/button";
import { HeaderTableReview } from "../data/headerTable";

const breadcrumbs = [
  {
    label: "จัดการรีวิว",
    link: "",
    icon: IconHome,
  },
  {
    label: "ความคิดเห็นและรีวิว",
    link: "",
    icon: "",
  },
];

const CommentAndReviewPage = () => {
  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">ความคิดเห็นและรีวิว</p>
          </div>
          <div className="bg-white p-[16px] mt-[24px] rounded-[8px]">
            <div className="grid grid-cols-5 gap-3 mb-5">
              <CustomInputIcon
                iconLeft={IconSearch}
                name="numberTask"
                placeholder="เลขที่ใบงาน"
                classInput="text-[14px]"
                classBorderInput="rounded-[8px]"
              />
              <CustomInputIcon
                iconLeft={IconSearch}
                name="nameCustomer"
                placeholder="ชื่อลูกค้า"
                classInput="text-[14px]"
                classBorderInput="rounded-[8px]"
              />
              <CustomInputIcon
                iconLeft={IconSearch}
                name="nameTechnician"
                placeholder="ชื่อช่าง"
                classInput="text-[14px]"
                classBorderInput="rounded-[8px]"
              />
              <DatePicker
                name="servicer_date"
                className="h-[42px] rounded-[8px]"
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
              <CustomTable
                bodyData={[]}
                headerData={HeaderTableReview}
                widthMin={"w-[1110px]"}
                widthMax={"w-[1350px]"}
              />
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default CommentAndReviewPage;
