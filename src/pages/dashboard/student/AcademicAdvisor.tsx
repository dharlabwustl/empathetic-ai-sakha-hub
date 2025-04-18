
import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import StudyPlanSection from '@/components/dashboard/student/academic/StudyPlanSection';
import { useToast } from '@/hooks/use-toast';

interface AcademicAdvisorProps {
  userProfile: any;
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Sample data - in real app, this would come from an API
  const activePlans = [{
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
    ]
  }];

  const completedPlans = [{
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
    ]
  }];

  const handleCreatePlan = () => {
    setShowCreateDialog(true);
    toast({
      title: "Create New Study Plan",
      description: "Opening study plan creation wizard...",
    });
  };

  const handleViewPlanDetails = (planId: string) => {
    toast({
      title: "View Plan Details",
      description: `Opening details for plan ${planId}...`,
    });
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
    </div>
  );
};

export default AcademicAdvisor;
