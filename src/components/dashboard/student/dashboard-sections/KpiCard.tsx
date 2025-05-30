
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface KpiCardProps {
  title: string;
  value: string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
  progress?: number;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit = '',
  trend = 'stable',
  change,
  progress,
  icon,
  onClick
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'down':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCardGradient = () => {
    switch (trend) {
      case 'up':
        return 'from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300';
      case 'down':
        return 'from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 border-red-300';
      default:
        return 'from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-300';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={onClick ? 'cursor-pointer' : ''}
    >
      <Card className={`premium-card shadow-lg border-2 bg-gradient-to-br ${getCardGradient()} overflow-hidden h-full`}>
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header with Icon and Title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {icon && (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {icon}
                  </motion.div>
                )}
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {title}
                </h3>
              </div>
              
              {/* Trend Indicator */}
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full border ${getTrendColor()}`}>
                {getTrendIcon()}
                {change && (
                  <span className="text-xs font-medium">
                    {change > 0 ? '+' : ''}{change}%
                  </span>
                )}
              </div>
            </div>

            {/* Main Value */}
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {value}
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-1">
                    {unit}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Progress Bar (if provided) */}
            {progress !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ originX: 0 }}
                >
                  <Progress value={progress} className="h-2" />
                </motion.div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KpiCard;
