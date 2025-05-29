
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Clock, Calendar, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimeDisplayWidgetProps {
  studyStreak?: number;
}

const TimeDisplayWidget: React.FC<TimeDisplayWidgetProps> = ({ studyStreak = 12 }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            className="flex items-center gap-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Current Time</p>
              <p className="font-bold text-lg text-blue-900 dark:text-blue-100">{formatTime(currentTime)}</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{formatDay(currentTime)}</p>
              <p className="font-medium text-purple-900 dark:text-purple-100">{formatDate(currentTime)}</p>
            </div>
          </div>
        </div>

        <motion.div
          className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-700"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Flame className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Study Streak</p>
            <p className="font-bold text-orange-900 dark:text-orange-100">{studyStreak} days</p>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default TimeDisplayWidget;
