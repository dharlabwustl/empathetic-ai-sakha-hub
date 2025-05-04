
import React from 'react';
import { Helmet } from 'react-helmet';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Calendar, 
  GraduationCap, 
  Clock, 
  BookOpen,
  PlusCircle 
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import BackButton from '@/components/dashboard/student/BackButton';
import StudyPlansList from '@/components/dashboard/student/academic/StudyPlansList';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import { useAcademicPlans } from '@/components/dashboard/student/academic/hooks/useAcademicPlans';

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
  
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <TooltipProvider>
      <div className="space-y-6 p-6">
        <Helmet>
          <title>Academic Advisor - PREPZR</title>
        </Helmet>
        
        {/* Back button */}
        <BackButton to="/dashboard/student" label="Back to Dashboard" />
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              Academic Advisor
            </h1>
            <p className="text-muted-foreground mt-1">
              Your personalized study plans and academic progress tracking
            </p>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleCreatePlan}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Create New Plan
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new personalized study plan</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {/* Academic Progress Overview Card */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-muted-foreground text-sm">Current Goal</div>
              <div className="text-2xl font-semibold">
                {userProfile?.examPreparation || "NEET"}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {activePlans.length > 0 
                    ? `Exam date: ${format(new Date(activePlans[0].examDate), 'MMM d, yyyy')}` 
                    : "No exam date set"}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-muted-foreground text-sm">Study Plan Status</div>
              <div className="text-2xl font-semibold">
                {activePlans.length} Active
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {activePlans.length > 0 && activePlans[0].daysLeft 
                    ? `${activePlans[0].daysLeft} days remaining` 
                    : "No active countdown"}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-muted-foreground text-sm">Overall Progress</div>
              <div className="text-2xl font-semibold">
                {activePlans.length > 0 
                  ? `${activePlans[0].progressPercentage || 0}% Complete` 
                  : "No progress yet"}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>
                  {activePlans.length > 0 
                    ? `${activePlans[0].subjects.length} Subjects planned` 
                    : "No subjects planned"}
                </span>
              </div>
            </div>
          </div>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <StudyPlansList
              activePlans={activePlans}
              completedPlans={completedPlans}
              onCreatePlan={handleCreatePlan}
              onViewPlanDetails={handleViewPlanDetails}
            />
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Study Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Subject Distribution</h4>
                  <div className="h-[200px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-md">
                    <p className="text-muted-foreground">Analytics visualization will appear here</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Weekly Progress</h4>
                  <div className="h-[200px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-md">
                    <p className="text-muted-foreground">Weekly progress chart will appear here</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

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
    </TooltipProvider>
  );
};

export default AcademicAdvisor;
