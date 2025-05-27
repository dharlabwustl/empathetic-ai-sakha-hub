
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Clock, Target, TrendingUp, Lightbulb, RefreshCw } from 'lucide-react';

interface FlashcardOverviewSectionProps {
  className?: string;
}

const FlashcardOverviewSection: React.FC<FlashcardOverviewSectionProps> = ({ className }) => {
  const neetSubjects = [
    {
      name: 'Physics',
      totalCards: 450,
      masteredCards: 280,
      reviewingCards: 120,
      newCards: 50,
      accuracyRate: 78,
      color: 'blue'
    },
    {
      name: 'Chemistry',
      totalCards: 520,
      masteredCards: 310,
      reviewingCards: 150,
      newCards: 60,
      accuracyRate: 85,
      color: 'green'
    },
    {
      name: 'Biology',
      totalCards: 680,
      masteredCards: 420,
      reviewingCards: 180,
      newCards: 80,
      accuracyRate: 82,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const totalCards = neetSubjects.reduce((sum, subject) => sum + subject.totalCards, 0);
  const totalMastered = neetSubjects.reduce((sum, subject) => sum + subject.masteredCards, 0);
  const averageAccuracy = Math.round(neetSubjects.reduce((sum, subject) => sum + subject.accuracyRate, 0) / neetSubjects.length);
  const cardsForReview = neetSubjects.reduce((sum, subject) => sum + subject.reviewingCards, 0);

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NEET Flashcards Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Master key concepts with spaced repetition across all subjects</p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          {Math.round((totalMastered / totalCards) * 100)}% Mastered
        </Badge>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-full">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Total Cards</p>
                <p className="text-xl font-bold text-blue-800">{totalMastered}/{totalCards}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-full">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600">Accuracy Rate</p>
                <p className="text-xl font-bold text-green-800">{averageAccuracy}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-full">
                <RefreshCw className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600">Due for Review</p>
                <p className="text-xl font-bold text-orange-800">{cardsForReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-full">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Daily Goal</p>
                <p className="text-xl font-bold text-purple-800">50 cards</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Flashcard Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {neetSubjects.map((subject) => (
          <Card key={subject.name} className={`${getColorClasses(subject.color)} border-2`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{subject.name}</span>
                <Brain className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Card Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-2 rounded">
                  <p className="text-lg font-bold text-green-600">{subject.masteredCards}</p>
                  <p className="text-xs text-gray-600">Mastered</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p className="text-lg font-bold text-yellow-600">{subject.reviewingCards}</p>
                  <p className="text-xs text-gray-600">Review</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p className="text-lg font-bold text-blue-600">{subject.newCards}</p>
                  <p className="text-xs text-gray-600">New</p>
                </div>
              </div>

              {/* Accuracy */}
              <div className="text-center">
                <p className="text-sm text-gray-600">Accuracy Rate</p>
                <p className="text-2xl font-bold">{subject.accuracyRate}%</p>
              </div>

              {/* Action Button */}
              <Button size="sm" className="w-full mt-3">
                Start Review Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Suggestions */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Lightbulb className="h-5 w-5" />
            Smart Flashcard Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <p className="text-sm font-medium text-gray-800">Priority Review: Physics Formulas</p>
              <p className="text-xs text-gray-600 mt-1">15 cards need urgent review to prevent forgetting. Best time: now!</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <p className="text-sm font-medium text-gray-800">New Cards Ready: Biology Systems</p>
              <p className="text-xs text-gray-600 mt-1">20 new cards unlocked based on your concept progress. Add to today's session?</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <p className="text-sm font-medium text-gray-800">Weak Area Focus: Organic Chemistry</p>
              <p className="text-xs text-gray-600 mt-1">Lower accuracy detected. Extra repetitions recommended for better retention.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardOverviewSection;
