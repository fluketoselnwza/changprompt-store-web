import SidebarLayout from "../sidebar-layout";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import IconHome from "@/assets/icons/icon-home.png";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CustomInput,
  CustomSelect,
  DatePicker,
  CustomMap,
  CustomSelectInput,
  ModalInputSearch,
} from "../components";
import { Checkbox } from "@/components/ui/checkbox";
import IconSearch from "@/assets/icons/icon-search.png";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { getAddressService } from "@/services/address";
import { ISelectData } from "../interface";
import {
  getJobInquiryService,
  createJobService,
  getTechSearchNameSearchService,
  getJobDetailService,
  updateJobService,
} from "@/services/task";
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
import IconWaringColor from "@/assets/icons/icon-warning-blue.png";
import { connect } from "react-redux";
import { IPageProps } from "@/pages/interface";
import {
  openModalWarning,
  closeModalWarning,
} from "@/redux/modal-warning/action";
import { Dispatch } from "redux";
import { useToast } from "@/hooks/use-toast";
import { formatFloatFixed2, formatStringtoDate } from "@/lib/format";
import { STATE_STATUS_MANAGE_USER } from "../data/status-code";
import { ICustomersData } from "@/services/interfaces";
import IconBack from "@/assets/icons/icon-back.png";
import IconEditJob from "@/assets/icons/icon-edit-task.png";
import IconDeleteJob from "@/assets/icons/icon-delete-job.png";
import { IGetJobResponse } from "@/services/interfaces";
import { deletePartnerJobsService } from "@/services/task";

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
  appointment_date: Date;
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

interface INewTaskPage extends IPageProps {
  statusType: "GET" | "CREATE" | "UPDATE" | "";
}

