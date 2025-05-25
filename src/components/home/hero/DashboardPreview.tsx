
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, BookOpen, Clock, TrendingUp, User, Brain, Target, Calendar, ChevronLeft, ChevronRight, Award, Zap, Star, Activity, Users, CheckCircle } from 'lucide-react';

const DashboardPreview = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const dashboardPages = [
    {
      title: "Smart Dashboard",
      description: "Your personalized learning hub",
      content: (
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Welcome back, Priya!</h3>
                  <p className="text-blue-100 text-sm">Ready for today's study plan?</p>
                </div>
              </div>
              <div className="text-white text-right">
                <div className="text-sm opacity-80">NEET 2025</div>
                <div className="text-xs opacity-60">142 days left</div>
              </div>
            </div>
          </div>

          {/* Progress Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 p-4 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Overall Progress</span>
              </div>
              <div className="text-2xl font-bold text-green-800">78%</div>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Study Streak</span>
              </div>
              <div className="text-2xl font-bold text-blue-800">15 days</div>
              <div className="text-xs text-blue-600 mt-1">Personal best!</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Analytics Dashboard",
      description: "Track your performance insights",
      content: (
        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-t-2xl">
            <h3 className="text-white font-semibold">Performance Analytics</h3>
            <p className="text-purple-100 text-sm">Your learning insights at a glance</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-bold text-blue-800">92%</div>
              <div className="text-xs text-blue-600">Accuracy</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="font-bold text-green-800">+15%</div>
              <div className="text-xs text-green-600">This Week</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="font-bold text-orange-800">3.2h</div>
              <div className="text-xs text-orange-600">Study Time</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <h4 className="font-medium mb-3">Subject Performance</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Physics</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Chemistry</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Study Planner",
      description: "Personalized learning roadmap",
      content: (
        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4 rounded-t-2xl">
            <h3 className="text-white font-semibold">Today's Study Plan</h3>
            <p className="text-indigo-100 text-sm">Optimized for your success</p>
          </div>

          <div className="space-y-3">
            {[
              { subject: "Physics", topic: "Electromagnetic Induction", time: "45 min", completed: true },
              { subject: "Chemistry", topic: "Organic Compounds", time: "30 min", completed: true },
              { subject: "Biology", topic: "Human Physiology", time: "40 min", completed: false }
            ].map((task, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  task.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <div>
                    <div className="font-medium text-sm">{task.subject}</div>
                    <div className="text-xs text-gray-600">{task.topic}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{task.time}</div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">Smart Recommendation</span>
            </div>
            <p className="text-sm text-blue-700">Based on your performance, focus on Thermodynamics today for maximum impact!</p>
          </div>
        </div>
      )
    },
    {
      title: "AI Tutor",
      description: "Your personal learning assistant",
      content: (
        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 rounded-t-2xl">
            <h3 className="text-white font-semibold">AI Tutor Chat</h3>
            <p className="text-emerald-100 text-sm">Get instant help and explanations</p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1 bg-emerald-50 p-3 rounded-lg">
                <p className="text-sm text-emerald-800">
                  Great question about Newton's laws! Let me break it down for you with a simple example...
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <div className="flex-1 max-w-xs bg-blue-500 text-white p-3 rounded-lg">
                <p className="text-sm">
                  Can you explain the third law of motion with an example?
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium text-gray-800">Quick Actions</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-1 bg-white border rounded-full text-xs">Explain Concept</button>
                <button className="px-3 py-1 bg-white border rounded-full text-xs">Practice Problems</button>
                <button className="px-3 py-1 bg-white border rounded-full text-xs">Formula Help</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Auto-rotate pages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % dashboardPages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % dashboardPages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + dashboardPages.length) % dashboardPages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      {/* Dashboard Container */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
        {/* Page Indicator */}
        <div className="bg-gray-100 dark:bg-gray-800 px-6 py-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {dashboardPages[currentPage].title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevPage}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-500">
                {currentPage + 1} / {dashboardPages.length}
              </span>
              <button 
                onClick={nextPage}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="h-80 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              {dashboardPages[currentPage].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page Dots */}
        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-t">
          <div className="flex items-center justify-center gap-2">
            {dashboardPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPage ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
      >
        Live Preview
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-xl shadow-lg"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">AI Assistant Active</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;
