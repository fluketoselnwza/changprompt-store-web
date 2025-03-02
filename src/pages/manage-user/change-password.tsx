import React, { useState } from "react";
import SidebarLayout from "../sidebar-layout";
import IconHome from "@/assets/icons/icon-home.png";
import { useForm } from "react-hook-form";
import { CustomInputIcon } from "../components";
import CloseEyeIcon from "@/assets/icons/icon-close-eye.png";
import OpenEyeIcon from "@/assets/icons/icon-open-eye.png";
import { Button } from "@/components/ui/button";
import { validatePassword } from "@/lib/validate";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IPageProps } from "@/pages/interface";
import {
  openModalWarning,
  closeModalWarning,
} from "@/redux/modal-warning/action";
import IconWaringColor from "@/assets/icons/icon-warning-blue.png";
import { useToast } from "@/hooks/use-toast";

type Inputs = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

const breadcrumbs = [
  {
    label: "จัดการข้อมูลส่วนตัว",
    link: "",
    icon: IconHome,
  },
  {
    label: "จัดการรหัสผ่าน",
    link: "",
    icon: "",
  },
];

const ManageChangePasswordPage: React.FC<IPageProps> = (props) => {
  const { openModalWarning, closeModalWarning } = props;
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const [closeOldPassword, setCloseOldPassword] = useState<boolean>(false);
  const [closeNewPassword, setCloseNewPassword] = useState<boolean>(false);
  const [closeConfirmNewPassword, setCloseConfirmNewPassword] =
    useState<boolean>(false);

  const handleConfirmChangePassword = () => {
    console.log("handleConfirmChangePassword");
    openModalWarning(
      IconWaringColor,
      "ยันยืนการเปลี่ยนรหัสผ่านใช่หรือไม่",
      "",
      "ยกเลิก",
      () => {
        closeModalWarning();
      },
      "ยืนยัน",
      () => {
        closeModalWarning();
        toast({
          title: "สำเร็จแล้ว",
          description: "เปลี่ยนรหัสผ่านสำเร็จแล้ว",
          variant: "success",
          className: "w-[300px] mx-auto",
        });
      }
    );
  };

  const onSubmit = async (data: Inputs) => {
    console.log("data ==> ", data);
    const newPasswordError: string = validatePassword(data.new_password);
    const confirmPasswordError: string = validatePassword(
      data.confirm_new_password
    );

    if (newPasswordError) {
      setError("new_password", {
        type: "manual",
        message: newPasswordError,
      });
    }

    if (confirmPasswordError) {
      setError("confirm_new_password", {
        type: "manual",
        message: confirmPasswordError,
      });
    }

    if (data.new_password !== data.confirm_new_password) {
      setError("confirm_new_password", {
        type: "manual",
        message: "รหัสผ่านไม่ตรงกัน",
      });
    }

    if (
      newPasswordError ||
      confirmPasswordError ||
      data.new_password !== data.confirm_new_password
    ) {
      return;
    }

    handleConfirmChangePassword();
  };

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div>
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">จัดการรหัสผ่าน</p>
          </div>
          <div className="bg-white p-[33px] mt-[8px] rounded-[8px]">
            <div>
              <p className="font-bold text-[16px]">เปลี่ยนรหัสผ่าน</p>
              <p>1. มีความยาวอย่างน้อย 8 ตัวอักษร</p>
              <p>2. มีตัวอักษรอังกฤษอย่างน้อย 1 ตัว</p>
              <p>3. มีตัวเลขอย่างน้อย 1 ตัว</p>
              <p>4. มีอักขระพิเศษอย่างน้อย 1 ตัว !@#$%^&*()+=.,?</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[16px] w-[342px] mt-[16px]"
            >
              <CustomInputIcon
                name="old_password"
                label="รหัสผ่านเก่า"
                type={closeOldPassword ? "password" : "text"}
                placeholder="รหัสผ่าน"
                register={register("old_password", {
                  required: "กรุณาระบุรหัสผ่านเก่า",
                })}
                error={errors.old_password?.message}
                iconRight={closeOldPassword ? CloseEyeIcon : OpenEyeIcon}
                rightOnclick={() => setCloseOldPassword(!closeOldPassword)}
                classLabel="font-semibold"
                classBorderInput="rounded-[8px]"
              />
              <CustomInputIcon
                name="new_password"
                label="สร้างรหัสผ่านใหม่"
                type={closeNewPassword ? "password" : "text"}
                placeholder="รหัสผ่าน"
                register={register("new_password", {
                  required: "กรุณาระบุรหัสผ่านใหม่",
                })}
                error={errors.new_password?.message}
                iconRight={closeNewPassword ? CloseEyeIcon : OpenEyeIcon}
                rightOnclick={() => setCloseNewPassword(!closeNewPassword)}
                classLabel="font-semibold"
                classBorderInput="rounded-[8px]"
              />
              <CustomInputIcon
                name="confirm_new_password"
                label="ยืนยันรหัสผ่านใหม่"
                type={closeConfirmNewPassword ? "password" : "text"}
                placeholder="รหัสผ่าน"
                register={register("confirm_new_password", {
                  required: "กรุณาระบุยืนยันรหัสผ่านใหม่",
                })}
                error={errors.confirm_new_password?.message}
                iconRight={closeConfirmNewPassword ? CloseEyeIcon : OpenEyeIcon}
                rightOnclick={() =>
                  setCloseConfirmNewPassword(!closeConfirmNewPassword)
                }
                classLabel="font-semibold"
                classBorderInput="rounded-[8px]"
              />
              <div className="flex items-center justify-center mt-[22px] gap-4">
                <Button className="w-[82px]" variant={"cancel"} type="button">
                  ยกเลิก
                </Button>
                <Button className="w-[82px]">ยืนยัน</Button>
              </div>
            </form>
          </div>
        </div>
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

const ManageChangePasswordPageWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageChangePasswordPage);

export default ManageChangePasswordPageWithConnect;
