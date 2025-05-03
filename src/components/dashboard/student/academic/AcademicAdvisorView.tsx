
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/user/base';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';
import { StudyPlan, NewStudyPlan } from '@/types/user/studyPlan';
import { PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { differenceInCalendarDays, format } from 'date-fns';
import CreateStudyPlanWizard from './CreateStudyPlanWizard';
import StudyPlanVisualizer from './StudyPlanVisualizer';
import ActivePlansList from './ActivePlansList';
import CompletedPlansList from './CompletedPlansList';
import type { Topic } from '@/types/user/studyPlan';

const AcademicAdvisorView: React.FC = () => {
  const { toast } = useToast();
  const { userProfile } = useUserProfile();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([getMockActivePlan(userProfile?.goals?.[0]?.title || "NEET")]);
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>(getMockCompletedPlans());

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    // Create a new study plan from the submitted data
    const newPlan: StudyPlan = {
      id: uuidv4(),
      examGoal: plan.examGoal || "NEET",
      examDate: plan.examDate || format(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      daysLeft: plan.examDate ? 
        differenceInCalendarDays(new Date(plan.examDate), new Date()) :
        90, // Default to 90 days if no date provided
      createdAt: new Date().toISOString(),
      status: 'active',
      progressPercentage: 0,
      subjects: plan.subjects.map(subject => ({
        name: subject.name,
        progress: 0,
        proficiency: subject.proficiency,
        topics: generateTopicsForSubject(subject.name, subject.proficiency)
      })),
      studyHoursPerDay: plan.studyHoursPerDay || 6,
      preferredStudyTime: plan.preferredStudyTime || 'evening',
      learningPace: plan.learningPace || 'moderate'
    };

    // Move active plans to completed if they exist
    if (activePlans.length > 0) {
      const oldPlans = activePlans.map(plan => ({
        ...plan,
        status: 'completed' as const
      }));
      setCompletedPlans([...oldPlans, ...completedPlans]);
    }
    
    // Set the new plan as the active plan
    setActivePlans([newPlan]);
    
    toast({
      title: "Success",
      description: "Your new study plan has been created!",
    });
    
    setShowCreateDialog(false);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1">Academic Advisor</h1>
          <p className="text-muted-foreground">
            Manage your study plans and track your academic progress
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-blue-600 to-violet-600 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </div>
      
      {/* Current Plan Visualization */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Current Study Plan</h2>
        {activePlans.length > 0 && (
          <StudyPlanVisualizer 
            examGoal={activePlans[0].examGoal}
            progressPercentage={activePlans[0].progressPercentage}
            daysLeft={activePlans[0].daysLeft}
            totalSubjects={activePlans[0].subjects.length}
            conceptCards={120}
            flashcards={250}
            practiceExams={30}
            studyHoursPerDay={activePlans[0].studyHoursPerDay}
            focusArea="Mathematics"
          />
        )}
      </section>
      
      {/* Active Plans List */}
      <section className="grid grid-cols-1 gap-6">
        <h2 className="text-2xl font-semibold mb-0">Active Study Plans</h2>
        <ActivePlansList plans={activePlans} />
      </section>
      
      {/* Completed Plans List */}
      <section className="grid grid-cols-1 gap-6">
        <h2 className="text-2xl font-semibold mb-0">Completed Plans</h2>
        <CompletedPlansList plans={completedPlans} />
      </section>
      
      {/* Create Plan Dialog */}
      <CreateStudyPlanWizard 
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        examGoal={userProfile?.goals?.[0]?.title || "NEET"}
        onCreatePlan={handleNewPlanCreated}
      />
    </div>
  );
};

// Function to generate a mock active study plan
function getMockActivePlan(examGoal: string): StudyPlan {
  return {
    id: "plan-1",
    examGoal: examGoal,
    examDate: "2024-12-15",
    daysLeft: 240,
    createdAt: "2024-04-10T12:00:00Z",
    status: 'active',
    progressPercentage: 35,
    subjects: [
      {
        name: "Physics",
        progress: 45,
        proficiency: 'weak',
        topics: [
          { 
            id: "topic-1-1",
            name: "Mechanics", 
            status: 'in-progress', 
            priority: 'high', 
            difficulty: 'medium', 
            completed: false 
          },
          { 
            id: "topic-1-2",
            name: "Thermodynamics", 
            status: 'pending', 
            priority: 'medium', 
            difficulty: 'medium', 
            completed: false 
          },
          { 
            id: "topic-1-3",
            name: "Electrostatics", 
            status: 'completed', 
            priority: 'high', 
            difficulty: 'hard', 
            completed: true 
          }
        ]
      },
      {
        name: "Chemistry",
        progress: 25,
        proficiency: 'weak',
        topics: [
          { 
            id: "topic-2-1",
            name: "Organic Chemistry", 
            status: 'pending', 
            priority: 'high', 
            difficulty: 'hard', 
            completed: false 
          },
          { 
            id: "topic-2-2",
            name: "Chemical Bonding", 
            status: 'in-progress', 
            priority: 'medium', 
            difficulty: 'medium', 
            completed: false 
          },
          { 
            id: "topic-2-3",
            name: "Equilibrium", 
            status: 'pending', 
            priority: 'low', 
            difficulty: 'easy', 
            completed: false 
          }
        ]
      },
      {
        name: "Mathematics",
        progress: 72,
        proficiency: 'strong',
        topics: [
          { 
            id: "topic-3-1",
            name: "Calculus", 
            status: 'completed', 
            priority: 'high', 
            difficulty: 'hard', 
            completed: true 
          },
          { 
            id: "topic-3-2",
            name: "Coordinate Geometry", 
            status: 'completed', 
            priority: 'high', 
            difficulty: 'medium', 
            completed: true 
          },
          { 
            id: "topic-3-3",
            name: "Probability", 
            status: 'in-progress', 
            priority: 'medium', 
            difficulty: 'medium', 
            completed: false 
          }
        ]
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  };
}

// Function to generate mock completed plans
function getMockCompletedPlans(): StudyPlan[] {
  return [{
    id: "plan-old-1",
    examGoal: "NEET",
    examDate: "2024-03-15",
    daysLeft: 0,
    createdAt: "2024-01-01T12:00:00Z",
    status: 'completed',
    progressPercentage: 100,
    subjects: [
      {
        name: "Physics",
        progress: 65,
        proficiency: 'weak',
        topics: [
          { 
            id: "old-topic-1-1",
            name: "Mechanics", 
            status: 'completed', 
            priority: 'high', 
            difficulty: 'medium', 
            completed: true 
          },
          { 
            id: "old-topic-1-2",
            name: "Waves", 
            status: 'completed', 
            priority: 'medium', 
            difficulty: 'medium', 
            completed: true 
          }
        ]
      },
      {
        name: "Chemistry",
        progress: 60,
        proficiency: 'weak',
        topics: [
          { 
            id: "old-topic-2-1",
            name: "Periodic Table", 
            status: 'completed', 
            priority: 'medium', 
            difficulty: 'easy', 
            completed: true 
          }
        ]
      },
      {
        name: "Mathematics",
        progress: 70,
        proficiency: 'strong',
        topics: [
          { 
            id: "old-topic-3-1",
            name: "Algebra", 
            status: 'completed', 
            priority: 'high', 
            difficulty: 'medium', 
            completed: true 
          }
        ]
      }
    ],
    studyHoursPerDay: 5,
    preferredStudyTime: 'morning',
    learningPace: 'slow'
  }];
}

// Function to generate topics based on subject
function generateTopicsForSubject(subject: string, proficiency: 'weak' | 'strong'): Topic[] {
  const priorities: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
  const statuses: ('pending' | 'in-progress')[] = ['pending', 'in-progress'];
  const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
  
  // Generate topics based on subject
  let topicNames: string[] = [];
  
  switch(subject.toLowerCase()) {
    case 'physics':
      topicNames = ["Mechanics", "Thermodynamics", "Electrostatics"];
      break;
    case 'chemistry':
      topicNames = ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"];
      break;
    case 'biology':
      topicNames = ["Human Anatomy", "Cell Biology", "Genetics"];
      break;
    case 'mathematics':
      topicNames = ["Calculus", "Algebra", "Geometry"];
      break;
    case 'general knowledge':
      topicNames = ["Current Affairs", "Science Facts", "History"];
      break;
    default:
      topicNames = ["Fundamentals", "Advanced Topics", "Special Topics"];
  }
  
  return topicNames.map((name, index) => ({
    id: `new-topic-${Math.random().toString(36).substr(2, 9)}`,
    name,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
    completed: false
  }));
}

export default AcademicAdvisorView;
