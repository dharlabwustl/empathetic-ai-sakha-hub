
import React, { useState } from 'react';
import AcademicHeader from '@/components/dashboard/student/academic/AcademicHeader';
import StudyPlansList from '@/components/dashboard/student/academic/StudyPlansList';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';
import type { StudyPlan, NewStudyPlan } from '@/types/user/studyPlan';

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
    examGoal: userProfile?.examPreparation || "IIT-JEE",
    examDate: "2024-12-15",
    daysLeft: 240,
    createdAt: "2024-04-10T12:00:00Z",
    status: 'active',
    progressPercentage: 35,
    subjects: [
      {
        id: "physics-1",
        name: "Physics",
        progress: 45,
        proficiency: 'medium',
        topics: [
          { id: "mechanics-1", name: "Mechanics", status: 'in-progress', difficulty: 'medium', completed: false },
          { id: "thermo-1", name: "Thermodynamics", status: 'pending', difficulty: 'medium', completed: false },
          { id: "electro-1", name: "Electrostatics", status: 'completed', difficulty: 'hard', completed: true }
        ],
        color: "#4F46E5",
        hoursPerWeek: 8,
        priority: 'high'
      },
      {
        id: "chemistry-1",
        name: "Chemistry",
        progress: 25,
        proficiency: 'weak',
        topics: [
          { id: "organic-1", name: "Organic Chemistry", status: 'pending', difficulty: 'hard', completed: false },
          { id: "bonding-1", name: "Chemical Bonding", status: 'in-progress', difficulty: 'medium', completed: false },
          { id: "equil-1", name: "Equilibrium", status: 'pending', difficulty: 'easy', completed: false }
        ],
        color: "#10B981",
        hoursPerWeek: 6,
        priority: 'medium'
      },
      {
        id: "mathematics-1",
        name: "Mathematics",
        progress: 72,
        proficiency: 'strong',
        topics: [
          { id: "calc-1", name: "Calculus", status: 'completed', difficulty: 'hard', completed: true },
          { id: "coord-1", name: "Coordinate Geometry", status: 'completed', difficulty: 'hard', completed: true },
          { id: "prob-1", name: "Probability", status: 'in-progress', difficulty: 'medium', completed: false }
        ],
        color: "#EF4444",
        hoursPerWeek: 10,
        priority: 'high'
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  }]);

  // State for completed plans
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([{
    id: "plan-old-1",
    examGoal: "IIT-JEE",
    examDate: "2024-03-15",
    daysLeft: 0,
    createdAt: "2024-01-01T12:00:00Z",
    status: 'completed',
    progressPercentage: 100,
    subjects: [
      {
        id: "physics-old-1",
        name: "Physics",
        progress: 65,
        proficiency: 'weak',
        topics: [
          { id: "mech-old-1", name: "Mechanics", status: 'completed', difficulty: 'medium', completed: true },
          { id: "waves-old-1", name: "Waves", status: 'completed', difficulty: 'medium', completed: true }
        ],
        color: "#4F46E5",
        hoursPerWeek: 6,
        priority: 'high'
      },
      {
        id: "chemistry-old-1",
        name: "Chemistry",
        progress: 60,
        proficiency: 'weak',
        topics: [
          { id: "periodic-old-1", name: "Periodic Table", status: 'completed', difficulty: 'medium', completed: true }
        ],
        color: "#10B981",
        hoursPerWeek: 4,
        priority: 'medium'
      },
      {
        id: "mathematics-old-1",
        name: "Mathematics",
        progress: 70,
        proficiency: 'medium',
        topics: [
          { id: "algebra-old-1", name: "Algebra", status: 'completed', difficulty: 'hard', completed: true }
        ],
        color: "#EF4444",
        hoursPerWeek: 8,
        priority: 'high'
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
    const colors = {
      physics: "#4F46E5",
      chemistry: "#10B981",
      mathematics: "#EF4444",
      biology: "#F59E0B",
      default: "#6366F1"
    };
    
    // Generate topics based on subject
    switch(subject.toLowerCase()) {
      case 'physics':
        topics = [
          { id: uuidv4(), name: "Mechanics", status: 'pending' as const, difficulty: 'medium' as const, completed: false },
          { id: uuidv4(), name: "Thermodynamics", status: 'pending' as const, difficulty: 'medium' as const, completed: false },
          { id: uuidv4(), name: "Electrostatics", status: 'pending' as const, difficulty: 'hard' as const, completed: false }
        ];
        break;
      case 'chemistry':
        topics = [
          { id: uuidv4(), name: "Organic Chemistry", status: 'pending' as const, difficulty: 'hard' as const, completed: false },
          { id: uuidv4(), name: "Inorganic Chemistry", status: 'pending' as const, difficulty: 'medium' as const, completed: false },
          { id: uuidv4(), name: "Physical Chemistry", status: 'pending' as const, difficulty: 'medium' as const, completed: false }
        ];
        break;
      case 'mathematics':
        topics = [
          { id: uuidv4(), name: "Calculus", status: 'pending' as const, difficulty: 'hard' as const, completed: false },
          { id: uuidv4(), name: "Algebra", status: 'pending' as const, difficulty: 'medium' as const, completed: false },
          { id: uuidv4(), name: "Geometry", status: 'pending' as const, difficulty: 'easy' as const, completed: false }
        ];
        break;
      default:
        topics = [
          { id: uuidv4(), name: "Fundamentals", status: 'pending' as const, difficulty: 'medium' as const, completed: false },
          { id: uuidv4(), name: "Advanced Topics", status: 'pending' as const, difficulty: 'hard' as const, completed: false }
        ];
    }
    
    return topics;
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    // Create a new plan object
    const newPlan: StudyPlan = {
      id: uuidv4(),
      userId: "user-1", // Add the required userId field
      goal: plan.goal || "",
      examGoal: plan.examGoal,
      examDate: format(new Date(plan.examDate), 'yyyy-MM-dd'),
      daysLeft: differenceInCalendarDays(new Date(plan.examDate), new Date()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(), // Add the required updatedAt field
      status: 'active',
      progressPercentage: 0,
      weeklyHours: 20, // Add the required weeklyHours field
      subjects: plan.subjects.map(subject => ({
        id: uuidv4(),
        name: subject.name,
        color: subject.color || "#6366F1",
        progress: 0,
        proficiency: subject.proficiency || 'medium',
        hoursPerWeek: subject.hoursPerWeek || 5,
        priority: subject.priority || 'medium',
        topics: generateTopicsForSubject(subject.name, subject.proficiency || 'medium')
      })),
      studyHoursPerDay: plan.studyHoursPerDay || 4,
      preferredStudyTime: plan.preferredStudyTime || 'morning',
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
