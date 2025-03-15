import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IPageProps } from "@/pages/interface";
import {
  openModalWarning,
  closeModalWarning,
} from "@/redux/modal-warning/action";
import { Dispatch } from "redux";
import { useForm } from "react-hook-form";
import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import { useNavigate, useParams } from "react-router";
import IconBack from "@/assets/icons/icon-back.png";
import { Button } from "@/components/ui/button";
// import IconEdit from "@/assets/icons/icon-edit-user.png";
import IconUnlock from "@/assets/icons/icon-unlock.png";
import IconDelete from "@/assets/icons/icon-delete-job.png";
import {
  activeTechProfileService,
  deleteTechProfileService,
  getTechProfileService,
} from "@/services/tech";
import { ITechProfileResponse } from "@/services/interfaces";
import {
  CustomInput,
  CustomSelect,
  DatePicker,
  CardAuthen,
  UploadMultiFile,
  CustomInputIcon,
  CustomSelectInput,
} from "../components";
import { ISelectData } from "../interface";
import { IFileItemState } from "../components/interface";
import ImageIdCardWithSelfie from "@/assets/images/img-idcard-with-selfie.png";
import ImageIdCard from "@/assets/images/img-idcard.png";
import ImageBookBank from "@/assets/images/img-book-bank.png";
import { EDUCATIONAL_OPTION } from "../data/option-data";
import { getAddressService } from "@/services/address";
import { STATE_STATUS_MANAGE_USER } from "../data/status-code";
import { formatStringtoDate } from "@/lib/format";
import { getBookbankService } from "@/services/info-data";
import IconDeleteModal from "@/assets/icons/icon-delete-tech.png";
import IconWarning from "@/assets/icons/icon-warning-blue.png";
import { useToast } from "@/hooks/use-toast";

type Inputs = {
  full_name: string;
  pre_name: string;
  national_id: string;
  nick_name: string;
  birth_date: Date;
  email: string;
  mobile_number: string;
  mobile_spare: string;
  mobile_contact: string;
  joined_date: string;
  address_name: string;
  bank_account: string;
  bank_code: string;
  training_history: string;
  education_level: string;
};

const breadcrumbs = [
  {
    label: "จัดการงาน",
    link: "",
    icon: IconHome,
  },
  {
    label: "รายการสมัครช่าง",
    link: "",
    icon: "",
  },
  {
    label: "ข้อมูลส่วนตัวช่าง",
    link: "",
    icon: "",
  },
];

interface IGetTechnicianPageProps extends IPageProps {
  statusType: "GET" | "CREATE" | "UPDATE" | "";
}

