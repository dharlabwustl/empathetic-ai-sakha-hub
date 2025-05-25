
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Brain, 
  Target, 
  Calendar, 
  BookOpen, 
  Zap, 
  Trophy, 
  TrendingUp,
  Clock,
  Star,
  Award,
  Flame,
  ChevronRight,
  Play,
  BarChart3,
  Eye,
  Lightbulb,
  Repeat,
  Calculator,
  FileText,
  CheckCircle,
  Crown
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Dynamic Learning Profile",
      subtitle: "AI adapts to your unique learning style",
      icon: <Brain className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  AR
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Aarav's Learning DNA</h3>
                <p className="text-sm text-muted-foreground">Visual-Kinesthetic Learner</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Zap className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Visual Learning</span>
              </div>
              <div className="text-2xl font-bold text-blue-700">87%</div>
              <Progress value={87} className="h-2 mt-2" />
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Focus Mode</span>
              </div>
              <div className="text-2xl font-bold text-purple-700">92%</div>
              <Progress value={92} className="h-2 mt-2" />
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold">AI Recommendation</span>
            </div>
            <p className="text-sm text-gray-700">
              "Start with 3D molecular structures for Chemistry today. Your visual learning peaks at 10 AM!"
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Daily Adaptive Plans",
      subtitle: "Smart schedules that evolve with your progress",
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Today's Smart Plan</h3>
            <Badge className="bg-orange-100 text-orange-700 border-orange-200">
              <Flame className="w-3 h-3 mr-1" />
              15-day streak
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium text-green-800">Physics: Motion Laws</p>
                <p className="text-xs text-green-600">Completed • 45 min • +85 XP</p>
              </div>
              <div className="text-xs text-green-700 font-medium">100%</div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Clock className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-blue-800">Chemistry: Organic Reactions</p>
                <p className="text-xs text-blue-600">In Progress • 30 min remaining</p>
              </div>
              <div className="text-xs text-blue-700 font-medium">65%</div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Play className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Biology: Cell Division</p>
                <p className="text-xs text-gray-600">Next • 40 min • Optimized for 2 PM</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold">Performance Insight</span>
            </div>
            <p className="text-sm text-gray-700">
              "You're 23% faster at problem-solving this week. Keep the momentum!"
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Concept Mastery Hub",
      subtitle: "Multi-sensory learning with 3D, visuals, videos",
      icon: <BookOpen className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Newton's Laws of Motion</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white/20 p-2 rounded text-center">
                <div className="w-8 h-8 bg-white/30 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="text-xs">3D Visual</div>
              </div>
              <div className="bg-white/20 p-2 rounded text-center">
                <div className="w-8 h-8 bg-white/30 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <Play className="w-4 h-4" />
                </div>
                <div className="text-xs">Video</div>
              </div>
              <div className="bg-white/20 p-2 rounded text-center">
                <div className="w-8 h-8 bg-white/30 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs">Summary</div>
              </div>
              <div className="bg-white/20 p-2 rounded text-center">
                <div className="w-8 h-8 bg-white/30 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <div className="text-xs">Practice</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Mastery Level</span>
              </div>
              <div className="text-2xl font-bold text-green-700 mb-2">94%</div>
              <Progress value={94} className="h-2" />
              <p className="text-xs text-gray-600 mt-2">Expert level achieved!</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Time Spent</span>
              </div>
              <div className="text-2xl font-bold text-blue-700 mb-2">2.5h</div>
              <div className="text-xs text-gray-600">Across 4 sessions</div>
            </Card>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-800">Concept Unlocked!</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              You can now tackle "Circular Motion" concepts
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Smart Spaced Repetition",
      subtitle: "Interactive recall system for long-term retention",
      icon: <Repeat className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recall Accuracy Tracker</h3>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
              <Brain className="w-3 h-3 mr-1" />
              AI Optimized
            </Badge>
          </div>
          
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium">Chemical Reactions</h4>
                <p className="text-sm text-gray-600">Due for review in 2 hours</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-700">89%</div>
                <div className="text-xs text-purple-600">Accuracy</div>
              </div>
            </div>
            <Progress value={89} className="h-2 mb-3" />
            <div className="flex justify-between text-xs text-gray-600">
              <span>Last reviewed: 2 days ago</span>
              <span>Next: Perfect timing</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center bg-green-50 border-green-200">
              <div className="text-xl font-bold text-green-700">156</div>
              <div className="text-xs text-green-600">Cards Mastered</div>
            </Card>
            <Card className="p-3 text-center bg-orange-50 border-orange-200">
              <div className="text-xl font-bold text-orange-700">23</div>
              <div className="text-xs text-orange-600">Due Today</div>
            </Card>
            <Card className="p-3 text-center bg-blue-50 border-blue-200">
              <div className="text-xl font-bold text-blue-700">4.2x</div>
              <div className="text-xs text-blue-600">Retention Boost</div>
            </Card>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Smart Insight</span>
            </div>
            <p className="text-sm text-blue-700">
              "Your recall is strongest for visual concepts. We've optimized your review schedule!"
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Formula Practice Lab",
      subtitle: "Interactive problem-solving with step guidance",
      icon: <Calculator className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-5 h-5" />
              <span className="font-semibold">Quadratic Equations</span>
            </div>
            <div className="bg-white/20 p-3 rounded font-mono text-center text-lg">
              ax² + bx + c = 0
            </div>
            <div className="text-xs mt-2 text-center opacity-90">
              Interactive formula with live examples
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Accuracy Rate</span>
              </div>
              <div className="text-3xl font-bold text-green-700 mb-2">92%</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+8% this week</span>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Speed Score</span>
              </div>
              <div className="text-3xl font-bold text-blue-700 mb-2">2.3x</div>
              <div className="text-xs text-blue-600">Faster than average</div>
            </Card>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Physics Formulas</span>
              </div>
              <div className="text-sm text-green-700 font-medium">34/40 mastered</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Chemistry Equations</span>
              </div>
              <div className="text-sm text-blue-700 font-medium">18/25 in progress</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-800">Achievement Unlocked!</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              "Formula Speed Demon" - Solved 50 problems under 2 minutes
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Practice Exam Engine",
      subtitle: "Realistic exam simulation with instant feedback",
      icon: <FileText className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">NEET Mock Test #47</h3>
            <Badge className="bg-red-100 text-red-700 border-red-200">
              <Clock className="w-3 h-3 mr-1" />
              Live Exam
            </Badge>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-700">156/180</div>
                <div className="text-xs text-red-600">Current Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-700">02:15</div>
                <div className="text-xs text-orange-600">Time Left</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-700">94%</div>
                <div className="text-xs text-green-600">Accuracy</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm">Physics</span>
              <div className="flex items-center gap-2">
                <Progress value={85} className="w-20 h-2" />
                <span className="text-sm font-medium text-green-700">34/40</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm">Chemistry</span>
              <div className="flex items-center gap-2">
                <Progress value={90} className="w-20 h-2" />
                <span className="text-sm font-medium text-blue-700">36/40</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm">Biology</span>
              <div className="flex items-center gap-2">
                <Progress value={95} className="w-20 h-2" />
                <span className="text-sm font-medium text-purple-700">38/40</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Performance Trend</span>
            </div>
            <p className="text-sm text-blue-700">
              "Your biology scores improved 12% in last 5 tests. Keep it up!"
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Daily Readiness Meter",
      subtitle: "Track and improve your exam preparedness",
      icon: <TrendingUp className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${86 * 2.51} 251.2`}
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">86%</div>
                  <div className="text-xs text-gray-600">Ready</div>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-lg">Exam Readiness Score</h3>
            <p className="text-sm text-gray-600">Updated 5 minutes ago</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Strengths</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Biology</span>
                  <span className="font-medium text-green-700">94%</span>
                </div>
                <div className="flex justify-between">
                  <span>Chemistry</span>
                  <span className="font-medium text-green-700">91%</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-orange-50 border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium">Focus Areas</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Physics</span>
                  <span className="font-medium text-orange-700">78%</span>
                </div>
                <div className="flex justify-between">
                  <span>Mathematics</span>
                  <span className="font-medium text-orange-700">82%</span>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Daily Action Plan</span>
            </div>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Complete 2 Physics practice sets</li>
              <li>• Review last week's weak topics</li>
              <li>• Take 30-min Biology revision quiz</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Become Exam Champion",
      subtitle: "Your journey from student to topper",
      icon: <Crown className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-xl">Champion Level Unlocked!</h3>
            <p className="text-sm text-gray-600">Rank #47 in your batch</p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-700">2,847</div>
                <div className="text-xs text-orange-600">XP Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-700">Level 12</div>
                <div className="text-xs text-yellow-600">Champion Tier</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-purple-800">Speed Solver</p>
                <p className="text-xs text-purple-600">Solved 100 problems in record time</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-green-800">Consistency King</p>
                <p className="text-xs text-green-600">30-day study streak maintained</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-800">Concept Master</p>
                <p className="text-xs text-blue-600">Mastered all Physics chapters</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg text-center">
            <h4 className="font-bold mb-2">🎯 Next Target: AIR Under 100</h4>
            <p className="text-sm opacity-90">
              You're just 47 ranks away from your dream goal!
            </p>
            <div className="mt-3">
              <Progress value={78} className="h-2 bg-white/20" />
              <p className="text-xs mt-1 opacity-80">78% progress towards target</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full lg:w-1/2 flex justify-center lg:justify-end"
    >
      <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Dashboard Container */}
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  {slides[currentSlide].icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{slides[currentSlide].title}</h3>
                  <p className="text-xs opacity-90">{slides[currentSlide].subtitle}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 h-96 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                {slides[currentSlide].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Floating elements for premium feel */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: 1
          }}
        >
          <Star className="w-4 h-4 text-white" />
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            scale: [1, 1.2, 1],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            delay: 0.5
          }}
        >
          <Zap className="w-3 h-3 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
