
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';
import type { StudyPlan, NewStudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';

export const useAcademicPlans = (examGoal: string = 'NEET') => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  
  // Initial state for demo plans
  const initialActivePlans: StudyPlan[] = [{
    id: "plan-1",
    userId: "user-1",
    goal: "NEET Preparation",
    examGoal: examGoal || "NEET",
    examDate: "2024-12-15",
    createdAt: "2024-04-10T12:00:00Z",
    updatedAt: "2024-04-10T12:00:00Z",
    status: 'active',
    weeklyHours: 42,
    progressPercentage: 35,
    daysLeft: 240,
    subjects: [
      {
        id: "physics-1",
        name: "Physics",
        color: "#3b82f6",
        hoursPerWeek: 14,
        priority: "high",
        proficiency: "medium", // Changed from "moderate" to match type
        difficulty: "hard",
        completed: false,
        topics: [
          { id: "mech-1", name: "Mechanics", status: 'in-progress', difficulty: 'medium', completed: false, priority: 'high' },
          { id: "thermo-1", name: "Thermodynamics", status: 'pending', difficulty: 'hard', completed: false, priority: 'medium' },
          { id: "electro-1", name: "Electrostatics", status: 'completed', difficulty: 'hard', completed: true, priority: 'high' }
        ]
      },
      {
        id: "chem-1",
        name: "Chemistry",
        color: "#10b981",
        hoursPerWeek: 12,
        priority: "medium",
        proficiency: "weak",
        difficulty: "medium",
        completed: false,
        topics: [
          { id: "org-1", name: "Organic Chemistry", status: 'pending', difficulty: 'hard', completed: false, priority: 'high' },
          { id: "bond-1", name: "Chemical Bonding", status: 'in-progress', difficulty: 'medium', completed: false, priority: 'medium' },
          { id: "equil-1", name: "Equilibrium", status: 'pending', difficulty: 'easy', completed: false, priority: 'low' }
        ]
      },
      {
        id: "math-1",
        name: "Mathematics",
        color: "#8b5cf6",
        hoursPerWeek: 16,
        priority: "high",
        proficiency: "strong",
        difficulty: "hard",
        completed: false,
        topics: [
          { id: "calc-1", name: "Calculus", status: 'completed', difficulty: 'hard', completed: true, priority: 'high' },
          { id: "coord-1", name: "Coordinate Geometry", status: 'completed', difficulty: 'medium', completed: true, priority: 'high' },
          { id: "prob-1", name: "Probability", status: 'in-progress', difficulty: 'medium', completed: false, priority: 'medium' }
        ]
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  }];

  const initialCompletedPlans: StudyPlan[] = [{
    id: "plan-old-1",
    userId: "user-1",
    goal: "NEET Preparation",
    examGoal: "NEET",
    examDate: "2024-03-15",
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-03-15T12:00:00Z",
    status: 'completed',
    weeklyHours: 35,
    progressPercentage: 100,
    daysLeft: 0,
    subjects: [
      {
        id: "physics-old",
        name: "Physics",
        color: "#3b82f6",
        hoursPerWeek: 10,
        priority: "medium",
        proficiency: "weak",
        difficulty: "hard",
        completed: true,
        topics: [
          { id: "mech-old", name: "Mechanics", status: 'completed', difficulty: 'medium', completed: true, priority: 'high' },
          { id: "waves-old", name: "Waves", status: 'completed', difficulty: 'medium', completed: true, priority: 'medium' }
        ]
      },
      {
        id: "chem-old",
        name: "Chemistry",
        color: "#10b981",
        hoursPerWeek: 12,
        priority: "low",
        proficiency: "weak",
        difficulty: "medium",
        completed: true,
        topics: [
          { id: "period-old", name: "Periodic Table", status: 'completed', difficulty: 'medium', completed: true, priority: 'high' }
        ]
      }
    ],
    studyHoursPerDay: 5,
    preferredStudyTime: 'morning',
    learningPace: 'slow'
  }];

  const [activePlans, setActivePlans] = useState<StudyPlan[]>(initialActivePlans);
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>(initialCompletedPlans);

  // Function to toggle the create dialog
  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };

  // Function to view plan details
  const handleViewPlanDetails = (planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  // Function to generate topics based on subject
  const generateTopicsForSubject = (subject: string, proficiency: 'weak' | 'medium' | 'strong') => {
    let topics = [];
    const priorities = ['high', 'medium', 'low'] as const;
    const statuses = ['pending', 'in-progress'] as const;
    const difficulties = ['easy', 'medium', 'hard'] as const;
    
    // Generate topics based on subject
    switch(subject.toLowerCase()) {
      case 'physics':
        topics = [
          { 
            id: `phys-${Date.now()}-1`, 
            name: "Mechanics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            priority: priorities[Math.floor(Math.random() * priorities.length)], 
            difficulty: difficulties[1], 
            completed: false 
          },
          { 
            id: `phys-${Date.now()}-2`, 
            name: "Thermodynamics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            priority: priorities[Math.floor(Math.random() * priorities.length)], 
            difficulty: difficulties[2], 
            completed: false 
          },
          { 
            id: `phys-${Date.now()}-3`, 
            name: "Electrostatics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            priority: priorities[Math.floor(Math.random() * priorities.length)], 
            difficulty: difficulties[1], 
            completed: false 
          }
        ];
        break;
      case 'chemistry':
        topics = [
          { 
            id: `chem-${Date.now()}-1`, 
            name: "Organic Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            priority: priorities[Math.floor(Math.random() * priorities.length)], 
            difficulty: difficulties[2], 
            completed: false 
          },
          { 
            id: `chem-${Date.now()}-2`, 
            name: "Inorganic Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            priority: priorities[Math.floor(Math.random() * priorities.length)], 
            difficulty: difficulties[1], 
            completed: false 
          },
          { 
            id: `chem-${Date.now()}-3`, 
            name: "Physical Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            priority: priorities[Math.floor(Math.random() * priorities.length)], 
            difficulty: difficulties[0], 
            completed: false 
          }
        ];
        break;
      case 'biology':
        topics = [
          { 
            id: `bio-${Date.now()}-1`, 
            name: "Human Physiology", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            priority: priorities[Math.floor(Math.random() * priorities.length)], 
            difficulty: difficulties[2], 
            completed: false 
          },
          { 
            id: `bio-${Date.now()}-2`, 
            name: "Cell Biology", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            priority: priorities[Math.floor(Math.random() * priorities.length)], 
            difficulty: difficulties[1], 
            completed: false 
          },
          { 
            id: `bio-${Date.now()}-3`, 
            name: "Genetics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            priority: priorities[Math.floor(Math.random() * priorities.length)], 
            difficulty: difficulties[1], 
            completed: false 
          }
        ];
        break;
      default:
        topics = [
          { 
            id: `gen-${Date.now()}-1`, 
            name: "Fundamentals", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            priority: priorities[Math.floor(Math.random() * priorities.length)], 
            difficulty: difficulties[1], 
            completed: false 
          },
          { 
            id: `gen-${Date.now()}-2`, 
            name: "Advanced Topics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            priority: priorities[Math.floor(Math.random() * priorities.length)], 
            difficulty: difficulties[2], 
            completed: false 
          }
        ];
    }
    
    return topics;
  };

  // Function to handle new plan creation
  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    // Create a new plan object
    const newPlan: StudyPlan = {
      id: uuidv4(),
      userId: "user-1",
      goal: plan.goal || "NEET Preparation",
      examGoal: plan.examGoal || "NEET",
      examDate: typeof plan.examDate === 'string' ? plan.examDate : format(plan.examDate as Date, 'yyyy-MM-dd'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      weeklyHours: plan.weeklyHours || 21,
      progressPercentage: 0,
      daysLeft: typeof plan.examDate === 'string' 
        ? differenceInCalendarDays(new Date(plan.examDate), new Date())
        : differenceInCalendarDays(plan.examDate as Date, new Date()),
      subjects: plan.subjects.map(subject => {
        // Ensure each subject has the required properties with proper types
        const proficiency = subject.proficiency || 'medium';
        
        const studyPlanSubject: StudyPlanSubject = {
          id: subject.id || `subject-${uuidv4()}`,
          name: subject.name,
          color: subject.color || "#3b82f6",
          hoursPerWeek: subject.hoursPerWeek || 10,
          priority: subject.priority || "medium",
          proficiency: proficiency,
          difficulty: subject.difficulty || "medium",
          completed: false,
          topics: subject.topics || generateTopicsForSubject(subject.name, proficiency)
        };
        return studyPlanSubject;
      }),
      studyHoursPerDay: plan.studyHoursPerDay || 3,
      preferredStudyTime: plan.preferredStudyTime || 'evening',
      learningPace: plan.learningPace || 'moderate'
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
    
    // Close the dialog
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
