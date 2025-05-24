
import { useState, useEffect } from 'react';

export interface TabProgressData {
  tabId: string;
  completionPercentage: number;
  tasksCompleted: number;
  totalTasks: number;
  timeSpent: number;
  lastActive: Date;
  streak: number;
}

export const useTabProgress = () => {
  const [progressData, setProgressData] = useState<Record<string, TabProgressData>>({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('tabProgress');
    if (savedProgress) {
      setProgressData(JSON.parse(savedProgress));
    }
  }, []);

  const updateTabProgress = (tabId: string, updates: Partial<TabProgressData>) => {
    setProgressData(prev => {
      const newData = {
        ...prev,
        [tabId]: {
          tabId,
          completionPercentage: 0,
          tasksCompleted: 0,
          totalTasks: 0,
          timeSpent: 0,
          lastActive: new Date(),
          streak: 0,
          ...prev[tabId],
          ...updates
        }
      };
      localStorage.setItem('tabProgress', JSON.stringify(newData));
      return newData;
    });
  };

  const getTabProgress = (tabId: string): TabProgressData => {
    return progressData[tabId] || {
      tabId,
      completionPercentage: 0,
      tasksCompleted: 0,
      totalTasks: 0,
      timeSpent: 0,
      lastActive: new Date(),
      streak: 0
    };
  };

  return {
    progressData,
    updateTabProgress,
    getTabProgress
  };
};
