
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
  Atom
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
          {/* NEET 2026 Exam Ready Badge */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">NEET 2026 Champion Track</h3>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 animate-pulse">
              🏆 India's #1 NEET Prep Platform
            </Badge>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Your Path to NEET 2026 Success
            </h4>
            <div className="text-sm text-blue-700">
              <p>🎯 545+ Target Score</p>
              <p>📚 75% Syllabus Complete</p>
              <p>⚡ 156 Days Remaining</p>
            </div>
            <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700 text-white">
              Take NEET 2026 Live Test
            </Button>
          </div>
          
          {conceptMasteryData.map((subject, index) => (
            <motion.div
              key={subject.subject}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
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
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI-Powered Study Plan
            </h4>
            <div className="space-y-2">
              <div className="bg-white rounded p-2 border-l-2 border-purple-400">
                <p className="text-sm text-gray-700">📖 Physics - Modern Physics (2h)</p>
                <p className="text-xs text-gray-500">Based on your weak areas</p>
              </div>
              <div className="bg-white rounded p-2 border-l-2 border-blue-400">
                <p className="text-sm text-gray-700">🧪 Chemistry - Organic Reactions (1.5h)</p>
                <p className="text-xs text-gray-500">High weightage topic</p>
              </div>
              <div className="bg-white rounded p-2 border-l-2 border-green-400">
                <p className="text-sm text-gray-700">🔬 Biology - Genetics Practice (1h)</p>
                <p className="text-xs text-gray-500">Quick revision needed</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-lg font-bold text-blue-700">4.5h</p>
                  <p className="text-xs text-blue-600">Today's Plan</p>
                </div>
              </div>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-lg font-bold text-green-700">94%</p>
                  <p className="text-xs text-green-600">Completion</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: 'Concept Mastery Hub',
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Multi-Modal Learning
            </h4>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-blue-50 rounded p-2 text-center">
                <Eye className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-medium">3D Visual</p>
              </div>
              <div className="bg-green-50 rounded p-2 text-center">
                <Video className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <p className="text-xs font-medium">Video Learn</p>
              </div>
              <div className="bg-purple-50 rounded p-2 text-center">
                <PenTool className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                <p className="text-xs font-medium">Summary</p>
              </div>
              <div className="bg-orange-50 rounded p-2 text-center">
                <Calculator className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                <p className="text-xs font-medium">Practice</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded p-2 border border-yellow-200">
              <p className="text-sm font-medium text-yellow-800">Current: Photoelectric Effect</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-yellow-600">Mastery Progress</span>
                <span className="text-xs font-bold text-yellow-700">85%</span>
              </div>
              <Progress value={85} className="h-1 mt-1" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Exam Readiness Tracker',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-white">75%</span>
              </div>
              <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-white px-2 py-1 text-xs">
                Ready!
              </Badge>
            </div>
            <h4 className="font-semibold text-gray-800">NEET 2026 Readiness</h4>
            <p className="text-sm text-gray-600">On track for 545+ score</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-lg p-3 border border-green-200 text-center">
              <p className="text-xl font-bold text-green-700">156</p>
              <p className="text-xs text-green-600">Days Left</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 text-center">
              <p className="text-xl font-bold text-blue-700">89</p>
              <p className="text-xs text-blue-600">Mock Tests</p>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-3 border border-red-200 text-center">
            <h5 className="font-medium text-red-800 mb-2">🚀 Champion Mode Activated</h5>
            <p className="text-xs text-red-600 mb-2">Advanced NEET 2026 preparation track</p>
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs">
              Take Live Test Now
            </Button>
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
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      {/* Dashboard Container - Increased size */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg mx-auto border transform scale-110">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">PREPZR Dashboard</h3>
              <p className="text-sm text-gray-500">India's #1 NEET Platform</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm animate-pulse">
            🏆 Live
          </Badge>
        </div>

        {/* Sliding Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="h-96 overflow-hidden"
          >
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">{slides[currentSlide].title}</h4>
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-6 -right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🎯 NEET 2026 Ready!
      </motion.div>
      
      <motion.div
        className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        ⚡ AI Powered
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 -right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        🏆 Champion
      </motion.div>
    </motion.div>
  );
};

export default EnhancedDashboardPreview;
