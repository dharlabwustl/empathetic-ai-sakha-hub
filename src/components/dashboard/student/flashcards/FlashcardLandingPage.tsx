
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Clock, 
  Target, 
  Star, 
  Play, 
  RotateCcw, 
  BookOpen,
  TrendingUp,
  Award
} from 'lucide-react';

const FlashcardLandingPage = () => {
  const navigate = useNavigate();
  const { deckId } = useParams();
  
  // Mock flashcard deck data
  const flashcardDeck = {
    id: deckId || '1',
    title: 'Physics - Motion and Forces',
    subject: 'Physics',
    totalCards: 45,
    masteredCards: 28,
    reviewCards: 12,
    newCards: 5,
    estimatedTime: 25,
    difficulty: 'Medium',
    lastStudied: '2 days ago',
    streakDays: 7,
    accuracy: 78,
    description: 'Master the fundamentals of motion, forces, and Newton\'s laws with comprehensive flashcard practice.',
    topics: [
      'Newton\'s Laws',
      'Kinematics',
      'Force & Acceleration',
      'Friction',
      'Momentum'
    ],
    stats: {
      totalSessions: 15,
      averageAccuracy: 78,
      timeSpent: '4h 30m',
      streak: 7
    }
  };

  const masteryPercentage = Math.round((flashcardDeck.masteredCards / flashcardDeck.totalCards) * 100);

  const handleStartPractice = () => {
    console.log('Starting flashcard practice for deck:', deckId);
    // Navigate to the interactive flashcard page
    navigate(`/dashboard/student/flashcards/${deckId}/interactive`);
  };

  const handleQuickReview = () => {
    console.log('Starting quick review for deck:', deckId);
    navigate(`/dashboard/student/flashcards/${deckId}/interactive?mode=review`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">{flashcardDeck.title}</CardTitle>
                <p className="text-gray-600 mb-3">{flashcardDeck.description}</p>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-white">
                    {flashcardDeck.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-white">
                    {flashcardDeck.difficulty}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    ~{flashcardDeck.estimatedTime} min
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-bold text-lg">{flashcardDeck.streakDays} day streak</span>
              </div>
              <p className="text-sm text-gray-500">Last studied: {flashcardDeck.lastStudied}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-800">{flashcardDeck.masteredCards}</p>
            <p className="text-sm text-green-600 font-medium">Mastered</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4 text-center">
            <RotateCcw className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-2xl font-bold text-yellow-800">{flashcardDeck.reviewCards}</p>
            <p className="text-sm text-yellow-600 font-medium">Review</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-blue-800">{flashcardDeck.newCards}</p>
            <p className="text-sm text-blue-600 font-medium">New</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold text-purple-800">{flashcardDeck.accuracy}%</p>
            <p className="text-sm text-purple-600 font-medium">Accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Mastery Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Mastery Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{masteryPercentage}% Complete</span>
            </div>
            <Progress value={masteryPercentage} className="h-3" />
            <p className="text-sm text-gray-600">
              You've mastered {flashcardDeck.masteredCards} out of {flashcardDeck.totalCards} cards in this deck.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Topics Covered */}
      <Card>
        <CardHeader>
          <CardTitle>Topics Covered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {flashcardDeck.topics.map((topic, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-medium text-gray-800">{topic}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button 
          onClick={handleStartPractice}
          size="lg" 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
        >
          <Play className="h-5 w-5 mr-2" />
          Start Practice Session
        </Button>
        
        <Button 
          onClick={handleQuickReview}
          variant="outline" 
          size="lg" 
          className="px-8"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          Quick Review
        </Button>
      </div>

      {/* Study Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Study Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{flashcardDeck.stats.totalSessions}</p>
              <p className="text-sm text-gray-600">Total Sessions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{flashcardDeck.stats.averageAccuracy}%</p>
              <p className="text-sm text-gray-600">Avg Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{flashcardDeck.stats.timeSpent}</p>
              <p className="text-sm text-gray-600">Time Spent</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{flashcardDeck.stats.streak}</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardLandingPage;
