
import { useState } from 'react';
import { StudyPlanSubject, NewStudyPlan } from '@/types/user/studyPlan';

export const useStudyPlanWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [planData, setPlanData] = useState<Partial<NewStudyPlan>>({
    examDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
    studyHoursPerDay: 4,
    preferredStudyTime: 'evening',
    learningPace: 'medium'
  });

  const updatePlanData = (updates: Partial<NewStudyPlan>) => {
    setPlanData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const previousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getSubjectsByExamType = (examType: string): StudyPlanSubject[] => {
    const subjectConfigs = {
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

    const subjects = subjectConfigs[examType as keyof typeof subjectConfigs] || subjectConfigs['NEET'];
    
    return subjects.map(subject => ({
      ...subject,
      weeklyHours: subject.hoursPerWeek,
      progress: 0
    }));
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!planData.examDate;
      case 2:
        return !!(planData.studyHoursPerDay && planData.studyHoursPerDay > 0);
      case 3:
        return !!(planData.subjects && planData.subjects.length > 0);
      case 4:
        return !!planData.preferredStudyTime;
      case 5:
        return !!planData.learningPace;
      default:
        return false;
    }
  };

  const submitPlan = async (): Promise<boolean> => {
    try {
      // Validate all required fields
      if (!planData.examDate || !planData.studyHoursPerDay || !planData.subjects) {
        throw new Error('Missing required fields');
      }

      // Create the final plan object
      const finalPlan: NewStudyPlan = {
        id: `plan-${Date.now()}`,
        title: `${planData.examGoal || 'Study'} Preparation Plan`,
        goal: planData.examGoal || 'General Preparation',
        examGoal: planData.examGoal || 'NEET',
        subjects: planData.subjects,
        studyHoursPerDay: planData.studyHoursPerDay,
        preferredStudyTime: planData.preferredStudyTime || 'evening',
        learningPace: planData.learningPace || 'medium',
        weeklyHours: (planData.studyHoursPerDay || 4) * 7,
        examDate: planData.examDate,
        status: 'active'
      };

      // Here you would typically save to your backend
      console.log('Submitting plan:', finalPlan);
      
      // Save to localStorage for demo
      const existingPlans = JSON.parse(localStorage.getItem('studyPlans') || '[]');
      existingPlans.push(finalPlan);
      localStorage.setItem('studyPlans', JSON.stringify(existingPlans));

      return true;
    } catch (error) {
      console.error('Error submitting plan:', error);
      return false;
    }
  };

  return {
    currentStep,
    planData,
    updatePlanData,
    nextStep,
    previousStep,
    getSubjectsByExamType,
    validateCurrentStep,
    submitPlan
  };
};
