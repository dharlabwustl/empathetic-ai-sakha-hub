
import { useState, useEffect } from "react";
import { getMockProgressData } from "@/data/mockProgressData";
import { SubjectProgress, StudyStreak } from "@/types/user";

// Update the hook to match the expected return structure
export function useStudyProgress() {
  const [subjectsProgress, setSubjectsProgress] = useState<SubjectProgress[]>([]);
  const [streak, setStreak] = useState<StudyStreak>({ 
    current: 0, 
    longest: 0, 
    thisWeek: [], 
    lastMonth: [] 
  });
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<SubjectProgress | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { subjects, studyStreak } = await getMockProgressData();
        setSubjectsProgress(subjects);
        setStreak(studyStreak);
        if (subjects.length > 0) {
          setSelectedSubject(subjects[0]);
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectSubject = (subjectId: string) => {
    const subject = subjectsProgress.find(s => s.id === subjectId);
    if (subject) {
      setSelectedSubject(subject);
    }
  };

  return {
    subjectsProgress,
    streak,
    loading,
    selectedSubject,
    selectSubject
  };
}
