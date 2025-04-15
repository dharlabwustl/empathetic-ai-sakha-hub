
import React from "react";
import { Button } from "@/components/ui/button";
import { EmptyStateProps } from "@/types/content";

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  icon,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-gray-400">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {message}
      </h3>
      {actionLabel && onAction && (
        <Button 
          variant="outline" 
          onClick={onAction}
          className="mt-4"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
