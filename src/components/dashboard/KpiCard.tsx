
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Minus, Clock, Award, BookOpen, Brain, Target } from 'lucide-react';
import { KpiData } from '@/types/user/base';

interface KpiCardProps {
  kpi: KpiData;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  kpi,
  size = 'md',
  className = '',
}) => {
  // Determine styles based on size
  const getCardStyles = () => {
    switch(size) {
      case 'sm':
        return {
          padding: 'p-3',
          titleSize: 'text-sm',
          valueSize: 'text-2xl',
          iconSize: 'h-4 w-4'
        };
      case 'lg':
        return {
          padding: 'p-5',
          titleSize: 'text-lg',
          valueSize: 'text-4xl',
          iconSize: 'h-6 w-6'
        };
      default: // 'md'
        return {
          padding: 'p-4',
          titleSize: 'text-base',
          valueSize: 'text-3xl',
          iconSize: 'h-5 w-5'
        };
    }
  };
  
  const styles = getCardStyles();
  
  // Get trend icon
  const getTrendIcon = () => {
    if (typeof kpi.trend === 'object') {
      // Handle the case where trend is an object
      return <Minus className="h-4 w-4 text-gray-500" />;
    }

    switch(kpi.trend) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Get KPI icon
  const getKpiIcon = () => {
    switch(kpi.icon) {
      case 'clock':
        return <Clock className={styles.iconSize} />;
      case 'award':
        return <Award className={styles.iconSize} />;
      case 'book':
        return <BookOpen className={styles.iconSize} />;
      case 'brain':
        return <Brain className={styles.iconSize} />;
      case 'target':
        return <Target className={styles.iconSize} />;
      default:
        return <Target className={styles.iconSize} />;
    }
  };
  
  // Format value with commas
  const formatValue = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Calculate percentage of target
  const getPercentageOfTarget = () => {
    if (kpi.target && kpi.target > 0) {
      return Math.round((kpi.value / kpi.target) * 100);
    }
    return 0;
  };
  
  // Get trend text color
  const getTrendColor = () => {
    if (typeof kpi.trend === 'object') {
      return 'text-gray-500';
    }
    
    if (kpi.trend === 'up') {
      return 'text-green-500';
    } else if (kpi.trend === 'down') {
      return 'text-red-500';
    } else {
      return 'text-gray-500';
    }
  };

  return (
    <Card className={`${className}`}>
      <CardHeader className={`${styles.padding} pb-2`}>
        <div className="flex justify-between items-start">
          <CardTitle className={`${styles.titleSize}`}>{kpi.title}</CardTitle>
          {kpi.icon && (
            <span className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-md">
              {getKpiIcon()}
            </span>
          )}
        </div>
        {kpi.description && (
          <CardDescription className="text-xs">
            {kpi.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={`${styles.padding} pt-0`}>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className={`font-bold ${styles.valueSize}`}>
              {formatValue(kpi.value)}
            </span>
            <span className="text-sm text-muted-foreground">
              {kpi.unit}
            </span>
          </div>
          
          <div className="flex items-center mt-2">
            <div className={`flex items-center text-xs ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="ml-1">
                {kpi.changeValue !== undefined && (
                  <span>{kpi.changeValue > 0 ? '+' : ''}{kpi.changeValue}</span>
                )}
                {kpi.changePercentage !== undefined && (
                  <span>{kpi.changePercentage > 0 ? '+' : ''}{kpi.changePercentage}%</span>
                )}
              </span>
            </div>
            
            {kpi.period && (
              <span className="text-xs text-muted-foreground ml-2">
                {kpi.period}
              </span>
            )}
          </div>
          
          {kpi.target && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span>{getPercentageOfTarget()}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${getPercentageOfTarget()}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
