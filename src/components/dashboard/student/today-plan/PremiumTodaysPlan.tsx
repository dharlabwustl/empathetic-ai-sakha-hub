
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
  RotateCcw,
  Zap,
  Star,
  Trophy,
  Lightbulb,
  Flame,
  ChevronRight,
  Timer,
  BarChart3
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
    completed: 68,
    remaining: "1 hour 25 min",
    streak: 23,
    examReadiness: 87,
    dailyTarget: 85,
    tasks: [
      {
        id: 1,
        title: "Organic Chemistry - Advanced Reaction Mechanisms",
        subject: "Chemistry",
        type: "concept",
        duration: 45,
        priority: "high",
        completed: false,
        difficulty: "hard",
        aiSuggestion: "Peak focus time - perfect for complex mechanisms",
        progress: 0,
        estimatedScore: "+15 points",
        techniques: ["3D Models", "Visual Diagrams", "Interactive Simulations"]
      },
      {
        id: 2,
        title: "Kinematics Problem Solving Master Class",
        subject: "Physics",
        type: "practice",
        duration: 35,
        priority: "high",
        completed: true,
        difficulty: "medium",
        aiSuggestion: null,
        progress: 100,
        estimatedScore: "+12 points",
        techniques: ["Formula Practice", "Step-by-step Solutions"]
      },
      {
        id: 3,
        title: "Calculus Integration - Spaced Repetition",
        subject: "Mathematics",
        type: "flashcard",
        duration: 20,
        priority: "medium",
        completed: false,
        difficulty: "medium",
        aiSuggestion: "Memory strength optimal for revision",
        progress: 0,
        estimatedScore: "+8 points",
        techniques: ["Interactive Cards", "Formula Visualization"]
      },
      {
        id: 4,
        title: "Cell Biology Comprehensive Review",
        subject: "Biology",
        type: "revision",
        duration: 30,
        priority: "medium",
        completed: false,
        difficulty: "easy",
        aiSuggestion: "Great for building confidence",
        progress: 0,
        estimatedScore: "+10 points",
        techniques: ["Video Lectures", "Summary Notes", "Quick Quiz"]
      }
    ],
    smartSuggestions: [
      {
        type: "boost",
        title: "🚀 Energy Boost Available",
        description: "You're performing 15% above average today! Time for a challenging topic.",
        icon: <Zap className="h-4 w-4" />,
        action: "boost",
        urgency: "high"
      },
      {
        type: "strategy",
        title: "🧠 Switch to Visual Learning",
        description: "Chemistry concepts stick better with 3D models. Try the molecular visualizer!",
        icon: <Brain className="h-4 w-4" />,
        action: "visual",
        urgency: "medium"
      },
      {
        type: "achievement",
        title: "🔥 23-Day Streak Champion",
        description: "You're in the top 5% of learners. Keep the momentum going!",
        icon: <Trophy className="h-4 w-4" />,
        action: "celebrate",
        urgency: "low"
      },
      {
        type: "adaptive",
        title: "⚡ Adaptive Plan Update",
        description: "Based on your mood and energy, we've optimized your schedule.",
        icon: <Target className="h-4 w-4" />,
        action: "adaptive",
        urgency: "medium"
      }
    ],
    weeklyGoals: {
      conceptsMastered: { current: 24, target: 30 },
      practiceTests: { current: 5, target: 7 },
      studyHours: { current: 28, target: 35 }
    },
    nextMilestone: {
      title: "Chemistry Mastery Badge",
      progress: 78,
      requirement: "Complete 5 more organic chemistry modules"
    }
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
      case 'high': return 'border-red-200 bg-gradient-to-r from-red-50 to-red-100 text-red-700';
      case 'medium': return 'border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700';
      case 'low': return 'border-green-200 bg-gradient-to-r from-green-50 to-green-100 text-green-700';
      default: return 'border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700';
    }
  };

  const getSuggestionStyle = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-200 bg-gradient-to-r from-red-50 to-pink-50';
      case 'medium': return 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50';
      case 'low': return 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50';
      default: return 'border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50';
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
      subtitle="Your AI-powered daily roadmap to NEET excellence"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Hero Header with Enhanced Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden"
        >
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full mb-3">
                    <Flame className="h-4 w-4 text-yellow-300" />
                    <span className="text-sm font-medium">
                      {today} • {studyData.streak} Day Streak 🔥
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Dominate Today's Goals! 🚀
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Your personalized plan adapts to your peak performance hours
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="text-right">
                    <div className="text-4xl font-bold">{studyData.examReadiness}%</div>
                    <div className="text-blue-200">Exam Ready</div>
                    <div className="flex items-center gap-1 text-green-300 text-sm mt-1">
                      <TrendingUp className="h-3 w-3" />
                      +5% from yesterday
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Overview Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold">{studyData.completed}%</div>
                  <div className="text-blue-200 text-sm">Completed</div>
                  <Progress value={studyData.completed} className="mt-2 bg-white/20" />
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold">{studyData.totalTime}</div>
                  <div className="text-blue-200 text-sm">Total Planned</div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold">{studyData.remaining}</div>
                  <div className="text-blue-200 text-sm">Remaining</div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold">{studyData.streak}</div>
                  <div className="text-blue-200 text-sm">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Smart AI Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Smart Suggestions
                <Badge variant="outline" className="ml-2">Live Updates</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {studyData.smartSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${getSuggestionStyle(suggestion.urgency)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
                        {suggestion.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {suggestion.description}
                        </p>
                        <Button size="sm" variant="outline" className="text-xs">
                          <ChevronRight className="h-3 w-3 ml-1" />
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Goals Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Weekly Goals Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(studyData.weeklyGoals).map(([key, goal]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm text-gray-600">{goal.current}/{goal.target}</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Study Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Today's Study Tasks
                <Badge variant="outline" className="ml-2">Multi-Technique Learning</Badge>
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
                    className={`p-5 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                      task.completed 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 opacity-90' 
                        : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-full ${
                          task.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        }`}>
                          {task.completed ? <CheckCircle className="h-4 w-4" /> : getTaskIcon(task.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {task.subject}
                            </Badge>
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                            {task.estimatedScore && (
                              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                                {task.estimatedScore}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Timer className="h-3 w-3" />
                              {task.duration} min
                            </div>
                            <div className="capitalize">{task.difficulty}</div>
                          </div>

                          {/* Learning Techniques */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-gray-700">Techniques:</span>
                            {task.techniques.map((technique, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                {technique}
                              </Badge>
                            ))}
                          </div>
                          
                          {task.aiSuggestion && (
                            <div className="mt-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Lightbulb className="h-4 w-4 text-yellow-600" />
                                <span className="text-sm font-medium text-yellow-800">AI Insight:</span>
                              </div>
                              <p className="text-sm text-yellow-700 mt-1">{task.aiSuggestion}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {!task.completed && (
                        <Button className="ml-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                          <Play className="h-4 w-4 mr-2" />
                          Start Learning
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Milestone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white">
                  <Award className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">Next Milestone: {studyData.nextMilestone.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{studyData.nextMilestone.requirement}</p>
                  <div className="flex items-center gap-3">
                    <Progress value={studyData.nextMilestone.progress} className="flex-1 h-2" />
                    <span className="text-sm font-medium">{studyData.nextMilestone.progress}%</span>
                  </div>
                </div>
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
