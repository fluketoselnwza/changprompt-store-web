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
import { getJobInquiryService, createJobService } from "@/services/task";
import {
  TECH_TYPE_OPTION,
  PRODUCT_NAME_OPTION,
  JOB_TYPE_OPTION,
  PAYMENT_TYPE_OPTION,
  PRODUCT_TYPE_OPTION,
  PRODUCT_MODAL_OPTION,
  PRODUCT_BRAND_OPTION,
  PRODUCT_UNIT_OPTION,
  STATUS_JOB_OPTION,
  APPOINTMENT_TIME_OPTION,
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
  address_name: string;
  job_type: string;
  product: string;
  product_type: string;
  product_model: string;
  product_brand: string;
  serial_number: string;
  product_unit: string;
  status: string;
  remark: string;
  accessories: string;
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
  // const [latitude, setLatitude] = useState<number>(10.245);
  // const [longitude, setLongitude] = useState<number>(100.42);

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data > ", data);
    try {
      const body = {
        job_info: {
          job_code: data?.job_code,
          partner_name: data?.partner_name,
        },
        customer_info: {
          // customer_id: "",
          full_name: data?.full_name ?? "",
          mobile_number: data?.mobile_number ?? "",
          mobile_number_secondary: data?.mobile_number_secondary ?? "",
          appointment_date: dayjs(data.appointment_date).format("YYYY-MM-DD"),
          appointment_time: data.appointment_time,
          additional_information: data?.additional_information ?? "",
          distance: data.distance,
          address: {
            address_name: data?.address_name ?? "",
            address_full_code: fullAddress?.value ?? "",
            latitude: 10.245,
            longitude: 100.42,
          },
        },
        product_service_info: {
          job_type: data?.job_type ?? "",
          product: data?.product ?? "",
          product_type: data?.product_type ?? "",
          product_model: data?.product_model ?? "",
          product_brand: data?.product_brand ?? "",
          serial_number: data?.serial_number ?? "",
          product_unit: data?.product_unit ?? "",
          status: data?.status ?? "",
          remark: data?.remark ?? "",
          accessories: data?.accessories ?? "",
        },
        tech_service_fee_info: {
          tech_id: data?.tech_id ?? "",
          payment_type: data?.payment_type ?? "",
          wages: data?.wages ?? 0,
        },
      };
      await createJobService(body);
    } catch (error) {
      console.log("error ==> ", error);
    }
  };

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">สร้างใบงานใหม่</p>
            <div className="flex items-center gap-4">
              <Button
                variant={"outline"}
                onClick={() => navigate("/manage-task/all-tasks")}
              >
                <span className="text-[16px]">ย้อนกลับ</span>
              </Button>
              <Button>
                <span className="text-[16px]">สร้างใบงาน</span>
              </Button>
            </div>
          </div>

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
                  options={APPOINTMENT_TIME_OPTION}
                  register={register("appointment_time", {
                    required: "กรุณาเลือกเวลานัดหมาย",
                  })}
                />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <CustomInput
                  name="address_name"
                  label="ที่อยู่ บ้านเลขที่ หมู่บ้าน ซอย ถนน"
                  placeholder="กรอกข้อมูล"
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
              <div className="mt-14">
                <p className="text-[16] font-bold">ข้อมูลบริการและสินค้า</p>
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
                    options={PRODUCT_NAME_OPTION}
                    register={register("product", {
                      required: "กรุณาเลือกสินค้า",
                    })}
                  />
                  <div></div>
                  <CustomSelect
                    name="product_type"
                    label="ประเภทสินค้า"
                    placeholder="เลือกประเภทสินค้า"
                    required
                    className="[&>span]:text-[16px]"
                    error={errors.product_type?.message}
                    options={PRODUCT_TYPE_OPTION}
                    register={register("product_type", {
                      required: "กรุณาเลือกประเภทสินค้า",
                    })}
                  />
                  <CustomSelect
                    name="product_model"
                    label="รุ่นสินค้า"
                    placeholder="เลือกรุ่นสินค้า"
                    className="[&>span]:text-[16px]"
                    options={PRODUCT_MODAL_OPTION}
                    register={register("product_model")}
                  />
                  <CustomSelect
                    name="product_brand"
                    label="ยี่ห้อหรือแบรนด์สินค้า"
                    placeholder="เลือกยี่ห้อหรือแบรนด์สินค้า"
                    required
                    className="[&>span]:text-[16px]"
                    error={errors.product_brand?.message}
                    options={PRODUCT_BRAND_OPTION}
                    register={register("product_brand", {
                      required: "กรุณาเลือกยี่ห้อหรือแบรนด์สินค้า",
                    })}
                  />
                  <CustomInput
                    name="serial_number"
                    label="หมายเลขสินค้า (SN Number)"
                    placeholder="กรอกข้อมูล"
                    required
                    error={errors.serial_number?.message}
                    register={register("serial_number", {
                      required: "กรุณาระบุหมายเลขสินค้า",
                    })}
                  />
                  <CustomSelect
                    name="product_unit"
                    label="หน่วย"
                    placeholder="เลือกหน่วย"
                    className="[&>span]:text-[16px]"
                    options={PRODUCT_UNIT_OPTION}
                    register={register("product_unit")}
                  />
                  <CustomSelect
                    name="status"
                    label="สถานะ / เหตุผล"
                    placeholder="เลือกสถานะ / เหตุผล"
                    className="[&>span]:text-[16px]"
                    options={STATUS_JOB_OPTION}
                    register={register("status")}
                  />
                  <CustomInput
                    name="remark"
                    label="หมายเหตุ"
                    placeholder="ระบุหมายเหตุ"
                    register={register("remark")}
                  />
                  <CustomInput
                    name="accessories"
                    label="อุปกรณ์เสริม"
                    placeholder="ระบุอุปกรณ์เสริม"
                    register={register("accessories")}
                  />
                </div>
              </div>
              <div className="mt-14">
                <p className="text-[16] font-bold">ข้อมูลช่างและค่าบริการ</p>
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
          </div>
        </form>
      </SidebarLayout>
    </>
  );
};

export default NewTaskPage;
