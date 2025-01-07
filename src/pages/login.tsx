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
      navigate("/");
      setErrorMsg("");
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
    <div className="grid grid-cols-2 h-screen p-4">
      <div className="bg-primary h-full rounded-[20px] flex flex-col items-center justify-center gap-20">
        <div className="font-semibold text-white text-[40px] leading-[54px] text-center">
          <p>Welcome back!</p>
          <p>Please sign in to your</p>
          <p>Changprompt account</p>
          <p className="border-b-2 w-1/2 mt-3"></p>
        </div>
        <div>
          <img
            src={WelcomeImage}
            width={325}
            height={230}
            style={{ objectFit: "contain" }}
            alt="welcome image"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-14 gap-12">
        <div className="flex gap-2 items-center">
          <img
            src={"/icon-changprompt.svg"}
            width={32}
            height={32}
            style={{ objectFit: "contain" }}
            alt="logo changprompt"
          />
          <span className="font-semibold text-3xl">CHANGPROMPT</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="bg-white w-full shadow-md rounded-[30px] flex flex-col items-center justify-center p-12 gap-5">
            <p className="font-bold text-2xl">เข้าสู่ระบบจัดการข้อมูลร้านค้า</p>
            <p className="text-[#A0A0A0]">
              Welcome back! Please enter your datails
            </p>
            <div className="w-full">
              <CustomInput
                name="phoneNumber"
                label="เบอร์โทรศัพท์"
                placeholder="กรอกเบอร์โทรศัพท์"
                register={register("phoneNumber")}
              />
            </div>
            <div className="w-full">
              <CustomInputIcon
                name="password"
                label="รหัสผ่าน"
                type={closePassword ? "password" : "text"}
                placeholder="รหัสผ่าน"
                register={register("password")}
                iconRight={CloseEyeIcon}
                rightOnclick={() => setClosePassword(!closePassword)}
              />
            </div>
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}
            <Button className="w-full rounded-[14px]">เข้าสู่ระบบ</Button>
            <Button
              variant={"link"}
              type="button"
              onClick={() => onForgetPassword()}
            >
              <p>ลืมรหัสผ่าน ?</p>
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
