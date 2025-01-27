// components/ui/calendar.tsx
'use client';
import { DayPicker } from 'react-day-picker';
import { cn } from "@/lib/utils";

export const Calendar = ({
  className,
  classNames,
  ...props
}: React.ComponentProps<typeof DayPicker>) => (
  <DayPicker
    className={cn('p-3 bg-white rounded-md border', className)}
    classNames={{
      nav_button: 'h-6 w-6 bg-transparent hover:bg-gray-100',
      head_cell: 'text-gray-500 font-normal text-sm',
      day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
      ...classNames,
    }}
    {...props}
  />
);