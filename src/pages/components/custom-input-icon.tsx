import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
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
  iconLeft?: string;
  leftOnclick?: () => void;
  iconRight?: string;
  rightOnclick?: () => void;
  classLabel?: string;
  classBorderInput?: string;
  classInput?: string;
}

const CustomInputIcon: React.FC<CustomerInputProps> = ({
  error,
  label,
  name,
  register,
  required,
  placeholder,
  type = "text",
  iconLeft,
  leftOnclick,
  iconRight,
  rightOnclick,
  classLabel,
  classBorderInput,
  classInput,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className={cn("font-medium", classLabel)} htmlFor={name}>
          {label} {required && <span className="text-red-600 text-xs">*</span>}
        </label>
      )}
      <div
        className={cn(
          "border  w-full rounded h-[42px] flex items-center",
          classBorderInput,
          error ? "border-red-600" : "border-gray-300"
        )}
      >
        {iconLeft && (
          <div className="pl-3">
            <img
              src={iconLeft}
              alt="icon left"
              onClick={() => (leftOnclick ? leftOnclick() : null)}
              className={cn(
                "w-[16px] h-[16px] object-contain",
                leftOnclick ? "cursor-pointer" : ""
              )}
            />
          </div>
        )}
        <Input
          id={name}
          type={type}
          {...props}
          {...register}
          placeholder={placeholder}
          className={cn("border-none", classInput)}
        />
        {iconRight && (
          <div className="pr-3">
            <img
              src={iconRight}
              alt="icon right"
              onClick={() => (rightOnclick ? rightOnclick() : null)}
              className={cn(
                "w-[16px] h-[16px] object-contain",
                rightOnclick ? "cursor-pointer" : ""
              )}
            />
          </div>
        )}
      </div>
      {error && <span className="mt-1 text-red-600 text-xs">{error}</span>}
    </div>
  );
};

export default CustomInputIcon;
