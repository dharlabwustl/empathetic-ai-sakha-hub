import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Plus, PlayCircle, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ConceptFlashcardsSectionProps {
  conceptId: string;
  conceptTitle: string;
  flashcardsTotal?: number;
  flashcardsCompleted?: number;
}

interface FlashCard {
  id: string;
  front: string;
  back: string;
  lastReviewed?: string;
  confidence: 'low' | 'medium' | 'high';
}

export const ConceptFlashcardsSection: React.FC<ConceptFlashcardsSectionProps> = ({
  conceptId,
  conceptTitle,
  flashcardsTotal = 0,
  flashcardsCompleted = 0
}) => {
  const [isFlipped, setIsFlipped] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock flashcards data
  const [flashcards, setFlashcards] = useState<FlashCard[]>([
    {
      id: 'f1',
      front: "What is Newton's Second Law of Motion?",
      back: "Newton's Second Law states that the rate of change of momentum of an object is directly proportional to the force applied, and occurs in the direction of the applied force. It can be mathematically expressed as F = ma.",
      confidence: 'medium'
    },
    {
      id: 'f2',
      front: "How is force calculated using Newton's Second Law?",
      back: "Force is calculated by multiplying mass times acceleration (F = ma).",
      confidence: 'high'
    },
    {
      id: 'f3',
      front: "Why is Newton's Second Law considered a vector equation?",
      back: "It's a vector equation because both force and acceleration are vector quantities with magnitude and direction.",
      confidence: 'low'
    }
  ]);
  
  const toggleFlip = (id: string) => {
    setIsFlipped(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const calculateProgress = () => {
    if (flashcardsTotal === 0) return 0;
    return (flashcardsCompleted / flashcardsTotal) * 100;
  };
  
  const addNewFlashcard = () => {
    toast({
      title: "Create Flashcard",
      description: "Opening flashcard creator",
    });
    // Implement flashcard creation
  };
  
  const startPractice = () => {
    toast({
      title: "Starting Practice",
      description: `Beginning flashcard session for ${conceptTitle}`,
    });
    // Navigate to flashcard practice page
  };
  
  const updateConfidence = (id: string, confidence: 'low' | 'medium' | 'high') => {
    setFlashcards(prev => prev.map(card => 
      card.id === id ? { ...card, confidence, lastReviewed: new Date().toISOString() } : card
    ));
    
    toast({
      title: "Confidence Updated",
      description: "Your knowledge rating has been updated",
    });
  };
  
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-amber-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <BookOpen className="mr-2 h-6 w-6 text-blue-600" />
          Flashcards
        </h2>
        
        <div className="flex gap-2">
          <Button onClick={addNewFlashcard} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Flashcard
          </Button>
          
          <Button onClick={startPractice}>
            <PlayCircle className="mr-2 h-4 w-4" />
            Practice All
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Flashcard Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span>{flashcardsCompleted} of {flashcardsTotal}</span>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </div>
            </div>
            
            <div className="flex gap-4 text-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{flashcardsTotal}</p>
                <p className="text-xs text-blue-600 dark:text-blue-500">Total Cards</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                  {flashcardsCompleted}
                </p>
                <p className="text-xs text-green-600 dark:text-green-500">Mastered</p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                  {Math.max(0, flashcardsTotal - flashcardsCompleted)}
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-500">To Review</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <h3 className="font-medium text-lg mb-4">Your Flashcards</h3>
      
      {flashcards.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No Flashcards Yet</h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto">
            Create your first flashcard for this concept. 
            Flashcards are an excellent way to reinforce your memory through active recall.
          </p>
          <Button onClick={addNewFlashcard}>
            <Plus className="mr-2 h-4 w-4" />
            Create First Flashcard
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flashcards.map(card => (
            <div 
              key={card.id} 
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform perspective-1000 h-[200px]`}
              onClick={() => toggleFlip(card.id)}
            >
              <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped[card.id] ? 'rotate-y-180' : ''}`}>
                {/* Front of card */}
                <div 
                  className={`absolute w-full h-full bg-white dark:bg-gray-800 p-6 backface-hidden ${
                    isFlipped[card.id] ? 'invisible' : ''
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-2">Question</h4>
                      <p>{card.front}</p>
                    </div>
                    <div className="text-sm text-right text-muted-foreground">
                      Click to reveal answer
                    </div>
                  </div>
                </div>
                
                {/* Back of card */}
                <div 
                  className={`absolute w-full h-full bg-blue-50 dark:bg-blue-900/20 p-6 backface-hidden rotate-y-180 ${
                    !isFlipped[card.id] ? 'invisible' : ''
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-2">Answer</h4>
                      <p>{card.back}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className={`text-sm ${getConfidenceColor(card.confidence)}`}>
                        {card.confidence === 'high' ? 'High confidence' : 
                         card.confidence === 'medium' ? 'Medium confidence' : 'Low confidence'}
                      </div>
                      
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-500 border-red-200 hover:border-red-500 hover:bg-red-50 p-1 h-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateConfidence(card.id, 'low');
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-green-500 border-green-200 hover:border-green-500 hover:bg-green-50 p-1 h-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateConfidence(card.id, 'high');
                          }}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <style>
        {`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </div>
  );
};
