
import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { CalendarDays, Clock, BookOpen, FileText, Brain, Target, TrendingUp, Lightbulb, Star } from 'lucide-react';
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
    { name: 'Concepts', value: conceptCards * 15 },
    { name: 'Flashcards', value: flashcards * 5 },
    { name: 'Practice Tests', value: practiceExams * 40 }
  ];
  
  const COLORS = ['#8B5CF6', '#EC4899', '#F59E0B'];
  
  const totalTimeMinutes = timeData.reduce((sum, item) => sum + item.value, 0);
  const totalTimeHours = Math.round(totalTimeMinutes / 60);

  // Enhanced topic breakdown data
  const topicBreakdown = [
    { subject: 'Physics', topics: 15, weightage: 35, difficulty: 'High', completed: 8 },
    { subject: 'Chemistry', topics: 12, weightage: 30, difficulty: 'Medium', completed: 7 },
    { subject: 'Biology', topics: 18, weightage: 35, difficulty: 'Medium', completed: 12 }
  ];

  // Daily smart suggestions
  const dailySuggestions = [
    {
      id: 1,
      type: 'focus',
      title: 'High-Priority Topic',
      description: 'Focus on Thermodynamics today - it\'s frequently tested',
      icon: Target,
      priority: 'high'
    },
    {
      id: 2,
      type: 'revision',
      title: 'Quick Revision',
      description: 'Review Organic Chemistry concepts from last week',
      icon: Brain,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'practice',
      title: 'Practice Test',
      description: 'Take a 30-minute mock test on Mathematics',
      icon: FileText,
      priority: 'medium'
    }
  ];
  
  return (
    <div className="p-6 space-y-8">
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

      {/* Enhanced Progress Section */}
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

      {/* Enhanced Topic Breakdown Section */}
      <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Subject-wise Topic & Weightage Breakdown
          </h3>
          
          <div className="space-y-4">
            {topicBreakdown.map((subject, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-lg">{subject.subject}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {subject.topics} topics
                      </span>
                      <Badge variant="outline" className={
                        subject.difficulty === 'High' ? 'border-red-200 text-red-700' :
                        subject.difficulty === 'Medium' ? 'border-amber-200 text-amber-700' :
                        'border-green-200 text-green-700'
                      }>
                        {subject.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{subject.weightage}%</div>
                    <div className="text-sm text-gray-500">exam weightage</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Progress: {subject.completed}/{subject.topics} topics</span>
                  <span className="text-sm font-medium">{Math.round((subject.completed / subject.topics) * 100)}%</span>
                </div>
                <Progress 
                  value={(subject.completed / subject.topics) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Smart Suggestions Section */}
      <Card className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-green-600" />
            Today's Smart Suggestions
          </h3>
          
          <div className="grid gap-4 md:grid-cols-3">
            {dailySuggestions.map((suggestion) => {
              const IconComponent = suggestion.icon;
              return (
                <div key={suggestion.id} className={`bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 ${
                  suggestion.priority === 'high' ? 'border-red-400' :
                  suggestion.priority === 'medium' ? 'border-amber-400' :
                  'border-green-400'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      suggestion.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                      suggestion.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30' :
                      'bg-green-100 dark:bg-green-900/30'
                    }`}>
                      <IconComponent className={`h-4 w-4 ${
                        suggestion.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                        suggestion.priority === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                        'text-green-600 dark:text-green-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {suggestion.description}
                      </p>
                      <Button size="sm" variant="outline" className="h-6 text-xs">
                        Start Now
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyPlanVisualizer;
