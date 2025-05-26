
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
  Eye,
  Video,
  FileText,
  BarChart3,
  Trophy,
  Sparkles,
  Play,
  CheckCircle
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Dynamic Plan as per Your Learner Profile",
      subtitle: "AI-Powered Personalization",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium">Personalized Learning Path</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
              <div className="text-xs text-blue-600 font-medium">Learning Style</div>
              <div className="text-sm font-bold">Visual + Kinesthetic</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
              <div className="text-xs text-green-600 font-medium">Pace</div>
              <div className="text-sm font-bold">Advanced</div>
            </div>
          </div>
          
          <div className="space-y-2">
            {[
              { subject: "Physics", strength: 85, focus: "Mechanics" },
              { subject: "Chemistry", strength: 72, focus: "Organic Chemistry" },
              { subject: "Mathematics", strength: 91, focus: "Calculus" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded border">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{item.subject}</span>
                    <span className="text-blue-600">{item.strength}%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Focus: {item.focus}</div>
                  <Progress value={item.strength} className="h-1 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Daily Adaptive Plans",
      subtitle: "Smart Schedule Optimization",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium">Today's Adaptive Schedule</span>
          </div>
          
          <div className="space-y-2">
            {[
              { time: "09:00", task: "Physics - Wave Motion", type: "concept", duration: "45 min", status: "completed" },
              { time: "10:00", task: "Math - Integration", type: "practice", duration: "30 min", status: "current" },
              { time: "11:00", task: "Chemistry Flashcards", type: "revision", duration: "20 min", status: "pending" },
              { time: "12:00", task: "Mock Test - Section A", type: "exam", duration: "60 min", status: "pending" }
            ].map((item, idx) => (
              <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg border ${
                item.status === 'completed' ? 'bg-green-50 border-green-200' :
                item.status === 'current' ? 'bg-blue-50 border-blue-200' :
                'bg-gray-50 border-gray-200'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  item.status === 'completed' ? 'bg-green-500' :
                  item.status === 'current' ? 'bg-blue-500' :
                  'bg-gray-400'
                }`} />
                <div className="flex-1">
                  <div className="text-xs font-medium">{item.time} - {item.task}</div>
                  <div className="text-xs text-gray-500">{item.duration}</div>
                </div>
                {item.status === 'completed' && <CheckCircle className="h-3 w-3 text-green-500" />}
                {item.status === 'current' && <Play className="h-3 w-3 text-blue-500" />}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Concept Mastery with Multi-Techniques",
      subtitle: "3D, Visual, Video & Summary",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium">Multi-Modal Learning</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Eye, label: "3D Models", progress: 80, color: "blue" },
              { icon: Video, label: "Video Lessons", progress: 65, color: "purple" },
              { icon: FileText, label: "Smart Summaries", progress: 90, color: "green" },
              { icon: Target, label: "Interactive Labs", progress: 75, color: "orange" }
            ].map((item, idx) => (
              <div key={idx} className="p-2 bg-white/50 dark:bg-gray-800/50 rounded border">
                <div className="flex items-center gap-1 mb-1">
                  <item.icon className={`h-3 w-3 text-${item.color}-500`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
                <Progress value={item.progress} className="h-1" />
                <div className="text-xs text-gray-500 mt-1">{item.progress}% complete</div>
              </div>
            ))}
          </div>
          
          <div className="mt-3 p-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded">
            <div className="text-xs font-medium text-indigo-600">Current Topic: Newton's Laws</div>
            <div className="text-xs text-gray-600 mt-1">Mastery Level: Advanced (87%)</div>
          </div>
        </div>
      )
    },
    {
      title: "Recall Accuracy with Spaced Repetition",
      subtitle: "Interactive Memory Enhancement",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium">Memory Optimization</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded">
              <div className="text-lg font-bold text-emerald-600">94%</div>
              <div className="text-xs text-gray-600">Recall Rate</div>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="text-lg font-bold text-blue-600">156</div>
              <div className="text-xs text-gray-600">Cards Mastered</div>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
              <div className="text-lg font-bold text-purple-600">7d</div>
              <div className="text-xs text-gray-600">Streak</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Next Review Session</span>
              <span className="font-medium">Chemistry Bonds - 2h 15m</span>
            </div>
            <Progress value={75} className="h-2" />
            
            <div className="mt-2 p-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded border border-yellow-200">
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-yellow-600" />
                <span className="text-xs font-medium text-yellow-700">Optimal Review Time!</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Formula Practice & Mastery",
      subtitle: "Interactive Problem Solving",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
              <Target className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium">Formula Mastery Hub</span>
          </div>
          
          <div className="space-y-2">
            {[
              { formula: "v² = u² + 2as", subject: "Physics", mastery: 85, problems: 24 },
              { formula: "PV = nRT", subject: "Chemistry", mastery: 92, problems: 18 },
              { formula: "∫ eˣ dx = eˣ + C", subject: "Math", mastery: 78, problems: 31 }
            ].map((item, idx) => (
              <div key={idx} className="p-2 bg-white/50 dark:bg-gray-800/50 rounded border">
                <div className="flex items-center justify-between mb-1">
                  <code className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">{item.formula}</code>
                  <Badge variant="outline" className="text-xs">{item.mastery}%</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{item.subject}</span>
                  <span>{item.problems} problems solved</span>
                </div>
                <Progress value={item.mastery} className="h-1 mt-1" />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
              <Trophy className="h-3 w-3 mr-1" />
              Formula Champion: Level 7
            </Badge>
          </div>
        </div>
      )
    },
    {
      title: "Practice Exams & Assessment",
      subtitle: "Real Exam Simulation",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium">Exam Readiness Center</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <div className="text-lg font-bold text-green-600">87%</div>
              <div className="text-xs text-gray-600">Avg Score</div>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="text-lg font-bold text-blue-600">23</div>
              <div className="text-xs text-gray-600">Tests Taken</div>
            </div>
          </div>
          
          <div className="space-y-2">
            {[
              { exam: "Physics Full Mock", score: 89, date: "2 days ago", status: "excellent" },
              { exam: "Chemistry Quick Test", score: 82, date: "Yesterday", status: "good" },
              { exam: "Math Practice Set", score: 94, date: "Today", status: "excellent" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded border">
                <div className={`w-2 h-2 rounded-full ${
                  item.status === 'excellent' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <div className="text-xs font-medium">{item.exam}</div>
                  <div className="text-xs text-gray-500">{item.date}</div>
                </div>
                <Badge variant="outline" className={`text-xs ${
                  item.status === 'excellent' ? 'text-green-600 border-green-300' : 'text-blue-600 border-blue-300'
                }`}>
                  {item.score}%
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Improve Exam Readiness Everyday",
      subtitle: "Become an Exam Champion",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full">
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium">Champion's Journey</span>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-r from-gold-50 to-yellow-50 dark:from-yellow-900/20 dark:to-gold-900/20 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600 mb-1">Champion Level 8</div>
            <div className="text-xs text-gray-600">Exam Readiness: 91%</div>
            <Progress value={91} className="h-2 mt-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-white/50 dark:bg-gray-800/50 rounded">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-xs">Daily Improvement</span>
              </div>
              <span className="text-xs font-bold text-green-600">+3.2%</span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-white/50 dark:bg-gray-800/50 rounded">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                  <Target className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-xs">Target Achievement</span>
              </div>
              <span className="text-xs font-bold text-blue-600">96%</span>
            </div>
          </div>
          
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Ready to Ace Your Exam!
            </Badge>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
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
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-white font-medium text-sm">Good Morning, Alex!</div>
              <div className="text-blue-100 text-xs">Ready to become an exam champion?</div>
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
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {slides[currentSlide].subtitle}
              </p>
            </div>
            <div className="flex gap-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'bg-blue-500 w-4' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full overflow-hidden"
            >
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <motion.button
            onClick={prevSlide}
            className="ml-2 p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <motion.button
            onClick={nextSlide}
            className="mr-2 p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2
        }}
      >
        <Trophy className="h-4 w-4 text-white" />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg"
        animate={{ 
          scale: [1, 1.3, 1],
          y: [0, -8, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatDelay: 1
        }}
      >
        <Sparkles className="h-3 w-3 text-white" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 -left-3 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"
        animate={{ 
          x: [0, 10, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      />
    </motion.div>
  );
};

export default DashboardPreview;
