
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Target, 
  Brain, 
  Trophy,
  TrendingUp,
  Calendar,
  Clock,
  Zap,
  Award,
  Star
} from 'lucide-react';

const Enhanced3DDashboardPreview = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "Today's Study Plan",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">NEET Physics</h3>
            <Badge variant="outline" className="text-xs">75%</Badge>
          </div>
          <Progress value={75} className="h-2" />
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <BookOpen className="h-3 w-3 text-blue-500" />
              <span>Mechanics - Newton's Laws</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Target className="h-3 w-3 text-green-500" />
              <span>Practice Test: Kinematics</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Performance Analytics",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">92%</div>
              <div className="text-xs text-gray-500">Biology</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">85%</div>
              <div className="text-xs text-gray-500">Physics</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">78%</div>
              <div className="text-xs text-gray-500">Chemistry</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-xs">15% improvement this week</span>
          </div>
        </div>
      )
    },
    {
      title: "Exam Readiness",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Award className="h-4 w-4 text-yellow-500" />
              NEET 2024 Readiness
            </h3>
            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">87%</Badge>
          </div>
          <Progress value={87} className="h-3 bg-yellow-100" />
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Concept Mastery</span>
              <span className="text-green-600 font-medium">Strong</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Speed & Accuracy</span>
              <span className="text-blue-600 font-medium">Good</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Mock Test Performance</span>
              <span className="text-orange-600 font-medium">Improving</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Exam Champion",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Trophy className="h-4 w-4 text-purple-500" />
              Champion Status
            </h3>
            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">Elite</Badge>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-3 w-3 text-yellow-500" />
              <span className="text-xs">180+ day study streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-blue-500" />
              <span className="text-xs">95% daily goals achieved</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-3 w-3 text-green-500" />
              <span className="text-xs">450+ concepts mastered</span>
            </div>
            <div className="text-center mt-3">
              <div className="text-lg font-bold text-purple-600">Rank #127</div>
              <div className="text-xs text-gray-500">Among 50K+ students</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative">
      {/* 3D Container */}
      <motion.div
        className="relative w-80 h-96 mx-auto"
        initial={{ opacity: 0, rotateY: -15 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Main Dashboard Card */}
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateY(-5deg) rotateX(5deg)"
          }}
          whileHover={{
            transform: "rotateY(-8deg) rotateX(8deg) scale(1.02)"
          }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-full h-full bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-sm">PREPZR</h2>
                    <p className="text-xs text-gray-500">AI Study Assistant</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  Today
                </Badge>
              </div>

              {/* Content Area */}
              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="mb-3">
                      <h3 className="font-semibold text-base text-gray-800 dark:text-white">
                        {slides[activeSlide].title}
                      </h3>
                    </div>
                    {slides[activeSlide].content}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Navigation Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeSlide
                        ? 'bg-blue-500 w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transform: "translateZ(20px)" }}
        >
          <Trophy className="h-6 w-6 text-white" />
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
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
          style={{ transform: "translateZ(15px)" }}
        >
          <Brain className="h-5 w-5 text-white" />
        </motion.div>
      </motion.div>

      {/* Background Glow Effect */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: "translate(-50%, -50%)"
          }}
        />
      </div>
    </div>
  );
};

export default Enhanced3DDashboardPreview;
