
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import type { NewStudyPlan, StudyPlanSubject } from "@/types/user/studyPlan";

interface UseStudyPlanWizardProps {
  examGoal?: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
  onClose: () => void;
}

export const useStudyPlanWizard = ({ examGoal = '', onCreatePlan, onClose }: UseStudyPlanWizardProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(examGoal ? 2 : 1); // Skip goal selection if examGoal is provided
  const [formData, setFormData] = useState<Omit<NewStudyPlan, 'subjects'> & { subjects: string[] }>({
    examGoal: examGoal || '',
    examDate: new Date(),
    subjects: [],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate',
    status: 'active',
    weeklyHours: 30
  });

  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [mediumSubjects, setMediumSubjects] = useState<string[]>([]);

  // Subject colors palette
  const subjectColors = [
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#2563EB', // Blue
    '#EF4444', // Red
    '#6366F1', // Indigo
    '#14B8A6', // Teal
    '#F97316', // Orange
  ];

  const getRandomColor = () => {
    return subjectColors[Math.floor(Math.random() * subjectColors.length)];
  };

  const handleToggleSubject = (subject: string, type: 'strong' | 'medium' | 'weak') => {
    // First remove subject from all categories
    setStrongSubjects(prevSubjects => prevSubjects.filter(s => s !== subject));
    setMediumSubjects(prevSubjects => prevSubjects.filter(s => s !== subject));
    setWeakSubjects(prevSubjects => prevSubjects.filter(s => s !== subject));
    
    // Then add to the selected category
    switch (type) {
      case 'strong':
        setStrongSubjects(prev => [...prev, subject]);
        break;
      case 'medium':
        setMediumSubjects(prev => [...prev, subject]);
        break;
      case 'weak':
        setWeakSubjects(prev => [...prev, subject]);
        break;
    }
  };

  const getSubjectsProficiencyList = (): StudyPlanSubject[] => {
    // Convert subject names to StudyPlanSubject objects
    return [
      ...strongSubjects.map(subject => ({
        id: `strong-${uuidv4()}`,
        name: subject,
        proficiency: 'strong' as const,
        priority: 'medium' as const,
        color: getRandomColor(),
        hoursPerWeek: Math.round(formData.studyHoursPerDay || 4),
        completed: false
      })),
      ...mediumSubjects.map(subject => ({
        id: `medium-${uuidv4()}`,
        name: subject,
        proficiency: 'medium' as const,
        priority: 'medium' as const,
        color: getRandomColor(),
        hoursPerWeek: Math.round((formData.studyHoursPerDay || 4) * 1.2),
        completed: false
      })),
      ...weakSubjects.map(subject => ({
        id: `weak-${uuidv4()}`,
        name: subject,
        proficiency: 'weak' as const,
        priority: 'high' as const,
        color: getRandomColor(),
        hoursPerWeek: Math.round((formData.studyHoursPerDay || 4) * 1.5),
        completed: false
      }))
    ];
  };

  const handlePaceChange = (pace: "Aggressive" | "Balanced" | "Relaxed") => {
    const learningPace: 'slow' | 'moderate' | 'fast' = 
      pace === 'Relaxed' ? 'slow' : 
      pace === 'Balanced' ? 'moderate' : 'fast';
    setFormData(prev => ({ ...prev, learningPace }));
  };

  const handleStudyTimeChange = (time: "Morning" | "Afternoon" | "Evening" | "Night") => {
    const preferredStudyTime = time.toLowerCase() as 'morning' | 'afternoon' | 'evening' | 'night';
    setFormData(prev => ({ ...prev, preferredStudyTime }));
  };

  const handleExamGoalSelect = (goal: string) => {
    setFormData(prev => ({ ...prev, examGoal: goal }));
    // Clear subjects when changing exam goal
    setStrongSubjects([]);
    setMediumSubjects([]);
    setWeakSubjects([]);
    setStep(2); // Move to next step after goal selection
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      const updatedFormData: NewStudyPlan = {
        ...formData,
        subjects: getSubjectsProficiencyList(),
        weeklyHours: formData.studyHoursPerDay ? formData.studyHoursPerDay * 7 : 28
      };
      onCreatePlan(updatedFormData);
      setStep(1);
      setStrongSubjects([]);
      setMediumSubjects([]);
      setWeakSubjects([]);
      setFormData({
        examGoal: '',
        examDate: new Date(),
        subjects: [],
        studyHoursPerDay: 6,
        preferredStudyTime: 'morning',
        learningPace: 'moderate',
        status: 'active',
        weeklyHours: 30
      });
      onClose();
      toast({
        title: "Study Plan Created",
        description: "Your personalized study plan has been generated successfully.",
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  return {
    step,
    formData,
    setFormData,
    strongSubjects,
    mediumSubjects,
    weakSubjects,
    handleToggleSubject,
    handlePaceChange,
    handleStudyTimeChange,
    handleExamGoalSelect,
    handleNext,
    handleBack
  };
};
