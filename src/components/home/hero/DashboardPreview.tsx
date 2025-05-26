
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Brain, 
  RotateCcw, 
  Calculator, 
  FileText, 
  TrendingUp, 
  Trophy,
  Play,
  Eye,
  Video,
  FileBarChart
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const dashboardSlides = [
    {
      id: 1,
      title: "Dynamic Plan As Per Your Learning Profile",
      description: "AI analyzes your learning style, pace, and preferences to create a personalized study roadmap",
      icon: <BookOpen className="w-8 h-8" />,
      gradient: "from-blue-500 to-indigo-600",
      features: ["Learning Style Analysis", "Personalized Roadmap", "Adaptive Pacing"]
    },
    {
      id: 2,
      title: "Daily Adaptive Plans", 
      description: "Smart daily schedules that adjust based on your progress, mood, and available time",
      icon: <Calendar className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-600",
      features: ["Smart Scheduling", "Mood-Based Adaptation", "Progress Tracking"]
    },
    {
      id: 3,
      title: "Concept Mastery with Multi Techniques",
      description: "Learn concepts through 3D visuals, videos, summaries, and interactive content",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-green-500 to-teal-600",
      features: ["3D Visualizations", "Video Lessons", "Interactive Summaries"],
      subIcons: [<Eye className="w-4 h-4" />, <Video className="w-4 h-4" />, <FileBarChart className="w-4 h-4" />]
    },
    {
      id: 4,
      title: "Recall Accuracy with Interactive Spaced Repetition",
      description: "Advanced spaced repetition system that optimizes memory retention and recall",
      icon: <RotateCcw className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-600",
      features: ["Spaced Repetition", "Memory Optimization", "Recall Testing"]
    },
    {
      id: 5,
      title: "Formula Practice",
      description: "Interactive formula lab with step-by-step derivations and practice problems",
      icon: <Calculator className="w-8 h-8" />,
      gradient: "from-cyan-500 to-blue-600",
      features: ["Interactive Formulas", "Step-by-step Derivations", "Practice Problems"]
    },
    {
      id: 6,
      title: "Practice Exam",
      description: "Comprehensive practice tests with real-time analysis and performance insights",
      icon: <FileText className="w-8 h-8" />,
      gradient: "from-violet-500 to-purple-600",
      features: ["Mock Tests", "Real-time Analysis", "Performance Insights"]
    },
    {
      id: 7,
      title: "Improve Exam Readiness Everyday",
      description: "Daily readiness tracking with actionable insights to boost your exam preparation",
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: "from-emerald-500 to-green-600",
      features: ["Daily Tracking", "Readiness Score", "Actionable Insights"]
    },
    {
      id: 8,
      title: "Become Exam Champion",
      description: "Achieve your dream score with our comprehensive preparation system and support",
      icon: <Trophy className="w-8 h-8" />,
      gradient: "from-yellow-500 to-orange-600",
      features: ["Dream Score Achievement", "Champion Status", "Success Guarantee"]
    }
  ];

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      {/* Dashboard Container - Increased Size */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden w-[600px] h-[450px]">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <h3 className="text-lg font-semibold">PREPZR Dashboard</h3>
            <div className="text-sm opacity-75">Smart Learning</div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 h-[390px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col"
            >
              {/* Slide Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${dashboardSlides[currentSlide].gradient} text-white shadow-lg`}>
                  {dashboardSlides[currentSlide].icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {dashboardSlides[currentSlide].title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {dashboardSlides[currentSlide].description}
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {dashboardSlides[currentSlide].features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    {dashboardSlides[currentSlide].subIcons?.[index] && (
                      <div className="text-gray-600 dark:text-gray-400">
                        {dashboardSlides[currentSlide].subIcons[index]}
                      </div>
                    )}
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Progress Visualization */}
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Feature Progress
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {Math.round(((currentSlide + 1) / dashboardSlides.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${dashboardSlides[currentSlide].gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSlide + 1) / dashboardSlides.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {dashboardSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide 
                ? 'bg-blue-600' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute -bottom-6 -left-6 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60"
        animate={{
          y: [0, 10, 0],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default DashboardPreview;
