
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Clock, 
  TrendingUp, 
  Star, 
  Calendar,
  Award,
  Zap,
  Heart,
  CheckCircle,
  BarChart3,
  FlaskConical,
  Atom,
  Dna
} from 'lucide-react';

const DashboardPreview = () => {
  const [currentView, setCurrentView] = useState(0);

  const views = [
    {
      id: 'overview',
      title: 'Dashboard Overview',
      content: (
        <div className="space-y-4">
          {/* Header with student info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                V
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Varsha Sharma</h3>
                <p className="text-sm text-gray-600">NEET 2026 Aspirant</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Day 45 Streak 🔥</Badge>
          </div>

          {/* Exam Goal */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-900">NEET 2026</h4>
                  <p className="text-sm text-blue-700">542 days remaining</p>
                </div>
                <div className="ml-auto">
                  <span className="text-2xl font-bold text-blue-900">78%</span>
                  <p className="text-xs text-blue-700">Readiness</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subject Performance */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-green-200">
              <CardContent className="p-3 text-center">
                <FlaskConical className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h5 className="font-medium text-sm">Chemistry</h5>
                <Progress value={85} className="h-2 mt-2" />
                <span className="text-xs text-green-600 font-medium">85%</span>
              </CardContent>
            </Card>
            <Card className="border-blue-200">
              <CardContent className="p-3 text-center">
                <Atom className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <h5 className="font-medium text-sm">Physics</h5>
                <Progress value={72} className="h-2 mt-2" />
                <span className="text-xs text-blue-600 font-medium">72%</span>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardContent className="p-3 text-center">
                <Dna className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <h5 className="font-medium text-sm">Biology</h5>
                <Progress value={90} className="h-2 mt-2" />
                <span className="text-xs text-purple-600 font-medium">90%</span>
              </CardContent>
            </Card>
          </div>

          {/* Today's Tasks */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Today's Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="line-through text-gray-500">Organic Chemistry - Aldehydes</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Physics - Waves Motion (30 min)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Brain className="w-4 h-4 text-purple-500" />
                <span>Biology - Genetics Practice Test</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'study-plan',
      title: 'AI Study Plan',
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-gray-900">Personalized for Varsha</h3>
            <p className="text-sm text-gray-600">NEET 2026 • Physics, Chemistry, Biology</p>
          </div>

          <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-6 h-6 text-purple-600" />
                <h4 className="font-semibold">AI Recommendations</h4>
              </div>
              <p className="text-sm text-gray-700 mb-2">Based on your mood and performance:</p>
              <ul className="text-xs space-y-1">
                <li>• Focus on Physics numericals today</li>
                <li>• Review Chemistry reactions from yesterday</li>
                <li>• Practice Biology diagrams (weak area)</li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Study Time</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">4.5h</p>
                <p className="text-xs text-gray-500">Today's target: 5h</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Concepts</span>
                </div>
                <p className="text-2xl font-bold text-green-600">8/10</p>
                <p className="text-xs text-gray-500">Completed today</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-3">
              <h5 className="font-medium text-sm mb-2">Weekly Schedule</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span>Physics</span>
                  <span className="text-blue-600 font-medium">12h/week</span>
                </div>
                <Progress value={70} className="h-1" />
                <div className="flex justify-between items-center text-xs">
                  <span>Chemistry</span>
                  <span className="text-green-600 font-medium">10h/week</span>
                </div>
                <Progress value={85} className="h-1" />
                <div className="flex justify-between items-center text-xs">
                  <span>Biology</span>
                  <span className="text-purple-600 font-medium">8h/week</span>
                </div>
                <Progress value={95} className="h-1" />
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'concepts',
      title: 'Concept Mastery',
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-gray-900">Concept Study</h3>
            <p className="text-sm text-gray-600">Deep understanding for NEET 2026</p>
          </div>

          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Atom className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Physics - Wave Motion</h4>
                  <p className="text-xs text-gray-600">Currently studying</p>
                </div>
                <Badge className="ml-auto bg-blue-100 text-blue-800">85% mastery</Badge>
              </div>
              <Progress value={85} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-gray-600">
                <span>5 concepts completed</span>
                <span>2 remaining</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card className="border-green-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Chemistry</span>
                </div>
                <p className="text-sm font-semibold">Organic Reactions</p>
                <Progress value={92} className="h-1 mt-2" />
                <p className="text-xs text-green-600 mt-1">92% complete</p>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Dna className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Biology</span>
                </div>
                <p className="text-sm font-semibold">Cell Division</p>
                <Progress value={78} className="h-1 mt-2" />
                <p className="text-xs text-purple-600 mt-1">78% complete</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-3">
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                Recent Achievements
              </h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Mastered Thermodynamics concepts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Completed all Genetics flashcards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Solved 25 Organic Chemistry problems</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'practice',
      title: 'Interactive Practice',
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-gray-900">Practice & Recall</h3>
            <p className="text-sm text-gray-600">Interactive learning for NEET success</p>
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-green-600" />
                <h4 className="font-semibold">Quick Recall Test</h4>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <p className="text-sm text-gray-700 mb-3">Physics - Kinematics</p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold text-green-600">8/10</p>
                  <p className="text-xs text-gray-600">Correct</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-600">2:45</p>
                  <p className="text-xs text-gray-600">Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-2">
            <Card className="border-blue-200">
              <CardContent className="p-3 text-center">
                <BookOpen className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-medium">Flashcards</p>
                <p className="text-sm font-bold text-blue-600">45</p>
                <p className="text-xs text-gray-500">Due today</p>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardContent className="p-3 text-center">
                <Brain className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <p className="text-xs font-medium">Quiz</p>
                <p className="text-sm font-bold text-purple-600">92%</p>
                <p className="text-xs text-gray-500">Last score</p>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardContent className="p-3 text-center">
                <Target className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-xs font-medium">Practice</p>
                <p className="text-sm font-bold text-green-600">12</p>
                <p className="text-xs text-gray-500">Problems</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-3">
              <h5 className="font-medium text-sm mb-2">Subject Performance</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs flex items-center gap-1">
                    <Dna className="w-3 h-3 text-purple-600" />
                    Biology
                  </span>
                  <span className="text-xs font-medium text-purple-600">95% accuracy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-green-600" />
                    Chemistry
                  </span>
                  <span className="text-xs font-medium text-green-600">88% accuracy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs flex items-center gap-1">
                    <Atom className="w-3 h-3 text-blue-600" />
                    Physics
                  </span>
                  <span className="text-xs font-medium text-blue-600">82% accuracy</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'analytics',
      title: 'Performance Analytics',
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-gray-900">Varsha's Analytics</h3>
            <p className="text-sm text-gray-600">NEET 2026 Progress Tracking</p>
          </div>

          <Card className="bg-gradient-to-r from-amber-50 to-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-6 h-6 text-amber-600" />
                <h4 className="font-semibold">Exam Readiness Score</h4>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">78%</p>
                <p className="text-sm text-gray-600">Ready for NEET 2026</p>
                <Progress value={78} className="h-2 mt-2" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Weekly Growth</span>
                </div>
                <p className="text-xl font-bold text-green-600">+12%</p>
                <p className="text-xs text-gray-500">Improvement rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Mock Scores</span>
                </div>
                <p className="text-xl font-bold text-purple-600">485</p>
                <p className="text-xs text-gray-500">Latest NEET mock</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-3">
              <h5 className="font-medium text-sm mb-2">Subject-wise Analysis</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Biology</span>
                  <div className="flex items-center gap-2">
                    <Progress value={90} className="h-1 w-16" />
                    <span className="text-xs font-medium">90%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">Chemistry</span>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="h-1 w-16" />
                    <span className="text-xs font-medium">85%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">Physics</span>
                  <div className="flex items-center gap-2">
                    <Progress value={72} className="h-1 w-16" />
                    <span className="text-xs font-medium">72%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                Mood Impact
              </h5>
              <div className="text-xs space-y-1">
                <p>• Best performance when <span className="font-medium text-green-600">motivated</span></p>
                <p>• Focus on breaks when <span className="font-medium text-amber-600">stressed</span></p>
                <p>• Morning study sessions most effective</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'mood-plan',
      title: 'Mood-Based Planning',
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-gray-900">Smart Mood Adaptation</h3>
            <p className="text-sm text-gray-600">Personalized for Varsha's wellbeing</p>
          </div>

          <Card className="bg-gradient-to-r from-pink-50 to-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-6 h-6 text-pink-600" />
                <div>
                  <h4 className="font-semibold">Current Mood: Motivated</h4>
                  <p className="text-sm text-gray-600">Perfect for challenging topics!</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Optimal Study Mode</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h5 className="font-medium text-sm mb-3">AI Recommendations</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Tackle Physics numericals now</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>Extended 90-min study sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>Practice challenging Biology diagrams</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card className="border-green-200">
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-sm font-medium">Energy Level</p>
                <p className="text-lg font-bold text-green-600">High</p>
              </CardContent>
            </Card>
            <Card className="border-blue-200">
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Focus Score</p>
                <p className="text-lg font-bold text-blue-600">9/10</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-3">
              <h5 className="font-medium text-sm mb-2">Mood-Based Schedule</h5>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 px-2 bg-green-50 rounded">
                  <span>9:00 AM - Physics (High Energy)</span>
                  <Badge className="bg-green-100 text-green-700 text-xs">Optimal</Badge>
                </div>
                <div className="flex justify-between items-center py-1 px-2 bg-blue-50 rounded">
                  <span>11:00 AM - Chemistry Practice</span>
                  <Badge className="bg-blue-100 text-blue-700 text-xs">Good</Badge>
                </div>
                <div className="flex justify-between items-center py-1 px-2 bg-purple-50 rounded">
                  <span>2:00 PM - Biology Review</span>
                  <Badge className="bg-purple-100 text-purple-700 text-xs">Moderate</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              <h5 className="font-medium text-sm mb-2">Wellness Tracking</h5>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <p className="font-medium">Sleep</p>
                  <p className="text-green-600 font-bold">7.5h</p>
                </div>
                <div>
                  <p className="font-medium">Stress</p>
                  <p className="text-yellow-600 font-bold">Low</p>
                </div>
                <div>
                  <p className="font-medium">Breaks</p>
                  <p className="text-blue-600 font-bold">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % views.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Phone-like header */}
      <div className="bg-gray-900 px-4 py-2 flex justify-between items-center">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-white text-xs font-medium">Sakha AI Dashboard</div>
        <div className="w-6"></div>
      </div>

      {/* Content */}
      <div className="h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="p-4 h-full"
          >
            <div className="mb-3">
              <h2 className="font-bold text-lg text-gray-900">{views[currentView].title}</h2>
            </div>
            {views[currentView].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 py-3 bg-gray-50">
        {views.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentView(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentView ? 'bg-purple-600 w-6' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPreview;
