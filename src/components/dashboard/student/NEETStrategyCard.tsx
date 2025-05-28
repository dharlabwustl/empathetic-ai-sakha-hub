
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface NEETStrategyCardProps {
  examProximity: number; // days to exam
  studyPace: 'slow' | 'moderate' | 'fast';
}

const NEETStrategyCard: React.FC<NEETStrategyCardProps> = ({ examProximity, studyPace }) => {
  // Strategy changes based on exam proximity and pace
  const getStrategy = () => {
    if (examProximity <= 30) {
      return {
        title: 'NEET 2026 Strategy - INTENSIVE',
        subtitle: 'Final Sprint + Revision',
        points: ['Last-minute revision', 'Mock tests daily', 'Weak area focus']
      };
    } else if (examProximity <= 90) {
      return {
        title: 'NEET 2026 Strategy - FOCUSED',
        subtitle: 'Practice + Problem Solving',
        points: ['Intensive practice', 'Previous papers', 'Time management']
      };
    } else {
      return {
        title: 'NEET 2026 Strategy - MODERATE',
        subtitle: 'Foundation Building + Practice',
        points: ['Complete syllabus', 'Concept clarity', 'Regular practice']
      };
    }
  };

  const strategy = getStrategy();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Priority highlight animation */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-lg blur opacity-75 animate-pulse"></div>
      
      <Card className="relative bg-white dark:bg-gray-900 border-2 border-orange-200 dark:border-orange-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <Target className="h-5 w-5" />
              {strategy.title}
            </CardTitle>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-5 w-5 text-yellow-500" />
            </motion.div>
          </div>
          <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
            {strategy.subtitle}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {strategy.points.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{point}</span>
              </div>
            ))}
          </div>
          <Badge className="mt-3 bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300">
            {examProximity} days to NEET
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NEETStrategyCard;
