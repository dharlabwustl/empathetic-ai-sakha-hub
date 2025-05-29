
import { useState, useEffect } from 'react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

export const useAcademicPlans = () => {
  const [currentPlans, setCurrentPlans] = useState<StudyPlanSubject[]>([]);
  const [pastPlans, setPastPlans] = useState<StudyPlanSubject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading academic plans
    const loadPlans = async () => {
      setLoading(true);
      
      // Mock current plans data
      const mockCurrentPlans: StudyPlanSubject[] = [
        {
          id: 'current-1',
          name: 'NEET Physics - Mechanics',
          color: '#3B82F6',
          hoursPerWeek: 8,
          weeklyHours: 8,
          progress: 75,
          priority: 'high',
          proficiency: 'medium',
          completed: false,
        },
        {
          id: 'current-2',
          name: 'NEET Chemistry - Organic',
          color: '#EF4444',
          hoursPerWeek: 6,
          weeklyHours: 6,
          progress: 45,
          priority: 'medium',
          proficiency: 'weak',
          completed: false,
        },
        {
          id: 'current-3',
          name: 'NEET Biology - Genetics',
          color: '#10B981',
          hoursPerWeek: 10,
          weeklyHours: 10,
          progress: 90,
          priority: 'high',
          proficiency: 'strong',
          completed: false,
        }
      ];

      // Mock past plans data
      const mockPastPlans: StudyPlanSubject[] = [
        {
          id: 'past-1',
          name: 'NEET Physics - Thermodynamics',
          color: '#8B5CF6',
          hoursPerWeek: 6,
          weeklyHours: 6,
          progress: 100,
          priority: 'medium',
          proficiency: 'weak',
          completed: true,
        },
        {
          id: 'past-2',
          name: 'NEET Chemistry - Inorganic',
          color: '#F59E0B',
          hoursPerWeek: 8,
          weeklyHours: 8,
          progress: 100,
          priority: 'low',
          proficiency: 'weak',
          completed: true,
        },
        {
          id: 'past-3',
          name: 'NEET Biology - Plant Kingdom',
          color: '#06B6D4',
          hoursPerWeek: 7,
          weeklyHours: 7,
          progress: 100,
          priority: 'high',
          proficiency: 'medium',
          completed: true,
        }
      ];

      setCurrentPlans(mockCurrentPlans);
      setPastPlans(mockPastPlans);
      setLoading(false);
    };

    loadPlans();
  }, []);

  const createNewPlan = (planData: Partial<StudyPlanSubject>) => {
    const newPlan: StudyPlanSubject = {
      id: `plan-${Date.now()}`,
      name: planData.name || 'New Study Plan',
      color: planData.color || '#6B7280',
      hoursPerWeek: planData.hoursPerWeek || 5,
      weeklyHours: planData.weeklyHours || planData.hoursPerWeek || 5,
      progress: 0,
      priority: planData.priority || 'medium',
      proficiency: planData.proficiency || 'medium',
      completed: false,
    };

    setCurrentPlans(prev => [...prev, newPlan]);
    return newPlan;
  };

  const getSubjectsByType = (examType: string): StudyPlanSubject[] => {
    const baseSubjects = {
      'NEET': [
        { id: 'neet-phy', name: 'Physics', color: '#3B82F6', hoursPerWeek: 8, priority: 'medium' as const, proficiency: 'strong' as const, completed: false },
        { id: 'neet-chem', name: 'Chemistry', color: '#EF4444', hoursPerWeek: 8, priority: 'medium' as const, proficiency: 'medium' as const, completed: false },
        { id: 'neet-bio', name: 'Biology', color: '#10B981', hoursPerWeek: 8, priority: 'medium' as const, proficiency: 'medium' as const, completed: false },
      ],
      'JEE': [
        { id: 'jee-phy', name: 'Physics', color: '#3B82F6', hoursPerWeek: 10, priority: 'high' as const, proficiency: 'medium' as const, completed: false },
        { id: 'jee-chem', name: 'Chemistry', color: '#EF4444', hoursPerWeek: 8, priority: 'medium' as const, proficiency: 'weak' as const, completed: false },
        { id: 'jee-math', name: 'Mathematics', color: '#8B5CF6', hoursPerWeek: 12, priority: 'high' as const, proficiency: 'strong' as const, completed: false },
      ]
    };

    const subjects = baseSubjects[examType as keyof typeof baseSubjects] || baseSubjects['NEET'];
    
    return subjects.map(subject => ({
      ...subject,
      weeklyHours: subject.hoursPerWeek,
      progress: 0
    }));
  };

  return {
    currentPlans,
    pastPlans,
    loading,
    createNewPlan,
    getSubjectsByType
  };
};
