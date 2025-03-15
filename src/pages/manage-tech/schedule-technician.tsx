import React, { useEffect, useState } from "react";
import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import { getTechJobScheduleService } from "@/services/tech";
import { IJobData } from "@/services/interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import IconSearch from "@/assets/icons/icon-search.png";
import {
  CustomInputIcon,
  CustomSelect,
  CustomTable,
  DatePicker,
} from "../components";
import { Button } from "@/components/ui/button";
import { JOB_TYPE_OPTION } from "../data/option-data";
import dayjs from "dayjs";

const breadcrumbs = [
  {
    label: "จัดการงาน",
    link: "",
    icon: IconHome,
  },
  {
    label: "ตารางงานช่าง",
    link: "",
    icon: "",
  },
];

type Inputs = {
  job_code: string;
  customer_name: string;
  job_type: string;
  appointment_date: Date | undefined;
};

const ScheduleTechnicianPage: React.FC = () => {
  const [jobsData, setTechData] = useState<IJobData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();
  const [jobType, setJobType] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>();

  const HeaderTable = [
    {
      dataType: "DATA",
      title: "เลขที่ใบงาน",
      class: "w-[100px]",
      id: "job_code",
    },
    {
      dataType: "DATA",
      title: "วันเวลานัด",
      class: "w-[100px]",
      id: "appointment",
    },
    {
      dataType: "DATA",
      title: "ชื่อช่าง",
      class: "w-[100px]",
      id: "tech_name",
    },
    {
      dataType: "DATA",
      title: "บริการ",
      class: "w-[100px]",
      id: "service",
    },
    {
      dataType: "DATA",
      title: "ชื่อลูกค้า",
      class: "w-[100px]",
      id: "customer_name",
    },
    {
      dataType: "DATA",
      title: "เบอร์โทรลูกค้า",
      class: "w-[100px]",
      id: "phone_number",
    },
    {
      dataType: "DATA",
      title: "สถานที่",
      class: "w-[100px]",
      id: "location",
    },
  ];

  const getSchedule = async () => {
    const { job_code, job_type, customer_name, appointment_date } = getValues();
    const params = {
      job_code: job_code ?? "",
      job_type: job_type ?? "",
      customer_name: customer_name ?? "",
      appointment_date: appointment_date
        ? dayjs(appointment_date).format("YYYY-MM-DD")
        : "",
      skip: currentPage,
    };

    const result = await getTechJobScheduleService(params);

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
    getSchedule();
  }, [currentPage]);

  const handleSearch: SubmitHandler<Inputs> = (data) => {
    console.log("dataaaaaa > ", data);
    setCurrentPage(1);
    getSchedule();
  };

  const handleClear = () => {
    setValue("job_code", "");
    setValue("customer_name", "");
    setValue("appointment_date", undefined);
    setValue("job_type", "");
    setAppointmentDate(undefined);
    setJobType("");
    setCurrentPage(1);
    getSchedule();
  };

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">ตารางงานช่าง</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          <form onSubmit={handleSubmit(handleSearch)}>
            <div className="grid grid-cols-5 gap-3 mb-5">
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
              <DatePicker
                name="appointment_date"
                register={register("appointment_date")}
                defaultValue={appointmentDate}
                placeholder="วันที่นัด"
              />
              <CustomSelect
                name="job_type"
                placeholder="ประเภทงาน"
                options={JOB_TYPE_OPTION}
                register={register("job_type")}
                value={jobType}
                setValue={setJobType}
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
              textNotFoundData="ไม่พบรายการตารางงานช่างทั้งหมด"
              widthMin={"full:w-[1610px] desktop:w-[1210px]"}
              widthMax={"full:w-[1910px] desktop:w-[1450px]"}
            />
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default ScheduleTechnicianPage;
