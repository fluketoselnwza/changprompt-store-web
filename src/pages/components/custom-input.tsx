import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface CustomerInputProps {
  error?: string;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  register?: UseFormRegisterReturn; // react-hook-form's register return
  disabled?: boolean;
  defaultValue?: string;
  classLabel?: string;
  classInput?: string;
  maxLength?: number;
}

const CustomInput: React.FC<CustomerInputProps> = ({
  error,
  label,
  name,
  register,
  required,
  placeholder,
  defaultValue = "",
  type = "text",
  classLabel,
  classInput,
  maxLength = 999,
  ...props
}) => {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    // Sync with defaultValue when it changes
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (register?.onChange) {
      register.onChange({
        target: { name, value: inputValue },
      });
    }
  };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxNum = maxLength;
    if (e.target.value.length > maxNum) {
      e.target.value = e.target.value.slice(0, maxNum);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={cn("font-medium text-[14px] text-gray-900", classLabel)}
          htmlFor={name}
        >
          {label}{" "}
          {required && <span className="text-red-600 text-[14px]">*</span>}
        </label>
      )}
      <Input
        id={name}
        type={type}
        {...props}
        {...register}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "border",
          classInput,
          error ? "border-red-600" : "border-gray-300",
          value ? "text-[#09090b]" : "text-gray-500"
        )}
        onInput={handleOnInput}
      />
      {error && <span className="mt-1 text-red-600 text-xs">{error}</span>}
    </div>
  );
};

export default CustomInput;
