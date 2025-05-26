
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  Target, 
  TrendingUp, 
  Calendar,
  Clock,
  Award,
  Zap,
  Eye,
  Video,
  PenTool,
  Calculator,
  Trophy,
  Star,
  Lightbulb,
  FlaskConical,
  Atom,
  HeartHandshake,
  Smile,
  Coffee,
  Sun
} from 'lucide-react';

const EnhancedDashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Enhanced concept mastery data with visual elements
  const conceptMasteryData = [
    { 
      subject: 'Physics', 
      mastered: 18, 
      total: 25, 
      percentage: 72,
      concepts: ['Mechanics', 'Optics', 'Thermodynamics', 'Electromagnetism'],
      recentConcept: 'Wave Motion',
      icon: <Atom className="h-4 w-4" />,
      color: 'blue'
    },
    { 
      subject: 'Chemistry', 
      mastered: 15, 
      total: 22, 
      percentage: 68,
      concepts: ['Organic Chemistry', 'Physical Chemistry', 'Inorganic Chemistry'],
      recentConcept: 'Chemical Bonding',
      icon: <FlaskConical className="h-4 w-4" />,
      color: 'green'
    },
    { 
      subject: 'Biology', 
      mastered: 20, 
      total: 23, 
      percentage: 87,
      concepts: ['Cell Biology', 'Genetics', 'Plant Physiology', 'Human Physiology'],
      recentConcept: 'Photosynthesis',
      icon: <BookOpen className="h-4 w-4" />,
      color: 'emerald'
    }
  ];

  const slides = [
    {
      title: 'Dynamic Exam Plan',
      content: (
        <div className="space-y-4">
          {/* NEET 2026 Champion Badge */}
          <motion.div 
            className="flex justify-between items-center mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-800">NEET 2026 Champion Track</h3>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1">
                🏆 India's #1 Platform
              </Badge>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-200"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Your Path to NEET 2026 Success
            </h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>🎯 Target Score: 545+</p>
              <p>📚 Syllabus: 75% Complete</p>
              <p>⚡ Days Remaining: 156</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700 text-white">
                Take NEET 2026 Live Test
              </Button>
            </motion.div>
          </motion.div>
          
          {conceptMasteryData.map((subject, index) => (
            <motion.div
              key={subject.subject}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg p-4 shadow-sm border"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className={`text-${subject.color}-600`}>{subject.icon}</div>
                  <span className="font-medium text-gray-700">{subject.subject}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {subject.mastered}/{subject.total}
                </span>
              </div>
              <Progress value={subject.percentage} className="h-2 mb-2" />
              <div className="flex flex-wrap gap-1">
                {subject.concepts.slice(0, 2).map((concept, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {concept}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: 'Adaptive Daily Plans',
      content: (
        <div className="space-y-4">
          <motion.div 
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI-Powered Study Plan
            </h4>
            <div className="space-y-2">
              {[
                { subject: 'Physics - Modern Physics', time: '2h', color: 'purple-400', reason: 'Based on your weak areas' },
                { subject: 'Chemistry - Organic Reactions', time: '1.5h', color: 'blue-400', reason: 'High weightage topic' },
                { subject: 'Biology - Genetics Practice', time: '1h', color: 'green-400', reason: 'Quick revision needed' }
              ].map((task, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded p-2 border-l-2 border-purple-400"
                >
                  <p className="text-sm text-gray-700">📖 {task.subject} ({task.time})</p>
                  <p className="text-xs text-gray-500">{task.reason}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-3">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-lg font-bold text-blue-700">4.5h</p>
                    <p className="text-xs text-blue-600">Today's Plan</p>
                  </div>
                </div>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="p-3 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-lg font-bold text-green-700">94%</p>
                    <p className="text-xs text-green-600">Completion</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      title: 'Mood-Based Daily Plans',
      content: (
        <div className="space-y-4">
          <motion.div 
            className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-medium text-orange-800 mb-3 flex items-center gap-2">
              <Smile className="h-4 w-4" />
              Mood-Adaptive Learning
            </h4>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { mood: 'Energetic', icon: <Zap className="h-4 w-4" />, color: 'bg-yellow-100 text-yellow-700' },
                { mood: 'Focused', icon: <Target className="h-4 w-4" />, color: 'bg-blue-100 text-blue-700' },
                { mood: 'Relaxed', icon: <Coffee className="h-4 w-4" />, color: 'bg-green-100 text-green-700' },
                { mood: 'Motivated', icon: <Sun className="h-4 w-4" />, color: 'bg-orange-100 text-orange-700' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className={`rounded p-2 text-center ${item.color}`}
                >
                  <div className="flex justify-center mb-1">{item.icon}</div>
                  <p className="text-xs font-medium">{item.mood}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-white rounded p-2 border border-yellow-300">
              <p className="text-sm font-medium text-yellow-800">Current: Motivated Mode</p>
              <p className="text-xs text-yellow-600">Challenging topics recommended</p>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      title: 'Concept Mastery Hub',
      content: (
        <div className="space-y-4">
          <motion.div 
            className="bg-white rounded-lg p-4 border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Multi-Modal Learning
            </h4>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { mode: '3D Visual', icon: <Eye className="h-6 w-6" />, color: 'blue' },
                { mode: 'Video Learn', icon: <Video className="h-6 w-6" />, color: 'green' },
                { mode: 'Summary', icon: <PenTool className="h-6 w-6" />, color: 'purple' },
                { mode: 'Practice', icon: <Calculator className="h-6 w-6" />, color: 'orange' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                  className={`bg-${item.color}-50 rounded p-2 text-center cursor-pointer`}
                >
                  <div className={`text-${item.color}-600 mx-auto mb-1`}>{item.icon}</div>
                  <p className="text-xs font-medium">{item.mode}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded p-2 border border-yellow-200"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm font-medium text-yellow-800">Current: Photoelectric Effect</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-yellow-600">3D Mastery Progress</span>
                <span className="text-xs font-bold text-yellow-700">85%</span>
              </div>
              <Progress value={85} className="h-1 mt-1" />
            </motion.div>
          </motion.div>
        </div>
      )
    },
    {
      title: 'Formula Practice Hub',
      content: (
        <div className="space-y-4">
          <motion.div 
            className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h4 className="font-medium text-indigo-800 mb-3 flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Smart Formula Practice
            </h4>
            
            <div className="space-y-2">
              {[
                { formula: 'E = mc²', subject: 'Physics', mastery: 92 },
                { formula: 'PV = nRT', subject: 'Chemistry', mastery: 78 },
                { formula: 'ATP + H₂O → ADP', subject: 'Biology', mastery: 85 }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded p-2 border"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-mono">{item.formula}</span>
                    <Badge variant="outline" className="text-xs">{item.mastery}%</Badge>
                  </div>
                  <p className="text-xs text-gray-500">{item.subject}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      title: 'Exam Practice Arena',
      content: (
        <div className="space-y-4">
          <motion.div 
            className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border border-red-200"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h4 className="font-medium text-red-800 mb-3 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Exam Simulation Center
            </h4>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { type: 'Mock Tests', count: '89', color: 'red' },
                { type: 'Time Trials', count: '156', color: 'orange' },
                { type: 'Subject Tests', count: '234', color: 'purple' },
                { type: 'Revision Tests', count: '67', color: 'blue' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-${item.color}-100 rounded p-2 text-center`}
                >
                  <p className={`text-lg font-bold text-${item.color}-700`}>{item.count}</p>
                  <p className={`text-xs text-${item.color}-600`}>{item.type}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      title: 'Exam Readiness Tracker',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <motion.div 
              className="relative inline-block"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-white">75%</span>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-white px-2 py-1 text-xs">
                  Ready!
                </Badge>
              </motion.div>
            </motion.div>
            <h4 className="font-semibold text-gray-800">NEET 2026 Champion</h4>
            <p className="text-sm text-gray-600">On track for 545+ score</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <motion.div 
              className="bg-green-50 rounded-lg p-3 border border-green-200 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xl font-bold text-green-700">156</p>
              <p className="text-xs text-green-600">Days Left</p>
            </motion.div>
            <motion.div 
              className="bg-blue-50 rounded-lg p-3 border border-blue-200 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xl font-bold text-blue-700">89</p>
              <p className="text-xs text-blue-600">Mock Tests</p>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-red-50 rounded-lg p-3 border border-red-200 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <h5 className="font-medium text-red-800 mb-2">🚀 Champion Mode Activated</h5>
            <p className="text-xs text-red-600 mb-2">Advanced NEET 2026 preparation track</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs">
                Take Live Test Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      {/* Dashboard Container - Enhanced size and animations */}
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border transform scale-125"
        whileHover={{ scale: 1.28 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <BookOpen className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">PREPZR Dashboard</h3>
              <p className="text-sm text-gray-500">India's #1 NEET Platform</p>
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm">
              🏆 Live
            </Badge>
          </motion.div>
        </motion.div>

        {/* Sliding Content with Enhanced Animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="h-96 overflow-hidden"
          >
            <motion.h4 
              className="font-semibold text-gray-800 mb-4 text-lg"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {slides[currentSlide].title}
            </motion.h4>
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Slide Indicators */}
        <motion.div 
          className="flex justify-center gap-2 mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-blue-500 scale-125' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Elements with 3D effects */}
      <motion.div
        className="absolute -top-8 -right-8 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
        animate={{ 
          y: [0, -5, 0],
          rotateX: [0, 10, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        🎯 NEET 2026 Ready!
      </motion.div>
      
      <motion.div
        className="absolute -bottom-8 -left-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
        animate={{ 
          y: [0, 5, 0],
          rotateY: [0, 10, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        ⚡ AI Powered
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 -right-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg"
        animate={{ 
          x: [0, 5, 0],
          rotateZ: [0, 5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        🏆 Champion
      </motion.div>
    </motion.div>
  );
};

export default EnhancedDashboardPreview;
