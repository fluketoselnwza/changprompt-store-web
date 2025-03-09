/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import CloseIcon from "@/assets/icons/icon-close.png";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomSelectInput from "../custom-select-input";
import IconSearch from "@/assets/icons/icon-search.png";
import { ISelectData } from "@/pages/interface";
import { getCustomerSerivice } from "@/services/user";

interface IModalInputSearchProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  placeholder?: string;
  label?: string;
  value: any;
  setValue: (value: any) => void;
}

const ModalInputSearch: React.FC<IModalInputSearchProps> = (props) => {
  const { isOpen, setIsOpen, title, placeholder, label, setValue } = props;

  const { handleSubmit } = useForm();

  const [search, setSearch] = useState<string>("");
  const [valueSearch, setValueSearch] = useState<ISelectData>({
    label: "",
    value: "",
  });
  const [debouncedQuery, setDebouncedQuery] = useState<string>(search);
  const [optionData, setOptionData] = useState<ISelectData[]>([]);
  const [resultData, setResultData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async (searchTxt: string) => {
      console.log("searchTxt ==> ", searchTxt);

      const result = await getCustomerSerivice(searchTxt);

      console.log("result => ", result);

      if (result?.customers?.length) {
        const resultData = result.customers.map((item) => {
          return {
            label: item?.customer_name,
            value: item?.id,
          };
        });
        setOptionData(resultData);
        setResultData(result.customers);
      } else {
        setOptionData([]);
      }
    };

    getData(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(search);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [search]);

  const onSubmit = () => {
    console.log("valueSearch => ", valueSearch);
    console.log("option => ", optionData);
    if (valueSearch?.value && resultData?.length) {
      const data = resultData.find((item) => item.id === valueSearch.value);
      setValue(data);
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-[90%] bg-white rounded-lg p-0">
        <div className="flex justify-between items-center border-b border-[#DDDDDD] p-[16px]">
          <p className="font-semibold">{title}</p>
          <img
            src={CloseIcon}
            className="w-3 h-3 cursor-pointer"
            alt="icon close"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <DialogHeader className="flex flex-col items-center gap-4 px-[16px] pb-[16px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-3"
          >
            <DialogDescription className="w-full text-start">
              <CustomSelectInput
                icon={IconSearch}
                placeholder={placeholder}
                label={label}
                option={optionData}
                valueSearch={search}
                setValueSearch={setSearch}
                value={valueSearch}
                setValue={setValueSearch}
              />
            </DialogDescription>
            <div className="space-x-[16px]">
              <Button
                className="w-[82px]"
                variant={"outline"}
                type="button"
                onClick={() => setIsOpen(false)}
              >
                ยกเลิก
              </Button>
              <Button className="w-[82px]">ยืนยัน</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalInputSearch;
