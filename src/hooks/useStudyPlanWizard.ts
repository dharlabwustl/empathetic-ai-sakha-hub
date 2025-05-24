
import { useState } from 'react';
import { StudyPlanWizardData, StudyPlanSubject } from '@/types/user/studyPlan';

export const useStudyPlanWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<StudyPlanWizardData>({
    examGoal: '',
    targetDate: new Date(),
    studyHours: 4,
    subjects: [],
    strongSubjects: [],
    mediumSubjects: [],
    weakSubjects: [],
    studyPace: 'medium'
  });

  const updateWizardData = (data: Partial<StudyPlanWizardData>) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const generatePlan = (): StudyPlanSubject[] => {
    // Generate study plan based on wizard data
    return wizardData.subjects.map(subject => ({
      id: `subject-${subject.toLowerCase()}`,
      name: subject,
      difficulty: 'medium' as const,
      completed: false,
      status: 'pending' as const,
      priority: 'medium' as const,
      proficiency: 'medium' as const,
      hoursPerWeek: wizardData.studyHours,
      chaptersTotal: 10,
      chaptersCompleted: 0,
      estimatedHours: 40,
      actualHours: 0,
      topics: [`${subject} Basics`, `Advanced ${subject}`],
      color: '#3B82F6'
    }));
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setWizardData({
      examGoal: '',
      targetDate: new Date(),
      studyHours: 4,
      subjects: [],
      strongSubjects: [],
      mediumSubjects: [],
      weakSubjects: [],
      studyPace: 'medium'
    });
  };

  return {
    currentStep,
    wizardData,
    updateWizardData,
    nextStep,
    prevStep,
    generatePlan,
    resetWizard
  };
};
