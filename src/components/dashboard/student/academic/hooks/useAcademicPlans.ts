
import { useState, useEffect } from 'react';
import { StudyPlan, NewStudyPlan } from '@/types/user/studyPlan';
import { v4 as uuidv4 } from 'uuid';

export const useAcademicPlans = (initialExamGoal?: string) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([]);
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([]);

  // Load plans from localStorage on component mount
  useEffect(() => {
    const loadPlans = () => {
      try {
        const savedActivePlans = localStorage.getItem('active_study_plans');
        const savedCompletedPlans = localStorage.getItem('completed_study_plans');
        
        if (savedActivePlans) {
          setActivePlans(JSON.parse(savedActivePlans));
        }
        if (savedCompletedPlans) {
          setCompletedPlans(JSON.parse(savedCompletedPlans));
        }
      } catch (error) {
        console.error('Error loading study plans:', error);
      }
    };
    
    loadPlans();
  }, []);

  // Save plans to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('active_study_plans', JSON.stringify(activePlans));
      localStorage.setItem('completed_study_plans', JSON.stringify(completedPlans));
    } catch (error) {
      console.error('Error saving study plans:', error);
    }
  }, [activePlans, completedPlans]);

  // Handle opening the create plan dialog
  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };

  // Handle viewing details of a specific plan
  const handleViewPlanDetails = (planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  // Handle the creation of a new plan from the wizard
  const handleNewPlanCreated = (newPlanData: NewStudyPlan) => {
    // Mark any existing active plans as pending
    const updatedActivePlans = activePlans.map(plan => ({
      ...plan,
      status: 'pending' as 'active' | 'completed' | 'pending'
    }));

    // Create a new plan with the provided data
    const newPlan: StudyPlan = {
      id: uuidv4(),
      title: `${newPlanData.examGoal} Preparation`,
      description: `Study plan for ${newPlanData.examGoal} exam`,
      examGoal: newPlanData.examGoal,
      examDate: newPlanData.examDate,
      status: 'active',
      progress: 0,
      subjects: newPlanData.subjects,
      studyHoursPerDay: newPlanData.studyHoursPerDay,
      preferredStudyTime: newPlanData.preferredStudyTime,
      learningPace: newPlanData.learningPace,
      createdAt: new Date().toISOString(),
    };

    // Update the active plans list
    setActivePlans([newPlan]);
    
    // Move previous active plans to pending/completed
    const allPreviousPlans = [...updatedActivePlans, ...completedPlans];
    setCompletedPlans(allPreviousPlans as StudyPlan[]);
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
