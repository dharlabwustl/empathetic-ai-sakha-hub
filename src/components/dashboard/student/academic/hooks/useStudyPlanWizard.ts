
import { useState } from 'react';
import { StudyPlanSubject, NewStudyPlan } from '@/types/user/studyPlan';

export const useStudyPlanWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<NewStudyPlan>>({
    examGoal: '',
    examDate: new Date(),
    title: '',
    subjects: [],
    learningPace: 'moderate',
    preferredStudyTime: 'morning',
    studyHoursPerDay: 4,
    weeklyHours: 28
  });

  // Default subjects for different exam types
  const NEETSubjects: StudyPlanSubject[] = [
    {
      id: 'physics',
      name: 'Physics',
      hoursPerWeek: 10,
      priority: 'high',
      proficiency: 'medium',
      completed: false
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      hoursPerWeek: 10,
      priority: 'high',
      proficiency: 'medium',
      completed: false
    },
    {
      id: 'biology',
      name: 'Biology',
      hoursPerWeek: 10,
      priority: 'high',
      proficiency: 'medium',
      completed: false
    }
  ];

  const JEESubjects: StudyPlanSubject[] = [
    {
      id: 'physics',
      name: 'Physics',
      hoursPerWeek: 10,
      priority: 'high',
      proficiency: 'medium',
      completed: false
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      hoursPerWeek: 10,
      priority: 'high',
      proficiency: 'medium',
      completed: false
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      hoursPerWeek: 10,
      priority: 'high',
      proficiency: 'medium',
      completed: false
    }
  ];

  const UPSCSubjects: StudyPlanSubject[] = [
    {
      id: 'general-studies',
      name: 'General Studies',
      hoursPerWeek: 10,
      priority: 'high',
      proficiency: 'medium',
      completed: false
    },
    {
      id: 'current-affairs',
      name: 'Current Affairs',
      hoursPerWeek: 8,
      priority: 'high',
      proficiency: 'medium',
      completed: false
    },
    {
      id: 'optional-subject',
      name: 'Optional Subject',
      hoursPerWeek: 12,
      priority: 'high',
      proficiency: 'medium',
      completed: false
    }
  ];

  const examTypeSubjects = {
    NEET: NEETSubjects,
    JEE: JEESubjects,
    UPSC: UPSCSubjects
  };

  const handleNext = () => {
    if (step === 1 && formData.examGoal) {
      // Auto-populate subjects based on exam type
      if (formData.examGoal && !formData.subjects?.length) {
        const subjects = examTypeSubjects[formData.examGoal as keyof typeof examTypeSubjects] || [];
        setFormData(prev => ({
          ...prev,
          subjects,
          title: `${formData.examGoal} Preparation Plan`
        }));
      }
    }
    setStep(prev => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleComplete = () => {
    // In a real app, submit to API
    console.log('Complete study plan:', formData);
    const plan: NewStudyPlan = {
      ...formData,
      examGoal: formData.examGoal || 'NEET',
      examDate: formData.examDate || new Date(),
      subjects: formData.subjects || [],
      studyHoursPerDay: formData.studyHoursPerDay || 4,
      preferredStudyTime: formData.preferredStudyTime || 'morning',
      learningPace: formData.learningPace || 'moderate'
    };
    
    return plan;
  };

  return {
    step,
    formData,
    setFormData,
    handleNext,
    handleBack,
    handleComplete,
    NEETSubjects,
    JEESubjects,
    UPSCSubjects
  };
};