const NewTaskPage: React.FC<INewTaskPage> = (props) => {
  const { openModalWarning, closeModalWarning, statusType = "" } = props;

  const navigate = useNavigate();
  const { job_id = "" } = useParams();
  const { toast, dismiss } = useToast();

  const [searchAddress, setSearchAddress] = useState<string>("");
  const [fullAddress, setFullAddress] = useState<ISelectData>({
    label: "",
    value: "",
  });
  const [debouncedQueryAddress, setDebouncedQueryAddress] =
    useState<string>(searchAddress);
  const [addressDataList, setAddressDataList] = useState<ISelectData[]>([]);
  // const [latitude, setLatitude] = useState<number>(10.245);
  // const [longitude, setLongitude] = useState<number>(100.42);

  const [searchTech, setSearchTech] = useState<string>("");
  const [searchTechData, setSearchTechData] = useState<ISelectData>({
    label: "",
    value: "",
  });
  const [debouncedQueryTech, setDebouncedQueryTech] =
    useState<string>(searchTech);
  const [techDataList, setTechDataList] = useState<ISelectData[]>([]);
  const [oldUserData, setOldUserData] = useState<ICustomersData>();
  const [isOpenOldUser, setIsOpenOldUser] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<Date>();
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [productType, setProductType] = useState<string>("");
  const [productModel, setProductModel] = useState<string>("");
  const [productBrand, setProductBrand] = useState<string>("");
  const [productUnit, setProductUnit] = useState<string>("");
  const [jobStatus, setJobStatus] = useState<string>("");
  const [techType, setTechType] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [jobData, setJobsData] = useState<IGetJobResponse>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const watchFields = watch([
    "full_name",
    "mobile_number",
    "appointment_date",
    "appointment_time",
    "address_name",
    "additional_information",
    "distance",
    "job_type",
    "product",
    "product_type",
    "product_brand",
    "serial_number",
  ]);

  const disabledButton =
    watchFields.includes("") || !fullAddress.value || !searchTechData.value
      ? true
      : false;

  const disabledFields = STATE_STATUS_MANAGE_USER.GET === statusType;

  const submitConfirmCreateJob = async (data: Inputs) => {
    try {
      const customerIdData = customerId ? { customer_id: customerId } : {};
      const body = {
        job_info: {
          job_code: data?.job_code,
          partner_name: data?.partner_name,
        },
        customer_info: {
          ...customerIdData,
          full_name: data?.full_name ?? "",
          mobile_number: data?.mobile_number ?? "",
          mobile_number_secondary: data?.mobile_number_secondary ?? "",
          appointment_date: dayjs(data.appointment_date),
          appointment_time: data.appointment_time,
          additional_information: data?.additional_information ?? "",
          distance: data?.distance ? formatFloatFixed2(data?.distance) : 0.0,
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
          tech_id: searchTechData?.value ?? "",
          payment_type: data?.payment_type ?? "",
          wages: data?.wages ? formatFloatFixed2(data.wages) : 0.0,
        },
      };
      if (STATE_STATUS_MANAGE_USER.CREATE === statusType) {
        await createJobService(body);
        const { id } = toast({
          title: "สำเร็จแล้ว",
          description: "สร้างใบงานสำเร็จแล้ว",
          variant: "success",
          className: "w-[300px] mx-auto",
          duration: 3000,
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        dismiss(id);
        navigate("/manage-task/all-tasks");
      } else {
        await updateJobService(body, job_id);
        const { id } = toast({
          title: "สำเร็จแล้ว",
          description: "บันทึกข้อมูลการแก้ไขใบงานสำเร็จแล้ว",
          variant: "success",
          className: "w-[300px] mx-auto",
          duration: 3000,
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        dismiss(id);
        navigate(`/manage-task/all-tasks/detail-task/${job_id}`);
      }
    } catch (error) {
      console.log("error ==> ", error);
      toast({
        title: "ไม่สำเร็จ",
        description: "ไม่สามารถมอบหมายงานให้ช่างได้ตามเวลาที่เลือก",
        variant: "fail",
        className: "w-[328px] mx-auto",
      });
    }
  };

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

  useEffect(() => {
    const getTech = async (search: string) => {
      const result = await getTechSearchNameSearchService(search);

      console.log("result ==> ", result);
      if (result?.tech_names?.length) {
        const resultData = result.tech_names.map((item) => {
          return {
            label: item?.tech_name,
            value: item?.id,
          };
        });
        setTechDataList(resultData);
      } else {
        setTechDataList([]);
      }
    };

    getTech(debouncedQueryTech);
  }, [debouncedQueryTech]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQueryTech(searchTech);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchTech]);

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

    if (STATE_STATUS_MANAGE_USER.CREATE === statusType) {
      getJobInquiry();
    }
  }, []);

  useEffect(() => {
    if (oldUserData) {
      console.log("oldUserData => ", oldUserData);
      setCustomerId(oldUserData?.id);
      setValue("full_name", oldUserData?.customer_name);
      setValue("mobile_number", oldUserData?.mobile_number);
      setValue("mobile_number_secondary", oldUserData?.mobile_spare);
    }
  }, [oldUserData]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data > ", data);
    openModalWarning(
      IconWaringColor,
      STATE_STATUS_MANAGE_USER.CREATE === statusType
        ? "ยืนยีนสร้างใบงาน"
        : "ยืนยันบันทึกข้อมูลการแก้ไข",
      `${data?.job_code} : ${data?.job_type}${data?.product}`,
      "ยกเลิก",
      () => {
        closeModalWarning();
      },
      "ยืนยัน",
      () => {
        closeModalWarning();
        submitConfirmCreateJob(data);
      }
    );
  };

  const jobDetail = async (id: string) => {
    try {
      const result = await getJobDetailService(id);
      console.log("result > ", result);

      setJobsData(result);

      const jobInfo = result?.job_info;
      const customerInfo = result?.customer_info;
      const productServiceInfo = result?.product_service_info;
      const techServiceFeeInfo = result?.tech_service_fee_info;

      if (jobInfo) {
        setValue("job_code", jobInfo.job_code);
        setValue("partner_name", jobInfo.partner_name);
        setValue("create_by", jobInfo.role_created_by ?? "");
      }

      if (customerInfo) {
        setCustomerId(customerInfo?.customer_id ?? "");
        setValue("full_name", customerInfo.full_name);
        setValue("mobile_number", customerInfo.mobile_number);
        setValue(
          "mobile_number_secondary",
          customerInfo.mobile_number_secondary
        );
        setValue(
          "appointment_date",
          formatStringtoDate(customerInfo.appointment_date)
        );
        setAppointmentDate(formatStringtoDate(customerInfo.appointment_date));
        setValue("appointment_time", customerInfo.appointment_time);
        setAppointmentTime(customerInfo.appointment_time);
        setValue("address_name", customerInfo.address.address_name);
        setFullAddress({
          label: customerInfo.address.address_full_name ?? "",
          value: customerInfo.address.address_full_code ?? "",
        });
        setValue("additional_information", customerInfo.additional_information);
        setValue("distance", customerInfo.distance);
      }

      if (productServiceInfo) {
        setValue("job_type", productServiceInfo.job_type);
        setJobType(productServiceInfo.job_type);
        setValue("product", productServiceInfo.product);
        setProduct(productServiceInfo.product);
        setValue("product_type", productServiceInfo.product_type);
        setProductType(productServiceInfo.product_type);
        setValue("product_model", productServiceInfo.product_model);
        setProductModel(productServiceInfo.product_model);
        setValue("product_brand", productServiceInfo.product_brand);
        setProductBrand(productServiceInfo.product_brand);
        setValue("serial_number", productServiceInfo.serial_number);
        setValue("product_unit", productServiceInfo.product_unit);
        setProductUnit(productServiceInfo.product_unit);
        setValue("status", productServiceInfo.status);
        setJobStatus(productServiceInfo.status);
        setValue("status", productServiceInfo.remark);
        setValue("accessories", productServiceInfo.accessories);
      }

      if (techServiceFeeInfo) {
        setValue("tech_type", "");
        setTechType("");
        setSearchTechData({
          label: techServiceFeeInfo.tech_name ?? "",
          value: techServiceFeeInfo.tech_id ?? "",
        });
        setValue("payment_type", techServiceFeeInfo.payment_type);
        setPaymentType(techServiceFeeInfo.payment_type);
        setValue("wages", techServiceFeeInfo.wages);
      }
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deletePartnerJobsService(id);
      toast({
        title: "สำเร็จแล้ว",
        description: "ลบข้อมูลใบงานเรียบร้อยแล้ว",
        variant: "success",
        className: "w-[300px] mx-auto",
      });
      navigate("/manage-task/all-tasks");
    } catch (error) {
      console.log("error : ", error);
      toast({
        title: "ไม่สำเร็จ",
        description: "ไม่สามารถลบใบงานนี้ได้เนื่องจากมีนัดหมายลูกค้าแล้ว",
        variant: "fail",
        className: "w-[328px] mx-auto",
      });
    }
  };

  const confirmDeleteJob = () => {
    openModalWarning(
      IconWaringColor,
      "ยืนยีนลบใบงาน",
      `${jobData?.job_info.job_code} : ${jobData?.product_service_info?.job_type}${jobData?.product_service_info?.product}`,
      "ยกเลิก",
      () => {
        closeModalWarning();
      },
      "ยืนยัน",
      () => {
        closeModalWarning();
        handleDeleteJob(job_id);
      }
    );
  };

  useEffect(() => {
    if (
      STATE_STATUS_MANAGE_USER.GET === statusType ||
      STATE_STATUS_MANAGE_USER.UPDATE === statusType
    ) {
      jobDetail(job_id);
    }
  }, []);

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-end">
            {STATE_STATUS_MANAGE_USER.CREATE === statusType && (
              <p className="font-bold text-[16px]">สร้างใบงานใหม่</p>
            )}
            {STATE_STATUS_MANAGE_USER.GET === statusType && (
              <div className="flex items-center gap-1">
                <img
                  src={IconBack}
                  className="w-[20px] h-[20px] cursor-pointer"
                  alt="icon back"
                  onClick={() => navigate("/manage-task/all-tasks")}
                />
                <p className="font-bold text-[16px]">รายละเอียดใบงาน</p>
              </div>
            )}
            {STATE_STATUS_MANAGE_USER.UPDATE === statusType && (
              <p className="font-bold text-[16px]">แก้ไขข้อมูลใบงาน</p>
            )}
            {STATE_STATUS_MANAGE_USER.CREATE === statusType && (
              <div className="flex items-center gap-4">
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => navigate("/manage-task/all-tasks")}
                >
                  <span className="text-[16px]">ย้อนกลับ</span>
                </Button>
                <Button disabled={disabledButton}>
                  <span className="text-[16px]">สร้างใบงาน</span>
                </Button>
              </div>
            )}

            {STATE_STATUS_MANAGE_USER.GET === statusType && (
              <div className="flex items-center gap-4">
                <Button
                  variant={"outline"}
                  onClick={() => confirmDeleteJob()}
                  className="w-[128px]"
                  type="button"
                >
                  <img
                    src={IconDeleteJob}
                    className="w-[20px] h-[20px]"
                    alt="icon delete"
                  />
                  <span className="text-[16px]">ลบใบงาน</span>
                </Button>
                <Button
                  variant={"outline"}
                  type="button"
                  className="w-[176px]"
                  onClick={() =>
                    navigate(`/manage-task/all-tasks/edit-task/${job_id}`)
                  }
                >
                  <img
                    src={IconEditJob}
                    className="w-[20px] h-[20px]"
                    alt="icon edit"
                  />
                  <span className="text-[16px]">แก้ไขข้อมูลใบงาน</span>
                </Button>
              </div>
            )}
            {STATE_STATUS_MANAGE_USER.UPDATE === statusType && (
              <div className="flex items-center gap-4">
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() =>
                    navigate(`/manage-task/all-tasks/detail-task/${job_id}`)
                  }
                >
                  <span className="text-[16px]">ยกเลิก</span>
                </Button>
                <Button disabled={disabledButton}>
                  <span className="text-[16px]">บันทึก</span>
                </Button>
              </div>
            )}
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
              <div className="flex justify-between items-center">
                <p className="text-[16] font-bold">ข้อมูลใบงาน</p>
                {statusType !== STATE_STATUS_MANAGE_USER.GET && (
                  <Button
                    variant={"link"}
                    className="w-fit p-0"
                    type="button"
                    onClick={() => setIsOpenOldUser(true)}
                  >
                    ค้นหาจากข้อมูลลูกค้าเก่า
                  </Button>
                )}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <CustomInput
                  name="full_name"
                  label="ชื่อ - นามสกุล"
                  placeholder="ชื่อ - นามสกุล"
                  required
                  disabled={disabledFields}
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
                  disabled={disabledFields}
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
                  disabled={disabledFields}
                  placeholder="เบอร์โทรศัพท์ (สำรอง)"
                  register={register("mobile_number_secondary", {
                    required: "กรุณาระบุเบอร์โทรศัพท์ (สำรอง)",
                  })}
                />
                <DatePicker
                  name="appointment_date"
                  label="วันที่นัดหมาย"
                  classInput="text-[16px]"
                  defaultValue={appointmentDate}
                  required
                  disabledPicker={disabledFields}
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
                  value={appointmentTime}
                  setValue={setAppointmentTime}
                  disabled={disabledFields}
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
                  disabled={disabledFields}
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
                    disabled={disabledFields}
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
                    disabled={disabledFields}
                    error={errors.additional_information?.message}
                    register={register("additional_information", {
                      required: "กรุณาระบุจุดที่ต้องการเข้าให้บริการ",
                    })}
                  />
                </div>
                <CustomInput
                  name="distance"
                  label="ระยะทาง"
                  type="number"
                  placeholder="กรอกข้อมูล"
                  required
                  disabled={disabledFields}
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
                    value={jobType}
                    setValue={setJobType}
                    disabled={disabledFields}
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
                    value={product}
                    setValue={setProduct}
                    disabled={disabledFields}
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
                    value={productType}
                    setValue={setProductType}
                    error={errors.product_type?.message}
                    options={PRODUCT_TYPE_OPTION}
                    disabled={disabledFields}
                    register={register("product_type", {
                      required: "กรุณาเลือกประเภทสินค้า",
                    })}
                  />
                  <CustomSelect
                    name="product_model"
                    label="รุ่นสินค้า"
                    placeholder="เลือกรุ่นสินค้า"
                    className="[&>span]:text-[16px]"
                    value={productModel}
                    setValue={setProductModel}
                    options={PRODUCT_MODAL_OPTION}
                    disabled={disabledFields}
                    register={register("product_model")}
                  />
                  <CustomSelect
                    name="product_brand"
                    label="ยี่ห้อหรือแบรนด์สินค้า"
                    placeholder="เลือกยี่ห้อหรือแบรนด์สินค้า"
                    required
                    className="[&>span]:text-[16px]"
                    value={productBrand}
                    setValue={setProductBrand}
                    error={errors.product_brand?.message}
                    options={PRODUCT_BRAND_OPTION}
                    disabled={disabledFields}
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
                    disabled={disabledFields}
                    register={register("serial_number", {
                      required: "กรุณาระบุหมายเลขสินค้า",
                    })}
                  />
                  <CustomSelect
                    name="product_unit"
                    label="หน่วย"
                    placeholder="เลือกหน่วย"
                    className="[&>span]:text-[16px]"
                    value={productUnit}
                    setValue={setProductUnit}
                    disabled={disabledFields}
                    options={PRODUCT_UNIT_OPTION}
                    register={register("product_unit")}
                  />
                  <CustomSelect
                    name="status"
                    label="สถานะ / เหตุผล"
                    placeholder="เลือกสถานะ / เหตุผล"
                    className="[&>span]:text-[16px]"
                    value={jobStatus}
                    setValue={setJobStatus}
                    options={STATUS_JOB_OPTION}
                    disabled={disabledFields}
                    register={register("status")}
                  />
                  <CustomInput
                    name="remark"
                    label="หมายเหตุ"
                    placeholder="ระบุหมายเหตุ"
                    disabled={disabledFields}
                    register={register("remark")}
                  />
                  <CustomInput
                    name="accessories"
                    label="อุปกรณ์เสริม"
                    placeholder="ระบุอุปกรณ์เสริม"
                    disabled={disabledFields}
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
                    value={techType}
                    setValue={setTechType}
                    options={TECH_TYPE_OPTION}
                    register={register("tech_type")}
                    disabled={disabledFields}
                  />
                  <CustomSelectInput
                    label="ช่าง"
                    valueSearch={searchTech}
                    setValueSearch={setSearchTech}
                    value={searchTechData}
                    setValue={setSearchTechData}
                    placeholder="ค้นหา"
                    placeholderSearch="ค้นหาช่าง"
                    option={techDataList}
                    icon={IconSearch}
                    disabled={disabledFields}
                  />
                  <CustomSelect
                    name="payment_type"
                    label="ประเภทการเก็บเงิน"
                    placeholder="เลือกประเภทการเก็บเงิน"
                    className="[&>span]:text-[16px]"
                    value={paymentType}
                    setValue={setPaymentType}
                    options={PAYMENT_TYPE_OPTION}
                    register={register("payment_type")}
                    disabled={disabledFields}
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
                    disabled={disabledFields}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </SidebarLayout>
      <ModalInputSearch
        isOpen={isOpenOldUser}
        setIsOpen={setIsOpenOldUser}
        title="ค้นหาข้อมูลลูกค้าเก่า"
        label="ค้นหา"
        placeholder="ค้นหา"
        value={oldUserData}
        setValue={setOldUserData}
      />
    </>
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

const NewTaskPageWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTaskPage);

export default NewTaskPageWithConnect;
