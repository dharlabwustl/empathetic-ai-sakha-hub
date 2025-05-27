
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Target, 
  BookOpen, 
  Brain, 
  Zap,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Star,
  Trophy,
  Award,
  Flame,
  Timer,
  BarChart3,
  Sparkles,
  Gift,
  Crown
} from 'lucide-react';
import { motion } from 'framer-motion';
import ConceptCard from '@/components/dashboard/student/ConceptCard';
import FlashcardCard from '@/components/dashboard/student/flashcards/FlashcardCard';
import { PracticeExamCard } from '@/components/dashboard/student/practice-exams/PracticeExamCard';

const TodaysPlanView = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('all');

  // Mock data for today's plan
  const todaysStats = {
    totalTasks: 12,
    completedTasks: 4,
    studyTime: 180, // minutes
    targetTime: 240, // minutes
    accuracy: 78,
    streak: 7,
    todayScore: 850
  };

  const achievements = [
    { id: 1, title: "Study Streak", description: "7 days in a row!", icon: Flame, color: "orange", earned: true },
    { id: 2, title: "Perfect Score", description: "100% accuracy achieved", icon: Trophy, color: "yellow", earned: true },
    { id: 3, title: "Speed Learner", description: "Completed ahead of time", icon: Zap, color: "blue", earned: false },
    { id: 4, title: "Night Owl", description: "Late night study session", icon: Star, color: "purple", earned: true }
  ];

  const motivationalQuotes = [
    "You're 67% closer to your goal than yesterday!",
    "Every expert was once a beginner. Keep going!",
    "Your consistency is building momentum!",
    "Small progress is still progress!"
  ];

  const timeSlots = [
    { id: 'morning', label: 'Morning (6-12 PM)', tasks: 4, color: 'bg-orange-100 text-orange-700' },
    { id: 'afternoon', label: 'Afternoon (12-6 PM)', tasks: 5, color: 'bg-blue-100 text-blue-700' },
    { id: 'evening', label: 'Evening (6-10 PM)', tasks: 3, color: 'bg-purple-100 text-purple-700' }
  ];

  const dailySuggestions = [
    {
      type: 'priority',
      title: 'Focus on Physics Mechanics',
      description: 'Complete 2 pending concept cards and practice 15 flashcards',
      urgency: 'high',
      estimatedTime: '45 min'
    },
    {
      type: 'review',
      title: 'Quick Biology Review',
      description: 'Review classification flashcards - showing low retention',
      urgency: 'medium',
      estimatedTime: '20 min'
    }
  ];

  const todaysConcepts = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      description: 'Understanding the three fundamental laws that govern motion',
      subject: 'Physics',
      difficulty: 'medium' as const,
      progress: 65,
      accuracy: 78,
      daysToGo: 2,
      totalCards: 15,
      masteredCards: 10,
      status: 'in-progress' as const
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      description: 'Key reaction mechanisms and synthesis pathways',
      subject: 'Chemistry',
      difficulty: 'hard' as const,
      progress: 30,
      accuracy: 65,
      daysToGo: 5,
      totalCards: 20,
      masteredCards: 6,
      status: 'pending' as const
    }
  ];

  const todaysFlashcards = [
    {
      id: '1',
      title: 'Physics Formulas & Constants',
      subject: 'Physics',
      totalCards: 45,
      completedCards: 32,
      masteredCards: 28,
      difficulty: 'medium' as const,
      estimatedTime: 25,
      accuracy: 85,
      daysToGo: 1,
      status: 'in-progress' as const,
      lastReviewed: 'Yesterday'
    }
  ];

  const todaysPracticeExams = [
    {
      id: '1',
      title: 'Physics Mechanics Mock Test',
      subject: 'Physics',
      topic: 'Mechanics',
      linkedConcept: 'Newton\'s Laws',
      questionCount: 30,
      duration: '45 min',
      difficulty: 'Medium' as const,
      priority: 'High' as const,
      accuracy: 82,
      attempts: 2,
      bestScore: 85,
      daysToGo: 1,
      status: 'pending' as const
    }
  ];

  const completionPercentage = (todaysStats.completedTasks / todaysStats.totalTasks) * 100;
  const timePercentage = (todaysStats.studyTime / todaysStats.targetTime) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
      <Helmet>
        <title>Today's Plan - PREPZR</title>
        <meta name="description" content="Your personalized daily study schedule" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Premium Header with Glass Effect */}
        <motion.div 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Calendar className="h-10 w-10" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Today's Study Plan</h1>
                  <p className="text-blue-100 text-lg">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-6 w-6 text-yellow-300" />
                  <span className="text-2xl font-bold">{todaysStats.todayScore}</span>
                </div>
                <p className="text-blue-100">Today's Score</p>
              </div>
            </div>

            {/* Premium Progress Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                  <span className="text-sm text-blue-100">Tasks</span>
                </div>
                <div className="text-2xl font-bold">{todaysStats.completedTasks}/{todaysStats.totalTasks}</div>
                <Progress value={completionPercentage} className="mt-2 h-2 bg-white/20" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-6 w-6 text-blue-300" />
                  <span className="text-sm text-blue-100">Study Time</span>
                </div>
                <div className="text-2xl font-bold">{todaysStats.studyTime}m</div>
                <Progress value={timePercentage} className="mt-2 h-2 bg-white/20" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-6 w-6 text-purple-300" />
                  <span className="text-sm text-blue-100">Accuracy</span>
                </div>
                <div className="text-2xl font-bold">{todaysStats.accuracy}%</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Flame className="h-6 w-6 text-orange-300" />
                  <span className="text-sm text-blue-100">Streak</span>
                </div>
                <div className="text-2xl font-bold">{todaysStats.streak} days</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements & Motivation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500 rounded-xl">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  Today's Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        achievement.earned 
                          ? 'bg-white border-yellow-200 shadow-lg transform scale-105' 
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <achievement.icon className={`h-6 w-6 ${achievement.earned ? `text-${achievement.color}-600` : 'text-gray-400'}`} />
                        {achievement.earned && <Sparkles className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Motivation Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-xl">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  Daily Motivation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
                  <p className="text-purple-800 font-medium text-center">
                    "{motivationalQuotes[0]}"
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white rounded-xl border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">67%</div>
                    <div className="text-xs text-gray-600">Weekly Goal</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl border border-purple-200">
                    <div className="text-2xl font-bold text-pink-600">Top 15%</div>
                    <div className="text-xs text-gray-600">Class Rank</div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Gift className="mr-2 h-4 w-4" />
                  Claim Daily Reward
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Smart Suggestions with Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                AI Smart Recommendations
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Premium</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailySuggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 bg-white rounded-xl border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge 
                            variant={suggestion.urgency === 'high' ? 'destructive' : 'secondary'}
                            className="capitalize"
                          >
                            {suggestion.urgency} priority
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Timer className="h-4 w-4" />
                            {suggestion.estimatedTime}
                          </div>
                        </div>
                        <h4 className="font-semibold text-lg">{suggestion.title}</h4>
                        <p className="text-gray-600">{suggestion.description}</p>
                      </div>
                      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Start Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Time Slots with Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <Button
            variant={selectedTimeSlot === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedTimeSlot('all')}
            className="px-6 py-3 rounded-xl font-medium"
          >
            All Tasks
            <Badge variant="secondary" className="ml-2">
              {todaysStats.totalTasks}
            </Badge>
          </Button>
          {timeSlots.map((slot) => (
            <Button
              key={slot.id}
              variant={selectedTimeSlot === slot.id ? 'default' : 'outline'}
              onClick={() => setSelectedTimeSlot(slot.id)}
              className="px-6 py-3 rounded-xl font-medium"
            >
              {slot.label}
              <Badge variant="secondary" className={`ml-2 ${slot.color}`}>
                {slot.tasks}
              </Badge>
            </Button>
          ))}
        </motion.div>

        {/* Content Sections with Enhanced Design */}
        <div className="space-y-8">
          {/* Concepts Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Concept Mastery
              </h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                {todaysConcepts.length} pending
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todaysConcepts.map((concept) => (
                <ConceptCard key={concept.id} {...concept} />
              ))}
            </div>
          </motion.section>

          {/* Flashcards Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Flashcard Drills
              </h2>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                {todaysFlashcards.length} scheduled
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todaysFlashcards.map((flashcard) => (
                <FlashcardCard key={flashcard.id} {...flashcard} />
              ))}
            </div>
          </motion.section>

          {/* Practice Exams Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Practice Tests
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                {todaysPracticeExams.length} due
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todaysPracticeExams.map((exam) => (
                <PracticeExamCard 
                  key={exam.id} 
                  {...exam}
                  onStart={(id) => console.log('Starting exam:', id)}
                  onViewResult={(id) => console.log('Viewing result:', id)}
                />
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default TodaysPlanView;
