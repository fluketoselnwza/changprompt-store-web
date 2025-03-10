/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
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
    onClick: (data?: any) => any;
  }[];
  data?: any;
}

const CustomPopover: React.FC<ICustomPopoverProps> = ({
  icon,
  classPopOver,
  itemPopOver,
  data,
}) => {
  const [isDropdownUp, setIsDropdownUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popoverRef.current) {
      // const popoverHeight = popoverRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const popoverBottom = popoverRef.current.getBoundingClientRect().bottom;

      // If the popover goes beyond the bottom of the window, show it upwards
      if (popoverBottom > windowHeight) {
        setIsDropdownUp(true); // Show dropdown upwards
      } else {
        setIsDropdownUp(false); // Show dropdown downwards
      }
    }
  }, [isOpen]);

  const handlePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popover onOpenChange={handlePopover}>
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
        style={{ display: isOpen ? "block" : "none" }}
        ref={popoverRef}
        className={cn(
          "absolute right-[-12px] p-0",
          isDropdownUp ? "bottom-full mb-9" : "top-full mt-2",
          classPopOver
        )}
      >
        {itemPopOver?.map((item, index) => (
          <div
            className="h-[45px] flex items-center cursor-pointer gap-x-3 px-4"
            key={index}
            onClick={() => item.onClick(data)}
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
