
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Target,
  Brain,
  Zap,
  Trophy,
  BookOpen,
  BarChart3,
  Award,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

interface SlidePreview {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  preview: React.ReactNode;
  stats: {
    completed: number;
    total: number;
    efficiency: number;
  };
}

const Enhanced3DDashboardPreview: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: SlidePreview[] = [
    {
      id: 'adaptive-plan',
      title: 'Dynamic Exam Plan',
      description: 'AI-powered study plan that adapts to your learning profile',
      icon: <Target className="w-6 h-6" />,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      stats: { completed: 8, total: 12, efficiency: 89 },
      preview: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Today's Focus</span>
            <Badge variant="outline" className="text-xs">Active</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs">Physics - Mechanics</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-xs">Chemistry - Organic</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-xs">Biology - Genetics</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'adaptive-daily',
      title: 'Adaptive Daily Plan',
      description: 'Personalized daily schedule based on your progress',
      icon: <Calendar className="w-6 h-6" />,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      stats: { completed: 6, total: 8, efficiency: 92 },
      preview: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Daily Schedule</span>
            <Badge variant="outline" className="text-xs">75% Done</Badge>
          </div>
          <div className="space-y-2">
            <div className="bg-green-100 p-2 rounded text-xs">
              <div className="font-medium">9:00 AM - Concept Review</div>
              <div className="text-gray-600">Chemistry - Bonding</div>
            </div>
            <div className="bg-blue-100 p-2 rounded text-xs">
              <div className="font-medium">11:00 AM - Practice Test</div>
              <div className="text-gray-600">Physics MCQs</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mood-based',
      title: 'Mood-Based Changes',
      description: 'Learning adjustments based on your emotional state',
      icon: <Brain className="w-6 h-6" />,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-600',
      stats: { completed: 4, total: 6, efficiency: 85 },
      preview: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Mood</span>
            <Badge variant="outline" className="text-xs bg-green-100">Motivated</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs">Challenging topics recommended</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs">Extended study session</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'concept-master',
      title: 'Multimodal Concept Master',
      description: 'Interactive learning with visual, audio, and text content',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
      stats: { completed: 12, total: 15, efficiency: 94 },
      preview: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Concepts</span>
            <Badge variant="outline" className="text-xs">80% Mastered</Badge>
          </div>
          <div className="space-y-2">
            <div className="bg-orange-100 p-2 rounded text-xs">
              <div className="font-medium">Thermodynamics</div>
              <div className="flex gap-1">
                <span className="bg-orange-500 text-white px-1 rounded">Video</span>
                <span className="bg-blue-500 text-white px-1 rounded">Interactive</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'recall-practice',
      title: 'Recall Practice',
      description: 'Spaced repetition system for long-term retention',
      icon: <Zap className="w-6 h-6" />,
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500',
      stats: { completed: 18, total: 20, efficiency: 87 },
      preview: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Recall Queue</span>
            <Badge variant="outline" className="text-xs">5 Due</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-xs">Organic Chemistry - 3 cards</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <span className="text-xs">Physics Laws - 2 cards</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exam-practice',
      title: 'Exam Practice',
      description: 'Realistic mock tests with detailed analytics',
      icon: <Trophy className="w-6 h-6" />,
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-600',
      stats: { completed: 3, total: 5, efficiency: 78 },
      preview: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Recent Tests</span>
            <Badge variant="outline" className="text-xs">78% Avg</Badge>
          </div>
          <div className="space-y-2">
            <div className="bg-teal-100 p-2 rounded text-xs">
              <div className="font-medium">NEET Mock #3</div>
              <div className="text-gray-600">Score: 142/180 (78%)</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'formula-practice',
      title: 'Formula Practice',
      description: 'Interactive formula learning and application',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-600',
      stats: { completed: 25, total: 30, efficiency: 91 },
      preview: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Formulas</span>
            <Badge variant="outline" className="text-xs">83% Mastered</Badge>
          </div>
          <div className="space-y-2">
            <div className="bg-indigo-100 p-2 rounded text-xs">
              <div className="font-medium">Kinematic Equations</div>
              <div className="text-gray-600">v = u + at</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 overflow-hidden">
      {/* Background 3D Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-xl"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Personalized Learning Experience
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI-powered study modules adapting to your unique profile
            </p>
          </div>
        </div>
        
        {/* Auto-play toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-xs"
        >
          {isAutoPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>

      {/* Main Slide Display */}
      <div className="relative z-10 h-64 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, rotateY: 45, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Card className={`h-full bg-gradient-to-br ${currentSlideData.gradient} shadow-2xl border-0 transform perspective-1000 hover:scale-105 transition-transform duration-300`}>
              <CardContent className="p-6 h-full text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      {currentSlideData.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{currentSlideData.title}</h4>
                      <p className="text-white/80 text-sm">{currentSlideData.description}</p>
                    </div>
                  </div>
                  
                  {/* Stats Display */}
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {Math.round((currentSlideData.stats.completed / currentSlideData.stats.total) * 100)}%
                    </div>
                    <div className="text-white/80 text-xs">Complete</div>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 h-32 overflow-hidden">
                  <div className="text-white">
                    {currentSlideData.preview}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-white/80 mb-1">
                    <span>Progress</span>
                    <span>{currentSlideData.stats.completed}/{currentSlideData.stats.total}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-white rounded-full h-2"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(currentSlideData.stats.completed / currentSlideData.stats.total) * 100}%` 
                      }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="relative z-10 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          className="rounded-full p-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? `bg-gradient-to-r ${slides[index].gradient} shadow-lg scale-110`
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          className="rounded-full p-2"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Efficiency Meter */}
      <div className="relative z-10 mt-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Learning Efficiency
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">
              {currentSlideData.stats.efficiency}%
            </span>
            <Badge variant="outline" className="text-xs">
              Excellent
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enhanced3DDashboardPreview;
