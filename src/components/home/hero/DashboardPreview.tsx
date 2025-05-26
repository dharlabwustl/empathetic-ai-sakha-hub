
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Target, 
  Brain, 
  TrendingUp, 
  CheckCircle2,
  Play,
  Users,
  Award,
  Calendar,
  Clock,
  BarChart3,
  Lightbulb
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Dynamic Plan as per Your Learner Profile",
      description: "AI analyzes your learning style and creates personalized study plans",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Visual Learner Profile</h4>
                <p className="text-xs text-gray-600">Analytical • Fast-paced • Visual</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded">
                <span className="text-blue-600 font-medium">4-6 hrs/day</span>
                <p className="text-gray-500">Study Duration</p>
              </div>
              <div className="bg-white p-2 rounded">
                <span className="text-purple-600 font-medium">Evening</span>
                <p className="text-gray-500">Peak Hours</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Daily Adaptive Plans",
      description: "Smart scheduling that adapts to your progress and performance",
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                Today's Plan
              </h4>
              <Badge className="bg-green-100 text-green-700 text-xs">75% Complete</Badge>
            </div>
            <div className="space-y-2">
              {[
                { subject: "Physics", time: "45 min", status: "completed" },
                { subject: "Mathematics", time: "60 min", status: "active" },
                { subject: "Chemistry", time: "30 min", status: "pending" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white rounded text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <span className="font-medium">{item.subject}</span>
                  </div>
                  <span className="text-gray-500">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Concept Mastery with Multi-Techniques",
      description: "3D visuals, videos, summaries - learn through multiple methods",
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-600" />
              Newton's Laws of Motion
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: "3D Visual", icon: "🎯", color: "bg-blue-100 text-blue-700" },
                { type: "Video", icon: "📹", color: "bg-red-100 text-red-700" },
                { type: "Summary", icon: "📝", color: "bg-green-100 text-green-700" },
                { type: "Practice", icon: "⚡", color: "bg-yellow-100 text-yellow-700" }
              ].map((method, i) => (
                <div key={i} className={`p-2 rounded text-xs ${method.color} text-center`}>
                  <div className="text-lg mb-1">{method.icon}</div>
                  <span className="font-medium">{method.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Recall Accuracy with Interactive Spaced Repetition",
      description: "AI-powered spaced repetition for optimal memory retention",
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-600" />
                Recall Performance
              </h4>
              <Badge className="bg-orange-100 text-orange-700 text-xs">89% Accuracy</Badge>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Overall Retention</span>
                  <span className="font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-white p-2 rounded text-center">
                  <div className="font-bold text-green-600">92%</div>
                  <div className="text-gray-500">Physics</div>
                </div>
                <div className="bg-white p-2 rounded text-center">
                  <div className="font-bold text-blue-600">87%</div>
                  <div className="text-gray-500">Math</div>
                </div>
                <div className="bg-white p-2 rounded text-center">
                  <div className="font-bold text-purple-600">88%</div>
                  <div className="text-gray-500">Chemistry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Formula Practice",
      description: "Interactive formula practice with step-by-step guidance",
      content: (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600" />
              Formula Mastery
            </h4>
            <div className="bg-white p-3 rounded border-2 border-dashed border-indigo-200">
              <div className="text-center mb-2">
                <div className="text-sm font-mono bg-gray-100 p-2 rounded">
                  F = ma
                </div>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>F = Force</span>
                  <span className="text-green-600">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>m = Mass</span>
                  <span className="text-green-600">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>a = Acceleration</span>
                  <span className="text-blue-600">?</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Practice Exam",
      description: "Realistic exam simulations with detailed performance analytics",
      content: (
        <div className="space-y-4">
          <div className="bg-cyan-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Award className="h-4 w-4 text-cyan-600" />
                Mock Test Results
              </h4>
              <Badge className="bg-cyan-100 text-cyan-700 text-xs">85/100</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Physics: 32/40</span>
                <span className="text-green-600 font-medium">80%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Chemistry: 28/30</span>
                <span className="text-blue-600 font-medium">93%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Mathematics: 25/30</span>
                <span className="text-orange-600 font-medium">83%</span>
              </div>
              <div className="mt-3 p-2 bg-white rounded text-xs">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-600 font-medium">+5% improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Improve Exam Readiness Everyday",
      description: "Track your daily progress and readiness score",
      content: (
        <div className="space-y-4">
          <div className="bg-teal-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-teal-600" />
                Exam Readiness
              </h4>
              <Badge className="bg-teal-100 text-teal-700 text-xs">72% Ready</Badge>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Current Readiness</span>
                  <span className="font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded">
                  <div className="font-bold text-green-600">+3%</div>
                  <div className="text-gray-500">This Week</div>
                </div>
                <div className="bg-white p-2 rounded">
                  <div className="font-bold text-blue-600">45 days</div>
                  <div className="text-gray-500">To Exam</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Become Exam Champion",
      description: "Achieve your target score with our proven methodology",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-semibold text-sm text-orange-800">Champion Path</h4>
            </div>
            <div className="space-y-2">
              {[
                { milestone: "Foundation Strong", progress: 100, color: "bg-green-500" },
                { milestone: "Concept Mastery", progress: 85, color: "bg-blue-500" },
                { milestone: "Speed & Accuracy", progress: 70, color: "bg-orange-500" },
                { milestone: "Exam Readiness", progress: 45, color: "bg-purple-500" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-2 rounded">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{item.milestone}</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${item.color}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
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
  }, [slides.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <Card className="w-full h-[400px] bg-white dark:bg-gray-900 shadow-2xl border-0 overflow-hidden">
        <CardContent className="p-0 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">PREPZR Dashboard</h3>
                      <p className="text-xs opacity-90">Your Personalized Learning Hub</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                    AI-Powered
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="mb-4">
                  <h4 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                    {slides[currentSlide].title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {slides[currentSlide].description}
                  </p>
                </div>
                
                {slides[currentSlide].content}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-purple-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
          >
            →
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardPreview;
