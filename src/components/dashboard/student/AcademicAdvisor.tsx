
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight, Calendar, Clock, Target, Brain, BookOpen } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import NewStudyPlanModal from './NewStudyPlanModal';

interface AcademicAdvisorProps {
  userProfile: any;
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);

  const handleViewPlan = () => {
    toast({
      title: "Study Plan",
      description: "Opening your detailed study plan...",
    });
  };

  const handleCreatePlan = () => {
    setShowNewPlanModal(true);
  };

  return (
    <>
      <Card className="border shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40 pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Academic Advisor
          </CardTitle>
          <CardDescription>
            Your personalized study recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {userProfile?.studyPlan ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Goal</h4>
                <p className="text-lg font-medium">{userProfile.studyPlan.goal || "IIT-JEE"}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Exam: {userProfile.studyPlan.examDate || "Apr 2025"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{userProfile.studyPlan.daysLeft || "240"} days left</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Focus</h4>
                <div className="space-y-1">
                  {(userProfile.studyPlan.todaysFocus || ['Physics: Thermodynamics', 'Chemistry: Equilibrium', 'Mathematics: Integration']).map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-2" />
              <h3 className="font-medium text-lg mb-1">No Active Study Plan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Create a personalized study plan based on your goals
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 pt-0">
          {userProfile?.studyPlan ? (
            <>
              <Button 
                variant="default" 
                className="w-full sm:w-auto flex items-center gap-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={handleViewPlan}
              >
                View Study Plan <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-white dark:bg-gray-800"
                onClick={handleCreatePlan}
              >
                Create New Plan
              </Button>
            </>
          ) : (
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              onClick={handleCreatePlan}
            >
              Create Study Plan
            </Button>
          )}
        </CardFooter>
      </Card>

      <NewStudyPlanModal 
        isOpen={showNewPlanModal} 
        onClose={() => setShowNewPlanModal(false)} 
        userProfile={userProfile}
      />
    </>
  );
};

export default AcademicAdvisor;