const GetTechnicianPage: React.FC<IGetTechnicianPageProps> = (props) => {
  console.log("props", props);
  const { openModalWarning, closeModalWarning, statusType = "" } = props;

  const { toast, dismiss } = useToast();

  const { tech_id = "" } = useParams();
  const navigate = useNavigate();
  const [getProfileDetail, setProfileDetail] = useState<ITechProfileResponse>();
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [bankCode, setBankCode] = useState<string>("");
  const [bookbankData, setBookbankData] = useState<ISelectData[]>([]);
  const [trainingHistory, setTrainingHistory] = useState<string[]>([]);
  const [imagePreviewIdCardWithSelfie, setImagePreviewIdCardWithSelfie] =
    useState<string | null>(null);
  const [imageIdCardWithSelfieFile, setImageIdCardWithSelfieFile] = useState<
    File | undefined
  >();
  const [imagePreviewIdCard, setImagePreviewIdCard] = useState<string | null>(
    null
  );
  const [imageIdCardFile, setImageIdCardFile] = useState<File | undefined>();
  const [imagePreviewBookBank, setImagePreviewBookBank] = useState<
    string | null
  >(null);
  const [imageBookBankFile, setImageBookBankFile] = useState<
    File | undefined
  >();

  const [trainingCertificateFile, setTrainingCertificateFile] = useState<
    IFileItemState[]
  >([]);
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [fullAddress, setFullAddress] = useState<ISelectData>({
    label: "",
    value: "",
  });
  const [debouncedQueryAddress, setDebouncedQueryAddress] =
    useState<string>(searchAddress);
  const [addressDataList, setAddressDataList] = useState<ISelectData[]>([]);

  // const [addressId, setAddressId] = useState<string>("");
  // const [bankId, setBankId] = useState<string>("");
  const [itemDelete, setItemDelete] = useState<string[]>([]);
  const [educationLevel, setEducationLevel] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const disabledFields = STATE_STATUS_MANAGE_USER.GET === statusType;

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

  const getTechDetail = async (techId: string) => {
    console.log("jobId ===> ", techId);
    const result = await getTechProfileService(techId);

    console.log("result ==> ", result);
    if (result) {
      setProfileDetail(result);
      setValue("full_name", result.first_name + " " + result.last_name);
      setValue("birth_date", formatStringtoDate(result.birth_date));
      setValue("nick_name", result.nick_name);
      setValue("email", result.email);
      setValue("mobile_number", result.mobile_number);
      setValue("mobile_spare", result.mobile_spare);
      setValue("mobile_contact", result.mobile_contact);
      setValue("national_id", result.national_id);
      setValue("bank_account", result.bank.bank_account);
      setValue("bank_code", result.bank.bank_code);
      setIsActive(true);
      setBankCode(result.bank.bank_code);
      setBirthDate(formatStringtoDate(result.birth_date));
      if (result?.files?.length) {
        const idCardPreview = result.files.find(
          (item) => item.file_group === "ID_CARD_PHOTO"
        );
        const selfiePreview = result.files.find(
          (item) => item.file_group === "ID_CARD_WITH_SELFIE"
        );
        const bookbankPreview = result.files.find(
          (item) => item.file_group === "BANK_BOOK"
        );

        setImagePreviewIdCard(idCardPreview?.file_path ?? null);
        setImagePreviewIdCardWithSelfie(selfiePreview?.file_path ?? null);
        setImagePreviewBookBank(bookbankPreview?.file_path ?? null);

        const traningCertificatePreview = result.files
          .filter((item) => item.file_group === "TRAINING_CERTIFICATE")
          .map((item) => {
            return {
              fileUrl: item.file_path,
              fileData: {
                name: item.file_name,
                size: 100000,
                type: "GET",
              },
              id: item.id,
            };
          });

        console.log("result file => ", result);
        setTrainingCertificateFile(traningCertificatePreview);
      }
      setValue("education_level", result.skill.education_level);
      setEducationLevel(result?.skill?.education_level);

      const trainingDetails = result?.skill?.training_experience?.length
        ? result.skill.training_experience
        : [];
      setTrainingHistory(trainingDetails);
    }
  };

  useEffect(() => {
    console.log("imageIdCardWithSelfieFile : ", imageIdCardWithSelfieFile);
    console.log("imageIdCardFile : ", imageIdCardFile);
    console.log("imageBookBankFile : ", imageBookBankFile);
    getTechDetail(tech_id);
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

  const confirmUpdateTech = () => {};

  const handleDeleteItem = async (id: string) => {
    console.log("id ==> ", id);

    let itemArray = [];

    itemArray = [...itemDelete, id];

    console.log("itemArray ==> ", itemArray);

    setItemDelete(itemArray);
  };

  const handleAddSkill = () => {
    const value = getValues("training_history");

    if (value.trim() !== "") {
      setTrainingHistory([...trainingHistory, value]);
      setValue("training_history", "");
      console.log("trainingHistory : ", trainingHistory);
    }
  };

  const handleClearSkill = () => {
    setValue("training_history", "");
  };

  const handleDeleteTech = async (techId: string) => {
    try {
      await deleteTechProfileService(techId);
      const { id } = toast({
        title: "สำเร็จแล้ว",
        description: "ลบข้อมูลช่างเรียบร้อยแล้ว",
        variant: "success",
        className: "w-[300px] mx-auto",
        duration: 3000,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      dismiss(id);
      navigate("/manage-tech/all-technician");
    } catch (error) {
      console.log("error : ", error);
      toast({
        title: "ไม่สำเร็จ",
        description: "เกิดข้อผิดพลาด",
        variant: "fail",
        className: "w-[300px] mx-auto",
      });
    }
  };

  const confirmDeleteTech = (data?: ITechProfileResponse) => {
    console.log("data user :", data);
    openModalWarning(
      IconDeleteModal,
      "คุณต้องการลบข้อมูลช่าง",
      `${data?.tech_code} : ${data?.first_name} ${data?.last_name}`,
      "ยกเลิก",
      () => {
        closeModalWarning();
      },
      "ยืนยัน",
      () => {
        closeModalWarning();
        handleDeleteTech(tech_id);
      }
    );
  };

  const handleActive = async (techId: string) => {
    try {
      await activeTechProfileService(isActive, techId);
      const { id } = toast({
        title: "สำเร็จแล้ว",
        description: isActive
          ? "เปิดการใช้งานช่างเรียบร้อยแล้ว"
          : "ปิดการใช้งานช่างเรียบร้อยแล้ว",
        variant: "success",
        className: "w-[300px] mx-auto",
        duration: 3000,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      dismiss(id);
      navigate("/manage-tech/all-technician");
    } catch (error) {
      console.log("error : ", error);
      toast({
        title: "ไม่สำเร็จ",
        description: "เกิดข้อผิดพลาด",
        variant: "fail",
        className: "w-[300px] mx-auto",
      });
    }
  };

  const confirmActive = () => {
    openModalWarning(
      IconWarning,
      "คุณต้องการปิดการใช้งานช่างจากรายการที่เลือกใช่หรือไม่",
      "",
      "ยกเลิก",
      () => {
        closeModalWarning();
      },
      "ยืนยัน",
      () => {
        closeModalWarning();
        handleActive(tech_id);
      }
    );
  };

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <form onSubmit={handleSubmit(confirmUpdateTech)}>
          <div className="flex items-end justify-between">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => navigate("/manage-tech/all-technician")}
            >
              <img
                src={IconBack}
                className="w-[20px] h-[20px] cursor-pointer"
                alt="icon back"
              />
              <p className="font-bold text-[16px]">ข้อมูลส่วนตัวช่าง</p>
            </div>
            <div className="flex gap-4">
              <Button
                className="w-[125px]"
                variant={"outline"}
                type="button"
                onClick={() => confirmDeleteTech(getProfileDetail)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={IconDelete}
                    alt="icon edit"
                    className="w-[20px] h-[20px]"
                  />
                  <span>ลบข้อมูล</span>
                </div>
              </Button>
              <Button
                className="w-[157px]"
                variant={"outline"}
                type="button"
                onClick={() => confirmActive()}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={IconUnlock}
                    alt="icon edit"
                    className="w-[20px] h-[20px]"
                  />
                  <span>{isActive ? "เปิดการใช้งาน" : "ปิดการใช้งาน"}</span>
                </div>
              </Button>
              {/* <Button className="w-[136px]" variant={"outline"} type="button">
                <div className="flex items-center gap-2">
                  <img
                    src={IconEdit}
                    alt="icon edit"
                    className="w-[20px] h-[20px]"
                  />
                  <span>แก้ไขข้อมูล</span>
                </div>
              </Button> */}
            </div>
          </div>
          <div className="bg-white px-[16px] py-[28px] mt-[24px] rounded-[8px]">
            <p className="font-bold text-[16px]">ข้อมูลทั่วไป</p>
            <div className="mt-4 grid grid-cols-3 gap-6">
              <CustomInput
                name="full_name"
                label="ชื่อ - นามสกุล"
                placeholder="กรอกชื่อ - นามสกุล"
                disabled={disabledFields}
                register={register("full_name", {
                  required: "กรุณาระบุชื่อ - นามกุล",
                })}
              />
              <CustomInput
                name="nick_name"
                label="ชื่อเล่น"
                placeholder="กรอกชื่อเล่น"
                disabled={disabledFields}
                register={register("nick_name", {
                  required: "กรุณาระบุชื่อเล่น",
                })}
              />
              <DatePicker
                label="วันเดือนปีเกิด"
                name="birth_date"
                classInput="text-[14px]"
                register={register("birth_date")}
                defaultValue={birthDate}
                disabledPicker={disabledFields}
              />
              <CustomInput
                name="email"
                label="อีเมล"
                placeholder="กรอกอีเมล"
                disabled={disabledFields}
                register={register("email", {
                  required: "กรุณาระบุอีเมล",
                })}
              />
              <CustomInput
                name="mobile_number"
                label="โทรศัพท์"
                placeholder="กรอกโทรศัพท์"
                disabled={disabledFields}
                register={register("mobile_number", {
                  required: "กรุณาระบุนามสกุล",
                })}
              />
              <CustomInput
                name="mobile_spare"
                label="เบอร์โทรศัพท์ (สำรอง)"
                placeholder="กรอกเบอร์โทรศัพท์ (สำรอง)"
                disabled={disabledFields}
                register={register("mobile_spare", {
                  required: "กรุณาระบุนามสกุล",
                })}
              />
              <CustomInput
                name="mobile_contact"
                label="เบอร์มือถือบุคคลที่สามารถติดต่อได้"
                placeholder="เบอร์มือถือบุคคลที่สามารถติดต่อได้"
                disabled={disabledFields}
                register={register("mobile_contact", {
                  required: "กรุณาระบุนามสกุล",
                })}
              />
              <CustomInput
                name="address_name"
                label="ที่อยู่(ตามบัตรประชาชน) บ้านเลขที่ หมู่บ้าน ซอย ถนน"
                placeholder="กรอกที่อยู่(ตามบัตรประชาชน)"
                required
                disabled={disabledFields}
                error={errors.address_name?.message}
                register={register("address_name", {
                  required: "กรุณาระบุที่อยู่",
                })}
              />
              <CustomSelectInput
                label="ตำบล/อำเภอ/จังหวัด/รหัสไปรษณีย์"
                required
                disabled={disabledFields}
                valueSearch={searchAddress}
                setValueSearch={setSearchAddress}
                value={fullAddress}
                setValue={setFullAddress}
                placeholderSearch="ค้นหา รหัสไปรษณีย์ ตำบล อำเภอ จังหวัด"
                option={addressDataList}
              />
            </div>
            <div className="mt-[28px]">
              <p className="font-bold text-[16px]">
                ข้อมูลบัตรประจำตัวประชาชนและบัญชีธนาคารสำหรับโอนเงิน
              </p>
              <div className="mt-4 grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-4">
                  <CustomInput
                    name="national_id"
                    label="เลขที่บัตรประจำตัวประชาชน"
                    placeholder="กรอกเลขที่บัตรประจำตัวประชาชน"
                    required
                    disabled={disabledFields}
                    error={errors.national_id?.message}
                    register={register("national_id", {
                      required: "กรุณาระบุเลขที่บัตรประจำตัวประชาชน",
                    })}
                  />
                  <CardAuthen
                    id="ImageIdCardWithSelfie"
                    image={ImageIdCardWithSelfie}
                    label="ภาพภ่ายคู่กับบัตรประชาชน"
                    imagePreview={imagePreviewIdCardWithSelfie}
                    setImagePreview={setImagePreviewIdCardWithSelfie}
                    setImageFlie={setImageIdCardWithSelfieFile}
                    disabled={disabledFields}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <CustomInput
                    name="bank_account"
                    label="เลขบัญชี"
                    placeholder="กรอกเลขบัญชี"
                    required
                    disabled={disabledFields}
                    error={errors.bank_account?.message}
                    register={register("bank_account", {
                      required: "กรุณาระบุเลขบัญชี",
                    })}
                  />
                  <CardAuthen
                    id="ImageIdCard"
                    image={ImageIdCard}
                    label="ภาพบัตรประชาชน"
                    imagePreview={imagePreviewIdCard}
                    setImagePreview={setImagePreviewIdCard}
                    setImageFlie={setImageIdCardFile}
                    disabled={disabledFields}
                  />
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
                    disabled={disabledFields}
                    value={bankCode}
                    setValue={setBankCode}
                  />
                  <CardAuthen
                    id="ImageBookBank"
                    image={ImageBookBank}
                    label="ภาพภ่ายสมุดบัญชีธนาคาร"
                    imagePreview={imagePreviewBookBank}
                    setImagePreview={setImagePreviewBookBank}
                    setImageFlie={setImageBookBankFile}
                    disabled={disabledFields}
                  />
                </div>
              </div>
            </div>
            <div className="mt-[28px]">
              <p className="font-bold text-[16px]">ทักษะและข้อมูลการศึกษา</p>
              <div className="mt-3 grid grid-cols-3 gap-6">
                <CustomSelect
                  name="education_level"
                  label="วุฒิการศึกษา"
                  placeholder="เลือกวุฒิการศึกษา"
                  options={EDUCATIONAL_OPTION}
                  register={register("education_level", {
                    required: "เลือกวุฒิการศึกษา",
                  })}
                  disabled={disabledFields}
                  value={educationLevel}
                  setValue={setEducationLevel}
                />
              </div>
            </div>
            <div className="mt-[28px]">
              <p className="font-bold text-[16px]">ข้อมูลการฝึกอบรมทักษะ</p>
              <div className="mt-3">
                {!disabledFields ? (
                  <>
                    <CustomInput
                      name="training_history"
                      placeholder="กรอกเพิ่มข้อมูลการฝึกอบรมหรือทักษะ"
                      label="เพิ่มข้อมูลการฝึกอบรมหรือทักษะ"
                      register={register("training_history")}
                    />
                    <div className="flex gap-4 mt-6">
                      <Button
                        type="button"
                        className="w-[102px]"
                        onClick={() => handleAddSkill()}
                      >
                        เพิ่มทักษะ
                      </Button>
                      <Button
                        type="button"
                        variant={"outline"}
                        className="border border-red-700 text-red-700 w-[84px]"
                        onClick={() => handleClearSkill()}
                      >
                        ยกเลิก
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {trainingHistory.length > 0 ? (
                      <span className="font-medium text-[14px] text-gray-900">
                        ข้อมูลการฝึกอบรมหรือทักษะ
                      </span>
                    ) : (
                      <span className="font-medium text-[14px] text-gray-900">
                        ไม่มีข้อมูลการฝึกอบรมหรือทักษะ
                      </span>
                    )}
                  </>
                )}
                {trainingHistory.length > 0 ? (
                  <div className="mt-12">
                    {trainingHistory.map((item, index) => {
                      return (
                        <div key={index} className="mb-4">
                          <CustomInputIcon
                            name={`training_history_${index}`}
                            value={item}
                            readOnly
                            classIcon="w-[24px] h-[24px]"
                            classBorderInput="bg-gray-50"
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-[28px]">
              <p className="font-bold text-[16px]">
                เอกสารหรือใบรับรองการฝึกอบรมทักษะ
              </p>
              <div className="mt-3">
                <UploadMultiFile
                  label={disabledFields ? "" : "อัปโหลด"}
                  id="image-upload-traing-file"
                  fileItem={trainingCertificateFile}
                  setFileItem={setTrainingCertificateFile}
                  setDeleteItem={handleDeleteItem}
                  disabled={disabledFields}
                />
              </div>
            </div>
          </div>
        </form>
      </SidebarLayout>
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

const GetTechnicianPageWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetTechnicianPage);

export default GetTechnicianPageWithConnect;
