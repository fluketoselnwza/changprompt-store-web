import React, { useEffect, useState } from "react";
import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import { getAllTechService } from "@/services/tech";
import { IAllTechData } from "@/services/interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import IconSearch from "@/assets/icons/icon-search.png";
import {
  CustomInputIcon,
  CustomSelect,
  CustomTable,
  CustomPopover,
} from "../components";
import { Button } from "@/components/ui/button";
import { TECH_SKILL_OPTION } from "../data/option-data";
import IconSubMenu from "@/assets/icons/icon-sub-menu.png";
import { useNavigate } from "react-router";
import IconDeleteUser from "@/assets/icons/icon-delete-user.png";
import IconSearchDetailUser from "@/assets/icons/icon-search-detail-user.png";

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
  tech_skill: string;
};

const AllTechnicianPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobsData, setTechData] = useState<IAllTechData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();
  const [techSkill, setTechSkill] = useState<string>("");

  const itemPopOverData = [
    {
      label: "ดูข้อมูลช่าง",
      onClick: (data?: IAllTechData) => {
        if (data?.tech_id) {
          console.log("data ==> ", data);
          navigate(`/manage-tech/all-technician/get-tech/${data.tech_id}`);
        }
      },
      icon: IconSearchDetailUser,
    },

    {
      label: "ลบข้อมูลผู้ใช้งาน",
      onClick: (data?: IAllTechData) => {
        if (data?.tech_id) {
          console.log("value ==> ", data);
          // confirmDeleteJob(data);
        }
      },
      icon: IconDeleteUser,
    },
  ];

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
      id: "nick_name",
    },
    {
      dataType: "DATA",
      title: "เบอร์โทรศัพท์",
      class: "w-[100px]",
      id: "mobile_number",
    },
    {
      dataType: "DATA",
      title: "ทักษะช่าง",
      class: "w-[100px]",
      id: "tech_skill",
    },
    {
      dataType: "DATA",
      title: "เข้าร่วมร้านค้า",
      class: "w-[100px]",
      id: "register_date",
    },
    {
      dataType: "DATA",
      title: "อนุมัติโดย",
      class: "w-[100px]",
      id: "approved_by",
    },
    {
      dataType: "SUB_MENU",
      title: "",
      class: "w-[40px]",
      id: "",
      renderCell: ({ row }: { row: IAllTechData }) => {
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

  const getAllTech = async () => {
    const { tech_code, tech_name, tech_skill } = getValues();
    const params = {
      tech_code: tech_code ?? "",
      tech_name: tech_name ?? "",
      tech_skill: tech_skill ?? "",
      skip: currentPage,
    };

    const result = await getAllTechService(params);

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
    getAllTech();
  }, [currentPage]);

  const handleSearch: SubmitHandler<Inputs> = (data) => {
    console.log("dataaaaaa > ", data);
    setCurrentPage(1);
    getAllTech();
  };

  const handleClear = () => {
    setValue("tech_code", "");
    setValue("tech_name", "");
    setValue("tech_skill", "");
    setTechSkill("");
    setCurrentPage(1);
    getAllTech();
  };

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <p className="font-bold text-[16px]">ช่างทั้งหมด ({total} คน)</p>
        </div>
        <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
          <form onSubmit={handleSubmit(handleSearch)}>
            <div className="grid grid-cols-4 gap-3 mb-5">
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
              <CustomSelect
                name="tech_skill"
                placeholder="ทักษะช่าง"
                options={TECH_SKILL_OPTION}
                register={register("tech_skill")}
                value={techSkill}
                setValue={setTechSkill}
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
              textNotFoundData="ไม่พบรายการช่างทั้งหมด"
            />
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default AllTechnicianPage;
