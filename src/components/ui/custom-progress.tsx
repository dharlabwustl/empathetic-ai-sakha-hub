
import * as React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "./progress";

interface CustomProgressProps extends React.ComponentPropsWithoutRef<typeof Progress> {
  indicatorClassName?: string;
}

export const CustomProgress = React.forwardRef<
  React.ElementRef<typeof Progress>,
  CustomProgressProps
>(({ className, indicatorClassName, ...props }, ref) => {
  return (
    <Progress
      ref={ref}
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    />
  );
});

CustomProgress.displayName = "CustomProgress";
