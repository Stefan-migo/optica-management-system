// components/ui/progress-bar.tsx
'use client';
import { cn } from "@/lib/utils"; 

export const ProgressBar = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => (
  <div className={cn('relative', className)}>
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle
        className="text-gray-200"
        strokeWidth="10"
        stroke="currentColor"
        fill="transparent"
        r="45"
        cx="50"
        cy="50"
      />
      <circle
        className="text-blue-600"
        strokeWidth="10"
        strokeDasharray={`${value * 2.83} 283`}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="45"
        cx="50"
        cy="50"
      />
    </svg>
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
      {value}%
    </span>
  </div>
);