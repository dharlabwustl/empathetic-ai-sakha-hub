
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StudyPlan } from "@/types/user/studyPlan";
import { 
  Calendar, 
  Clock, 
  BookMarked, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  PlayCircle,
  Sparkles,
  Trophy,
  Target
} from "lucide-react";

interface StudyPlanSectionsProps {
  activePlans: StudyPlan[];
  completedPlans: StudyPlan[];
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
}

const StudyPlanSections: React.FC<StudyPlanSectionsProps> = ({
  activePlans,
  completedPlans,
  onCreatePlan,
  onViewPlanDetails
}) => {
  const StudyPlanCard = ({ plan, isCompleted = false }: { plan: StudyPlan; isCompleted?: boolean }) => {
    const getDaysLeft = () => {
      if (plan.status === "completed") return null;
      
      const endDate = new Date(plan.endDate);
      const today = new Date();
      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays > 0 ? diffDays : 0;
    };
    
    const daysLeft = getDaysLeft();

    return (
      <Card className={`group h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 ${
        isCompleted 
          ? 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 shadow-lg' 
          : 'bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-950/30 shadow-xl'
      }`}>
        <CardHeader className="pb-3 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${
                isCompleted 
                  ? 'bg-emerald-500' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                {isCompleted ? (
                  <Trophy className="h-5 w-5 text-white" />
                ) : (
                  <Target className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {plan.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{plan.examGoal} Preparation</p>
              </div>
            </div>
            <Badge 
              variant={plan.status === "active" ? "default" : "outline"}
              className={`${
                plan.status === "active" 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0" 
                  : "bg-emerald-100 text-emerald-700 border-emerald-200"
              } px-3 py-1 font-semibold`}
            >
              {plan.status === "active" ? (
                <div className="flex items-center gap-1">
                  <PlayCircle className="h-3 w-3" />
                  Active
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Completed
                </div>
              )}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow space-y-4">
          {/* Subjects Progress */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-muted-foreground">Subject Progress</span>
            </div>
            {plan.subjects.slice(0, 3).map(subject => (
              <div key={subject.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-muted-foreground">{subject.progressPercent || 0}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500" 
                    style={{ width: `${subject.progressPercent || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Timeline Info */}
          <div className="flex items-center gap-4 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          {daysLeft !== null && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
              <Clock className="h-4 w-4 text-amber-600" />
              <span className={`text-sm font-medium ${daysLeft <= 7 ? "text-amber-700" : "text-amber-600"}`}>
                {daysLeft} {daysLeft === 1 ? "day" : "days"} remaining
              </span>
            </div>
          )}
          
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-bold">{plan.progressPercent}%</span>
            </div>
            <Progress 
              value={plan.progressPercent} 
              className="h-3 bg-gray-100 dark:bg-gray-800"
            />
          </div>
        </CardContent>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-900">
          <Button 
            onClick={() => onViewPlanDetails(plan.id)} 
            className={`w-full ${
              plan.status === "active" 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl" 
                : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
            } rounded-xl transition-all duration-300 transform hover:scale-105`}
          >
            {plan.status === "active" ? (
              <>
                <BookMarked className="mr-2 h-4 w-4" />
                Continue Plan
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                View Results
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Active Plans Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold">Active Study Plans</h3>
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            {activePlans.length} Active
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePlans.map(plan => (
            <StudyPlanCard key={plan.id} plan={plan} />
          ))}
          
          {activePlans.length === 0 && (
            <div className="col-span-full">
              <Card className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-dashed border-blue-200 dark:border-blue-800">
                <CardContent>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">No Active Study Plans</h4>
                  <p className="text-muted-foreground mb-4">Create your first personalized study plan to get started</p>
                  <Button 
                    onClick={onCreatePlan} 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Create Your First Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      {/* Completed Plans Section */}
      {completedPlans.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">Completed Plans</h3>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
              {completedPlans.length} Completed
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedPlans.map(plan => (
              <StudyPlanCard key={plan.id} plan={plan} isCompleted />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanSections;
