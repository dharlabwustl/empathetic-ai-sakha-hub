
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { NewStudyPlan, NewStudyPlanSubject } from "@/types/user/studyPlan";

interface UseStudyPlanWizardProps {
  examGoal: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
  onClose: () => void;
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

  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);

  const handleToggleSubject = (subject: string, type: 'strong' | 'weak') => {
    if (type === 'strong') {
      if (strongSubjects.includes(subject)) {
        setStrongSubjects(strongSubjects.filter(s => s !== subject));
      } else {
        if (weakSubjects.includes(subject)) {
          setWeakSubjects(weakSubjects.filter(s => s !== subject));
        }
        setStrongSubjects([...strongSubjects, subject]);
      }
    } else {
      if (weakSubjects.includes(subject)) {
        setWeakSubjects(weakSubjects.filter(s => s !== subject));
      } else {
        if (strongSubjects.includes(subject)) {
          setStrongSubjects(strongSubjects.filter(s => s !== subject));
        }
        setWeakSubjects([...weakSubjects, subject]);
      }
    }
  };

  const getSubjectsProficiencyList = (): NewStudyPlanSubject[] => {
    const subjectsList: NewStudyPlanSubject[] = [
      ...strongSubjects.map(subject => ({ name: subject, proficiency: 'strong' as const })),
      ...weakSubjects.map(subject => ({ name: subject, proficiency: 'weak' as const }))
    ];
    return subjectsList;
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
