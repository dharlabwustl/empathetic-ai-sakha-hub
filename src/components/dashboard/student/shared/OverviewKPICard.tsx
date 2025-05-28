
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OverviewKPICardProps {
  title: string;
  value: string | number;
  subtext?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

export const OverviewKPICard: React.FC<OverviewKPICardProps> = ({
  title,
  value,
  subtext,
  variant = 'default',
  icon
}) => {
  const variantStyles = {
    default: 'bg-white dark:bg-gray-900 border-gray-200',
    success: 'bg-green-50 dark:bg-green-950 border-green-200',
    warning: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200',
    error: 'bg-red-50 dark:bg-red-950 border-red-200'
  };

  return (
    <Card className={`${variantStyles[variant]}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            {subtext && (
              <p className="text-xs text-gray-500 dark:text-gray-500">{subtext}</p>
            )}
          </div>
          {icon && (
            <div className="ml-3 text-gray-400">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
