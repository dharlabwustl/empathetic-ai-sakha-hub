
import { useState, useEffect } from "react";
import { SubjectProgress, StudyStreak } from "@/types/dashboard";
import { getAllSubjectsProgress, getStudyStreak } from "@/data/mockProgressData";

export const useStudyProgress = () => {
  const [loading, setLoading] = useState(true);
  const [subjectProgress, setSubjectProgress] = useState<SubjectProgress[]>([]);
  const [studyStreak, setStudyStreak] = useState<StudyStreak | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Get progress data
        const subjectsData = getAllSubjectsProgress();
        const streakData = getStudyStreak();
        
        setSubjectProgress(subjectsData);
        setStudyStreak(streakData);
      } catch (error) {
        console.error("Failed to fetch progress data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const getTotalProgress = () => {
    if (subjectProgress.length === 0) return 0;
    
    const totalCompleted = subjectProgress.reduce(
      (sum, subject) => sum + subject.completedTopics, 0
    );
    
    const totalTopics = subjectProgress.reduce(
      (sum, subject) => sum + subject.totalTopics, 0
    );
    
    return totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0;
  };
  
  const getWeakestSubject = () => {
    if (subjectProgress.length === 0) return null;
    
    return subjectProgress.reduce(
      (weakest, current) => {
        const weakestProgress = weakest.completedTopics / weakest.totalTopics;
        const currentProgress = current.completedTopics / current.totalTopics;
        return currentProgress < weakestProgress ? current : weakest;
      }, 
      subjectProgress[0]
    );
  };
  
  const getStrongestSubject = () => {
    if (subjectProgress.length === 0) return null;
    
    return subjectProgress.reduce(
      (strongest, current) => {
        const strongestProgress = strongest.completedTopics / strongest.totalTopics;
        const currentProgress = current.completedTopics / current.totalTopics;
        return currentProgress > strongestProgress ? current : strongest;
      }, 
      subjectProgress[0]
    );
  };

  return {
    loading,
    subjectProgress,
    studyStreak,
    totalProgress: getTotalProgress(),
    weakestSubject: getWeakestSubject(),
    strongestSubject: getStrongestSubject()
  };
};
