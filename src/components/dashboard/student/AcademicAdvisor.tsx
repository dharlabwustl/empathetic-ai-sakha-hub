
import React, { useState } from 'react';
import AcademicHeader from '@/components/dashboard/student/academic/AcademicHeader';
import StudyPlansList from '@/components/dashboard/student/academic/StudyPlansList';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';
import type { StudyPlan, NewStudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';

interface AcademicAdvisorProps {
  userProfile: {
    examPreparation?: string;
  };
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

  // State for plans
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([{
    id: "plan-1",
    userId: "user-1",
    goal: "NEET Preparation",
    examGoal: userProfile?.examPreparation || "NEET",
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
        proficiency: "medium",
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
  }]);

  // State for completed plans
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([{
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
          { id: "waves-old", name: "Waves", status: 'completed', difficulty: 'medium', completed: true, priority: 'high' }
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
      },
      {
        id: "math-old",
        name: "Mathematics",
        color: "#8b5cf6",
        hoursPerWeek: 13,
        priority: "high",
        proficiency: "medium",
        difficulty: "hard",
        completed: true,
        topics: [
          { id: "alg-old", name: "Algebra", status: 'completed', difficulty: 'hard', completed: true, priority: 'high' }
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
      case 'mathematics':
        topics = [
          { id: `math-${Date.now()}-1`, name: "Calculus", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'hard' as const, completed: false },
          { id: `math-${Date.now()}-2`, name: "Algebra", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false },
          { id: `math-${Date.now()}-3`, name: "Geometry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low', difficulty: 'medium' as const, completed: false }
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
      userId: "user-1",
      goal: "NEET Preparation",
      examGoal: plan.examGoal,
      examDate: typeof plan.examDate === 'string' ? plan.examDate : format(plan.examDate as Date, 'yyyy-MM-dd'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      weeklyHours: plan.weeklyHours,
      progressPercentage: 0,
      daysLeft: typeof plan.examDate === 'string' 
        ? differenceInCalendarDays(new Date(plan.examDate), new Date())
        : differenceInCalendarDays(plan.examDate as Date, new Date()),
      subjects: plan.subjects.map(subject => {
        // Ensure each subject has the required properties with proper types
        const studyPlanSubject: StudyPlanSubject = {
          id: subject.id || `subject-${uuidv4()}`,
          name: subject.name,
          color: subject.color || "#3b82f6",
          hoursPerWeek: subject.hoursPerWeek || 10,
          priority: subject.priority || "medium",
          proficiency: subject.proficiency || "medium",
          difficulty: subject.difficulty || "medium",
          completed: false,
          topics: generateTopicsForSubject(subject.name, subject.proficiency || "medium")
        };
        return studyPlanSubject;
      }),
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

  return (
    <div className="space-y-12">
      <AcademicHeader examGoal={userProfile?.examPreparation} />
      
      <StudyPlansList
        activePlans={activePlans}
        completedPlans={completedPlans}
        onCreatePlan={handleCreatePlan}
        onViewPlanDetails={handleViewPlanDetails}
      />

      <CreateStudyPlanWizard
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        examGoal={userProfile?.examPreparation}
        onCreatePlan={handleNewPlanCreated}
      />

      {selectedPlan && (
        <StudyPlanDetail
          plan={selectedPlan}
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
};

export default AcademicAdvisor;
