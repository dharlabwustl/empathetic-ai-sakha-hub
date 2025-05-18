
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, ArrowRight, ArrowLeft, Plus, Play } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface RelatedFlashcardsProps {
  flashcards: Flashcard[];
  conceptTitle: string;
}

const RelatedFlashcards: React.FC<RelatedFlashcardsProps> = ({ flashcards, conceptTitle }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('browse');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showingBack, setShowingBack] = useState(false);

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowingBack(false);
    } else {
      // Loop back to the first card
      setCurrentCardIndex(0);
      setShowingBack(false);
      toast({
        title: "Completed Deck",
        description: "You've reviewed all flashcards in this set"
      });
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowingBack(false);
    } else {
      // Loop to the last card
      setCurrentCardIndex(flashcards.length - 1);
      setShowingBack(false);
    }
  };

  const handleFlipCard = () => {
    setShowingBack(!showingBack);
  };

  const handleCreateFlashcard = () => {
    toast({
      title: "Create Flashcard",
      description: "Opening flashcard creation form"
    });
    // Implement flashcard creation logic
  };

  const handleStartPractice = () => {
    toast({
      title: "Start Practice",
      description: "Starting flashcard practice session"
    });
    // Implement navigation to flashcard practice
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Flashcards</h2>
        <Button onClick={handleStartPractice}>
          <Play className="mr-2 h-4 w-4" />
          Start Practice Session
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Cards</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="space-y-6 mt-6">
          {flashcards.length > 0 ? (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-xl perspective-1000">
                <div 
                  className={`relative w-full h-60 transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${showingBack ? 'rotate-y-180' : ''}`}
                  onClick={handleFlipCard}
                >
                  {/* Card Front */}
                  <div className={`absolute w-full h-full backface-hidden bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-center ${showingBack ? 'hidden' : ''}`}>
                    <div className="text-center">
                      <div className="absolute top-2 right-2 text-xs text-gray-400">
                        {currentCardIndex + 1}/{flashcards.length}
                      </div>
                      <Lightbulb className="h-8 w-8 text-amber-500 mx-auto mb-4" />
                      <p className="text-lg font-medium">
                        {flashcards[currentCardIndex].front}
                      </p>
                      <p className="text-sm text-muted-foreground mt-4">
                        Click to reveal answer
                      </p>
                    </div>
                  </div>
                  
                  {/* Card Back */}
                  <div className={`absolute w-full h-full backface-hidden bg-amber-50 dark:bg-amber-900/30 rounded-xl shadow-lg border border-amber-200 dark:border-amber-800 rotate-y-180 p-6 flex items-center justify-center ${!showingBack ? 'hidden' : ''}`}>
                    <div className="text-center">
                      <div className="absolute top-2 right-2 text-xs text-gray-400">
                        {currentCardIndex + 1}/{flashcards.length}
                      </div>
                      <p className="text-lg font-medium text-amber-900 dark:text-amber-300">
                        {flashcards[currentCardIndex].back}
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-400 mt-4">
                        Click to see question
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between w-full max-w-xl mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousCard}
                  disabled={flashcards.length <= 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                <Button 
                  onClick={handleNextCard}
                  disabled={flashcards.length <= 1}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No flashcards available for this concept yet.</p>
              <Button onClick={() => setActiveTab('create')} className="mt-4">
                Create Your First Flashcard
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Flashcard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create your own flashcards for {conceptTitle} to help with your studies
              </p>
              
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="cardFront" className="text-sm font-medium">Front (Question)</label>
                  <textarea
                    id="cardFront"
                    className="w-full min-h-20 p-2 border rounded-md"
                    placeholder="Enter your question here..."
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="cardBack" className="text-sm font-medium">Back (Answer)</label>
                  <textarea
                    id="cardBack"
                    className="w-full min-h-20 p-2 border rounded-md"
                    placeholder="Enter the answer here..."
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('browse')}>Cancel</Button>
              <Button onClick={handleCreateFlashcard}>
                <Plus className="mr-2 h-4 w-4" />
                Create Flashcard
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                  <Lightbulb className="h-6 w-6 text-green-700 dark:text-green-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-300">Flashcard Tips</h3>
                  <ul className="text-sm text-green-800 dark:text-green-400 mt-2 space-y-1 list-disc list-inside">
                    <li>Keep questions clear and concise</li>
                    <li>Create one card per concept for better recall</li>
                    <li>Use your own words to improve understanding</li>
                    <li>Review your flashcards regularly using spaced repetition</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelatedFlashcards;
