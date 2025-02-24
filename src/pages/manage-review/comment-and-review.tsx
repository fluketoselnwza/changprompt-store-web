import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import {
  CustomInputIcon,
  DatePicker,
  CustomTable,
  Rating,
} from "../components";
import IconSearch from "@/assets/icons/icon-search.png";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getPartnerRatingService } from "@/services/rating";
import { IRatingsData } from "@/services/interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";

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
    renderCell: ({ row }: { row: IRatingsData }) => {
      return (
        <div className="w-[80px]">
          <Rating value={row.rating_point} width={27} />
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

type Inputs = {
  numberTask: string;
  nameCustomer: string;
  nameTechnician: string;
  servicerDate: Date | undefined;
};

const CommentAndReviewPage = () => {
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();

  const [ratingData, setRatingData] = useState<IRatingsData[]>([]);
  const [totalRating, setTotalRating] = useState<number>(0);
  const [servicerDate, setServicerDate] = useState<Date | undefined>();

  const getRatingData = async () => {
    const { nameCustomer, nameTechnician, numberTask, servicerDate } =
      getValues();

    const params = {
      job_code: numberTask || "",
      customer_name: nameCustomer || "",
      tech_name: nameTechnician || "",
      job_started_date: servicerDate
        ? dayjs(servicerDate).format("YYYY-MM-DD")
        : "",
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

  const handleClear = () => {
    setValue("nameCustomer", "");
    setValue("nameTechnician", "");
    setValue("numberTask", "");
    setValue("servicerDate", undefined);
    setServicerDate(undefined);
    getRatingData();
  };

  const handleSearch: SubmitHandler<Inputs> = (data) => {
    setServicerDate(data.servicerDate);
    getRatingData();
  };

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">ความคิดเห็นและรีวิว</p>
          </div>
          <div className="bg-white p-[16px] mt-[24px] rounded-[8px]">
            <form onSubmit={handleSubmit(handleSearch)}>
              <div className="grid grid-cols-5 gap-3 mb-5">
                <CustomInputIcon
                  iconLeft={IconSearch}
                  name="numberTask"
                  placeholder="เลขที่ใบงาน"
                  classInput="text-[14px]"
                  classBorderInput="rounded-[8px]"
                  register={register("numberTask")}
                />
                <CustomInputIcon
                  iconLeft={IconSearch}
                  name="nameCustomer"
                  placeholder="ชื่อลูกค้า"
                  classInput="text-[14px]"
                  classBorderInput="rounded-[8px]"
                  register={register("nameCustomer")}
                />
                <CustomInputIcon
                  iconLeft={IconSearch}
                  name="nameTechnician"
                  placeholder="ชื่อช่าง"
                  classInput="text-[14px]"
                  classBorderInput="rounded-[8px]"
                  register={register("nameTechnician")}
                />
                <DatePicker
                  name="servicerDate"
                  className="h-[42px] rounded-[8px]"
                  register={register("servicerDate")}
                  defaultValue={servicerDate}
                  placeholder="วันที่ให้บริการ"
                />
                <div className="flex gap-3">
                  <Button
                    className="w-full text-[16px] h-[42px] rounded-lg"
                    variant={"outline"}
                    type="button"
                    onClick={handleClear}
                  >
                    ล้าง
                  </Button>
                  <Button className="w-full text-[16px] h-[42px] rounded-lg">
                    ค้นหา
                  </Button>
                </div>
              </div>
            </form>
            <div>
              <CustomTable
                bodyData={ratingData}
                headerData={HeaderTableReview}
                total={totalRating}
                // widthMin={"full:w-[1510px] desktop:w-[1110px]"}
                // widthMax={"full:w-[1810px] desktop:w-[1350px]"}
                textNotFoundData="ไม่พบรายการความคิดเห็นและรีวิว"
              />
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default CommentAndReviewPage;
