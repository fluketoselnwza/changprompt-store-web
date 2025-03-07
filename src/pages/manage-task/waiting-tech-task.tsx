import React, { useState, useEffect } from "react";
import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { getTechWaitingService } from "@/services/task";
import { IJobData } from "@/services/interfaces";
import { Button } from "@/components/ui/button";
import {
  CustomInputIcon,
  CustomTable,
  CustomSelect,
  CustomPopover,
} from "../components";
import IconSearch from "@/assets/icons/icon-search.png";
import IconUserPlus from "@/assets/icons/icon-user-plus.png";
import {
  PRODUCR_NAME_OPTION,
  JOB_STATUS_OPTION,
  JOB_TYPE_OPTION,
} from "../data/option-data";
import IconSubMenu from "@/assets/icons/icon-sub-menu.png";

const breadcrumbs = [
  {
    label: "จัดการงาน",
    link: "",
    icon: IconHome,
  },
  {
    label: "งานรอช่างกดรับ",
    link: "",
    icon: "",
  },
];

type Inputs = {
  job_code: string;
  customer_name: string;
  product_name: string;
  job_type: string;
  job_status: string;
};

const WaitingTechTaskPage: React.FC = () => {
  const [jobsData, setJobsData] = useState<IJobData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobType, setJobType] = useState<string>("");
  const [jobStatus, setJobStatus] = useState<string>("");
  const [productName, setProductName] = useState<string>("");

  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();

  const itemPopOverData = [
    {
      label: "เปลี่ยนช่าง",
      onClick: (data?: IJobData) => {
        if (data?.id) {
          console.log("data ==> ", data);
        }
      },
      icon: IconUserPlus,
    },
  ];

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
      title: "ชื่อลูกค้า",
      class: "w-[100px]",
      id: "customer_name",
    },
    {
      dataType: "DATA",
      title: "ชื่อช่าง",
      class: "w-[100px]",
      id: "technician_name",
    },
    {
      dataType: "DATA",
      title: "เบอร์โทรช่าง",
      class: "w-[100px]",
      id: "technician_mobile",
    },
    {
      dataType: "DATA",
      title: "ออกใบงานโดย",
      class: "w-[100px]",
      id: "create_by",
    },
    {
      dataType: "SUB_MENU",
      title: "",
      class: "w-[40px]",
      id: "",
      renderCell: ({ row }: { row: IJobData }) => {
        return (
          <div className="flex items-center justify-center">
            <CustomPopover
              icon={IconSubMenu}
              classPopOver="w-[224px]"
              itemPopOver={itemPopOverData}
              data={row}
            />
          </div>
        );
      },
    },
  ];

  const getTechWaiting = async () => {
    const { job_code, customer_name, product_name, job_status, job_type } =
      getValues();
    const params = {
      job_code: job_code || "",
      customer_name: customer_name || "",
      product_name: product_name || "",
      job_type: job_type || "",
      job_status: job_status || "",
      skip: currentPage,
    };

    const result = await getTechWaitingService(params);

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
    setValue("product_name", "");
    setValue("job_type", "");
    setValue("job_status", "");
    setProductName("");
    setJobType("");
    setJobStatus("");
    setCurrentPage(1);
    getTechWaiting();
  };

  const handleSearch: SubmitHandler<Inputs> = (data) => {
    console.log("dataaaaaa > ", data);
    setCurrentPage(1);
    getTechWaiting();
  };

  useEffect(() => {
    getTechWaiting();
  }, [currentPage]);

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">งานรอช่างกดรับ</p>
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
              <CustomSelect
                name="product_name"
                placeholder="เลืกสินค้า"
                options={PRODUCR_NAME_OPTION}
                register={register("product_name")}
                value={productName}
                setValue={setProductName}
              />
              <CustomSelect
                name="job_type"
                placeholder="หมวดหมู่งาน"
                options={JOB_TYPE_OPTION}
                register={register("job_type")}
                value={jobType}
                setValue={setJobType}
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

export default WaitingTechTaskPage;
