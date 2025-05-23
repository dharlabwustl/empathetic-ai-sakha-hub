
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, Brain, FileText, Clock, Target, TrendingUp, 
  Calendar, CheckCircle, Star, Award, Zap, Users, ArrowRight 
} from 'lucide-react';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [progressValue, setProgressValue] = useState(0);
  const [studyStreak, setStudyStreak] = useState(5);

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
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'study', label: 'Study Plan', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: Target }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <img 
                src={mockData.user.avatar} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Welcome back, {mockData.user.name}!</h2>
              <p className="text-blue-100">Target: {mockData.user.examGoal}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{studyStreak}</div>
            <div className="text-blue-100 text-sm">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {mockData.kpis.map((kpi, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <kpi.icon className={`w-5 h-5 text-${kpi.color}-500`} />
                          {kpi.total && (
                            <div className="text-xs text-gray-500">
                              {kpi.value}/{kpi.total}
                            </div>
                          )}
                        </div>
                        <div className="text-xl font-bold">
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
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span>Exam Readiness Score</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-6">
                    <div className="relative w-24 h-24">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                          <span className="text-2xl font-bold text-purple-600">{progressValue}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Overall Progress</span>
                            <span>{progressValue}%</span>
                          </div>
                          <Progress value={progressValue} className="h-2" />
                        </div>
                        <p className="text-sm text-gray-600">
                          You're on track to achieve your target score! Keep up the great work.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'study' && (
            <motion.div
              key="study"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Today's Study Plan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockData.todaysTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: task.id * 0.1 }}
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          task.completed 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          task.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300'
                        }`}>
                          {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-gray-500">{task.subject} • {task.time}</div>
                        </div>
                        {!task.completed && (
                          <Button size="sm" variant="outline">
                            Start
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Subject Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.subjects.map((subject, index) => (
                      <motion.div
                        key={subject.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{subject.name}</span>
                          <span className="text-sm font-bold">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-gray-500">Achievements</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">Top 15%</div>
                    <div className="text-sm text-gray-500">Class Rank</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Ready to start your journey?</h3>
            <p className="text-gray-600 text-sm">Join thousands of students achieving their exam goals</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
