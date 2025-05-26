
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Brain, 
  Award,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Play,
  RotateCcw
} from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';

const PremiumTodaysPlan: React.FC = () => {
  const navigate = useNavigate();
  
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const studyData = {
    totalTime: "4 hours 30 min",
    completed: 65,
    remaining: "1 hour 35 min",
    streak: 12,
    tasks: [
      {
        id: 1,
        title: "Organic Chemistry - Reaction Mechanisms",
        subject: "Chemistry",
        type: "concept",
        duration: 45,
        priority: "high",
        completed: false,
        difficulty: "hard",
        aiSuggestion: "Focus on electron movement patterns"
      },
      {
        id: 2,
        title: "Kinematics Practice Problems",
        subject: "Physics",
        type: "practice",
        duration: 30,
        priority: "medium",
        completed: true,
        difficulty: "medium",
        aiSuggestion: null
      },
      {
        id: 3,
        title: "Calculus Integration Flashcards",
        subject: "Mathematics",
        type: "flashcard",
        duration: 20,
        priority: "medium",
        completed: false,
        difficulty: "medium",
        aiSuggestion: "Quick review before moving to advanced topics"
      },
      {
        id: 4,
        title: "Cell Biology Revision",
        subject: "Biology",
        type: "revision",
        duration: 25,
        priority: "low",
        completed: false,
        difficulty: "easy",
        aiSuggestion: "Perfect for your current energy level"
      }
    ],
    smartSuggestions: [
      {
        type: "focus",
        title: "Take a 10-minute break",
        description: "You've been studying for 2 hours. A short break will improve focus.",
        icon: <RotateCcw className="h-4 w-4" />,
        action: "break"
      },
      {
        type: "strategy",
        title: "Switch to visual learning",
        description: "Try concept maps for better retention in Chemistry.",
        icon: <Brain className="h-4 w-4" />,
        action: "visual"
      },
      {
        type: "motivation",
        title: "You're on fire! 🔥",
        description: "12-day study streak. Keep the momentum going!",
        icon: <Award className="h-4 w-4" />,
        action: "celebrate"
      }
    ]
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'revision': return <RotateCcw className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-300 bg-red-50 text-red-700';
      case 'medium': return 'border-orange-300 bg-orange-50 text-orange-700';
      case 'low': return 'border-green-300 bg-green-50 text-green-700';
      default: return 'border-gray-300 bg-gray-50 text-gray-700';
    }
  };

  const handleTaskClick = (task: any) => {
    if (task.type === 'concept') {
      navigate('/dashboard/student/concepts');
    } else if (task.type === 'flashcard') {
      navigate('/dashboard/student/flashcards');
    } else if (task.type === 'practice') {
      navigate('/dashboard/student/practice-exam');
    }
  };

  return (
    <SharedPageLayout
      title="Today's Study Plan"
      subtitle="Your AI-powered daily roadmap to success"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {today} • Day {studyData.streak} of your study streak
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Let's ace today's goals! 🎯
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your personalized study plan adapts to your mood, energy, and progress. 
            Smart suggestions keep you motivated and efficient.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Daily Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{studyData.completed}%</div>
                  <div className="text-sm text-gray-600">Completed</div>
                  <Progress value={studyData.completed} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{studyData.totalTime}</div>
                  <div className="text-sm text-gray-600">Total Planned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{studyData.remaining}</div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{studyData.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Smart Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI Smart Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {studyData.smartSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
                        {suggestion.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Study Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Today's Study Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyData.tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => handleTaskClick(task)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      task.completed ? 'bg-green-50 border-green-200 opacity-75' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-2 rounded-full ${
                          task.completed 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {task.completed ? <CheckCircle className="h-4 w-4" /> : getTaskIcon(task.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {task.subject}
                            </Badge>
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {task.duration} min
                            </div>
                            <div className="capitalize">{task.difficulty}</div>
                          </div>
                          
                          {task.aiSuggestion && (
                            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                              <div className="flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                AI Tip: {task.aiSuggestion}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {!task.completed && (
                        <Button size="sm" className="ml-4">
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Voice Assistant */}
      <FloatingVoiceButton 
        userName="Student"
        language="en-US"
        onNavigationCommand={(route) => navigate(route)}
      />
    </SharedPageLayout>
  );
};

export default PremiumTodaysPlan;
