import React, { useState } from "react";
import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import IconAddUser from "@/assets/icons/icon-add-user.png";
import { Button } from "@/components/ui/button";
import { CustomInputIcon, CustomSelect, CustomTable } from "../components";
import { useForm, SubmitHandler } from "react-hook-form";
import IconSearch from "@/assets/icons/icon-search.png";
import { ROLE_CODE } from "../data/role-code";

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

type Inputs = {
  role_code: string;
  emp_code: string;
  emp_name: string;
  nickname: string;
};

const ManageAllUserPage: React.FC = () => {
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();
  const [roleCode, setRoleCode] = useState<string>("");

  const handleSearch: SubmitHandler<Inputs> = (data) => {
    console.log("dataaaaaa > ", data);
  };

  const handleClear = () => {
    setValue("emp_code", "");
    setValue("emp_name", "");
    setValue("role_code", "");
    setValue("nickname", "");
    setRoleCode("");
  };

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
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default ManageAllUserPage;
