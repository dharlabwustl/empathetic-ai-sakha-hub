
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
  Star
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
    accuracy: 78
  };

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
    },
    {
      type: 'practice',
      title: 'Chemistry Mock Test',
      description: 'Take organic chemistry practice exam before weekend',
      urgency: 'medium',
      estimatedTime: '60 min'
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
    },
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
      daysToGo: 3,
      status: 'pending' as const,
      lastReviewed: '2 days ago'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10">
      <Helmet>
        <title>Today's Plan - PREPZR</title>
        <meta name="description" content="Your personalized daily study schedule" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Today's Study Plan
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>

        {/* Daily Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Daily Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{todaysStats.completedTasks}/{todaysStats.totalTasks}</div>
                  <div className="text-sm text-gray-600">Tasks Done</div>
                  <Progress value={completionPercentage} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{todaysStats.studyTime}m</div>
                  <div className="text-sm text-gray-600">Study Time</div>
                  <Progress value={timePercentage} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{todaysStats.accuracy}%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{todaysStats.targetTime - todaysStats.studyTime}m</div>
                  <div className="text-sm text-gray-600">Time Left</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Smart Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Smart Suggestions for Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailySuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={suggestion.urgency === 'high' ? 'destructive' : 'secondary'}>
                          {suggestion.urgency} priority
                        </Badge>
                        <span className="text-sm text-gray-500">{suggestion.estimatedTime}</span>
                      </div>
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion.description}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Time Slots Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          <Button
            variant={selectedTimeSlot === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedTimeSlot('all')}
          >
            All Tasks
          </Button>
          {timeSlots.map((slot) => (
            <Button
              key={slot.id}
              variant={selectedTimeSlot === slot.id ? 'default' : 'outline'}
              onClick={() => setSelectedTimeSlot(slot.id)}
              className="flex items-center gap-2"
            >
              {slot.label}
              <Badge variant="secondary" className={slot.color}>
                {slot.tasks}
              </Badge>
            </Button>
          ))}
        </motion.div>

        {/* Today's Content Sections */}
        <div className="space-y-8">
          {/* Concepts Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-2xl font-bold">Concept Cards</h2>
              <Badge variant="secondary">{todaysConcepts.length} pending</Badge>
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
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5" />
              <h2 className="text-2xl font-bold">Flashcard Sets</h2>
              <Badge variant="secondary">{todaysFlashcards.length} scheduled</Badge>
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
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5" />
              <h2 className="text-2xl font-bold">Practice Exams</h2>
              <Badge variant="secondary">{todaysPracticeExams.length} due</Badge>
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
