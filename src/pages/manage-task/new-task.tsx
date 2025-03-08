import SidebarLayout from "../sidebar-layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import IconHome from "@/assets/icons/icon-home.png";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CustomInput,
  CustomSelect,
  DatePicker,
  CustomInputIcon,
  CustomMap,
  CustomSelectInput,
} from "../components";
import { Checkbox } from "@/components/ui/checkbox";
import IconSearch from "@/assets/icons/icon-search.png";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { getAddressService } from "@/services/address";
import { ISelectData } from "../interface";
import { getJobInquiryService } from "@/services/task";
import {
  TECH_TYPE_OPTION,
  PRODUCR_NAME_OPTION,
  JOB_TYPE_OPTION,
  PAYMENT_TYPE_OPTION,
} from "../data/option-data";

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
  {
    label: "สร้างใบงานใหม่",
    link: "",
    icon: "",
  },
];

type Inputs = {
  job_code: string;
  partner_name: string;
  create_by: string;
  full_name: string;
  mobile_number: string;
  mobile_number_secondary: string;
  appointment_date: string;
  appointment_time: string;
  additional_information: string;
  distance: number;
  address: string;
  job_type: string;
  product: string;
  tech_id: string;
  tech_type: string;
  tech_name: string;
  payment_type: string;
  wages: number;
};

