
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
  
  // More detailed tips and suggestions
  const readinessTips = [
    {
      id: 1,
      title: "Master Weak Areas",
      description: "Focus on your weakest subjects first. Schedule extra review sessions for topics with low understanding.",
      icon: <AlertTriangle className="h-4 w-4 text-orange-500" />,
      action: "Review weak areas"
    },
    {
      id: 2,
      title: "Timed Practice Tests",
      description: "Take full-length practice tests under timed conditions to build exam stamina and identify knowledge gaps.",
      icon: <Clock className="h-4 w-4 text-blue-500" />,
      action: "Take practice test"
    },
    {
      id: 3,
      title: "Create Visual Aids",
      description: "Convert complex concepts into diagrams, flowcharts, or mind maps to improve recall during the exam.",
      icon: <Book className="h-4 w-4 text-green-500" />,
      action: "Create study notes"
    },
    {
      id: 4,
      title: "Teach to Learn",
      description: "Explain difficult concepts to someone else or even to yourself. Teaching solidifies understanding.",
      icon: <Lightbulb className="h-4 w-4 text-amber-500" />,
      action: "Practice teaching"
    },
    {
      id: 5,
      title: "Spaced Repetition",
      description: "Review material at increasing intervals over time to enhance long-term retention and recall.",
      icon: <Calendar className="h-4 w-4 text-purple-500" />,
      action: "Schedule reviews" 
    },
    {
      id: 6,
      title: "Active Recall Practice",
      description: "Test yourself regularly instead of just re-reading. Active recall strengthens memory pathways.",
      icon: <Brain className="h-4 w-4 text-indigo-500" />,
      action: "Self-test"
    },
    {
      id: 7,
      title: "Power of Sleep",
      description: "Ensure 7-8 hours of quality sleep, especially before exams. Sleep consolidates memory and improves focus.",
      icon: <Zap className="h-4 w-4 text-yellow-500" />,
      action: "Optimize sleep"
    }
  ];
  
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader className="pb-2 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-lg">Exam Readiness Score</CardTitle>
          </div>
          
          <div className="flex items-center gap-2">
            {score >= 70 ? (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                <span>On Track</span>
              </Badge>
            ) : score >= 50 ? (
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                <span>Needs Focus</span>
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                <span>Requires Attention</span>
              </Badge>
            )}
            
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-full">
                    <Info className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs max-w-xs">
                    Your Exam Readiness Score combines your quiz results, concept mastery, 
                    and practice exam performance to gauge your preparedness.
                  </p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
        </div>
        <CardDescription>
          Track your exam preparation progress and identify improvement areas
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main score section */}
          <div className="md:col-span-4 flex flex-col">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4 text-center">
              <div className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-1">{score}%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Current Readiness</div>
              
              {previousScore && (
                <div className="mt-2 flex items-center justify-center">
                  {scoreDiff > 0 ? (
                    <div className="flex items-center text-green-600 dark:text-green-400 font-medium text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+{scoreDiff}% from last assessment</span>
                    </div>
                  ) : scoreDiff < 0 ? (
                    <div className="flex items-center text-red-600 dark:text-red-400 font-medium text-sm">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      <span>{scoreDiff}% from last assessment</span>
                    </div>
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      No change from last assessment
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
                Expert Study Tips
              </h3>
              
              <div className="space-y-3">
                {readinessTips.slice(0, 2).map(tip => (
                  <div key={tip.id} className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                    <div className="flex items-start gap-2">
                      {tip.icon}
                      <div>
                        <h4 className="text-xs font-medium">{tip.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Collapsible open={showDetails} onOpenChange={setShowDetails}>
                  <CollapsibleContent className="space-y-3">
                    {readinessTips.slice(2).map(tip => (
                      <div key={tip.id} className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                        <div className="flex items-start gap-2">
                          {tip.icon}
                          <div>
                            <h4 className="text-xs font-medium">{tip.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tip.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                  
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full mt-2 h-7 text-xs">
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
          
          {/* Chart and progress section */}
          <div className="md:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-medium mb-3">Progress Trend</h3>
              
              {/* Responsive chart for weekly trends */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyTrends}
                    margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Readiness']}
                      labelFormatter={(label) => `Week ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8884d8"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      name="Readiness Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Weak and strong areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                  <h4 className="text-xs font-medium text-red-700 dark:text-red-400 mb-2">Areas to Improve</h4>
                  <div className="flex flex-wrap gap-1">
                    {weakAreas.map((area, i) => (
                      <Badge key={i} variant="outline" className="bg-white/80 dark:bg-gray-800/50 text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2">
                    <Link to="/dashboard/student/concepts">
                      <Button variant="ghost" size="sm" className="h-6 text-xs w-full">
                        Review Weak Concepts
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <h4 className="text-xs font-medium text-green-700 dark:text-green-400 mb-2">Strong Areas</h4>
                  <div className="flex flex-wrap gap-1">
                    {strongAreas.map((area, i) => (
                      <Badge key={i} variant="outline" className="bg-white/80 dark:bg-gray-800/50 text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2">
                    <Link to="/dashboard/student/practice-exam">
                      <Button variant="ghost" size="sm" className="h-6 text-xs w-full">
                        Take Practice Test
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-3 flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: Today
        </span>
        
        <div className="flex gap-2">
          <Link to="/dashboard/student/academic">
            <Button variant="outline" size="sm" className="h-7 text-xs">View Academic Report</Button>
          </Link>
          <Link to="/dashboard/student/today">
            <Button size="sm" className="h-7 text-xs">Today's Plan</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExamReadinessSection;
