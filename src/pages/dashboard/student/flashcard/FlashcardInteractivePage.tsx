
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Star } from 'lucide-react';

const FlashcardInteractivePage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  
  return (
    <SharedPageLayout
      title="Interactive Flashcards"
      subtitle="Choose a study mode to continue"
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/student/flashcards')}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Flashcards
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              Classic Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Simple flashcard practice with question and answer flipping.
            </p>
            <Button 
              className="w-full" 
              onClick={() => navigate(`/dashboard/student/flashcard/${deckId || 'default'}`)}
            >
              Start Classic Practice
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow border-2 border-indigo-100 dark:border-indigo-900">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Enhanced Practice
              </CardTitle>
              <div className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                Recommended
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Powerful practice with AI accuracy scoring, speech input and performance analytics.
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              onClick={() => navigate('/dashboard/student/flashcards/practice')}
            >
              Start Enhanced Practice
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-500" />
              Interactive Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Engaging practice with spaced repetition and adaptive difficulty.
            </p>
            <Button 
              className="w-full"
              onClick={() => navigate(`/dashboard/student/flashcards/${deckId || 'default'}/interactive`)}
            >
              Start Interactive Learning
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Study Progress Overview</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Today's Progress</h3>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full h-12 w-12 flex items-center justify-center font-bold">
                    15
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Cards practiced</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Weekly Streak</h3>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full h-12 w-12 flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Days in a row</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Mastery Level</h3>
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 rounded-full h-12 w-12 flex items-center justify-center font-bold">
                    68%
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Average across decks</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardInteractivePage;
