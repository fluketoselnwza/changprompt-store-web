import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn } from "react-hook-form";

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

  return (
    <div>
      {label && (
        <label htmlFor={name}>
          {label} {required && <span className="text-red-600 text-xs">*</span>}
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
        className={error ? "border-red-600" : ""}
      />
      {error && <span className="mt-1 text-red-600 text-xs">{error}</span>}
    </div>
  );
};

export default CustomInput;
