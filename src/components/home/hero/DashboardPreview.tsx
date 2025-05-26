
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Trophy, 
  Clock, 
  Zap,
  ChevronRight,
  PlayCircle,
  BarChart3,
  FileText,
  Calculator,
  Award
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Concept Mastery",
      icon: <Brain className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Physics</span>
              </div>
              <Progress value={85} className="h-2 mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">85% Complete</span>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Chemistry</span>
              </div>
              <Progress value={92} className="h-2 mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">92% Complete</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-purple-500" />
              <span>Recall Practice: 150 concepts mastered</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-orange-500" />
              <span>Formula Practice: 45 formulas memorized</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Practice Exams",
      icon: <FileText className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">NEET Mock</span>
              </div>
              <div className="text-lg font-bold text-purple-600">Score: 85%</div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Last attempt</span>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium">Progress</span>
              </div>
              <Progress value={78} className="h-2 mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">78% Accuracy</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <PlayCircle className="h-4 w-4 text-green-500" />
              <span>12 Practice Tests Completed</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-yellow-500" />
              <span>Exam Champions: Top 5% Rank</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Smart Flashcards",
      icon: <Zap className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Biology</span>
              </div>
              <div className="text-lg font-bold text-green-600">248</div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Cards mastered</span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Study Time</span>
              </div>
              <div className="text-lg font-bold text-blue-600">2.5h</div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Today</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Brain className="h-4 w-4 text-purple-500" />
              <span>AI Spaced Repetition Active</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-orange-500" />
              <span>95% Retention Rate</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Formula Practice",
      icon: <Calculator className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Physics</span>
              </div>
              <div className="text-lg font-bold text-orange-600">45</div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Formulas learned</span>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Accuracy</span>
              </div>
              <Progress value={88} className="h-2 mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">88% Correct</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Quick Recall: 3.2s avg response</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-purple-500" />
              <span>Weekly Challenge: 1st Place</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      {/* Main Dashboard Container */}
      <div className="relative mx-auto max-w-md lg:max-w-lg xl:max-w-xl">
        <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg">Dashboard Preview</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your personalized learning hub
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                Live
              </Badge>
            </div>

            {/* Slide Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Slide Header */}
                <div className={`bg-gradient-to-r ${slides[currentSlide].color} p-4 rounded-lg text-white`}>
                  <div className="flex items-center gap-3">
                    {slides[currentSlide].icon}
                    <div>
                      <h4 className="font-semibold">{slides[currentSlide].title}</h4>
                      <p className="text-sm opacity-90">Interactive learning module</p>
                    </div>
                  </div>
                </div>

                {/* Slide Content */}
                <div className="p-4">
                  {slides[currentSlide].content}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 scale-110' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">94%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">2.5k</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Concepts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">180h</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Study Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg"
        >
          <Trophy className="h-6 w-6" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg"
        >
          <Zap className="h-5 w-5" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
