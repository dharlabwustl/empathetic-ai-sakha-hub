
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
        id: "phys-1",
        name: "Physics",
        color: "#f87171",
        progress: 45,
        hoursPerWeek: 10,
        proficiency: 'moderate',
        priority: 'high',
        topics: [
          { id: "topic-1", name: "Mechanics", status: 'in-progress', priority: 'high', completed: false, difficulty: 'medium' },
          { id: "topic-2", name: "Thermodynamics", status: 'pending', priority: 'medium', completed: false, difficulty: 'medium' },
          { id: "topic-3", name: "Electrostatics", status: 'completed', priority: 'high', completed: true, difficulty: 'hard' }
        ]
      },
      {
        id: "chem-1",
        name: "Chemistry",
        color: "#60a5fa",
        progress: 25,
        hoursPerWeek: 8,
        proficiency: 'weak',
        priority: 'medium',
        topics: [
          { id: "topic-4", name: "Organic Chemistry", status: 'pending', priority: 'high', completed: false, difficulty: 'hard' },
          { id: "topic-5", name: "Chemical Bonding", status: 'in-progress', priority: 'medium', completed: false, difficulty: 'medium' },
          { id: "topic-6", name: "Equilibrium", status: 'pending', priority: 'low', completed: false, difficulty: 'easy' }
        ]
      },
      {
        id: "math-1",
        name: "Mathematics",
        color: "#4ade80",
        progress: 72,
        hoursPerWeek: 12,
        proficiency: 'strong',
        priority: 'high',
        topics: [
          { id: "topic-7", name: "Calculus", status: 'completed', priority: 'high', completed: true, difficulty: 'medium' },
          { id: "topic-8", name: "Coordinate Geometry", status: 'completed', priority: 'high', completed: true, difficulty: 'medium' },
          { id: "topic-9", name: "Probability", status: 'in-progress', priority: 'medium', completed: false, difficulty: 'hard' }
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
    examGoal: "IIT-JEE",
    examDate: "2024-03-15",
    daysLeft: 0,
    createdAt: "2024-01-01T12:00:00Z",
    status: 'completed',
    progressPercentage: 100,
    subjects: [
      {
        id: "old-phys-1",
        name: "Physics",
        color: "#f87171",
        progress: 65,
        hoursPerWeek: 8,
        proficiency: 'weak',
        priority: 'medium',
        topics: [
          { id: "old-topic-1", name: "Mechanics", status: 'completed', priority: 'high', completed: true, difficulty: 'medium' },
          { id: "old-topic-2", name: "Waves", status: 'completed', priority: 'medium', completed: true, difficulty: 'medium' }
        ]
      },
      {
        id: "old-chem-1",
        name: "Chemistry",
        color: "#60a5fa", 
        progress: 60,
        hoursPerWeek: 6,
        proficiency: 'weak',
        priority: 'low',
        topics: [
          { id: "old-topic-3", name: "Periodic Table", status: 'completed', priority: 'medium', completed: true, difficulty: 'easy' }
        ]
      },
      {
        id: "old-math-1",
        name: "Mathematics",
        color: "#4ade80",
        progress: 70,
        hoursPerWeek: 10,
        proficiency: 'moderate',
        priority: 'high',
        topics: [
          { id: "old-topic-4", name: "Algebra", status: 'completed', priority: 'high', completed: true, difficulty: 'medium' }
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
  const generateTopicsForSubject = (subject: string, proficiency: 'weak' | 'moderate' | 'strong') => {
    let topics = [];
    const priorities = ['high', 'medium', 'low'];
    const statuses = ['pending', 'in-progress'];
    const difficulties = ['easy', 'medium', 'hard'];
    
    // Generate topics based on subject
    switch(subject.toLowerCase()) {
      case 'physics':
        topics = [
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Mechanics", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          },
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Thermodynamics", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          },
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Electrostatics", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          }
        ];
        break;
      case 'chemistry':
        topics = [
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Organic Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          },
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Inorganic Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          },
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Physical Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          }
        ];
        break;
      case 'mathematics':
        topics = [
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Calculus", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          },
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Algebra", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          },
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Geometry", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          }
        ];
        break;
      case 'biology':
        topics = [
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Cell Biology", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          },
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Human Physiology", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          },
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Genetics", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          }
        ];
        break;
      default:
        topics = [
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Fundamentals", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          },
          { 
            id: `topic-${Math.random().toString(36).substring(2, 9)}`, 
            name: "Advanced Topics", 
            status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', 
            priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low',
            completed: false,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard'
          }
        ];
    }
    
    return topics;
  };

  const getRandomColor = () => {
    const colors = ['#f87171', '#60a5fa', '#4ade80', '#fbbf24', '#a78bfa', '#f472b6', '#34d399', '#fb923c'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    // Create a new plan object
    const newPlan: StudyPlan = {
      id: uuidv4(),
      examGoal: plan.examGoal,
      examDate: format(plan.examDate, 'yyyy-MM-dd'),
      daysLeft: differenceInCalendarDays(plan.examDate, new Date()),
      createdAt: new Date().toISOString(),
      status: 'active',
      progressPercentage: 0,
      subjects: plan.subjects.map(subject => ({
        id: uuidv4(),
        name: subject.name,
        color: getRandomColor(),
        progress: 0,
        proficiency: subject.proficiency,
        hoursPerWeek: Math.floor(Math.random() * 10) + 5, // 5-15 hours
        priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
        topics: generateTopicsForSubject(subject.name, subject.proficiency)
      })),
      studyHoursPerDay: plan.studyHoursPerDay,
      preferredStudyTime: plan.preferredStudyTime as 'morning' | 'afternoon' | 'evening' | 'night',
      learningPace: plan.learningPace as 'slow' | 'moderate' | 'fast'
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
