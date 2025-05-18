
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UserProfileType } from '@/types/user/base';
import { BookMarked, Calendar, Edit, School, Trophy, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExamReadinessScore from '../dashboard-sections/ExamReadinessScore';

interface ExamGoalSectionProps {
  userProfile: UserProfileType;
}

const ExamGoalSection: React.FC<ExamGoalSectionProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  
  const examGoal = userProfile?.examPreparation || (userProfile?.goals && userProfile.goals[0]?.title) || "IIT-JEE";
  const examYear = userProfile?.goals?.[0]?.targetYear || "2025";
  const progress = userProfile?.goals?.[0]?.progress || 45;
  
  // Calculate days until exam
  const calculateDaysUntilExam = () => {
    const today = new Date();
    const examYear = parseInt(userProfile?.goals?.[0]?.targetYear || "2025");
    const examMonth = 4; // May (0-indexed)
    const examDay = 15; // Approx date for JEE Advanced
    
    const examDate = new Date(examYear, examMonth, examDay);
    const diffTime = examDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const daysUntilExam = calculateDaysUntilExam();
  
  // Calculate readiness score - typically would come from API
  const readinessScore = userProfile?.examReadiness?.percentage || 72;
  
  // Daily tasks that need to be completed
  const dailyTasks = [
    { id: 1, title: "Review Flashcards", route: "/dashboard/student/flashcards", completed: false },
    { id: 2, title: "Complete Today's Concept", route: "/dashboard/student/concepts/concept-1", completed: false },
    { id: 3, title: "Practice Quiz", route: "/dashboard/student/practice-exam", completed: true },
    { id: 4, title: "Review Notes", route: "/dashboard/student/notes", completed: false }
  ];
  
  const handleNavigate = (route: string) => {
    navigate(route);
  };
  
  return (
    <Card className="border-purple-100 dark:border-purple-800/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <School className="h-6 w-6 text-purple-500" />
            <span>Your Exam Goal</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => navigate('/dashboard/student/academic')}
          >
            <Edit className="h-3.5 w-3.5" />
            Change
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Exam Goal Banner with Big Font */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-900/30">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-purple-900 dark:text-purple-300">
                <BookMarked className="h-6 w-6 text-purple-600" />
                {examGoal}
              </h3>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-violet-700 dark:text-violet-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Target: {examYear}</span>
                </div>
                <div className="flex items-center text-blue-700 dark:text-blue-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{daysUntilExam} days remaining</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 sm:flex-none"
                onClick={() => navigate('/dashboard/student/academic')}
              >
                Switch Exam
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="flex-1 sm:flex-none bg-gradient-to-r from-violet-600 to-purple-600"
                onClick={() => navigate('/dashboard/student/academic')}
              >
                New Plan
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-violet-500 to-purple-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Readiness Score */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExamReadinessScore 
            overallScore={readinessScore} 
            targetExam={examGoal} 
            daysUntilExam={daysUntilExam}
          />
          
          {/* Daily Tasks */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Daily Tasks
            </h3>
            <div className="grid gap-3">
              {dailyTasks.map(task => (
                <Button 
                  key={task.id}
                  variant={task.completed ? "outline" : "secondary"}
                  className={`justify-start text-left h-auto py-3 ${
                    task.completed ? 'border-green-200 bg-green-50 text-green-800 dark:bg-green-900/20 dark:border-green-800/30' : ''
                  }`}
                  onClick={() => handleNavigate(task.route)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      task.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-100 text-blue-500 dark:bg-blue-900/30'
                    }`}>
                      {task.completed ? '✓' : '→'}
                    </div>
                    <span>{task.title}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamGoalSection;
