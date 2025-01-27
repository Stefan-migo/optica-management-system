// components/ui/badge.tsx
'use client';
import { cn } from "@/lib/utils";

export const Badge = ({
  variant = 'default',
  className,
  children,
}: {
  variant?: 'default' | 'destructive' | 'warning' | 'success';
  className?: string;
  children: React.ReactNode;
}) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    destructive: 'bg-red-100 text-red-800',
    warning: 'bg-amber-100 text-amber-800',
    success: 'bg-green-100 text-green-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};