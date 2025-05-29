
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Calendar, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimeDisplayWidgetProps {
  streak?: number;
}

const TimeDisplayWidget: React.FC<TimeDisplayWidgetProps> = ({ streak = 12 }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDay = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long'
    });
  };

  return (
    <Card className="p-4 mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Time */}
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-lg font-bold text-indigo-900 dark:text-indigo-100">
                {formatTime(currentTime)}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Current Time</p>
            </div>
          </div>

          {/* Day */}
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-lg font-bold text-purple-900 dark:text-purple-100">
                {formatDay(currentTime)}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Today</p>
            </div>
          </div>

          {/* Date */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formatDate(currentTime)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Date</p>
          </div>
        </div>

        {/* Study Streak */}
        <motion.div 
          className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-2 rounded-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          <div className="text-center">
            <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
              {streak}
            </p>
            <p className="text-xs text-orange-700 dark:text-orange-300">Day Streak</p>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default TimeDisplayWidget;
