import React from "react";
import IconPhoto from "@/assets/icons/icon-photo.png";
import IconDowload from "@/assets/icons/icon-dowload.png";
import IconDalete from "@/assets/icons/icon-delete-image.png";

const CardFileListItem: React.FC = () => {
  return (
    <div className="border border-gray-300 rounded-[8px] h-[50px] px-[12px] flex justify-between">
      <div className="flex items-center gap-x-[16px]">
        <img src={IconPhoto} className="w-[24px] h-[24px]" alt="icon photo" />
        <span className="font-medium text-[16px]">file_name.png</span>
      </div>
      <div className="flex items-center gap-x-[16px]">
        <img
          src={IconDowload}
          className="w-[24px] h-[24px]"
          alt="icon dowload"
        />
        <img src={IconDalete} className="w-[24px] h-[24px]" alt="icon delete" />
      </div>
    </div>
  );
};

export default CardFileListItem;
