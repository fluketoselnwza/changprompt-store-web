import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ICustomPopoverProps {
  icon?: string;
  classPopOver?: string;
  itemPopOver: {
    icon?: string;
    label: string;
    onClick: (value?: string) => void;
  }[];
}

const CustomPopover: React.FC<ICustomPopoverProps> = ({
  icon,
  classPopOver,
  itemPopOver,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        {icon && (
          <img
            src={icon}
            className="w-[20px] h-[20px] mx-auto"
            alt="icon sub menu"
          />
        )}
      </PopoverTrigger>
      <PopoverContent
        className={cn("absolute right-[-12px] p-0", classPopOver)}
      >
        {itemPopOver?.map((item, index) => (
          <div
            className="h-[45px] flex items-center cursor-pointer gap-x-3 px-4"
            key={index}
            onClick={() => (item?.onClick ? item.onClick : "")}
          >
            {item?.icon && (
              <img src={item.icon} className="w-[18px] h-[18px]" alt="icon" />
            )}
            <span className="text-[#374151]">{item.label}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
