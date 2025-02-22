import React from "react";
import { ChevronRight } from "lucide-react";

interface ICustomBreadcrumbsProps {
  breadcrumbs: {
    label: string;
    link: string;
    icon: string;
  }[];
}

const CustomBreadcrumbs: React.FC<ICustomBreadcrumbsProps> = ({
  breadcrumbs,
}) => {
  return (
    <header className="flex bg-[#F2F4F7] h-[90px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[90px]">
      <div className="flex items-center gap-2 px-8">
        <div className="bg-white h-[45px] flex items-center px-5 rounded-[8px] gap-4">
          {breadcrumbs.map((item, index) => (
            <>
              <div className="flex items-center gap-4" key={index}>
                {item.icon && (
                  <img
                    src={item.icon}
                    className="w-[20px] h-[20px]"
                    alt="icon home"
                  />
                )}
                <span>{item.label}</span>
              </div>
              {breadcrumbs.length - 1 !== index ? (
                <ChevronRight className="w-[16px] h-[32px]" />
              ) : null}
            </>
          ))}
        </div>
      </div>
    </header>
  );
};

export default CustomBreadcrumbs;
