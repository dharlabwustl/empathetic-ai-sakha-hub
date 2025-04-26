
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ThumbsUp, ThumbsDown, Zap, Timer, Check } from 'lucide-react';

const FlashcardDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Mock flashcard data - in a real app, fetch this from an API
  const flashcard = {
    id,
    title: 'Newton\'s First Law of Motion',
    front: 'What is Newton\'s First Law of Motion?',
    back: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
    category: 'Physics',
    tags: ['mechanics', 'laws of motion', 'force'],
    lastReviewed: '2023-10-15',
    nextReviewDate: '2023-10-20',
    reviewCount: 5,
    masteryLevel: 3
  };

  const handleCardClick = () => {
    if (!revealed) {
      setFlipped(!flipped);
    }
  };

  const handleDifficulty = (level: 'easy' | 'medium' | 'hard') => {
    setDifficulty(level);
    setRevealed(true);
    // In a real application, save this response to update the SRS algorithm
  };

  const handleNext = () => {
    // In a real app, navigate to the next flashcard
    navigate(-1); // For now, go back to the list
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-green-500 hover:bg-green-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'hard': return 'bg-red-500 hover:bg-red-600';
      default: return '';
    }
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Flashcards
          </Button>
          <h1 className="text-2xl font-bold">Flashcard Review</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div 
              className="cursor-pointer"
              onClick={handleCardClick}
            >
              <Card className={`h-80 ${flipped ? 'bg-blue-50' : 'bg-white'} transition-all duration-300 shadow-lg hover:shadow-xl transform perspective-1000`}>
                <CardContent className="p-6 h-full flex flex-col justify-center">
                  <div className="absolute top-4 right-4 text-gray-400 text-sm">
                    {flipped ? 'Back' : 'Front'}
                  </div>
                  
                  <div className="text-center">
                    {flipped ? (
                      <div className="prose prose-lg mx-auto">
                        <p>{flashcard.back}</p>
                      </div>
                    ) : (
                      <h2 className="text-2xl font-medium">{flashcard.front}</h2>
                    )}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 text-sm text-gray-500">
                    <Timer className="h-4 w-4 inline mr-1" />
                    Last reviewed: {flashcard.lastReviewed}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {flipped && !revealed && (
              <div className="mt-6">
                <p className="mb-4 text-center">How well did you know this?</p>
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={() => handleDifficulty('hard')} 
                    className={`flex items-center gap-2 ${getDifficultyColor('hard')}`}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    Hard
                  </Button>
                  <Button 
                    onClick={() => handleDifficulty('medium')} 
                    className={`flex items-center gap-2 ${getDifficultyColor('medium')}`}
                  >
                    <Zap className="h-4 w-4" />
                    Medium
                  </Button>
                  <Button 
                    onClick={() => handleDifficulty('easy')} 
                    className={`flex items-center gap-2 ${getDifficultyColor('easy')}`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Easy
                  </Button>
                </div>
              </div>
            )}
            
            {revealed && (
              <div className="mt-6 text-center">
                <p className="mb-4">Response recorded! This card will appear again based on your answer.</p>
                <Button onClick={handleNext}>
                  <Check className="h-4 w-4 mr-2" />
                  Continue
                </Button>
              </div>
            )}
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Card Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Category</h4>
                    <p>{flashcard.category}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Tags</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {flashcard.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Review Stats</h4>
                    <p>Reviewed {flashcard.reviewCount} times</p>
                    <p>Next review: {flashcard.nextReviewDate}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Mastery Level</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className={`h-2 w-8 mr-1 rounded ${i < flashcard.masteryLevel ? 'bg-blue-500' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FlashcardDetailPage;
