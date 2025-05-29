
import { useState } from 'react';
import { NewStudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';

export const useStudyPlanWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [planData, setPlanData] = useState<Partial<NewStudyPlan>>({
    examGoal: 'NEET',
    examDate: '',
    subjects: [],
    studyHoursPerDay: 6,
    preferredStudyTime: 'morning',
    learningPace: 'medium',
    status: 'active'
  });

  const steps = [
    'Exam Goal',
    'Subjects',
    'Schedule',
    'Preferences',
    'Review'
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updatePlanData = (updates: Partial<NewStudyPlan>) => {
    setPlanData(prev => ({ ...prev, ...updates }));
  };

  const getSubjectsForExam = (examType: string): StudyPlanSubject[] => {
    switch (examType) {
      case 'NEET':
        return [
          { id: '1', name: 'Physics', color: '#3B82F6', hoursPerWeek: 12, weeklyHours: 12, priority: 'medium', proficiency: 'strong', completed: false, progress: 0 },
          { id: '2', name: 'Chemistry', color: '#10B981', hoursPerWeek: 12, weeklyHours: 12, priority: 'medium', proficiency: 'medium', completed: false, progress: 0 },
          { id: '3', name: 'Biology', color: '#F59E0B', hoursPerWeek: 16, weeklyHours: 16, priority: 'medium', proficiency: 'weak', completed: false, progress: 0 }
        ];
      case 'JEE':
        return [
          { id: '1', name: 'Mathematics', color: '#8B5CF6', hoursPerWeek: 15, weeklyHours: 15, priority: 'medium', proficiency: 'medium', completed: false, progress: 0 },
          { id: '2', name: 'Physics', color: '#3B82F6', hoursPerWeek: 12, weeklyHours: 12, priority: 'medium', proficiency: 'strong', completed: false, progress: 0 },
          { id: '3', name: 'Chemistry', color: '#10B981', hoursPerWeek: 13, weeklyHours: 13, priority: 'medium', proficiency: 'weak', completed: false, progress: 0 }
        ];
      default:
        return [];
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // Exam Goal
        return !!planData.examGoal && !!planData.examDate;
      case 1: // Subjects
        return planData.subjects && planData.subjects.length > 0;
      case 2: // Schedule
        return !!planData.studyHoursPerDay && planData.studyHoursPerDay > 0;
      case 3: // Preferences
        return !!planData.preferredStudyTime && !!planData.learningPace;
      default:
        return true;
    }
  };

  const isStepValid = (step: number): boolean => {
    return validateStep(step);
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setPlanData({
      examGoal: 'NEET',
      examDate: '',
      subjects: [],
      studyHoursPerDay: 6,
      preferredStudyTime: 'morning',
      learningPace: 'medium',
      status: 'active'
    });
  };

  return {
    currentStep,
    planData,
    steps,
    nextStep,
    prevStep,
    updatePlanData,
    getSubjectsForExam,
    isStepValid,
    resetWizard
  };
};
