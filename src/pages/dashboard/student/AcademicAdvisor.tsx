
import React from 'react';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import StudyPlansList from '@/components/dashboard/student/academic/StudyPlansList';
import { useAcademicPlans } from '@/components/dashboard/student/academic/hooks/useAcademicPlans';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';
import StudyPlanVisualizer from '@/components/dashboard/student/academic/StudyPlanVisualizer';

interface AcademicAdvisorProps {
  userProfile?: {
    examPreparation?: string;
  };
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const {
    showCreateDialog,
    selectedPlan,
    activePlans,
    completedPlans,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    setShowCreateDialog,
    setSelectedPlan
  } = useAcademicPlans(userProfile?.examPreparation);

  // Select the most recent active plan for visualization
  const currentPlan = activePlans.length > 0 ? activePlans[0] : null;
  
  const examStatsForVisualizer = currentPlan ? {
    examGoal: currentPlan.examGoal,
    progressPercentage: currentPlan.progressPercentage || 0,
    daysLeft: currentPlan.daysLeft || 30,
    totalSubjects: currentPlan.subjects.length,
    conceptCards: 24, // Mock data - would be calculated from the plan in a real application
    flashcards: 120, // Mock data
    practiceExams: 8, // Mock data
    studyHoursPerDay: currentPlan.studyHoursPerDay,
    focusArea: currentPlan.subjects.find(s => s.proficiency === 'weak')?.name || 'All subjects'
  } : {
    examGoal: userProfile?.examPreparation || "NEET",
    progressPercentage: 0,
    daysLeft: 90,
    totalSubjects: 3,
    conceptCards: 20,
    flashcards: 100,
    practiceExams: 5,
    studyHoursPerDay: 4,
    focusArea: "Physics"
  };

  return (
    <div className="space-y-8 p-6">
      {/* Back button and Header section */}
      <div className="space-y-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-4"
                asChild
              >
                <Link to="/dashboard/student">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Return to the main dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Academic Advisor</h1>
              <p className="text-muted-foreground mt-1">
                Your personalized study plans and academic progress tracking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Study Plan Visualizer - for the active plan */}
      {currentPlan && (
        <Card className="border-2 border-purple-100 shadow-sm">
          <CardContent className="p-0">
            <StudyPlanVisualizer {...examStatsForVisualizer} />
          </CardContent>
        </Card>
      )}

      {/* Study Plans List */}
      <StudyPlansList
        activePlans={activePlans}
        completedPlans={completedPlans}
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
