
import { useState, useEffect } from 'react';
import mockProgressData from '@/data/mockProgressData';

export const useStudyProgress = () => {
  const [subjectsProgress, setSubjectsProgress] = useState([]);
  const [studyStreak, setStudyStreak] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const loadData = async () => {
      try {
        const subjects = mockProgressData.getAllSubjectsProgress();
        const streak = mockProgressData.getStudyStreak();
        
        setSubjectsProgress(subjects);
        setStudyStreak(streak);
      } catch (error) {
        console.error("Failed to load progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    subjectsProgress,
    studyStreak,
    loading
  };
};
