import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { th } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };
  return (
    <DayPicker
      locale={th}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        multiple_months: "is-multiple",
        vhidden:
          "hidden [.is-between_&]:flex [.is-end_&]:flex [.is-start.is-end_&]:hidden",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
        Dropdown: ({ ...props }) => {
          const caption =
            props?.name === "years"
              ? Number(props?.caption) + 543
              : props?.caption;

          return (
            <Select
              value={props.value as string}
              onValueChange={(value) => {
                if (props.onChange) {
                  handleCalendarChange(value, props.onChange);
                }
              }}
            >
              <SelectTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  " h-7  font-medium  border "
                )}
              >
                <SelectValue placeholder={caption}>{caption}</SelectValue>
              </SelectTrigger>
              <SelectContent
                className="z-50 max-h-[150px] overflow-y-auto min-w-[150px] max-w-[300px] bg-white rounded-lg shadow-md space-y-2 p-2"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {props.children &&
                  React.Children.map(props.children, (child) => {
                    const label = Number(
                      (child as React.ReactElement)?.props?.children
                    )
                      ? Number((child as React.ReactElement)?.props?.children) +
                        543
                      : (child as React.ReactElement)?.props?.children;

                    return (
                      <SelectItem
                        value={(child as React.ReactElement)?.props?.value}
                        className="px-4 py-2 bg-white  rounded-md hover:bg-primary cursor-pointer"
                      >
                        {label}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
