
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
  Play,
  Atom,
  Beaker,
  Dna
} from 'lucide-react';

const Enhanced3DDashboardPreview = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const dashboardSlides = [
    {
      title: "Dynamic Exam Plan",
      description: "AI-powered study roadmap that adapts to your learning pace",
      icon: <Target className="w-8 h-8" />,
      preview: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Today's Goals</span>
            <Badge variant="outline" className="text-xs">3/5 Complete</Badge>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Physics: Mechanics Review</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Chemistry: Organic Compounds</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-sm">Biology: Cell Structure</span>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600">Next: Advanced Physics Problems</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
            </div>
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      title: "Adaptive Daily Plan",
      description: "Personalized schedule based on your energy and mood",
      icon: <Calendar className="w-8 h-8" />,
      preview: (
        <div className="space-y-4">
          <div className="text-sm text-gray-600 font-medium">Today - High Energy Mode</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm bg-green-50 p-2 rounded">
              <span>9:00 AM - Physics</span>
              <Badge className="h-5 text-xs">Active</Badge>
            </div>
            <div className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
              <span>11:00 AM - Break</span>
              <Badge variant="outline" className="h-5 text-xs">Rest</Badge>
            </div>
            <div className="flex justify-between items-center text-sm bg-blue-50 p-2 rounded">
              <span>12:00 PM - Chemistry</span>
              <Badge variant="secondary" className="h-5 text-xs">Next</Badge>
            </div>
          </div>
          <div className="text-xs text-center text-gray-500">
            Plan adapts based on your performance
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-green-500 to-teal-600"
    },
    {
      title: "Mood-Based Changes",
      description: "Content adapts to your emotional state for optimal learning",
      icon: <Brain className="w-8 h-8" />,
      preview: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Feeling Motivated</span>
          </div>
          <div className="text-sm text-gray-600">Recommended: Advanced Practice</div>
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full w-4/5 transition-all duration-500"></div>
            </div>
            <span className="text-sm font-medium">Focus Level: 80%</span>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-xs text-green-700">Perfect time for challenging topics!</div>
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      title: "Concept Mastery - 3D Visual",
      description: "Interactive 3D models for complete understanding",
      icon: <BookOpen className="w-8 h-8" />,
      preview: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs">Visual</Button>
            <Button size="sm" className="h-8 text-xs">3D Model</Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">Practice</Button>
          </div>
          <div className="text-sm text-center font-medium">
            Atomic Structure - 3D View
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-lg h-24 flex items-center justify-center relative overflow-hidden">
            <motion.div
              className="relative"
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <Atom className="w-8 h-8 text-blue-600" />
            </motion.div>
            <motion.div
              className="absolute top-2 right-2"
              animate={{ 
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Beaker className="w-4 h-4 text-purple-600" />
            </motion.div>
            <motion.div
              className="absolute bottom-2 left-2"
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Dna className="w-4 h-4 text-green-600" />
            </motion.div>
          </div>
          <div className="text-xs text-center text-gray-500">
            Rotate and interact with 3D models
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      title: "Recall Practice",
      description: "Spaced repetition system for long-term memory retention",
      icon: <Zap className="w-8 h-8" />,
      preview: (
        <div className="space-y-4">
          <div className="text-sm font-medium">Active Recall Session</div>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg text-sm">
              Q: What is the formula for kinetic energy?
            </div>
            <Button size="sm" className="w-full h-8 text-xs">Show Answer</Button>
          </div>
          <div className="flex justify-between text-xs bg-gray-50 p-2 rounded">
            <span>Success Rate: 85%</span>
            <span>Next Review: 2h</span>
          </div>
          <div className="text-xs text-center text-gray-500">
            Optimized for maximum retention
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      title: "Exam Practice",
      description: "Adaptive mock tests that adjust difficulty in real-time",
      icon: <BarChart3 className="w-8 h-8" />,
      preview: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Mock Test #15</span>
            <Badge className="h-5 text-xs">In Progress</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Physics</span>
              <span>15/20</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-3/4 transition-all duration-300"></div>
            </div>
          </div>
          <div className="text-xs text-center text-gray-600 bg-blue-50 p-2 rounded">
            Adapting difficulty based on performance...
          </div>
          <div className="text-xs text-center text-green-600">
            Current Score: 78% - Excellent!
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-indigo-500 to-blue-600"
    },
    {
      title: "Formula Practice",
      description: "Interactive formula memorization with contextual applications",
      icon: <TrendingUp className="w-8 h-8" />,
      preview: (
        <div className="space-y-4">
          <div className="text-sm font-medium text-center">Formula Challenge</div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-lg font-mono">E = mc²</div>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium">Variables:</div>
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              E = Energy, m = Mass, c = Speed of light
            </div>
          </div>
          <Button size="sm" className="w-full h-8 text-xs">Practice Application</Button>
          <div className="text-xs text-center text-gray-500">
            Master formulas through practice
          </div>
        </div>
      ),
      color: "bg-gradient-to-br from-teal-500 to-green-600"
    }
  ];

  // Auto-play slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % dashboardSlides.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, dashboardSlides.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 3D Card Container - Double Size */}
      <div className="relative scale-125 origin-center">
        {/* Background Cards for 3D Effect */}
        <motion.div 
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl transform rotate-3 scale-95"
          animate={{ rotate: [3, -2, 3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl shadow-xl transform -rotate-2 scale-98"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Main Card */}
        <Card className="relative bg-white dark:bg-gray-800 border-0 shadow-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
                <span className="font-bold text-lg">PREPZR Dashboard</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Live Preview
              </Badge>
            </div>
          </div>
          
          {/* Content Area */}
          <CardContent className="p-0">
            {/* Current Slide */}
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="p-8"
            >
              <div className="flex items-start gap-6">
                <motion.div 
                  className={`p-4 rounded-2xl text-white ${dashboardSlides[activeSlide].color}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {dashboardSlides[activeSlide].icon}
                </motion.div>
                
                <div className="flex-1 space-y-3">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {dashboardSlides[activeSlide].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {dashboardSlides[activeSlide].description}
                  </p>
                </div>
              </div>
              
              {/* Preview Content */}
              <motion.div 
                className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {dashboardSlides[activeSlide].preview}
              </motion.div>
            </motion.div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 pb-8">
              {dashboardSlides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeSlide 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </CardContent>
          
          {/* Floating Action Button */}
          <motion.div 
            className="absolute bottom-6 right-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <Button 
              size="lg" 
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl"
            >
              <Play className="w-5 h-5" />
            </Button>
          </motion.div>
        </Card>
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute -bottom-6 -left-6 w-10 h-10 bg-green-400 rounded-full"
        animate={{ 
          x: [0, 15, 0],
          scale: [1, 1.3, 1],
          rotate: [0, -180, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute top-1/2 -left-10 w-8 h-8 bg-blue-400 rounded-full"
        animate={{ 
          x: [0, 10, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </motion.div>
  );
};

export default Enhanced3DDashboardPreview;
