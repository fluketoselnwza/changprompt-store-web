import React, { useEffect, useState } from "react";
import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import { getTechBlackListService } from "@/services/tech";
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
    label: "ปิดการใช้งานช่าง (Blacklist)",
    link: "",
    icon: "",
  },
];

type Inputs = {
  tech_code: string;
  tech_name: string;
  approved_date: Date | undefined;
  inactivated_date: Date | undefined;
};

const BlacklistTechnicianPage: React.FC = () => {
  const [jobsData, setTechData] = useState<IJobData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();
  const [approvedDate, setApprovedDate] = useState<Date | undefined>();
  const [inactivatedDate, setInactivatedDate] = useState<Date | undefined>();

  const HeaderTable = [
    {
      dataType: "DATA",
      title: "รหัสช่าง",
      class: "w-[100px]",
      id: "tech_code",
    },
    {
      dataType: "DATA",
      title: "ชื่อ - นามสกุล",
      class: "w-[100px]",
      id: "full_name",
    },
    {
      dataType: "DATA",
      title: "ชื่อเล่น (ชื่อผู้ใช้)",
      class: "w-[100px]",
      id: "nickname",
    },
    {
      dataType: "DATA",
      title: "เบอร์โทรศัพท์",
      class: "w-[100px]",
      id: "phone_number",
    },
    {
      dataType: "DATA",
      title: "ทักษะช่าง",
      class: "w-[100px]",
      id: "tech_skill",
    },
    {
      dataType: "DATA",
      title: "เป็นสมาชิกเมื่อ",
      class: "w-[100px]",
      id: "register_date",
    },
    {
      dataType: "DATA",
      title: "อนุมัติโดย",
      class: "w-[100px]",
      id: "approve_date",
    },
    {
      dataType: "DATA",
      title: "วันที่ปิดใช้งานล่าสุด",
      class: "w-[100px]",
      id: "close_date",
    },
  ];

  const getBlacklistTech = async () => {
    const { tech_code, tech_name, inactivated_date, approved_date } =
      getValues();
    const params = {
      tech_code,
      tech_name,
      approved_date: approved_date
        ? dayjs(approved_date).format("YYYY-MM-DD")
        : "",
      inactivated_date: inactivated_date
        ? dayjs(inactivated_date).format("YYYY-MM-DD")
        : "",
      skip: currentPage,
    };

    const result = await getTechBlackListService(params);

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
    getBlacklistTech();
  }, [currentPage]);

  const handleSearch: SubmitHandler<Inputs> = (data) => {
    console.log("dataaaaaa > ", data);
    setApprovedDate(data.approved_date);
    setInactivatedDate(data.inactivated_date);
    setCurrentPage(1);
    getBlacklistTech();
  };

  const handleClear = () => {
    setValue("tech_code", "");
    setValue("tech_name", "");
    setValue("approved_date", undefined);
    setValue("inactivated_date", undefined);
    setApprovedDate(undefined);
    setInactivatedDate(undefined);
    setCurrentPage(1);
    getBlacklistTech();
  };

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">ปิดการใช้งานช่าง (Blacklist)</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          <form onSubmit={handleSubmit(handleSearch)}>
            <div className="grid grid-cols-5 gap-3 mb-5">
              <CustomInputIcon
                iconLeft={IconSearch}
                name="tech_code"
                placeholder="ค้นหารหัสช่าง"
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
              <DatePicker
                name="approved_date"
                register={register("approved_date")}
                defaultValue={approvedDate}
                placeholder="วันที่อนุมัติเป็นสมาชิก"
              />
              <DatePicker
                name="inactivated_date"
                register={register("inactivated_date")}
                defaultValue={inactivatedDate}
                placeholder="วันที่ปิดใช้งาน"
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
              textNotFoundData="ไม่พบรายการปิดการใช้งานช่าง"
            />
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default BlacklistTechnicianPage;
