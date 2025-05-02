
import React, { useState } from 'react';
import AcademicHeader from '@/components/dashboard/student/academic/AcademicHeader';
import StudyPlansList from '@/components/dashboard/student/academic/StudyPlansList';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';
import type { StudyPlan, NewStudyPlan, Topic } from '@/types/user/studyPlan';

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
        id: "subject-1",
        name: "Physics",
        progress: 45,
        proficiency: 'medium',
        color: "#8B5CF6",
        hoursPerWeek: 10,
        priority: 'medium',
        topics: [
          { id: "topic-1", name: "Mechanics", status: 'in-progress', difficulty: 'medium', completed: false },
          { id: "topic-2", name: "Thermodynamics", status: 'pending', difficulty: 'medium', completed: false },
          { id: "topic-3", name: "Electrostatics", status: 'completed', difficulty: 'hard', completed: true }
        ]
      },
      {
        id: "subject-2",
        name: "Chemistry",
        progress: 25,
        proficiency: 'weak',
        color: "#10B981",
        hoursPerWeek: 12,
        priority: 'high',
        topics: [
          { id: "topic-4", name: "Organic Chemistry", status: 'pending', difficulty: 'hard', completed: false },
          { id: "topic-5", name: "Chemical Bonding", status: 'in-progress', difficulty: 'medium', completed: false },
          { id: "topic-6", name: "Equilibrium", status: 'pending', difficulty: 'easy', completed: false }
        ]
      },
      {
        id: "subject-3",
        name: "Mathematics",
        progress: 72,
        proficiency: 'strong',
        color: "#F59E0B",
        hoursPerWeek: 8,
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
    learningPace: 'moderate',
    userId: "1",
    goal: "IIT-JEE",
    updatedAt: "2024-04-10T12:00:00Z",
    weeklyHours: 42
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
        id: "old-subject-1",
        name: "Physics",
        progress: 65,
        proficiency: 'weak',
        color: "#EF4444",
        hoursPerWeek: 7,
        priority: 'high',
        topics: [
          { id: "old-topic-1", name: "Mechanics", status: 'completed', difficulty: 'hard', completed: true },
          { id: "old-topic-2", name: "Waves", status: 'completed', difficulty: 'medium', completed: true }
        ]
      },
      {
        id: "old-subject-2",
        name: "Chemistry",
        progress: 60,
        proficiency: 'weak',
        color: "#2563EB",
        hoursPerWeek: 5,
        priority: 'medium',
        topics: [
          { id: "old-topic-3", name: "Periodic Table", status: 'completed', difficulty: 'medium', completed: true }
        ]
      },
      {
        id: "old-subject-3",
        name: "Mathematics",
        progress: 70,
        proficiency: 'medium',
        color: "#6366F1",
        hoursPerWeek: 8,
        priority: 'high',
        topics: [
          { id: "old-topic-4", name: "Algebra", status: 'completed', difficulty: 'hard', completed: true }
        ]
      }
    ],
    studyHoursPerDay: 5,
    preferredStudyTime: 'morning',
    learningPace: 'slow',
    userId: "1",
    goal: "IIT-JEE",
    updatedAt: "2024-01-01T12:00:00Z",
    weeklyHours: 35
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
  const generateTopicsForSubject = (subject: string, proficiency: 'weak' | 'medium' | 'strong'): Topic[] => {
    const topics: Topic[] = [];
    const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    const statuses: ('pending' | 'in-progress')[] = ['pending', 'in-progress'];
    
    // Generate topics based on subject
    switch(subject.toLowerCase()) {
      case 'physics':
        topics.push(
          { 
            id: `topic-${Math.random().toString(36).substr(2, 9)}`, 
            name: "Mechanics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false
          },
          { 
            id: `topic-${Math.random().toString(36).substr(2, 9)}`, 
            name: "Thermodynamics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false 
          },
          { 
            id: `topic-${Math.random().toString(36).substr(2, 9)}`, 
            name: "Electrostatics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false 
          }
        );
        break;
      case 'chemistry':
        topics.push(
          { 
            id: `topic-${Math.random().toString(36).substr(2, 9)}`, 
            name: "Organic Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false 
          },
          { 
            id: `topic-${Math.random().toString(36).substr(2, 9)}`, 
            name: "Inorganic Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false 
          },
          { 
            id: `topic-${Math.random().toString(36).substr(2, 9)}`, 
            name: "Physical Chemistry", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false 
          }
        );
        break;
      case 'mathematics':
        topics.push(
          { 
            id: `topic-${Math.random().toString(36).substr(2, 9)}`, 
            name: "Calculus", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false 
          },
          { 
            id: `topic-${Math.random().toString(36).substr(2, 9)}`, 
            name: "Algebra", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false 
          },
          { 
            id: `topic-${Math.random().toString(36).substr(2, 9)}`, 
            name: "Geometry", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false 
          }
        );
        break;
      default:
        topics.push(
          { 
            id: `topic-${Math.random().toString(36).substr(2, 9)}`, 
            name: "Fundamentals", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false 
          },
          { 
            id: `topic-${Math.random().toString(36).substr(2, 9)}`, 
            name: "Advanced Topics", 
            status: statuses[Math.floor(Math.random() * statuses.length)], 
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            completed: false 
          }
        );
    }
    
    return topics;
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    // Create a new plan object
    const newPlan: StudyPlan = {
      id: uuidv4(),
      userId: "1",
      examGoal: plan.examGoal || '',
      examDate: plan.examDate ? format(new Date(plan.examDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      daysLeft: plan.examDate ? differenceInCalendarDays(new Date(plan.examDate), new Date()) : 90,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      progressPercentage: 0,
      subjects: plan.subjects.map(subject => ({
        id: subject.id || `subject-${Math.random().toString(36).substr(2, 9)}`,
        name: subject.name,
        progress: 0,
        proficiency: subject.proficiency || 'medium',
        color: subject.color || getRandomColor(),
        hoursPerWeek: subject.hoursPerWeek || 7,
        priority: subject.priority || 'medium',
        topics: generateTopicsForSubject(subject.name, subject.proficiency || 'medium')
      })),
      studyHoursPerDay: plan.studyHoursPerDay || 6,
      preferredStudyTime: plan.preferredStudyTime || 'morning',
      learningPace: plan.learningPace || 'moderate',
      goal: plan.goal || '',
      weeklyHours: plan.weeklyHours || 42
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

// Helper function to generate random colors
const getRandomColor = (): string => {
  const colors = [
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#2563EB', // Blue
    '#EF4444', // Red
    '#6366F1', // Indigo
    '#14B8A6', // Teal
    '#F97316', // Orange
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default AcademicAdvisor;
