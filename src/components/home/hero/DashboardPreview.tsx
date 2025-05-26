
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { 
  BookOpen, 
  Brain, 
  Target, 
  TrendingUp, 
  Calendar,
  Clock,
  Award,
  Zap
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Enhanced concept mastery data
  const conceptMasteryData = [
    { 
      subject: 'Physics', 
      mastered: 18, 
      total: 25, 
      percentage: 72,
      concepts: ['Mechanics', 'Optics', 'Thermodynamics', 'Electromagnetism'],
      recentConcept: 'Wave Motion'
    },
    { 
      subject: 'Chemistry', 
      mastered: 15, 
      total: 22, 
      percentage: 68,
      concepts: ['Organic Chemistry', 'Physical Chemistry', 'Inorganic Chemistry'],
      recentConcept: 'Chemical Bonding'
    },
    { 
      subject: 'Biology', 
      mastered: 20, 
      total: 23, 
      percentage: 87,
      concepts: ['Cell Biology', 'Genetics', 'Plant Physiology', 'Human Physiology'],
      recentConcept: 'Photosynthesis'
    }
  ];

  const slides = [
    {
      title: 'Concept Mastery Dashboard',
      content: (
        <div className="space-y-4">
          {/* NEET 2026 Exam Ready Badge */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1">
              NEET 2026 Ready: 75%
            </Badge>
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
                  <Brain className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-gray-700">{subject.subject}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {subject.mastered}/{subject.total}
                </span>
              </div>
              <Progress value={subject.percentage} className="h-2 mb-2" />
              <div className="flex flex-wrap gap-1">
                {subject.concepts.slice(0, 3).map((concept, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {concept}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Recent: {subject.recentConcept}
              </p>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: 'Study Analytics',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-lg font-bold text-blue-700">24h</p>
                  <p className="text-xs text-blue-600">This Week</p>
                </div>
              </div>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-lg font-bold text-green-700">89%</p>
                  <p className="text-xs text-green-600">Accuracy</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Weekly Progress
            </h4>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{day}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${Math.random() * 80 + 20}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{Math.floor(Math.random() * 4 + 2)}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Smart Recommendations',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              AI Suggestions
            </h4>
            <div className="space-y-2">
              <div className="bg-white rounded p-2 border-l-2 border-purple-400">
                <p className="text-sm text-gray-700">Focus on Organic Chemistry - 2h daily</p>
              </div>
              <div className="bg-white rounded p-2 border-l-2 border-blue-400">
                <p className="text-sm text-gray-700">Review Physics formulas before practice</p>
              </div>
              <div className="bg-white rounded p-2 border-l-2 border-green-400">
                <p className="text-sm text-gray-700">Take Biology mock test this weekend</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Today's Plan
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Physics - Waves</span>
                <Badge variant="outline" className="text-xs">45 min</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Chemistry - Reactions</span>
                <Badge variant="outline" className="text-xs">30 min</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Biology - Genetics</span>
                <Badge variant="outline" className="text-xs">40 min</Badge>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Achievements',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <Award className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">NEET 2026 Warrior</h4>
            <p className="text-sm text-gray-600">75% Ready for NEET 2026</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 text-center">
              <p className="text-2xl font-bold text-yellow-700">128</p>
              <p className="text-xs text-yellow-600">Concepts Mastered</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200 text-center">
              <p className="text-2xl font-bold text-green-700">45</p>
              <p className="text-xs text-green-600">Tests Completed</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-medium text-gray-700 mb-3">Recent Badges</h4>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-100 text-blue-800">Physics Pro</Badge>
              <Badge className="bg-green-100 text-green-800">Bio Expert</Badge>
              <Badge className="bg-purple-100 text-purple-800">Study Streak</Badge>
              <Badge className="bg-orange-100 text-orange-800">Quick Learner</Badge>
            </div>
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
      {/* Dashboard Container */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto border">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">PREPZR Dashboard</h3>
              <p className="text-xs text-gray-500">Smart Learning Platform</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 text-xs">Live</Badge>
        </div>

        {/* Sliding Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-80 overflow-hidden"
          >
            <h4 className="font-medium text-gray-800 mb-4">{slides[currentSlide].title}</h4>
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        NEET 2026 Ready!
      </motion.div>
      
      <motion.div
        className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        AI Powered
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;
