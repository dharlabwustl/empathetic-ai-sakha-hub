
import { useState, useEffect } from "react";
import { UserProfileType } from "@/types/user";
import { SubjectProgress, StudyStreak } from "@/types/user/student";
import { getMockProgressData, getMockStudyStreak } from "@/data/mockProgressData";

export function useStudyProgress(userId: string) {
  const [subjectsProgress, setSubjectsProgress] = useState<SubjectProgress[]>([]);
  const [streak, setStreak] = useState<StudyStreak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgressData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const subjectData = getMockProgressData(userId);
        const streakData = getMockStudyStreak(userId);
        
        setSubjectsProgress(subjectData);
        setStreak(streakData);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [userId]);

  return {
    subjectsProgress,
    streak,
    loading
  };
}
