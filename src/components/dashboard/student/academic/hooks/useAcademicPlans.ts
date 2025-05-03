
import { useState } from 'react';
import { StudyPlan } from '@/types/user/studyPlan';
import { useToast } from '@/hooks/use-toast';

export const useAcademicPlans = (examPreparation?: string) => {
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const { toast } = useToast();

  // Sample mock data for active plans
  const activePlans: StudyPlan[] = [
    {
      id: '1',
      userId: 'user123',
      goal: 'NEET',
      examDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subjects: [
        {
          id: 'subj1',
          name: 'Physics',
          color: '#8B5CF6',
          hoursPerWeek: 8,
          priority: 'high',
          proficiency: 'medium',
          completed: false,
          topics: [
            { id: 'topic1', name: 'Mechanics', difficulty: 'medium', completed: false, status: 'in-progress', priority: 'high' },
            { id: 'topic2', name: 'Thermodynamics', difficulty: 'hard', completed: false, status: 'pending', priority: 'medium' },
            { id: 'topic3', name: 'Optics', difficulty: 'medium', completed: true, status: 'completed', priority: 'high' },
          ],
        },
        {
          id: 'subj2',
          name: 'Chemistry',
          color: '#10B981',
          hoursPerWeek: 6,
          priority: 'medium',
          proficiency: 'medium',
          completed: false,
          topics: [
            { id: 'topic4', name: 'Organic Chemistry', difficulty: 'hard', completed: false, status: 'pending', priority: 'high' },
            { id: 'topic5', name: 'Inorganic Chemistry', difficulty: 'medium', completed: false, status: 'in-progress', priority: 'medium' },
            { id: 'topic6', name: 'Physical Chemistry', difficulty: 'easy', completed: false, status: 'pending', priority: 'low' },
          ],
        },
        {
          id: 'subj3',
          name: 'Biology',
          color: '#F59E0B',
          hoursPerWeek: 10,
          priority: 'high',
          proficiency: 'weak',
          completed: false,
          topics: [
            { id: 'topic7', name: 'Cell Biology', difficulty: 'medium', completed: true, status: 'completed', priority: 'high' },
            { id: 'topic8', name: 'Human Physiology', difficulty: 'hard', completed: true, status: 'completed', priority: 'high' },
            { id: 'topic9', name: 'Genetics', difficulty: 'hard', completed: false, status: 'in-progress', priority: 'medium' },
          ],
        },
      ],
      weeklyHours: 24,
      status: 'active',
      studyHoursPerDay: 3,
      preferredStudyTime: 'evening',
      learningPace: 'moderate',
      progressPercentage: 35,
      daysLeft: 45,
    },
  ];

  // Sample mock data for completed plans
  const completedPlans: StudyPlan[] = [
    {
      id: '2',
      userId: 'user123',
      goal: 'JEE Mains',
      examDate: new Date(2024, 0, 15).toISOString(),
      createdAt: new Date(2023, 6, 1).toISOString(),
      updatedAt: new Date(2024, 0, 30).toISOString(),
      subjects: [
        {
          id: 'subj4',
          name: 'Mathematics',
          color: '#2563EB',
          hoursPerWeek: 10,
          priority: 'high',
          proficiency: 'medium',
          completed: true,
          topics: [
            { id: 'topic10', name: 'Calculus', difficulty: 'hard', completed: true, status: 'completed', priority: 'high' },
            { id: 'topic11', name: 'Algebra', difficulty: 'medium', completed: true, status: 'completed', priority: 'medium' },
          ],
        },
        {
          id: 'subj5',
          name: 'Physics',
          color: '#8B5CF6',
          hoursPerWeek: 8,
          priority: 'high',
          proficiency: 'medium',
          completed: true,
          topics: [
            { id: 'topic12', name: 'Mechanics', difficulty: 'medium', completed: true, status: 'completed', priority: 'medium' },
          ],
        },
      ],
      weeklyHours: 18,
      status: 'completed',
      studyHoursPerDay: 3,
      preferredStudyTime: 'morning',
      learningPace: 'fast',
      progressPercentage: 100,
      daysLeft: 0,
    },
  ];

  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handleNewPlanCreated = (plan: StudyPlan) => {
    // In a real app, this would save to a backend
    toast({
      title: "Study Plan Created",
      description: "Your study plan has been successfully created.",
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
