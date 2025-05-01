import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfileBase } from '@/types/user/base';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';
import { StudyPlan, NewStudyPlan } from '@/types/user/studyPlan';
import { PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';
import CreateStudyPlanWizard from './CreateStudyPlanWizard';
import StudyPlanVisualizer from './StudyPlanVisualizer';
import ActivePlansList from './ActivePlansList';
import CompletedPlansList from './CompletedPlansList';

const AcademicAdvisorView: React.FC = () => {
  const { toast } = useToast();
  const { userProfile } = useUserProfile();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  // Mock active study plan
  const activePlan: StudyPlan = {
    id: "plan-1",
    examGoal: userProfile?.goals?.[0]?.title || "IIT-JEE",
    examDate: "2024-12-15",
    daysLeft: 240,
    createdAt: "2024-04-10T12:00:00Z",
    status: 'active',
    progressPercentage: 35,
    subjects: [
      {
        name: "Physics",
        progress: 45,
        proficiency: 'medium',
        topics: [
          { id: "topic-1", name: "Mechanics", status: 'in-progress', difficulty: 'medium', completed: false },
          { id: "topic-2", name: "Thermodynamics", status: 'pending', difficulty: 'medium', completed: false },
          { id: "topic-3", name: "Electrostatics", status: 'completed', difficulty: 'hard', completed: true }
        ]
      },
      {
        name: "Chemistry",
        progress: 25,
        proficiency: 'weak',
        topics: [
          { id: "topic-4", name: "Organic Chemistry", status: 'pending', difficulty: 'hard', completed: false },
          { id: "topic-5", name: "Chemical Bonding", status: 'in-progress', difficulty: 'medium', completed: false },
          { id: "topic-6", name: "Equilibrium", status: 'pending', difficulty: 'easy', completed: false }
        ]
      },
      {
        name: "Mathematics",
        progress: 72,
        proficiency: 'strong',
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
  };

  // Mock completed plans
  const completedPlans: StudyPlan[] = [{
    id: "plan-old-1",
    examGoal: "IIT-JEE",
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
          { id: "old-topic-1", name: "Mechanics", status: 'completed', difficulty: 'hard', completed: true },
          { id: "old-topic-2", name: "Waves", status: 'completed', difficulty: 'medium', completed: true }
        ]
      },
      {
        name: "Chemistry",
        progress: 60,
        proficiency: 'weak',
        topics: [
          { id: "old-topic-3", name: "Periodic Table", status: 'completed', difficulty: 'medium', completed: true }
        ]
      },
      {
        name: "Mathematics",
        progress: 70,
        proficiency: 'medium',
        topics: [
          { id: "old-topic-4", name: "Algebra", status: 'completed', difficulty: 'hard', completed: true }
        ]
      }
    ],
    studyHoursPerDay: 5,
    preferredStudyTime: 'morning',
    learningPace: 'slow'
  }];

  // Function to generate topics based on subject
  const generateTopicsForSubject = (subject: string, proficiency: 'weak' | 'medium' | 'strong') => {
    let topics = [];
    const priorities = ['high', 'medium', 'low'];
    const statuses = ['pending', 'in-progress'];
    
    // Generate topics based on subject
    switch(subject.toLowerCase()) {
      case 'physics':
        topics = [
          { name: "Mechanics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low' },
          { name: "Thermodynamics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low' },
          { name: "Electrostatics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low' }
        ];
        break;
      case 'chemistry':
        topics = [
          { name: "Organic Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low' },
          { name: "Inorganic Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low' },
          { name: "Physical Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low' }
        ];
        break;
      case 'mathematics':
        topics = [
          { name: "Calculus", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low' },
          { name: "Algebra", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low' },
          { name: "Geometry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low' }
        ];
        break;
      default:
        topics = [
          { name: "Fundamentals", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low' },
          { name: "Advanced Topics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', priority: priorities[Math.floor(Math.random() * priorities.length)] as 'high' | 'medium' | 'low' }
        ];
    }
    
    return topics;
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    // In a real app, this would call an API to create the plan
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
        <StudyPlanVisualizer 
          examGoal={activePlan.examGoal}
          progressPercentage={activePlan.progressPercentage}
          daysLeft={activePlan.daysLeft}
          totalSubjects={activePlan.subjects.length}
          conceptCards={120}
          flashcards={250}
          practiceExams={30}
          studyHoursPerDay={activePlan.studyHoursPerDay}
          focusArea="Mathematics"
        />
      </section>
      
      {/* Active Plans List */}
      <section className="grid grid-cols-1 gap-6">
        <h2 className="text-2xl font-semibold mb-0">Active Study Plans</h2>
        <ActivePlansList plans={[activePlan]} />
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
        examGoal={userProfile?.goals?.[0]?.title || "IIT-JEE"}
        onCreatePlan={handleNewPlanCreated}
      />
    </div>
  );
};

export default AcademicAdvisorView;
