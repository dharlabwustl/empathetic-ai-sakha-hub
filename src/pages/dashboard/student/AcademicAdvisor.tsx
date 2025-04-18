
import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import StudyPlanSection from '@/components/dashboard/student/academic/StudyPlanSection';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
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
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

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
          { name: "Mechanics", status: 'in-progress', priority: 'high' },
          { name: "Thermodynamics", status: 'pending', priority: 'medium' },
          { name: "Electrostatics", status: 'completed', priority: 'high' }
        ]
      },
      {
        name: "Chemistry",
        progress: 25,
        proficiency: 'weak',
        topics: [
          { name: "Organic Chemistry", status: 'pending', priority: 'high' },
          { name: "Chemical Bonding", status: 'in-progress', priority: 'medium' }
        ]
      },
      {
        name: "Mathematics",
        progress: 72,
        proficiency: 'strong',
        topics: [
          { name: "Calculus", status: 'completed', priority: 'high' },
          { name: "Coordinate Geometry", status: 'completed', priority: 'high' }
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
        topics: [
          { name: "All topics", status: 'completed', priority: 'high' }
        ]
      },
      {
        name: "Chemistry",
        progress: 100,
        proficiency: 'strong',
        topics: [
          { name: "All topics", status: 'completed', priority: 'high' }
        ]
      },
      {
        name: "Mathematics",
        progress: 100,
        proficiency: 'strong',
        topics: [
          { name: "All topics", status: 'completed', priority: 'high' }
        ]
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
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    console.log('New plan created:', plan);
    toast({
      title: "Success",
      description: "Your new study plan has been created.",
    });
    setShowCreateDialog(false);
  };

  return (
    <div className="space-y-12">
      {/* Header section */}
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

      {/* Study Plan Creation Dialog */}
      <CreateStudyPlanWizard
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        examGoal={userProfile?.examPreparation}
        onCreatePlan={handleNewPlanCreated}
      />

      {/* Study Plan Detail Dialog */}
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
