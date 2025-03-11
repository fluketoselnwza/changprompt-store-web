import React, { useEffect, useState } from "react";
import SidebarLayout from "../sidebar-layout";
import { useForm, SubmitHandler } from "react-hook-form";
import IconHome from "@/assets/icons/icon-home.png";
import { getPartnerProfileService } from "@/services/profile";
import { IPartnerProfileResponse } from "@/services/interfaces";
import {
  CustomInput,
  CustomSelect,
  CustomSelectInput,
  CardAuthen,
} from "../components";
import { ISelectData } from "../interface";
import { getAddressService } from "@/services/address";
import ImageIdCardWithSelfie from "@/assets/images/img-idcard-with-selfie.png";
import ImageIdCard from "@/assets/images/img-idcard.png";
import ImageBookBank from "@/assets/images/img-book-bank.png";
import { getBookbankService } from "@/services/info-data";

const breadcrumbs = [
  {
    label: "จัดการงาน",
    link: "",
    icon: IconHome,
  },
  {
    label: "ข้อมูลร้านค้า",
    link: "",
    icon: "",
  },
];

type Inputs = {
  business_name: string;
  business_model: string;
  owner_name: string;
  mobile_number: string;
  mobile_spare: string;
  email: string;
  address_name: string;
  id_card_number: string;
  account_number: string;
  bank_id: string;
  bank_code: string;
  bank_name: string;
};

const GetStorePage: React.FC = () => {
  const [getProfileData, setProfileData] = useState<IPartnerProfileResponse>();
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [fullAddress, setFullAddress] = useState<ISelectData>({
    label: "",
    value: "",
  });
  const [debouncedQueryAddress, setDebouncedQueryAddress] =
    useState<string>(searchAddress);
  const [addressDataList, setAddressDataList] = useState<ISelectData[]>([]);
  const [bankCode, setBankCode] = useState<string>("");
  const [bookbankData, setBookbankData] = useState<ISelectData[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

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
              ">" +
              item.district_thai +
              ">" +
              item.province_thai +
              ">" +
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

    if (debouncedQueryAddress && debouncedQueryAddress.length > 2) {
      getAddress(debouncedQueryAddress);
    } else {
      setAddressDataList([]);
    }
  }, [debouncedQueryAddress]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQueryAddress(searchAddress);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchAddress]);

  const getProfile = async () => {
    const result = await getPartnerProfileService();

    console.log("result ---*", result);
    if (result) {
      setProfileData(result);
    }
  };

  useEffect(() => {
    console.log("getProfileData ==> ", getProfileData);
    getProfile();
  }, []);

  useEffect(() => {
    const getBookbankData = async () => {
      const result = await getBookbankService();

      console.log("result ==> ", result);
      if (result?.data?.length) {
        const resData = result.data.map((item) => {
          return {
            label: item.bank_desc,
            value: item.bank_code,
          };
        });

        setBookbankData(resData);
      }
    };

    getBookbankData();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = () => {};

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className="font-bold text-[16px]">ข้อมูลร้านค้า</p>
          </div>
          <div className="bg-white px-[16px] py-[28px] mt-[16px] rounded-[8px]">
            <div className="flex justify-between items-center">
              <p className="font-bold text-[16px]">ข้อมูลทั่วไป</p>
              <div className="flex items-center gap-2">
                <div className="bg-[#FFCD42] w-[10px] h-[10px] rounded-full"></div>
                <p className="text-[#374257]">
                  อยู่ระหว่างตรวจสอบข้อมูลและเอกสาร
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-6">
              <CustomInput
                name="business_name"
                label="ชื่อสถานประกอบการ"
                placeholder="กรอกชื่อสถานประกอบการ"
                register={register("business_name", {
                  required: "กรุณาระบุชื่อสถานประกอบการ",
                })}
              />
              <CustomInput
                name="business_model"
                label="รูปแบบธุรกิจ"
                placeholder="กรอกรูปแบบธุรกิจ"
                register={register("business_model", {
                  required: "กรุณาระบุรูปแบบธุรกิจ",
                })}
              />
              <CustomInput
                name="owner_name"
                label="ชื่อ - สกุล เจ้าของกิจการ"
                placeholder="กรอกชื่อ - สกุล เจ้าของกิจการ"
                register={register("owner_name", {
                  required: "กรุณาระบุชื่อ - สกุล เจ้าของกิจการ",
                })}
              />
              <CustomInput
                name="business_model"
                label="เบอร์"
                placeholder="กรอกเบอร์"
                register={register("business_model", {
                  required: "กรุณาระบุเบอร์",
                })}
              />
              <CustomInput
                name="business_model"
                label="เบอร์สำรอง"
                placeholder="กรอกเบอร์สำรอง"
                register={register("business_model", {
                  required: "กรุณาระบุเบอร์สำรอง",
                })}
              />
              <CustomInput
                name="business_model"
                label="อีเมล"
                placeholder="กรอกอีเมล"
                register={register("business_model", {
                  required: "กรุณาระบุอีเมล",
                })}
              />
              <CustomInput
                name="address_name"
                label="ที่อยู่(ตามบัตรประชาชน) บ้านเลขที่ หมู่บ้าน ซอย ถนน"
                placeholder="กรอกที่อยู่(ตามบัตรประชาชน)"
                required
                error={errors.address_name?.message}
                register={register("address_name", {
                  required: "กรุณาระบุที่อยู่",
                })}
              />
              <div className="col-span-2">
                <CustomSelectInput
                  label="ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์"
                  required
                  valueSearch={searchAddress}
                  setValueSearch={setSearchAddress}
                  value={fullAddress}
                  setValue={setFullAddress}
                  placeholderSearch="ค้นหา รหัสไปรษณีย์ ตำบล อำเภอ จังหวัด"
                  option={addressDataList}
                />
              </div>
            </div>
            <div className="mt-[28px]">
              <p className="font-bold text-[16px]">ข้อมูลเจ้าของร้าน</p>
              <div className="mt-4 grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-4">
                  <CustomInput
                    name="id_card_number"
                    label="เลขที่บัตรประจำตัวประชาชน"
                    placeholder="กรอกเลขที่บัตรประจำตัวประชาชน"
                    required
                    error={errors.id_card_number?.message}
                    register={register("id_card_number", {
                      required: "กรุณาระบุเลขที่บัตรประจำตัวประชาชน",
                    })}
                  />
                  <CardAuthen defaultImage={ImageIdCardWithSelfie} />
                </div>
                <div className="flex flex-col gap-4">
                  <CustomInput
                    name="account_number"
                    label="เลขบัญชี"
                    placeholder="กรอกเลขบัญชี"
                    required
                    error={errors.account_number?.message}
                    register={register("account_number", {
                      required: "กรุณาระบุเลขบัญชี",
                    })}
                  />
                  <CardAuthen defaultImage={ImageIdCard} />
                </div>
                <div className="flex flex-col gap-4">
                  <CustomSelect
                    name="bank_code"
                    label="ธนาคาร"
                    placeholder="เลือกธนาคาร"
                    options={bookbankData}
                    register={register("bank_code", {
                      required: "เลือกธนาคาร",
                    })}
                    value={bankCode}
                    setValue={setBankCode}
                  />
                  <CardAuthen defaultImage={ImageBookBank} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </SidebarLayout>
    </>
  );
};

export default GetStorePage;
