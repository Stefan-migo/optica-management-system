// components/ui/metric.tsx
'use client';
import { cn } from "@/lib/utils"; // Add this import

export const Metric = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h2 className={cn('text-3xl font-bold tracking-tight', className)}>
    {children}
  </h2>
);