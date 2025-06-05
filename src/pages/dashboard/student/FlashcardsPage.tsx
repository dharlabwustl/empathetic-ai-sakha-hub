
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Brain, Search, Plus, Play, RotateCcw, Star } from 'lucide-react';

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const flashcardSets = [
    {
      id: '1',
      title: 'Physics Formulas',
      subject: 'Physics',
      cardCount: 25,
      completed: 18,
      accuracy: 85,
      lastStudied: '2 days ago',
      difficulty: 'medium'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      cardCount: 40,
      completed: 35,
      accuracy: 92,
      lastStudied: '1 day ago',
      difficulty: 'hard'
    },
    {
      id: '3',
      title: 'Cell Biology Terms',
      subject: 'Biology',
      cardCount: 30,
      completed: 30,
      accuracy: 78,
      lastStudied: '3 hours ago',
      difficulty: 'easy'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartFlashcards = (setId: string) => {
    navigate(`/dashboard/student/flashcards/${setId}/interactive`);
  };

  const filteredSets = flashcardSets.filter(set =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Practice and memorize key concepts with smart flashcards"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search flashcard sets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Set
          </Button>
        </div>

        {/* Flashcard Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSets.map((set) => (
            <Card key={set.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <Badge variant="outline" className="text-xs">
                      {set.subject}
                    </Badge>
                  </div>
                  <Badge className={getDifficultyColor(set.difficulty)}>
                    {set.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{set.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round((set.completed / set.cardCount) * 100)}%</span>
                  </div>
                  <Progress value={(set.completed / set.cardCount) * 100} />
                  <p className="text-xs text-muted-foreground">
                    {set.completed} of {set.cardCount} cards mastered
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-blue-600">{set.accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-green-600">{set.cardCount}</div>
                    <div className="text-xs text-muted-foreground">Total Cards</div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Last studied: {set.lastStudied}</span>
                  {set.completed === set.cardCount && (
                    <div className="flex items-center gap-1 text-green-600">
                      <Star className="h-3 w-3 fill-current" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 flex items-center gap-2"
                    onClick={() => handleStartFlashcards(set.id)}
                  >
                    <Play className="h-4 w-4" />
                    Study
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsPage;
