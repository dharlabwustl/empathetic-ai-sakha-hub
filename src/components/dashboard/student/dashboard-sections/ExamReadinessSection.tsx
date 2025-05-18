
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoCircle, Trophy, CheckCircle, Clock, Calendar, Brain, Lightbulb } from "lucide-react";
import { UserProfileType } from '@/types/user/base';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExamReadinessSectionProps {
  userProfile: UserProfileType;
}

const ExamReadinessSection: React.FC<ExamReadinessSectionProps> = ({ userProfile }) => {
  const examReadinessScore = 72;
  const daysRemaining = 45;
  const conceptsCovered = 85;
  const totalConcepts = 120;
  const practiceTestsCompleted = 24;
  const userPace = "Consistent"; // "Fast", "Slow", "Consistent", "Irregular"
  const examDate = new Date();
  examDate.setDate(examDate.getDate() + daysRemaining);

  const formattedExamDate = examDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // Get appropriate color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };
  
  // Get tips based on exam readiness
  const getReadinessTips = () => {
    if (examReadinessScore >= 80) {
      return [
        "Focus on advanced problem-solving techniques",
        "Take full-length mock exams under timed conditions",
        "Review mistakes carefully to identify any remaining gaps",
        "Work on test-taking strategies to optimize time management"
      ];
    }
    if (examReadinessScore >= 60) {
      return [
        "Increase practice test frequency to once every three days",
        "Review difficult concepts with more focused study sessions",
        "Start creating comprehensive revision notes for quick review",
        "Focus on improving your weakest subjects first"
      ];
    }
    return [
      "Establish a strict daily study schedule of at least 4 hours",
      "Focus exclusively on core concepts before moving to advanced topics",
      "Consider forming a study group for mutual support",
      "Use spaced repetition techniques to improve retention"
    ];
  };
  
  // Get suggestions based on time remaining
  const getTimeSuggestions = () => {
    if (daysRemaining > 60) {
      return [
        "Build a strong foundation in core concepts",
        "Create a detailed study plan with weekly goals",
        "Start incorporating practice questions into your routine",
        "Focus on understanding rather than memorizing"
      ];
    }
    if (daysRemaining > 30) {
      return [
        "Complete all syllabus topics in the next two weeks",
        "Start taking full subject mock tests",
        "Review and reinforce weak areas identified in practice tests",
        "Begin creating comprehensive revision notes"
      ];
    }
    return [
      "Focus on frequent revision rather than new topics",
      "Take full-length mock exams every 3-4 days",
      "Practice time management techniques",
      "Prioritize high-yield topics for maximum impact"
    ];
  };
  
  const readinessTips = getReadinessTips();
  const timeSuggestions = getTimeSuggestions();

  return (
    <Card className="shadow-sm dark:border-gray-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Exam Readiness Score</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <InfoCircle size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Your exam readiness score is calculated based on your study progress, test performance, and concept mastery.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tips">Tips & Advice</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              {/* Score Circle */}
              <div className="flex justify-center">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200 dark:text-gray-800"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className={
                        examReadinessScore >= 80
                          ? "text-green-500"
                          : examReadinessScore >= 60
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                      strokeWidth="10"
                      strokeDasharray={`${examReadinessScore * 2.51} 251.2`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(examReadinessScore)}`}>
                        {examReadinessScore}%
                      </div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        READINESS
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-muted/50 p-2 rounded-lg">
                  <Clock className="h-4 w-4 mx-auto text-blue-500 mb-1" />
                  <div className="font-bold">{daysRemaining} days</div>
                  <div className="text-xs text-muted-foreground">Until Exam</div>
                </div>
                
                <div className="bg-muted/50 p-2 rounded-lg">
                  <Calendar className="h-4 w-4 mx-auto text-purple-500 mb-1" />
                  <div className="font-bold">{formattedExamDate}</div>
                  <div className="text-xs text-muted-foreground">Exam Date</div>
                </div>
                
                <div className="bg-muted/50 p-2 rounded-lg">
                  <CheckCircle className="h-4 w-4 mx-auto text-green-500 mb-1" />
                  <div className="font-bold">{conceptsCovered}/{totalConcepts}</div>
                  <div className="text-xs text-muted-foreground">Concepts</div>
                </div>
                
                <div className="bg-muted/50 p-2 rounded-lg">
                  <Brain className="h-4 w-4 mx-auto text-amber-500 mb-1" />
                  <div className="font-bold">{userPace}</div>
                  <div className="text-xs text-muted-foreground">Study Pace</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <h3 className="text-sm font-medium">Based on your readiness score</h3>
              </div>
              <ul className="space-y-1.5 text-sm pl-4">
                {readinessTips.map((tip, index) => (
                  <li key={`readiness-${index}`} className="list-disc text-sm text-muted-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator className="my-2" />
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <h3 className="text-sm font-medium">Based on time remaining</h3>
              </div>
              <ul className="space-y-1.5 text-sm pl-4">
                {timeSuggestions.map((tip, index) => (
                  <li key={`time-${index}`} className="list-disc text-sm text-muted-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="text-sm font-medium">Exam Preparation Timeline</div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 dark:bg-green-900 dark:text-green-300">
                        Started
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200 dark:bg-red-900 dark:text-red-300">
                        Exam Day
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200 dark:bg-gray-800">
                    <div
                      style={{ width: `${100 - (daysRemaining / 90) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>90 days ago</span>
                    <span className="font-medium">{daysRemaining} days left</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Syllabus Completion</span>
                  <span className="font-semibold">{Math.round((conceptsCovered / totalConcepts) * 100)}%</span>
                </div>
                <Progress value={(conceptsCovered / totalConcepts) * 100} className="h-2" />
                
                <div className="flex justify-between text-sm mt-2">
                  <span>Practice Tests</span>
                  <span className="font-semibold">{practiceTestsCompleted}/30</span>
                </div>
                <Progress value={(practiceTestsCompleted / 30) * 100} className="h-2" />
                
                <div className="flex justify-between text-sm mt-2">
                  <span>Revision Cycles</span>
                  <span className="font-semibold">2/3</span>
                </div>
                <Progress value={66.7} className="h-2" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
