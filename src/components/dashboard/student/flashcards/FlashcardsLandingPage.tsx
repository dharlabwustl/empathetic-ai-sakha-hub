
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import {
  Brain,
  Clock,
  Target,
  Star,
  Play,
  RotateCcw,
  TrendingUp,
  Zap,
  Award,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';

const FlashcardsLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);

  const flashcardDecks = [
    {
      id: 'organic-chemistry',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      cardCount: 150,
      masteredCount: 89,
      reviewCount: 23,
      newCount: 38,
      difficulty: 'Advanced',
      estimatedTime: 45,
      nextReview: '2 hours',
      streakDays: 12,
      accuracy: 87
    },
    {
      id: 'physics-formulas',
      title: 'Physics Formulas & Concepts',
      subject: 'Physics',
      cardCount: 200,
      masteredCount: 156,
      reviewCount: 18,
      newCount: 26,
      difficulty: 'Intermediate',
      estimatedTime: 35,
      nextReview: 'Now',
      streakDays: 8,
      accuracy: 92
    },
    {
      id: 'biology-terms',
      title: 'Biology Terminology',
      subject: 'Biology',
      cardCount: 180,
      masteredCount: 165,
      reviewCount: 10,
      newCount: 5,
      difficulty: 'Beginner',
      estimatedTime: 25,
      nextReview: '1 day',
      streakDays: 15,
      accuracy: 94
    },
    {
      id: 'math-theorems',
      title: 'Mathematical Theorems',
      subject: 'Mathematics',
      cardCount: 120,
      masteredCount: 78,
      reviewCount: 25,
      newCount: 17,
      difficulty: 'Advanced',
      estimatedTime: 40,
      nextReview: '4 hours',
      streakDays: 6,
      accuracy: 83
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-50 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getUrgencyColor = (nextReview: string) => {
    if (nextReview === 'Now') return 'text-red-600';
    if (nextReview.includes('hour')) return 'text-orange-600';
    return 'text-green-600';
  };

  const handleStartSession = (deckId: string) => {
    // Navigate to interactive flashcard session
    navigate(`/dashboard/student/flashcards/${deckId}`);
  };

  const totalStats = {
    totalCards: flashcardDecks.reduce((sum, deck) => sum + deck.cardCount, 0),
    totalMastered: flashcardDecks.reduce((sum, deck) => sum + deck.masteredCount, 0),
    averageAccuracy: Math.round(flashcardDecks.reduce((sum, deck) => sum + deck.accuracy, 0) / flashcardDecks.length),
    longestStreak: Math.max(...flashcardDecks.map(deck => deck.streakDays))
  };

  return (
    <SharedPageLayout
      title="Interactive Flashcards"
      subtitle="Master concepts with AI-powered spaced repetition"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{totalStats.totalCards}</div>
                  <div className="text-sm text-gray-600">Total Cards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{totalStats.totalMastered}</div>
                  <div className="text-sm text-gray-600">Mastered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalStats.averageAccuracy}%</div>
                  <div className="text-sm text-gray-600">Avg Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{totalStats.longestStreak}</div>
                  <div className="text-sm text-gray-600">Best Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Clock className="h-6 w-6 text-blue-500" />
                  <div className="text-center">
                    <div className="font-medium">Due Now</div>
                    <div className="text-sm text-gray-600">23 cards ready</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Brain className="h-6 w-6 text-purple-500" />
                  <div className="text-center">
                    <div className="font-medium">Random Review</div>
                    <div className="text-sm text-gray-600">Mixed subjects</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Target className="h-6 w-6 text-green-500" />
                  <div className="text-center">
                    <div className="font-medium">Weak Areas</div>
                    <div className="text-sm text-gray-600">Focus practice</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Flashcard Decks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-500" />
                Your Flashcard Decks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {flashcardDecks.map((deck, index) => (
                  <motion.div
                    key={deck.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-5 border-2 rounded-xl transition-all hover:shadow-md cursor-pointer ${
                      selectedDeck === deck.id ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedDeck(selectedDeck === deck.id ? null : deck.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{deck.title}</h3>
                          <Badge variant="outline">{deck.subject}</Badge>
                          <Badge className={getDifficultyColor(deck.difficulty)}>
                            {deck.difficulty}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{deck.cardCount}</div>
                            <div className="text-xs text-gray-600">Total Cards</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{deck.masteredCount}</div>
                            <div className="text-xs text-gray-600">Mastered</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-600">{deck.reviewCount}</div>
                            <div className="text-xs text-gray-600">Due Review</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">{deck.newCount}</div>
                            <div className="text-xs text-gray-600">New Cards</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round((deck.masteredCount / deck.cardCount) * 100)}%</span>
                          </div>
                          <Progress value={(deck.masteredCount / deck.cardCount) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {deck.estimatedTime} min
                        </div>
                        <div className="flex items-center gap-1">
                          <RotateCcw className="h-4 w-4" />
                          <span className={getUrgencyColor(deck.nextReview)}>
                            Next: {deck.nextReview}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          {deck.streakDays} day streak
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {deck.accuracy}% accuracy
                        </div>
                      </div>
                      
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartSession(deck.id);
                        }}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Session
                      </Button>
                    </div>

                    {selectedDeck === deck.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                            <div className="text-sm font-medium">Trending Up</div>
                            <div className="text-xs text-gray-600">+5% this week</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-1" />
                            <div className="text-sm font-medium">Strong Areas</div>
                            <div className="text-xs text-gray-600">Basics, Formulas</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <Star className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                            <div className="text-sm font-medium">Focus Needed</div>
                            <div className="text-xs text-gray-600">Complex problems</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Voice Assistant */}
      <FloatingVoiceButton 
        userName="Student"
        language="en-US"
        onNavigationCommand={(route) => navigate(route)}
      />
    </SharedPageLayout>
  );
};

export default FlashcardsLandingPage;
