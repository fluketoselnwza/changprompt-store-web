import React, { useEffect, useState } from "react";
import SidebarLayout from "../sidebar-layout";
import { useForm } from "react-hook-form";
import IconHome from "@/assets/icons/icon-home.png";
import {
  getPartnerProfileService,
  updatePartnerProfileService,
} from "@/services/profile";
import { IPartnerProfileResponse } from "@/services/interfaces";
import {
  CustomInput,
  CustomSelect,
  CustomSelectInput,
  CardAuthen,
  CustomInputIcon,
  UploadMultiFile,
} from "../components";
import { ISelectData } from "../interface";
import { getAddressService } from "@/services/address";
import ImageIdCardWithSelfie from "@/assets/images/img-idcard-with-selfie.png";
import ImageIdCard from "@/assets/images/img-idcard.png";
import ImageBookBank from "@/assets/images/img-book-bank.png";
import { getBookbankService } from "@/services/info-data";
import { Button } from "@/components/ui/button";
import IconDelete from "@/assets/icons/icon-delete-image.png";
import { removeIndex } from "@/lib/utils";
import { IFileItemState } from "../components/interface";
import { STATUS_VERIFACATION_JOB } from "../data/status-code";
import { connect } from "react-redux";
import { IPageProps } from "@/pages/interface";
import {
  openModalWarning,
  closeModalWarning,
} from "@/redux/modal-warning/action";
import { Dispatch } from "redux";
import { useToast } from "@/hooks/use-toast";
import IconWarning from "@/assets/icons/icon-warning.png";
import { useNavigate } from "react-router";
import { STATE_STATUS_MANAGE_USER } from "../data/status-code";
import IconEditTask from "@/assets/icons/icon-edit-task-white.png";
import IconBack from "@/assets/icons/icon-back.png";

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
  training_history: string;
};

interface IGetStorePageProps extends IPageProps {
  statusType: "GET" | "CREATE" | "UPDATE" | "";
}