const NewTaskPage = () => {
  const navigate = useNavigate();

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
    setValue,
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchAddress);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchAddress]);

  useEffect(() => {
    const getJobInquiry = async () => {
      const result = await getJobInquiryService();
      console.log("resilt ==> ", result);

      if (result) {
        setValue("job_code", result.job_code);
        setValue("partner_name", result.partner_name);
        setValue("create_by", result.create_by);
      }
    };

    getJobInquiry();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data > ", data);

    // createJobService();
  };

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">สร้างใบงานใหม่</p>
            <div className="flex items-center gap-4">
              <Button
                variant={"outline"}
                onClick={() => navigate("/manage-task/all-tasks")}
              >
                <span className="text-[16px]">ย้อนกลับ</span>
              </Button>
              <Button variant={"outline"}>
                <span className="text-[16px]">สร้างใบงาน</span>
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white p-[22px] mt-[16px] rounded-[8px]">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[16] font-bold">ข้อมูลใบงาน</p>
                  <p className="txt-[14px] text-[#374151]">
                    วันที่สร้างใบงาน : {dayjs().format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <CustomInput
                    name="job_code"
                    label="เลขที่ใบงาน"
                    placeholder="เลขที่ใบงาน"
                    disabled
                    register={register("job_code", {
                      required: "กรุณาระบุเลขที่ใบงาน",
                    })}
                  />
                  <CustomInput
                    name="partner_name"
                    label="ชื่อร้าน"
                    placeholder="ชื่อร้าน"
                    disabled
                    register={register("partner_name", {
                      required: "กรุณาระบุชื่อร้าน",
                    })}
                  />
                  <CustomInput
                    name="create_by"
                    label="ผู้สร้างใบงาน"
                    placeholder="ผู้สร้างใบงาน"
                    disabled
                    register={register("create_by", {
                      required: "กรุณาระบุผู้สร้างใบงาน",
                    })}
                  />
                </div>
              </div>
              <div className="mt-14">
                <p className="text-[16] font-bold">ข้อมูลใบงาน</p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <CustomInput
                    name="full_name"
                    label="ชื่อ - นามสกุล"
                    placeholder="ชื่อ - นามสกุล"
                    required
                    error={errors.full_name?.message}
                    register={register("full_name", {
                      required: "กรุณาระบุชื่อ - นามสกุล",
                    })}
                  />
                  <CustomInput
                    name="mobile_number"
                    label="เบอร์โทรศัพท์"
                    placeholder="เบอร์โทรศัพท์"
                    required
                    type="number"
                    maxLength={10}
                    error={errors.mobile_number?.message}
                    register={register("mobile_number", {
                      required: "กรุณาระบุเบอร์โทรศัพท์",
                    })}
                  />
                  <CustomInput
                    name="mobile_number_secondary"
                    label="เบอร์โทรศัพท์ (สำรอง)"
                    type="number"
                    maxLength={10}
                    placeholder="เบอร์โทรศัพท์ (สำรอง)"
                    register={register("mobile_number_secondary", {
                      required: "กรุณาระบุเบอร์โทรศัพท์ (สำรอง)",
                    })}
                  />
                  <DatePicker
                    name="appointment_date"
                    label="วันที่นัดหมาย"
                    classInput="text-[16px]"
                    required
                    error={errors.appointment_date?.message}
                    register={register("appointment_date", {
                      required: "เลือกวันที่นัดหมาย",
                    })}
                  />
                  <CustomSelect
                    name="appointment_time"
                    label="เวลานัดหมาย"
                    required
                    placeholder="เลิอกเวลานัดหมาย"
                    className="[&>span]:text-[16px]"
                    error={errors.appointment_time?.message}
                    options={[
                      {
                        label: "เช้า 08:00 - 12:00",
                        value: "เช้า 08:00 - 12:00",
                      },
                      {
                        label: "บ่าย 13:00 - 17:00",
                        value: "บ่าย 13:00 - 17:00",
                      },
                    ]}
                    register={register("appointment_time", {
                      required: "กรุณาเลือกเวลานัดหมาย",
                    })}
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <CustomInput
                    name="address"
                    label="ที่อยู่ บ้านเลขที่ หมู่บ้าน ซอย ถนน"
                    placeholder="กรอกข้อมูล"
                    required
                    error={errors.address?.message}
                    register={register("address", {
                      required: "กรุณาระบุที่อยู่",
                    })}
                  />
                  <CustomSelectInput
                    label="ตำบล/อำเภอ/จังหวัด"
                    required
                    valueSearch={searchAddress}
                    setValueSearch={setSearchAddress}
                    value={fullAddress}
                    setValue={setFullAddress}
                    placeholderSearch="ค้นหา รหัสไปรษณีย์ ตำบล อำเภอ จังหวัด"
                    option={addressDataList}
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <CustomInput
                      name="additional_information"
                      label="ระบุจุดที่ต้องการเข้าให้บริการ (ชั้น ห้อง อื่นๆ)"
                      placeholder="ระบุรายละเอียดจุดให้บริการของลูกค้าให้ชัดเจนมากขึ้น เช่น บ้านชั้น 2"
                      required
                      error={errors.additional_information?.message}
                      register={register("additional_information", {
                        required: "กรุณาระบุจุดที่ต้องการเข้าให้บริการ",
                      })}
                    />
                  </div>
                  <CustomInput
                    name="distance"
                    label="ระยะทาง"
                    placeholder="กรอกข้อมูล"
                    required
                    error={errors.distance?.message}
                    register={register("distance", {
                      required: "กรุณาระบุจุดระยะทาง",
                    })}
                  />
                </div>
                <div className="flex items-end space-x-2 mt-6">
                  <Checkbox
                    id="is_google_map"
                    className="border border-gray-300 w-[16px] h-[16px]"
                  />
                  <label htmlFor="is_google_map" className="leading-4">
                    ปักหมุดสถานที่จริง (Google map)
                  </label>
                </div>
                <div className="mt-3">
                  <CustomMap />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <CustomSelect
                    name="job_type"
                    label="ประเภทงาน"
                    placeholder="เลือกประเภทงาน"
                    required
                    className="[&>span]:text-[16px]"
                    error={errors.job_type?.message}
                    options={JOB_TYPE_OPTION}
                    register={register("job_type", {
                      required: "กรุณาเลือกประเภทงาน",
                    })}
                  />
                  <CustomSelect
                    name="product"
                    label="เลือกสินค้า"
                    placeholder="เลือกสินค้า"
                    required
                    className="[&>span]:text-[16px]"
                    error={errors.product?.message}
                    options={PRODUCR_NAME_OPTION}
                    register={register("product", {
                      required: "กรุณาเลือกสินค้า",
                    })}
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <CustomSelect
                    name="tech_type"
                    label="เลือกช่าง"
                    placeholder="เลือกช่าง"
                    className="[&>span]:text-[16px]"
                    options={TECH_TYPE_OPTION}
                    register={register("tech_type")}
                  />
                  <CustomInputIcon
                    label="ช่าง"
                    iconRight={IconSearch}
                    name="tech_name"
                    placeholder="ค้นหาช่าง"
                    register={register("tech_name")}
                  />
                  <CustomSelect
                    name="payment_type"
                    label="ประเภทการเก็บเงิน"
                    placeholder="เลือกประเภทการเก็บเงิน"
                    className="[&>span]:text-[16px]"
                    options={PAYMENT_TYPE_OPTION}
                    register={register("payment_type")}
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <CustomInput
                    name="wages"
                    label="ค่าแรง"
                    placeholder="00.00"
                    classInput="text-right"
                    type="number"
                    register={register("wages")}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </SidebarLayout>
    </>
  );
};

export default NewTaskPage;
