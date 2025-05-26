
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Zap, 
  Brain,
  Trophy,
  Star,
  CheckCircle,
  Calendar,
  Award
} from 'lucide-react';

const Enhanced3DDashboardPreview = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [examReadiness, setExamReadiness] = useState(65);
  const [championLevel, setChampionLevel] = useState(78);

  // Animate the progress values
  useEffect(() => {
    const interval = setInterval(() => {
      setExamReadiness(prev => prev === 65 ? 68 : 65);
      setChampionLevel(prev => prev === 78 ? 82 : 78);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Today's Progress",
      icon: <Target className="h-5 w-5" />,
      value: "4/6 Tasks",
      trend: "+12%",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Study Streak",
      icon: <Zap className="h-5 w-5" />,
      value: "12 Days",
      trend: "+2 days",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Concepts Mastered",
      icon: <Brain className="h-5 w-5" />,
      value: "48/60",
      trend: "+5 this week",
      color: "from-green-500 to-emerald-600"
    }
  ];

  const subjects = [
    { name: "Physics", progress: 75, color: "bg-blue-500" },
    { name: "Chemistry", progress: 60, color: "bg-green-500" },
    { name: "Biology", progress: 85, color: "bg-purple-500" }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* 3D Container */}
      <motion.div
        className="relative perspective-1000"
        initial={{ rotateY: -15, rotateX: 8 }}
        animate={{ rotateY: 0, rotateX: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Main Dashboard Container */}
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-800/20 overflow-hidden transform-gpu"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateY(-8deg) rotateX(4deg)'
          }}
          whileHover={{
            transform: 'rotateY(-2deg) rotateX(1deg) scale(1.02)',
            transition: { duration: 0.3 }
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">NEET Dashboard</h3>
                <p className="text-indigo-100 text-sm">Your personalized study companion</p>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-300" />
                <span className="text-sm font-medium">Rank #1,247</span>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-6 space-y-6">
            {/* Exam Readiness and Champion Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Exam Readiness */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5 text-blue-600" />
                      Exam Readiness
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-700">{examReadiness}%</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                        NEET Ready
                      </Badge>
                    </div>
                    <Progress value={examReadiness} className="h-2 bg-blue-100" />
                    <p className="text-sm text-blue-600">Predicted rank: 1,000-1,500</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Champion Level */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Award className="h-5 w-5 text-yellow-600" />
                      Champion Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-yellow-700">{championLevel}%</span>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                        Gold Tier
                      </Badge>
                    </div>
                    <Progress value={championLevel} className="h-2 bg-yellow-100" />
                    <p className="text-sm text-yellow-600">Next milestone: 85% for Platinum</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  onHoverStart={() => setActiveCard(index)}
                  className="cursor-pointer"
                >
                  <Card className={`h-full transition-all duration-300 ${
                    activeCard === index ? 'ring-2 ring-indigo-500 shadow-lg scale-105' : ''
                  }`}>
                    <CardContent className="p-4">
                      <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${card.color} text-white mb-3`}>
                        {card.icon}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{card.title}</p>
                        <p className="text-xl font-bold">{card.value}</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {card.trend}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Subject Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Subject Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{subject.name}</span>
                        <span className="text-sm text-gray-600">{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${subject.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.progress}%` }}
                          transition={{ duration: 1, delay: 1 + index * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex gap-2"
            >
              <Button size="sm" className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600">
                <Calendar className="h-4 w-4 mr-2" />
                Today's Plan
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Practice Test
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-3 shadow-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Star className="h-6 w-6 text-white" />
        </motion.div>

        <motion.div
          className="absolute -bottom-2 -left-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full p-2 shadow-lg"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="h-4 w-4 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Enhanced3DDashboardPreview;
