import WelcomeImage from "@/assets/images/welcome.png";
import { Button } from "@/components/ui/button";
import { CustomInput } from "./components";

const LoginPage = () => {
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
            />
          </div>
          <div className="w-full">
            <CustomInput
              name="password"
              label="รหัสผ่าน"
              type="password"
              placeholder="รหัสผ่าน"
            />
          </div>
          <Button className="w-full rounded-[14px]">เข้าสู่ระบบ</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
