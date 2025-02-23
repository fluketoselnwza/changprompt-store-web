import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import { CustomInputIcon, DatePicker, CustomTable } from "../components";
import IconSearch from "@/assets/icons/icon-search.png";
import { Button } from "@/components/ui/button";
// import { HeaderTableReview } from "../data/headerTable";
import { useEffect, useState } from "react";
import { getPartnerRatingService } from "@/services/rating";
import { IRatingsData } from "@/services/interfaces";

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

const HeaderTableReview = [
  {
    dataType: "DATA",
    title: "เลขที่ใบงาน",
    class: "w-[100px]",
    id: "job_code",
  },
  {
    dataType: "DATA",
    title: "ความคิดเห็น",
    class: "w-[160px]",
    id: "rating_remark",
  },
  {
    dataType: "RENDER_CELL",
    title: "เรตติ้ง",
    class: "w-[80px]",
    id: "rating_point",
    renderCell: ({ row }) => {
      console.log("row ====>", row);
      return (
        <div className="bg-[#FDF6B2] text-[#723B13] flex justify-center w-[80px] rounded-md">
          รอมอบหมาย
        </div>
      );
    },
  },
  {
    dataType: "DATA",
    title: "ชื่อลูกค้า",
    class: "w-[80px]",
    id: "customer_name",
  },
  {
    dataType: "DATA",
    title: "ชื่อช่างผู้ให้บริการ",
    class: "w-[80px]",
    id: "tech_name",
  },
];

const CommentAndReviewPage = () => {
  const [ratingData, setRatingData] = useState<IRatingsData[]>([]);
  const [totalRating, setTotalRating] = useState<number>(0);

  const getRatingData = async () => {
    const params = {
      job_code: "",
      customer_name: "",
      tech_name: "",
      job_started_date: "",
      skip: 1,
    };
    const result = await getPartnerRatingService(params);

    console.log("result ===> ", result);

    const ratingData = result?.ratings;

    if (ratingData?.length) {
      setRatingData(ratingData);
      setTotalRating(result?.total_count);
    } else {
      setRatingData([]);
      setTotalRating(0);
    }
  };

  useEffect(() => {
    getRatingData();
  }, []);

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
                bodyData={ratingData}
                headerData={HeaderTableReview}
                total={totalRating}
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
