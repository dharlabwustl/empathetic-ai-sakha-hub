
import { useState } from 'react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface StudyPlanWizardData {
  examType: string;
  targetDate: Date | null;
  weeklyHours: number;
  strengths: string[];
  weaknesses: string[];
  preferredStudyTime: string;
  subjects: StudyPlanSubject[];
}

export const useStudyPlanWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<StudyPlanWizardData>({
    examType: '',
    targetDate: null,
    weeklyHours: 20,
    strengths: [],
    weaknesses: [],
    preferredStudyTime: 'morning',
    subjects: []
  });

  const updateWizardData = (data: Partial<StudyPlanWizardData>) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  const generateSubjects = (examType: string): StudyPlanSubject[] => {
    const baseSubjects = examType === 'JEE' 
      ? [
          { 
            id: 'physics', 
            name: 'Physics',
            difficulty: 'medium' as const,
            completed: false,
            status: 'pending' as const,
            priority: 'medium' as const,
            proficiency: 'strong' as const,
            hoursPerWeek: 8,
            chaptersTotal: 15,
            chaptersCompleted: 0,
            estimatedHours: 120,
            actualHours: 0,
            topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism']
          },
          { 
            id: 'chemistry', 
            name: 'Chemistry',
            difficulty: 'medium' as const,
            completed: false,
            status: 'pending' as const,
            priority: 'medium' as const,
            proficiency: 'medium' as const,
            hoursPerWeek: 6,
            chaptersTotal: 12,
            chaptersCompleted: 0,
            estimatedHours: 96,
            actualHours: 0,
            topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry']
          },
          { 
            id: 'mathematics', 
            name: 'Mathematics',
            difficulty: 'hard' as const,
            completed: false,
            status: 'pending' as const,
            priority: 'high' as const,
            proficiency: 'weak' as const,
            hoursPerWeek: 10,
            chaptersTotal: 18,
            chaptersCompleted: 0,
            estimatedHours: 144,
            actualHours: 0,
            topics: ['Algebra', 'Calculus', 'Coordinate Geometry']
          }
        ]
      : [
          { 
            id: 'physics', 
            name: 'Physics',
            difficulty: 'medium' as const,
            completed: false,
            status: 'pending' as const,
            priority: 'medium' as const,
            proficiency: 'medium' as const,
            hoursPerWeek: 6,
            chaptersTotal: 12,
            chaptersCompleted: 0,
            estimatedHours: 72,
            actualHours: 0,
            topics: ['Mechanics', 'Thermodynamics', 'Waves']
          },
          { 
            id: 'chemistry', 
            name: 'Chemistry',
            difficulty: 'easy' as const,
            completed: false,
            status: 'pending' as const,
            priority: 'medium' as const,
            proficiency: 'strong' as const,
            hoursPerWeek: 5,
            chaptersTotal: 10,
            chaptersCompleted: 0,
            estimatedHours: 60,
            actualHours: 0,
            topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry']
          },
          { 
            id: 'biology', 
            name: 'Biology',
            difficulty: 'medium' as const,
            completed: false,
            status: 'pending' as const,
            priority: 'high' as const,
            proficiency: 'weak' as const,
            hoursPerWeek: 8,
            chaptersTotal: 16,
            chaptersCompleted: 0,
            estimatedHours: 96,
            actualHours: 0,
            topics: ['Botany', 'Zoology', 'Human Physiology']
          }
        ];

    return baseSubjects;
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const generatePlan = () => {
    const subjects = generateSubjects(wizardData.examType);
    updateWizardData({ subjects });
    return subjects;
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setWizardData({
      examType: '',
      targetDate: null,
      weeklyHours: 20,
      strengths: [],
      weaknesses: [],
      preferredStudyTime: 'morning',
      subjects: []
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