const GetStorePage: React.FC<IGetStorePageProps> = (props) => {
  const { openModalWarning, closeModalWarning, statusType = "" } = props;
  const navigate = useNavigate();
  const { toast, dismiss } = useToast();

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

  const [businessCertificateFile, setbusinessCertificateFile] = useState<
    IFileItemState[]
  >([]);

  const [trainingCertificateFile, setTrainingCertificateFile] = useState<
    IFileItemState[]
  >([]);

  const [addressId, setAddressId] = useState<string>("");
  const [bankId, setBankId] = useState<string>("");
  const [itemDelete, setItemDelete] = useState<string[]>([]);

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

  const getProfile = async () => {
    const result = await getPartnerProfileService();

    console.log("result ---*", result);
    if (result) {
      const generalInfo = result?.general_info;
      const ownerInfo = result?.owner_info;
      const businessVerificationDocuments =
        result?.business_verification_documents;
      const trainingInfo = result?.training_info;

      setProfileData(result);
      if (generalInfo) {
        setValue("business_name", generalInfo.business_name);
        setValue("business_model", generalInfo.business_model);
        setValue("owner_name", generalInfo.owner_name);
        setValue("mobile_number", generalInfo.mobile_number);
        setValue("mobile_spare", generalInfo.mobile_spare);
        setValue("email", generalInfo.email);
        setValue("address_name", generalInfo.address.address);
        setAddressId(generalInfo.address.id);
        setFullAddress({
          label: generalInfo.address.full_address ?? "",
          value: generalInfo.address.full_address_code ?? "",
        });
      }
      if (ownerInfo) {
        setValue("id_card_number", ownerInfo.id_card_number);
        setValue("account_number", ownerInfo.account_number);
        setValue("bank_code", ownerInfo.bank_code);
        setBankCode(ownerInfo.bank_code);
        setBankId(ownerInfo.bank_id);
        if (ownerInfo?.files?.length) {
          const idCardPreview = ownerInfo.files.find(
            (item) => item.file_group === "ID_CARD_PHOTO"
          );
          const selfiePreview = ownerInfo.files.find(
            (item) => item.file_group === "ID_CARD_WITH_SELFIE"
          );
          const bookbankPreview = ownerInfo.files.find(
            (item) => item.file_group === "BANK_BOOK"
          );

          setImagePreviewIdCard(idCardPreview?.file_path ?? null);
          setImagePreviewIdCardWithSelfie(selfiePreview?.file_path ?? null);
          setImagePreviewBookBank(bookbankPreview?.file_path ?? null);
        }
      }
      if (businessVerificationDocuments?.files?.length) {
        const result = businessVerificationDocuments.files
          .filter((item) => item.file_group === "TAX_CERTIFICATE")
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
        setbusinessCertificateFile(result);
      }

      if (trainingInfo?.files?.length) {
        const result = trainingInfo.files
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
        setTrainingCertificateFile(result);

        const trainingDetails = trainingInfo?.training_details?.length
          ? trainingInfo.training_details
          : [];
        setTrainingHistory(trainingDetails);
      }
    }
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

  const handleRemoveSkill = (index: number) => {
    const newArr = removeIndex(trainingHistory, index);

    setTrainingHistory(newArr);
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

  const onSubmit = async (data: Inputs) => {
    console.log("submittt");
    try {
      const resData = {
        general_info: {
          business_name: data.business_name,
          business_model: data.business_model,
          owner_name: data.owner_name,
          mobile_number: data.mobile_number,
          mobile_spare: data.mobile_spare,
          email: data.email,
          address_id: addressId,
          address_name: data.address_name,
          address_full_code: fullAddress.value,
        },
        owner_info: {
          id_card_number: data.id_card_number,
          account_number: data.account_number,
          bank_id: bankId,
          bank_code: bankCode,
        },
        training_info: {
          training_details: trainingHistory,
        },
      };

      const formData = new FormData();

      console.log("imageIdCardFile => ", imageIdCardFile);

      if (imageIdCardFile) {
        formData.append("id_card_photo", imageIdCardFile);
      }
      if (imageIdCardWithSelfieFile) {
        formData.append("id_card_with_selfie", imageIdCardWithSelfieFile);
      }
      if (imageBookBankFile) {
        formData.append("bank_book", imageBookBankFile);
      }

      const trainingCertificate = trainingCertificateFile?.filter(
        (item) => item.fileData?.type !== "GET"
      );

      if (trainingCertificate.length) {
        const fileData = trainingCertificate;
        for (let i = 0; i < fileData.length; i++) {
          formData.append("training_certificate", fileData[i].fileData);
        }
      }

      const businessCertificate = businessCertificateFile?.filter(
        (item) => item.fileData?.type !== "GET"
      );

      if (businessCertificate.length) {
        const fileData = businessCertificate;
        for (let i = 0; i < fileData.length; i++) {
          formData.append("tax_certificate", fileData[i].fileData);
        }
      }

      if (data) {
        const objectData = JSON.stringify(resData);
        formData.append("data", objectData);
      }

      if (itemDelete?.length) {
        const itemData = itemDelete;
        for (let i = 0; i < itemData.length; i++) {
          formData.append("file_deletion", itemData[i]);
        }
      }

      await updatePartnerProfileService(formData);
      const { id } = toast({
        title: "สำเร็จแล้ว",
        description: "อัปเดทข้อมูลสำเร็จแล้ว",
        variant: "success",
        className: "w-[300px] mx-auto",
        duration: 3000,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      dismiss(id);
      navigate("/manage-store/get-store");
    } catch (error) {
      console.log("error => ", error);
      toast({
        title: "ไม่สำเร็จ",
        description: "อัปเดทข้อมูลไม่สำเร็จแล้ว",
        variant: "fail",
        className: "w-[300px] mx-auto",
      });
    }
  };

  const confirmUpdateStore = (data: Inputs) => {
    openModalWarning(
      IconWarning,
      "คุณต้องการอัพเดทข้อมูลร้านค้าเพื่อขออนุมัติอีกครั้ง",
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

  const handleDeleteItem = async (id: string) => {
    console.log("id ==> ", id);

    let itemArray = [];

    itemArray = [...itemDelete, id];

    console.log("itemArray ==> ", itemArray);

    setItemDelete(itemArray);
  };

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <form onSubmit={handleSubmit(confirmUpdateStore)}>
          <div className="flex items-end justify-between">
            {STATE_STATUS_MANAGE_USER.UPDATE === statusType && (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => navigate("/manage-store/get-store")}
              >
                <img
                  src={IconBack}
                  className="w-[20px] h-[20px] cursor-pointer"
                  alt="icon back"
                />
                <p className="font-bold text-[16px]">แก้ไขข้อมูลร้านค้า</p>
              </div>
            )}
            {STATE_STATUS_MANAGE_USER.GET === statusType && (
              <p className="font-bold text-[16px]">ข้อมูลร้านค้า</p>
            )}
            {STATE_STATUS_MANAGE_USER.UPDATE === statusType ? (
              <div className="flex gap-4">
                <Button
                  className="w-[84px]"
                  variant={"outline"}
                  type="button"
                  onClick={() => navigate("/manage-store/get-store")}
                >
                  ย้อนกลับ
                </Button>
                <Button className="w-[84px]">อัปเดต</Button>
              </div>
            ) : (
              <Button
                className="w-[176px]"
                type="button"
                onClick={() => navigate("/manage-store/update-store")}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={IconEditTask}
                    alt="icon edit"
                    className="w-[20px] h-[20px]"
                  />
                  <span>แก้ไขข้อมูลใบงาน</span>
                </div>
              </Button>
            )}
          </div>
          <div className="bg-white px-[16px] py-[28px] mt-[24px] rounded-[8px]">
            <div className="flex justify-between items-center">
              <p className="font-bold text-[16px]">ข้อมูลทั่วไป</p>
              {getProfileData?.verification_status ===
                STATUS_VERIFACATION_JOB.WAITING && (
                <div className="flex items-center gap-2">
                  <div className="bg-[#FFCD42] w-[10px] h-[10px] rounded-full"></div>
                  <p className="text-[#374257]">
                    อยู่ระหว่างตรวจสอบข้อมูลและเอกสาร
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-6">
              <CustomInput
                name="business_name"
                label="ชื่อสถานประกอบการ"
                placeholder="กรอกชื่อสถานประกอบการ"
                disabled={disabledFields}
                register={register("business_name", {
                  required: "กรุณาระบุชื่อสถานประกอบการ",
                })}
              />
              <CustomInput
                name="business_model"
                label="รูปแบบธุรกิจ"
                placeholder="กรอกรูปแบบธุรกิจ"
                disabled={disabledFields}
                register={register("business_model", {
                  required: "กรุณาระบุรูปแบบธุรกิจ",
                })}
              />
              <CustomInput
                name="owner_name"
                label="ชื่อ - สกุล เจ้าของกิจการ"
                placeholder="กรอกชื่อ - สกุล เจ้าของกิจการ"
                disabled={disabledFields}
                register={register("owner_name", {
                  required: "กรุณาระบุชื่อ - สกุล เจ้าของกิจการ",
                })}
              />
              <CustomInput
                name="mobile_number"
                label="เบอร์"
                placeholder="กรอกเบอร์"
                maxLength={10}
                disabled={disabledFields}
                register={register("mobile_number", {
                  required: "กรุณาระบุเบอร์",
                })}
              />
              <CustomInput
                name="mobile_spare"
                label="เบอร์สำรอง"
                maxLength={10}
                disabled={disabledFields}
                placeholder="กรอกเบอร์สำรอง"
                register={register("mobile_spare")}
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
              <div className="col-span-2">
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
                    disabled={disabledFields}
                    error={errors.id_card_number?.message}
                    register={register("id_card_number", {
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
                    name="account_number"
                    label="เลขบัญชี"
                    placeholder="กรอกเลขบัญชี"
                    required
                    disabled={disabledFields}
                    error={errors.account_number?.message}
                    register={register("account_number", {
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
              <p className="font-bold text-[16px]">
                เอกสารรับรองการเปิดกิจการ (ภพ20หรือหนังสือรับรองห้าง)
              </p>
              <div className="mt-3">
                <UploadMultiFile
                  label={disabledFields ? "" : "อัปโหลด"}
                  id="image-upload-business-file"
                  fileItem={businessCertificateFile}
                  setFileItem={setbusinessCertificateFile}
                  setDeleteItem={handleDeleteItem}
                  disabled={disabledFields}
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
                            iconRight={IconDelete}
                            readOnly
                            classIcon="w-[24px] h-[24px]"
                            classBorderInput="bg-gray-50"
                            rightOnclick={() => handleRemoveSkill(index)}
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

const GetStorePageWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetStorePage);

export default GetStorePageWithConnect;
