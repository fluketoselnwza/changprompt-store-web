import React from "react";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";
import IconDelete from "@/assets/icons/icon-delete-image.png";
import { cn } from "@/lib/utils";
import { uniqObjectByKeepLast } from "@/lib/uniq-keep";

interface CustomerInputProps {
  error?: string;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>; // react-hook-form's register return
  disabled?: boolean;
  fields?: {
    id: string;
    value: string;
  }[];
  remove: (index: number) => void;
}

const CustomMultipleInput: React.FC<CustomerInputProps> = ({
  error,
  label,
  name,
  register,
  required,
  placeholder,
  type = "text",
  fields,
  remove,
  ...props
}) => {
  console.log("fields ===> ", fields);
  const fieldsData = uniqObjectByKeepLast(
    fields,
    (it: { value: string }) => it.value
  );

  console.log("fieldsData ==> ", fieldsData);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name}>
          {label} {required && <span className="text-red-600 text-xs">*</span>}
        </label>
      )}
      {fieldsData?.length
        ? fieldsData.map((_, index) => (
            <div
              className={cn("relative", index > 0 ? "mt-4" : "")}
              key={index}
            >
              <img
                src={IconDelete}
                alt="icon close"
                className="absolute right-[16px] top-[9px] w-[24px] h-[24px]"
                onClick={() => remove(index)}
              />
              <Input
                id={name}
                type={type}
                {...props}
                {...register(`${name}.${index}.value`)}
                placeholder={placeholder}
                className={error ? "border-red-600" : ""}
              />
            </div>
          ))
        : null}
      {error && <span className="mt-1 text-red-600 text-xs">{error}</span>}
    </div>
  );
};

export default CustomMultipleInput;
