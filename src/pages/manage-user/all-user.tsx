import React from "react";
import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import IconAddUser from "@/assets/icons/icon-add-user.png";
import { Button } from "@/components/ui/button";
import { CustomInputIcon, CustomSelect, CustomTable } from "../components";
import { useForm, SubmitHandler } from "react-hook-form";
import IconSearch from "@/assets/icons/icon-search.png";

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
  nameCustomer: string;
  nameTechnician: string;
  servicerDate: Date | undefined;
};

const ManageAllUserPage: React.FC = () => {
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();

  const handleSearch: SubmitHandler<Inputs> = (data) => {
    console.log("dataaaaaa > ", data);
  };

  const handleClear = () => {};

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
                  name="numberTask"
                  placeholder="เลขที่ใบงาน"
                  classInput="text-[14px]"
                  register={register("numberTask")}
                />
                <CustomInputIcon
                  iconLeft={IconSearch}
                  name="nameCustomer"
                  placeholder="ชื่อลูกค้า"
                  classInput="text-[14px]"
                  register={register("nameCustomer")}
                />
                <CustomInputIcon
                  iconLeft={IconSearch}
                  name="nameTechnician"
                  placeholder="ชื่อช่าง"
                  classInput="text-[14px]"
                  register={register("nameTechnician")}
                />
                <CustomSelect
                  name="role_code"
                  options={[]}
                  register={register("role_code")}
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
