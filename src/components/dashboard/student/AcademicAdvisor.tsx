
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

// Define proper types to match what the components expect
interface Topic {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

interface StudyPlanSubject {
  name: string;
  progress: number;
  proficiency: 'strong' | 'weak' | 'medium';
  topics: Topic[];
  id: string;
  color: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
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
        id: "subj-1",
        name: "Physics",
        progress: 45,
        proficiency: 'medium',
        color: "#4F46E5",
        hoursPerWeek: 8,
        priority: 'high',
        topics: [
          { id: "topic-1", name: "Mechanics", status: 'in-progress', difficulty: 'medium', completed: false },
          { id: "topic-2", name: "Thermodynamics", status: 'pending', difficulty: 'medium', completed: false },
          { id: "topic-3", name: "Electrostatics", status: 'completed', difficulty: 'hard', completed: true }
        ]
      },
      {
        id: "subj-2",
        name: "Chemistry",
        progress: 25,
        proficiency: 'weak',
        color: "#10B981",
        hoursPerWeek: 6,
        priority: 'medium',
        topics: [
          { id: "topic-4", name: "Organic Chemistry", status: 'pending', difficulty: 'hard', completed: false },
          { id: "topic-5", name: "Chemical Bonding", status: 'in-progress', difficulty: 'medium', completed: false },
          { id: "topic-6", name: "Equilibrium", status: 'pending', difficulty: 'easy', completed: false }
        ]
      },
      {
        id: "subj-3",
        name: "Mathematics",
        progress: 72,
        proficiency: 'strong',
        color: "#EC4899",
        hoursPerWeek: 10,
        priority: 'medium',
        topics: [
          { id: "topic-7", name: "Calculus", status: 'completed', difficulty: 'hard', completed: true },
          { id: "topic-8", name: "Coordinate Geometry", status: 'completed', difficulty: 'hard', completed: true },
          { id: "topic-9", name: "Probability", status: 'in-progress', difficulty: 'medium', completed: false }
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
        id: "old-subj-1",
        name: "Physics",
        progress: 65,
        proficiency: 'weak',
        color: "#4F46E5",
        hoursPerWeek: 5,
        priority: 'high',
        topics: [
          { id: "old-topic-1", name: "Mechanics", status: 'completed', difficulty: 'hard', completed: true },
          { id: "old-topic-2", name: "Waves", status: 'completed', difficulty: 'medium', completed: true }
        ]
      },
      {
        id: "old-subj-2",
        name: "Chemistry",
        progress: 60,
        proficiency: 'weak',
        color: "#10B981",
        hoursPerWeek: 4,
        priority: 'medium',
        topics: [
          { id: "old-topic-3", name: "Periodic Table", status: 'completed', difficulty: 'medium', completed: true }
        ]
      },
      {
        id: "old-subj-3",
        name: "Mathematics",
        progress: 70,
        proficiency: 'medium',
        color: "#EC4899",
        hoursPerWeek: 6,
        priority: 'low',
        topics: [
          { id: "old-topic-4", name: "Algebra", status: 'completed', difficulty: 'hard', completed: true }
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
    let topics: Topic[] = [];
    const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    const statuses: ('pending' | 'in-progress')[] = ['pending', 'in-progress'];
    
    // Generate topics based on subject
    switch(subject.toLowerCase()) {
      case 'physics':
        topics = [
          { 
            id: uuidv4(), 
            name: "Mechanics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          },
          { 
            id: uuidv4(), 
            name: "Thermodynamics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          },
          { 
            id: uuidv4(), 
            name: "Electrostatics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          }
        ];
        break;
      case 'chemistry':
        topics = [
          { 
            id: uuidv4(), 
            name: "Organic Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          },
          { 
            id: uuidv4(), 
            name: "Inorganic Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          },
          { 
            id: uuidv4(), 
            name: "Physical Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          }
        ];
        break;
      case 'mathematics':
        topics = [
          { 
            id: uuidv4(), 
            name: "Calculus", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          },
          { 
            id: uuidv4(), 
            name: "Algebra", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          },
          { 
            id: uuidv4(), 
            name: "Geometry", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          }
        ];
        break;
      default:
        topics = [
          { 
            id: uuidv4(), 
            name: "Fundamentals", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          },
          { 
            id: uuidv4(), 
            name: "Advanced Topics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          }
        ];
    }
    
    return topics;
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
      subjects: plan.subjects.map((subject, index) => ({
        id: `subj-new-${index}`,
        name: subject.name,
        progress: 0,
        proficiency: subject.proficiency,
        color: ["#4F46E5", "#10B981", "#EC4899", "#F59E0B", "#6366F1"][index % 5],
        hoursPerWeek: Math.floor(Math.random() * 5) + 4, // 4-8 hours
        priority: ['high', 'medium', 'low'][index % 3] as 'high' | 'medium' | 'low',
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
