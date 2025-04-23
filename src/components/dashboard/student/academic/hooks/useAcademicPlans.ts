
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';
import type { StudyPlan, NewStudyPlan, StudyPlanTopic } from '@/types/user/studyPlan';

export const useAcademicPlans = (examPreparation?: string) => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

  // State for plans
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([{
    id: "plan-1",
    userId: "user-1",
    examGoal: examPreparation || "IIT-JEE",
    examDate: "2024-12-15",
    daysLeft: 240,
    createdAt: "2024-04-10T12:00:00Z",
    updatedAt: "2024-04-10T12:00:00Z",
    status: 'active',
    progressPercentage: 35,
    subjects: [
      {
        name: "Physics",
        progress: 45,
        proficiency: 'moderate',
        topics: [
          { id: "t1", name: "Mechanics", status: 'in_progress', complexity: 'medium' },
          { id: "t2", name: "Thermodynamics", status: 'not_started', complexity: 'medium' },
          { id: "t3", name: "Electrostatics", status: 'completed', complexity: 'hard' }
        ]
      },
      {
        name: "Chemistry",
        progress: 25,
        proficiency: 'weak',
        topics: [
          { id: "t4", name: "Organic Chemistry", status: 'not_started', complexity: 'hard' },
          { id: "t5", name: "Chemical Bonding", status: 'in_progress', complexity: 'medium' },
          { id: "t6", name: "Equilibrium", status: 'not_started', complexity: 'easy' }
        ]
      },
      {
        name: "Mathematics",
        progress: 72,
        proficiency: 'strong',
        topics: [
          { id: "t7", name: "Calculus", status: 'completed', complexity: 'hard' },
          { id: "t8", name: "Coordinate Geometry", status: 'completed', complexity: 'medium' },
          { id: "t9", name: "Probability", status: 'in_progress', complexity: 'medium' }
        ]
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  }]);

  // State for completed plans
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([{
    id: "plan-old-1",
    userId: "user-1",
    examGoal: "IIT-JEE",
    examDate: "2024-03-15",
    daysLeft: 0,
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
    status: 'completed',
    progressPercentage: 100,
    subjects: [
      {
        name: "Physics",
        progress: 65,
        proficiency: 'weak',
        topics: [
          { id: "t10", name: "Mechanics", status: 'completed', complexity: 'medium' },
          { id: "t11", name: "Waves", status: 'completed', complexity: 'medium' }
        ]
      },
      {
        name: "Chemistry",
        progress: 60,
        proficiency: 'weak',
        topics: [
          { id: "t12", name: "Periodic Table", status: 'completed', complexity: 'medium' }
        ]
      },
      {
        name: "Mathematics",
        progress: 70,
        proficiency: 'moderate',
        topics: [
          { id: "t13", name: "Algebra", status: 'completed', complexity: 'hard' }
        ]
      }
    ],
    studyHoursPerDay: 5,
    preferredStudyTime: 'morning',
    learningPace: 'slow'
  }]);

  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  // Function to generate topics based on subject
  const generateTopicsForSubject = (subject: string, proficiency: 'weak' | 'moderate' | 'strong'): StudyPlanTopic[] => {
    const topics: StudyPlanTopic[] = [];
    const statuses: ('not_started' | 'in_progress')[] = ['not_started', 'in_progress'];
    const complexities: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    
    // Generate topics based on subject
    let topicNames: string[] = [];
    
    switch(subject.toLowerCase()) {
      case 'physics':
        topicNames = ["Mechanics", "Thermodynamics", "Electrostatics"];
        break;
      case 'chemistry':
        topicNames = ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"];
        break;
      case 'mathematics':
        topicNames = ["Calculus", "Algebra", "Geometry"];
        break;
      default:
        topicNames = ["Fundamentals", "Advanced Topics"];
    }
    
    // Generate topic objects
    return topicNames.map(name => ({
      id: uuidv4(),
      name,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      complexity: complexities[Math.floor(Math.random() * complexities.length)]
    }));
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    // Create a new plan object
    const newPlan: StudyPlan = {
      id: uuidv4(),
      userId: "user-1",
      examGoal: plan.examGoal,
      examDate: format(plan.examDate, 'yyyy-MM-dd'),
      daysLeft: differenceInCalendarDays(plan.examDate, new Date()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      progressPercentage: 0,
      subjects: plan.subjects.map(subject => ({
        name: subject.name,
        key: subject.key || subject.name.toLowerCase().replace(/\s+/g, '-'),
        progress: 0,
        proficiency: subject.proficiency,
        topics: generateTopicsForSubject(subject.name, subject.proficiency)
      })),
      studyHoursPerDay: plan.studyHoursPerDay,
      preferredStudyTime: plan.preferredStudyTime,
      learningPace: plan.learningPace
    };
    
    // Move previous active plans to completed
    const updatedCompletedPlans = [...completedPlans];
    if (activePlans.length > 0) {
      const oldActivePlans = activePlans.map(plan => ({
        ...plan,
        status: 'completed' as 'completed'
      }));
      updatedCompletedPlans.push(...oldActivePlans);
    }
    
    // Add the new plan as the active one
    setActivePlans([newPlan]);
    setCompletedPlans(updatedCompletedPlans);
    
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
