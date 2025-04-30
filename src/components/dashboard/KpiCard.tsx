
import React, { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Activity, Zap } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon?: ReactNode;
  iconColor?: string;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
  changePrefix?: string;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  icon,
  iconColor = "text-primary",
  change,
  changeType = "neutral",
  changePrefix = "",
  className = "",
}) => {
  // Determine color based on change type
  const getChangeColor = (type: string) => {
    switch (type) {
      case "positive":
        return "text-emerald-600 dark:text-emerald-500";
      case "negative":
        return "text-red-600 dark:text-red-500";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  // Determine icon based on change type
  const getChangeIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <TrendingUp className="h-3.5 w-3.5" />;
      case "negative":
        return <TrendingDown className="h-3.5 w-3.5" />;
      default:
        return <Activity className="h-3.5 w-3.5" />;
    }
  };

  // Get the correct icon component
  const getIcon = () => {
    if (icon) {
      return icon;
    }
    // Default icon
    return <Zap className={`h-5 w-5 ${iconColor}`} />;
  };

  return (
    <Card className={`shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <CardContent className="pt-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline mt-1">
              <h3 className="text-2xl font-bold">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </h3>
              {unit && <span className="ml-1 text-sm text-muted-foreground">{unit}</span>}
            </div>
          </div>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 ${iconColor}`}>
            {getIcon()}
          </div>
        </div>
      </CardContent>
      {change !== undefined && (
        <CardFooter className="pt-0 px-6 pb-4">
          <div className={`flex items-center gap-1 text-xs font-medium ${getChangeColor(changeType)}`}>
            {getChangeIcon(changeType)}
            <span>{changePrefix}{Math.abs(change)}%</span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default KpiCard;
