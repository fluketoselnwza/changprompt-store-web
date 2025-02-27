import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface CustomerSelectProps {
  error?: string;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegisterReturn; // react-hook-form's register return
  options: { value: string; label: string }[];
  value?: string;
  setValue?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
  classLabel?: string;
}

const CustomSelect: React.FC<CustomerSelectProps> = ({
  error,
  label,
  name,
  placeholder,
  register,
  required,
  options,
  defaultValue,
  value,
  setValue,
  className,
  classLabel,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className={cn("font-medium text-[14px] text-gray-900", classLabel)}
          htmlFor={name}
        >
          {label}{" "}
          {required && <span className="text-red-600 text-[14px]">*</span>}
        </label>
      )}
      <Select
        {...props}
        defaultValue={defaultValue}
        value={value}
        onValueChange={(value) => {
          if (value) {
            setValue?.(value);
            register?.onChange?.({ target: { name, value } });
          }
        }}
      >
        <SelectTrigger
          className={cn(
            "w-full rounded-[8px]",
            className,
            error ? "border-red-600" : "",
            value ? "text-[#09090b]" : "text-gray-500"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <span className="mt-1 text-red-600 text-xs">{error}</span>}
    </div>
  );
};

export default CustomSelect;
