
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Target, CheckCircle2, AlertCircle, TrendingUp, Brain, Zap, Users, Calendar } from "lucide-react";

interface TaskItem {
  id: string;
  title: string;
  subject: string;
  duration: number;
  type: 'study' | 'practice' | 'revision' | 'test';
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface NewTodaysPlanViewProps {
  className?: string;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ className = "" }) => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      duration: 45,
      type: 'study',
      completed: true,
      priority: 'high',
      difficulty: 'medium'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      duration: 60,
      type: 'practice',
      completed: true,
      priority: 'high',
      difficulty: 'hard'
    },
    {
      id: '3',
      title: 'Quadratic Equations Practice',
      subject: 'Mathematics',
      duration: 30,
      type: 'practice',
      completed: false,
      priority: 'medium',
      difficulty: 'medium'
    },
    {
      id: '4',
      title: 'Cell Biology Revision',
      subject: 'Biology',
      duration: 40,
      type: 'revision',
      completed: false,
      priority: 'medium',
      difficulty: 'easy'
    },
    {
      id: '5',
      title: 'Mock Test - Physics',
      subject: 'Physics',
      duration: 90,
      type: 'test',
      completed: false,
      priority: 'high',
      difficulty: 'hard'
    }
  ]);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;
  const totalDuration = tasks.reduce((acc, task) => acc + task.duration, 0);
  const completedDuration = tasks.filter(task => task.completed).reduce((acc, task) => acc + task.duration, 0);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'study': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'revision': return <TrendingUp className="h-4 w-4" />;
      case 'test': return <AlertCircle className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Smart suggestions based on current progress and tasks
  const getSmartSuggestions = () => {
    const pendingTasks = tasks.filter(task => !task.completed);
    const currentHour = new Date().getHours();
    const suggestions = [];

    if (progressPercentage < 50 && currentHour < 14) {
      suggestions.push({
        icon: <Zap className="h-4 w-4 text-yellow-500" />,
        text: "Focus on high-priority tasks first to maximize your progress",
        action: "Tackle High Priority"
      });
    }

    if (pendingTasks.some(task => task.type === 'test')) {
      suggestions.push({
        icon: <Target className="h-4 w-4 text-red-500" />,
        text: "Complete practice sessions before taking the mock test",
        action: "Practice First"
      });
    }

    if (progressPercentage > 60) {
      suggestions.push({
        icon: <TrendingUp className="h-4 w-4 text-green-500" />,
        text: "Great progress! Consider taking a short break to maintain focus",
        action: "Take Smart Break"
      });
    }

    if (currentHour > 16 && pendingTasks.length > 2) {
      suggestions.push({
        icon: <Clock className="h-4 w-4 text-orange-500" />,
        text: "Prioritize easier tasks for efficient evening study",
        action: "Easy Tasks First"
      });
    }

    return suggestions.length > 0 ? suggestions : [{
      icon: <Brain className="h-4 w-4 text-blue-500" />,
      text: "Use active recall techniques to improve retention",
      action: "Use Active Recall"
    }];
  };

  const smartSuggestions = getSmartSuggestions();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Title - Only Once */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Today's Plan</h2>
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
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Progress Overview</CardTitle>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {completedTasks}/{totalTasks} tasks completed
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {completedDuration}/{totalDuration} minutes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {completedTasks} completed
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {smartSuggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              >
                <div className="flex items-start gap-3">
                  {suggestion.icon}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                      {suggestion.text}
                    </p>
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  task.completed 
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                    : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-900 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                    
                    <div className="flex items-center gap-2">
                      {getTaskIcon(task.type)}
                      <div>
                        <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{task.subject}</span>
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium">{task.duration} min</div>
                    <div className="text-xs text-gray-500 capitalize">{task.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTodaysPlanView;
