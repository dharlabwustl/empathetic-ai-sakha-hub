import React from "react";
import { MoodTheme } from "@/types/dashboard";

interface MoodTimelineProps {
  moodEntries: { date: string; moodScore: number }[];
}

const MoodTimeline: React.FC<MoodTimelineProps> = ({ moodEntries }) => {
  const getMoodTheme = (mood: number): MoodTheme => {
    if (mood <= 2) return { 
      background: 'bg-red-100', 
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      accent: 'bg-red-500'
    };
    if (mood <= 4) return { 
      background: 'bg-yellow-100', 
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      accent: 'bg-yellow-500'
    };
    return { 
      background: 'bg-green-100', 
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      accent: 'bg-green-500'
    };
  };

  return (
    <div className="space-y-4">
      {moodEntries.map((entry, index) => {
        const theme = getMoodTheme(entry.moodScore);
        return (
          <div key={index} className={`p-4 rounded-lg border ${theme.background} ${theme.borderColor}`}>
            <div className="flex items-center justify-between">
              <span className={`font-medium ${theme.textColor}`}>
                {entry.date}
              </span>
              <div className={`w-3 h-3 rounded-full ${theme.accent}`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoodTimeline;
