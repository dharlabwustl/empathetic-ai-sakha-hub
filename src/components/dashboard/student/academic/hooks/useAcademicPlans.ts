
import { useState, useEffect } from 'react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

export const useAcademicPlans = () => {
  const [jeeSubjects, setJeeSubjects] = useState<StudyPlanSubject[]>([]);
  const [neetSubjects, setNeetSubjects] = useState<StudyPlanSubject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadPlans = async () => {
      setLoading(true);
      
      // Mock JEE subjects with complete StudyPlanSubject structure
      const mockJeeSubjects: StudyPlanSubject[] = [
        {
          id: 'jee-physics',
          name: 'Physics',
          difficulty: 'medium',
          completed: false,
          status: 'in-progress',
          priority: 'high',
          proficiency: 'medium',
          hoursPerWeek: 8,
          chaptersTotal: 15,
          chaptersCompleted: 8,
          estimatedHours: 120,
          actualHours: 64,
          topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics']
        },
        {
          id: 'jee-chemistry',
          name: 'Chemistry',
          difficulty: 'medium',
          completed: false,
          status: 'in-progress',
          priority: 'medium',
          proficiency: 'weak',
          hoursPerWeek: 6,
          chaptersTotal: 12,
          chaptersCompleted: 5,
          estimatedHours: 96,
          actualHours: 42,
          topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry']
        },
        {
          id: 'jee-mathematics',
          name: 'Mathematics',
          difficulty: 'hard',
          completed: false,
          status: 'pending',
          priority: 'high',
          proficiency: 'strong',
          hoursPerWeek: 10,
          chaptersTotal: 18,
          chaptersCompleted: 12,
          estimatedHours: 144,
          actualHours: 96,
          topics: ['Algebra', 'Calculus', 'Coordinate Geometry', 'Trigonometry', 'Statistics']
        }
      ];

      // Mock NEET subjects with complete StudyPlanSubject structure
      const mockNeetSubjects: StudyPlanSubject[] = [
        {
          id: 'neet-physics',
          name: 'Physics',
          difficulty: 'medium',
          completed: true,
          status: 'completed',
          priority: 'medium',
          proficiency: 'weak',
          hoursPerWeek: 6,
          chaptersTotal: 12,
          chaptersCompleted: 12,
          estimatedHours: 72,
          actualHours: 78,
          topics: ['Mechanics', 'Thermodynamics', 'Waves', 'Electromagnetism', 'Modern Physics']
        },
        {
          id: 'neet-chemistry',
          name: 'Chemistry',
          difficulty: 'easy',
          completed: true,
          status: 'completed',
          priority: 'low',
          proficiency: 'weak',
          hoursPerWeek: 5,
          chaptersTotal: 10,
          chaptersCompleted: 10,
          estimatedHours: 60,
          actualHours: 65,
          topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry']
        },
        {
          id: 'neet-biology',
          name: 'Biology',
          difficulty: 'medium',
          completed: true,
          status: 'completed',
          priority: 'high',
          proficiency: 'medium',
          hoursPerWeek: 8,
          chaptersTotal: 16,
          chaptersCompleted: 16,
          estimatedHours: 96,
          actualHours: 88,
          topics: ['Botany', 'Zoology', 'Human Physiology', 'Genetics', 'Evolution']
        }
      ];

      setTimeout(() => {
        setJeeSubjects(mockJeeSubjects);
        setNeetSubjects(mockNeetSubjects);
        setLoading(false);
      }, 1000);
    };

    loadPlans();
  }, []);

  const updateSubjectProgress = (examType: 'JEE' | 'NEET', subjectId: string, progress: Partial<StudyPlanSubject>) => {
    if (examType === 'JEE') {
      setJeeSubjects(prev => prev.map(subject => 
        subject.id === subjectId ? { ...subject, ...progress } : subject
      ));
    } else {
      setNeetSubjects(prev => prev.map(subject => 
        subject.id === subjectId ? { ...subject, ...progress } : subject
      ));
    }
  };

  const addNewSubject = (examType: 'JEE' | 'NEET', subject: StudyPlanSubject) => {
    if (examType === 'JEE') {
      setJeeSubjects(prev => [...prev, subject]);
    } else {
      setNeetSubjects(prev => [...prev, subject]);
    }
  };

  return {
    jeeSubjects,
    neetSubjects,
    loading,
    updateSubjectProgress,
    addNewSubject
  };
};
