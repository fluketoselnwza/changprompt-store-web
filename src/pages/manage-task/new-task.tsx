import SidebarLayout from "../sidebar-layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import IconHome from "@/assets/icons/icon-home.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { CustomInput, CustomSelect, DatePicker } from "../components";
import { Checkbox } from "@/components/ui/checkbox";

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
  no_job: string;
  store_name: string;
  creator_name: string;
  full_name: string;
  mobile_number: string;
  mobile_spare: string;
};

const NewTaskPage = () => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data > ", data);
  };

  return (
    <>
      <SidebarLayout breadcrumbs={breadcrumbs}>
        <div className="px-8 py-4 rounded-lg">
          <div className="flex justify-between items-end">
            <p className="font-bold text-[16px]">สร้างใบงานใหม่</p>
            <div className="flex items-center gap-4">
              <Button
                variant={"outline"}
                onClick={() => navigate("/manage-task/all-tasks")}
              >
                <span className="text-[16px]">ย้อนกลับ</span>
              </Button>
              <Button variant={"outline"}>
                <span className="text-[16px]">สร้างใบงาน</span>
              </Button>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white p-4 mt-4 rounded-[8px]">
              <div>
                <p className="text-[16] font-bold">ข้อมูลใบงาน</p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <CustomInput
                    name="no_job"
                    label="เลขที่ใบงาน"
                    placeholder="เลขที่ใบงาน"
                  />
                  <CustomInput
                    name="store_name"
                    label="ชื่อร้าน"
                    placeholder="ชื่อร้าน"
                  />
                  <CustomInput
                    name="creator_name"
                    label="ผู้สร้างใบงาน"
                    placeholder="ผู้สร้างใบงาน"
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
                  />
                  <CustomInput
                    name="mobile_number"
                    label="เบอร์โทรศัพท์"
                    placeholder="เบอร์โทรศัพท์"
                    required
                  />
                  <CustomInput
                    name="mobile_spare"
                    label="เบอร์โทรศัพท์ (สำรอง)"
                    placeholder="เบอร์โทรศัพท์ (สำรอง)"
                  />
                  <DatePicker
                    name="appointment_date"
                    label="วันที่นัดหมาย"
                    required
                  />
                  <CustomSelect
                    name="appointment_time"
                    label="เวลานัดหมาย"
                    required
                    options={[
                      {
                        label: "เช้า 08:00 - 12:00",
                        value: "เช้า 08:00 - 12:00",
                      },
                      {
                        label: "บ่าย 13:00 - 17:00",
                        value: "บ่าย 13:00 - 17:00",
                      },
                    ]}
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <CustomInput
                    name="address"
                    label="ที่อยู่ บ้านเลขที่ หมู่บ้าน ซอย ถนน"
                    placeholder="กรอกข้อมูล"
                    required
                  />
                  <CustomInput
                    name="zipcode"
                    label="รหัสไปรษณีย์"
                    placeholder="กรอกข้อมูล"
                    required
                  />
                  <CustomSelect
                    name="sub_district"
                    label="ตำบล"
                    required
                    options={[]}
                  />
                  <CustomInput
                    name="district"
                    label="อำเภอ"
                    placeholder="กรอกข้อมูล"
                    required
                  />
                  <CustomInput
                    name="province"
                    label="จังหวัด"
                    placeholder="กรอกข้อมูล"
                    required
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <CustomInput
                      name="point_service"
                      label="ระบุจุดที่ต้องการเข้าให้บริการ (ชั้น ห้อง อื่นๆ)"
                      placeholder="ระบุรายละเอียดจุดให้บริการของลูกค้าให้ชัดเจนมากขึ้น เช่น บ้านชั้น 2"
                      required
                    />
                  </div>
                  <CustomInput
                    name="distance"
                    label="ระยะทาง"
                    placeholder="กรอกข้อมูล"
                    required
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
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <CustomSelect
                    name="job_type"
                    label="ประเภทงาน"
                    required
                    options={[]}
                  />
                  <CustomSelect
                    name="product"
                    label="เลือกสินค้า"
                    required
                    options={[]}
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <CustomSelect
                    name="type_technicial"
                    label="เลือกช่าง"
                    required
                    options={[]}
                  />
                  <CustomSelect
                    name="type_payment"
                    label="ประเภทการเก็บเงิน"
                    required
                    options={[]}
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <CustomInput
                    name="cost"
                    label="ค่าแรง"
                    placeholder="กรอกข้อมูล"
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </SidebarLayout>
    </>
  );
};

export default NewTaskPage;
