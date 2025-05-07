
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
  userProfile?: {
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
    name: "NEET Preparation",
    description: "Full study plan for NEET preparation",
    userId: "user-1",
    startDate: "2024-04-10",
    endDate: "2024-12-15",
    progress: 35,
    status: 'active' as const,
    subjects: [
      {
        id: "physics-1",
        name: "Physics",
        difficulty: 'hard' as const,
        completed: false,
        status: 'in-progress' as const,
        priority: 'high' as const,
        hoursPerWeek: 14,
        proficiency: 60,
        topics: [
          { id: "mech-1", name: "Mechanics", difficulty: 'medium' as const, completed: false, status: 'in-progress' as const, priority: 'high' as const },
          { id: "thermo-1", name: "Thermodynamics", difficulty: 'hard' as const, completed: false, status: 'pending' as const, priority: 'medium' as const },
          { id: "electro-1", name: "Electrostatics", difficulty: 'hard' as const, completed: true, status: 'completed' as const, priority: 'high' as const }
        ]
      },
      {
        id: "chem-1",
        name: "Chemistry",
        difficulty: 'medium' as const,
        completed: false,
        status: 'in-progress' as const,
        priority: 'medium' as const,
        hoursPerWeek: 12,
        proficiency: 40,
        topics: [
          { id: "org-1", name: "Organic Chemistry", difficulty: 'hard' as const, completed: false, status: 'pending' as const, priority: 'high' as const },
          { id: "bond-1", name: "Chemical Bonding", difficulty: 'medium' as const, completed: false, status: 'in-progress' as const, priority: 'medium' as const },
          { id: "equil-1", name: "Equilibrium", difficulty: 'easy' as const, completed: false, status: 'pending' as const, priority: 'low' as const }
        ]
      },
      {
        id: "math-1",
        name: "Mathematics",
        difficulty: 'hard' as const,
        completed: false,
        status: 'in-progress' as const,
        priority: 'high' as const,
        hoursPerWeek: 16,
        proficiency: 75,
        topics: [
          { id: "calc-1", name: "Calculus", difficulty: 'hard' as const, completed: true, status: 'completed' as const, priority: 'high' as const },
          { id: "coord-1", name: "Coordinate Geometry", difficulty: 'medium' as const, completed: true, status: 'completed' as const, priority: 'high' as const },
          { id: "prob-1", name: "Probability", difficulty: 'medium' as const, completed: false, status: 'in-progress' as const, priority: 'medium' as const }
        ]
      }
    ]
  }]);

  // State for completed plans
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([{
    id: "plan-old-1",
    name: "NEET Initial Preparation",
    description: "First phase of NEET preparation",
    userId: "user-1",
    startDate: "2024-01-01",
    endDate: "2024-03-15",
    progress: 100,
    status: 'completed' as const,
    subjects: [
      {
        id: "physics-old",
        name: "Physics",
        difficulty: 'medium' as const,
        completed: true,
        status: 'completed' as const,
        priority: 'medium' as const,
        hoursPerWeek: 10,
        proficiency: 70,
        topics: [
          { id: "mech-old", name: "Mechanics", difficulty: 'medium' as const, completed: true, status: 'completed' as const, priority: 'high' as const },
          { id: "waves-old", name: "Waves", difficulty: 'medium' as const, completed: true, status: 'completed' as const, priority: 'medium' as const }
        ]
      },
      {
        id: "chem-old",
        name: "Chemistry",
        difficulty: 'easy' as const,
        completed: true,
        status: 'completed' as const,
        priority: 'low' as const,
        hoursPerWeek: 12,
        proficiency: 80,
        topics: [
          { id: "period-old", name: "Periodic Table", difficulty: 'medium' as const, completed: true, status: 'completed' as const, priority: 'medium' as const }
        ]
      },
      {
        id: "math-old",
        name: "Mathematics",
        difficulty: 'hard' as const,
        completed: true,
        status: 'completed' as const,
        priority: 'high' as const,
        hoursPerWeek: 13,
        proficiency: 65,
        topics: [
          { id: "alg-old", name: "Algebra", difficulty: 'hard' as const, completed: true, status: 'completed' as const, priority: 'high' as const }
        ]
      }
    ]
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
  const generateTopicsForSubject = (subject: string, proficiency: string) => {
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

  const handleNewPlanCreated = (plan: any) => {
    // Create a new plan object using the input plan data
    const newPlan: StudyPlan = {
      id: uuidv4(),
      name: plan.name || "Study Plan",
      description: plan.examType ? `Study plan for ${plan.examType}` : undefined,
      userId: "user-1",
      startDate: plan.startDate || new Date().toISOString().split('T')[0],
      endDate: plan.endDate || new Date().toISOString().split('T')[0],
      progress: 0,
      status: 'active' as const,
      subjects: (plan.selectedSubjects || []).map((subject: any) => {
        // Ensure each subject has the required properties with proper types
        const subjectName = typeof subject === 'string' ? subject : subject.name;
        const studyPlanSubject: StudyPlanSubject = {
          id: `subject-${uuidv4()}`,
          name: subjectName,
          difficulty: 'medium' as const,
          completed: false,
          status: 'pending' as const,
          priority: 'medium' as const,
          hoursPerWeek: Math.floor(plan.studyHoursPerWeek ? plan.studyHoursPerWeek / (plan.selectedSubjects?.length || 1) : 10),
          proficiency: 0,
          topics: generateTopicsForSubject(subjectName, 'medium')
        };
        return studyPlanSubject;
      })
    };
    
    // Move previous active plans to completed
    const updatedCompletedPlans = [...completedPlans];
    if (activePlans.length > 0) {
      const oldActivePlans = activePlans.map(plan => ({
        ...plan,
        status: 'completed' as const
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
        isOpen={showCreateDialog}
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
