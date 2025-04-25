
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Brain, Check, Clock, Repeat, RotateCcw, Sparkles, ArrowRight, Filter, 
  Volume2, VolumeX, Bookmark, Bell, Tag, MessageSquare, Mic, Zap, BookmarkPlus, FileText, 
  BookMarked, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [answerAccuracy, setAnswerAccuracy] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState<Record<string, boolean>>({});
  const [useSpeechInput, setUseSpeechInput] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
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
      case 'week':
        // Demo week flashcards
        return sampleFlashcards.filter((_, i) => i % 3 !== 0);
      case 'month':
        // Demo month flashcards
        return sampleFlashcards;
      case 'bookmarks':
        // Demo bookmarked flashcards
        return sampleFlashcards.filter((card) => isBookmarked[card.id]);
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
      mastered: mastered.length,
      avgScore: Math.round(rated.reduce((acc, card) => acc + (recallRatings[card.id] || 0), 0) / (rated.length || 1) * 20),
      avgRecall: Math.round(rated.reduce((acc, card) => acc + (recallRatings[card.id] || 0), 0) / (rated.length || 1) * 25)
    };
  });

  const handleNext = () => {
    setIsFlipped(false);
    setUserAnswer('');
    setShowAnswerFeedback(false);
    setCurrentFlashcardIndex(prev => 
      prev < flashcards.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setUserAnswer('');
    setShowAnswerFeedback(false);
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
    }
  };
  
  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };
  
  const toggleBookmark = () => {
    if (currentFlashcard) {
      setIsBookmarked(prev => ({
        ...prev,
        [currentFlashcard.id]: !prev[currentFlashcard.id]
      }));
    }
  };
  
  const handleSubmitAnswer = () => {
    if (currentFlashcard) {
      // Simple accuracy calculation (in a real app, this would use more sophisticated matching)
      const words = currentFlashcard.back.toLowerCase().split(' ');
      const userWords = userAnswer.toLowerCase().split(' ');
      
      let matches = 0;
      userWords.forEach(word => {
        if (word.length > 3 && words.includes(word)) {
          matches++;
        }
      });
      
      const totalKeywords = words.filter(word => word.length > 3).length;
      const accuracy = Math.min(100, Math.round((matches / Math.max(1, totalKeywords)) * 100));
      
      setAnswerAccuracy(accuracy);
      setShowAnswerFeedback(true);
      
      // Auto-rate based on accuracy
      const autoRating: 1 | 2 | 3 | 4 | 5 = 
        accuracy >= 90 ? 5 :
        accuracy >= 75 ? 4 :
        accuracy >= 60 ? 3 :
        accuracy >= 40 ? 2 : 1;
        
      handleRecall(autoRating);
    }
  };
  
  const toggleSpeechInput = () => {
    setUseSpeechInput(!useSpeechInput);
  };
  
  const startRecording = () => {
    // In a real implementation, this would use the Web Speech API
    setIsRecording(true);
    
    // Mock recording after 2 seconds
    setTimeout(() => {
      setIsRecording(false);
      setUserAnswer(prev => prev + " " + currentFlashcard.back.split(' ').slice(0, 3).join(' ') + "...");
    }, 2000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
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
            Quick Recaps for Your {examGoal} Preparation, Available Anytime
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={toggleVoice}
          >
            {voiceEnabled ? <Volume2 size={16} className="mr-1" /> : <VolumeX size={16} className="mr-1" />}
            {voiceEnabled ? 'Voice Enabled' : 'Enable Voice'}
          </Button>
          
          <Link to="/dashboard/student/flashcards/all">
            <Button variant="outline" className="flex items-center gap-2">
              View All Flashcards <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
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
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                  <TabsTrigger value="month">This Month</TabsTrigger>
                  <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                  <TabsTrigger value="review">Need Review</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              {flashcards.length > 0 ? (
                <div className="relative perspective-1000 h-[350px]">
                  <motion.div 
                    className="absolute w-full h-full cursor-pointer"
                    animate={isFlipped ? "back" : "front"}
                    variants={cardVariants}
                    transition={{ duration: 0.6, type: "spring" }}
                    onClick={() => !showAnswerFeedback && setIsFlipped(!isFlipped)}
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
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              currentFlashcard.difficulty === 'easy' ? 'success' :
                              currentFlashcard.difficulty === 'medium' ? 'warning' :
                              'destructive'
                            }>
                              {currentFlashcard.difficulty.charAt(0).toUpperCase() + currentFlashcard.difficulty.slice(1)}
                            </Badge>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark();
                              }}
                            >
                              {isBookmarked[currentFlashcard.id] ? (
                                <BookMarked className="h-5 w-5 text-blue-600 fill-blue-600" />
                              ) : (
                                <Bookmark className="h-5 w-5 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-center mb-4">
                          <Badge variant="outline" className="bg-gray-50">
                            {currentFlashcard.topic}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-center my-5">{currentFlashcard.front}</h3>
                        
                        {!isFlipped && !showAnswerFeedback && (
                          <div className="my-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="text-sm font-medium">Your Answer</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSpeechInput();
                                }}
                              >
                                {useSpeechInput ? 'Type Answer' : 'Voice Answer'}
                                {useSpeechInput ? <MessageSquare size={14} /> : <Mic size={14} />}
                              </Button>
                            </div>
                            
                            {useSpeechInput ? (
                              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                <Textarea
                                  value={userAnswer}
                                  onChange={(e) => setUserAnswer(e.target.value)}
                                  placeholder="Your answer will appear here..."
                                  className="resize-none"
                                  disabled={isRecording}
                                />
                                <Button
                                  variant={isRecording ? "destructive" : "default"}
                                  size="sm"
                                  className="shrink-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    isRecording ? stopRecording() : startRecording();
                                  }}
                                >
                                  <Mic size={16} className={isRecording ? "animate-pulse" : ""} />
                                </Button>
                              </div>
                            ) : (
                              <Textarea
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Type your answer here..."
                                onClick={(e) => e.stopPropagation()}
                                className="resize-none"
                              />
                            )}
                            
                            <div className="flex justify-between">
                              <Button
                                variant="outline"
                                className="flex items-center gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsFlipped(true);
                                }}
                              >
                                Flip to Answer
                              </Button>
                              
                              <Button
                                variant="default"
                                className="flex items-center gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSubmitAnswer();
                                }}
                                disabled={!userAnswer.trim()}
                              >
                                <Check size={16} className="mr-1" />
                                Submit Answer
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {showAnswerFeedback && (
                          <div className="bg-gray-50 p-4 rounded-lg space-y-3 my-4">
                            <h4 className="text-center font-medium">
                              Answer Accuracy
                            </h4>
                            <Progress value={answerAccuracy} className="h-2" />
                            <p className="text-center font-bold">
                              {answerAccuracy}% Match
                            </p>
                            <div className="flex justify-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUserAnswer('');
                                  setShowAnswerFeedback(false);
                                }}
                              >
                                Try Again
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsFlipped(true);
                                }}
                              >
                                View Answer
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      {!showAnswerFeedback && (
                        <div className="text-center text-sm text-gray-500">Click to flip</div>
                      )}
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleVoice();
                            }}
                          >
                            {voiceEnabled ? (
                              <Volume2 className="h-5 w-5 text-blue-600" />
                            ) : (
                              <VolumeX className="h-5 w-5 text-gray-400" />
                            )}
                          </Button>
                        </div>
                        <div className="mb-4 flex justify-center">
                          <Badge variant="outline" className="bg-white border-blue-200">
                            Answer
                          </Badge>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                          <p className="text-lg text-center my-4">{currentFlashcard.back}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-center mb-2 text-gray-600">Rate your recall:</p>
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

            <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between border-t pt-4">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>Type: {currentFlashcard?.type.charAt(0).toUpperCase() + currentFlashcard?.type.slice(1)}</span>
                {currentFlashcard?.conceptId && (
                  <Link 
                    to={`/dashboard/student/concepts/${currentFlashcard.conceptId}`}
                    className="text-blue-600 hover:underline flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BookOpen size={14} className="mr-1" />
                    View Concept
                  </Link>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <BookmarkPlus size={14} className="mr-1" />
                  Bookmark
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <FileText size={14} className="mr-1" />
                  Add Note
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <BarChart size={14} className="mr-1" />
                  Progress
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-col items-center justify-center p-3 border rounded-lg bg-white text-center">
              <BookOpen className="text-blue-600 mb-2" size={20} />
              <h4 className="font-medium">Related Concept</h4>
              <Link to={`/dashboard/student/concepts/${currentFlashcard?.conceptId || ''}`} className="text-blue-600 text-sm hover:underline">
                View Full Concept
              </Link>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-3 border rounded-lg bg-white text-center">
              <FileText className="text-purple-600 mb-2" size={20} />
              <h4 className="font-medium">Practice Test</h4>
              <Link to="/dashboard/student/practice-exam" className="text-purple-600 text-sm hover:underline">
                Take Related Test
              </Link>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-3 border rounded-lg bg-white text-center">
              <BarChart className="text-green-600 mb-2" size={20} />
              <h4 className="font-medium">Performance</h4>
              <p className="text-sm text-gray-500">70% Accuracy</p>
            </div>
          </div>
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
                <div key={stat.subject} className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{stat.subject}</span>
                    <span className="text-sm">{stat.mastered}/{stat.total}</span>
                  </div>
                  <Progress 
                    value={(stat.mastered / stat.total) * 100} 
                    className="h-2" 
                  />
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Quiz: {stat.avgScore}%</span>
                    <span>Recall: {stat.avgRecall}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap size={16} />
                Learning Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-1">Spaced Repetition</h4>
                <p className="text-blue-700">
                  Review cards at increasing intervals: 1 day, 3 days, 7 days, etc.
                </p>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="font-medium text-amber-800 mb-1">Active Recall</h4>
                <p className="text-amber-700">
                  Try to answer before flipping the card to strengthen memory.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                <h4 className="font-medium text-green-800 mb-1">Interleaving</h4>
                <p className="text-green-700">
                  Mix different subjects rather than studying one topic at a time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsFeature;
