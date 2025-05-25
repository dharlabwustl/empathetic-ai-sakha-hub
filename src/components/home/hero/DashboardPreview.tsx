
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, BookOpen, Clock, TrendingUp, User, Brain, Target, 
  Calendar, ChevronLeft, ChevronRight, Award, Zap, Star, Activity, 
  Users, CheckCircle, Play, BookMarked, FlaskConical, TrendingDown 
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const dashboardPages = [
    {
      title: "Dynamic Learning Profile",
      description: "Personalized plan based on your learning style",
      content: (
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Dynamic Learning Profile</h3>
                  <p className="text-blue-100">Adaptive plan as per your learning profile</p>
                </div>
              </div>
              <div className="text-white text-right">
                <div className="text-sm opacity-80">NEET 2025</div>
                <div className="text-xs opacity-60">142 days left</div>
              </div>
            </div>
          </div>

          {/* Learning Profile Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-blue-800">Learning Style</span>
              </div>
              <div className="text-2xl font-bold text-blue-900 mb-2">Visual Learner</div>
              <div className="text-sm text-blue-600">Adapting content with diagrams & charts</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-green-800">Study Pace</span>
              </div>
              <div className="text-2xl font-bold text-green-900 mb-2">Moderate</div>
              <div className="text-sm text-green-600">Optimal 3.5 hrs daily schedule</div>
            </div>
          </div>

          {/* Weekly Adaptive Plan */}
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h4 className="font-bold text-lg mb-4 text-gray-800">This Week's Adaptive Plan</h4>
            <div className="space-y-3">
              {[
                { day: "Monday", focus: "Physics - Optics", time: "3.5h", progress: 100 },
                { day: "Tuesday", focus: "Chemistry - Organic", time: "3h", progress: 80 },
                { day: "Today", focus: "Biology - Genetics", time: "4h", progress: 45 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      item.progress === 100 ? 'bg-green-500' : 
                      item.progress > 0 ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <div>
                      <div className="font-medium">{item.day}</div>
                      <div className="text-sm text-gray-600">{item.focus}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.time}</div>
                    <div className="text-sm text-gray-500">{item.progress}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Daily Adaptive Plans",
      description: "Smart daily adjustments based on your progress",
      content: (
        <div className="p-8 space-y-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6 rounded-t-3xl">
            <h3 className="text-white font-bold text-xl">Today's Adaptive Plan</h3>
            <p className="text-purple-100">Automatically adjusted based on yesterday's performance</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <div className="font-bold text-blue-800 text-lg">Enhanced</div>
              <div className="text-sm text-blue-600">Physics focus +30%</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-green-600" />
              <div className="font-bold text-green-800 text-lg">Maintained</div>
              <div className="text-sm text-green-600">Chemistry pace</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <TrendingDown className="w-8 h-8 mx-auto mb-3 text-orange-600" />
              <div className="font-bold text-orange-800 text-lg">Reduced</div>
              <div className="text-sm text-orange-600">Biology load -20%</div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl">
            <h4 className="font-bold mb-4">Adaptive Adjustments Made</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Zap className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Increased Physics practice based on weak areas detected</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Brain className="w-5 h-5 text-green-500" />
                <span className="text-sm">Added visual diagrams for better concept understanding</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm">Optimized break intervals based on attention span</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Concept Mastery Hub",
      description: "Multi-technique approach for deep understanding",
      content: (
        <div className="p-8 space-y-8">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6 rounded-t-3xl">
            <h3 className="text-white font-bold text-xl">Concept Mastery with Multi Techniques</h3>
            <p className="text-indigo-100">5 different approaches for complete understanding</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <BookOpen className="w-6 h-6" />, title: "Visual Learning", desc: "Interactive diagrams & animations", progress: 85 },
              { icon: <Play className="w-6 h-6" />, title: "Video Explanations", desc: "Expert-led concept videos", progress: 92 },
              { icon: <BookMarked className="w-6 h-6" />, title: "Text Analysis", desc: "Detailed written explanations", progress: 78 },
              { icon: <FlaskConical className="w-6 h-6" />, title: "Practice Labs", desc: "Hands-on experiments", progress: 88 }
            ].map((technique, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-200 rounded-lg text-indigo-700">
                    {technique.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-indigo-900">{technique.title}</div>
                    <div className="text-sm text-indigo-600">{technique.desc}</div>
                  </div>
                </div>
                <div className="w-full bg-indigo-200 rounded-full h-3">
                  <div 
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${technique.progress}%` }}
                  />
                </div>
                <div className="text-right text-sm text-indigo-700 mt-2">{technique.progress}% mastery</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-yellow-500" />
              <span className="font-bold text-gray-800">Current Focus: Electromagnetic Induction</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">Mastery Score: 78% - Approaching Expert Level</div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Visual ✓</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Video ✓</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Practice In Progress</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Spaced Repetition & Exam Readiness",
      description: "Interactive recall accuracy and daily improvements",
      content: (
        <div className="p-8 space-y-8">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6 rounded-t-3xl">
            <h3 className="text-white font-bold text-xl">Recall Accuracy & Exam Readiness</h3>
            <p className="text-emerald-100">Interactive spaced repetition + daily readiness boost</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl">
              <Brain className="w-10 h-10 mx-auto mb-4 text-emerald-600" />
              <div className="font-bold text-emerald-800 text-2xl">94%</div>
              <div className="text-sm text-emerald-600">Recall Accuracy</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <Target className="w-10 h-10 mx-auto mb-4 text-blue-600" />
              <div className="font-bold text-blue-800 text-2xl">87%</div>
              <div className="text-sm text-blue-600">Exam Readiness</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
              <TrendingUp className="w-10 h-10 mx-auto mb-4 text-purple-600" />
              <div className="font-bold text-purple-800 text-2xl">+12%</div>
              <div className="text-sm text-purple-600">This Week</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border">
              <h4 className="font-bold mb-4 text-gray-800">Today's Spaced Repetition</h4>
              <div className="space-y-3">
                {[
                  { concept: "Newton's Laws", due: "Now", difficulty: "Easy", accuracy: 96 },
                  { concept: "Organic Reactions", due: "2h", difficulty: "Medium", accuracy: 88 },
                  { concept: "Cell Division", due: "5h", difficulty: "Hard", accuracy: 78 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium">{item.concept}</div>
                      <div className="text-sm text-gray-600">Due {item.due} • {item.difficulty}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-emerald-600">{item.accuracy}%</div>
                      <div className="text-xs text-gray-500">accuracy</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-gray-800">Daily Readiness Improvement</span>
              </div>
              <p className="text-sm text-gray-700">Your exam readiness improved by 2.3% today! Formula practice and concept revision are boosting your confidence.</p>
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
      {/* Dashboard Container - Increased size */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500 w-full max-w-4xl">
        {/* Page Indicator */}
        <div className="bg-gray-100 dark:bg-gray-800 px-8 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-lg">
                {dashboardPages[currentPage].title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={prevPage}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500 font-medium">
                {currentPage + 1} / {dashboardPages.length}
              </span>
              <button 
                onClick={nextPage}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content - Increased height */}
        <div className="h-96 overflow-hidden">
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
        <div className="bg-gray-50 dark:bg-gray-800 px-8 py-4 border-t">
          <div className="flex items-center justify-center gap-3">
            {dashboardPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
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
        className="absolute -top-6 -right-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
      >
        Live Preview
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Assistant Active</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;
