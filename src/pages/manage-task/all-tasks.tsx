import SidebarLayout from "../sidebar-layout";
import {
  CustomInputIcon,
  CustomTable,
  CustomSelect,
  ModalInput,
  CustomPopover,
} from "../components";
import { Button } from "@/components/ui/button";
import IconLink from "@/assets/icons/icon-link.png";
import IconPencil from "@/assets/icons/icon-pencil.png";
import IconSearch from "@/assets/icons/icon-search.png";
// import { HeaderTableAllTask } from "../data/headerTable";
// import IconSubMenu from "@/assets/icons/icon-sub-menu.png";
// import { TableCell } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import IconHome from "@/assets/icons/icon-home.png";
import { getPartnerAllTaskService } from "@/services/task";
import { IJobData } from "@/services/interfaces";
import IconSubMenu from "@/assets/icons/icon-sub-menu.png";
import { statusTaskColor } from "../data/status-code";

const breadcrumbs = [
  {
    label: "จัดการงาน",
    link: "",
    icon: IconHome,
  },
  {
    label: "ใบงานทั้งหมด",
    link: "",
    icon: "",
  },
];

const AllTasksPage = () => {
  const navigate = useNavigate();
  const [isOpenLink, setIsOpenLink] = useState<boolean>(false);
  const [jobsData, setJobsData] = useState<IJobData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemPopOverData = [
    {
      label: "ดูรายละเอียดผู้ใช้งาน",
      onClick: (value?: string) => {
        if (value) {
          console.log("value : ", value);
        }
      },
      icon: "",
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
      title: "หมวดหมู่งาน",
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
      title: "ช่าง",
      class: "w-[100px]",
      id: "technician_name",
    },
    {
      dataType: "DATA",
      title: "วันที่สร้าง",
      class: "w-[100px]",
      id: "created_at",
    },
    {
      dataType: "DATA",
      title: "ผู้ออกใบงาน",
      class: "w-[100px]",
      id: "create_by",
    },
    {
      dataType: "RENDER_CELL",
      title: "สถานะงาน",
      class: "w-[100px]",
      id: "job_status",
      renderCell: ({ row }: { row: IJobData }) => {
        const { color, bgColor } = statusTaskColor(row.job_status);
        console.log("bgColor ::: ", bgColor);
        return (
          <div className="w-[110px]">
            <div
              className={`h-[22px] text-[12px] rounded-md flex justify-center items-center`}
              style={{ color: color, backgroundColor: bgColor }}
            >
              {row.job_status}
            </div>
          </div>
        );
      },
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
              rowId={row.id}
            />
          </div>
        );
      },
    },
  ];

  const getAllTaskData = async () => {
    const params = {
      job_code: "",
      customer_name: "",
      product_name: "",
      job_type: "",
      job_status: "",
      skip: currentPage,
    };

    const result = await getPartnerAllTaskService(params);

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

  useEffect(() => {
    getAllTaskData();
  }, [currentPage]);

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">ใบงานทั้งหมด</p>
            <div className="flex items-center gap-4">
              <Button variant={"outline"} onClick={() => setIsOpenLink(true)}>
                <img src={IconLink} width={20} height={20} alt="icon link" />
                <span className="text-[16px]">สร้างลิงค์ใบงาน</span>
              </Button>
              <Button
                variant={"outline"}
                onClick={() => navigate("/manage-task/all-tasks/new-task")}
              >
                <img
                  src={IconPencil}
                  alt="icon pencil"
                  className="w-[20px] h-[20px]"
                />
                <span className="text-[16px]">สร้างใบงานใหม่</span>
              </Button>
            </div>
          </div>
          <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
            <div className="grid grid-cols-6 gap-3 mb-5">
              <CustomInputIcon
                iconLeft={IconSearch}
                name="numberTask"
                placeholder="ค้นหาเลขที่ใบงาน"
                classInput="text-[14px]"
              />
              <CustomInputIcon
                iconLeft={IconSearch}
                name="nameCustomer"
                placeholder="ชื่อลูกค้า"
                classInput="text-[14px]"
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
        </div>
      </SidebarLayout>
      <ModalInput isOpen={isOpenLink} setIsOpen={setIsOpenLink} />
    </>
  );
};

export default AllTasksPage;
