import React from 'react';
import { format, isToday, isYesterday, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { MoodEntry } from '@/types/user/base';
import { getMoodTheme } from './moodThemes';

interface MoodTimelineProps {
  userMoods: MoodEntry[];
}

const MoodTimeline: React.FC<MoodTimelineProps> = ({ userMoods }) => {
  // Function to calculate the percentage position of a date within the timeline
  const calculatePercentage = (date: Date | string): number => {
    const now = new Date();
    let start: Date, end: Date;
    
    if (isToday(now)) {
      start = startOfDay(now);
      end = endOfDay(now);
    } else if (isYesterday(now)) {
      start = startOfDay(now);
      end = endOfDay(now);
    } else {
      start = startOfDay(now);
      end = endOfDay(now);
    }
    
    const totalTime = end.getTime() - start.getTime();
    const moodTime = new Date(date).getTime() - start.getTime();
    
    return (moodTime / totalTime) * 100;
  };
  
  const formatTime = (date: Date | string): string => {
    return format(new Date(date), 'h:mm a');
  };
  
  const renderMoodPoints = () => {
    return userMoods.map((entry, index) => {
      const theme = getMoodTheme(entry.mood);
      const percentage = calculatePercentage(entry.date);
      
      return (
        <div
          key={index}
          className={`absolute w-3 h-3 rounded-full ${theme.bgColor || 'bg-blue-500'} border-2 border-white`}
          style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
          title={`${formatTime(entry.date)}: ${entry.mood}`}
        />
      );
    });
  };
  
  const renderMoodLabels = () => {
    return userMoods.map((entry, index) => {
      const theme = getMoodTheme(entry.mood);
      const percentage = calculatePercentage(entry.date);
      
      // Don't show labels that would be too close together
      if (index > 0 && 
          percentage - calculatePercentage(userMoods[index-1].date) < 15) {
        return null;
      }
      
      return (
        <div
          key={index}
          className="absolute text-xs"
          style={{
            left: `${percentage}%`,
            transform: 'translateX(-50%)',
            top: '20px'
          }}
        >
          <span className={theme.textColor || 'text-blue-500'}>
            {formatTime(entry.date)}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="relative h-10 bg-gray-100 rounded-full mt-4 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-sky-500 to-violet-500">
        {renderMoodPoints()}
      </div>
      {renderMoodLabels()}
    </div>
  );
};

export default MoodTimeline;
