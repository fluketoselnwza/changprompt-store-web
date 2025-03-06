import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import CloseIcon from "@/assets/icons/icon-close.png";
import { useForm } from "react-hook-form";
import {
  CustomInput,
  CustomSelect,
  CustomSelectInput,
} from "@/pages/components";
import { ROLE_CODE } from "@/pages/data/role-code";
import { Button } from "@/components/ui/button";
import {
  getPartnerEmployeeCodeService,
  createPartnerUserService,
  getPartnerUserDetailService,
  updatePartnerUserService,
} from "@/services/user";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IPageProps, ISelectData } from "@/pages/interface";
import IconWaringColor from "@/assets/icons/icon-warning-blue.png";
import {
  openModalWarning,
  closeModalWarning,
} from "@/redux/modal-warning/action";
import {
  STATE_STATUS_MANAGE_USER,
  STATUS_NAME_MANAGE_USER,
} from "@/pages/data/status-code";
import { getAddressService } from "@/services/address";

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

interface IModalAddUserProps extends IPageProps {
  isOpen: boolean;
  setIsOpen: (value: boolean, status?: string) => void;
  status?: "GET" | "CREATE" | "UPDATE" | "";
  userId?: string;
}

const ModalAddUser: React.FC<IModalAddUserProps> = ({
  isOpen,
  setIsOpen,
  status,
  userId,
  openModalWarning,
  closeModalWarning,
}) => {
  const [roleCode, setRoleCode] = useState<string>("");
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [fullAddress, setFullAddress] = useState<ISelectData>({
    label: "",
    value: "",
  });
  const [debouncedQuery, setDebouncedQuery] = useState<string>(searchAddress);
  const [addressDataList, setAddressDataList] = useState<ISelectData[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const empCode = watch("emp_code");
  const empRole = watch("role_code");
  const firstName = watch("first_name");
  const lastName = watch("last_name");
  const nickName = watch("nick_name");
  const nationId = watch("nation_id");
  const mobileNumber = watch("mobile_number");
  const email = watch("email");
  const password = watch("password");
  const address = watch("address");

  const isDisabledBuuton =
    empCode &&
    empRole &&
    firstName &&
    lastName &&
    nickName &&
    nationId &&
    mobileNumber &&
    email &&
    password &&
    address &&
    fullAddress.value;

  const handleConfirm = async (data: Inputs) => {
    openModalWarning(
      IconWaringColor,
      status === STATE_STATUS_MANAGE_USER.CREATE
        ? "ยืนยันเพิ่มผู้ใช้ใหม่ใช่หรือไม่"
        : "ยืนยันแก้ไขผู้ใช้งานใช่หรือไม่",
      "",
      "ยกเลิก",
      () => {
        closeModalWarning();
      },
      "ยืนยัน",
      () => {
        closeModalWarning();
        onSubmit(data);
      }
    );
  };

  const onSubmit = async (data: Inputs) => {
    console.log("data ==> ", data);

    try {
      const params = {
        role_code: data?.role_code,
        first_name: data?.first_name,
        last_name: data?.last_name,
        nick_name: data?.nick_name,
        nation_id: data?.nation_id,
        mobile_number: data?.mobile_number,
        email: data?.email,
      };

      if (status === STATE_STATUS_MANAGE_USER.CREATE) {
        const paramsCreate = {
          ...params,
          emp_code: data?.emp_code,
          password: data?.password,
          address_name: data?.address,
          address_full_code: fullAddress.value,
        };

        await createPartnerUserService(paramsCreate);
      } else {
        const paramsUpdate = {
          ...params,
          address_name: data?.address,
          address_full_code: fullAddress.value,
        };

        await updatePartnerUserService(paramsUpdate, userId ?? "");
      }
      setIsOpen(false, "success");
    } catch (error) {
      console.log("error ====> ", error);
      // setIsOpen(false, "fail");
    }
  };

  const getPartnerUserDetail = async (id: string) => {
    const result = await getPartnerUserDetailService(id);

    console.log("result ====> ", result);
    if (result) {
      setRoleCode(result.role_code);
      setValue("emp_code", result.emp_code);
      setValue("role_code", result.role_code);
      setValue("first_name", result.first_name);
      setValue("last_name", result.last_name);
      setValue("nick_name", result.nick_name);
      setValue("nation_id", result.nation_id);
      setValue("mobile_number", result.mobile_number);
      setValue("email", result.email);
      setValue("password", "********");
      setValue("address", result.address);

      const addressName = result.full_address;
      const addressFullCode =
        result?.subdistrict_code +
        "|" +
        result?.district_code +
        "|" +
        result?.province_code +
        "|" +
        result?.post_code;

      setSearchAddress(addressName);
      setFullAddress({
        label: addressName,
        value: addressFullCode,
      });
    }
  };

  useEffect(() => {
    console.log("status ---> ", status);
    if (status === STATE_STATUS_MANAGE_USER.CREATE) {
      const getEmployeeCode = async () => {
        const result = await getPartnerEmployeeCodeService();
        console.log("result emp_code ==> ", result);
        if (result?.emp_code) {
          setValue("emp_code", result.emp_code);
        }
      };

      if (isOpen) {
        getEmployeeCode();
        setRoleCode("");
        reset({
          role_code: "",
          first_name: "",
          last_name: "",
          nick_name: "",
          nation_id: "",
          mobile_number: "",
          email: "",
          password: "",
          address: "",
          addresses: "",
        });
        setSearchAddress("");
        setFullAddress({ label: "", value: "" });
        setAddressDataList([]);
      }
    } else {
      if (userId) {
        getPartnerUserDetail(userId);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchAddress);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchAddress]);

  useEffect(() => {
    const getAddress = async (search: string) => {
      try {
        const result = await getAddressService(search);

        console.log("result ==> ", result);
        if (result?.length) {
          const dataAddress: ISelectData[] = [];
          result.map((item) => {
            const addressName =
              item.subdistrict_thai +
              "/" +
              item.district_thai +
              "/" +
              item.province_thai +
              "/" +
              item.post_code;

            const addressFullCode =
              item.subdistrict_code +
              "|" +
              item.district_code +
              "|" +
              item.province_code +
              "|" +
              item.post_code;

            dataAddress.push({
              label: addressName,
              value: addressFullCode,
            });
          });

          console.log("data ===> ", dataAddress);
          setAddressDataList(dataAddress);
        } else {
          setAddressDataList([]);
        }
      } catch {
        setAddressDataList([]);
      }
    };

    if (debouncedQuery && debouncedQuery.length > 2) {
      getAddress(debouncedQuery);
    } else {
      setAddressDataList([]);
    }
  }, [debouncedQuery]);

  const isDisabled = status === STATE_STATUS_MANAGE_USER.GET;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-[600px] bg-white rounded-[8px] p-[28px]">
        <div className="flex justify-between">
          <p className="text-[16px] font-semibold">
            {status ? STATUS_NAME_MANAGE_USER[status].title : null}
          </p>
          <img
            src={CloseIcon}
            className="w-3 h-3 cursor-pointer"
            alt="icon close"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <DialogHeader className="flex flex-col items-center gap-4 text-left">
          <form
            onSubmit={handleSubmit(handleConfirm)}
            className="flex flex-col items-center w-full gap-3"
          >
            <DialogDescription className="w-full">
              <div className="grid grid-cols-2 gap-4">
                <CustomInput
                  name="emp_code"
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
                  defaultValue={roleCode}
                  register={register("role_code", {
                    required: "กรุณาเลือกตำแหน่ง",
                  })}
                  required
                  error={errors.role_code?.message}
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  disabled={
                    status !== STATE_STATUS_MANAGE_USER.CREATE ? true : false
                  }
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
                  disabled={isDisabled}
                />
              </div>
              <div className="mt-3">
                <CustomSelectInput
                  label="ตำบล/อำเภอ/จังหวัด"
                  required
                  valueSearch={searchAddress}
                  setValueSearch={setSearchAddress}
                  value={fullAddress}
                  setValue={setFullAddress}
                  placeholderSearch="ค้นหา รหัสไปรษณีย์ ตำบล อำเภอ จังหวัด"
                  option={addressDataList}
                  disabled={isDisabled}
                />
              </div>
              {status !== STATE_STATUS_MANAGE_USER.GET ? (
                <div className="flex items-center justify-center mt-[22px] gap-4">
                  <Button
                    className="w-[82px]"
                    variant={"cancel"}
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    className="w-[82px]"
                    disabled={isDisabledBuuton ? false : true}
                  >
                    {status === STATE_STATUS_MANAGE_USER.CREATE
                      ? "เพิ่ม"
                      : "ตกลง"}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center mt-[22px] gap-4">
                  <Button
                    className="w-[97px]"
                    variant={"cancel"}
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    ย้อนกลับ
                  </Button>
                </div>
              )}
            </DialogDescription>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
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

const ModalAddUserWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddUser);

export default ModalAddUserWithConnect;
