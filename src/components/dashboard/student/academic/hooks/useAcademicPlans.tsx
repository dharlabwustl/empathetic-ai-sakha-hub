
import { useState, useCallback } from "react";
import { StudyPlan, NewStudyPlan } from "@/types/user/studyPlan";
import { v4 as uuidv4 } from 'uuid';

// Sample study plans for demonstration
const defaultActivePlans: StudyPlan[] = [
  {
    id: "plan-1",
    userId: "user-1",
    goal: "Prepare for NEET Exam",
    examGoal: "NEET",
    examDate: "2024-05-15",
    createdAt: "2023-10-10",
    updatedAt: "2023-11-15",
    subjects: [
      {
        id: "subj-1",
        name: "Physics",
        color: "bg-blue-500",
        hoursPerWeek: 6,
        priority: "high",
        difficulty: "medium",
        completed: false,
        topics: [
          { id: "t1", name: "Mechanics", difficulty: "hard", completed: false },
          { id: "t2", name: "Thermodynamics", difficulty: "medium", completed: true }
        ]
      },
      {
        id: "subj-2",
        name: "Chemistry",
        color: "bg-purple-500",
        hoursPerWeek: 4,
        priority: "medium",
        difficulty: "medium",
        completed: false
      }
    ],
    weeklyHours: 10,
    status: "active",
    progressPercentage: 35,
    daysLeft: 156
  }
];

const defaultCompletedPlans: StudyPlan[] = [
  {
    id: "plan-3",
    userId: "user-1",
    goal: "Prepare for School Exam",
    examGoal: "Final Exam",
    examDate: "2023-12-01",
    createdAt: "2023-09-01",
    updatedAt: "2023-12-02",
    subjects: [
      {
        id: "subj-5",
        name: "Mathematics",
        color: "bg-emerald-500",
        hoursPerWeek: 5,
        priority: "high",
        difficulty: "medium",
        completed: true
      },
      {
        id: "subj-6",
        name: "Computer Science",
        color: "bg-yellow-500",
        hoursPerWeek: 5,
        priority: "medium",
        difficulty: "easy",
        completed: true
      }
    ],
    weeklyHours: 10,
    status: "completed",
    progressPercentage: 100,
    daysLeft: 0
  }
];

export const useAcademicPlans = (defaultExamGoal?: string) => {
  const [activePlans, setActivePlans] = useState<StudyPlan[]>(defaultActivePlans);
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>(defaultCompletedPlans);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

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
    const currentDate = new Date().toISOString();
    const plan: StudyPlan = {
      id: uuidv4(),
      userId: "user-1",
      ...newPlan,
      createdAt: currentDate,
      updatedAt: currentDate,
      status: "active",
      weeklyHours: newPlan.subjects.reduce((total, subject) => total + subject.hoursPerWeek, 0),
      progressPercentage: 0,
      daysLeft: newPlan.examDate ? calculateDaysLeft(newPlan.examDate) : 30
    };

    setActivePlans([plan, ...activePlans]);
    setShowCreateDialog(false);
  };

  // New function to load a study plan from signup data
  const loadSignupStudyPlan = useCallback((signupPlan: any) => {
    // Check if this plan is already loaded
    const existingPlan = activePlans.find(p => p.id === signupPlan.id);
    if (existingPlan) {
      console.log('Signup plan already loaded');
      return;
    }

    try {
      const currentDate = new Date().toISOString();
      let studyPlanToAdd: StudyPlan;

      // If it's a complete StudyPlan object
      if (signupPlan.id && signupPlan.subjects) {
        studyPlanToAdd = {
          ...signupPlan,
          updatedAt: currentDate,
          progressPercentage: signupPlan.progressPercentage || 0,
          daysLeft: signupPlan.examDate ? calculateDaysLeft(signupPlan.examDate) : 30
        };
      } else {
        // Create a new plan from partial data
        studyPlanToAdd = {
          id: uuidv4(),
          userId: "user-1",
          goal: signupPlan.goal || "Study Plan from Signup",
          examGoal: signupPlan.examGoal || defaultExamGoal || "Exam Preparation",
          examDate: signupPlan.examDate || addDays(new Date(), 90).toISOString(),
          createdAt: currentDate,
          updatedAt: currentDate,
          status: "active",
          subjects: signupPlan.subjects || [
            {
              id: uuidv4(),
              name: "Subject 1",
              color: "bg-blue-500",
              hoursPerWeek: 4,
              priority: "medium",
              difficulty: "medium",
              completed: false
            }
          ],
          weeklyHours: signupPlan.weeklyHours || 10,
          progressPercentage: 0,
          daysLeft: 90
        };
      }

      setActivePlans(prev => [studyPlanToAdd, ...prev]);
    } catch (error) {
      console.error('Error formatting signup study plan:', error);
    }
  }, [activePlans, defaultExamGoal]);

  return {
    activePlans,
    completedPlans,
    showCreateDialog,
    selectedPlan,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    setShowCreateDialog,
    setSelectedPlan,
    loadSignupStudyPlan
  };
};

// Utility function to calculate days left
function calculateDaysLeft(examDate: string): number {
  const today = new Date();
  const exam = new Date(examDate);
  const diffTime = exam.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

// Utility function to add days to a date
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
