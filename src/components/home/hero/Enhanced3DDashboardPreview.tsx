import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  Zap,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Star,
  Trophy,
  Timer,
  BookmarkCheck
} from 'lucide-react';

const Enhanced3DDashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      id: 'concept-mastery',
      title: 'AI-Powered Concept Mastery',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Physics - Electromagnetism</h3>
            <Badge className="bg-green-100 text-green-700">92% Mastered</Badge>
          </div>
          
          {/* 3D Concept Visualization */}
          <div className="relative h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotateY: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <div className="relative">
                {/* Electromagnetic field visualization */}
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-70"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -inset-4 border-2 border-blue-300 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -inset-8 border border-purple-300 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
            <div className="absolute bottom-2 right-2">
              <Badge variant="outline" className="bg-white/80">3D Interactive</Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Understanding Level</span>
              <span>92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-green-50 rounded">
              <div className="text-sm font-bold text-green-600">15</div>
              <div className="text-xs text-gray-500">Concepts</div>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <div className="text-sm font-bold text-blue-600">8h</div>
              <div className="text-xs text-gray-500">Study Time</div>
            </div>
            <div className="p-2 bg-purple-50 rounded">
              <div className="text-sm font-bold text-purple-600">A+</div>
              <div className="text-xs text-gray-500">Grade</div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 'exam-readiness',
      title: 'NEET Exam Readiness Score',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <motion.div
              className="relative w-24 h-24 mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-1">
                <div className="bg-white rounded-full h-full w-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-xs text-gray-500">Ready</div>
                  </div>
                </div>
              </div>
              <motion.div
                className="absolute -inset-2 border-2 border-green-300 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-green-50 rounded">
              <CheckCircle className="h-4 w-4 text-green-500 mx-auto mb-1" />
              <div className="text-xs font-medium">Physics</div>
              <div className="text-xs text-green-600">Strong</div>
            </div>
            <div className="p-2 bg-yellow-50 rounded">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
              <div className="text-xs font-medium">Chemistry</div>
              <div className="text-xs text-yellow-600">Improving</div>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <Star className="h-4 w-4 text-blue-500 mx-auto mb-1" />
              <div className="text-xs font-medium">Biology</div>
              <div className="text-xs text-blue-600">Excellent</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Predicted Score</span>
            </div>
            <div className="text-lg font-bold text-green-600">580-620 / 720</div>
            <div className="text-xs text-gray-500">Based on current performance</div>
          </div>
        </div>
      )
    },

    {
      id: 'days-to-exam',
      title: 'Days to NEET 2024',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-6xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                45
              </div>
              <div className="text-sm text-gray-500">Days Remaining</div>
            </motion.div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-red-50 rounded">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-red-500" />
                <span className="text-sm">Final Revision</span>
              </div>
              <Badge variant="outline" className="bg-red-100 text-red-700">15 days</Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Mock Tests</span>
              </div>
              <Badge variant="outline" className="bg-orange-100 text-orange-700">20 days</Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="h-4 w-4 text-green-500" />
                <span className="text-sm">Weak Topics</span>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-700">10 days</Badge>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-red-700 mb-1">Today's Priority</div>
            <div className="text-xs text-gray-600">Focus on Chemistry weak topics and complete 2 mock tests</div>
          </div>
        </div>
      )
    },

    {
      id: 'exam-champion',
      title: 'Become an Exam Champion',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <motion.div
              className="relative w-20 h-20 mx-auto mb-3"
              animate={{ 
                rotateY: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <motion.div
                className="absolute -inset-2 border-2 border-yellow-300 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <div className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Champion Path
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Smart Study Plan</span>
              <Badge className="ml-auto bg-green-100 text-green-700">Active</Badge>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
              <Brain className="h-4 w-4 text-blue-500" />
              <span className="text-sm">AI-Powered Learning</span>
              <Badge className="ml-auto bg-blue-100 text-blue-700">Engaged</Badge>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
              <Target className="h-4 w-4 text-purple-500" />
              <span className="text-sm">Personalized Goals</span>
              <Badge className="ml-auto bg-purple-100 text-purple-700">On Track</Badge>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg text-center">
            <div className="text-sm font-medium text-yellow-700">Your Champion Score</div>
            <div className="text-2xl font-bold text-orange-600">9.2/10</div>
            <div className="text-xs text-gray-600">Excellent preparation level!</div>
          </div>
        </div>
      )
    },

    {
      id: 'flashcards',
      title: 'Smart Flashcards',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Chemistry Reactions</h3>
            <Badge className="bg-blue-100 text-blue-700">24 cards</Badge>
          </div>
          
          <motion.div
            className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-lg"
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-medium">Aldol Condensation</div>
              <div className="text-xs text-gray-500 mt-1">Tap to reveal mechanism</div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">18</div>
              <div className="text-xs text-gray-500">Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">6</div>
              <div className="text-xs text-gray-500">Learning</div>
            </div>
          </div>
          
          <Button size="sm" className="w-full">
            <Brain className="h-4 w-4 mr-2" />
            Continue Learning
          </Button>
        </div>
      )
    },

    {
      id: 'practice-exams',
      title: 'Practice Exams',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">NEET Mock Test #5</h3>
            <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Progress</span>
              <span className="text-sm font-medium">45/180 questions</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-green-50 rounded">
              <div className="text-sm font-bold text-green-600">38</div>
              <div className="text-xs text-gray-500">Correct</div>
            </div>
            <div className="p-2 bg-red-50 rounded">
              <div className="text-sm font-bold text-red-600">7</div>
              <div className="text-xs text-gray-500">Wrong</div>
            </div>
            <div className="p-2 bg-blue-50 rounded">
              <div className="text-sm font-bold text-blue-600">85%</div>
              <div className="text-xs text-gray-500">Accuracy</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <Clock className="h-4 w-4" />
            <span>2h 15m remaining</span>
          </div>
          
          <Button size="sm" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Resume Exam
          </Button>
        </div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      style={{ height: '600px' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full"
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        <Card className="h-full bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-6 h-full flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -50, rotateY: -90 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {slides[currentSlide].title}
                  </h2>
                </div>
                {slides[currentSlide].content}
              </motion.div>
            </AnimatePresence>
            
            {/* Slide indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'w-2 bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Enhanced3DDashboardPreview;
