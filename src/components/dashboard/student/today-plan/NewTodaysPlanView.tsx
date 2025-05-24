
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Calendar, Target, BookOpen, Trophy, Play, Pause, RotateCcw, Brain, Zap, AlertTriangle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const NewTodaysPlanView = () => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [activeTimer, setActiveTimer] = useState<string | null>(null);

  const todaysTasks = [
    {
      id: '1',
      title: 'Physics - Motion in a Straight Line',
      type: 'concept',
      duration: '45 mins',
      priority: 'high',
      description: 'Study displacement, velocity, and acceleration concepts',
      estimatedTime: 45
    },
    {
      id: '2',
      title: 'Mathematics - Trigonometry Practice',
      type: 'practice',
      duration: '30 mins',
      priority: 'medium',
      description: 'Solve 20 trigonometric problems',
      estimatedTime: 30
    },
    {
      id: '3',
      title: 'Chemistry - Atomic Structure Review',
      type: 'revision',
      duration: '25 mins',
      priority: 'medium',
      description: 'Review electron configuration and periodic trends',
      estimatedTime: 25
    },
    {
      id: '4',
      title: 'Mock Test - Physics Chapter 2',
      type: 'test',
      duration: '60 mins',
      priority: 'high',
      description: 'Complete practice test on kinematics',
      estimatedTime: 60
    }
  ];

  const totalTasks = todaysTasks.length;
  const completedCount = completedTasks.size;
  const progressPercentage = (completedCount / totalTasks) * 100;
  const totalEstimatedTime = todaysTasks.reduce((sum, task) => sum + task.estimatedTime, 0);
  const completedTime = todaysTasks
    .filter(task => completedTasks.has(task.id))
    .reduce((sum, task) => sum + task.estimatedTime, 0);

  const handleTaskToggle = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (completedTasks.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const handleStartTimer = (taskId: string) => {
    setActiveTimer(activeTimer === taskId ? null : taskId);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'revision': return <RotateCcw className="h-4 w-4" />;
      case 'test': return <Trophy className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  // Smart suggestions for task completion
  const getSmartSuggestions = () => {
    const currentHour = new Date().getHours();
    const remainingTasks = todaysTasks.filter(task => !completedTasks.has(task.id));
    const suggestions = [];

    if (currentHour < 12 && remainingTasks.some(task => task.type === 'concept')) {
      suggestions.push({
        icon: <Brain className="h-4 w-4 text-blue-500" />,
        text: "Start with concept learning - your brain is fresh in the morning",
        action: "Begin Concepts",
        priority: "high"
      });
    }

    if (currentHour > 14 && remainingTasks.some(task => task.type === 'practice')) {
      suggestions.push({
        icon: <Target className="h-4 w-4 text-green-500" />,
        text: "Perfect time for practice problems - apply what you've learned",
        action: "Start Practice",
        priority: "medium"
      });
    }

    if (completedCount > 0 && completedCount < totalTasks) {
      suggestions.push({
        icon: <Zap className="h-4 w-4 text-yellow-500" />,
        text: "Great progress! Take a 5-minute break before continuing",
        action: "Take Break",
        priority: "medium"
      });
    }

    if (completedCount === 0 && currentHour > 10) {
      suggestions.push({
        icon: <AlertTriangle className="h-4 w-4 text-orange-500" />,
        text: "Let's get started! Begin with the highest priority task",
        action: "Start Now",
        priority: "high"
      });
    }

    return suggestions;
  };

  const smartSuggestions = getSmartSuggestions();

  return (
    <div className="space-y-6">
      {/* Single Main Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          Today's Plan
        </h1>
        <Badge variant="outline" className="text-sm">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}
        </Badge>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Progress Overview</CardTitle>
            <div className="text-sm text-muted-foreground">
              {completedCount}/{totalTasks} tasks • {completedTime}/{totalEstimatedTime} mins
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions for Task Completion */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {smartSuggestions.map((suggestion, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  suggestion.priority === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                  suggestion.priority === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                  'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  {suggestion.icon}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                      {suggestion.text}
                    </p>
                    <Button size="sm" variant="outline" className="text-xs">
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Today's Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaysTasks.map((task) => {
              const isCompleted = completedTasks.has(task.id);
              const isActive = activeTimer === task.id;
              
              return (
                <div
                  key={task.id}
                  className={`p-4 border rounded-lg transition-all ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleTaskToggle(task.id)}
                      className={`mt-1 transition-colors ${
                        isCompleted 
                          ? 'text-green-600' 
                          : 'text-gray-400 hover:text-blue-600'
                      }`}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getTaskIcon(task.type)}
                        <h3 className={`font-medium ${
                          isCompleted ? 'line-through text-gray-500' : ''
                        }`}>
                          {task.title}
                        </h3>
                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                      
                      <p className={`text-sm text-gray-600 dark:text-gray-400 mb-2 ${
                        isCompleted ? 'line-through' : ''
                      }`}>
                        {task.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.duration}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {task.type}
                        </Badge>
                      </div>
                    </div>
                    
                    {!isCompleted && (
                      <Button
                        size="sm"
                        variant={isActive ? "default" : "outline"}
                        onClick={() => handleStartTimer(task.id)}
                        className="ml-2"
                      >
                        {isActive ? (
                          <><Pause className="h-3 w-3 mr-1" /> Pause</>
                        ) : (
                          <><Play className="h-3 w-3 mr-1" /> Start</>
                        )}
                      </Button>
                    )}
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

export default NewTodaysPlanView;
