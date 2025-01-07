import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";

const HeaderBar = () => {
  return (
    <div className="h-[56px] w-full bg-white fixed border-b border-[#ECECEC]">
      <div className="h-full flex items-center px-5 justify-between">
        <div className="flex gap-2 items-center">
          <img
            src={"/icon-changprompt.svg"}
            width={17}
            height={17}
            style={{ objectFit: "contain" }}
            alt="logo changprompt"
          />
          <span className="font-semibold text-[16px]">CHANGPROMPT</span>
        </div>
        <div className="flex items-center gap-4">
          <CircleUser />
          <span>0000000 : ร้านค้า</span>
          <div className="border-l border-[#F5F5F5] pl-4">
            <Button variant="outline" className="h-[38px]">
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
