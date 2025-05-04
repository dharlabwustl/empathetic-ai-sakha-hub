
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';
import { StudyPlan, NewStudyPlan } from '@/types/user/studyPlan';

export const useAcademicPlans = (examGoal?: string) => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

  // Create some mock plans
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([
    {
      id: "plan-1",
      examGoal: examGoal || "NEET",
      title: "NEET Preparation",
      examDate: "2024-12-15",
      createdAt: "2024-04-10T12:00:00Z",
      updatedAt: "2024-04-10T12:00:00Z",
      status: 'active',
      weeklyHours: 42,
      progressPercent: 35,
      subjects: [
        {
          id: "physics-1",
          name: "Physics",
          color: "#3b82f6",
          hoursPerWeek: 14,
          priority: "high",
          proficiency: "medium",
          completed: false
        },
        {
          id: "chem-1",
          name: "Chemistry",
          color: "#10b981",
          hoursPerWeek: 12,
          priority: "medium",
          proficiency: "weak",
          completed: false
        },
        {
          id: "math-1",
          name: "Mathematics",
          color: "#8b5cf6",
          hoursPerWeek: 16,
          priority: "high",
          proficiency: "strong",
          completed: false
        }
      ],
      studyHoursPerDay: 6,
      preferredStudyTime: 'evening',
      learningPace: 'moderate'
    }
  ]);

  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([
    {
      id: "plan-old-1",
      title: "NEET Preparation",
      examGoal: "NEET",
      examDate: "2024-03-15",
      createdAt: "2024-01-01T12:00:00Z",
      updatedAt: "2024-03-15T12:00:00Z",
      status: 'completed',
      weeklyHours: 35,
      progressPercent: 100,
      subjects: [
        {
          id: "physics-old",
          name: "Physics",
          color: "#3b82f6",
          hoursPerWeek: 10,
          priority: "medium",
          proficiency: "weak",
          completed: true
        },
        {
          id: "chem-old",
          name: "Chemistry",
          color: "#10b981",
          hoursPerWeek: 12,
          priority: "low",
          proficiency: "weak",
          completed: true
        },
        {
          id: "math-old",
          name: "Mathematics",
          color: "#8b5cf6",
          hoursPerWeek: 13,
          priority: "high",
          proficiency: "medium",
          completed: true
        }
      ],
      studyHoursPerDay: 5,
      preferredStudyTime: 'morning',
      learningPace: 'slow'
    }
  ]);

  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    // Create a new plan object
    const newPlan: StudyPlan = {
      id: uuidv4(),
      title: `${plan.examGoal} Preparation Plan`,
      examGoal: plan.examGoal,
      examDate: typeof plan.examDate === 'string' ? plan.examDate : format(plan.examDate as Date, 'yyyy-MM-dd'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      weeklyHours: plan.weeklyHours || 20,
      progressPercent: 0,
      subjects: plan.subjects,
      studyHoursPerDay: plan.studyHoursPerDay,
      preferredStudyTime: plan.preferredStudyTime,
      learningPace: plan.learningPace
    };
    
    // Add the new plan as the active one
    setActivePlans([newPlan]);
    
    // Show toast
    toast({
      title: "Success",
      description: "Your new study plan has been created and is now active!",
    });
    
    setShowCreateDialog(false);
  };

  return {
    showCreateDialog,
    selectedPlan,
    activePlans,
    completedPlans,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    setShowCreateDialog,
    setSelectedPlan
  };
};
