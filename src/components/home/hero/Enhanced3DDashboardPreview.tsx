
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Target, Calendar, Trophy, TrendingUp, BookOpen, Brain, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Enhanced3DDashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Enhanced slides with new exam readiness slide
  const slides = [
    {
      id: 'exam-readiness',
      title: 'Exam Readiness Score',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.72)}`}
                  className="text-green-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-green-600">72%</span>
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                <span className="text-lg font-semibold text-amber-700 dark:text-amber-300">
                  45 Days to NEET
                </span>
              </div>
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                Right on track! 🎯
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold text-gray-800 dark:text-white">Exam Champion</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              With right preparation, you're set for success! Keep up the momentum. 🚀
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'concept-mastery',
      title: 'Concept Mastery',
      content: (
        <div className="space-y-4">
          <div className="relative h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg overflow-hidden">
            <motion.div
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg flex items-center justify-center transform-gpu">
                <Brain className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                AI-Powered
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Physics</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2" />
            <div className="flex justify-between items-center">
              <span className="text-sm">Chemistry</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
        </div>
      )
    },
    {
      id: 'flashcards',
      title: 'Smart Flashcards',
      content: (
        <div className="space-y-4">
          <motion.div
            animate={{
              rotateX: [0, 180, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-32 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg p-4 shadow-lg transform-gpu"
          >
            <div className="flex items-center justify-between h-full">
              <div>
                <h4 className="font-medium">Newton's First Law</h4>
                <p className="text-sm text-muted-foreground">Tap to reveal answer</p>
              </div>
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </motion.div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">142</div>
              <div className="text-xs">Mastered</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">38</div>
              <div className="text-xs">Learning</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">12</div>
              <div className="text-xs">Difficult</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'practice-tests',
      title: 'Practice Tests',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <FileText className="h-8 w-8 text-purple-600" />
              <Badge variant="outline">NEET Mock Test</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Last Score</span>
                <span className="font-medium">156/180</span>
              </div>
              <Progress value={87} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Above average performance
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="text-lg font-bold text-blue-600">24</div>
              <div className="text-xs">Tests Taken</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="text-lg font-bold text-green-600">78%</div>
              <div className="text-xs">Avg Score</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      title: 'AI Analytics',
      content: (
        <div className="space-y-4">
          <div className="h-32 bg-gradient-to-br from-indigo-100 to-cyan-100 dark:from-indigo-900/30 dark:to-cyan-900/30 rounded-lg p-4 relative overflow-hidden">
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <TrendingUp className="h-16 w-16 text-indigo-600" />
            </motion.div>
            <div className="relative z-10">
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                AI Insights
              </Badge>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Strong in Organic Chemistry</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Focus on Physics numericals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Consistent Biology performance</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'study-plan',
      title: 'Personalized Study Plan',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-6 w-6 text-orange-600" />
              <span className="font-medium">Today's Goals</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Complete Physics Chapter 12</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Review 50 flashcards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm">Take practice test</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">6h 30m</div>
            <div className="text-xs text-muted-foreground">Study time today</div>
          </div>
        </div>
      )
    },
    {
      id: 'achievements',
      title: 'Achievements',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center mb-3"
            >
              <Trophy className="h-12 w-12 text-yellow-600" />
            </motion.div>
            <div className="text-center">
              <div className="font-medium">Consistency Champion</div>
              <div className="text-xs text-muted-foreground">7 days study streak!</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-sm font-bold">🎯</div>
              <div className="text-xs">Goal Setter</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-sm font-bold">📚</div>
              <div className="text-xs">Speed Reader</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-2 border-indigo-100 dark:border-indigo-800 shadow-2xl overflow-hidden min-h-[400px]">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">PREPZR Dashboard</h3>
                  <p className="text-indigo-100 text-sm">AI-Powered Learning</p>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Welcome back!</div>
                  <div className="text-xs opacity-75">Ready to excel?</div>
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="absolute top-20 right-4 z-20 flex flex-col gap-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white shadow-lg' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Slide content */}
            <div className="relative h-80 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 p-6"
                >
                  <div className="h-full flex flex-col">
                    <h4 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {slides[currentSlide].title}
                    </h4>
                    <div className="flex-1 flex items-center justify-center">
                      {slides[currentSlide].content}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Enhanced3DDashboardPreview;
