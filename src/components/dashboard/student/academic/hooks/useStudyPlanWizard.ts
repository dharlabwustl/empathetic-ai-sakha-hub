
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { NewStudyPlan, StudyPlanSubject } from "@/types/user/studyPlan";
import { useNavigate } from 'react-router-dom';

interface UseStudyPlanWizardProps {
  examGoal?: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
  onClose: () => void;
}

export const useStudyPlanWizard = ({ examGoal = '', onCreatePlan, onClose }: UseStudyPlanWizardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(examGoal ? 2 : 1);
  const [formData, setFormData] = useState<Partial<NewStudyPlan>>({
    name: '',
    exam: examGoal || '',
    examGoal: examGoal || '',
    subjects: [],
    hoursPerWeek: 20,
    totalHours: 1000,
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'medium',
    examDate: new Date().toISOString().split('T')[0]
  });

  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [mediumSubjects, setMediumSubjects] = useState<string[]>([]);

  const handleToggleSubject = (subject: string, type: 'strong' | 'weak' | 'medium') => {
    if (type === 'strong') {
      if (strongSubjects.includes(subject)) {
        setStrongSubjects(strongSubjects.filter(s => s !== subject));
      } else {
        if (weakSubjects.includes(subject)) {
          setWeakSubjects(weakSubjects.filter(s => s !== subject));
        }
        if (mediumSubjects.includes(subject)) {
          setMediumSubjects(mediumSubjects.filter(s => s !== subject));
        }
        setStrongSubjects([...strongSubjects, subject]);
      }
    } else if (type === 'weak') {
      if (weakSubjects.includes(subject)) {
        setWeakSubjects(weakSubjects.filter(s => s !== subject));
      } else {
        if (strongSubjects.includes(subject)) {
          setStrongSubjects(strongSubjects.filter(s => s !== subject));
        }
        if (mediumSubjects.includes(subject)) {
          setMediumSubjects(mediumSubjects.filter(s => s !== subject));
        }
        setWeakSubjects([...weakSubjects, subject]);
      }
    } else {
      if (mediumSubjects.includes(subject)) {
        setMediumSubjects(mediumSubjects.filter(s => s !== subject));
      } else {
        if (strongSubjects.includes(subject)) {
          setStrongSubjects(strongSubjects.filter(s => s !== subject));
        }
        if (weakSubjects.includes(subject)) {
          setWeakSubjects(weakSubjects.filter(s => s !== subject));
        }
        setMediumSubjects([...mediumSubjects, subject]);
      }
    }
  };

  const getSubjectsProficiencyList = (): StudyPlanSubject[] => {
    const subjectsList: StudyPlanSubject[] = [
      ...strongSubjects.map(subject => ({ 
        id: `subject-${Math.random().toString(36).substr(2, 9)}`,
        name: subject, 
        color: getRandomColor(),
        hoursPerWeek: formData.studyHoursPerDay || 4,
        weeklyHours: formData.studyHoursPerDay || 4,
        progress: 0,
        priority: 'medium' as const,
        proficiency: 'strong' as const,
        completed: false 
      })),
      ...mediumSubjects.map(subject => ({ 
        id: `subject-${Math.random().toString(36).substr(2, 9)}`,
        name: subject, 
        color: getRandomColor(),
        hoursPerWeek: (formData.studyHoursPerDay || 4) * 1.2,
        weeklyHours: (formData.studyHoursPerDay || 4) * 1.2,
        progress: 0,
        priority: 'medium' as const,
        proficiency: 'medium' as const,
        completed: false 
      })),
      ...weakSubjects.map(subject => ({ 
        id: `subject-${Math.random().toString(36).substr(2, 9)}`,
        name: subject, 
        color: getRandomColor(),
        hoursPerWeek: (formData.studyHoursPerDay || 4) * 1.5,
        weeklyHours: (formData.studyHoursPerDay || 4) * 1.5,
        progress: 0,
        priority: 'high' as const,
        proficiency: 'weak' as const,
        completed: false,
        isWeakSubject: true
      }))
    ];
    return subjectsList;
  };

  const handlePaceChange = (pace: "Aggressive" | "Balanced" | "Relaxed") => {
    const learningPace: 'slow' | 'medium' | 'fast' = 
      pace === 'Relaxed' ? 'slow' : 
      pace === 'Balanced' ? 'medium' : 'fast';
    setFormData(prev => ({ ...prev, learningPace }));
  };

  const handleStudyTimeChange = (time: "Morning" | "Afternoon" | "Evening") => {
    const preferredStudyTime = time.toLowerCase() as 'morning' | 'afternoon' | 'evening';
    setFormData(prev => ({ ...prev, preferredStudyTime }));
  };

  const handleExamGoalSelect = (goal: string) => {
    setFormData(prev => ({ ...prev, exam: goal, examGoal: goal, name: goal }));
    setStrongSubjects([]);
    setWeakSubjects([]);
    setMediumSubjects([]);
    setStep(2);
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      const updatedFormData = {
        ...formData,
        name: formData.examGoal || '',
        subjects: getSubjectsProficiencyList(),
        hoursPerWeek: formData.studyHoursPerDay ? formData.studyHoursPerDay * 7 : 20,
      } as NewStudyPlan;
      
      onCreatePlan(updatedFormData);
      setStep(1);
      setStrongSubjects([]);
      setWeakSubjects([]);
      setMediumSubjects([]);
      setFormData({
        name: '',
        exam: '',
        examGoal: '',
        subjects: [],
        hoursPerWeek: 20,
        totalHours: 1000,
        studyHoursPerDay: 6,
        preferredStudyTime: 'evening',
        learningPace: 'medium',
        examDate: new Date().toISOString().split('T')[0]
      });
      onClose();
      toast({
        title: "Study Plan Created",
        description: "Your personalized study plan has been generated successfully.",
      });
      
      navigate('/dashboard/student/academic');
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
    mediumSubjects,
    handleToggleSubject,
    handlePaceChange,
    handleStudyTimeChange,
    handleExamGoalSelect,
    handleNext,
    handleBack
  };
};

function getRandomColor(): string {
  const colors = [
    '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#2563EB',
    '#EF4444', '#6366F1', '#14B8A6', '#F97316', '#8B5CF6'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
