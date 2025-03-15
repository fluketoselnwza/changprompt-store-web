import React, { useEffect, useState } from "react";
import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import { getTechHistoryJobsService } from "@/services/tech";
import { IJobData } from "@/services/interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import IconSearch from "@/assets/icons/icon-search.png";
import { CustomInputIcon, CustomTable, DatePicker } from "../components";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

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

type Inputs = {
  tech_code: string;
  tech_name: string;
  customer_name: string;
  job_created_date: Date | undefined;
  service_date: Date | undefined;
};

const HistoryTechnicianPage: React.FC = () => {
  const [jobsData, setTechData] = useState<IJobData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();
  const [servicerDate, setServicerDate] = useState<Date | undefined>();
  const [jobCreatedDate, setJobCreatedDate] = useState<Date | undefined>();

  const HeaderTable = [
    {
      dataType: "DATA",
      title: "เลขที่ใบงาน",
      class: "w-[100px]",
      id: "job_code",
    },
    {
      dataType: "DATA",
      title: "หมวดหมู่งาน",
      class: "w-[100px]",
      id: "job_type",
    },
    {
      dataType: "DATA",
      title: "สินค้า",
      class: "w-[100px]",
      id: "product",
    },
    {
      dataType: "DATA",
      title: "ชื่อลูกค้า",
      class: "w-[100px]",
      id: "customer_name",
    },
    {
      dataType: "DATA",
      title: "ช่าง",
      class: "w-[100px]",
      id: "tech_name",
    },
    {
      dataType: "DATA",
      title: "วันที่สร้าง",
      class: "w-[100px]",
      id: "create_date",
    },
    {
      dataType: "DATA",
      title: "วันที่ให้บริการสำเร็จ",
      class: "w-[100px]",
      id: "job_date",
    },
    {
      dataType: "DATA",
      title: "สร้างใบงานโดย",
      class: "w-[100px]",
      id: "create_by",
    },
    {
      dataType: "DATA",
      title: "ผู้ออกใบงาน",
      class: "w-[100px]",
      id: "work_by",
    },
  ];

  const getHistoryTech = async () => {
    const {
      tech_code,
      tech_name,
      customer_name,
      job_created_date,
      service_date,
    } = getValues();
    const params = {
      tech_code,
      tech_name,
      customer_name,
      job_created_date: job_created_date
        ? dayjs(job_created_date).format("YYYY-MM-DD")
        : "",
      service_date: service_date
        ? dayjs(service_date).format("YYYY-MM-DD")
        : "",
      skip: currentPage,
    };

    const result = await getTechHistoryJobsService(params);

    console.log("result => ", result);
    const data = result?.techs;
    if (data?.length) {
      setTechData(data);
      setTotal(result?.total_count);
    } else {
      setTechData([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    getHistoryTech();
  }, [currentPage]);

  const handleSearch: SubmitHandler<Inputs> = (data) => {
    console.log("dataaaaaa > ", data);
    setServicerDate(data.service_date);
    setJobCreatedDate(data.job_created_date);
    setJobCreatedDate(undefined);
    setCurrentPage(1);
    getHistoryTech();
  };

  const handleClear = () => {
    setValue("tech_code", "");
    setValue("tech_name", "");
    setValue("customer_name", "");
    setValue("job_created_date", undefined);
    setValue("service_date", undefined);
    setServicerDate(undefined);
    setJobCreatedDate(undefined);
    setCurrentPage(1);
    getHistoryTech();
  };

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">ช่างทั้งหมด ({total} คน)</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          <form onSubmit={handleSubmit(handleSearch)}>
            <div className="grid grid-cols-6 gap-3 mb-5">
              <CustomInputIcon
                iconLeft={IconSearch}
                name="tech_code"
                placeholder="เลขที่ใบงาน"
                classInput="text-[14px]"
                register={register("tech_code")}
              />
              <CustomInputIcon
                iconLeft={IconSearch}
                name="tech_name"
                placeholder="ชื่อช่าง"
                classInput="text-[14px]"
                register={register("tech_name")}
              />
              <CustomInputIcon
                iconLeft={IconSearch}
                name="customer_name"
                placeholder="ชื่อลูกค้า"
                classInput="text-[14px]"
                register={register("customer_name")}
              />
              <DatePicker
                name="job_created_date"
                register={register("job_created_date")}
                defaultValue={jobCreatedDate}
                placeholder="วันที่สร้างใบงาน"
              />
              <DatePicker
                name="service_date"
                register={register("service_date")}
                defaultValue={servicerDate}
                placeholder="วันที่ให้บริการสำเร็จ"
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
              bodyData={jobsData}
              headerData={HeaderTable}
              total={total}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              textNotFoundData="ไม่พบรายการประวัติการทำงานทช่าง"
            />
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default HistoryTechnicianPage;
