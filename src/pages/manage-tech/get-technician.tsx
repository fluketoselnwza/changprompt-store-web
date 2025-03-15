import React from "react";
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
import IconEdit from "@/assets/icons/icon-edit-user.png";
import IconUnlock from "@/assets/icons/icon-unlock.png";
import IconDelete from "@/assets/icons/icon-delete-job.png";

type Inputs = {
  full_name: string;
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
  const { job_id = "" } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const confirmUpdateTech = () => {};

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
              <Button className="w-[125px]" variant={"outline"} type="button">
                <div className="flex items-center gap-2">
                  <img
                    src={IconDelete}
                    alt="icon edit"
                    className="w-[20px] h-[20px]"
                  />
                  <span>ลบข้อมูล</span>
                </div>
              </Button>
              <Button className="w-[157px]" variant={"outline"} type="button">
                <div className="flex items-center gap-2">
                  <img
                    src={IconUnlock}
                    alt="icon edit"
                    className="w-[20px] h-[20px]"
                  />
                  <span>เปิดการใช้งาน</span>
                </div>
              </Button>
              <Button className="w-[136px]" variant={"outline"} type="button">
                <div className="flex items-center gap-2">
                  <img
                    src={IconEdit}
                    alt="icon edit"
                    className="w-[20px] h-[20px]"
                  />
                  <span>แก้ไขข้อมูล</span>
                </div>
              </Button>
            </div>
          </div>
          <div className="bg-white px-[16px] py-[28px] mt-[24px] rounded-[8px]"></div>
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
