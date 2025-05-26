
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Clock, 
  Target, 
  BookOpen, 
  Brain, 
  Award,
  CheckCircle,
  Calendar,
  Zap
} from 'lucide-react';

const DashboardPreview = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      title: "AI-Powered Study Dashboard",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Today's Progress</h3>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              On Track
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Physics - Mechanics</span>
              <span className="text-green-600">85%</span>
            </div>
            <Progress value={85} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span>Chemistry - Organic</span>
              <span className="text-blue-600">72%</span>
            </div>
            <Progress value={72} className="h-2" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">4.2h</div>
              <div className="text-xs text-gray-600">Study Time</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">12</div>
              <div className="text-xs text-gray-600">Concepts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600">89%</div>
              <div className="text-xs text-gray-600">Accuracy</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Smart Study Recommendations",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold">AI Suggestions</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-sm">Priority Focus</span>
              </div>
              <p className="text-xs text-gray-700">Review Thermodynamics - 15 min boost needed</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">Strong Performance</span>
              </div>
              <p className="text-xs text-gray-700">Excellent in Kinematics - try advanced problems</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Quick Review
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Practice Test
            </Badge>
          </div>
        </div>
      )
    },
    {
      title: "Performance Analytics",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold">Weekly Insights</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <Award className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold">92%</div>
              <div className="text-xs text-gray-600">Consistency</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-lg font-bold">47</div>
              <div className="text-xs text-gray-600">Topics Mastered</div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm">
              <span>Mock Test Avg</span>
              <span className="font-semibold text-green-600">78%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Improvement Rate</span>
              <span className="font-semibold text-blue-600">+12%</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Upcoming Milestones",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold">Next 7 Days</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="font-medium text-sm text-orange-800">Chemistry Mock Test</div>
              <div className="text-xs text-orange-600">Tomorrow, 10:00 AM</div>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs bg-white">
                  High Priority
                </Badge>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="font-medium text-sm text-blue-800">Physics Revision</div>
              <div className="text-xs text-blue-600">Dec 28, 2:00 PM</div>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs bg-white">
                  Scheduled
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <div className="text-sm text-gray-600">
              5 more tasks this week
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, 4000);

    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2.5));
    }, 100);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto lg:max-w-lg xl:max-w-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Main Preview Card */}
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-sm sm:text-base font-semibold">PREPZR Dashboard</h2>
              <p className="text-xs sm:text-sm text-blue-100">AI-Powered Learning</p>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-2 sm:mt-3">
            <div className="w-full bg-blue-500/30 rounded-full h-1">
              <div 
                className="bg-white h-1 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4 sm:p-6 h-80 sm:h-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              {slides[activeSlide].content}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        {/* Navigation dots */}
        <div className="flex justify-center space-x-2 pb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === activeSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </Card>

      {/* Floating elements for visual appeal */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default DashboardPreview;
