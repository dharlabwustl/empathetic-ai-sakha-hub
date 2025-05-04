
import { useState } from 'react';
import { StudyPlan, NewStudyPlan } from '@/types/user/studyPlan';
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export const useAcademicPlans = (examGoal?: string) => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

  // Sample active plans
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([{
    id: "plan-1",
    examGoal: examGoal || "NEET",
    examDate: "2024-12-15",
    createdAt: "2024-04-10T12:00:00Z",
    updatedAt: "2024-04-10T12:00:00Z",
    status: 'active',
    progressPercent: 35,
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
        topics: [
          { id: "mech-1", name: "Mechanics", difficulty: 'medium', completed: false, status: 'in-progress', priority: 'high' },
          { id: "thermo-1", name: "Thermodynamics", difficulty: 'hard', completed: false, status: 'pending', priority: 'medium' },
          { id: "electro-1", name: "Electrostatics", difficulty: 'hard', completed: true, status: 'completed', priority: 'high' }
        ]
      },
      {
        id: "chem-1",
        name: "Chemistry",
        color: "#10b981",
        hoursPerWeek: 12,
        priority: "medium",
        proficiency: "weak",
        completed: false,
        topics: [
          { id: "org-1", name: "Organic Chemistry", difficulty: 'hard', completed: false, status: 'pending', priority: 'high' },
          { id: "bond-1", name: "Chemical Bonding", difficulty: 'medium', completed: false, status: 'in-progress', priority: 'medium' },
          { id: "equil-1", name: "Equilibrium", difficulty: 'easy', completed: false, status: 'pending', priority: 'low' }
        ]
      },
      {
        id: "bio-1",
        name: "Biology",
        color: "#8b5cf6",
        hoursPerWeek: 16,
        priority: "high",
        proficiency: "strong",
        completed: false,
        topics: [
          { id: "cell-1", name: "Cell Biology", difficulty: 'hard', completed: true, status: 'completed', priority: 'high' },
          { id: "genetics-1", name: "Genetics", difficulty: 'medium', completed: true, status: 'completed', priority: 'high' },
          { id: "ecology-1", name: "Ecology", difficulty: 'medium', completed: false, status: 'in-progress', priority: 'medium' }
        ]
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  }]);

  // Sample completed plans
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([{
    id: "plan-old-1",
    examGoal: "NEET",
    examDate: "2024-03-15",
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-03-15T12:00:00Z",
    status: 'completed',
    progressPercent: 100,
    subjects: [
      {
        id: "physics-old",
        name: "Physics",
        color: "#3b82f6",
        hoursPerWeek: 10,
        priority: "medium",
        proficiency: "weak",
        completed: true,
        topics: [
          { id: "mech-old", name: "Mechanics", difficulty: 'medium', completed: true, status: 'completed', priority: 'high' },
          { id: "waves-old", name: "Waves", difficulty: 'medium', completed: true, status: 'completed', priority: 'medium' }
        ]
      },
      {
        id: "chem-old",
        name: "Chemistry",
        color: "#10b981",
        hoursPerWeek: 12,
        priority: "low",
        proficiency: "weak",
        completed: true,
        topics: [
          { id: "period-old", name: "Periodic Table", difficulty: 'medium', completed: true, status: 'completed', priority: 'medium' }
        ]
      },
      {
        id: "bio-old",
        name: "Biology",
        color: "#8b5cf6",
        hoursPerWeek: 13,
        priority: "high",
        proficiency: "medium",
        completed: true,
        topics: [
          { id: "alg-old", name: "Botany", difficulty: 'hard', completed: true, status: 'completed', priority: 'high' }
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
  const generateTopicsForSubject = (subject: string, proficiency: 'weak' | 'medium' | 'strong') => {
    let topics = [];
    const priorities = ['high', 'medium', 'low'];
    const statuses = ['pending', 'in-progress'];
    
    // Generate topics based on subject
    switch(subject.toLowerCase()) {
      case 'physics':
        topics = [
          { id: `phys-${Date.now()}-1`, name: "Mechanics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false },
          { id: `phys-${Date.now()}-2`, name: "Thermodynamics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'hard' as const, completed: false },
          { id: `phys-${Date.now()}-3`, name: "Electrostatics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false }
        ];
        break;
      case 'chemistry':
        topics = [
          { id: `chem-${Date.now()}-1`, name: "Organic Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'hard' as const, completed: false },
          { id: `chem-${Date.now()}-2`, name: "Inorganic Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false },
          { id: `chem-${Date.now()}-3`, name: "Physical Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'easy' as const, completed: false }
        ];
        break;
      case 'biology':
        topics = [
          { id: `bio-${Date.now()}-1`, name: "Cell Biology", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false },
          { id: `bio-${Date.now()}-2`, name: "Genetics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'hard' as const, completed: false },
          { id: `bio-${Date.now()}-3`, name: "Ecology", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'easy' as const, completed: false }
        ];
        break;
      default:
        topics = [
          { id: `gen-${Date.now()}-1`, name: "Fundamentals", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false },
          { id: `gen-${Date.now()}-2`, name: "Advanced Topics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'hard' as const, completed: false }
        ];
    }
    
    return topics;
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    // Create a new plan object
    const newPlan: StudyPlan = {
      id: uuidv4(),
      goal: "NEET Preparation",
      examGoal: plan.examGoal,
      examDate: typeof plan.examDate === 'string' ? plan.examDate : format(plan.examDate as Date, 'yyyy-MM-dd'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      weeklyHours: plan.weeklyHours || 20,
      progressPercent: 0,
      daysLeft: typeof plan.examDate === 'string' 
        ? differenceInCalendarDays(new Date(plan.examDate), new Date())
        : differenceInCalendarDays(plan.examDate as Date, new Date()),
      subjects: plan.subjects.map(subject => ({
        id: subject.id || `subject-${uuidv4()}`,
        name: subject.name,
        color: subject.color || "#3b82f6",
        hoursPerWeek: subject.hoursPerWeek || 10,
        priority: subject.priority || "medium",
        proficiency: subject.proficiency || "medium",
        completed: false,
        topics: generateTopicsForSubject(subject.name, subject.proficiency || "medium")
      })),
      studyHoursPerDay: plan.studyHoursPerDay || 4,
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
