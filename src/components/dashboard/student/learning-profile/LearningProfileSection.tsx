
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { InfoCircle, Book, Award, Brain, Lightbulb, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { UserProfileType } from '@/types/user/base';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LearningProfileSectionProps {
  userProfile: UserProfileType;
}

const LearningProfileSection: React.FC<LearningProfileSectionProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  
  // Learning metrics
  const examReadinessScore = 72; // Out of 100%
  const conceptsMastered = 85; // Out of total concepts
  const totalConcepts = 120;
  const practiceTestsCompleted = 24;
  const studyHoursWeek = 18;
  const retentionScore = 76; // percentage
  
  // Get appropriate color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  // Get appropriate background based on score
  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/40';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/40';
    return 'bg-red-100 dark:bg-red-900/40';
  };
  
  // Get suggestions based on exam readiness
  const getReadinessSuggestions = (score: number) => {
    if (score >= 80) {
      return [
        "Focus on maintaining your high readiness level",
        "Challenge yourself with advanced practice tests",
        "Help peers by explaining difficult concepts to reinforce your knowledge",
        "Take timed mock exams to improve speed and accuracy"
      ];
    }
    if (score >= 60) {
      return [
        "Increase revision time for weaker topics",
        "Try more practice questions to build confidence",
        "Review the concepts you found difficult in recent practice tests",
        "Consider creating summary notes for quick revision"
      ];
    }
    return [
      "Focus on mastering core concepts before advancing",
      "Double your practice test frequency",
      "Schedule more 1-on-1 sessions with tutors",
      "Create a structured daily study schedule",
      "Use flashcards to improve retention"
    ];
  };
  
  // Get icon based on readiness level
  const getReadinessIcon = (score: number) => {
    if (score >= 80) return <Award className="h-7 w-7 text-green-500" />;
    if (score >= 60) return <TrendingUp className="h-7 w-7 text-yellow-500" />;
    return <Book className="h-7 w-7 text-red-500" />;
  };
  
  const readinessSuggestions = getReadinessSuggestions(examReadinessScore);

  return (
    <Card className="shadow-sm dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Learning Profile</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <InfoCircle size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Your learning profile shows metrics that indicate your exam readiness and study progress.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <Tabs defaultValue="readiness" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-2">
            <TabsTrigger value="readiness">Exam Readiness</TabsTrigger>
            <TabsTrigger value="progress">Study Progress</TabsTrigger>
            <TabsTrigger value="suggestions">Tips & Advice</TabsTrigger>
          </TabsList>
          
          <TabsContent value="readiness">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className={`p-4 rounded-lg flex flex-col items-center justify-center flex-shrink-0 ${getScoreBg(examReadinessScore)} transition-all duration-300`}>
                  {getReadinessIcon(examReadinessScore)}
                  <div className={`mt-1 text-2xl font-bold ${getScoreColor(examReadinessScore)}`}>
                    {examReadinessScore}%
                  </div>
                  <div className="text-xs text-center font-medium uppercase">Exam Readiness</div>
                </div>
                
                <div className="flex-grow flex flex-col gap-2 w-full">
                  <div className="space-y-1 w-full">
                    <div className="flex justify-between text-sm">
                      <span>Concepts Mastered</span>
                      <span className="font-semibold">{conceptsMastered}/{totalConcepts}</span>
                    </div>
                    <Progress value={(conceptsMastered / totalConcepts) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-1 w-full">
                    <div className="flex justify-between text-sm">
                      <span>Practice Tests</span>
                      <span className="font-semibold">{practiceTestsCompleted}</span>
                    </div>
                    <Progress value={Math.min(practiceTestsCompleted / 30 * 100, 100)} className="h-2" />
                  </div>
                  
                  <div className="space-y-1 w-full">
                    <div className="flex justify-between text-sm">
                      <span>Retention Score</span>
                      <span className="font-semibold">{retentionScore}%</span>
                    </div>
                    <Progress value={retentionScore} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1 flex items-center">
                  <Brain className="h-4 w-4 mr-1" />
                  Weekly Study Activity
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex-grow bg-muted rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(studyHoursWeek/25*100, 100)}%` }}></div>
                  </div>
                  <span className="font-semibold text-xs">{studyHoursWeek} hrs</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="progress">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1 bg-muted/50 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Study Streak</div>
                  <div className="font-bold text-xl">5 days</div>
                  <div className="text-xs text-muted-foreground">Keep it up!</div>
                </div>
                
                <div className="flex flex-col space-y-1 bg-muted/50 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Questions Attempted</div>
                  <div className="font-bold text-xl">248</div>
                  <div className="text-xs text-muted-foreground">Last 30 days</div>
                </div>
                
                <div className="flex flex-col space-y-1 bg-muted/50 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Average Score</div>
                  <div className="font-bold text-xl">68%</div>
                  <div className="text-xs text-muted-foreground">Last 5 tests</div>
                </div>
                
                <div className="flex flex-col space-y-1 bg-muted/50 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Flashcards Reviewed</div>
                  <div className="font-bold text-xl">156</div>
                  <div className="text-xs text-muted-foreground">This week</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions" className="space-y-3">
            <div className="space-y-2">
              <div className="text-sm font-medium mb-1 flex items-center">
                <Lightbulb className="h-4 w-4 mr-1 text-yellow-500" />
                Study Tips & Suggestions
              </div>
              
              <ul className="space-y-2 text-sm">
                {readinessSuggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="rounded-full h-5 w-5 flex items-center justify-center bg-primary/10 text-primary text-xs flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs h-8"
                onClick={() => navigate('/dashboard/student/analytics')}
              >
                View Detailed Analytics
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LearningProfileSection;
