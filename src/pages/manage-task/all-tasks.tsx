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
import {
  deletePartnerJobsService,
  getPartnerAllTaskService,
} from "@/services/task";
import { IJobData } from "@/services/interfaces";
import IconSubMenu from "@/assets/icons/icon-sub-menu.png";
import { statusTaskColor } from "../data/status-code";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  PRODUCR_NAME_OPTION,
  JOB_STATUS_OPTION,
  JOB_TYPE_OPTION,
} from "../data/option-data";
import IconSearchDetailUser from "@/assets/icons/icon-search-detail-user.png";
import IconEditUser from "@/assets/icons/icon-edit-user.png";
import IconDeleteUser from "@/assets/icons/icon-delete-user.png";
import IconWaringColor from "@/assets/icons/icon-warning-blue.png";
import { useToast } from "@/hooks/use-toast";
import { connect } from "react-redux";
import { IPageProps } from "@/pages/interface";
import {
  openModalWarning,
  closeModalWarning,
} from "@/redux/modal-warning/action";
import { Dispatch } from "redux";

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

type Inputs = {
  job_code: string;
  customer_name: string;
  product_name: string;
  job_type: string;
  job_status: string;
};

const AllTasksPage: React.FC<IPageProps> = (props) => {
  const { openModalWarning, closeModalWarning } = props;
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();

  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpenLink, setIsOpenLink] = useState<boolean>(false);
  const [jobsData, setJobsData] = useState<IJobData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobType, setJobType] = useState<string>("");
  const [jobStatus, setJobStatus] = useState<string>("");
  const [productName, setProductName] = useState<string>("");

  const itemPopOverData = [
    {
      label: "ดูรายละเอียดผู้ใช้งาน",
      onClick: (value?: string) => {
        if (value) {
          console.log("value ==> ", value);
        }
      },
      icon: IconSearchDetailUser,
    },
    {
      label: "แก้ไขผู้ใช้งาน",
      onClick: (value?: string) => {
        if (value) {
          console.log("value ==> ", value);
        }
      },
      icon: IconEditUser,
    },
    {
      label: "ลบข้อมูลผู้ใช้งาน",
      onClick: (data?: IJobData) => {
        if (data?.id) {
          console.log("value ==> ", data);
          confirmDeleteJob(data);
        }
      },
      icon: IconDeleteUser,
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
              data={row}
            />
          </div>
        );
      },
    },
  ];

  const getAllTaskData = async () => {
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
    getAllTaskData();
  };

  const handleSearch: SubmitHandler<Inputs> = (data) => {
    console.log("dataaaaaa > ", data);
    setCurrentPage(1);
    getAllTaskData();
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deletePartnerJobsService(id);
      toast({
        title: "สำเร็จแล้ว",
        description: "ลบข้อมูลใบงานเรียบร้อยแล้ว",
        variant: "success",
        className: "w-[300px] mx-auto",
      });
      getAllTaskData();
    } catch (error) {
      console.log("error : ", error);
      toast({
        title: "ไม่สำเร็จ",
        description: "ไม่สามารถลบใบงานนี้ได้เนื่องจากมีนัดหมายลูกค้าแล้ว",
        variant: "fail",
        className: "w-[328px] mx-auto",
      });
    }
  };

  const confirmDeleteJob = (data: IJobData) => {
    console.log("data user :", data);
    openModalWarning(
      IconWaringColor,
      "ยืนยีนลบใบงาน",
      `(ส่งใบงาน กับอุปกรณ์ติดตั้ง)`,
      "ยกเลิก",
      () => {
        closeModalWarning();
      },
      "ยืนยัน",
      () => {
        closeModalWarning();
        handleDeleteJob(data.id);
      }
    );
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
        </div>
      </SidebarLayout>
      <ModalInput isOpen={isOpenLink} setIsOpen={setIsOpenLink} />
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openModalWarning: (
    image: string | null,
    title: string,
    description: string,
    labelBtnFirst?: string,
    fnBtnFirst?: () => void | null,
    labelBtnSecond?: string,
    fnBtnSecond?: () => void | null
  ) =>
    openModalWarning(dispatch, {
      image,
      title,
      description,
      labelBtnFirst,
      fnBtnFirst,
      labelBtnSecond,
      fnBtnSecond,
    }),
  closeModalWarning: () => closeModalWarning(dispatch),
});

const mapStateToProps = () => ({});

const AllTasksPageWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllTasksPage);

export default AllTasksPageWithConnect;
