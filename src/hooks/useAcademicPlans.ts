
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { StudyPlan, NewStudyPlan } from '@/types/user/studyPlan';
import { v4 as uuidv4 } from 'uuid';
import { differenceInDays } from 'date-fns';

export const useAcademicPlans = (examGoal?: string) => {
  const { toast } = useToast();
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([]);
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);

  // Load mock data initially
  useEffect(() => {
    const loadMockPlans = () => {
      // This is mock data - in a real app, this would come from an API
      const mockActivePlans: StudyPlan[] = [{
        id: "plan-1",
        title: examGoal || "NEET Preparation",
        examGoal: examGoal || "NEET",
        examDate: new Date(2024, 11, 15).toISOString(),
        status: 'active',
        progress: 35,
        progressPercentage: 35,
        daysLeft: 240,
        subjects: [
          {
            id: "physics-1",
            name: "Physics",
            color: "#3b82f6",
            hoursPerWeek: 14,
            priority: "high",
            proficiency: "medium",
            completed: false,
          },
          {
            id: "chem-1",
            name: "Chemistry",
            color: "#10b981",
            hoursPerWeek: 12,
            priority: "medium",
            proficiency: "weak",
            completed: false,
          },
          {
            id: "math-1",
            name: "Mathematics",
            color: "#8b5cf6",
            hoursPerWeek: 16,
            priority: "high",
            proficiency: "strong",
            completed: false,
          }
        ],
        studyHoursPerDay: 6,
        preferredStudyTime: 'evening',
        learningPace: 'moderate',
        createdAt: new Date(2023, 9, 10).toISOString(),
        updatedAt: new Date(2023, 9, 10).toISOString(),
        weeklyHours: 42,
      }];

      const mockCompletedPlans: StudyPlan[] = [{
        id: "plan-old-1",
        title: "Practice Test Preparation",
        examGoal: "NEET",
        examDate: new Date(2023, 2, 15).toISOString(),
        status: 'completed',
        progress: 100,
        progressPercentage: 100,
        subjects: [
          {
            id: "physics-old",
            name: "Physics",
            color: "#3b82f6",
            hoursPerWeek: 10,
            priority: "medium",
            proficiency: "weak",
            completed: true,
          },
          {
            id: "chem-old",
            name: "Chemistry",
            color: "#10b981",
            hoursPerWeek: 12,
            priority: "low",
            proficiency: "weak",
            completed: true,
          },
          {
            id: "math-old",
            name: "Mathematics",
            color: "#8b5cf6",
            hoursPerWeek: 13,
            priority: "high",
            proficiency: "medium",
            completed: true,
          }
        ],
        studyHoursPerDay: 5,
        preferredStudyTime: 'morning',
        learningPace: 'slow',
        createdAt: new Date(2023, 0, 1).toISOString(),
        updatedAt: new Date(2023, 2, 15).toISOString(),
        weeklyHours: 35,
      }];

      setActivePlans(mockActivePlans);
      setCompletedPlans(mockCompletedPlans);
      setLoading(false);
    };

    loadMockPlans();
  }, [examGoal]);

  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handleNewPlanCreated = (newPlan: NewStudyPlan) => {
    try {
      const examDate = typeof newPlan.examDate === 'string' 
        ? new Date(newPlan.examDate) 
        : newPlan.examDate;
      
      // Create a new plan with the necessary fields
      const createdPlan: StudyPlan = {
        id: uuidv4(),
        title: newPlan.examGoal,
        examGoal: newPlan.examGoal,
        examDate: examDate.toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        subjects: newPlan.subjects.map(subject => ({
          ...subject,
          completed: false,
        })),
        progressPercentage: 0,
        progress: 0,
        daysLeft: differenceInDays(examDate, new Date()),
        studyHoursPerDay: newPlan.studyHoursPerDay,
        preferredStudyTime: newPlan.preferredStudyTime,
        learningPace: newPlan.learningPace,
        weeklyHours: newPlan.weeklyHours,
      };

      // Add the new plan to active plans
      setActivePlans(prev => [createdPlan, ...prev]);

      // Close the dialog and show success message
      setShowCreateDialog(false);
      toast({
        title: "Study Plan Created",
        description: "Your personalized study plan has been created successfully.",
      });
    } catch (error) {
      console.error("Error creating study plan:", error);
      toast({
        title: "Failed to Create Plan",
        description: "There was an error creating your study plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    activePlans,
    completedPlans,
    selectedPlan,
    showCreateDialog,
    loading,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    setShowCreateDialog,
    setSelectedPlan,
  };
};
