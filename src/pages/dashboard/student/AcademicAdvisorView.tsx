
import React, { useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import StudyPlanSections from '@/components/dashboard/student/academic/components/StudyPlanSections';
import { useAcademicPlans } from '@/components/dashboard/student/academic/hooks/useAcademicPlans';

const AcademicAdvisorView: React.FC = () => {
  const {
    showCreateDialog,
    selectedPlan,
    activePlans,
    completedPlans,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    setShowCreateDialog,
    setSelectedPlan,
    loadSignupStudyPlan
  } = useAcademicPlans();

  // Load signup study plan when component mounts
  useEffect(() => {
    loadSignupStudyPlan();
  }, [loadSignupStudyPlan]);

  return (
    <div className="space-y-12">
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-indigo-600" />
          Academic Advisor
        </h1>
        <p className="text-gray-500 mt-1 text-base">
          Your personalized study plans and academic progress tracking
        </p>
      </div>

      <StudyPlanSections
        activePlans={activePlans}
        completedPlans={completedPlans}
        onCreatePlan={handleCreatePlan}
        onViewPlanDetails={handleViewPlanDetails}
      />

      {/* Study Plan Creation Dialog */}
      <CreateStudyPlanWizard
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
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

export default AcademicAdvisorView;
