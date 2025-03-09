import React, { useEffect, useState } from "react";
import SidebarLayout from "../sidebar-layout";
import { useForm, SubmitHandler } from "react-hook-form";
import IconHome from "@/assets/icons/icon-home.png";
import { getPartnerProfileService } from "@/services/profile";
import { IPartnerProfileResponse } from "@/services/interfaces";

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
};

const GetStorePage: React.FC = () => {
  const [getProfileData, setProfileData] = useState<IPartnerProfileResponse>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const getProfile = async () => {
    const result = await getPartnerProfileService();

    console.log("result ---*", result);
    if (result) {
      setProfileData(result);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = () => {};

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className="font-bold text-[16px]">ข้อมูลร้านค้า</p>
          </div>
          <div className="bg-white p-[16px] mt-[16px] rounded-[8px]">
            GetStorePage
          </div>
        </form>
      </SidebarLayout>
    </>
  );
};

export default GetStorePage;
