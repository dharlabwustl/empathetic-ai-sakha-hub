
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { NewStudyPlan, StudyPlanSubject } from "@/types/user/studyPlan";

interface UseStudyPlanWizardProps {
  examGoal: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
  onClose: () => void;
}

// Define proper types for the study plan
type ProficiencyType = 'strong' | 'medium' | 'weak';

interface CustomStudyPlanSubject {
  name: string;
  proficiency: ProficiencyType;
}

export const useStudyPlanWizard = ({ examGoal, onCreatePlan, onClose }: UseStudyPlanWizardProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(examGoal ? 2 : 1); // Skip goal selection if examGoal is provided
  const [formData, setFormData] = useState<NewStudyPlan>({
    examGoal,
    examDate: new Date(),
    subjects: [],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  });

  const [strongSubjects, setStrongSubjects] = useState<CustomStudyPlanSubject[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<CustomStudyPlanSubject[]>([]);

  const handleToggleSubject = (subject: string, type: 'strong' | 'weak') => {
    if (type === 'strong') {
      if (strongSubjects.some(s => s.name === subject)) {
        setStrongSubjects(strongSubjects.filter(s => s.name !== subject));
      } else {
        setWeakSubjects(weakSubjects.filter(s => s.name !== subject));
        setStrongSubjects([...strongSubjects, { name: subject, proficiency: 'strong' }]);
      }
    } else {
      if (weakSubjects.some(s => s.name !== subject)) {
        setWeakSubjects(weakSubjects.filter(s => s.name !== subject));
      } else {
        setStrongSubjects(strongSubjects.filter(s => s.name !== subject));
        setWeakSubjects([...weakSubjects, { name: subject, proficiency: 'weak' }]);
      }
    }
  };

  const getSubjectsProficiencyList = (): StudyPlanSubject[] => {
    // Convert our simple subjects to the StudyPlanSubject format
    return [
      ...strongSubjects.map(subject => ({
        id: `s-${subject.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: subject.name,
        proficiency: subject.proficiency as ProficiencyType,
        priority: 'high' as 'high',
        color: '#4CAF50',
        hoursPerWeek: 6,
        completed: false
      })),
      ...weakSubjects.map(subject => ({
        id: `w-${subject.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: subject.name,
        proficiency: subject.proficiency as ProficiencyType,
        priority: 'high' as 'high',
        color: '#F44336',
        hoursPerWeek: 8,
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
    setWeakSubjects([]);
    setStep(2); // Move to next step after goal selection
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      const updatedFormData = {
        ...formData,
        subjects: getSubjectsProficiencyList()
      };
      onCreatePlan(updatedFormData);
      setStep(1);
      setStrongSubjects([]);
      setWeakSubjects([]);
      setFormData({
        examGoal: '',
        examDate: new Date(),
        subjects: [],
        studyHoursPerDay: 6,
        preferredStudyTime: 'morning',
        learningPace: 'moderate'
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
    weakSubjects,
    handleToggleSubject,
    handlePaceChange,
    handleStudyTimeChange,
    handleExamGoalSelect,
    handleNext,
    handleBack
  };
};
