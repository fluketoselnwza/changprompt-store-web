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
  defaultValue?: string;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomerSelectProps> = ({
  error,
  label,
  name,
  placeholder,
  register,
  required,
  options,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name}>
          {label}{" "}
          {required && <span className="text-red-600 text-[14px]">*</span>}
        </label>
      )}
      <Select
        {...props}
        onValueChange={(value) => {
          register?.onChange?.({ target: { name, value } }); // Simulate onChange event for RHF
        }}
      >
        <SelectTrigger className={cn("w-full", error ? "border-red-600" : "")}>
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
