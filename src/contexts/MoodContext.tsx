
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MoodType } from '@/types/user/base';

interface MoodContextType {
  currentMood?: MoodType;
  setCurrentMood: (mood: MoodType) => void;
  moodHistory: { mood: MoodType; timestamp: Date }[];
  addMoodEntry: (mood: MoodType) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMood, setCurrentMood] = useState<MoodType>();
  const [moodHistory, setMoodHistory] = useState<{ mood: MoodType; timestamp: Date }[]>([]);

  useEffect(() => {
    const savedMood = localStorage.getItem('currentMood');
    if (savedMood) {
      setCurrentMood(savedMood as MoodType);
    }
    
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addMoodEntry = (mood: MoodType) => {
    const newEntry = { mood, timestamp: new Date() };
    setMoodHistory(prev => {
      const updated = [...prev, newEntry];
      localStorage.setItem('moodHistory', JSON.stringify(updated));
      return updated;
    });
    setCurrentMood(mood);
    localStorage.setItem('currentMood', mood);
  };

  return (
    <MoodContext.Provider value={{ currentMood, setCurrentMood, moodHistory, addMoodEntry }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMoodContext = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMoodContext must be used within a MoodProvider');
  }
  return context;
};
