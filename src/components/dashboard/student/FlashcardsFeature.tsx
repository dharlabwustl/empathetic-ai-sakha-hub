
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Brain, Check, Clock, Repeat, RotateCcw, Sparkles, ArrowRight, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Badge } from '@/components/ui/badge';

interface FlashcardProps {
  id: string;
  front: string;
  back: string;
  subject: string;
  topic: string;
  timeToComplete?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image?: string;
  type: 'definition' | 'image' | 'question' | 'mcq';
  conceptId?: string;
}

const FlashcardsFeature: React.FC = () => {
  const { conceptCards } = useUserStudyPlan();
  const { userProfile } = useUserProfile();
  const [activeTab, setActiveTab] = useState('today');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [recallRatings, setRecallRatings] = useState<Record<string, 1 | 2 | 3 | 4 | 5>>({});
  
  // Get exam goal
  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';

  // Generate sample flashcards based on completed concept cards
  const completedConcepts = conceptCards.filter(card => card.completed);
  
  const sampleFlashcards: FlashcardProps[] = completedConcepts.flatMap((concept, i) => [
    {
      id: `flash-def-${concept.id}`,
      front: `Define: ${concept.title}`,
      back: `${concept.title} is a key concept in ${concept.subject} that deals with ${concept.chapter}.`,
      subject: concept.subject,
      topic: concept.chapter,
      timeToComplete: 1,
      difficulty: concept.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
      type: 'definition',
      conceptId: concept.id
    },
    {
      id: `flash-q-${concept.id}`,
      front: `Question: How does ${concept.title} relate to ${concept.chapter}?`,
      back: `${concept.title} is fundamental to understanding ${concept.chapter} because it provides the theoretical foundation.`,
      subject: concept.subject,
      topic: concept.chapter,
      timeToComplete: 2,
      difficulty: concept.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
      type: 'question',
      conceptId: concept.id
    }
  ]);
  
  // Filter based on active tab
  const filterFlashcards = () => {
    switch (activeTab) {
      case 'today':
        // Today's flashcards - related to concept cards scheduled for today
        return sampleFlashcards.filter(card => {
          const relatedConcept = conceptCards.find(concept => concept.id === card.conceptId);
          return relatedConcept?.scheduledFor === 'today';
        });
      case 'bookmarks':
        // Demo bookmarked flashcards
        return sampleFlashcards.filter((_, i) => i % 5 === 0);
      case 'review':
        // Demo review flashcards (low recall)
        return sampleFlashcards.filter((card) => {
          const rating = recallRatings[card.id];
          return rating && rating < 3;
        });
      default:
        return sampleFlashcards;
    }
  };
  
  const flashcards = filterFlashcards();
  const currentFlashcard = flashcards[currentFlashcardIndex];
  
  // Calculate overall progress
  const totalFlashcards = sampleFlashcards.length;
  const ratedFlashcards = Object.keys(recallRatings).length;
  const masteredFlashcards = Object.values(recallRatings).filter(rating => rating >= 4).length;
  
  // Subjects breakdown
  const subjects = [...new Set(sampleFlashcards.map(card => card.subject))];
  const subjectStats = subjects.map(subject => {
    const cards = sampleFlashcards.filter(card => card.subject === subject);
    const rated = cards.filter(card => recallRatings[card.id]);
    const mastered = cards.filter(card => recallRatings[card.id] >= 4);
    
    return {
      subject,
      total: cards.length,
      rated: rated.length,
      mastered: mastered.length
    };
  });

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentFlashcardIndex(prev => 
      prev < flashcards.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentFlashcardIndex(prev => 
      prev > 0 ? prev - 1 : flashcards.length - 1
    );
  };

  const handleRecall = (rating: 1 | 2 | 3 | 4 | 5) => {
    if (currentFlashcard) {
      setRecallRatings(prev => ({
        ...prev,
        [currentFlashcard.id]: rating
      }));
      
      // Automatically move to next card after rating
      setTimeout(handleNext, 500);
    }
  };

  // Animation variants
  const cardVariants = {
    front: {
      rotateY: 0
    },
    back: {
      rotateY: 180
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="text-blue-500" />
            Flashcards
          </h2>
          <p className="text-gray-500">
            Review key concepts for your {examGoal} preparation with spaced repetition
          </p>
        </div>
        
        <Link to="/dashboard/student/flashcards/all">
          <Button variant="outline" className="flex items-center gap-2">
            View All Flashcards 
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      
      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Overall Progress</h3>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{ratedFlashcards}/{totalFlashcards} Reviewed</span>
              <span className="text-sm font-medium">{Math.round((ratedFlashcards / totalFlashcards) * 100)}%</span>
            </div>
            <Progress value={(ratedFlashcards / totalFlashcards) * 100} />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Mastery Level</h3>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{masteredFlashcards}/{totalFlashcards} Mastered</span>
              <span className="text-sm font-medium">{Math.round((masteredFlashcards / totalFlashcards) * 100)}%</span>
            </div>
            <Progress value={(masteredFlashcards / totalFlashcards) * 100} className="bg-gray-200" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Time Spent</h3>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-500" size={16} />
              <span className="text-lg font-medium">45 minutes</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Today's review session</p>
          </CardContent>
        </Card>
      </div>

      {/* Flashcard Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Flashcard Browser</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrevious}>
                    <RotateCcw size={16} />
                  </Button>
                  <span className="text-sm">
                    {currentFlashcardIndex + 1} / {flashcards.length}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleNext}>
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="today">Today's Cards</TabsTrigger>
                  <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                  <TabsTrigger value="review">Need Review</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              {flashcards.length > 0 ? (
                <div className="relative perspective-1000 h-64">
                  <motion.div 
                    className="absolute w-full h-full cursor-pointer"
                    animate={isFlipped ? "back" : "front"}
                    variants={cardVariants}
                    transition={{ duration: 0.6, type: "spring" }}
                    onClick={() => setIsFlipped(!isFlipped)}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front of card */}
                    <div className={`absolute w-full h-full backface-hidden flex flex-col justify-between rounded-lg p-6 border ${
                      isFlipped ? 'opacity-0' : 'opacity-100'
                    } bg-white`}>
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {currentFlashcard.subject}
                          </Badge>
                          <Badge variant={`${
                            currentFlashcard.difficulty === 'easy' ? 'secondary' : 
                            currentFlashcard.difficulty === 'medium' ? 'default' : 
                            'destructive'
                          }`}>
                            {currentFlashcard.difficulty.charAt(0).toUpperCase() + currentFlashcard.difficulty.slice(1)}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-center my-8">{currentFlashcard.front}</h3>
                      </div>
                      <div className="text-center text-sm text-gray-500">Click to flip</div>
                    </div>

                    {/* Back of card */}
                    <div className={`absolute w-full h-full backface-hidden flex flex-col justify-between rounded-lg p-6 border ${
                      isFlipped ? 'opacity-100' : 'opacity-0'
                    } bg-blue-50 [transform:rotateY(180deg)]`}>
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <Badge variant="outline" className="bg-white">
                            {currentFlashcard.topic}
                          </Badge>
                          <Badge variant="secondary">
                            {currentFlashcard.type.charAt(0).toUpperCase() + currentFlashcard.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-lg text-center my-8">{currentFlashcard.back}</p>
                      </div>
                      <div>
                        <p className="text-sm text-center mb-2 text-gray-600">How well did you recall this?</p>
                        <div className="flex justify-center gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Button 
                              key={rating}
                              variant={recallRatings[currentFlashcard.id] === rating ? "default" : "outline"}
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRecall(rating as 1 | 2 | 3 | 4 | 5);
                              }}
                            >
                              {rating}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center border rounded-lg">
                  <p className="text-gray-500">No flashcards available in this category</p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                {flashcards.length > 0 && `Type: ${currentFlashcard.type.charAt(0).toUpperCase() + currentFlashcard.type.slice(1)}`}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <BookOpen size={16} className="mr-1" />
                  View Full Concept
                </Button>
                <Button variant="outline" size="sm">
                  <Repeat size={16} className="mr-1" />
                  Mark for Review
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Sidebar with stats and filters */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter size={16} />
                Quick Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Physics Concepts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Brain className="mr-2 h-4 w-4" />
                Hard Flashcards
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Sparkles className="mr-2 h-4 w-4" />
                Recently Added
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Check className="mr-2 h-4 w-4" />
                Mastered Cards
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen size={16} />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjectStats.map(stat => (
                <div key={stat.subject}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{stat.subject}</span>
                    <span className="text-sm">{stat.mastered}/{stat.total}</span>
                  </div>
                  <Progress 
                    value={(stat.mastered / stat.total) * 100} 
                    className="h-2" 
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsFeature;
