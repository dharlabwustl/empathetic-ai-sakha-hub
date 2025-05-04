
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';
import { StudyPlan, NewStudyPlan } from '@/types/user/studyPlan';

export const useAcademicPlans = (examPreparation?: string) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  
  // Example active and completed plans
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([]);
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([]);

  // Load initial data
  useEffect(() => {
    // Create sample study plans
    const mockActivePlan: StudyPlan = {
      id: uuidv4(),
      userId: "user-123",
      goal: examPreparation || "NEET Preparation",
      examGoal: examPreparation || "NEET",
      examDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      subjects: [
        {
          id: uuidv4(),
          name: "Physics",
          color: "#3b82f6",
          hoursPerWeek: 10,
          priority: "high",
          proficiency: "weak",
          completed: false,
          topics: [
            { id: uuidv4(), name: "Mechanics", status: 'in-progress', priority: 'high', difficulty: 'medium', completed: false },
            { id: uuidv4(), name: "Optics", status: 'pending', priority: 'medium', difficulty: 'hard', completed: false },
          ]
        },
        {
          id: uuidv4(),
          name: "Chemistry",
          color: "#10b981",
          hoursPerWeek: 8,
          priority: "medium",
          proficiency: "medium",
          completed: false,
          topics: [
            { id: uuidv4(), name: "Organic Chemistry", status: 'in-progress', priority: 'high', difficulty: 'hard', completed: false },
            { id: uuidv4(), name: "Inorganic Chemistry", status: 'pending', priority: 'low', difficulty: 'medium', completed: false },
          ]
        },
        {
          id: uuidv4(),
          name: "Biology",
          color: "#8b5cf6",
          hoursPerWeek: 12,
          priority: "high",
          proficiency: "strong",
          completed: false,
          topics: [
            { id: uuidv4(), name: "Botany", status: 'in-progress', priority: 'medium', difficulty: 'easy', completed: false },
            { id: uuidv4(), name: "Zoology", status: 'completed', priority: 'high', difficulty: 'medium', completed: true },
          ]
        }
      ],
      learningPace: 'moderate',
      preferredStudyTime: 'evening',
      studyHoursPerDay: 6,
      weeklyHours: 42,
      progressPercentage: 35,
      daysLeft: 90,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const mockCompletedPlan: StudyPlan = {
      id: uuidv4(),
      userId: "user-123",
      goal: "JEE Preparation",
      examGoal: "JEE",
      examDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      subjects: [
        {
          id: uuidv4(),
          name: "Physics",
          color: "#ef4444",
          hoursPerWeek: 14,
          priority: "high",
          proficiency: "medium",
          completed: true,
          topics: [
            { id: uuidv4(), name: "Mechanics", status: 'completed', priority: 'high', difficulty: 'medium', completed: true },
            { id: uuidv4(), name: "Electricity", status: 'completed', priority: 'high', difficulty: 'hard', completed: true },
          ]
        },
        {
          id: uuidv4(),
          name: "Chemistry",
          color: "#f59e0b",
          hoursPerWeek: 10,
          priority: "medium",
          proficiency: "weak",
          completed: true,
          topics: [
            { id: uuidv4(), name: "Organic Chemistry", status: 'completed', priority: 'high', difficulty: 'hard', completed: true },
          ]
        },
        {
          id: uuidv4(),
          name: "Mathematics",
          color: "#06b6d4",
          hoursPerWeek: 16,
          priority: "high",
          proficiency: "strong",
          completed: true,
          topics: [
            { id: uuidv4(), name: "Calculus", status: 'completed', priority: 'high', difficulty: 'hard', completed: true },
            { id: uuidv4(), name: "Algebra", status: 'completed', priority: 'medium', difficulty: 'medium', completed: true },
          ]
        }
      ],
      learningPace: 'fast',
      preferredStudyTime: 'morning',
      studyHoursPerDay: 8,
      weeklyHours: 56,
      progressPercentage: 100,
      daysLeft: 0,
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    setActivePlans([mockActivePlan]);
    setCompletedPlans([mockCompletedPlan]);
  }, [examPreparation]);

  const handleCreatePlan = useCallback(() => {
    setShowCreateDialog(true);
  }, []);

  const handleViewPlanDetails = useCallback((planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  }, [activePlans, completedPlans]);

  const handleNewPlanCreated = useCallback((plan: NewStudyPlan) => {
    setLoading(true);

    // Create a new plan with required fields
    const newPlan: StudyPlan = {
      id: uuidv4(),
      userId: "user-123",
      goal: plan.goal || plan.examGoal,
      examGoal: plan.examGoal,
      examDate: typeof plan.examDate === 'string' ? plan.examDate : format(plan.examDate as Date, 'yyyy-MM-dd'),
      status: 'active',
      subjects: plan.subjects,
      learningPace: plan.learningPace || 'moderate',
      preferredStudyTime: plan.preferredStudyTime || 'evening',
      studyHoursPerDay: plan.studyHoursPerDay || 6,
      weeklyHours: plan.weeklyHours || 42,
      progressPercentage: 0,
      daysLeft: typeof plan.examDate === 'string' 
        ? differenceInCalendarDays(new Date(plan.examDate), new Date())
        : differenceInCalendarDays(plan.examDate as Date, new Date()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to active plans
    setActivePlans(prev => [...prev, newPlan]);

    // Show success message
    toast({
      title: "Study Plan Created",
      description: "Your personalized study plan has been generated successfully.",
    });

    setLoading(false);
    setShowCreateDialog(false);
  }, [toast]);

  return {
    loading,
    showCreateDialog,
    setShowCreateDialog,
    selectedPlan,
    setSelectedPlan,
    activePlans,
    completedPlans,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated
  };
};
