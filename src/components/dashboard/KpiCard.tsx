
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { KpiData } from "@/hooks/useKpiTracking";
import { TrendingDown, TrendingUp, Minus, Activity } from "lucide-react";
import { motion } from 'framer-motion';

interface KpiCardProps {
  kpi: KpiData;
  delay?: number;
}

const KpiCard: React.FC<KpiCardProps> = ({ kpi, delay = 0 }) => {
  const getValueColor = () => {
    if (kpi.trend === 'up') return 'text-green-600 dark:text-green-400';
    if (kpi.trend === 'down') return 'text-red-600 dark:text-red-400';
    return 'text-gray-800 dark:text-gray-200';
  };
  
  const getTrendIcon = () => {
    if (kpi.trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />;
    if (kpi.trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };
  
  const getTrendBadgeColor = () => {
    if (kpi.trend === 'up') return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if (kpi.trend === 'down') return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    return 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  };

  // Safely format the change value
  const formatChange = (change: number) => {
    const absChange = Math.abs(change);
    const sign = change > 0 ? '+' : change < 0 ? '-' : '';
    
    // Handle different units
    if (kpi.unit === '%') {
      return `${sign}${absChange}${kpi.unit}`;
    } else if (kpi.unit) {
      return `${sign}${absChange} ${kpi.unit}`;
    } else {
      return `${sign}${absChange}`;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {kpi.name}
              </p>
              <div className="flex items-baseline mt-1">
                <h3 className={`text-2xl font-bold ${getValueColor()}`}>
                  {kpi.value}{kpi.unit}
                </h3>
                <span className="text-xs ml-1 text-muted-foreground">
                  {kpi.label}
                </span>
              </div>
            </div>
            <div className="p-2 rounded-full bg-muted">
              {kpi.icon ? kpi.icon : <Activity className="h-4 w-4 text-primary" />}
            </div>
          </div>
          
          {kpi.change !== 0 && (
            <div className="mt-4 flex items-center">
              <span className={`text-xs px-1.5 py-0.5 rounded ${getTrendBadgeColor()} flex items-center gap-0.5`}>
                {getTrendIcon()}
                {formatChange(kpi.change)}
              </span>
              <span className="text-xs text-muted-foreground ml-1.5">
                vs. previous {kpi.label.toLowerCase()}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KpiCard;
