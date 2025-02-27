import React, { useEffect, useState } from "react";
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
import {
  getPartnerEmployeeCodeService,
  createPartnerUserService,
} from "@/services/user";

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
  addresses: string;
};

interface IModalAddUserProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ModalAddUser: React.FC<IModalAddUserProps> = ({ isOpen, setIsOpen }) => {
  const [roleCode, setRoleCode] = useState<string>("");
  const [addresses, setAddresses] = useState<string>("");
  const [empCode, setEmpCode] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    console.log("data ==> ", data);

    try {
      const params = {
        emp_code: data?.emp_code,
        role_code: data?.role_code,
        first_name: data?.first_name,
        last_name: data?.last_name,
        nick_name: data?.nick_name,
        nation_id: data?.nation_id,
        mobile_number: data?.mobile_number,
        email: data?.email,
        password: data?.password,
        addresses: {
          address: data?.address,
          sub_district_code: "22501",
          district_code: "225010240",
          province_code: "2",
          zipcode: "10230",
        },
      };

      await createPartnerUserService(params);
    } catch (error) {
      console.log("error ====> ", error);
    }
  };

  useEffect(() => {
    const getEmployeeCode = async () => {
      const result = await getPartnerEmployeeCodeService();
      console.log("result emp_code ==> ", result);
      if (result?.emp_code) {
        setEmpCode(result.emp_code);
      }
    };

    getEmployeeCode();
  }, []);

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
                  defaultValue={empCode}
                  label="รหัสพนักงาน"
                  disabled
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
                  register={register("role_code", {
                    required: "กรุณาเลือกตำแหน่ง",
                  })}
                  required
                  error={errors.role_code?.message}
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
                  name="nick_name"
                  label="ชื่อเล่น"
                  register={register("nick_name", {
                    required: "กรุณาระบุชื่อเล่น",
                  })}
                  placeholder="ระบุ..."
                  required
                  error={errors.nick_name?.message}
                />
                <CustomInput
                  name="nation_id"
                  type="number"
                  label="รหัสบัตรประชาชน"
                  register={register("nation_id", {
                    required: "กรุณาระบุรหัสบัตรประชาชน",
                  })}
                  placeholder="ระบุ..."
                  required
                  error={errors.nation_id?.message}
                  maxLength={13}
                />
                <CustomInput
                  name="mobile_number"
                  label="เบอร์โทรศัพท์"
                  type="number"
                  register={register("mobile_number", {
                    required: "กรุณาระบุเบอร์โทรศัพท์",
                  })}
                  maxLength={10}
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
              <div className="mt-3">
                <CustomSelect
                  name="addresses"
                  placeholder="เลือก..."
                  label="ตำบล/อำเภอ/จังหวัด (รอสรุป)"
                  options={[
                    {
                      value: "1",
                      label: "1",
                    },
                    {
                      value: "2",
                      label: "2",
                    },
                    {
                      value: "3",
                      label: "3",
                    },
                  ]}
                  value={addresses}
                  setValue={setAddresses}
                />
              </div>
              <div className="flex items-center justify-center mt-[22px] gap-4">
                <Button
                  className="w-[82px]"
                  variant={"cancel"}
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
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
