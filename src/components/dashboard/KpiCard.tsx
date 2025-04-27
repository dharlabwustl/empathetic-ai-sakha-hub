
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { KpiData } from '@/hooks/useKpiTracking';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface KpiCardProps {
  kpi: KpiData;
}

const KpiCard = ({ kpi }: KpiCardProps) => {
  // Determine if there's a trend
  const hasTrend = kpi.trend !== null && kpi.trend !== undefined;
  
  // Determine the trend color and symbol
  const trendColor = getTrendColor(kpi.trend);
  const trendSymbol = getTrendSymbol(kpi.trend);
  
  // Determine badge color based on KPI type
  const badgeColor = getBadgeColor(kpi.type);

  // Format the value (could handle different types of values)
  const formattedValue = formatValue(kpi.value, kpi.unit);
  
  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className={cn(
        "group hover:shadow-md transition-shadow", 
        kpi.type === "streak" && "border-l-4 border-l-amber-500",
        kpi.type === "completion" && "border-l-4 border-l-green-500",
        kpi.type === "accuracy" && "border-l-4 border-l-blue-500",
        kpi.type === "time" && "border-l-4 border-l-violet-500"
      )}>
        <CardContent className="p-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className={cn(
              "px-2 py-1 rounded-md text-xs font-medium",
              badgeColor
            )}>
              {kpi.type}
            </div>
            {hasTrend && (
              <div className={cn(
                "flex items-center text-xs font-medium",
                trendColor
              )}>
                {trendSymbol}
                <span className="ml-1">{Math.abs(Number(kpi.trend))}%</span>
              </div>
            )}
          </div>
          
          <div className="mt-1">
            <p className="text-sm text-gray-500">{kpi.label}</p>
            <h3 className="text-2xl font-bold mt-1">{formattedValue}</h3>
          </div>
          
          {kpi.subtitle && (
            <p className="text-xs text-gray-400 mt-2">{kpi.subtitle}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Helper functions
const getTrendColor = (trend: number | null | undefined) => {
  if (trend === null || trend === undefined) return "text-gray-400";
  if (typeof trend === "string") return "text-gray-400";
  
  return trend > 0 
    ? "text-green-600" 
    : trend < 0 
      ? "text-red-600" 
      : "text-gray-400";
};

const getTrendSymbol = (trend: number | null | undefined) => {
  if (trend === null || trend === undefined) return null;  
  if (typeof trend === "string") return null;
  
  return trend > 0 
    ? <ArrowUpIcon className="h-3 w-3" /> 
    : trend < 0 
      ? <ArrowDownIcon className="h-3 w-3" />
      : null;
};

const getBadgeColor = (type: string) => {
  switch(type) {
    case "streak":
      return "bg-amber-100 text-amber-800";
    case "completion":
      return "bg-green-100 text-green-800";
    case "accuracy":
      return "bg-blue-100 text-blue-800";
    case "time":
      return "bg-violet-100 text-violet-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatValue = (value: number | string, unit?: string) => {
  if (unit === '%') {
    return `${value}${unit}`;
  } else if (unit) {
    return `${value} ${unit}`;
  }
  return value;
};

export default KpiCard;
