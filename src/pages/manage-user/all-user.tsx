import React, { useState, useEffect } from "react";
import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import IconAddUser from "@/assets/icons/icon-add-user.png";
import { Button } from "@/components/ui/button";
import { CustomInputIcon, CustomSelect, CustomTable } from "../components";
import { useForm, SubmitHandler } from "react-hook-form";
import IconSearch from "@/assets/icons/icon-search.png";
import { ROLE_CODE } from "../data/role-code";
import { getPartnerUserService } from "@/services/user";
import { IUserData } from "@/services/interfaces";
import IconSubMenu from "@/assets/icons/icon-sub-menu.png";

const breadcrumbs = [
  {
    label: "จัดการรีวิว",
    link: "",
    icon: IconHome,
  },
  {
    label: "ข้อมูลผู้ใช้งานทั้งหมด",
    link: "",
    icon: "",
  },
];

const HeaderTable = [
  {
    dataType: "DATA",
    title: "รหัสพนักงาน",
    class: "w-[100px]",
    id: "emp_code",
  },
  {
    dataType: "DATA",
    title: "ชื่อ - นามสกุล",
    class: "w-[100px]",
    id: "full_name",
  },
  {
    dataType: "DATA",
    title: "ชื่อเล่น",
    class: "w-[80px]",
    id: "nick_name",
  },
  {
    dataType: "DATA",
    title: "รหัสบัตรประจำตัวประชาชน",
    class: "w-[100px]",
    id: "nation_id",
  },
  {
    dataType: "DATA",
    title: "เบอร์โทรศัพท์",
    class: "w-[100px]",
    id: "mobile_phone",
  },
  {
    dataType: "DATA",
    title: "อีเมล",
    class: "w-[100px]",
    id: "email",
  },
  {
    dataType: "DATA",
    title: "ตำแหน่ง",
    class: "w-[100px]",
    id: "role_code",
  },
  {
    dataType: "SUB_MENU",
    title: "",
    class: "w-[40px]",
    id: "",
    renderCell: () => {
      return (
        <div>
          <img
            src={IconSubMenu}
            className="w-[20px] h-[20px] mx-auto"
            alt="icon sub menu"
          />
        </div>
      );
    },
  },
];

type Inputs = {
  role_code: string;
  emp_code: string;
  emp_name: string;
  nickname: string;
};

const ManageAllUserPage: React.FC = () => {
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();
  const [roleCode, setRoleCode] = useState<string>("");
  const [userData, setUserData] = useState<IUserData[]>([]);
  const [totalUser, setTotalUser] = useState<number>(0);

  const getAllUserData = async () => {
    const { role_code, emp_code, emp_name, nickname } = getValues();

    console.log("role_code ===> ", role_code);

    const params = {
      role_code: role_code || "",
      emp_code: emp_code || "",
      emp_name: emp_name || "",
      nickname: nickname || "",
      skip: 1,
    };

    const result = await getPartnerUserService(params);

    console.log("result ===> ", result);

    const usersData = result?.users;
    if (usersData?.length) {
      setUserData(usersData);
      setTotalUser(result?.total_count);
    } else {
      setUserData([]);
      setTotalUser(0);
    }
  };

  const handleSearch: SubmitHandler<Inputs> = (data) => {
    console.log("dataaaaaa > ", data);
    getAllUserData();
  };

  const handleClear = () => {
    setValue("emp_code", "");
    setValue("emp_name", "");
    setValue("role_code", "");
    setValue("nickname", "");
    setRoleCode("");
    getAllUserData();
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">ข้อมูลผู้ใช้งานทั้งหมด</p>
            <Button variant={"outline"} className="h-[48px]">
              <img
                src={IconAddUser}
                className="w-[20px] h-[20px]"
                alt="icon add user"
              />
              <span className="text-[16px]">เพิ่มผู้ใช้งาน</span>
            </Button>
          </div>
          <div className="bg-white p-[16px] mt-[24px] rounded-[8px]">
            <form onSubmit={handleSubmit(handleSearch)}>
              <div className="grid grid-cols-5 gap-3 mb-5">
                <CustomInputIcon
                  iconLeft={IconSearch}
                  name="emp_code"
                  placeholder="รหัสพนักงาน"
                  classInput="text-[14px]"
                  register={register("emp_code")}
                />
                <CustomInputIcon
                  iconLeft={IconSearch}
                  name="emp_name"
                  placeholder="ชื่อ นามสกุล"
                  classInput="text-[14px]"
                  register={register("emp_name")}
                />
                <CustomInputIcon
                  iconLeft={IconSearch}
                  name="nickname"
                  placeholder="ชื่อเล่น"
                  classInput="text-[14px]"
                  register={register("nickname")}
                />
                <CustomSelect
                  name="role_code"
                  placeholder="ตำแหน่ง"
                  options={ROLE_CODE}
                  register={register("role_code")}
                  value={roleCode}
                  setValue={setRoleCode}
                />

                <div className="flex gap-3">
                  <Button
                    className="w-full text-[16px]"
                    variant={"outline"}
                    type="button"
                    onClick={handleClear}
                  >
                    ล้าง
                  </Button>
                  <Button className="w-full text-[16px]">ค้นหา</Button>
                </div>
              </div>
            </form>
            <div>
              <CustomTable
                bodyData={userData}
                headerData={HeaderTable}
                total={totalUser}
                // widthMin={"full:w-[1510px] desktop:w-[1110px]"}
                // widthMax={"full:w-[1810px] desktop:w-[1350px]"}
                textNotFoundData="ไม่พบรายการข้อมูลผู้ใช้งาน"
              />
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default ManageAllUserPage;
