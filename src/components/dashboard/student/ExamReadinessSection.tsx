
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Book,
  Clock,
  Brain,
  Calendar,
  Zap
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

interface WeeklyTrendData {
  week: string;
  score: number;
}

interface SubjectProgress {
  subject: string;
  progress: number;
  recallMastery: number;
  predictedScore: number;
  color: string;
}

interface ExamReadinessSectionProps {
  score: number;
  previousScore?: number;
  weeklyTrends: WeeklyTrendData[];
  weakAreas: string[];
  strongAreas: string[];
}

const ExamReadinessSection: React.FC<ExamReadinessSectionProps> = ({
  score,
  previousScore,
  weeklyTrends,
  weakAreas,
  strongAreas
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const scoreDiff = previousScore ? score - previousScore : 0;
  
  // Subject-wise progress data
  const subjectProgress: SubjectProgress[] = [
    { subject: 'Physics', progress: 72, recallMastery: 68, predictedScore: 165, color: 'bg-blue-500' },
    { subject: 'Chemistry', progress: 78, recallMastery: 74, predictedScore: 158, color: 'bg-green-500' },
    { subject: 'Biology', progress: 92, recallMastery: 90, predictedScore: 175, color: 'bg-purple-500' }
  ];
  
  // Enhanced tips based on NEET preparation
  const readinessTips = [
    {
      id: 1,
      title: "Focus on Weak Concepts",
      description: "Prioritize Physics concepts - Thermodynamics and Mechanics need extra attention for NEET success.",
      icon: <AlertTriangle className="h-4 w-4 text-orange-500" />,
      action: "Start Physics Review"
    },
    {
      id: 2,
      title: "NEET Mock Tests",
      description: "Take full-length NEET mock tests daily to improve speed and accuracy under exam conditions.",
      icon: <Clock className="h-4 w-4 text-blue-500" />,
      action: "Take NEET Mock"
    },
    {
      id: 3,
      title: "Biology Advantage",
      description: "Your Biology is strong! Use this to boost overall NEET score - focus on advanced topics.",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      action: "Advanced Biology"
    },
    {
      id: 4,
      title: "Previous Year Analysis",
      description: "Analyze last 10 years NEET papers to identify high-frequency topics and question patterns.",
      icon: <Book className="h-4 w-4 text-purple-500" />,
      action: "Analyze Papers"
    }
  ];
  
  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20">
      <CardHeader className="pb-3 bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm">
              <Target className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">NEET 2026 Readiness Score</CardTitle>
              <CardDescription className="text-sm">Your comprehensive exam preparation analysis</CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {score >= 70 ? (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1 px-3 py-1">
                <CheckCircle className="h-3 w-3" />
                <span className="font-medium">Excellent Progress</span>
              </Badge>
            ) : score >= 50 ? (
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 flex items-center gap-1 px-3 py-1">
                <AlertTriangle className="h-3 w-3" />
                <span className="font-medium">Good Progress</span>
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 flex items-center gap-1 px-3 py-1">
                <AlertTriangle className="h-3 w-3" />
                <span className="font-medium">Needs Focus</span>
              </Badge>
            )}
            
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Info className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs max-w-xs">
                    AI-powered analysis combining concept mastery, practice scores, and NEET exam patterns
                  </p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main score section */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-4 text-center border border-gray-100 dark:border-gray-700">
              <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">{score}%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Overall Readiness</div>
              
              {previousScore && (
                <div className="flex items-center justify-center">
                  {scoreDiff > 0 ? (
                    <div className="flex items-center text-green-600 dark:text-green-400 font-medium text-sm bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+{scoreDiff}% improvement</span>
                    </div>
                  ) : scoreDiff < 0 ? (
                    <div className="flex items-center text-red-600 dark:text-red-400 font-medium text-sm bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      <span>{scoreDiff}% decline</span>
                    </div>
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full">
                      Stable performance
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
                NEET Success Tips
              </h3>
              
              <div className="space-y-3">
                {readinessTips.slice(0, 2).map(tip => (
                  <div key={tip.id} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-600">
                    <div className="flex items-start gap-2">
                      {tip.icon}
                      <div className="flex-1">
                        <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100">{tip.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{tip.description}</p>
                        <Button size="sm" variant="outline" className="mt-2 h-6 text-xs">
                          {tip.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Collapsible open={showDetails} onOpenChange={setShowDetails}>
                  <CollapsibleContent className="space-y-3">
                    {readinessTips.slice(2).map(tip => (
                      <div key={tip.id} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-600">
                        <div className="flex items-start gap-2">
                          {tip.icon}
                          <div className="flex-1">
                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100">{tip.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{tip.description}</p>
                            <Button size="sm" variant="outline" className="mt-2 h-6 text-xs">
                              {tip.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                  
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full mt-3 h-8 text-xs hover:bg-gray-100 dark:hover:bg-gray-700">
                      {showDetails ? (
                        <><ChevronDown className="h-3 w-3 mr-1" /> Show Less</>
                      ) : (
                        <><ChevronRight className="h-3 w-3 mr-1" /> View More Tips</>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              </div>
            </div>
          </div>
          
          {/* Subject-wise progress section */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Brain className="h-5 w-5 text-purple-600 mr-2" />
                Subject-wise Progress Analysis
              </h3>
              
              <div className="space-y-4">
                {subjectProgress.map((subject, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{subject.subject}</h4>
                      <Badge variant="outline" className="text-xs">
                        Target: {subject.predictedScore}/180
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Progress</span>
                          <span className="font-medium">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Recall Mastery</span>
                          <span className="font-medium">{subject.recallMastery}%</span>
                        </div>
                        <Progress value={subject.recallMastery} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Predicted Score</span>
                          <span className="font-medium text-green-600 dark:text-green-400">{subject.predictedScore}/180</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${subject.color}`}
                            style={{ width: `${(subject.predictedScore / 180) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Action buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <h4 className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">Priority Areas</h4>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {weakAreas.map((area, i) => (
                      <Badge key={i} variant="outline" className="bg-white/80 dark:bg-gray-800/50 text-xs border-red-200">
                        {area}
                      </Badge>
                    ))}
                  </div>
                  <Link to="/dashboard/student/concepts">
                    <Button variant="outline" size="sm" className="w-full h-7 text-xs border-red-200 hover:bg-red-50">
                      Focus on Weak Areas
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <h4 className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">Strong Subjects</h4>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {strongAreas.map((area, i) => (
                      <Badge key={i} variant="outline" className="bg-white/80 dark:bg-gray-800/50 text-xs border-green-200">
                        {area}
                      </Badge>
                    ))}
                  </div>
                  <Link to="/dashboard/student/practice-exam">
                    <Button variant="outline" size="sm" className="w-full h-7 text-xs border-green-200 hover:bg-green-50">
                      Advanced Practice
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: Today • Next assessment in 3 days
        </span>
        
        <div className="flex gap-2">
          <Link to="/dashboard/student/academic">
            <Button variant="outline" size="sm" className="h-8 text-xs">Detailed Analytics</Button>
          </Link>
          <Link to="/dashboard/student/today">
            <Button size="sm" className="h-8 text-xs bg-violet-600 hover:bg-violet-700">Today's Focus</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExamReadinessSection;
