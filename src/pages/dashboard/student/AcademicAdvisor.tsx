import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import StudyPlanSection from '@/components/dashboard/student/academic/StudyPlanSection';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import { useToast } from '@/hooks/use-toast';
import type { StudyPlan, NewStudyPlan } from '@/types/user/studyPlan';

interface AcademicAdvisorProps {
  userProfile: {
    examPreparation?: string;
  };
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Sample active study plan data
  const activePlans: StudyPlan[] = [{
    id: "plan-1",
    examGoal: userProfile?.examPreparation || "IIT-JEE",
    examDate: "2024-12-15",
    daysLeft: 240,
    createdAt: "2024-04-10T12:00:00Z",
    status: 'active',
    progressPercentage: 35,
    subjects: [
      {
        name: "Physics",
        progress: 45,
        proficiency: 'moderate',
        topics: [
          { name: "Mechanics", status: 'in-progress' },
          { name: "Thermodynamics", status: 'pending' },
          { name: "Electrostatics", status: 'completed' }
        ]
      },
      {
        name: "Chemistry",
        progress: 25,
        proficiency: 'weak',
        topics: [
          { name: "Organic Chemistry", status: 'pending' },
          { name: "Chemical Bonding", status: 'in-progress' }
        ]
      },
      {
        name: "Mathematics",
        progress: 72,
        proficiency: 'strong',
        topics: [
          { name: "Calculus", status: 'completed' },
          { name: "Coordinate Geometry", status: 'completed' }
        ]
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  }];

  // Sample completed plans
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
        progress: 100,
        proficiency: 'strong',
        topics: []
      },
      {
        name: "Chemistry",
        progress: 100,
        proficiency: 'strong',
        topics: []
      },
      {
        name: "Mathematics",
        progress: 100,
        proficiency: 'strong',
        topics: []
      }
    ],
    studyHoursPerDay: 5,
    preferredStudyTime: 'morning',
    learningPace: 'slow'
  }];

  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    toast({
      title: "View Plan Details",
      description: `Opening details for plan ${planId}...`,
    });
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    console.log('New plan created:', plan);
    toast({
      title: "Success",
      description: "Your new study plan has been created.",
    });
    // Here you would typically send this to an API
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-indigo-600" />
          Academic Advisor
        </h1>
        <p className="text-gray-500 mt-1">
          Your personalized study plans and academic progress tracking
        </p>
      </div>

      {/* Active Plans Section */}
      <StudyPlanSection
        title="Active Study Plans"
        description="Your current study plans and ongoing progress"
        plans={activePlans}
        onCreatePlan={handleCreatePlan}
        onViewPlanDetails={handleViewPlanDetails}
      />

      {/* Completed Plans Section */}
      <StudyPlanSection
        title="Completed & Past Plans"
        description="History of your completed and expired study plans"
        plans={completedPlans}
        onCreatePlan={handleCreatePlan}
        onViewPlanDetails={handleViewPlanDetails}
      />

      <CreateStudyPlanWizard
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        examGoal={userProfile?.examPreparation}
        onCreatePlan={handleNewPlanCreated}
      />
    </div>
  );
};

export default AcademicAdvisor;
