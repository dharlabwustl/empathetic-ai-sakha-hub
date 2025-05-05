
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { CalendarDays, Clock, BookOpen, FileText, Brain } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StudyPlanVisualizerProps {
  examGoal: string;
  progressPercentage: number;
  daysLeft: number;
  totalSubjects: number;
  conceptCards: number;
  flashcards: number;
  practiceExams: number;
  studyHoursPerDay: number;
  focusArea: string;
}

const StudyPlanVisualizer: React.FC<StudyPlanVisualizerProps> = ({
  examGoal,
  progressPercentage,
  daysLeft,
  totalSubjects,
  conceptCards,
  flashcards,
  practiceExams,
  studyHoursPerDay,
  focusArea
}) => {
  const timeData = [
    { name: 'Concepts', value: conceptCards * 15 }, // Assuming 15 min per concept card
    { name: 'Flashcards', value: flashcards * 5 },  // Assuming 5 min per flashcard
    { name: 'Practice Tests', value: practiceExams * 40 }  // Assuming 40 min per practice exam
  ];
  
  const COLORS = ['#8B5CF6', '#EC4899', '#F59E0B']; // Purple, Pink, Amber
  
  const totalTimeMinutes = timeData.reduce((sum, item) => sum + item.value, 0);
  const totalTimeHours = Math.round(totalTimeMinutes / 60);
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <CardTitle className="text-xl flex items-center">
          <span>Study Plan Overview</span>
          <Badge className="ml-3 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            {examGoal}
          </Badge>
        </CardTitle>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                View Full Plan
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See all details of your current study plan</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Overall Progress</h3>
              <span className="text-sm font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <CalendarDays className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-sm text-muted-foreground">Days Left</div>
                      <div className="font-bold">{daysLeft}</div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Days remaining until your exam</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <Clock className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="text-sm text-muted-foreground">Daily Hours</div>
                      <div className="font-bold">{studyHoursPerDay}</div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Recommended hours of study per day</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <BookOpen className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                    <div>
                      <div className="text-sm text-muted-foreground">Total Subjects</div>
                      <div className="font-bold">{totalSubjects}</div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of subjects in your study plan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center p-4 bg-violet-50 dark:bg-violet-900/20 rounded-md">
                    <Brain className="h-5 w-5 mr-3 text-violet-600 dark:text-violet-400" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">Focus Area</div>
                      <div className="font-bold truncate">{focusArea}</div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your priority focus area based on proficiency</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3 text-center">Content Distribution</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {timeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => [`${value} min`]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 dark:bg-gray-800 rounded-md p-4 mt-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <div className="text-sm text-muted-foreground">Concept Cards</div>
                    <div className="font-bold text-purple-600 dark:text-purple-400">{conceptCards}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total concept cards to study</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <div className="text-sm text-muted-foreground">Flashcards</div>
                    <div className="font-bold text-pink-600 dark:text-pink-400">{flashcards}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total flashcards to review</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <div className="text-sm text-muted-foreground">Practice Exams</div>
                    <div className="font-bold text-amber-600 dark:text-amber-400">{practiceExams}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total practice exams to complete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="col-span-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-muted-foreground">Estimated Total Study Time</div>
              <div className="font-bold">{totalTimeHours} hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanVisualizer;
