import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import CloseIcon from "@/assets/icons/icon-close.png";
import { useForm } from "react-hook-form";
import { CustomInput, CustomSelect } from "@/pages/components";
import { ROLE_CODE } from "@/pages/data/role-code";
import { Button } from "@/components/ui/button";

type Inputs = {
  emp_code: string;
  role_code: string;
  first_name: string;
  last_name: string;
  nick_name: string;
  nation_id: string;
  mobile_number: string;
  email: string;
  password: string;
  address: string;
};

const ModalAddUser: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [roleCode, setRoleCode] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log("data ==> ", data);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-[600px] bg-white rounded-[8px] p-[28px]">
        <div className="flex justify-between">
          <p className="text-[16px] font-semibold">เพิ่มข้อมูลผู้ใช้งาน</p>
          <img
            src={CloseIcon}
            className="w-3 h-3 cursor-pointer"
            alt="icon close"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <DialogHeader className="flex flex-col items-center gap-4 text-left">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full gap-3"
          >
            <DialogDescription className="w-full">
              <div className="grid grid-cols-2 gap-4">
                <CustomInput
                  name="emp_code"
                  label="รหัสพนักงาน"
                  register={register("emp_code", {
                    required: "กรุณาระบุรหัสพนักงาน",
                  })}
                />
                <CustomSelect
                  name="role_code"
                  placeholder="เลือก..."
                  label="ตำแหน่ง"
                  options={ROLE_CODE}
                  value={roleCode}
                  setValue={setRoleCode}
                />
                <CustomInput
                  name="first_name"
                  label="ชื่อ"
                  register={register("first_name", {
                    required: "กรุณาระบุชื่อ",
                  })}
                  placeholder="ระบุ..."
                  required
                  error={errors.first_name?.message}
                />
                <CustomInput
                  name="last_name"
                  label="นามสกุล"
                  register={register("last_name", {
                    required: "กรุณาระบุนามสกุล",
                  })}
                  placeholder="ระบุ..."
                  required
                  error={errors.last_name?.message}
                />
                <CustomInput
                  name="mobile_number"
                  label="เบอร์มือถือ"
                  type="number"
                  register={register("mobile_number", {
                    required: "กรุณาระบุเบอร์มือถือ",
                  })}
                  placeholder="ระบุ..."
                  required
                  error={errors.mobile_number?.message}
                />
                <CustomInput
                  name="email"
                  label="อีเมล"
                  register={register("email", {
                    required: "กรุณาระบุอีเมล",
                  })}
                  placeholder="ระบุ..."
                  required
                  error={errors.email?.message}
                />
                <CustomInput
                  name="password"
                  label="รหัสผ่าน"
                  register={register("password", {
                    required: "กรุณาระบุรหัสผ่าน",
                  })}
                  placeholder="ระบุ..."
                  required
                  error={errors.password?.message}
                />
                <CustomInput
                  name="address"
                  label="ที่อยู่"
                  register={register("address", {
                    required: "กรุณาระบุที่อยู่",
                  })}
                  placeholder="บ้านเลขที่ ซอย ถนน..."
                  required
                  error={errors.address?.message}
                />
              </div>
              <div className="flex items-center justify-center mt-[22px] gap-4">
                <Button className="w-[82px]" variant={"cancel"}>
                  ยกเลิก
                </Button>
                <Button className="w-[82px]">เพิ่ม</Button>
              </div>
            </DialogDescription>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddUser;
