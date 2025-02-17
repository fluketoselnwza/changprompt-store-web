import WelcomeImage from "@/assets/images/welcome.png";
import { Button } from "@/components/ui/button";
import { CustomInput, CustomInputIcon } from "./components";
import CloseEyeIcon from "@/assets/icons/icon-close-eye.png";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IPageProps } from "./interface";
import {
  openModalWarning,
  closeModalWarning,
} from "@/redux/modal-warning/action";
import { openLoading, closeLoading } from "@/redux/loading/action";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import WrongPasswordIcon from "@/assets/icons/icon-wrong-password.png";
import { useNavigate } from "react-router";

type Inputs = {
  phoneNumber?: string;
  password?: string;
};

const LoginPage: React.FC<IPageProps> = (props) => {
  const { openModalWarning } = props;
  const navigate = useNavigate();
  const [closePassword, setClosePassword] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data --* ", data);

    if (data.phoneNumber && data.password) {
      setErrorMsg("");
      navigate("/manage-task/all-tasks");
    } else {
      setErrorMsg("เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  const onForgetPassword = () => {
    console.log("forgottt");
    openModalWarning(
      WrongPasswordIcon,
      "",
      "หากผู้ใช้ลืมรหัสผ่าน กรุณาติดต่อ Super Admin<enter>เพื่อรีเซ็ตรหัสผ่านใหม่สำหรับเข้าใช้งาน"
    );
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="py-[16px] pl-[16px]">
        <div className="bg-primary h-full rounded-[20px] flex flex-col items-center justify-center gap-20">
          <div className="font-semibold font-[poppins] text-white text-[40px] tablet:text-[32px] leading-[64px] tablet:leading-[51px] text-center">
            <p>Welcome back!</p>
            <p>Please sign in to your</p>
            <p>Changprompt account</p>
            <p className="border-b-2 w-[60%] mt-[8px]"></p>
          </div>
          <div>
            <img
              src={WelcomeImage}
              style={{ objectFit: "contain" }}
              alt="welcome image"
              className="w-[483px] tablet:w-[422px] h-[371px] tablet:h-[324px]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-14 gap-12">
        <div className="flex gap-[16px] items-center">
          <img
            src={"/icon-changprompt.svg"}
            style={{ objectFit: "contain" }}
            alt="logo changprompt"
            className="w-[31px] h-[31px]"
          />
          <span className="font-semibold font-[poppins] text-[30px] tablet:text-[24px]">
            CHANGPROMPT
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="bg-white w-full shadow-md rounded-[30px] flex flex-col items-center justify-center px-[66px] py-[52px] gap-5 tablet:gap-2">
            <p className="font-bold text-[28px] tablet:text-[20px]">
              เข้าสู่ระบบจัดการข้อมูลร้านค้า
            </p>
            <p className="text-[#A0A0A0] text-[20px] tablet:text-[18px]">
              Welcome back! Please enter your datails
            </p>
            <div className="w-full mt-5">
              <CustomInput
                name="phoneNumber"
                label="เบอร์โทรศัพท์"
                placeholder="กรอกเบอร์โทรศัพท์"
                register={register("phoneNumber")}
                classLabel="font-semibold"
                classInput="rounded-[8px]"
                type="number"
                maxLength={10}
              />
            </div>
            <div className="w-full mt-4">
              <CustomInputIcon
                name="password"
                label="รหัสผ่าน"
                type={closePassword ? "password" : "text"}
                placeholder="รหัสผ่าน"
                register={register("password")}
                iconRight={CloseEyeIcon}
                rightOnclick={() => setClosePassword(!closePassword)}
                classLabel="font-semibold"
                classInput="rounded-[8px]"
              />
            </div>
            {errorMsg && <p className="text-red-600 text-[14px]">{errorMsg}</p>}
            <Button className="w-full rounded-[14px] tablet:rounded-[8px] mt-4 h-[46px] text-[16px]">
              เข้าสู่ระบบ
            </Button>
            <Button
              className="mt-4 tablet:mt-2"
              variant={"link"}
              type="button"
              onClick={() => onForgetPassword()}
            >
              <p className="text-[16px] tablet:text-[14px]">ลืมรหัสผ่าน ?</p>
            </Button>
          </div>
        </form>
      </div>
    </div>
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
  openLoading: () => openLoading(dispatch),
  closeLoading: () => closeLoading(dispatch),
});

const mapStateToProps = () => ({});

const LoginPageWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default LoginPageWithConnect;
