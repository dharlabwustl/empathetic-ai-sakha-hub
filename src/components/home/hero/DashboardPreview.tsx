
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Clock, 
  TrendingUp, 
  Award, 
  Zap,
  Users,
  BarChart3,
  Trophy,
  Calendar,
  Star,
  CheckCircle,
  PlayCircle,
  Calculator,
  FileText,
  Lightbulb
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const dashboardSlides = [
    {
      title: "Smart Dashboard Overview",
      subtitle: "Your personalized learning center",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-800">Study Time</span>
              </div>
              <div className="text-lg font-bold text-blue-900">24h</div>
              <div className="text-xs text-blue-600">This week</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium text-green-800">Accuracy</span>
              </div>
              <div className="text-lg font-bold text-green-900">85%</div>
              <div className="text-xs text-green-600">+5% this week</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Weekly Progress</span>
              <span>68%</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
        </div>
      )
    },
    {
      title: "Concept Mastery",
      subtitle: "Deep understanding with AI explanations",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-5 w-5 text-purple-600" />
            <span className="font-semibold text-purple-800">Active Learning</span>
          </div>
          <div className="space-y-2">
            {['Physics - Mechanics', 'Chemistry - Organic', 'Math - Calculus'].map((subject, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-xs font-medium">{subject}</span>
                <Badge variant="secondary" className="text-xs">
                  {90 - idx * 10}% mastered
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-blue-800">AI Insight: Focus on thermodynamics concepts</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Recall Practice",
      subtitle: "Strengthen memory with spaced repetition",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-5 w-5 text-orange-600" />
            <span className="font-semibold text-orange-800">Memory Boost</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-orange-50 p-2 rounded">
              <div className="text-lg font-bold text-orange-900">45</div>
              <div className="text-xs text-orange-600">Due Today</div>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <div className="text-lg font-bold text-green-900">128</div>
              <div className="text-xs text-green-600">Mastered</div>
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-lg font-bold text-blue-900">92%</div>
              <div className="text-xs text-blue-600">Accuracy</div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Retention Rate</span>
              <span>92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
        </div>
      )
    },
    {
      title: "Practice Exams",
      subtitle: "Real exam simulation with detailed analytics",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-red-600" />
            <span className="font-semibold text-red-800">Exam Ready</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <span className="text-xs font-medium">JEE Main Mock #5</span>
              <Badge className="bg-red-100 text-red-800 text-xs">85%</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
              <span className="text-xs font-medium">NEET Practice #3</span>
              <Badge className="bg-blue-100 text-blue-800 text-xs">78%</Badge>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3 text-green-600" />
              <span>+12% improvement</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-blue-600" />
              <span>2h 45m avg</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Formula Practice",
      subtitle: "Master equations with interactive practice",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="h-5 w-5 text-indigo-600" />
            <span className="font-semibold text-indigo-800">Formula Mastery</span>
          </div>
          <div className="bg-indigo-50 p-3 rounded-lg">
            <div className="text-sm font-mono text-indigo-900 mb-2">
              F = ma
            </div>
            <div className="text-xs text-indigo-700">
              Newton's Second Law of Motion
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center">
              <div className="text-lg font-bold text-indigo-900">156</div>
              <div className="text-xs text-indigo-600">Formulas Learned</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-900">94%</div>
              <div className="text-xs text-green-600">Success Rate</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Exam Champions",
      subtitle: "Learn from toppers and success stories",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <span className="font-semibold text-yellow-800">Success Stories</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
              <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center">
                <Star className="h-3 w-3 text-yellow-700" />
              </div>
              <div>
                <div className="text-xs font-medium">Arjun K. - AIR 15</div>
                <div className="text-xs text-gray-600">JEE Advanced 2024</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
              <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                <Star className="h-3 w-3 text-green-700" />
              </div>
              <div>
                <div className="text-xs font-medium">Priya M. - AIR 22</div>
                <div className="text-xs text-gray-600">NEET 2024</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-center text-gray-600">
            +50K success stories and counting
          </div>
        </div>
      )
    },
    {
      title: "Smart Analytics",
      subtitle: "AI-powered insights for better performance",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <span className="font-semibold text-emerald-800">Performance Insights</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Weak Areas Improved</span>
              <span className="text-green-600 font-medium">+25%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-emerald-50 p-2 rounded text-center">
              <div className="font-bold text-emerald-900">8.5h</div>
              <div className="text-emerald-600">Optimal Study Time</div>
            </div>
            <div className="bg-blue-50 p-2 rounded text-center">
              <div className="font-bold text-blue-900">87%</div>
              <div className="text-blue-600">Prediction Accuracy</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, dashboardSlides.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Dashboard Card */}
      <Card className="relative h-96 overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-2xl bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/20 rounded-full"></div>
              <span className="text-sm font-semibold">PREPZR Dashboard</span>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="pt-16 p-4 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {dashboardSlides[currentSlide].title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {dashboardSlides[currentSlide].subtitle}
                </p>
              </div>
              
              <div className="flex-1">
                {dashboardSlides[currentSlide].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {dashboardSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-20 left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"
          animate={{
            y: [0, 10, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        />
      </Card>

      {/* Floating Action Buttons */}
      <motion.div
        className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <PlayCircle className="h-6 w-6 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;
