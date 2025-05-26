
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  Target, 
  TrendingUp, 
  Award, 
  Clock,
  Zap,
  ChevronLeft,
  ChevronRight,
  Mic,
  Play,
  Star,
  Trophy,
  BarChart3
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const sections = [
    {
      title: "Concept Mastery",
      icon: <Brain className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Physics - Mechanics</span>
            <Badge variant="secondary" className="text-xs">85% Complete</Badge>
          </div>
          <Progress value={85} className="h-2" />
          <div className="text-xs text-gray-600">Next: Work & Energy</div>
        </div>
      )
    },
    {
      title: "Recall Practice",
      icon: <Zap className="w-5 h-5" />,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Chemistry Formulas</span>
            <Badge variant="secondary" className="text-xs">12 Due</Badge>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs">Quick Review</Button>
            <Button size="sm" className="text-xs">Start Practice</Button>
          </div>
        </div>
      )
    },
    {
      title: "Practice Exam",
      icon: <Target className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">NEET Mock Test #5</span>
            <Badge variant="secondary" className="text-xs">180 mins</Badge>
          </div>
          <div className="text-xs text-gray-600">Previous Score: 78%</div>
          <Button size="sm" className="w-full text-xs">Take Exam</Button>
        </div>
      )
    },
    {
      title: "Formula Practice",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Integration Rules</span>
            <Badge variant="secondary" className="text-xs">8/15 Mastered</Badge>
          </div>
          <Progress value={53} className="h-2" />
          <div className="text-xs text-gray-600">Weak Area Identified</div>
        </div>
      )
    },
    {
      title: "Exam Champions",
      icon: <Trophy className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Top 5% This Week</span>
            <Badge variant="secondary" className="text-xs bg-yellow-100">Rank #127</Badge>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>95% Accuracy Rate</span>
          </div>
        </div>
      )
    },
    {
      title: "Analytics Hub",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Study Efficiency</span>
            <Badge variant="secondary" className="text-xs">92%</Badge>
          </div>
          <div className="text-xs text-gray-600">+15% from last week</div>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>
      )
    },
    {
      title: "Performance Track",
      icon: <Award className="w-5 h-5" />,
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <Badge variant="secondary" className="text-xs">76%</Badge>
          </div>
          <Progress value={76} className="h-2" />
          <div className="text-xs text-gray-600">On track for target score</div>
        </div>
      )
    }
  ];

  const handleVoiceCommand = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Voice Command Button for Dashboard */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -top-12 right-4 z-10"
      >
        <Button
          onClick={handleVoiceCommand}
          variant="outline"
          size="sm"
          className={`flex items-center gap-2 rounded-full transition-all duration-300 shadow-lg ${
            isListening 
              ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Mic className={`w-3 h-3 ${isListening ? 'animate-pulse' : ''}`} />
          <span className="text-xs font-medium">
            {isListening ? 'Listening...' : 'Voice Control'}
          </span>
        </Button>
      </motion.div>

      {/* Mock Dashboard Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Mock Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Student Dashboard</h3>
              <p className="text-blue-100 text-sm">Welcome back, Priya!</p>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">P</span>
            </div>
          </div>
        </div>

        {/* Dynamic Content Section */}
        <div className="p-6 min-h-[200px]">
          <div className="relative">
            {/* Navigation Arrows */}
            <Button
              onClick={prevSection}
              variant="ghost"
              size="sm"
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={nextSection}
              variant="ghost"
              size="sm"
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Main Content Card */}
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className={`${sections[currentSection].bgColor} border-l-4 border-l-${sections[currentSection].color.split('-')[1]}-500`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${sections[currentSection].color} text-white`}>
                      {sections[currentSection].icon}
                    </div>
                    {sections[currentSection].title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {sections[currentSection].content}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Section Indicators */}
          <div className="flex justify-center gap-1 mt-4">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentSection ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mock Stats Footer */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">89%</div>
              <div className="text-xs text-gray-600">Accuracy</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">2.5h</div>
              <div className="text-xs text-gray-600">Daily Avg</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">#23</div>
              <div className="text-xs text-gray-600">Rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
      >
        <Star className="w-4 h-4 text-white" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-4 -right-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
      >
        <Trophy className="w-4 h-4 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;
