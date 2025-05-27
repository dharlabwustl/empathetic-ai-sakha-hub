
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Award,
  Trophy,
  Flame
} from 'lucide-react';
import { motion } from 'framer-motion';
import ConceptCard from '@/components/dashboard/student/ConceptCard';
import FlashcardCard from '@/components/dashboard/student/flashcards/FlashcardCard';
import { PracticeExamCard } from '@/components/dashboard/student/practice-exams/PracticeExamCard';

const TodaysPlanView = () => {
  const [activeSection, setActiveSection] = useState('concepts');

  // Mock data for today's plan
  const todaysStats = {
    totalTasks: 12,
    completedTasks: 4,
    studyTime: 180, // minutes
    targetTime: 240, // minutes
    accuracy: 78,
    streak: 5,
    dailyScore: 340,
    targetScore: 500
  };

  // Smart suggestions based on pending activities
  const smartSuggestions = [
    {
      id: '1',
      type: 'urgent',
      title: 'Complete Physics Mechanics Concept',
      description: 'Due today - High priority for exam prep',
      actionText: 'Study Now',
      points: 50
    },
    {
      id: '2',
      type: 'review',
      title: 'Review Biology Flashcards',
      description: 'Low retention rate detected',
      actionText: 'Quick Review',
      points: 30
    },
    {
      id: '3',
      type: 'practice',
      title: 'Take Chemistry Mock Test',
      description: 'Scheduled for today',
      actionText: 'Start Test',
      points: 80
    }
  ];

  // Concepts data with daily/pending separation
  const conceptsData = {
    daily: [
      {
        id: '1',
        title: 'Newton\'s Laws of Motion',
        description: 'Understanding the three fundamental laws that govern motion',
        subject: 'Physics',
        difficulty: 'medium' as const,
        progress: 65,
        accuracy: 78,
        daysToGo: 0,
        totalCards: 15,
        masteredCards: 10,
        status: 'in-progress' as const
      }
    ],
    pending: [
      {
        id: '2',
        title: 'Organic Chemistry Reactions',
        description: 'Key reaction mechanisms and synthesis pathways',
        subject: 'Chemistry',
        difficulty: 'hard' as const,
        progress: 30,
        accuracy: 65,
        daysToGo: 2,
        totalCards: 20,
        masteredCards: 6,
        status: 'pending' as const
      },
      {
        id: '3',
        title: 'Thermodynamics Concepts',
        description: 'Heat transfer and energy conversion principles',
        subject: 'Physics',
        difficulty: 'medium' as const,
        progress: 0,
        accuracy: 0,
        daysToGo: 3,
        totalCards: 18,
        masteredCards: 0,
        status: 'pending' as const
      }
    ]
  };

  // Flashcards data with daily/pending separation
  const flashcardsData = {
    daily: [
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
        daysToGo: 0,
        status: 'in-progress' as const,
        lastReviewed: 'Yesterday'
      }
    ],
    pending: [
      {
        id: '2',
        title: 'Biology Classification',
        subject: 'Biology',
        totalCards: 35,
        completedCards: 20,
        masteredCards: 15,
        difficulty: 'easy' as const,
        estimatedTime: 20,
        accuracy: 72,
        daysToGo: 1,
        status: 'pending' as const,
        lastReviewed: '2 days ago'
      },
      {
        id: '3',
        title: 'Chemical Equations',
        subject: 'Chemistry',
        totalCards: 40,
        completedCards: 5,
        masteredCards: 2,
        difficulty: 'hard' as const,
        estimatedTime: 35,
        accuracy: 45,
        daysToGo: 2,
        status: 'pending' as const,
        lastReviewed: '1 week ago'
      }
    ]
  };

  // Practice exams data with daily/pending separation
  const practiceExamsData = {
    daily: [
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
        daysToGo: 0,
        status: 'pending' as const
      }
    ],
    pending: [
      {
        id: '2',
        title: 'Chemistry Organic Reactions Test',
        subject: 'Chemistry',
        topic: 'Organic Chemistry',
        linkedConcept: 'Reaction Mechanisms',
        questionCount: 25,
        duration: '40 min',
        difficulty: 'Hard' as const,
        priority: 'Medium' as const,
        accuracy: 0,
        attempts: 0,
        bestScore: 0,
        daysToGo: 1,
        status: 'pending' as const
      }
    ]
  };

  const completionPercentage = (todaysStats.completedTasks / todaysStats.totalTasks) * 100;
  const scorePercentage = (todaysStats.dailyScore / todaysStats.targetScore) * 100;

  const getBadgeForScore = (score: number) => {
    if (score >= 400) return { icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-100', label: 'Champion' };
    if (score >= 300) return { icon: Award, color: 'text-purple-500', bg: 'bg-purple-100', label: 'Achiever' };
    if (score >= 200) return { icon: Star, color: 'text-blue-500', bg: 'bg-blue-100', label: 'Rising Star' };
    return { icon: Target, color: 'text-gray-500', bg: 'bg-gray-100', label: 'Getting Started' };
  };

  const currentBadge = getBadgeForScore(todaysStats.dailyScore);

  const renderTabContent = (type: string, dailyItems: any[], pendingItems: any[]) => (
    <Tabs defaultValue="daily" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-gray-100 mb-6">
        <TabsTrigger value="daily" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Today ({dailyItems.length})
        </TabsTrigger>
        <TabsTrigger value="pending" className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Pending ({pendingItems.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="daily">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailyItems.length > 0 ? (
            dailyItems.map((item) => {
              if (type === 'concepts') return <ConceptCard key={item.id} {...item} />;
              if (type === 'flashcards') return <FlashcardCard key={item.id} {...item} />;
              if (type === 'exams') return <PracticeExamCard key={item.id} {...item} onStart={() => {}} onViewResult={() => {}} />;
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="text-lg font-medium text-gray-900">All caught up for today!</p>
              <p className="text-gray-500">Great job completing your daily tasks.</p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="pending">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingItems.length > 0 ? (
            pendingItems.map((item) => {
              if (type === 'concepts') return <ConceptCard key={item.id} {...item} />;
              if (type === 'flashcards') return <FlashcardCard key={item.id} {...item} />;
              if (type === 'exams') return <PracticeExamCard key={item.id} {...item} onStart={() => {}} onViewResult={() => {}} />;
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="text-lg font-medium text-gray-900">No pending tasks!</p>
              <p className="text-gray-500">You're all up to date.</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10">
      <Helmet>
        <title>Today's Plan - PREPZR</title>
        <meta name="description" content="Your personalized daily study schedule" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Enhanced Header with Smart Suggestions */}
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Today's Study Plan
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${currentBadge.bg}`}>
                <currentBadge.icon className={`h-5 w-5 ${currentBadge.color}`} />
                <span className={`font-medium ${currentBadge.color}`}>{currentBadge.label}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-full">
                <Flame className="h-4 w-4" />
                <span className="font-bold">{todaysStats.streak} Day Streak</span>
              </div>
            </div>
          </div>

          {/* Smart Suggestions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Smart Suggestions - Focus on These!
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {smartSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-purple-200 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={suggestion.type === 'urgent' ? 'destructive' : 'secondary'} className="text-xs">
                      {suggestion.type}
                    </Badge>
                    <span className="text-xs text-purple-600 font-medium">+{suggestion.points} pts</span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                  <p className="text-xs text-gray-600 mb-3">{suggestion.description}</p>
                  <Button size="sm" className="w-full text-xs">
                    {suggestion.actionText}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Tasks</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">{todaysStats.completedTasks}/{todaysStats.totalTasks}</div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Study Time</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{todaysStats.studyTime}m</div>
              <div className="text-xs text-gray-500">Target: {todaysStats.targetTime}m</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{todaysStats.accuracy}%</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Daily Score</span>
              </div>
              <div className="text-2xl font-bold text-orange-600 mb-1">{todaysStats.dailyScore}</div>
              <Progress value={scorePercentage} className="h-2" />
            </div>
          </div>
        </motion.div>

        {/* Activity Sections Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 h-12">
              <TabsTrigger value="concepts" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Concepts ({conceptsData.daily.length + conceptsData.pending.length})
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Flashcards ({flashcardsData.daily.length + flashcardsData.pending.length})
              </TabsTrigger>
              <TabsTrigger value="exams" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Practice Tests ({practiceExamsData.daily.length + practiceExamsData.pending.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="concepts" className="mt-6">
              {renderTabContent('concepts', conceptsData.daily, conceptsData.pending)}
            </TabsContent>

            <TabsContent value="flashcards" className="mt-6">
              {renderTabContent('flashcards', flashcardsData.daily, flashcardsData.pending)}
            </TabsContent>

            <TabsContent value="exams" className="mt-6">
              {renderTabContent('exams', practiceExamsData.daily, practiceExamsData.pending)}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default TodaysPlanView;
