import React, { useState, useEffect } from "react";
import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import { useForm } from "react-hook-form";
import { IJobData } from "@/services/interfaces";
import { Button } from "@/components/ui/button";
import {
  CustomInputIcon,
  CustomTable,
  CustomSelect,
  DatePicker,
} from "../components";
import IconSearch from "@/assets/icons/icon-search.png";
import { JOB_STATUS_OPTION } from "../data/option-data";
import { getHistoryJobsService } from "@/services/task";
import dayjs from "dayjs";

const breadcrumbs = [
  {
    label: "จัดการงาน",
    link: "",
    icon: IconHome,
  },
  {
    label: "ประวัติใบงาน",
    link: "",
    icon: "",
  },
];

type Inputs = {
  job_code: string;
  customer_name: string;
  tech_name: string;
  job_date: Date | undefined;
  job_status: string;
};

const HistoryPage: React.FC = () => {
  const [jobsData, setJobsData] = useState<IJobData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobStatus, setJobStatus] = useState<string>("");
  const [jobDate, setJobDate] = useState<Date | undefined>();

  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();

  const HeaderTable = [
    {
      dataType: "DATA",
      title: "เลขที่ใบงาน",
      class: "w-[100px]",
      id: "job_code",
    },
    {
      dataType: "DATA",
      title: "ประเภทใบงาน",
      class: "w-[100px]",
      id: "job_type",
    },
    {
      dataType: "DATA",
      title: "สินค้า",
      class: "w-[100px]",
      id: "product_name",
    },
    {
      dataType: "DATA",
      title: "ชื่อลูกค้า",
      class: "w-[100px]",
      id: "customer_name",
    },
    {
      dataType: "DATA",
      title: "วันที่ให้บริการ",
      class: "w-[100px]",
      id: "job_date",
    },
    {
      dataType: "DATA",
      title: "ชื่อช่าง",
      class: "w-[100px]",
      id: "tech_name",
    },
    {
      dataType: "DATA",
      title: "ออกใบงานโดย",
      class: "w-[100px]",
      id: "created_by",
    },
    {
      dataType: "DATA",
      title: "ผู้ออกใบงาน",
      class: "w-[100px]",
      id: "created_by_name",
    },
  ];

  const getHistoryJobs = async () => {
    const { job_code, customer_name, tech_name, job_status, job_date } =
      getValues();
    const params = {
      job_code: job_code || "",
      customer_name: customer_name || "",
      tech_name: tech_name || "",
      job_date: job_date ? dayjs(job_date).format("YYYY/MM/DD") : "",
      job_status: job_status || "",
      skip: currentPage,
    };

    const result = await getHistoryJobsService(params);

    console.log("result : ", result);
    const data = result?.jobs;
    if (data?.length) {
      setJobsData(data);
      setTotal(result?.total_count);
    } else {
      setJobsData([]);
      setTotal(0);
    }
  };

  const handleClear = () => {
    setValue("job_code", "");
    setValue("customer_name", "");
    setValue("tech_name", "");
    setValue("job_date", undefined);
    setValue("job_status", "");
    setJobStatus("");
    setJobDate(undefined);
    setCurrentPage(1);
    getHistoryJobs();
  };

  const handleSearch = (data: Inputs) => {
    console.log("dataaaaaa > ", data);
    setJobDate(data.job_date);
    setCurrentPage(1);
    getHistoryJobs();
  };

  useEffect(() => {
    getHistoryJobs();
  }, [currentPage]);

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">ประวัติใบงาน</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          <form onSubmit={handleSubmit(handleSearch)}>
            <div className="grid grid-cols-6 gap-3 mb-5">
              <CustomInputIcon
                iconLeft={IconSearch}
                name="job_code"
                placeholder="ค้นหาเลขที่ใบงาน"
                classInput="text-[14px]"
                register={register("job_code")}
              />
              <CustomInputIcon
                iconLeft={IconSearch}
                name="customer_name"
                placeholder="ชื่อลูกค้า"
                classInput="text-[14px]"
                register={register("customer_name")}
              />
              <CustomInputIcon
                iconLeft={IconSearch}
                name="tech_name"
                placeholder="ชื่อช่าง"
                classInput="text-[14px]"
                register={register("tech_name")}
              />
              <DatePicker
                name="job_date"
                classInput="text-[14px]"
                register={register("job_date")}
                defaultValue={jobDate}
              />
              <CustomSelect
                name="job_status"
                placeholder="สถานะงาน"
                options={JOB_STATUS_OPTION}
                register={register("job_status")}
                value={jobStatus}
                setValue={setJobStatus}
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
              // widthMin={"full:w-[1510px] desktop:w-[1110px]"}
              // widthMax={"full:w-[1810px] desktop:w-[1350px]"}
              textNotFoundData="ไม่พบรายการใบงานทั้งหมด"
            />
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default HistoryPage;
