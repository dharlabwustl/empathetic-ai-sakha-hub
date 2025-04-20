
import { useState, useEffect } from 'react';
import mockProgressData from '@/data/mockProgressData';

export const useStudyProgress = () => {
  const [subjectsProgress, setSubjectsProgress] = useState([]);
  const [studyStreak, setStudyStreak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const loadData = async () => {
      try {
        // Mock data for subjects progress
        const subjects = mockProgressData?.getAllSubjectsProgress ? 
          mockProgressData.getAllSubjectsProgress() : 
          [];
        
        // Mock data for streak
        const streak = mockProgressData?.getStudyStreak ? 
          mockProgressData.getStudyStreak() : 
          { current: 7, longest: 14 };
        
        setSubjectsProgress(subjects);
        setStudyStreak(streak);
        
        if (subjects.length > 0 && !selectedSubject) {
          setSelectedSubject(subjects[0]);
        }
      } catch (error) {
        console.error("Failed to load progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedSubject]);

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  return {
    subjectsProgress,
    studyStreak,
    loading,
    subjects: subjectsProgress,
    selectedSubject,
    selectSubject
  };
};
