
import { useState, useEffect } from 'react';
import { SubjectProgress, StudyStreak } from '@/types/user/student';
import { getMockProgressData } from '@/data/mockProgressData';

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
    // Simulate API call to fetch progress data
    const fetchProgress = async () => {
      setLoading(true);
      
      setTimeout(() => {
        const mockData = getMockProgressData();
        setSubjectsProgress(mockData.subjectsProgress);
        setStreak(mockData.streak);
        setSelectedSubject(mockData.selectedSubject);
        setLoading(false);
      }, 800);
    };

    fetchProgress();
  }, []);

  const selectSubject = (subjectId: string) => {
    const subject = subjectsProgress.find((s) => s.id === subjectId);
    if (subject) {
      setSelectedSubject(subject);
    }
  };

  return {
    subjectsProgress,
    streak,
    loading,
    selectedSubject: selectedSubject || (subjectsProgress.length > 0 ? subjectsProgress[0] : {} as SubjectProgress),
    selectSubject
  };
}
