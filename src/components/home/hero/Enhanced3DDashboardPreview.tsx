
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Clock,
  Star,
  Award,
  Brain,
  Zap,
  Trophy,
  CheckCircle
} from 'lucide-react';

const Enhanced3DDashboardPreview = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [examReadiness, setExamReadiness] = useState(0);
  const [examChampion, setExamChampion] = useState(0);

  // Animated progress values
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 85 ? 20 : prev + 1));
      setExamReadiness((prev) => (prev >= 72 ? 25 : prev + 1));
      setExamChampion((prev) => (prev >= 65 ? 30 : prev + 1));
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(slideTimer);
  }, []);

  const slides = [
    {
      title: "Smart Study Plan",
      icon: <BookOpen className="h-6 w-6" />,
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Today's Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>✓ Physics: 3/4 topics</div>
            <div>📝 Chemistry: 2/3 tests</div>
          </div>
        </div>
      )
    },
    {
      title: "Exam Readiness",
      icon: <Target className="h-6 w-6" />,
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">NEET Readiness</span>
            <Badge variant="secondary" className="text-xs">{examReadiness}%</Badge>
          </div>
          <Progress value={examReadiness} className="h-2" />
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Strong: Biology</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-orange-500" />
              <span>Focus: Physics</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Exam Champion",
      icon: <Trophy className="h-6 w-6" />,
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Champion Score</span>
            <Badge variant="secondary" className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white">{examChampion}%</Badge>
          </div>
          <Progress value={examChampion} className="h-2" />
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3 text-purple-500" />
              <span>Rank: Top 15%</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span>Streak: 12 days</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI Insights",
      icon: <Brain className="h-6 w-6" />,
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Learning Efficiency</span>
            <Badge variant="secondary" className="text-xs">92%</Badge>
          </div>
          <Progress value={92} className="h-2" />
          <div className="text-xs space-y-1">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-blue-500" />
              <span>Peak time: 9-11 AM</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span>Improving: Chemistry</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 3D Container */}
      <motion.div
        className="relative"
        initial={{ rotateY: -15, rotateX: 5 }}
        animate={{ 
          rotateY: [-15, -10, -15],
          rotateX: [5, 8, 5]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ perspective: "1000px" }}
      >
        {/* Dashboard Card */}
        <Card className="w-80 h-96 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 shadow-2xl border-0 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PREPZR Dashboard
              </CardTitle>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Current Slide */}
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-md text-blue-600 dark:text-blue-400">
                  {slides[activeSlide].icon}
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {slides[activeSlide].title}
                </h3>
              </div>
              {slides[activeSlide].content}
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-3 text-white text-center">
                <div className="text-lg font-bold">127</div>
                <div className="text-xs opacity-90">Concepts Learned</div>
              </div>
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg p-3 text-white text-center">
                <div className="text-lg font-bold">89%</div>
                <div className="text-xs opacity-90">Success Rate</div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide 
                      ? 'bg-blue-500 w-6' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Call to Action */}
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
              Start Your Journey
            </Button>
          </CardContent>
        </Card>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Star className="h-4 w-4 text-white" />
        </motion.div>

        <motion.div
          className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg flex items-center justify-center"
          animate={{ 
            x: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Zap className="h-3 w-3 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Enhanced3DDashboardPreview;
