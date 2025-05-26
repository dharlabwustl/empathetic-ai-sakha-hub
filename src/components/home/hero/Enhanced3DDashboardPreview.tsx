
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Calendar, 
  Target, 
  BookOpen, 
  Zap, 
  TrendingUp, 
  Award,
  BarChart3,
  Users,
  Sparkles,
  CheckCircle,
  Clock,
  Play
} from 'lucide-react';

const Enhanced3DDashboardPreview = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const dashboardSlides = [
    {
      title: "Dynamic Exam Plan",
      description: "AI-powered study roadmap that adapts to your learning pace",
      icon: <Target className="w-6 h-6" />,
      preview: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Today's Goals</span>
            <Badge variant="outline" className="text-xs">3/5 Complete</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs">Physics: Mechanics Review</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs">Chemistry: Organic Compounds</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-xs">Biology: Cell Structure</span>
            </div>
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      title: "Adaptive Daily Plan",
      description: "Personalized schedule based on your energy and mood",
      icon: <Calendar className="w-6 h-6" />,
      preview: (
        <div className="space-y-3">
          <div className="text-xs text-gray-600">Today - High Energy Mode</div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>9:00 AM - Physics</span>
              <Badge className="h-4 text-xs">Active</Badge>
            </div>
            <div className="flex justify-between text-xs">
              <span>11:00 AM - Break</span>
              <Badge variant="outline" className="h-4 text-xs">Rest</Badge>
            </div>
            <div className="flex justify-between text-xs">
              <span>12:00 PM - Chemistry</span>
              <Badge variant="secondary" className="h-4 text-xs">Next</Badge>
            </div>
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-green-500 to-teal-600"
    },
    {
      title: "Mood-Based Changes",
      description: "Content adapts to your emotional state for optimal learning",
      icon: <Brain className="w-6 h-6" />,
      preview: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-xs">Feeling Motivated</span>
          </div>
          <div className="text-xs text-gray-600">Recommended: Advanced Practice</div>
          <div className="space-y-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
            </div>
            <span className="text-xs">Focus Level: 75%</span>
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      title: "Multimodal Concept Master",
      description: "Visual, audio, and interactive learning for complete understanding",
      icon: <BookOpen className="w-6 h-6" />,
      preview: (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-1">
            <Button size="sm" variant="outline" className="h-8 text-xs">Visual</Button>
            <Button size="sm" className="h-8 text-xs">Audio</Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">Practice</Button>
          </div>
          <div className="text-xs text-center">
            Newton's Laws of Motion
          </div>
          <div className="bg-blue-50 p-2 rounded text-xs">
            Interactive simulation loading...
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      title: "Recall Practice",
      description: "Spaced repetition system for long-term memory retention",
      icon: <Zap className="w-6 h-6" />,
      preview: (
        <div className="space-y-3">
          <div className="text-xs font-medium">Active Recall Session</div>
          <div className="space-y-2">
            <div className="bg-yellow-50 p-2 rounded text-xs">
              Q: What is the formula for kinetic energy?
            </div>
            <Button size="sm" className="w-full h-6 text-xs">Show Answer</Button>
          </div>
          <div className="flex justify-between text-xs">
            <span>Success Rate: 85%</span>
            <span>Next Review: 2h</span>
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      title: "Exam Practice",
      description: "Adaptive mock tests that adjust difficulty in real-time",
      icon: <BarChart3 className="w-6 h-6" />,
      preview: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">Mock Test #15</span>
            <Badge className="h-4 text-xs">In Progress</Badge>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Physics</span>
              <span>15/20</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-500 h-1 rounded-full w-3/4"></div>
            </div>
          </div>
          <div className="text-xs text-center text-gray-600">
            Adapting difficulty based on performance...
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-indigo-500 to-blue-600"
    },
    {
      title: "Formula Practice",
      description: "Interactive formula memorization with contextual applications",
      icon: <TrendingUp className="w-6 h-6" />,
      preview: (
        <div className="space-y-3">
          <div className="text-xs font-medium text-center">Formula Challenge</div>
          <div className="bg-green-50 p-2 rounded text-center">
            <div className="text-xs font-mono">E = mc²</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs">Variables:</div>
            <div className="text-xs text-gray-600">E = Energy, m = Mass, c = Speed of light</div>
          </div>
          <Button size="sm" className="w-full h-6 text-xs">Practice Application</Button>
        </div>
      ),
      color: "bg-gradient-to-br from-teal-500 to-green-600"
    },
    {
      title: "Improve Exam Readiness",
      description: "AI-driven analysis of your preparation strengths and gaps",
      icon: <Award className="w-6 h-6" />,
      preview: (
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">78%</div>
            <div className="text-xs">Exam Readiness</div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Strong Areas</span>
              <span className="text-green-600">Physics</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Focus Areas</span>
              <span className="text-orange-600">Organic Chem</span>
            </div>
          </div>
          <Button size="sm" className="w-full h-6 text-xs">View Full Report</Button>
        </div>
      ),
      color: "bg-gradient-to-br from-emerald-500 to-teal-600"
    },
    {
      title: "Become Exam Champion",
      description: "Comprehensive preparation tracking and achievement system",
      icon: <Users className="w-6 h-6" />,
      preview: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-medium">Champion Level 7</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Study Streak</span>
              <span className="font-medium">21 days</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Tests Completed</span>
              <span className="font-medium">45</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded text-xs text-white text-center">
            🏆 Next: Master Level
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-amber-500 to-yellow-600"
    }
  ];

  // Auto-play slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % dashboardSlides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, dashboardSlides.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 3D Card Container */}
      <div className="relative">
        {/* Background Cards for 3D Effect */}
        <motion.div 
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transform rotate-2 scale-95"
          animate={{ rotate: [2, -1, 2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transform -rotate-1 scale-98"
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Main Card */}
        <Card className="relative bg-white dark:bg-gray-800 border-0 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold text-sm">PREPZR Dashboard</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                Live Preview
              </Badge>
            </div>
          </div>
          
          {/* Content Area */}
          <CardContent className="p-0">
            {/* Current Slide */}
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className={`p-3 rounded-xl text-white ${dashboardSlides[activeSlide].color}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {dashboardSlides[activeSlide].icon}
                </motion.div>
                
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {dashboardSlides[activeSlide].title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {dashboardSlides[activeSlide].description}
                  </p>
                </div>
              </div>
              
              {/* Preview Content */}
              <motion.div 
                className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {dashboardSlides[activeSlide].preview}
              </motion.div>
            </motion.div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 pb-6">
              {dashboardSlides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide 
                      ? 'bg-blue-600 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </CardContent>
          
          {/* Floating Action Button */}
          <motion.div 
            className="absolute bottom-4 right-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <Button 
              size="sm" 
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            >
              <Play className="w-4 h-4" />
            </Button>
          </motion.div>
        </Card>
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full"
        animate={{ 
          x: [0, 10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.div>
  );
};

export default Enhanced3DDashboardPreview;
