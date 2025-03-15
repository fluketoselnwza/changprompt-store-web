import React from "react";
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
  classLabel?: string;
  classInput?: string;
  maxLength?: number;
}

const CustomInputText: React.FC<CustomerInputProps> = ({
  error,
  label,
  name,
  register,
  required,
  placeholder,
  type = "text",
  classLabel,
  classInput,
  maxLength = 999,
  ...props
}) => {
  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxNum = maxLength;

    // Remove any numbers from the input value
    const sanitizedValue = e.target.value.replace(/[0-9]/g, "");

    // Enforce the max length
    if (sanitizedValue.length > maxNum) {
      e.target.value = sanitizedValue.slice(0, maxNum);
    } else {
      e.target.value = sanitizedValue;
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
        placeholder={placeholder}
        className={cn(
          "border",
          classInput,
          error ? "border-red-600" : "border-gray-300"
        )}
        onInput={handleOnInput}
      />
      {error && <span className="mt-1 text-red-600 text-xs">{error}</span>}
    </div>
  );
};

export default CustomInputText;
