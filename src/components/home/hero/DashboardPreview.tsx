
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Brain,
  Award,
  Zap,
  ChevronRight,
  Users,
  Calculator,
  Trophy,
  CheckCircle,
  BarChart3
} from 'lucide-react';

const DashboardPreview = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sections = [
    {
      title: "Concept Mastery",
      icon: <Brain className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600",
      slides: [
        { title: "Physics Concepts", progress: 75, items: 42 },
        { title: "Chemistry Formulas", progress: 68, items: 38 },
        { title: "Math Theorems", progress: 82, items: 51 },
        { title: "Recall Practice", progress: 90, items: 67 },
        { title: "Practice Exams", progress: 65, items: 34 },
        { title: "Formula Practice", progress: 78, items: 45 },
        { title: "Exam Champions", progress: 88, items: 23 }
      ]
    },
    {
      title: "Study Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
      slides: [
        { title: "Daily Progress", progress: 85, items: 7 },
        { title: "Weekly Trends", progress: 72, items: 4 },
        { title: "Performance Insights", progress: 91, items: 12 }
      ]
    },
    {
      title: "Practice Tests",
      icon: <Target className="w-5 h-5" />,
      color: "from-purple-500 to-violet-600",
      slides: [
        { title: "Mock Exams", progress: 70, items: 15 },
        { title: "Topic Tests", progress: 88, items: 28 },
        { title: "Previous Years", progress: 76, items: 19 }
      ]
    },
    {
      title: "Time Management",
      icon: <Clock className="w-5 h-5" />,
      color: "from-orange-500 to-red-600",
      slides: [
        { title: "Study Schedule", progress: 80, items: 5 },
        { title: "Break Reminders", progress: 95, items: 8 },
        { title: "Focus Sessions", progress: 73, items: 12 }
      ]
    },
    {
      title: "Achievement Center",
      icon: <Trophy className="w-5 h-5" />,
      color: "from-yellow-500 to-amber-600",
      slides: [
        { title: "Badges Earned", progress: 60, items: 18 },
        { title: "Milestones", progress: 85, items: 7 },
        { title: "Leaderboard", progress: 92, items: 3 }
      ]
    },
    {
      title: "AI Tutor Chat",
      icon: <Users className="w-5 h-5" />,
      color: "from-cyan-500 to-blue-600",
      slides: [
        { title: "Doubt Solving", progress: 89, items: 156 },
        { title: "Concept Clarity", progress: 94, items: 89 },
        { title: "Study Tips", progress: 87, items: 67 }
      ]
    }
  ];

  // Auto-rotate sections every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
      setCurrentSlide(0); // Reset slide when section changes
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate slides within active section every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      const currentSection = sections[activeSection];
      setCurrentSlide((prev) => (prev + 1) % currentSection.slides.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSection]);

  const currentSection = sections[activeSection];
  const currentSlideData = currentSection.slides[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl scale-110" />
      
      {/* Main preview container */}
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-4 py-3 border-b border-gray-200/50 dark:border-gray-600/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-600 dark:text-gray-300">
              PREPZR Student Dashboard
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 lg:p-6 space-y-4">
          {/* Welcome section */}
          <div className="text-center mb-4">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1">
              Welcome back, Student!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your personalized learning dashboard
            </p>
          </div>

          {/* Active section display */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`bg-gradient-to-r ${currentSection.color} text-white border-0 shadow-lg`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                  {currentSection.icon}
                  {currentSection.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm lg:text-base font-medium">
                      {currentSlideData.title}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {currentSlideData.items} items
                    </Badge>
                  </div>
                  <Progress 
                    value={currentSlideData.progress} 
                    className="h-2 bg-white/20"
                  />
                  <div className="flex justify-between text-xs lg:text-sm">
                    <span>Progress</span>
                    <span>{currentSlideData.progress}% complete</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === activeSection ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-4">
            <div className="text-center p-2 lg:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 mx-auto mb-1" />
              <div className="text-sm lg:text-base font-bold text-blue-700 dark:text-blue-300">
                127
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Completed
              </div>
            </div>
            <div className="text-center p-2 lg:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 mx-auto mb-1" />
              <div className="text-sm lg:text-base font-bold text-green-700 dark:text-green-300">
                94%
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                Accuracy
              </div>
            </div>
            <div className="text-center p-2 lg:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600 mx-auto mb-1" />
              <div className="text-sm lg:text-base font-bold text-purple-700 dark:text-purple-300">
                +15%
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                This Week
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
