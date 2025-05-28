
import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { CalendarDays, Clock, BookOpen, FileText, Brain, ChevronDown, ChevronUp, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  // Enhanced subject data with topic breakdown and weightage
  const subjectBreakdown = [
    {
      name: 'Mathematics',
      weightage: 35,
      progress: 78,
      topics: [
        { name: 'Algebra', weightage: 40, completed: 85, difficulty: 'Medium' },
        { name: 'Calculus', weightage: 35, completed: 70, difficulty: 'High' },
        { name: 'Geometry', weightage: 25, completed: 80, difficulty: 'Low' }
      ]
    },
    {
      name: 'Physics',
      weightage: 30,
      progress: 65,
      topics: [
        { name: 'Mechanics', weightage: 45, completed: 75, difficulty: 'Medium' },
        { name: 'Thermodynamics', weightage: 30, completed: 55, difficulty: 'High' },
        { name: 'Optics', weightage: 25, completed: 70, difficulty: 'Medium' }
      ]
    },
    {
      name: 'Chemistry',
      weightage: 25,
      progress: 72,
      topics: [
        { name: 'Organic Chemistry', weightage: 50, completed: 65, difficulty: 'High' },
        { name: 'Inorganic Chemistry', weightage: 30, completed: 80, difficulty: 'Medium' },
        { name: 'Physical Chemistry', weightage: 20, completed: 75, difficulty: 'Medium' }
      ]
    },
    {
      name: 'Biology',
      weightage: 10,
      progress: 88,
      topics: [
        { name: 'Cell Biology', weightage: 40, completed: 90, difficulty: 'Low' },
        { name: 'Genetics', weightage: 35, completed: 85, difficulty: 'Medium' },
        { name: 'Ecology', weightage: 25, completed: 90, difficulty: 'Low' }
      ]
    }
  ];

  // Daily smart suggestions based on performance and upcoming deadlines
  const dailySmartSuggestions = [
    {
      type: 'priority',
      icon: <Target className="h-4 w-4 text-red-500" />,
      title: 'Focus on Thermodynamics',
      description: 'Your weakest topic in Physics. Dedicate 45 minutes today.',
      urgency: 'high'
    },
    {
      type: 'review',
      icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      title: 'Quick Algebra Review',
      description: 'Strengthen your strong areas. 20-minute revision session recommended.',
      urgency: 'medium'
    },
    {
      type: 'practice',
      icon: <Brain className="h-4 w-4 text-purple-500" />,
      title: 'Organic Chemistry Practice',
      description: 'Take 2 practice tests to improve problem-solving speed.',
      urgency: 'medium'
    },
    {
      type: 'break',
      icon: <Lightbulb className="h-4 w-4 text-green-500" />,
      title: 'Take a Strategic Break',
      description: 'Your study intensity is optimal. Include a 15-minute mindfulness break.',
      urgency: 'low'
    }
  ];

  const timeData = [
    { name: 'Concepts', value: conceptCards * 15 },
    { name: 'Flashcards', value: flashcards * 5 },
    { name: 'Practice Tests', value: practiceExams * 40 }
  ];
  
  const COLORS = ['#8B5CF6', '#EC4899', '#F59E0B'];
  
  const totalTimeMinutes = timeData.reduce((sum, item) => sum + item.value, 0);
  const totalTimeHours = Math.round(totalTimeMinutes / 60);

  const toggleSubjectExpansion = (subjectName: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subjectName) 
        ? prev.filter(s => s !== subjectName)
        : [...prev, subjectName]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'High': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'Low': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10';
      case 'low': return 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10';
      default: return 'border-l-gray-500 bg-gray-50/50 dark:bg-gray-900/10';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <CardTitle className="text-xl flex items-center">
          <span>Study Plan Overview</span>
          <Badge className="ml-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            {examGoal}
          </Badge>
        </CardTitle>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:shadow-lg">
                View Full Plan
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See all details of your current study plan</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Overall Progress</h3>
              <span className="text-sm font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-gray-200 dark:bg-gray-700">
              <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all" />
            </Progress>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg shadow-sm">
                    <CalendarDays className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-sm text-muted-foreground">Days Left</div>
                      <div className="font-bold text-lg">{daysLeft}</div>
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
                  <div className="flex items-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg shadow-sm">
                    <Clock className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="text-sm text-muted-foreground">Daily Hours</div>
                      <div className="font-bold text-lg">{studyHoursPerDay}</div>
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
                  <div className="flex items-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-sm">
                    <BookOpen className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                    <div>
                      <div className="text-sm text-muted-foreground">Total Subjects</div>
                      <div className="font-bold text-lg">{totalSubjects}</div>
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
                  <div className="flex items-center p-4 bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 rounded-lg shadow-sm">
                    <Brain className="h-5 w-5 mr-3 text-violet-600 dark:text-violet-400" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">Focus Area</div>
                      <div className="font-bold text-sm truncate">{focusArea}</div>
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
          
          <div className="grid grid-cols-3 gap-2 text-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 mt-2 shadow-sm">
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
            
            <div className="col-span-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <div className="text-sm text-muted-foreground">Estimated Total Study Time</div>
              <div className="font-bold text-lg">{totalTimeHours} hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Subject Breakdown with Topics */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
          Subject-wise Breakdown
        </h3>
        <div className="grid gap-4">
          {subjectBreakdown.map((subject, index) => (
            <Card key={subject.name} className="bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <Collapsible>
                  <CollapsibleTrigger
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSubjectExpansion(subject.name)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-lg">{subject.name}</h4>
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                          {subject.weightage}% weightage
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Progress</div>
                        <div className="font-bold text-lg">{subject.progress}%</div>
                      </div>
                      {expandedSubjects.includes(subject.name) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <div className="mt-2">
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <CollapsibleContent className="mt-4">
                    <div className="grid gap-3">
                      {subject.topics.map((topic, topicIndex) => (
                        <div key={topic.name} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <div className="font-medium">{topic.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {topic.weightage}% of {subject.name}
                              </div>
                            </div>
                            <Badge className={`text-xs ${getDifficultyColor(topic.difficulty)}`}>
                              {topic.difficulty}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{topic.completed}%</div>
                            <div className="w-20">
                              <Progress value={topic.completed} className="h-1" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Smart Suggestions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
          Today's Smart Suggestions
        </h3>
        <div className="grid gap-3">
          {dailySmartSuggestions.map((suggestion, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${getUrgencyColor(suggestion.urgency)} shadow-sm hover:shadow-md transition-all`}>
              <div className="flex items-start space-x-3">
                {suggestion.icon}
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {suggestion.urgency} priority
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanVisualizer;
