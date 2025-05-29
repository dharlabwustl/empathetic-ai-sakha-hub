
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  progress?: number;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  unit = '',
  icon,
  trend = 'stable',
  progress,
  className = ''
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3" />;
      case 'down': return <TrendingDown className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`hover:shadow-md transition-shadow ${className}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{value}{unit}</span>
              {change !== undefined && (
                <Badge variant="outline" className={`${getTrendColor()} flex items-center gap-1`}>
                  {getTrendIcon()}
                  {Math.abs(change)}%
                </Badge>
              )}
            </div>
            {progress !== undefined && (
              <div className="space-y-1">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-gray-500">{progress}% complete</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KpiCard;
