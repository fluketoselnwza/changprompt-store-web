import { Button } from "@/components/ui/button";
import IconUser from "@/assets/icons/icon-user.png";
import IconSidebar from "@/assets/icons/icon-sidebar.png";

const HeaderBar = () => {
  const onSidebar = () => {
    console.log("onSidebar");
  };

  return (
    <div className="h-[56px] bg-white w-full fixed border-b border-[#ECECEC] z-50">
      <div className="h-full flex items-center px-[16px] justify-between">
        <div className="flex items-center justify-between w-[224px] pl-[4px] pr-[20px]">
          <div className="flex gap-2 items-center">
            <img
              src={"/icon-changprompt.svg"}
              className="w-[17px] h-[17px]"
              style={{ objectFit: "contain" }}
              alt="logo changprompt"
            />
            <span className="font-semibold text-[16px] font-[poppins]">
              CHANGPROMPT
            </span>
          </div>
          <img
            src={IconSidebar}
            className="w-[18px] h-[18px] cursor-pointer"
            alt="icon-sidebar"
            onClick={onSidebar}
          />
        </div>
        <div className="flex items-center gap-4">
          <img src={IconUser} className="w-[24px] h-[24px]" alt="icon user" />
          <span className="text-gray-700">0000000 : ร้านค้า</span>
          <div className="border-l border-[#F5F5F5] pl-4">
            <Button
              variant="outline"
              className="h-[38px] text-[14px] rounded-[8px]"
            >
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
