
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Brain,
  TrendingUp,
  Trophy,
  Target,
  Calendar,
  Clock,
  Flame,
  Star,
  Zap,
  ChevronRight,
  Play,
  Award,
  BarChart3
} from 'lucide-react';

const RedesignedDashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const dashboardSlides = [
    {
      title: "Performance Analytics",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg text-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                boxShadow: ["0 4px 20px rgba(59, 130, 246, 0.3)", "0 8px 30px rgba(59, 130, 246, 0.5)", "0 4px 20px rgba(59, 130, 246, 0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-200" />
                <span className="text-sm font-semibold text-blue-100">Overall Score</span>
              </div>
              <div className="text-2xl font-bold text-white">87%</div>
              <div className="text-xs text-blue-200">+12% this week</div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-lg text-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                boxShadow: ["0 4px 20px rgba(34, 197, 94, 0.3)", "0 8px 30px rgba(34, 197, 94, 0.5)", "0 4px 20px rgba(34, 197, 94, 0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-green-200" />
                <span className="text-sm font-semibold text-green-100">Rank</span>
              </div>
              <div className="text-2xl font-bold text-white">#156</div>
              <div className="text-xs text-green-200">Top 5% globally</div>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-lg text-white shadow-lg"
            animate={{
              background: ["linear-gradient(90deg, #9333ea, #ec4899)", "linear-gradient(90deg, #a855f7, #f97316)", "linear-gradient(90deg, #9333ea, #ec4899)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-semibold text-purple-100 mb-1">Study Streak</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  <Flame className="h-6 w-6 text-orange-300" />
                  28 Days
                </div>
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Award className="h-8 w-8 text-yellow-300" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      title: "Subject Performance",
      content: (
        <div className="space-y-3">
          {[
            { subject: "Physics", score: 92, color: "from-blue-500 to-blue-600" },
            { subject: "Chemistry", score: 78, color: "from-green-500 to-green-600" },
            { subject: "Biology", score: 85, color: "from-purple-500 to-purple-600" }
          ].map((item, index) => (
            <motion.div
              key={item.subject}
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-800">{item.subject}</span>
                <span className="text-sm font-bold text-gray-900">{item.score}%</span>
              </div>
              <motion.div
                className="h-2 bg-gray-200 rounded-full overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "Recent Activities",
      content: (
        <div className="space-y-3">
          {[
            { activity: "Completed Physics Chapter 12", time: "2 hours ago", icon: BookOpen, color: "text-blue-600" },
            { activity: "Solved 25 Chemistry Problems", time: "4 hours ago", icon: Brain, color: "text-green-600" },
            { activity: "Reviewed Biology Flashcards", time: "Yesterday", icon: Star, color: "text-purple-600" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
            >
              <motion.div
                className={`p-2 rounded-full bg-white shadow-sm ${item.color}`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                <item.icon className="h-4 w-4" />
              </motion.div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{item.activity}</div>
                <div className="text-xs text-gray-600">{item.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "Upcoming Goals",
      content: (
        <div className="space-y-3">
          {[
            { goal: "Complete Organic Chemistry", deadline: "3 days left", progress: 65, urgent: false },
            { goal: "Physics Mock Test", deadline: "1 day left", progress: 90, urgent: true },
            { goal: "Biology Revision", deadline: "5 days left", progress: 40, urgent: false }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`p-3 rounded-lg border-2 ${item.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-semibold ${item.urgent ? 'text-red-800' : 'text-gray-800'}`}>
                  {item.goal}
                </span>
                <Badge variant={item.urgent ? "destructive" : "secondary"} className="text-xs">
                  {item.deadline}
                </Badge>
              </div>
              <motion.div
                className="h-2 bg-gray-200 rounded-full overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={`h-full rounded-full ${item.urgent ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                />
              </motion.div>
              <div className="text-xs text-gray-600 mt-1">{item.progress}% completed</div>
            </motion.div>
          ))}
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="h-full overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl">
      <CardHeader className="pb-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <CardTitle className="text-lg font-bold text-white">Dashboard Preview</CardTitle>
          <motion.div
            className="flex space-x-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {dashboardSlides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </CardHeader>
      
      <CardContent className="p-4 h-64 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <motion.h3 
              className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"
              animate={{ color: ["#1f2937", "#4f46e5", "#1f2937"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="h-5 w-5" />
              </motion.div>
              {dashboardSlides[currentSlide].title}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {dashboardSlides[currentSlide].content}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="absolute bottom-2 right-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => navigate('/dashboard/student')}
            size="sm"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
          >
            <span className="text-xs font-semibold">View Full Dashboard</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default RedesignedDashboardOverview;
