
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, Brain, FileText, Clock, Target, TrendingUp, 
  Calendar, CheckCircle, Star, Award, Zap, Users, ArrowRight,
  FlaskConical, RotateCcw, PenTool, Heart, Lightbulb
} from 'lucide-react';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [studyStreak, setStudyStreak] = useState(5);

  // Auto-rotate through tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % 7);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(72), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStudyStreak(prev => prev === 5 ? 7 : prev === 7 ? 12 : 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const mockData = {
    user: {
      name: "Alex Kumar",
      examGoal: "JEE Advanced 2026",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    kpis: [
      { title: "Concepts Mastered", value: 156, total: 200, icon: BookOpen, color: "blue" },
      { title: "Quiz Average", value: 85, unit: "%", icon: FileText, color: "green" },
      { title: "Study Hours", value: 4.2, unit: "hrs", icon: Clock, color: "purple" },
      { title: "Practice Tests", value: 24, icon: Target, color: "amber" }
    ],
    todaysTasks: [
      { id: 1, title: "Thermodynamics Chapter 2", subject: "Physics", time: "30 min", completed: true },
      { id: 2, title: "Organic Chemistry Practice", subject: "Chemistry", time: "45 min", completed: false },
      { id: 3, title: "Calculus Problem Set", subject: "Mathematics", time: "60 min", completed: false }
    ],
    subjects: [
      { name: "Physics", progress: 78, color: "blue" },
      { name: "Chemistry", progress: 65, color: "green" },
      { name: "Mathematics", progress: 82, color: "purple" }
    ]
  };

  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    { 
      id: 'dynamic-plan', 
      label: 'Dynamic Plan', 
      icon: Calendar,
      color: 'bg-purple-500'
    },
    { 
      id: 'concept-study', 
      label: 'Deep Concepts', 
      icon: Brain,
      color: 'bg-green-500'
    },
    { 
      id: 'recall-practice', 
      label: 'Interactive Recall', 
      icon: RotateCcw,
      color: 'bg-amber-500'
    },
    { 
      id: 'exam-practice', 
      label: 'Exam Practice', 
      icon: Target,
      color: 'bg-red-500'
    },
    { 
      id: 'formula-lab', 
      label: 'Formula Lab', 
      icon: FlaskConical,
      color: 'bg-indigo-500'
    },
    { 
      id: 'mood-plan', 
      label: 'Mood-Based Plan', 
      icon: Heart,
      color: 'bg-pink-500'
    }
  ];

  const renderTabContent = () => {
    switch (tabs[activeTab].id) {
      case 'overview':
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {mockData.kpis.map((kpi, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <kpi.icon className={`w-4 h-4 text-${kpi.color}-500`} />
                        {kpi.total && (
                          <div className="text-xs text-gray-500">
                            {kpi.value}/{kpi.total}
                          </div>
                        )}
                      </div>
                      <div className="text-lg font-bold">
                        {kpi.value}{kpi.unit}
                      </div>
                      <div className="text-xs text-gray-500">{kpi.title}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Exam Readiness */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span>Exam Readiness Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-600">{progressValue}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Overall Progress</span>
                          <span>{progressValue}%</span>
                        </div>
                        <Progress value={progressValue} className="h-1" />
                      </div>
                      <p className="text-xs text-gray-600">
                        You're on track to achieve your target score!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'dynamic-plan':
        return (
          <motion.div
            key="dynamic-plan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>AI-Generated Dynamic Study Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {mockData.todaysTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center space-x-3 p-2 rounded-lg border ${
                        task.completed 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        task.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300'
                      }`}>
                        {task.completed && <CheckCircle className="w-2 h-2 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className="text-xs text-gray-500">{task.subject} • {task.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'concept-study':
        return (
          <motion.div
            key="concept-study"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Brain className="w-4 h-4 text-green-600" />
                  <span>Deep Concept Understanding</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Newton's Laws of Motion</h4>
                    <p className="text-xs text-gray-600 mb-2">Interactive 3D visualization with real-world examples</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Visual Learning</Badge>
                      <Badge variant="outline" className="text-xs">AI Explanations</Badge>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Organic Chemistry Mechanisms</h4>
                    <p className="text-xs text-gray-600 mb-2">Step-by-step reaction pathway analysis</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Interactive</Badge>
                      <Badge variant="outline" className="text-xs">Adaptive</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'recall-practice':
        return (
          <motion.div
            key="recall-practice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span>Interactive Recall Practice</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Quick Recall Challenge</h4>
                    <p className="text-xs text-gray-600 mb-2">Test your memory with spaced repetition</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Success Rate: 87%</span>
                      <Button size="sm" className="h-6 text-xs">Practice Now</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 p-2 rounded text-center">
                      <div className="text-lg font-bold text-blue-600">24</div>
                      <div className="text-xs text-gray-500">Cards Mastered</div>
                    </div>
                    <div className="bg-green-50 p-2 rounded text-center">
                      <div className="text-lg font-bold text-green-600">12</div>
                      <div className="text-xs text-gray-500">Streak Days</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'exam-practice':
        return (
          <motion.div
            key="exam-practice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Target className="w-4 h-4 text-red-600" />
                  <span>Adaptive Exam Practice</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">JEE Main Mock Test #12</h4>
                    <p className="text-xs text-gray-600 mb-2">AI-curated questions based on your weak areas</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge className="text-xs bg-red-100 text-red-700">180 mins</Badge>
                        <Badge className="text-xs bg-blue-100 text-blue-700">90 questions</Badge>
                      </div>
                      <Button size="sm" className="h-6 text-xs">Start Test</Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Recent Performance</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-sm font-bold text-blue-600">152/180</div>
                        <div className="text-xs text-gray-500">Last Score</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-green-600">+12</div>
                        <div className="text-xs text-gray-500">Improvement</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-purple-600">Top 5%</div>
                        <div className="text-xs text-gray-500">Percentile</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'formula-lab':
        return (
          <motion.div
            key="formula-lab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <FlaskConical className="w-4 h-4 text-indigo-600" />
                  <span>Interactive Formula Laboratory</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Quadratic Formula Explorer</h4>
                    <div className="bg-white p-2 rounded border font-mono text-xs mb-2">
                      x = (-b ± √(b²-4ac)) / 2a
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Interactive visualization with parameter sliders</p>
                    <Button size="sm" className="h-6 text-xs">Explore Formula</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 p-2 rounded text-center">
                      <PenTool className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                      <div className="text-xs font-medium">Practice Mode</div>
                    </div>
                    <div className="bg-green-50 p-2 rounded text-center">
                      <Lightbulb className="w-4 h-4 mx-auto mb-1 text-green-600" />
                      <div className="text-xs font-medium">Concept Builder</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'mood-plan':
        return (
          <motion.div
            key="mood-plan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Heart className="w-4 h-4 text-pink-600" />
                  <span>Mood-Based Dynamic Planning</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="bg-pink-50 border border-pink-200 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Today's Mood: Focused 🎯</h4>
                    <p className="text-xs text-gray-600 mb-2">AI suggests challenging problem-solving sessions</p>
                    <div className="flex gap-2">
                      <Badge className="text-xs bg-green-100 text-green-700">High Energy</Badge>
                      <Badge className="text-xs bg-blue-100 text-blue-700">Deep Focus</Badge>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Recommended Activities</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Advanced calculus problems (45 min)</li>
                      <li>• Physics numerical practice (30 min)</li>
                      <li>• Chemistry mechanism deep dive (40 min)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <img 
                src={mockData.user.avatar} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold">Welcome back, {mockData.user.name}!</h2>
              <p className="text-blue-100 text-sm">Target: {mockData.user.examGoal}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">{studyStreak}</div>
            <div className="text-blue-100 text-xs">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-0">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`flex-1 min-w-fit flex items-center justify-center space-x-1 py-3 px-3 font-medium transition-all duration-200 text-xs ${
                activeTab === index
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                activeTab === index ? tab.color : 'bg-gray-200'
              }`}>
                <tab.icon className={`w-3 h-3 ${activeTab === index ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 min-h-[300px]">
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Ready to start your journey?</h3>
            <p className="text-gray-600 text-xs">Join thousands of students achieving their exam goals</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs h-8">
            Get Started
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
