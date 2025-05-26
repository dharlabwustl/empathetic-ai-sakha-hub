
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Brain, 
  Award,
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  Settings
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Today's Study Plan",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Today's Progress</h3>
            <Badge variant="outline" className="text-xs">65%</Badge>
          </div>
          <Progress value={65} className="h-2" />
          
          <div className="space-y-2">
            {[
              { subject: "Physics", time: "30 min", progress: 80, color: "bg-blue-500" },
              { subject: "Chemistry", time: "25 min", progress: 60, color: "bg-green-500" },
              { subject: "Mathematics", time: "35 min", progress: 45, color: "bg-purple-500" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{item.subject}</span>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <Progress value={item.progress} className="h-1 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Performance Analytics",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="text-lg font-bold text-blue-600">85%</div>
              <div className="text-xs text-gray-600">Accuracy</div>
            </div>
            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <div className="text-lg font-bold text-green-600">4.2h</div>
              <div className="text-xs text-gray-600">Study Time</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Weekly Target</span>
              <span className="font-medium">28/30 hours</span>
            </div>
            <Progress value={93} className="h-2" />
            
            <div className="flex items-center gap-2 mt-3">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-600">+12% from last week</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Smart Recommendations",
      content: (
        <div className="space-y-3">
          <div className="space-y-2">
            {[
              { icon: <Brain className="h-3 w-3" />, text: "Focus on Organic Chemistry", priority: "High" },
              { icon: <BookOpen className="h-3 w-3" />, text: "Review Newton's Laws", priority: "Medium" },
              { icon: <Target className="h-3 w-3" />, text: "Practice Integration", priority: "Low" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 border rounded text-xs">
                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                  {item.icon}
                </div>
                <div className="flex-1">{item.text}</div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    item.priority === 'High' ? 'border-red-300 text-red-600' :
                    item.priority === 'Medium' ? 'border-orange-300 text-orange-600' :
                    'border-green-300 text-green-600'
                  }`}
                >
                  {item.priority}
                </Badge>
              </div>
            ))}
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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full max-w-md mx-auto lg:max-w-lg xl:max-w-xl"
    >
      {/* Dashboard Frame */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Mock Browser Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="flex-1 text-center">
            <div className="bg-white dark:bg-gray-700 rounded px-3 py-1 text-xs text-gray-600 dark:text-gray-300 max-w-48 mx-auto">
              dashboard.prepzr.com
            </div>
          </div>
        </div>

        {/* Mock Dashboard Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-white font-medium text-sm">Good Morning, Alex!</div>
              <div className="text-blue-100 text-xs">Ready to ace your NEET prep?</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Bell className="h-4 w-4 text-white/80" />
            <Settings className="h-4 w-4 text-white/80" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 h-64 sm:h-72">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {slides[currentSlide].title}
            </h2>
            <div className="flex gap-1">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={prevSlide}
            className="ml-2 p-1 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={nextSlide}
            className="mr-2 p-1 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1
        }}
      >
        <Award className="h-4 w-4 text-white" />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg"
        animate={{ 
          scale: [1, 1.2, 1],
          y: [0, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      >
        <Target className="h-3 w-3 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;
