
import React from "react";
import { cn } from "@/lib/utils";

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              stepNumber: index + 1,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
Steps.displayName = "Steps";

interface StepLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  stepNumber?: number; // This will be injected by Steps component
}

const StepLabel = React.forwardRef<HTMLDivElement, StepLabelProps>(
  ({ className, children, stepNumber, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex gap-3 items-start", className)}
        {...props}
      >
        {stepNumber && (
          <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            {stepNumber}
          </div>
        )}
        <div className="flex-grow space-y-1">
          {children}
        </div>
      </div>
    );
  }
);
StepLabel.displayName = "StepLabel";

export { Steps, StepLabel };
