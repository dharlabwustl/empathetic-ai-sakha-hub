
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterSection } from '../shared/FilterSection';
import { StatusTabs } from '../shared/StatusTabs';
import { Brain, Clock, Target, Zap, TrendingUp, Play, Star, Eye } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface FlashcardsSubjectTabProps {
  subject: string;
}

export const FlashcardsSubjectTab: React.FC<FlashcardsSubjectTabProps> = ({ subject }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [activityFilter, setActivityFilter] = useState('all');

  // Mock data with enhanced flashcard information
  const flashcards = [
    {
      id: 1,
      title: "Thermodynamics Formulas",
      status: "mastered",
      cardCount: 25,
      masteredCards: 23,
      accuracy: 94,
      avgResponseTime: "2.3s",
      difficulty: "Medium",
      topic: "Thermodynamics",
      lastReviewed: "2 hours ago",
      nextReview: "in 3 days",
      streakDays: 12,
      totalReviews: 45,
      isFavorite: true,
      memoryStrength: 85
    },
    {
      id: 2,
      title: "Electromagnetic Laws",
      status: "reviewing",
      cardCount: 30,
      masteredCards: 18,
      accuracy: 76,
      avgResponseTime: "4.1s",
      difficulty: "Hard",
      topic: "Electromagnetism",
      lastReviewed: "1 day ago",
      nextReview: "today",
      streakDays: 5,
      totalReviews: 32,
      isFavorite: false,
      memoryStrength: 65
    },
    {
      id: 3,
      title: "Mechanics Concepts",
      status: "weak",
      cardCount: 20,
      masteredCards: 8,
      accuracy: 58,
      avgResponseTime: "5.8s",
      difficulty: "Medium",
      topic: "Mechanics",
      lastReviewed: "3 days ago",
      nextReview: "overdue",
      streakDays: 0,
      totalReviews: 15,
      isFavorite: false,
      memoryStrength: 35
    },
    {
      id: 4,
      title: "Optics Fundamentals",
      status: "unattempted",
      cardCount: 18,
      masteredCards: 0,
      accuracy: null,
      avgResponseTime: null,
      difficulty: "Easy",
      topic: "Optics",
      lastReviewed: null,
      nextReview: "new",
      streakDays: 0,
      totalReviews: 0,
      isFavorite: false,
      memoryStrength: 0
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'mastered', label: 'Mastered' },
    { value: 'reviewing', label: 'Reviewing' },
    { value: 'weak', label: 'Weak' },
    { value: 'unattempted', label: 'New' }
  ];

  const statusCounts = {
    all: flashcards.length,
    mastered: flashcards.filter(f => f.status === 'mastered').length,
    reviewing: flashcards.filter(f => f.status === 'reviewing').length,
    weak: flashcards.filter(f => f.status === 'weak').length,
    unattempted: flashcards.filter(f => f.status === 'unattempted').length
  };

  const filters = [
    {
      label: "Topic",
      options: [
        { value: 'all', label: 'All Topics' },
        { value: 'mechanics', label: 'Mechanics' },
        { value: 'thermodynamics', label: 'Thermodynamics' },
        { value: 'electromagnetism', label: 'Electromagnetism' },
        { value: 'optics', label: 'Optics' }
      ],
      value: topicFilter,
      onChange: setTopicFilter
    },
    {
      label: "Difficulty",
      options: [
        { value: 'all', label: 'All Levels' },
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' }
      ],
      value: difficultyFilter,
      onChange: setDifficultyFilter
    },
    {
      label: "Activity",
      options: [
        { value: 'all', label: 'All Activity' },
        { value: 'recent', label: 'Recently Studied' },
        { value: 'due', label: 'Due for Review' },
        { value: 'overdue', label: 'Overdue' }
      ],
      value: activityFilter,
      onChange: setActivityFilter
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered': return 'bg-green-100 text-green-800 border-green-200';
      case 'reviewing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'weak': return 'bg-red-100 text-red-800 border-red-200';
      case 'unattempted': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMemoryStrengthColor = (strength: number) => {
    if (strength >= 80) return 'bg-green-500';
    if (strength >= 60) return 'bg-yellow-500';
    if (strength >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getNextReviewColor = (nextReview: string) => {
    switch (nextReview) {
      case 'overdue': return 'text-red-600 font-semibold';
      case 'today': return 'text-orange-600 font-semibold';
      case 'new': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setTopicFilter('all');
    setDifficultyFilter('all');
    setActivityFilter('all');
  };

  const handleOpenFlashcard = (flashcardId: number) => {
    navigate(`/dashboard/student/flashcards/${flashcardId}/interactive`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{subject} Flashcards</h2>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          {flashcards.filter(f => f.status === 'mastered').length}/{flashcards.length} Mastered
        </Badge>
      </div>

      <StatusTabs
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        statusCounts={statusCounts}
        statusOptions={statusOptions}
      />

      <FilterSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onReset={handleReset}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map((flashcard) => (
          <Card 
            key={flashcard.id} 
            className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-purple-200 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-900/20"
          >
            <CardContent className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  {flashcard.isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                  {flashcard.nextReview === 'overdue' && <Zap className="h-4 w-4 text-red-500" />}
                </div>
                <Badge variant="outline" className={getStatusColor(flashcard.status)}>
                  {flashcard.status === 'unattempted' ? 'New' : flashcard.status.charAt(0).toUpperCase() + flashcard.status.slice(1)}
                </Badge>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {flashcard.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{flashcard.cardCount} cards</span>
                  <span>•</span>
                  <span>{flashcard.topic}</span>
                </div>
              </div>

              {/* Memory Strength Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Memory Strength</span>
                  <span className="font-medium">{flashcard.memoryStrength}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getMemoryStrengthColor(flashcard.memoryStrength)}`}
                    style={{ width: `${flashcard.memoryStrength}%` }}
                  />
                </div>
              </div>

              {/* Progress Stats */}
              {flashcard.status !== 'unattempted' && (
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center p-2 bg-white dark:bg-gray-800 rounded border">
                    <div className="font-semibold text-lg text-purple-600">{flashcard.accuracy}%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                  <div className="text-center p-2 bg-white dark:bg-gray-800 rounded border">
                    <div className="font-semibold text-lg text-blue-600">{flashcard.avgResponseTime}</div>
                    <div className="text-xs text-gray-600">Avg Time</div>
                  </div>
                </div>
              )}

              {/* Cards Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cards Mastered</span>
                  <span className="font-medium">{flashcard.masteredCards}/{flashcard.cardCount}</span>
                </div>
                <Progress value={(flashcard.masteredCards / flashcard.cardCount) * 100} className="h-2" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={getDifficultyColor(flashcard.difficulty)}>
                  {flashcard.difficulty}
                </Badge>
                {flashcard.streakDays > 0 && (
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    {flashcard.streakDays} day streak
                  </Badge>
                )}
              </div>

              {/* Review Info */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    {flashcard.lastReviewed ? `Last: ${flashcard.lastReviewed}` : 'Never studied'}
                  </span>
                  <span className={getNextReviewColor(flashcard.nextReview)}>
                    {flashcard.nextReview === 'new' ? 'New cards' : 
                     flashcard.nextReview === 'overdue' ? 'Overdue!' :
                     flashcard.nextReview === 'today' ? 'Due today' :
                     `Next: ${flashcard.nextReview}`}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className={`w-full group-hover:shadow-lg transition-all duration-200 ${
                  flashcard.nextReview === 'overdue' ? 'bg-red-600 hover:bg-red-700' :
                  flashcard.status === 'unattempted' ? 'bg-blue-600 hover:bg-blue-700' :
                  'bg-purple-600 hover:bg-purple-700'
                }`}
                onClick={() => handleOpenFlashcard(flashcard.id)}
              >
                <Play className="h-4 w-4 mr-2" />
                {flashcard.status === 'unattempted' ? 'Start Learning' :
                 flashcard.nextReview === 'overdue' ? 'Review Now!' :
                 'Continue Review'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
