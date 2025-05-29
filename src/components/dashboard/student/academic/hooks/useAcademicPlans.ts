
import { useState, useEffect } from 'react';
import { StudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';

export const useAcademicPlans = () => {
  const [currentPlans, setCurrentPlans] = useState<StudyPlan[]>([]);
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadPlans = async () => {
      setLoading(true);
      
      // Mock current plans data
      const mockCurrentPlans: StudyPlan[] = [
        {
          id: '1',
          title: 'NEET 2025 Preparation',
          examGoal: 'NEET',
          examDate: '2025-05-05',
          status: 'active',
          subjects: [
            {
              id: '1',
              name: 'Physics',
              color: '#3B82F6',
              hoursPerWeek: 15,
              weeklyHours: 15,
              priority: 'high',
              proficiency: 'medium',
              completed: false,
              progress: 65
            },
            {
              id: '2',
              name: 'Chemistry',
              color: '#10B981',
              hoursPerWeek: 12,
              weeklyHours: 12,
              priority: 'medium',
              proficiency: 'weak',
              completed: false,
              progress: 45
            },
            {
              id: '3',
              name: 'Biology',
              color: '#F59E0B',
              hoursPerWeek: 18,
              weeklyHours: 18,
              priority: 'high',
              proficiency: 'strong',
              completed: false,
              progress: 80
            }
          ],
          studyHoursPerDay: 6,
          preferredStudyTime: 'morning',
          learningPace: 'medium',
          createdAt: '2024-01-15',
          progressPercent: 63
        }
      ];

      // Mock completed plans data
      const mockCompletedPlans: StudyPlan[] = [
        {
          id: '2',
          title: 'JEE Advanced 2024',
          examGoal: 'JEE Advanced',
          examDate: '2024-05-28',
          status: 'completed',
          subjects: [
            {
              id: '4',
              name: 'Mathematics',
              color: '#8B5CF6',
              hoursPerWeek: 20,
              weeklyHours: 20,
              priority: 'medium',
              proficiency: 'weak',
              completed: true,
              progress: 100
            },
            {
              id: '5',
              name: 'Physics',
              color: '#3B82F6',
              hoursPerWeek: 18,
              weeklyHours: 18,
              priority: 'low',
              proficiency: 'weak',
              completed: true,
              progress: 100
            },
            {
              id: '6',
              name: 'Chemistry',
              color: '#10B981',
              hoursPerWeek: 15,
              weeklyHours: 15,
              priority: 'high',
              proficiency: 'medium',
              completed: true,
              progress: 100
            }
          ],
          studyHoursPerDay: 8,
          preferredStudyTime: 'evening',
          learningPace: 'fast',
          createdAt: '2023-08-01',
          progressPercent: 100
        }
      ];

      setCurrentPlans(mockCurrentPlans);
      setCompletedPlans(mockCompletedPlans);
      setLoading(false);
    };

    loadPlans();
  }, []);

  const createNewPlan = (planData: Partial<StudyPlan>) => {
    const newPlan: StudyPlan = {
      id: Date.now().toString(),
      title: planData.title || 'New Study Plan',
      examGoal: planData.examGoal || 'NEET',
      examDate: planData.examDate || '2025-05-05',
      status: 'active',
      subjects: planData.subjects || [
        { id: '1', name: 'Physics', color: '#3B82F6', hoursPerWeek: 10, weeklyHours: 10, priority: 'medium', proficiency: 'medium', completed: false, progress: 0 },
        { id: '2', name: 'Chemistry', color: '#10B981', hoursPerWeek: 10, weeklyHours: 10, priority: 'medium', proficiency: 'medium', completed: false, progress: 0 },
        { id: '3', name: 'Biology', color: '#F59E0B', hoursPerWeek: 10, weeklyHours: 10, priority: 'medium', proficiency: 'medium', completed: false, progress: 0 }
      ],
      studyHoursPerDay: planData.studyHoursPerDay || 6,
      preferredStudyTime: planData.preferredStudyTime || 'morning',
      learningPace: planData.learningPace || 'medium',
      createdAt: new Date().toISOString(),
      progressPercent: 0
    };

    setCurrentPlans(prev => [...prev, newPlan]);
    return newPlan;
  };

  const updatePlan = (planId: string, updates: Partial<StudyPlan>) => {
    setCurrentPlans(prev => 
      prev.map(plan => 
        plan.id === planId ? { ...plan, ...updates } : plan
      )
    );
  };

  const deletePlan = (planId: string) => {
    setCurrentPlans(prev => prev.filter(plan => plan.id !== planId));
  };

  return {
    currentPlans,
    completedPlans,
    loading,
    createNewPlan,
    updatePlan,
    deletePlan
  };
};
