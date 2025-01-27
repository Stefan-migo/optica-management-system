// src/components/ui/card.tsx
import { cn } from "@/lib/utils";

export const Card = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rounded-lg border bg-white shadow-sm p-6",
      className
    )}
    {...props}
  >
    {children}
  </div>
);