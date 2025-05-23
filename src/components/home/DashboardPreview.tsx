
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Target, 
  Brain, 
  Clock, 
  Trophy, 
  TrendingUp,
  Calendar,
  Star,
  Play,
  ChevronRight,
  Zap,
  Heart,
  CheckCircle,
  AlertCircle,
  Users,
  PenTool,
  Calculator,
  FlaskConical,
  Microscope,
  Activity,
  Smile,
  Coffee,
  MessageCircle
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "Overview Dashboard",
      content: (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Good Morning, Varsha Singh! 👋</h2>
              <p className="text-gray-600">NEET 2026 • Ready to ace today's study plan?</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <Activity className="w-3 h-3 mr-1" />
                85% Ready
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Days to NEET</p>
                  <p className="text-xl font-bold">342</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Study Streak</p>
                  <p className="text-xl font-bold">23 days</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mock Score</p>
                  <p className="text-xl font-bold">685/720</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Subject Progress */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Subject Progress
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Physics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="w-20" />
                  <span className="text-sm text-gray-600">78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Chemistry</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-20" />
                  <span className="text-sm text-gray-600">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">Biology</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={92} className="w-20" />
                  <span className="text-sm text-gray-600">92%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      title: "Dynamic Study Plan",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today's Adaptive Plan
            </h3>
            <Badge className="bg-orange-100 text-orange-800">
              <Smile className="w-3 h-3 mr-1" />
              Motivated Mood
            </Badge>
          </div>

          <Card className="p-4 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Physics: Laws of Motion</h4>
              <span className="text-sm text-gray-500">9:00 AM - 10:30 AM</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Perfect for your motivated mood - tackle challenging concepts!</p>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Play className="w-3 h-3 mr-1" />
                Start Session
              </Button>
              <Badge variant="outline">High Priority</Badge>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Chemistry: Organic Reactions</h4>
              <span className="text-sm text-gray-500">11:00 AM - 12:00 PM</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Review and practice with interactive simulations</p>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Brain className="w-3 h-3 mr-1" />
                Review Mode
              </Button>
              <Badge variant="outline">Practice</Badge>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Biology: Genetics</h4>
              <span className="text-sm text-gray-500">2:00 PM - 3:30 PM</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Visual learning with diagrams and concept maps</p>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <CheckCircle className="w-3 h-3 mr-1" />
                Quick Recall
              </Button>
              <Badge variant="outline">Revision</Badge>
            </div>
          </Card>
        </div>
      )
    },
    {
      title: "Exam Readiness",
      content: (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="w-full h-full rounded-full border-8 border-gray-200">
                <div className="w-full h-full rounded-full border-8 border-green-500 border-t-transparent animate-spin"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">85%</span>
              </div>
            </div>
            <h3 className="text-xl font-bold">Exam Readiness Score</h3>
            <p className="text-gray-600">You're almost there, Varsha!</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold">Strengths</h4>
              <p className="text-sm text-gray-600">Biology, Organic Chemistry</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold">Focus Areas</h4>
              <p className="text-sm text-gray-600">Physics Mechanics</p>
            </Card>
          </div>

          <Card className="p-4">
            <h4 className="font-semibold mb-3">Recent Mock Test Performance</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Physics</span>
                <span className="font-semibold">165/180</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Chemistry</span>
                <span className="font-semibold">170/180</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Biology</span>
                <span className="font-semibold">350/360</span>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      title: "Interactive Practice",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Recall Practice
          </h3>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Physics: Newton's Laws</h4>
              <Badge className="bg-blue-100 text-blue-800">Active</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4">Test your understanding with instant feedback</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-medium mb-2">Quick Question:</p>
              <p className="text-sm">What is the relationship between force, mass, and acceleration?</p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1">Answer</Button>
              <Button size="sm" variant="outline">Skip</Button>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-3">Today's Practice Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24</div>
                <div className="text-sm text-gray-600">Questions Solved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">92%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Study Group Activity
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold">A</span>
                </div>
                <span className="text-sm">Arjun shared notes on Thermodynamics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold">P</span>
                </div>
                <span className="text-sm">Priya asked a doubt in Organic Chemistry</span>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      title: "Formula Practice",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <PenTool className="w-5 h-5" />
            Formula Lab
          </h3>

          <Card className="p-4">
            <h4 className="font-semibold mb-3">Physics Formulas</h4>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="text-center">
                <div className="text-lg font-mono mb-2">F = ma</div>
                <div className="text-sm text-gray-600">Force = Mass × Acceleration</div>
              </div>
            </div>
            <Button size="sm" className="w-full">
              <Calculator className="w-3 h-3 mr-2" />
              Practice with Examples
            </Button>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-3">Chemistry Formulas</h4>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <div className="text-center">
                <div className="text-lg font-mono mb-2">PV = nRT</div>
                <div className="text-sm text-gray-600">Ideal Gas Law</div>
              </div>
            </div>
            <Button size="sm" className="w-full" variant="outline">
              <FlaskConical className="w-3 h-3 mr-2" />
              Interactive Simulator
            </Button>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-3">Quick Formula Quiz</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Completed Today</span>
                <span className="font-semibold">8/10</span>
              </div>
              <Progress value={80} />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Keep going!</span>
                <span>2 more to go</span>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      title: "Mood-Based Plan",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Mood-Based Learning
            </h3>
            <div className="flex items-center gap-2">
              <Smile className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium">Motivated</span>
            </div>
          </div>

          <Card className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50">
            <h4 className="font-semibold mb-2">Perfect Time for Challenges!</h4>
            <p className="text-sm text-gray-600 mb-4">Your motivated mood is ideal for tackling difficult concepts and new topics.</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Take on Physics problem-solving</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Learn new Organic Chemistry reactions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Attempt mock test sections</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-3">Mood History</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Today</span>
                <div className="flex items-center gap-1">
                  <Smile className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Motivated</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Yesterday</span>
                <div className="flex items-center gap-1">
                  <Brain className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Focused</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">2 days ago</span>
                <div className="flex items-center gap-1">
                  <Coffee className="w-4 h-4 text-amber-500" />
                  <span className="text-sm">Tired</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              AI Mood Coach
            </h4>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm italic">"Great energy today, Varsha! This is the perfect time to tackle those challenging Physics numericals you've been avoiding. Your brain is ready for complex problem-solving!"</p>
            </div>
          </Card>
        </div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [pages.length]);

  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden max-w-md mx-auto h-[500px]">
      {/* Navigation dots */}
      <div className="absolute top-4 right-4 flex gap-1 z-10">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentPage ? 'bg-blue-600 w-6' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Page indicator */}
      <div className="absolute top-4 left-4 z-10">
        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
          {pages[currentPage].title}
        </Badge>
      </div>

      {/* Content */}
      <div className="h-full overflow-auto p-6 pt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {pages[currentPage].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardPreview;
