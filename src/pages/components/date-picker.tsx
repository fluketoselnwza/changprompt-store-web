import * as React from "react";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th";
dayjs.extend(buddhistEra);
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormRegisterReturn } from "react-hook-form";

interface DatePickerProps {
  error?: string;
  disabled?: boolean;
  typeDate?: "birthday" | "date";
  futureYear?: number;
  pastYear?: number;
  label?: string;
  name: string;
  required?: boolean;
  register?: UseFormRegisterReturn; // react-hook-form's register return
  defaultValue?: Date | string;
  disabledPicker?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  disabled = false,
  disabledPicker = false,
  typeDate = "date",
  futureYear = 0,
  pastYear = 1950,
  label,
  required,
  error,
  name,
  register,
  defaultValue,
  ...props
}) => {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  console.log("error : ", error);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label>
          {label} {required && <span className="text-red-600 text-xs">*</span>}
        </label>
      )}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild className="w-full">
          <Button
            disabled={disabledPicker}
            variant={"input"}
            className={cn(
              "w-full justify-between text-left text-[14px] font-normal",
              !date && "text-gray-500",
              error && "border-red-600"
            )}
          >
            {date ? (
              dayjs(date).locale("th").format("DD MMMM BBBB")
            ) : (
              <span>วว/ดด/ปปปป</span>
            )}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Calendar
            mode="single"
            className="bg-white w-full"
            selected={date}
            // onSelect={setDate}
            {...props}
            onSelect={(date) => {
              setDate(date);
              register?.onChange?.({ target: { name, value: date } });
              setIsPopoverOpen(false); // Close the popover
            }}
            disabled={(date) =>
              typeDate === "birthday"
                ? disabled
                  ? disabled
                  : date > new Date() || date < new Date("1950-01-01")
                : disabled
            }
            initialFocus
            captionLayout="dropdown-buttons"
            fromYear={pastYear}
            toYear={new Date().getFullYear() + futureYear}
          />
        </PopoverContent>
      </Popover>
      {error && <span className="mt-1 text-red-600 text-xs">{error}</span>}
    </div>
  );
};

export default DatePicker;
