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
  defaultValue?: Date | undefined;
  disabledPicker?: boolean;
  className?: string;
  placeholder?: string;
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
  className,
  placeholder = "วัน เดือน ปี",
  ...props
}) => {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const [date, setDate] = React.useState<Date | undefined>();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [calendarWidth, setCalendarWidth] = React.useState<number>(0);

  React.useEffect(() => {
    if (isPopoverOpen) {
      const widthButton = buttonRef?.current?.offsetWidth || 0;
      setCalendarWidth(widthButton);
    }
  }, [isPopoverOpen]);

  React.useEffect(() => {
    const value = defaultValue ? new Date(defaultValue) : undefined;
    register?.onChange({
      target: { name, value: value },
    });
    setDate(value);
  }, [defaultValue]);

  return (
    <div className="flex flex-col gap-2 relative">
      {label && (
        <label>
          {label}{" "}
          {required && <span className="text-red-600 text-[14px]">*</span>}
        </label>
      )}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild className={cn("w-full h-[42px]", className)}>
          <Button
            ref={buttonRef}
            disabled={disabledPicker}
            variant={"input"}
            className={cn(
              "w-full justify-between text-left text-[14px] font-normal",
              !date && "text-gray-500",
              error ? "border-red-600" : "border-gray-300"
            )}
          >
            {date ? (
              dayjs(date).locale("th").format("DD MMMM BBBB")
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`w-[${calendarWidth}px] p-0`} align="start">
          <Calendar
            mode="single"
            className="bg-white w-full"
            selected={date}
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
