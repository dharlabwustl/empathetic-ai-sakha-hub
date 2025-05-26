
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
  Settings,
  Zap,
  Trophy,
  Star,
  Play,
  BarChart3,
  Lightbulb,
  Sparkles
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Dynamic Plan as Per Your Learner Profile",
      subtitle: "AI-Powered Personalization",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Your Learning Style: Visual + Kinesthetic</h3>
            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">Adaptive</Badge>
          </div>
          
          <div className="space-y-2">
            {[
              { subject: "Physics", style: "3D Simulations", progress: 85, color: "bg-blue-500" },
              { subject: "Chemistry", style: "Interactive Models", progress: 70, color: "bg-green-500" },
              { subject: "Mathematics", style: "Visual Proofs", progress: 92, color: "bg-purple-500" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{item.subject}</span>
                    <span className="text-xs text-gray-500">{item.style}</span>
                  </div>
                  <Progress value={item.progress} className="h-1 mt-1" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
            <Zap className="h-3 w-3 text-blue-600" />
            <span className="text-xs text-blue-700">Plan adapts based on your performance!</span>
          </div>
        </div>
      )
    },
    {
      title: "Daily Adaptive Plans",
      subtitle: "Smart Scheduling That Evolves",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Today's Adaptive Schedule</h3>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Optimized</Badge>
          </div>
          
          <div className="space-y-2">
            {[
              { time: "9:00 AM", task: "Organic Chemistry", difficulty: "Peak Focus", status: "current" },
              { time: "10:30 AM", task: "Physics Problems", difficulty: "High Energy", status: "upcoming" },
              { time: "12:00 PM", task: "Math Revision", difficulty: "Post-Lunch", status: "upcoming" }
            ].map((item, idx) => (
              <div key={idx} className={`flex items-center gap-2 p-2 rounded ${
                item.status === 'current' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 dark:bg-gray-800'
              }`}>
                <div className="text-xs font-medium text-gray-600">{item.time}</div>
                <div className="flex-1">
                  <div className="text-xs font-medium">{item.task}</div>
                  <div className="text-xs text-gray-500">{item.difficulty}</div>
                </div>
                {item.status === 'current' && <Play className="h-3 w-3 text-blue-600" />}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
            <Clock className="h-3 w-3 text-orange-600" />
            <span className="text-xs text-orange-700">Schedule adjusts to your energy levels</span>
          </div>
        </div>
      )
    },
    {
      title: "Concept Mastery with Multi Techniques",
      subtitle: "3D • Visual • Video • Summary",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="text-lg font-bold text-blue-600">3D</div>
              <div className="text-xs text-gray-600">Models</div>
            </div>
            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <div className="text-lg font-bold text-green-600">Visual</div>
              <div className="text-xs text-gray-600">Diagrams</div>
            </div>
            <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
              <div className="text-lg font-bold text-purple-600">Video</div>
              <div className="text-xs text-gray-600">Lectures</div>
            </div>
            <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
              <div className="text-lg font-bold text-orange-600">Summary</div>
              <div className="text-xs text-gray-600">Notes</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Current: Cell Division</span>
              <span className="font-medium">85% Mastered</span>
            </div>
            <Progress value={85} className="h-2" />
            
            <div className="flex items-center gap-2 mt-3">
              <Lightbulb className="h-3 w-3 text-yellow-500" />
              <span className="text-xs text-gray-600">Try 3D mitosis simulation next!</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Recall Accuracy with Interactive Spaced Repetition",
      subtitle: "Smart Memory Enhancement",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Memory Strength</h3>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Strong</Badge>
          </div>
          
          <div className="space-y-2">
            {[
              { concept: "Newton's Laws", strength: 95, interval: "7 days", color: "bg-green-500" },
              { concept: "Organic Reactions", strength: 75, interval: "3 days", color: "bg-yellow-500" },
              { concept: "Trigonometry", strength: 60, interval: "1 day", color: "bg-orange-500" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{item.concept}</span>
                    <span className="text-xs text-gray-500">Next: {item.interval}</span>
                  </div>
                  <Progress value={item.strength} className="h-1 mt-1" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mt-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
            <Brain className="h-3 w-3 text-purple-600" />
            <span className="text-xs text-purple-700">AI optimizes review timing</span>
          </div>
        </div>
      )
    },
    {
      title: "Formula Practice & Practice Exams",
      subtitle: "Master Every Formula & Test Pattern",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="text-lg font-bold text-blue-600">247</div>
              <div className="text-xs text-gray-600">Formulas Mastered</div>
            </div>
            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <div className="text-lg font-bold text-green-600">89%</div>
              <div className="text-xs text-gray-600">Exam Accuracy</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs p-2 border rounded">
              <span>Next Practice Exam</span>
              <span className="font-medium text-blue-600">NEET Mock Test #15</span>
            </div>
            <div className="flex items-center justify-between text-xs p-2 border rounded">
              <span>Formula Focus</span>
              <span className="font-medium text-purple-600">Kinematics</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded">
            <Target className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-700">Ready for next level!</span>
          </div>
        </div>
      )
    },
    {
      title: "Improve Exam Readiness Everyday",
      subtitle: "Track Your Journey to Success",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Exam Readiness Score</h3>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Rising</Badge>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">87%</div>
            <div className="text-xs text-gray-600 mb-2">+5% from yesterday</div>
            <Progress value={87} className="h-3" />
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <div className="font-bold text-blue-600">92%</div>
              <div className="text-gray-600">Knowledge</div>
            </div>
            <div>
              <div className="font-bold text-purple-600">85%</div>
              <div className="text-gray-600">Speed</div>
            </div>
            <div>
              <div className="font-bold text-orange-600">84%</div>
              <div className="text-gray-600">Accuracy</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
            <TrendingUp className="h-3 w-3 text-yellow-600" />
            <span className="text-xs text-yellow-700">On track for your target score!</span>
          </div>
        </div>
      )
    },
    {
      title: "Become Exam Champion",
      subtitle: "Your Success Story Starts Here",
      content: (
        <div className="space-y-3">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="font-bold text-sm mb-2">Champion in Progress</h3>
          </div>
          
          <div className="space-y-2">
            {[
              { achievement: "Study Streak", value: "23 days", icon: "🔥", progress: 85 },
              { achievement: "Concepts Mastered", value: "156/200", icon: "🧠", progress: 78 },
              { achievement: "Mock Test Average", value: "89%", icon: "📝", progress: 89 }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded">
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{item.achievement}</span>
                    <span className="text-xs font-bold text-yellow-600">{item.value}</span>
                  </div>
                  <Progress value={item.progress} className="h-1 mt-1" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center p-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded">
            <Star className="h-4 w-4 text-purple-600 mx-auto mb-1" />
            <span className="text-xs font-medium text-purple-700">You're destined for greatness!</span>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
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
              <div className="text-white font-medium text-sm">Welcome back, Alex!</div>
              <div className="text-blue-100 text-xs">Let's ace your NEET preparation!</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Bell className="h-4 w-4 text-white/80" />
            <Settings className="h-4 w-4 text-white/80" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 h-80 sm:h-96">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {slides[currentSlide].title}
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {slides[currentSlide].subtitle}
              </p>
            </div>
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
              transition={{ duration: 0.4 }}
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
        <Sparkles className="h-3 w-3 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;
