import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { ISelectData } from "../interface";

interface CustomSelectInputProps {
  label?: string;
  required?: true;
  classLabel?: string;
  placeholder?: string;
  placeholderSearch?: string;
  valueSearch: string;
  setValueSearch: (value: string) => void;
  value: ISelectData;
  setValue: (value: ISelectData) => void;
  option: ISelectData[];
  disabled?: boolean;
}

const CustomSelectInput: React.FC<CustomSelectInputProps> = (props) => {
  const {
    label,
    classLabel,
    required,
    placeholder = "เลือก",
    placeholderSearch = "ค้นหา",
    value,
    setValue,
    valueSearch,
    setValueSearch,
    option,
    disabled,
  } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [selectValue, setSelectValue] = useState<string>(valueSearch);
  const [isDropdownUp, setIsDropdownUp] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (data: ISelectData) => {
    console.log("value ===> ", value);
    // setSelectValue(data.label);
    setValue(data);
    setIsOpen(false);
  };

  useEffect(() => {
    console.log("isOpen ==> ", isOpen);
    if (dropdownRef.current) {
      const windowHeight = window.innerHeight;
      const dropdownBottom = dropdownRef.current.getBoundingClientRect().bottom;

      console.log("dropdownBottom ==> ", dropdownBottom);
      console.log("windowHeight ==> ", windowHeight);

      // If the dropdown goes beyond the bottom of the window, show it upwards
      if (dropdownBottom + 500 > windowHeight) {
        setIsDropdownUp(true);
      } else {
        setIsDropdownUp(false);
      }
    }
  }, [valueSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log("option ==> ", option);
  const optionItem = option?.length ? option.slice(0, 10) : [];

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={cn("font-medium text-[14px] text-gray-900", classLabel)}
        >
          {label}{" "}
          {required && <span className="text-red-600 text-[14px]">*</span>}
        </label>
      )}
      <div className="flex items-center">
        <div className="relative group  w-full">
          <Button
            type="button"
            ref={buttonRef}
            onClick={toggleDropdown}
            variant={"select"}
            className="w-full flex justify-between px-3"
            disabled={disabled}
          >
            {value?.label ? (
              <span className="text-[#09090b] text-[16px]">{value?.label}</span>
            ) : (
              <span className="text-gray-500 text-[16px]">{placeholder}</span>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
          {isOpen && (
            <div
              ref={dropdownRef} // set ref to this div
              id="dropdown-menu"
              className={`absolute w-full right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4 space-y-1 ${
                isDropdownUp ? "bottom-full mt-0" : "top-full mt-2"
              }`}
              // className="absolute w-full right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4 space-y-1"
            >
              <input
                id="search-input"
                className="flex mb-1.5 h-[42px] text-[#09090b] w-full rounded-[8px] border border-gray-300 bg-transparent px-3 py-1 text-[14px] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black md:text-[16px]"
                type="text"
                placeholder={placeholderSearch}
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
                autoComplete="off"
              />
              {optionItem?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(item)}
                  className="block py-1.5  px-1 text-[#09090b] text-[14px] hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSelectInput;
