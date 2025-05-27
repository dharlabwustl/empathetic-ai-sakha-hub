
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Clock, Target, TrendingUp, Lightbulb, RefreshCw, Star, Award } from 'lucide-react';

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
      color: 'blue',
      streakDays: 12,
      lastStudied: '2 hours ago'
    },
    {
      name: 'Chemistry',
      totalCards: 520,
      masteredCards: 310,
      reviewingCards: 150,
      newCards: 60,
      accuracyRate: 85,
      color: 'green',
      streakDays: 8,
      lastStudied: '1 day ago'
    },
    {
      name: 'Biology',
      totalCards: 680,
      masteredCards: 420,
      reviewingCards: 180,
      newCards: 80,
      accuracyRate: 82,
      color: 'purple',
      streakDays: 15,
      lastStudied: '3 hours ago'
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
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="h-7 w-7 text-purple-600" />
            NEET Flashcards Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Master key concepts with spaced repetition across all subjects</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            {Math.round((totalMastered / totalCards) * 100)}% Mastered
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {averageAccuracy}% Accuracy
          </Badge>
        </div>
      </div>

      {/* Enhanced Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-full shadow-sm">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Total Progress</p>
                <p className="text-2xl font-bold text-blue-800">{totalMastered}/{totalCards}</p>
                <p className="text-xs text-blue-600">Cards mastered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-full shadow-sm">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">Accuracy Rate</p>
                <p className="text-2xl font-bold text-green-800">{averageAccuracy}%</p>
                <p className="text-xs text-green-600">Overall performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 rounded-full shadow-sm">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-600">Due for Review</p>
                <p className="text-2xl font-bold text-orange-800">{cardsForReview}</p>
                <p className="text-xs text-orange-600">Cards pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-full shadow-sm">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-600">Daily Goal</p>
                <p className="text-2xl font-bold text-purple-800">50</p>
                <p className="text-xs text-purple-600">Cards target</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Subject-wise Flashcard Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {neetSubjects.map((subject) => (
          <Card key={subject.name} className={`${getColorClasses(subject.color)} border-2 shadow-lg hover:shadow-xl transition-shadow duration-200`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-6 w-6" />
                  <span className="text-lg">{subject.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-bold">{subject.streakDays}d</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Enhanced Card Stats with progress bars */}
              <div className="space-y-3">
                <div className="bg-white/70 p-3 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-green-700">Mastered</span>
                    <span className="font-bold">{subject.masteredCards}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(subject.masteredCards / subject.totalCards) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/70 p-2 rounded text-center">
                    <p className="text-lg font-bold text-yellow-600">{subject.reviewingCards}</p>
                    <p className="text-xs text-gray-600">Review</p>
                  </div>
                  <div className="bg-white/70 p-2 rounded text-center">
                    <p className="text-lg font-bold text-blue-600">{subject.newCards}</p>
                    <p className="text-xs text-gray-600">New</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Accuracy with visual indicator */}
              <div className="text-center bg-white/70 p-3 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-600">Accuracy Rate</span>
                </div>
                <p className="text-2xl font-bold">{subject.accuracyRate}%</p>
                <p className="text-xs text-gray-500">Last studied: {subject.lastStudied}</p>
              </div>

              {/* Enhanced Action Button */}
              <Button size="sm" className="w-full mt-3 shadow-sm hover:shadow-md transition-shadow">
                Start Review Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced AI Suggestions */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Lightbulb className="h-6 w-6" />
            Smart Flashcard Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-purple-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-red-600" />
                <p className="text-sm font-medium text-gray-800">Priority Review</p>
              </div>
              <p className="text-sm text-gray-600 mb-2">Physics Formulas - 15 cards need urgent review</p>
              <Button size="sm" variant="outline" className="w-full">Review Now</Button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-purple-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-gray-800">New Cards Ready</p>
              </div>
              <p className="text-sm text-gray-600 mb-2">Biology Systems - 20 new cards unlocked</p>
              <Button size="sm" variant="outline" className="w-full">Add to Session</Button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-purple-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <p className="text-sm font-medium text-gray-800">Focus Area</p>
              </div>
              <p className="text-sm text-gray-600 mb-2">Organic Chemistry - needs extra repetitions</p>
              <Button size="sm" variant="outline" className="w-full">Focus Study</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardOverviewSection;
